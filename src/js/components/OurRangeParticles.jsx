import React, { useEffect, useRef, useState } from "react";
import { FauxRandom, CosRandom } from "../utils/FauxRandom";
import { gsap, Power3, Power4, Sine } from "gsap";
import OurRangeIcons from "./OurRangeIcons";
import { IconLast, IconNext } from "./SVGIcons";
import LoadingAnimation from "../utils/LoaderAnimation";

const OurRangeParticles = props => {
    // console.log("--> Start of OurRangeParticles Component");
    // console.log(">> RANGE >> props.pageIsLoading", props.pageIsLoading);
    const productSpacing = props.data.config.productSpacing;
    // const [current, setCurrent] = useState(props.current.index);
    const [isHidden, setIsHidden] = useState(" hidden");
    const [canUpdate, setCanUpdate] = useState(false);

    // const metaDescription = () => {
    //     if (props.current.product.copy.length > 100) {
    //         return props.current.product.copy.slice(0, 100) + "...";
    //     } else {
    //         return props.current.product.copy;
    //     }
    // };

    // function keyPress(e) {
    //     if (e.key === "Escape") {
    //         // write your logic here.
    //     }
    // }

    const imagesTotal = 2;
    let imagesLoaded = 0;
    const sprites = {
        particles: null,
        product: null,
        globalAlpha: 1
    };
    let hasInit = false;
    const canvasRef = useRef(null);
    const description = useRef();
    let particleArray = [];
    let TL = null;

    let scaleMultiplier = 1;
    let particleDistribution = 1;

    console.log("current: ", props.current.product.packImageUrl)

    String(props.current.product.packImageUrl).indexOf("/dips/") > -1
        ? (particleDistribution = 0.82)
        : (particleDistribution = 1);

    let nextProductUrl = "";

    // load staggger
    const [pageLoading, setPageLoading] = useState(true);
    const [revealDelay, setRevealDelay] = useState(1.0);
    const clearCanvas = () => {
        const can = canvasRef.current;
        const ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);
    };
    useEffect(() => {
        setIsHidden("");
        const can = canvasRef.current;
        const ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);
        description.current.style.opacity = 0;

        setTimeout(() => {
            if (pageLoading && !props.pageIsLoading) {
                // console.log("LOADED RANGE PARTICLES");
                setPageLoading(false);
                setRevealDelay(0.05);
                hasInit = true;
            }
        }, 100);
    }, [props.pageIsLoading]);

    //
    //
    const Product = {
        x: 0,
        y: 0,
        direction: props.current.productAnimationDirection,
        alpha: 1,
        scale: 1,
        rotation: Math.PI * 0.02,
        img: {
            x: 0,
            y: 0,
            size: 600
        }
    };

    //
    const checkRange = (n, i) => {
        let num = parseInt(n) + i;
        num < 0
            ? (num += props.current.products.length)
            : (num %= props.current.products.length);
        return num;
    };

    //
    const nextProduct = increment => {
        // console.log("canUpdate", canUpdate);

        if (canUpdate) {
            setCanUpdate(false);

            Product.direction = -increment;
            const next = checkRange(props.current.index, increment);
            nextProductUrl = `${props.current.group}/${encodeURI(
                props.current.products[next].url
            )}`;
            hideParticles();
            gsap.to(".loader-container", 0.2, {
                opacity: 1,
                ease: Power3.easeIn
            });
        }
    };

    // =======================================
    // image preloader
    // =======================================
    const loadImg = source => {
        if (!window.imageCache) {
            window.imageCache = [];
        }
        const image = {
            el: null,
            source: null
        };
        // check if image is found in image cache.
        const index = window.imageCache.findIndex(img => img.source === source);
        if (index > -1) {
            image.el = window.imageCache[index].el;
            image.source = window.imageCache[index].source;
        } else {
            image.el = document.createElement("img");
            image.el.src = image.source = source;
        }

        if (image.el.complete) {
            // if image was already loaded, use image.
            imagesLoaded++;
            if (imagesLoaded === imagesTotal) {
                setTimeout(allImagesLoaded, 100);
            }
        } else {
            // otherwise, load image, and store it once loaded.
            image.el.onload = () => {
                window.imageCache.push(image);
                imagesLoaded++;
                if (imagesLoaded === imagesTotal) allImagesLoaded();
            };
        }
        return image.el;
    };

    const onLocationChange = () => {
        console.log("window: ", window.location);
    };

    useEffect(() => {
        updateSpriteImages();

        window.addEventListener("popstate", onLocationChange);

        return () => {
            // clean-up on dismount.
            window.removeEventListener("resize", onResize);
            window.removeEventListener("popstate", onLocationChange);
        };
    }, [props.current]);

    const updateSpriteImages = () => {
        sprites.particles = loadImg(props.current.product.particleUrl);
        sprites.product = loadImg(props.current.product.packImageUrl);
    };

    // point at the center of the canvas
    const origin = {
        x: null,
        y: null,
        width: null,
        height: null
    };

    const onResize = () => {
        // console.log(e.target.innerWidth, e.target.innerHeight);
        if (canvasRef.current) {
            const can = canvasRef.current;
            const canBox = can.getBoundingClientRect();
            can.width = can.offsetWidth;
            can.height = can.offsetHeight;
            origin.x = Math.round(can.width * 0.5);
            origin.y = Math.round(can.height * 0.5);
            origin.width = canBox.width;
            origin.height = canBox.height;

            if (hasInit) {
                updateProduct();
                updateCanvas();
            }
        }
    };

    const updateProduct = () => {
        Product.img.x = 0;
        Product.img.y = 0;
        Product.img.size = 600;
        Product.alpha = 1;
        Product.x = 0;
        Product.rotation = Math.PI * 0.05;
        // SCALE
        Product.scale = 0.75;
    };

    const drawProduct = context => {
        context.translate(origin.x + Product.x, origin.y + Product.y);
        context.globalAlpha = Product.alpha;
        context.rotate(Product.rotation);
        context.drawImage(
            sprites.product,
            Product.img.x,
            Product.img.y,
            Product.img.size,
            Product.img.size,
            Product.img.size * -0.5 * Product.scale,
            Product.img.size * -0.5 * Product.scale,
            Product.img.size * Product.scale,
            Product.img.size * Product.scale
        );
        context.rotate(-Product.rotation);
        context.translate(-origin.x - Product.x, -origin.y - Product.y);
    };

    const defineParticles = () => {
        const can = canvasRef.current;
        const config = props.data.config;
        console.log(
            "Defning Particles: ",
            props.current.group,
            "/",
            props.current.product.title
        );

        const data = props.current.product.particles;
        const spriteSheetY =
            (config.smallSpriteSize + config.largeSpriteSize) *
            parseInt(data.index);

        // Set random seed:
        let seed;
        data.randomSeed === 0
            ? (seed = Math.floor(Math.random() * 2000))
            : (seed = data.randomSeed);
        FauxRandom(seed);
        console.log("seed", seed);

        //

        // create new particles.
        // distributed randomly along a diagonal line, extending
        // from the center of the canvas.
        // using data pulled from carouselData.json.
        const newParticle = isSmall => {
            // random position on line:
            const randomLinePosition = CosRandom() * 0.5;
            const randomRange = 60;
            let lineWidth;
            can.width < 500 ? (lineWidth = 200) : (lineWidth = can.width * 0.4);
            let lineHeight = lineWidth * 1.0;

            // large sprites
            let count = data.largeItemCount;
            let size = config.largeSpriteSize;
            let imgY = spriteSheetY + config.smallSpriteSize;
            // small sprites
            if (isSmall) {
                // first 3 particles are hard coded blur images.
                count = data.smallItemCount + 3;
                size = config.smallSpriteSize;
                imgY = spriteSheetY;
            }
            const p = {
                img: {
                    x: Math.floor(FauxRandom() * count) * size,
                    y: imgY,
                    size: size
                },
                wiggle: {
                    x: 0,
                    y: 0,
                    rotation: 0
                },
                x: randomLinePosition * lineWidth + CosRandom() * randomRange,
                y: randomLinePosition * -lineHeight + CosRandom() * randomRange,
                alpha: 1,
                rotation: FauxRandom() * Math.PI * 2,
                scale: FauxRandom() * 0.15 + 0.45
            };

            // asdfasdf
            let nutMultiplier = 1;
            props.current.product.packImageUrl.indexOf("/nuts/") > -1
                ? (nutMultiplier = 0.66)
                : (nutMultiplier = 1);

            if (Math.abs(p.x) < 150 * particleDistribution * nutMultiplier) {
                if (p.x < 0) {
                    p.x -=
                        productSpacing * 0.5 +
                        FauxRandom() *
                        (productSpacing *
                            particleDistribution *
                            nutMultiplier);
                } else {
                    p.x +=
                        productSpacing * 0.5 +
                        FauxRandom() *
                        (productSpacing *
                            particleDistribution *
                            nutMultiplier);
                }
            }

            p.x *= particleDistribution;
            p.y *= particleDistribution;

            return p;
        };

        // blank array for particles.
        particleArray = [];

        // add small particles
        for (let i = 0; i < config.smallSpriteCount; ++i) {
            const p = newParticle(true);
            particleArray.push(p);
        }

        // add large particles
        for (let i = 0; i < config.largeSpriteCount; ++i) {
            const p = newParticle();
            particleArray.push(p);
        }

        // set depth based on particleArray index:
        for (let i = 0; i < Math.floor(config.smallSpriteCount * 0.33); ++i) {
            particleArray[i].depth = 1.25;
        }
        for (
            let i = Math.floor(config.smallSpriteCount * 0.33);
            i < Math.floor(config.smallSpriteCount * 0.66);
            ++i
        ) {
            particleArray[i].depth = 1.5;
        }
        for (
            let i = Math.floor(config.smallSpriteCount * 0.66);
            i < config.smallSpriteCount;
            ++i
        ) {
            particleArray[i].depth = 2.0;
        }
        for (
            let i = config.smallSpriteCount;
            i < config.smallSpriteCount + config.largeSpriteCount;
            ++i
        ) {
            particleArray[i].depth = 2.5;
        }
    };

    const hideParticles = () => {
        if (TL) {
            TL.kill();
        }

        TL = new gsap.timeline({
            delay: 0,
            onUpdate: () => {
                updateCanvas();
            },
            onComplete: () => {
                imagesLoaded = 0;
                props.onClickFunction(nextProductUrl, Product.direction);
            }
        });
        TL.to(
            canvasRef.current,
            0.33,
            {
                opacity: 0,
                ease: Power3.easeIn
            },
            0
        );
        TL.to(Product, 0.33, {
            x: 150 * Product.direction,
            rotation: 0,
            ease: Sine.easeIn
        });
        TL.to(
            description.current,
            0.33,
            {
                opacity: 0,
                ease: Power3.easeIn
            },
            0
        );
        particleArray.map(p => {
            TL.to(
                p,
                0.33,
                {
                    x: p.x * p.depth,
                    y: p.y * p.depth,
                    ease: Sine.easeNone
                },
                0
            );
        });
    };

    const updateCanvas = () => {
        const config = props.data.config;
        const can = canvasRef.current;

        if (can && origin.x && origin.y) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.save();
            // clear canvas
            ctx.clearRect(0, 0, can.width, can.height);

            const drawParticle = p => {
                if (p) {
                    ctx.translate(
                        origin.x + p.x + p.wiggle.x,
                        origin.y + p.y + p.wiggle.y
                    );
                    ctx.globalAlpha = p.alpha;
                    ctx.rotate(p.rotation + p.wiggle.rotation);
                    ctx.drawImage(
                        sprites.particles,
                        p.img.x,
                        p.img.y,
                        p.img.size,
                        p.img.size,
                        p.img.size * -0.5 * p.scale * scaleMultiplier,
                        p.img.size * -0.5 * p.scale * scaleMultiplier,
                        p.img.size * p.scale * scaleMultiplier,
                        p.img.size * p.scale * scaleMultiplier
                    );
                    ctx.rotate(-p.rotation - p.wiggle.rotation);
                    ctx.translate(
                        -p.x - p.wiggle.x - origin.x,
                        -p.y - p.wiggle.y - origin.y
                    );
                }
            };

            // upper layer, has dropshadow
            // ctx.filter = `blur(0px)`;
            for (
                let i = 0;
                i < Math.floor(config.smallSpriteCount * 0.33);
                ++i
            ) {
                drawParticle(particleArray[i]);
            }
            // upper layer, has dropshadow
            ctx.filter = `none`;
            for (
                let i = Math.floor(config.smallSpriteCount * 0.33);
                i < config.smallSpriteCount;
                ++i
            ) {
                drawParticle(particleArray[i]);
            }
            // upper layer, has dropshadow
            ctx.filter = `drop-shadow(0px 20px 5px rgba(0,0,0,0.2))`;
            drawProduct(ctx);

            for (
                let i = config.smallSpriteCount;
                i < config.smallSpriteCount + config.largeSpriteCount;
                ++i
            ) {
                drawParticle(particleArray[i]);
            }

            ctx.restore();
        }
    };

    const initCanvas = () => {
        if (TL) {
            TL.kill();
        }

        TL = new gsap.timeline({
            delay: revealDelay,
            onUpdate: () => {
                updateCanvas();
            }
        });
        // animate product image
        TL.set(canvasRef.current, { opacity: 0 }, 0)
            .set(".icons .icon", { opacity: 0, y: 30 }, 0)
            .to(
                canvasRef.current,
                0.33,
                {
                    opacity: 1,
                    ease: Power3.easeIn
                },
                0
            )
            .from(
                Product,
                1.0,
                {
                    x: 150 * -props.current.productAnimationDirection,
                    ease: Power3.easeOut
                },
                0
            )
            .to(
                description.current,
                0.6,
                {
                    opacity: 1,
                    ease: Power3.easeOut
                },
                0.25
            )
            .staggerTo(
                ".icons .icon",
                0.4,
                { y: 0, opacity: 1, ease: Power3.easeOut },
                0.1,
                0.5
            )
            .to(
                Product,
                4,
                {
                    rotation: "+=0.015",
                    scale: "+=0.02",
                    ease: Sine.easeOut
                },
                0
            );

        // animates particles.
        particleArray.map(p => {
            const pDelay = FauxRandom() * 2;
            TL.to(
                ".loader-container",
                0.3,
                { opacity: 0, ease: Power3.easeIn },
                0
            );
            TL.from(
                p,
                0.8 + pDelay * 0.5,
                {
                    x: p.x * 0.5,
                    y: p.y * 0.5,
                    rotation: p.rotation + CosRandom() * Math.PI * 0.25,
                    ease: Power4.easeOut
                },
                0
            );
            TL.to(
                p.wiggle,
                4 + pDelay * 0.5,
                {
                    x: `+=${p.x * 0.1}`,
                    y: `+=${p.y * 0.1}`,
                    rotation: `+=${CosRandom() * Math.PI * 0.1}`,
                    ease: Sine.easeOut
                },
                0
            );
            TL.from(
                p,
                0.33,
                {
                    alpha: 0,
                    ease: Power3.easeIn
                },
                0
            );
        });
    };

    // MOUNTING -----------------------------
    const allImagesLoaded = () => {
        // console.log("MOUNTING: CURRENT: ", current);

        onResize();
        defineParticles();
        updateProduct();
        initCanvas();
        clearCanvas();
        hasInit = true;
        if (!canUpdate) setCanUpdate(true);

        // on mount.
        window.addEventListener("resize", onResize);

        return () => {
            // console.log("DIS-MOUNTING: CURRENT: ", current);
            window.removeEventListener("resize", onResize);
        };
    };

    return (
        <div className="canvas-container">
            <div className="canvas-inner">
                <LoadingAnimation />
                <canvas
                    width="100%"
                    height="100%"
                    ref={canvasRef}
                    className={"particle-system" + isHidden}
                />
            </div>
            <div ref={description} className={"description" + isHidden}>
                <div className={"copy"}>
                    <h1>{props.current.product.title}</h1>
                    <p className="large">{props.current.product.copy}</p>
                    <p>{props.current.product.subCopy}</p>
                </div>
                <OurRangeIcons onClickFunction={props.showModal} />
            </div>
            <div className={canUpdate ? "controls" : "controls disabled"}>
                <button
                    className={"previous" + isHidden}
                    onClick={() => {
                        nextProduct(-1);
                    }}
                >
                    <IconLast />
                </button>
                <button
                    className={"next" + isHidden}
                    onClick={() => {
                        nextProduct(+1);
                    }}
                >
                    <IconNext />
                </button>
            </div>
            {/* <Helmet>
                <title>{"Red Rock Deli®"}</title>
                <meta name="description" content={props.current.product.copy} />
                <meta
                    name="keywords"
                    content={
                        "Red, Rock, Deli, Chips, Nuts, Feed your curiosity, curious chips and nuts"
                    }
                />
                <meta property="og:site_name" content={"Red Rock Deli®"} />
                <meta name="og:title" content={"Red Rock Deli®"} />
                <meta
                    name="og:description"
                    content={props.current.product.copy}
                />
                <meta
                    property="og:image"
                    content={
                        "https://red-rock-deli-2020.netlify.com" +
                        props.current.product.packImageUrl
                    }
                />
            </Helmet> */}
        </div>
    );
};

export default OurRangeParticles;
