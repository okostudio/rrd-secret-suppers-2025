import React, { useRef, useEffect, useState } from "react";
import { gsap, Power2 } from "gsap";

const PageTransition = (props) => {
    const canvas = useRef();
    const offset = { y1: 0, y2: 0, y3: 0 };
    const width = window.innerWidth;
    const height = window.innerHeight;

    // check for loading.
    const drawCanvas = () => {
        const ctx = canvas.current.getContext("2d");
        const boundingBox = canvas.current.getBoundingClientRect();
        ctx.width = width;
        ctx.height = height;
        canvas.current.width = boundingBox.width;
        canvas.current.height = boundingBox.height;
        ctx.clearRect(0, 0, width, height);

        const draw = (color, _y) => {
            ctx.beginPath();
            ctx.moveTo(0, offset.y1);
            ctx.quadraticCurveTo(width * 0.5, _y, width, offset.y1);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.lineTo(0, 0);
            ctx.fillStyle = color;
            ctx.fill();
        };

        draw("#131417", offset.y2);
    };

    const revealAniamtion = () => {
        canvas.current.style.background = "none";
        const tl = new gsap.timeline({
            onUpdate: drawCanvas,
            onComplete: () => {
                canvas.current.style.display = "none";
            },
        });
        tl.to(offset, 1.0, { y2: height, ease: Power2.easeInOut }, 0.0);
        tl.to(offset, 0.8, { y1: height, ease: Power2.easeInOut }, 0.2);
    };

    useEffect(() => {
        if (canvas.current) drawCanvas();
    }, [canvas.current]);

    const [pageLoading, setPageLoading] = useState(props.pageIsLoading);
    useEffect(() => {
        setTimeout(() => {
            if (pageLoading && !props.pageIsLoading) {
                // console.log("LOADED");
                setPageLoading(false);
                revealAniamtion();
            }
        }, 200);
    }, [props.pageIsLoading]);

    return (
        <React.Fragment>
            <canvas ref={canvas} className="page-transition" />
            {pageLoading ? <div className="page-blocker" /> : ""}
        </React.Fragment>
    );
};
export default PageTransition;
