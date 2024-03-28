import { Canvas, useThree } from "@react-three/fiber";
import CustomWall from "@/items/3d/CustomWall";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState, } from 'react'
import CustomBox from "./CustomBox";
import { OrbitControls } from "@react-three/drei";
import BaseballFieldFloorScale from "./BaseballFieldFloorScale";
import GirlBody from "./GirlBody";
import GirlRightLeg from "./GirlRightLeg";
import GirlLeftLeg from "./GirlLeftLeg";
import GLBPart from "./GLBPart";
import GirlLeftArm from "./GirlLeftArm";
import GirlRightArm from "./GirlRightArm";
import { LeftSideButtons } from "./LeftSideButtons";
import { SliderInputGroup } from "./SliderInputGroup";


const Component = forwardRef(({ }: any, ref) => {
  useImperativeHandle(ref, () => ({
    resize: (size: any) => {
      let oldNewSize = { ...sizeForm }
      console.log("resize with this", size)
      if (size.width && size.width.feet) {
        console.log("width connected", size.width.feet)
        oldNewSize.x = size.width.feet
      }
      if (size.length && size.length.feet) {
        console.log("length connected", size.length.feet)
        oldNewSize.z = size.length.feet
      }

      s__sizeForm(oldNewSize)
    },
  }));

  const DEFAULT_CARPORT_OTPS = {
    frontwall: { bool: true },
    backwall: { bool: true },
    rightwall: { bool: true },
    leftwall: { bool: true },
    righttopwall: { bool: true },
    lefttopwall: { bool: true },
    roof: { bool: true },
    floor: { bool: true },
    services: { bool: true },
  }
  const [optsToggler, s__optsToggler]: any = useState(DEFAULT_CARPORT_OTPS)
  const toggleOption = (opt: any) => {
    let oldBool = optsToggler[opt].bool
    s__optsToggler({ ...optsToggler, ...{ [opt]: { bool: !oldBool } } })
  }
  const wallWidth = 0.1
  const wideFeet = 5
  const lengthFeet = 16
  const heightFeet = 24
  const [sizeForm, s__sizeForm] = useState({
    x: wideFeet, z: lengthFeet, y: heightFeet,
    fov: 50,
  })
  const xOut = useMemo(() => {
    return sizeForm.x / 3.281
  }
    , [sizeForm.x])
  const zOut = useMemo(() => {
    return sizeForm.z / 3.281
  }
    , [sizeForm.z])
  const yOut = useMemo(() => {
    return sizeForm.y / 3.281
  }
    , [sizeForm.y])
  const be_size = (e: any, propName: any) => {
    let theNewSize = { ...sizeForm, ...{ [propName]: e } }
    s__sizeForm(theNewSize)
  }

  return (
    <div className='h-min-500px w-100 flex-col g-b-20 bord-r- flex-align-stretch flex-justify-stretch pos-rel'>
      <SliderInputGroup {...{ be_size, sizeForm }} />
      <LeftSideButtons {...{toggleOption, optsToggler, zOut, xOut, }} />
      <Canvas shadows camera={{ fov: sizeForm.fov, position: [0, -2, 8], }} >
        <PovCamera  {...{ sizeForm }} />
        <ambientLight intensity={0.1} />
        <pointLight castShadow intensity={0.4} position={[1.5, 3, 3.5]} />
        <fog attach="fog" args={['#000000', 5, zOut * 4]} />
        <CustomBox position={[0, (1.68 / 2) - 0.95, zOut * 1.32]} />
        {optsToggler["floor"].bool && <BaseballFieldFloorScale position={[0, -2.9, 0]} floorWidth={0.1} />}
        {optsToggler["backwall"].bool && <CustomWall length={zOut} width={xOut / 2} roofHeight={yOut} position={[0, 0, -(zOut - (wallWidth * (1.5 / 2)))]} thickness={wallWidth} /> }
        <GirlCollection {...{optsToggler}} />
      </Canvas>
    </div>)
})

Component.displayName = 'HomeContainer'

export default Component

export const PovCamera = ({ sizeForm }: any) => {
  const config = { fov: sizeForm.fov, position: [0, 0, 10] }
  const camera: any = useThree(state => state.camera)

  useEffect(() => {
    camera.fov = sizeForm.fov;
    camera.updateProjectionMatrix();
  }, [sizeForm.fov, camera]);
  return (<>
    <OrbitControls
      {...config}
      autoRotate
      autoRotateSpeed={0.1}
      position={[0, 0, 10]}
    />
  </>)
}

export const GirlCollection = ({optsToggler}:any) => {
  return (<>
    {optsToggler["roof"].bool && <group rotation={[0, -Math.PI / 2, 0]}><GLBPart partName={"head"} scale={0.5} /></group> }
    {optsToggler["frontwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}><GLBPart partName={"body"} scale={0.5} /></group> }
    {optsToggler["rightwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}><GLBPart partName={"leftleg"} scale={0.5} /></group> }
    {optsToggler["leftwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}><GLBPart partName={"rightleg"} scale={0.5} /></group> }
    {optsToggler["righttopwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}><GLBPart partName={"leftarm"} scale={0.5} /></group> }
    {optsToggler["lefttopwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}><GLBPart partName={"rightarm"} scale={0.5} /></group> }
    {/* {optsToggler["frontwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}><GirlBody scale={0.5} /></group> }
    {optsToggler["rightwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}> <GirlLeftLeg scale={0.5} /> </group> }
    {optsToggler["leftwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}> <GirlRightLeg scale={0.5} /> </group>}
    {optsToggler["righttopwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}> <GirlLeftArm scale={0.5} /> </group> }
    {optsToggler["lefttopwall"].bool && <group rotation={[0, -Math.PI / 2, 0]}> <GirlRightArm scale={0.5} /> </group> } */}

  </>)
}