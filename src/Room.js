/**
 * Простая комната
 *
 * @module Room
 *
 * Created by Evgeniy Malyarov on 22.12.2021.
 */

import {useGLTF} from '@react-three/drei';
import React, {useRef} from 'react';

useGLTF.preload('/rooms/openroom.glb');

export default function Room(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/rooms/openroom.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.08}>
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