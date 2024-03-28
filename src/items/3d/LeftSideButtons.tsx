import { MdFlipToBack, MdOutlineFace3 } from "react-icons/md";
import { AiOutlineVerticalAlignBottom } from "react-icons/ai";
import { GiForearm } from "react-icons/gi";
import { GiMuscularTorso } from "react-icons/gi";
import { GiLeg } from "react-icons/gi";


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
            <button onClick={() => { toggleOption("backwall"); }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)", }}
              className={` tx-center w-100  pt-1 bord-r- px-2 opaci-chov--50  tx-lx
${!optsToggler["backwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <MdFlipToBack />
            </button>
          </div>
          <div className="flex tx-center  bord-r-8">
            <button onClick={() => { toggleOption("roof"); }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)", }}
              className={` tx-center w-100 px-1 bord-r- px-2 opaci-chov--50  tx-lx pt-2
${!optsToggler["roof"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <div className="scale-150"><MdOutlineFace3 /></div>
            </button>
          </div>
          <div className="flex gap-1">
            <button onClick={() => { toggleOption("lefttopwall"); }}
              style={{ filter: "hue-rotate(-189deg) brightness(222%)", }}
              className={`flex-1 tx-center pa-1 bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["lefttopwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <GiForearm />
            </button>
            <button onClick={() => { toggleOption("righttopwall"); }}
              style={{ filter: "hue-rotate(-189deg) brightness(222%)", transform: "scale(-1,1)" }}
              className={`flex-1 tx-center pt-2  bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["righttopwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <div className="block"><GiForearm /></div>
            </button>
          </div>
          <div className="flex-center ">
            <button onClick={() => { toggleOption("frontwall"); }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)", }}
              className={` tx-center w-100   bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["frontwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <GiMuscularTorso />
            </button>
          </div>
          <div className="flex gap-1">
            <button onClick={() => { toggleOption("leftwall"); }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)", transform: "scale(-1, 1)" }}
              className={`flex-1 tx-center pa-1 bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["leftwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <GiLeg />
            </button>
            <button onClick={() => { toggleOption("rightwall"); }}
              style={{ filter: "hue-rotate(-189deg) brightness(666%)" }}
              className={`flex-1 tx-center pt-2  bord-r- px-2 opaci-chov--50 tx-lx
${!optsToggler["rightwall"].bool ? "bg-b-hov-20 opaci-25 border-white tx-white" : " tx-blue border-blue"}
`}
            >
              <div className="block"><GiLeg /></div>
            </button>
          </div>
          <div className="flex-center">
            <button onClick={() => { toggleOption("floor"); }}
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
  </>);
};
