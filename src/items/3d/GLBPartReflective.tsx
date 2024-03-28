import { useEffect, useState, useMemo } from 'react';
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from 'three';
import { useSearchParams, useRouter } from 'next/navigation';

export default function GLBPartReflective({partName}:any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [colorIndex, setColorIndex] = useState(searchParams.get("color") || 'dd9900');
  const [bgIndex, setBgIndex] = useState(parseInt(searchParams.get("bg") || '0'));
  const [selIndex, setSelIndex] = useState(parseInt(searchParams.get(partName) || '0'));

  // Use useMemo to ensure the path is recalculated only when selIndex changes
  const glbPath = useMemo(() => `/${partName}${selIndex}.glb`, [partName, selIndex]);
  const { scene } = useGLTF(glbPath);

  // Use useMemo for textures to avoid re-loading on each render
  const matcapTexture = useTexture(`/img/asd${bgIndex}.jpg`);

  useEffect(() => {
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        o.material = new THREE.MeshMatcapMaterial({
          matcap: matcapTexture,
          color: "#"+colorIndex,
        });
        o.receiveShadow = true;
        o.castShadow = true;
      }
    });
  }, [matcapTexture, scene, selIndex]); // Ensure effect depends on scene and selIndex

  const handleClick = (e:any) => {
    e.stopPropagation();
    const newIndex = (selIndex + 1) % 6; // Cycle from 0 to 5
    setSelIndex(newIndex);

    // Update URL parameter using Next.js router
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set(partName, newIndex.toString());
    router.push(`${window.location.pathname}?${newSearchParams.toString()}`, undefined);
  };

  return <primitive onClick={handleClick} position={[0, -0.8, 0]} object={scene} scale={0.5} />;
}
