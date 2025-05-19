"use client"
import React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "motion/react"
import { useRef } from "react"
import Image from "next/image";
import TopRated from "../royalCanin.jpeg"

export default function ScrollLinked2() {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  return (
    <div id="example">
      <motion.ul className="bg-transparent w-full" ref={ref} style={{ maskImage }}>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
        <li className={`bg-[url(./background2.svg)] bg-repeat bg-cover`}><Image src={TopRated} alt={"product"} className="flex justity-center mx-auto my-auto" style={{ maxHeight: "120px", maxWidth: "120px" }} /></li>
      </motion.ul>
      <StyleSheet />
    </div>
  );
}

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}

/**
* ==============   Styles   ================
*/

function StyleSheet() {
  return (
    <style>{`
            #example {
              width: 100vw;
              max-width: 100vw;
              position: relative;
            }
  
            #example #progress {
                position: absolute;
                top: -65px;
                left: -15px;
                transform: rotate(-90deg);
            }
  
            #example .bg {
                stroke: #0b1011;
            }
  
            #example #progress circle {
                stroke-dashoffset: 0;
                stroke-width: 10%;
                fill: none;
            }
  
            #progress .indicator {
                stroke: var(--accent);
            }
  
            #example ul {
                display: flex;
                list-style: none;
                height: 220px;
                overflow-x: scroll;
                padding: 20px 0;
                flex: 0 0 600px;
                margin: 0 auto;
                gap: 20px;
            }
  
            #example ::-webkit-scrollbar {
                height: 5px;
                width: 5px;
                background: #fff3;
                -webkit-border-radius: 1ex;
            }
  
            #example ::-webkit-scrollbar-thumb {
                background: var(--accent);
                -webkit-border-radius: 1ex;
            }
  
            #example ::-webkit-scrollbar-corner {
                background: #fff3;
            }
  
            #example li {
                flex: 0 0 200px;
                background: var(--accent);
            }
  
    `}
    </style>
  );
}