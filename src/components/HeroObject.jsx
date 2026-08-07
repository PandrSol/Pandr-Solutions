import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Sphere() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15
      ref.current.rotation.x += delta * 0.05
    }
  })
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} scale={1.6}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#C4FF3D"
          distort={0.35}
          speed={1.4}
          roughness={0.2}
          metalness={0.4}
          emissive="#C4FF3D"
          emissiveIntensity={0.05}
        />
      </mesh>
    </Float>
  )
}

function Ring() {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.08
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.2, 0, 0]}>
      <torusGeometry args={[2.4, 0.005, 8, 128]} />
      <meshBasicMaterial color="#C4FF3D" transparent opacity={0.4} />
    </mesh>
  )
}

export default function HeroObject() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} color="#C4FF3D" />
        <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#5B7CFF" />
        <Sphere />
        <Ring />
        <Environment preset="night" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Suspense>
    </Canvas>
  )
}
