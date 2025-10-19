import React, { useRef, useEffect, useState } from "react";
import { gsap, Power3 } from "gsap";

const ScrollReveal = (props) => {
    const animationContainerReference = useRef();
    const itemsArray = [];

    const onScroll = () => {
        if (animationContainerReference) {
            itemsArray.map((item) => {
                const itemBounds = item.getBoundingClientRect();

                if (itemBounds.bottom < 0) {
                    // check is not already above viewport:
                    gsap.set(item, {
                        opacity: 1,
                        visibility: "visible",
                    });
                } else if (window.innerHeight + 100 > itemBounds.y) {
                    // check if item is coming into view
                    if (!item.classList.contains("sr-item-showing")) {
                        item.classList.add("sr-item-showing");
                        gsap.to(item, {
                            opacity: 1,
                            visibility: "visible",
                            ease: Power3.easeIn,
                        });
                    }
                }
                return "";
            });
        }
    };

    const [pageLoading, setPageLoading] = useState(true);
    useEffect(() => {
        const timer = { interval: null, timeout: null };
        timer.interval = setInterval(() => {
            if (pageLoading && !props.pageIsLoading) {
                setPageLoading(false);
                if (animationContainerReference) {
                    Array.from(
                        animationContainerReference.current.querySelectorAll(
                            "section"
                        )
                    ).map((item) => {
                        itemsArray.push(item);
                        return "";
                    });
                    itemsArray.map((item) => {
                        if (!item.classList.contains("sr-item-showing")) {
                            gsap.set(item, { opacity: 0 });
                        }
                    });

                    window.addEventListener("scroll", onScroll);
                    onScroll();
                }
            }
        }, 500);

        timer.timeout = setTimeout(() => {
            console.log("cleared timeout");
            window.clearInterval(timer.interval);
        }, 60000 * 5);

        return () => {
            window.clearTimeout(timer.timeout);
            window.clearInterval(timer.interval);
            window.removeEventListener("scroll", onScroll);
            itemsArray.map((item) => {
                gsap.killTweensOf(item);
                return null;
            });
        };
    }, [props.pageIsLoading, animationContainerReference]);

    return (
        <div
            ref={animationContainerReference}
            className="ScrollRevealContainer"
        >
            {props.children}
        </div>
    );
};

export default ScrollReveal;
