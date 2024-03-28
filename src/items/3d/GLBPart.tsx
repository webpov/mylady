import { useEffect, useState } from 'react';
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from 'three';
import { useSearchParams, useRouter } from 'next/navigation';

export default function GLBPart({partName}:any) {
  const router = useRouter(); // Use useRouter to handle URL changes
  const searchParams = useSearchParams();
  const [selIndex, setSelIndex] = useState(parseInt(searchParams.get(partName) || '0'));
  const { scene } = useGLTF(`/${partName}${selIndex}.glb`);
  const matcapTexture = useTexture('/img/asd2.jpg');

  useEffect(() => {
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        // o.material = new THREE.MeshMatcapMaterial({
        //   matcap: matcapTexture,
        //   color: "#dd9900",
        // });
        o.material = new THREE.MeshStandardMaterial({
          // matcap: matcapTexture,
          color: "#dd9900",
        });
        o.receiveShadow = true;
        o.castShadow = true;
      }
    });
  }, [matcapTexture, scene, selIndex]);

  const handleClick = (e:any) => {
    e.stopPropagation()
    const newIndex = (selIndex + 1) % 6; // Cycle from 0 to 5
    setSelIndex(newIndex);

    // Update URL parameter using Next.js router
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set(partName, newIndex.toString());
    router.push(`${window.location.pathname}?${newSearchParams.toString()}`, undefined);
  };

  return <primitive onClick={handleClick} position={[0, -0.8, 0]} object={scene} scale={0.5} />;
}
