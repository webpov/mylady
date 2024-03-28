
export const SliderInputGroup = ({ be_size, sizeForm }: any) => {
  return (<>

    <div className="tx-sans flex pos-abs bottom-25p  right-0 w-100px  bord-r- pa-2 ma-2">
      <div className="flex-col flex-align-stretch tx-bold bg-w-50 bg-glass-10 bord-r-25 py-2 box-shadow-5-b px-2 z-700 gap-1 ">
        <div className="flex-center gap-1 opaci-50 tx-ls-5 tx-center">
          SIZE (ft/in)
        </div>
        <div className="flex-col gap-1 opaci-50 tx-ls-">
          <div className="flex tx-xsm">width: {sizeForm.x}</div>
          <input type="range" min="3" max="77" className="w-100" value={sizeForm.x} onChange={(e) => { be_size(e.target.value, "x"); }} />
        </div>
        <div className="flex-col gap-1 opaci-50 tx-ls-">
          <div className="tx-xsm pr-1">length: {sizeForm.z}</div>
          <input type="range" min="3" max="77" className="w-100" value={sizeForm.z} onChange={(e) => { be_size(e.target.value, "z"); }} />
        </div>
        <div className="flex-col gap-1 opaci-50 tx-ls-">
          <div className="flex tx-xsm">height: {sizeForm.y}</div>
          <input type="range" min="3" max="55" className="w-100" value={sizeForm.y} onChange={(e) => { be_size(e.target.value, "y"); }} />
        </div>
        <div className="flex-col gap-1 opaci-50 tx-ls-">
          <div className="flex tx-xsm">fov: {sizeForm.fov}</div>
          <input type="range" min="33" max="125" className="w-100" value={sizeForm.fov} onChange={(e) => { be_size(e.target.value, "fov"); }} />
        </div>
      </div>
    </div>
  </>);
};
