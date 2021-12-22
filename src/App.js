import React, { useRef, useState, Suspense } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Loader, OrbitControls } from '@react-three/drei';
import Room from './Room';
import Rig from './Rig';
import Product from './Product';


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
      {/*

      */}
      <Suspense fallback={<Html center><Loader /></Html>}>
        <Rig>
          <Room position={[0.8, 0, 0]} />
          <Product position={[0,0,0]} />
        </Rig>
      </Suspense>

    </Canvas>
  );
}

export default App;
