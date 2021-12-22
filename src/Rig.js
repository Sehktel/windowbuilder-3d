/**
 * Фрейм комнаты
 *
 * @module Rig
 *
 * Created by Evgeniy Malyarov on 22.12.2021.
 */

import React, {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

export default function Rig({ children }) {
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