import { MdFlipToBack, MdOutlineFace3 } from "react-icons/md";
import { AiOutlineVerticalAlignBottom } from "react-icons/ai";
import { GiForearm, GiChestArmor , GiFemaleLegs  } from "react-icons/gi";
import Link from "next/link";
import { HiCubeTransparent } from "react-icons/hi";

const ButtonComponent = ({ onClick, isActive, icon, iconTransform = "", iconScale = "" }:any) => {
  const activeClass = isActive ? " tx-blue" : "bg-trans  tx-white";
  const style = {
    filter: "hue-rotate(-189deg) brightness(666%)",
    transform: iconTransform,
  };
  return (
    <button onClick={onClick} style={style} className={`flex-col h-min-50px  tx-center w-100 bord-r- px-2 opaci-chov--50 tx-lx pt-1 ${activeClass} bord-r-15`}>
      <div className={`pos-abs`}>{icon}</div>
    </button>
  );
};

export const LeftSideButtons = ({ toggleOption, optsToggler, zOut, xOut }:any) => {
  return (
    <>
      <div className='flex flex-justify-center my-8 gap-4 pos-fix w-100 z-800  ' >
                    
        <div className="pos-abs top-0 left-0 flex gap-2 tx-white  z-800 ">
          <Link href="/" className="a tx-xl flex z-400 tx-white tx-altfont-3 px-4">
            <img src="/img/mylady.png" width={64} alt="logo" className="" style={{
              filter: "hue-rotate(-119deg) brightness(100%) invert(1)",
            }} />
            <div className="a tx-lx tx-bold-8 tx-altfont-5 mb-7 translate-y--" style={{color:"#ffffff",fontWeight:"1px"}}>M</div>
            <div className="a tx-lx tx-bold-2 tx-altfont-5 mb- translate-y--" style={{color:"#ffffff",fontWeight:"1px"}}>y</div>
            <div className="a tx-xl tx-bold-8 tx-altfont-1" style={{color:"#ffbb44"}}>L</div>
            <div className="a tx-xl tx-bold-8 tx-altfont-1" style={{color:"#ffbb44"}}>a</div>
            <div className="a tx-xl tx-bold-8 tx-altfont-1" style={{color:"#ffbb44"}}>d</div>
            <div className="a tx-xl tx-bold-8 tx-altfont-1" style={{color:"#ffbb44"}}>y</div>
            {/* <img src="/img/mylady.png" width={64} alt="logo" className="px-1" /> */}
          </Link>
          {/* <div className="a tx-xl">Duno</div> */}
        </div>
        <div className=' tx-blue  tx-xl px-8 opaci-chov--50 z-800 pos-abs right-0'
          style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
        >
          <HiCubeTransparent />
        </div>
        <div className='tx-white blur-4 z-500 pos-abs top-0 right-0 noclick'>
          <Link href="/config/global/" className=' tx-blue tx-xl px-8 opaci-chov--50 '
            style={{filter: "hue-rotate(-189deg) brightness(666%)", }}
          >
            <HiCubeTransparent />
          </Link>
        </div>
      </div>
      <div className="flex pos-abs top-0 left-0 bord-r- pa-2 ma-2">
        <div className="flex-col flex-align-stretch z-700 gap-1 tx-white mt-100">
          {/* Size Display */}
          <div className="flex-col gap-1">
            <div className="tx-sm opaci-50">Size (m)</div>
            <div className="flex-center gap-1">
              <div className="flex bg-w- bord-r- opaci-chov--50">{parseInt(xOut * 2 + "")}</div>
              <div>x</div>
              <div className="flex bg-w- bord-r- opaci-chov--50">{parseInt(zOut * 2 + "")}</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex-col flex-align-stretch gap-2 ">
            <ButtonComponent onClick={() => toggleOption("backwall")} isActive={optsToggler["backwall"].bool} 
            icon={<MdFlipToBack />} 
            />
            <ButtonComponent onClick={() => toggleOption("roof")} isActive={optsToggler["roof"].bool} 
            icon={<MdOutlineFace3 className="" />} 
            iconScale="150" />
            <div className="flex gap-1">
              <ButtonComponent onClick={() => toggleOption("lefttopwall")} isActive={optsToggler["lefttopwall"].bool} 
              icon={<GiForearm className="tx-lgx" />} 
              />
              <ButtonComponent onClick={() => toggleOption("righttopwall")} isActive={optsToggler["righttopwall"].bool} 
              icon={<GiForearm className="tx-lgx" />} 
              iconTransform="scale(-1,1)" />
            </div>
            <ButtonComponent onClick={() => toggleOption("frontwall")} isActive={optsToggler["frontwall"].bool} 
            icon={<GiChestArmor  />} 
            />
            <div className="flex gap-1">
              <ButtonComponent onClick={() => toggleOption("leftwall")} isActive={optsToggler["leftwall"].bool} 
              icon={<GiFemaleLegs  className="tx-lgx" />} 
              iconTransform="scale(-1, 1)" />
              <ButtonComponent onClick={() => toggleOption("rightwall")} isActive={optsToggler["rightwall"].bool} 
              icon={<GiFemaleLegs  className="tx-lgx" />} 
              />
            </div>
            <ButtonComponent onClick={() => toggleOption("floor")} isActive={optsToggler["floor"].bool} 
            icon={<AiOutlineVerticalAlignBottom />} 
            />
          </div>
        </div>
      </div>
    </>
  );
};
