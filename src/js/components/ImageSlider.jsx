import React, { useEffect, useRef, useState } from "react";

const ImageSlider = props => {
    const sliderContainer = useRef();
    const [image, setImage] = useState({
        width: 0,
        height: 0,
        visible: true
    });

    const [offset, setOffset] = useState(0);

    const config = {
        img: {
            height: 220,
            width: 340
        },
        margin: 40,
        imagesVisible: 3,
        current: 0,
        showControls: true
    };

    const nextSlide = () => {
        if (config.current < props.images.length - config.imagesVisible) {
            config.current++;
        }
        updateSlides();
    };
    const lastSlide = () => {
        if (config.current > 0) {
            config.current--;
        }
        updateSlides();
    };
    const updateSlides = () => {
        if (offset !== config.current) {
            setOffset(config.current);
            console.log("current", config.current);
        }
    };

    function onResize() {
        if (sliderContainer) {
            const containerWidth = sliderContainer.current.offsetWidth;
            // console.log(rec);
            const width =
                (containerWidth - (config.imagesVisible - 1) * config.margin) /
                config.imagesVisible;
            setImage({ ...image, width: Math.ceil(width) });
            // console.log(image, width, containerWidth);
        }
    }

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div className="ImageSlider">
            <div ref={sliderContainer} className="slider-container">
                <div
                    className="track"
                    style={{
                        transform:
                            "translateX(" +
                            offset * (-image.width - config.margin) +
                            "px)"
                    }}
                >
                    {props.images.map((imageUrl, index) => {
                        return (
                            <div
                                key={Math.random() + ""}
                                style={{
                                    width: image.width + "px",
                                    left:
                                        (image.width + config.margin) * index +
                                        "px",
                                    backgroundImage: `url(${imageUrl})`
                                }}
                            ></div>
                        );
                    })}
                </div>
            </div>
            {config.showControls ? (
                <div className="controls">
                    <div
                        className={offset === 0 ? "last disabled" : "last"}
                        onClick={lastSlide}
                    >
                        <div className="chevron flipped" />
                    </div>
                    <div
                        className={
                            offset ===
                            props.images.length - config.imagesVisible
                                ? "next disabled"
                                : "next"
                        }
                        onClick={nextSlide}
                    >
                        <div className="chevron" />
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default ImageSlider;
