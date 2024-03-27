"use client";
import { Box, Center, Cylinder, OrbitControls, Stage, Text3D, useTexture } from "@react-three/drei"  
import { Canvas, useFrame } from "@react-three/fiber"  
import { useEffect, useMemo, useRef, useState } from "react"; 
import { Web3Provider } from "@/Web3Provider";
import ConnectWalletCard from "@/ConnectWalletCard";
import { NGirlModule } from "./NGirlModule";
import HomeContainer from "./items/3d/HomeContainer";


export const GameContainer = () => { 
    const [addd, s__addd] = useState(null) 
    const [counter, s__counter] = useState(0) 
    const [score, s__score] = useState(0) 
    const $solCard:any = useRef(null)
    const tokenBalance = useMemo(()=>{
        console.log("asdasqweqweqw")
        if (!$solCard.current) { return 0 }
        return $solCard.current.tokBal
    },[$solCard.current?.tokBal])
    const userAddress = useMemo(()=>{
        console.log("asdasqweqweqw")
        if (!$solCard.current) { return "" }
        return $solCard.current.solAddress
    },[$solCard.current?.solAddress])
     const callbackConnect = () => {
        setTimeout(()=>{
            console.log("callbackConnect", $solCard.current?.solAddress )
            if (!$solCard.current) { return }
            s__addd($solCard.current.solAddress)
        },1000)
    }
    useEffect(()=>{
        if(counter > 0) { return}
        s__counter(counter+1)
    },[])
    const $boxContainer:any = useRef(null)
    return (<> 
        <div className='flex-col w-100 h-min-100vh pos-rel ' style={{background:"#000"}} >
        <div className="h-min-100vh w-100   flex-col flex-justify-start flex-align-stretch" style={{}} >
            <div className="pos-abs h-min-100vh  w-100 flex z-10 flex-align-stretch top-0 left-0">
            <HomeContainer ref={$boxContainer} />
        </div>
        </div>
        </div>
    </>)
        return (<> 
      <Web3Provider><>
      <div className="pos-abs left-0 z-500">
        <a href="/" className="opacic-hov--50 opaci-chov--50  pa-4">
            <img src="/img/firelong.png" width={64}  className=" pt-4 "/>
        </a>

      </div>
            <a className="pos-abs right-0 z-500 pa-2 px-4 block  flex z-900 pointer"  href="https://x.com/webpov" target="_blank">
                <img src="/img/x.jpg" width={32} className="opaci-chov--50 bord-r-10 pointer" />
            </a>
      {/* <div className="pos-abs right-0 z-500">
        <div >
            <a className=" pa-2 px-4 block pos-rel flex z-900 pointer"  href="/">
                <img src="/img/x.jpg" width={32} className="opaci-chov--50 bord-r-10 pointer" />
            </a>
        </div>

      </div> */}
      <div className=" z-800 mt-4  pos-rel pos-abs top-50p ">
            <div className='tx-shadow-5   tx-lgx  z-900 tx-altfont-5 tx-bold-4 tx-ls-3 block  '>
                
                <ConnectWalletCard callbackConnect={callbackConnect} ref={$solCard}  name='phantom' />
            </div>      
        </div>
        <div className="  pos-abs"><h1>3D Web Game</h1></div> 
        {!!tokenBalance && 
            <div  className="pos-abs z-800 right-0 pr-8 bottom-0 mb-100 "><h3>Balance: {tokenBalance}</h3></div> 
        }
        <div className="pos-abs z-200" ><h3>Score: {Math.abs(score)}</h3></div> 
        <div className="pos-abs z-200"  style={{ 
            top:"0", left:"0", width:"100%", height:"100%" ,
                background: "#AFE8F0"
            }}> 
            <Canvas> 
                <OrbitControls autoRotate autoRotateSpeed={score} enablePan={false}  /> 
                <Box position={[0,-2,0]}> <meshStandardMaterial wireframe /> </Box>  
                {!!addd && <>
                {/* <pointLight position={[0, 3, 2]} distance={20} intensity={120} />  */}
                {/* <ambientLight intensity={.05} /> 
                 */}
                    {/*<LevelOne tokenBalance={tokenBalance} score={score} s__score={s__score} />  */}
                    <NGirlModule />
                </>
                }
                {!!$solCard.current && !addd     && <>
                <InitStage $solCard={$solCard} />
                    {/* <Stage  intensity={0.5} shadows="contact" > */}
                    
{/* </Stage> */}

                </>}
        </Canvas> 
        </div> 
      </></Web3Provider>
      </>) 
}
export const InitStage = ({$solCard}:any) => {
    const matcapTexture = useTexture('/img/beachmini.jpg');
    const $initCoin:any = useRef(null)
    const [rotVel, s__rotVel] = useState(0.01)
    useFrame(() => {
        if (!$initCoin.current) { return }
        $initCoin.current.rotation.y += rotVel
        $initCoin.current.rotation.x += rotVel/2.5
        $initCoin.current.position.y = Math.sin(Date.now()/3000) * 1 + 1.5

        if (rotVel > 0.1) {
            s__rotVel(rotVel + 0.001)
        }
        // console.log("rotVel", rotVel)
        if (rotVel > 0.5) {
            alert("Web3 Wallet not Found, reloading game!")
            window.location.reload()
        }
    })
    return (<>
        <ambientLight intensity={0.25} /> 
  <group ref={$initCoin}>
  <Box args={[0.15,0.25,0.2]} position={[0.15,0.6,-0.1]}><meshMatcapMaterial  matcap={matcapTexture} side={2}color={"#ffcc77"}  /></Box>
    <Box args={[0.15,0.25,0.2]} position={[-0.15,0.6,-0.1]}><meshMatcapMaterial  matcap={matcapTexture} side={2}color={"#ffcc77"}  /></Box>
    <Box args={[0.15,0.25,0.2]} position={[0.15,-0.7,-0.1]}><meshMatcapMaterial  matcap={matcapTexture} side={2}color={"#ffcc77"}  /></Box>
    <Box args={[0.15,0.25,0.2]} position={[-0.15,-0.7,-0.1]}><meshMatcapMaterial  matcap={matcapTexture} side={2}color={"#ffcc77"}  /></Box>
  <Center position={[0,-0.05,0]} >
  <Text3D position={[-0.5,-0,0.05]} font={"./font.json"} // {...textOptions}
  size={1.25}
  >
  {"$"}
  {/* <meshNormalMaterial /> */}
  <meshMatcapMaterial  matcap={matcapTexture} side={2}
      color={"#ffbb66"}  
  />
</Text3D>
<Text3D position={[0.61,-0,-0.05]} font={"./font.json"} // {...textOptions}
rotation={[0,Math.PI,0]}
  size={1.2}
  >
  {"B"}
  {/* <meshNormalMaterial /> */}
  <meshMatcapMaterial  matcap={matcapTexture} side={2}
      color={"#ffbb66"}  
  />
</Text3D>
</Center>  
  <Cylinder  args={[1,1,.3]} onClick={()=>{
    s__rotVel(0.11)
    $solCard.current.handleToggleConnect()
  }} rotation={[Math.PI/2,0,0]}> 
      {/* <meshStandardMaterial  color={`#fff`} />  */}
      
  <meshMatcapMaterial  matcap={matcapTexture} side={2}
      color={"#ff9900"}  
  />
  </Cylinder> 
  </group>
    </>)
}



