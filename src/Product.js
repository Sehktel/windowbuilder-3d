/**
 * Изделие
 *
 * @module Product
 *
 * Created by Evgeniy Malyarov on 22.12.2021.
 */

import React, {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader';

const loader = new SVGLoader();
const svgData = loader.parse(`
<svg
   xmlns="http://www.w3.org/2000/svg"
   width="100mm"
   height="100mm"
   viewBox="0 0 100 100"
>
  <path
     style="fill:none;stroke:#000000;stroke-width:1px"
     d="m 0,0 20,0 0,20 50,0 0,50 -70,0 z"
  />
</svg>
`);
const material = new THREE.MeshBasicMaterial({ color: "grey" });

const curve = new THREE.LineCurve3([1,1,1], [1,200,300]);
const closedSpline = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( 1800, 800, 100 ),
  new THREE.Vector3( 1800, 1800, 100 )
] );


export default function Product({ position }) {
  return (
    <group scale={[0.002, 0.002, 0.002]}>
      {
        svgData.paths.map((path, i) => {
          const shapes = path.toShapes(true);
          // Each path has array of shapes
          return shapes.map((shape, j) => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              steps: 100,
              bevelEnabled: false,
              extrudePath: closedSpline,
            });
            return  <mesh key={`m-${i}-${j}`} geometry={geometry} material={material}/>
          });
        })
      }
    </group>
  )
}
