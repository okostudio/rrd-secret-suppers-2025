import React, { useRef, useEffect } from "react";
import FeedYourCuriosity from "../../img/lockups/feed-your-curiosity---sprites.png";
import SecretSuppersLockup from "../../img/lockups/secret-suppers-header-lockup-wide.png";
import SecretSuppersLockupStacked from "../../img/lockups/secret-suppers-lockup--white.png";
import { gsap, SteppedEase } from "gsap";

import BlackBlockTitle from "./BlackBlockTitle";
import { useGSAP } from "@gsap/react";
// import ReactPlayer from "react-player";

function Hero() {
    const lockup = useRef();
    const heroRef = useRef()

    useGSAP(() => {
        gsap.from(lockup.current, {
            duration: 1,
            y: "-100%",
            ease: SteppedEase.config(24),
            delay: 1.5,
        });
    }, [heroRef])

    const video_url =
        window.innerWidth < 768
            ? "/videos/homepage_video_sml.mp4"
            : "/videos/homepage_video.mp4";

    // console.log(video_url);

    return (
        <section className="Hero sr-item" ref={heroRef}>
            <div
                className="background-video full-width"
                style={{
                    backgroundImage: "url(/videos/homepage_video_sml.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <video
                    className="hero-video"
                    width="100%"
                    height="100%"
                    playsInline muted autoPlay loop

                >
                    <source src={video_url} type="video/mp4" />
                </video>
            </div>

            <div className="absolute-overlay-container">
                <div className="container">
                    <div className="feed-your-curiosity">
                        <img
                            ref={lockup}
                            className="lockup"
                            src={FeedYourCuriosity}
                            alt="Red Rock Deli"
                        />
                    </div>
                    <div className="scroll-prompt" />
                </div>
            </div>
        </section>
    );
}

export default Hero;

export function HeroStatic(props) {
    return (
        <React.Fragment>
            <section
                className="Hero HeroStatic sr-item"
                style={{ backgroundImage: `url(${props.backgroundUrl})` }}
            >
                <div className="container">
                    {props.onSecretSupperPage ? (
                        <div className="title">
                            <h1 className="hidden">{props.title}</h1>
                        </div>
                    ) : (
                        <div className="title">
                            <img
                                className="lockup"
                                src={SecretSuppersLockup}
                                alt="Secret Suppers"
                            />
                            <h1>{props.title}</h1>
                        </div>
                    )}
                </div>
            </section>
            <BlackBlockTitle heading={props.h3} subHeading={props.p}>
                {props.onSecretSupperPage ? (
                    <img
                        className="ss-lockup-stacked"
                        src={SecretSuppersLockupStacked}
                        alt="Red Rock Deli, Secret Suppers"
                    />
                ) : (
                    ""
                )}
            </BlackBlockTitle>
        </React.Fragment>
    );
}
