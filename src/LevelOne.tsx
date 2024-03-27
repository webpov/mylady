"use client";
import { Cylinder, Html, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TokenBalanceDisplay } from "./TokenBalanceDisplay";



export const LevelOne = ({ score, s__score, tokenBalance }: any) => {
    const matcapTexture = useTexture('/img/beachmini.jpg');
    const MAX_VEL = -0.01;
    const [vel, s__vel] = useState(MAX_VEL);
    const [finishCounter, s__finishCounter] = useState(0);
    const $box: any = useRef(null);
    const finishGame = () => { if (score == 0) { s__score(-1); } else { s__score(-score); } };
    const boxClick = () => {
        if (score < 0) { return window.location.reload(); }
        s__vel((velocity) => (velocity + 0.04));
        if (score > 8) { finishGame(); alert("You Win!"); return; }
        s__score(score + 1);
    };
    useFrame(() => {
        if (score < 0) { return; }
        if (!$box.current) { return; }
        $box.current.position.y += vel;
        if ($box.current.position.y < -2 && score >= 0) {

            if (finishCounter == 0) {
                alert("You Lose!");
                finishGame();
                s__finishCounter(finishCounter + 1);
            }
        }
        if (vel <= MAX_VEL) { return; }
        s__vel(vel - 0.001);
    });
    return (<>
        {score < -7 && <Html center position={[0, 2, 0]}><h1 className="tx-bold-2 nowrap tx-center">You Win!</h1></Html>}
        <group ref={$box}>
            <TokenBalanceDisplay tokenBalance={tokenBalance} />

            <Cylinder args={[0.5, 0.5, 0.25]} onClick={boxClick} rotation={[Math.PI / 2, 0, 0]}>
                {/* <meshStandardMaterial  color={`#${score}0${score/2}000`} />  */}

                <meshMatcapMaterial matcap={matcapTexture}
                    color={`#df${score}000`} />
            </Cylinder>
        </group>
    </>);
};
