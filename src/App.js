import React, { useRef, useState, Suspense } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, Loader, OrbitControls } from '@react-three/drei';


useGLTF.preload('/rooms/openroom.glb');

function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/rooms/openroom.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={[0.08, 0.08, 0.08]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.stage_21.geometry}
          material={nodes.stage_21.material}
        />
      </group>
    </group>
  )
}

function Rig({ children }) {
  const outer = useRef()
  const inner = useRef()
  useFrame(({clock}) => {
    outer.current.position.y = THREE.MathUtils.lerp(outer.current.position.y, 0, 0.05);
    inner.current.rotation.y = Math.sin(clock.getElapsedTime() / 80) * Math.PI;
    inner.current.position.z = -1 + -Math.sin(clock.getElapsedTime() / 20) / 2;
    inner.current.position.y = -1 + Math.sin(clock.getElapsedTime() / 30) / 3;
  });
  return (
    <group position={[0, -100, 0]} ref={outer}>
      <group ref={inner}>{children}</group>
    </group>
  )
}


function App() {

  return (
    <Canvas style={{height: '100vh'}}>
      <ambientLight intensity={0.5} />
      <color attach="background" args={['#fff0fa']} />
      <fog attach="fog" args={['#fff0ea', 10, 60]} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
      />
      <Suspense fallback={<Html center><Loader /></Html>}>
        <Rig>
          <Model position={[1.2, 0, 0]} />
        </Rig>
      </Suspense>
    </Canvas>
  );
}

export default App;
