"use client";
import { Center, Text3D, useTexture } from "@react-three/drei";



export const TokenBalanceDisplay = ({ tokenBalance }: any) => {
    const matcapTexture = useTexture('/img/beachmini.jpg');
    if (!tokenBalance) { return (<></>); }
    return (<>
        <Center>
            <Text3D position={[-0.4, 0, 0.05]} font={"./font.json"} // {...textOptions}
                size={0.5}
            >
                {tokenBalance}
                {/* <meshNormalMaterial /> */}
                <meshMatcapMaterial matcap={matcapTexture} side={2}
                    color={"#ff9900"} />
            </Text3D>
            <Text3D position={[0.4, 0, -0.05]} font={"./font.json"} // {...textOptions}
                rotation={[0, Math.PI, 0]}
                size={0.5}
            >
                {tokenBalance}
                {/* <meshNormalMaterial /> */}
                <meshMatcapMaterial matcap={matcapTexture} side={2}
                    color={"#ff9900"} />
            </Text3D>
        </Center>
    </>);
};
