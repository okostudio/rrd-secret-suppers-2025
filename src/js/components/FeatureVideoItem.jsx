import React, { useRef, useState } from "react";

const FeatureVideoItem = props => {
    const videoRef = useRef();
    const [canPlay, setCanPlay] = useState(false);

    return (
        <div className="FeaturedVideoHolder">
            <div
                className={
                    "background" +
                    (props.blackBackground ? " black" : "") +
                    (props.wideBackground ? " wide" : "")
                }
            >
                <div className="container">
                    <div
                        className={
                            canPlay ? "video-holder has-video" : "video-holder"
                        }
                    >
                        <video
                            ref={videoRef}
                            poster={props.posterImageUrl}
                            muted autoPlay loop controls
                            onCanPlay={() => {
                                setCanPlay(true);
                                videoRef.current.play();
                            }}
                        >
                            {/* <source src="/videos/placeholder-video-sq.mp4" /> */}
                        </video>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default FeatureVideoItem;
