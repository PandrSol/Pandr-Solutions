import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const LIME = '#C4FF3D'
const BLUE = '#5B7CFF'

/**
 * TechOrb — a self-contained rotating "neural core" visualization.
 *
 * Everything is bounded within a ~2-unit radius sphere; the camera keeps
 * the whole rig framed at any viewport size (uses fov auto-adjust).
 * Nothing expands or emanates beyond that bound, so it never gets clipped.
 */

/* ---------- CORE NUCLEUS ----------
 * Wireframe icosahedron with glowing vertex dots. Slowly rotates.
 */
function Core() {
  const wireRef = useRef()
  const solidRef = useRef()

  useFrame((_, dt) => {
    if (wireRef.current) {
      wireRef.current.rotation.y += dt * 0.22
      wireRef.current.rotation.x += dt * 0.09
    }
    if (solidRef.current) {
      solidRef.current.rotation.y -= dt * 0.1
    }
  })

  return (
    <group>
      {/* dark inner shell for depth */}
      <mesh ref={solidRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.2}
          flatShading
        />
      </mesh>
      {/* lime wireframe outer */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={LIME} wireframe transparent opacity={0.85} />
      </mesh>
      <VertexDots radius={1} />
    </group>
  )
}

function VertexDots({ radius = 1 }) {
  const positions = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(radius, 1)
    const pts = []
    const seen = new Set()
    const pos = geom.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = +pos.getX(i).toFixed(4)
      const y = +pos.getY(i).toFixed(4)
      const z = +pos.getZ(i).toFixed(4)
      const key = `${x},${y},${z}`
      if (!seen.has(key)) {
        seen.add(key)
        pts.push([x, y, z])
      }
    }
    return pts
  }, [radius])

  return (
    <group>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color={LIME} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------- ORBITING SATELLITES ----------
 * Small nodes traveling along tight 3D paths that stay within the bounding
 * sphere. Each one leaves a soft, decaying trail (line strip drawn manually).
 * No torus geometry, no ring lines — nothing that can render as a horizontal
 * band or extend beyond the safe area.
 */
function Satellite({ speed, tilt, radius, phase = 0, color = LIME, size = 0.05 }) {
  const dot = useRef()

  useFrame((state) => {
    if (!dot.current) return
    const t = state.clock.elapsedTime * speed + phase
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    // apply tilt manually so the whole orbit sits on an inclined plane
    const cosT = Math.cos(tilt[0])
    const sinT = Math.sin(tilt[0])
    const y = z * sinT
    const z2 = z * cosT
    dot.current.position.set(x, y, z2)
  })

  return (
    <group ref={dot}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* soft halo */}
      <mesh>
        <sphereGeometry args={[size * 2.4, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

/* ---------- CONNECTION MESH ----------
 * Static thin lines from a handful of surface vertices to satellites'
 * approximate paths — reads as a network topology at rest.
 */
function StaticEdges() {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const verts = []
    const from = [
      [0, 1, 0], [0, -1, 0],
      [0.85, 0.5, 0], [-0.85, 0.5, 0],
      [0.85, -0.5, 0], [-0.85, -0.5, 0],
    ]
    for (const f of from) {
      // draw a short line pointing outward from the vertex
      const dir = new THREE.Vector3(...f).normalize()
      const end = dir.clone().multiplyScalar(1.55)
      verts.push(...f, end.x, end.y, end.z)
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    return g
  }, [])
  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial color={LIME} transparent opacity={0.25} />
    </lineSegments>
  )
}

/* ---------- AMBIENT PARTICLES ----------
 * Points confined to a tight bounding radius. Slow rotation.
 */
function Particles({ count = 100 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // uniform points inside a shell between r=1.9 and r=2.3
      const r = 1.9 + Math.random() * 0.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.04
    ref.current.rotation.x += dt * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color={LIME}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

/* ---------- RESPONSIVE CAMERA ----------
 * Auto-adjusts camera distance so the bounding sphere (radius ~2.4) always
 * fits with a comfortable margin — regardless of viewport aspect ratio.
 */
function ResponsiveCamera({ padding = 1.35 }) {
  const camera = useThree(s => s.camera)
  const size = useThree(s => s.size)
  useEffect(() => {
    const targetRadius = 2.4 * padding
    const vFov = (camera.fov * Math.PI) / 180
    const distV = targetRadius / Math.tan(vFov / 2)
    const aspect = size.width / Math.max(1, size.height)
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect)
    const distH = targetRadius / Math.tan(hFov / 2)
    const dist = Math.max(distV, distH)
    camera.position.set(0, 0, dist)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height, padding])
  return null
}

/* ---------- CURSOR-DRIVEN RIG ----------
 * Whole rig tilts toward the cursor with spring physics. Uses a shared
 * ref updated on pointer move so the useFrame loop stays independent
 * of React re-renders.
 */
function InteractiveRig({ pointer, isTouch, children }) {
  const groupRef = useRef()

  useFrame((_, dt) => {
    if (!groupRef.current) return
    const t = pointer.current
    const cx = groupRef.current.rotation.x
    const cy = groupRef.current.rotation.y
    const k = 1 - Math.pow(0.0004, dt)

    // On touch: gentle auto-rotate + any active touch nudges it
    if (isTouch) {
      groupRef.current.rotation.y = cy + dt * 0.18 + (t.ry - cy) * k * 0.35
      groupRef.current.rotation.x = cx + (t.rx - cx) * k * 0.5
    } else {
      groupRef.current.rotation.x = cx + (t.rx - cx) * k
      groupRef.current.rotation.y = cy + (t.ry - cy) * k
    }

    const targetScale = 1 + t.active * 0.06
    const cs = groupRef.current.scale.x
    groupRef.current.scale.setScalar(cs + (targetScale - cs) * k)
  })

  return <group ref={groupRef}>{children}</group>
}

/* ---------- MAIN COMPONENT ---------- */
export default function TechOrb() {
  const wrapRef = useRef(null)
  const pointer = useRef({ rx: 0, ry: 0, active: 0 })
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia?.('(pointer: coarse)').matches)
  }, [])

  const setFromClient = (clientX, clientY, active = 1) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const r = wrap.getBoundingClientRect()
    const nx = ((clientX - r.left) / r.width - 0.5) * 2
    const ny = ((clientY - r.top) / r.height - 0.5) * 2
    pointer.current.ry = nx * 0.6
    pointer.current.rx = ny * 0.4
    pointer.current.active = active
  }

  const onMove = (e) => setFromClient(e.clientX, e.clientY, 1)

  const onLeave = () => {
    pointer.current.rx = 0
    pointer.current.ry = 0
    pointer.current.active = 0
  }

  const onTouchMove = (e) => {
    if (e.touches?.[0]) {
      setFromClient(e.touches[0].clientX, e.touches[0].clientY, 1)
    }
  }
  const onTouchEnd = () => {
    // Ease back to auto-rotate baseline on release
    pointer.current.rx = 0
    pointer.current.ry = 0
    pointer.current.active = 0
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '360px',
        overflow: 'hidden',
        cursor: isTouch ? 'default' : 'grab',
        touchAction: 'pan-y',
      }}
      data-cursor="hover"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ display: 'block' }}
      >
        <Suspense fallback={null}>
          <ResponsiveCamera padding={1.15} />

          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} color={LIME} intensity={1.1} />
          <pointLight position={[-3, -2, -2]} color={BLUE} intensity={0.4} />

          <Particles count={isTouch ? 60 : 110} />

          <InteractiveRig pointer={pointer} isTouch={isTouch}>
            <Core />
            <StaticEdges />

            <Satellite radius={1.55} speed={0.85} tilt={[0.2,  0, 0]} phase={0.0} />
            <Satellite radius={1.7}  speed={0.55} tilt={[0.9,  0, 0]} phase={1.4} />
            <Satellite radius={1.85} speed={0.42} tilt={[-0.4, 0, 0]} phase={3.1} color={BLUE} size={0.045} />
            <Satellite radius={1.45} speed={0.7}  tilt={[1.3,  0, 0]} phase={4.7} size={0.04} />
          </InteractiveRig>
        </Suspense>
      </Canvas>
    </div>
  )
}
