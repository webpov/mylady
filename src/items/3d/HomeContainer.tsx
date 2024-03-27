import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MdFlipToBack, MdOutlineFace3 } from "react-icons/md";
import { RiBodyScanFill } from "react-icons/ri";
import { TfiLayoutSidebarLeft } from "react-icons/tfi";
import { AiOutlineCaretUp, AiOutlineVerticalAlignBottom } from "react-icons/ai";
import CustomWall from "@/items/3d/CustomWall";
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState, } from 'react'
import CustomBox from "./CustomBox";
import { Fisheye, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import BaseballFieldFloorScale from "./BaseballFieldFloorScale";
import GirlBody from "./GirlBody";
import GirlRightLeg from "./GirlRightLeg";
import GirlLeftLeg from "./GirlLeftLeg";
import GirlHead from "./GirlHead";
import GirlLeftArm from "./GirlLeftArm";
import GirlRightArm from "./GirlRightArm";
import { Orbit } from "next/font/google";
import { GiForearm } from "react-icons/gi";
import { GiMuscularTorso } from "react-icons/gi";
import { GiLeg } from "react-icons/gi";


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


  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  function handleMouseDown(e: any) {
    setMouseDown(true);
    setMousePos({ x: e.clientX, y: e.clientY });
  }
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

      <div className="flex pos-abs bottom-0 right-0  bord-r- pa-2 ma-2">
        <div className="flex-col flex-align-stretch z-700 gap-1 ">
          <div className="flex-center gap-1 opaci-50 tx-ls-5">
            SIZE (ft/in)
          </div>
          <div className="flex-col gap-1 opaci-50 tx-ls-">
            <div className="flex tx-xsm">width: {sizeForm.x}</div>
            <input type="range" min="3" max="77" className="w-100" value={sizeForm.x} onChange={(e) => { be_size(e.target.value, "x") }} />
          </div>
          <div className="flex-col gap-1 opaci-50 tx-ls-">
            <div className="tx-xsm pr-1">length: {sizeForm.z}</div>
            <input type="range" min="3" max="77" className="w-100" value={sizeForm.z} onChange={(e) => { be_size(e.target.value, "z") }} />
          </div>
          <div className="flex-col gap-1 opaci-50 tx-ls-">
            <div className="flex tx-xsm">height: {sizeForm.y}</div>
            <input type="range" min="3" max="55" className="w-100" value={sizeForm.y} onChange={(e) => { be_size(e.target.value, "y") }} />
          </div>
          <div className="flex-col gap-1 opaci-50 tx-ls-">
            <div className="flex tx-xsm">fov: {sizeForm.fov}</div>
            <input type="range" min="33" max="125" className="w-100" value={sizeForm.fov} onChange={(e) => { be_size(e.target.value, "fov") }} />
          </div>
        </div>
      </div>

      <LeftSideButtons
        {...{

          toggleOption,
          optsToggler,
          zOut, xOut,
        }}
      />
      <Canvas shadows camera={{ fov: sizeForm.fov, position: [0, -2, 8], }} >
        <PovCamera  {...{ sizeForm }} />
        <ambientLight intensity={0.1} />
        <pointLight castShadow intensity={0.4} position={[1.5, 3, 3.5]} />
        <fog attach="fog" args={['#000000', 5, zOut * 4]} />
        <CustomBox position={[0, (1.68 / 2) - 0.95, zOut * 1.32]} />
        {optsToggler["floor"].bool && <BaseballFieldFloorScale position={[0, -2.9, 0]} floorWidth={0.1} />}
        {optsToggler["roof"].bool &&
          <group rotation={[0, -Math.PI / 2, 0]}><GirlHead scale={0.5} /></group>
        }
        {optsToggler["backwall"].bool &&
          <CustomWall length={zOut} width={xOut / 2} roofHeight={yOut} position={[0, 0, -(zOut - (wallWidth * (1.5 / 2)))]} thickness={wallWidth} />
        }
        {optsToggler["frontwall"].bool &&
          <group rotation={[0, -Math.PI / 2, 0]}><GirlBody scale={0.5} /></group>
        }
        {optsToggler["rightwall"].bool &&
          <group rotation={[0, -Math.PI / 2, 0]}> <GirlLeftLeg scale={0.5} /> </group>
        }
        {optsToggler["leftwall"].bool &&
          <group rotation={[0, -Math.PI / 2, 0]}> <GirlRightLeg scale={0.5} /> </group>
        }


        {optsToggler["righttopwall"].bool &&
          <group rotation={[0, -Math.PI / 2, 0]}>
            <GirlLeftArm scale={0.5} />
          </group>
        }

        {optsToggler["lefttopwall"].bool &&
          <group rotation={[0, -Math.PI / 2, 0]}>
            <GirlRightArm scale={0.5} />
          </group>
        }
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

export const LeftSideButtons = ({ toggleOption, optsToggler, zOut, xOut }: any) => {

  return (<>

    <div className="flex pos-abs top-0 left-0  bord-r- pa-2 ma-2">
      <div className="flex-col flex-align-stretch z-700 gap-1 tx-white mt-100">

        <div className="flex-center gap-1">
          <div className="tx-sm opaci-50">Current Size (m)</div>
          <div className="flex bg-w- bord-r- opaci-chov--50">{parseInt(xOut * 2 + "")}</div>
          <div>x</div>
          <div className="flex bg-w- bord-r- opaci-chov--50">{parseInt(zOut * 2 + "")}</div>
        </div>
        <div className="flex-col flex-align-stretch gap-2 ">
          <div className="flex-center">
            <button onClick={() => { toggleOption("backwall") }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)", }}
              className={` tx-center w-100  pt-1 bord-r- px-2 opaci-chov--50  tx-lx
${!optsToggler["backwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <MdFlipToBack />
            </button>
          </div>
          <div className="flex tx-center  bord-r-8">
            <button onClick={() => { toggleOption("roof") }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)", }}
              className={` tx-center w-100 px-1 bord-r- px-2 opaci-chov--50  tx-lx pt-2
${!optsToggler["roof"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <div className="scale-150"><MdOutlineFace3 /></div>
            </button>
          </div>
          <div className="flex gap-1">
            <button onClick={() => { toggleOption("lefttopwall") }}
              style={{ filter: "hue-rotate(-189deg) brightness(222%)", }}
              className={`flex-1 tx-center pa-1 bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["lefttopwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <GiForearm />
            </button>
            <button onClick={() => { toggleOption("righttopwall") }}
              style={{ filter: "hue-rotate(-189deg) brightness(222%)", transform: "scale(-1,1)" }}
              className={`flex-1 tx-center pt-2  bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["righttopwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <div className="block" ><GiForearm /></div>
            </button>
          </div>
          <div className="flex-center ">
            <button onClick={() => { toggleOption("frontwall") }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)", }}
              className={` tx-center w-100   bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["frontwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <GiMuscularTorso />
            </button>
          </div>
          <div className="flex gap-1">
            <button onClick={() => { toggleOption("leftwall") }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)", transform: "scale(-1, 1)" }}
              className={`flex-1 tx-center pa-1 bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["leftwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <GiLeg />
            </button>
            <button onClick={() => { toggleOption("rightwall") }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)" }}
              className={`flex-1 tx-center pt-2  bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["rightwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <div className="block" ><GiLeg /></div>
            </button>
          </div>
          <div className="flex-center">
            <button onClick={() => { toggleOption("floor") }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)", }}
              className={` tx-center w-100  pt-1 bord-r- px-2 opaci-chov--50  tx-lx
${!optsToggler["floor"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <AiOutlineVerticalAlignBottom />
            </button>
          </div>
        </div>
      </div>
    </div>
  </>)
}