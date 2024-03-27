import { useLayoutEffect, useRef, useState } from 'react'

import { useFrame } from '@react-three/fiber'
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from 'three';
import { useSearchParams } from 'next/navigation';

export default function Component (props:any) {
  const searchP = useSearchParams()
  const selIndex = searchP.get("leftleg") || "0"
  const { scene } = useGLTF(`/leftleg${selIndex}.glb`)
  const matcapTexture = useTexture('/img/asd2.jpg');

    useLayoutEffect(() => {
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          // Apply matcap texture to each mesh in the glb file
          o.material = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture,
            color: "#dd9900", // Set the base color if needed
          });
          o.receiveShadow = true;
          o.castShadow = true;
        }
      });
    }, [matcapTexture]);

    const ref = useRef();

  
  return <primitive ref={ref} position={[0,-0.8,0]} object={scene} {...props} />
}
