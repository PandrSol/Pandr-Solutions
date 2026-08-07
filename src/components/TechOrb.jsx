import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const LIME = '#C4FF3D'

/* ---------- CORE FORM ----------
 * A wireframe icosahedron + an inner solid shell = the "brand nucleus".
 * Slowly rotates on its own axis. Lime edges + soft glow.
 */
function Core() {
  const wireRef = useRef()
  const solidRef = useRef()

  useFrame((_, dt) => {
    if (wireRef.current) {
      wireRef.current.rotation.y += dt * 0.25
      wireRef.current.rotation.x += dt * 0.1
    }
    if (solidRef.current) {
      solidRef.current.rotation.y -= dt * 0.12
    }
  })

  return (
    <group>
      {/* inner solid — dark, gives depth */}
      <mesh ref={solidRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.15}
          flatShading
        />
      </mesh>

      {/* outer wireframe — lime */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color={LIME} wireframe transparent opacity={0.85} />
      </mesh>

      {/* vertex points — bright */}
      <VertexDots radius={1.05} />
    </group>
  )
}

/* Bright dots at each icosahedron vertex — reads as network nodes. */
function VertexDots({ radius = 1 }) {
  const positions = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(radius, 1)
    const pts = []
    const pos = geom.attributes.position
    const seen = new Set()
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

/* ---------- ORBITAL RINGS ----------
 * Three rings at different tilts. Each carries a small satellite node
 * that revolves around the core — signals emitting outward.
 */
function OrbitalRing({ radius, tilt, speed, phase = 0, color = LIME, ringOpacity = 0.25 }) {
  const satRef = useRef()

  useFrame((state) => {
    if (satRef.current) {
      const t = state.clock.elapsedTime * speed + phase
      satRef.current.position.set(
        Math.cos(t) * radius,
        0,
        Math.sin(t) * radius,
      )
    }
  })

  // ring geometry lying on XZ plane, group tilts the whole system
  return (
    <group rotation={tilt}>
      {/* the ring itself */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.003, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={ringOpacity} />
      </mesh>
      {/* satellite */}
      <group ref={satRef}>
        <mesh>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        {/* soft halo */}
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  )
}

/* ---------- AMBIENT PARTICLES ----------
 * Slowly drifting flecks — "signal noise" in the background.
 */
function Particles({ count = 80 }) {
  const ref = useRef()

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      speeds[i] = 0.03 + Math.random() * 0.08
    }
    return { positions, speeds }
  }, [count])

  useFrame((_, dt) => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt * 0.15
      if (arr[i * 3 + 1] > 3.5) arr[i * 3 + 1] = -3.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y += dt * 0.02
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
        size={0.025}
        color={LIME}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

/* ---------- SIGNAL RIPPLES ----------
 * Concentric expanding rings emanating from the core — "the signal".
 */
function Ripple({ delay = 0 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = (state.clock.elapsedTime + delay) % 3.2
    const p = t / 3.2 // 0..1
    ref.current.scale.setScalar(1 + p * 2.4)
    ref.current.material.opacity = 0.4 * (1 - p)
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.1, 0.006, 8, 128]} />
      <meshBasicMaterial color={LIME} transparent opacity={0} />
    </mesh>
  )
}

/* ---------- MOUSE PARALLAX WRAPPER ----------
 * Whole rig tilts slightly toward the cursor. Subtle, not gimmicky.
 */
function ParallaxGroup({ children }) {
  const groupRef = useRef()
  const target = useRef({ x: 0, y: 0 })

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += (target.current.x * 0.35 - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (target.current.y * 0.22 - groupRef.current.rotation.x) * 0.05
  })

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        // e.uv exists on planes; use client coords via unprojected point
        target.current.x = (e.point.x || 0) * 0.15
        target.current.y = -(e.point.y || 0) * 0.15
      }}
    >
      {/* invisible plane picks up pointer events across the canvas */}
      <mesh position={[0, 0, -1]} visible={false}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial />
      </mesh>
      {children}
    </group>
  )
}

export default function TechOrb() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '440px',
      position: 'relative',
    }}>
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} color={LIME} intensity={1.2} />
          <pointLight position={[-3, -2, -2]} color="#5B7CFF" intensity={0.5} />

          <ParallaxGroup>
            <Particles count={90} />

            {/* Ripples — staggered so one is always mid-flight */}
            <Ripple delay={0} />
            <Ripple delay={1.05} />
            <Ripple delay={2.1} />

            {/* Orbital rings + their satellites */}
            <OrbitalRing radius={1.6} tilt={[0, 0, 0]}                     speed={0.8} />
            <OrbitalRing radius={2.0} tilt={[Math.PI / 3, 0, 0]}           speed={0.55} phase={2} />
            <OrbitalRing radius={2.4} tilt={[Math.PI / 5, 0, Math.PI / 4]} speed={0.4}  phase={4} color="#5B7CFF" ringOpacity={0.18} />

            {/* Central nucleus */}
            <Core />
          </ParallaxGroup>
        </Suspense>
      </Canvas>
    </div>
  )
}
