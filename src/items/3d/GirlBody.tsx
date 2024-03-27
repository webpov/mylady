import { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from 'three';

export default function Component(props: any) {
    const { scene } = useGLTF('/body0.glb');
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

    return <primitive ref={ref} position={[0, -0.8, 0]} object={scene} {...props} />;
}
