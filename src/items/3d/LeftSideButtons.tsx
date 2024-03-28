import { MdFlipToBack, MdOutlineFace3 } from "react-icons/md";
import { AiOutlineVerticalAlignBottom } from "react-icons/ai";
import { GiForearm, GiChestArmor , GiFemaleLegs  } from "react-icons/gi";

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
