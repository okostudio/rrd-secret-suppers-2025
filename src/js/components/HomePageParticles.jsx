import React, { useRef } from "react";
import { FauxRandom, CosRandom } from "../utils/FauxRandom";
import { ImagePreloader } from "../utils/ImagePreloader";
import { gsap, Power4, Power3, Sine } from "gsap";
import { IconLast, IconNext } from "./SVGIcons";
// import history from "../history";

const HomePageParticles = props => {
    // console.log("--> Start of HomePageParticles Component");

    // Main OBJECT for Slider.
    const Slider = {
        current: 0,
        direction: 0,
        particleSprites: null,
        productSprites: [],
        isUpdatable: false,
        hasInit: false,
        ctx: null,
        canvas: useRef(null),
        Products: [],
        ImageArray: [],
        TL: null,
        scaleMultiplier: 1,
        particleDistribution: 1,
        linkTo: "/our-range/",
        next: 1,
        previous: 5
    };

    // Set canvas Origin.
    const origin = {
        x: null,
        y: null,
        width: null,
        height: null
    };

    // Images pre-loaded ==========================================================
    const ImageURLArray = [];

    let i = 0;
    for (const key in props.data.product) {
        const p = {
            TL: null,
            product: props.data.product[key][0],
            category: key,
            timeline: null,
            sprite: {
                x: 0,
                y: 0,
                alpha: 1,
                scale: 0.75,
                rotation: Math.PI * 0.02,
                img: {
                    x: 0,
                    y: 0,
                    size: 600
                }
            },
            particles: [],
            index: i,
            productImage: null,
            particleImage: null
        };
        Slider.Products.push(p);

        ++i;
    }

    // console.log("PRODUCTS", Slider.Products);

    Slider.Products.map(p => {
        ImageURLArray.push(p.product.packImageUrl);
        ImageURLArray.push(p.product.particleUrl);
        return "";
    });

    //

    //

    ///////////////////////////////////////////////////////////////////
    //
    // RUN THIS AT THE BOTTOM OF SCRIPT.
    //
    ///////////////////////////////////////////////////////////////////
    //
    //
    // Slider.ImageArray = ImagePreloader(ImageURLArray, () => {
    //     allImagesLoaded();
    // });
    //
    //
    ////////////////////////////////////////////////////////////////////

    //

    //

    // Controls ==========================================================
    const checkRange = (n, i) => {
        let num = parseInt(n) + i;
        num < 0
            ? (num += Slider.Products.length)
            : (num %= Slider.Products.length);
        return num;
    };

    //

    // Canvas Resize ==========================================================
    const onResize = () => {
        const can = Slider.canvas.current;
        if (can) {
            const canBox = can.getBoundingClientRect();
            can.width = can.offsetWidth;
            can.height = can.offsetHeight;
            origin.x = Math.round(can.width * 0.5);
            origin.y = Math.round(can.height * 0.5);
            origin.width = canBox.width;
            origin.height = canBox.height;
        }

        if (Slider.hasInit) {
            updateCanvas();
        }
    };

    //

    //
    const nextProduct = increment => {
        if (Slider.isUpdatable) {
            Slider.isUpdatable = false;

            Slider.direction = -increment;
            Slider.current = checkRange(Slider.current, increment);
            Slider.next = checkRange(Slider.current, 1);
            Slider.previous = checkRange(Slider.current, -1);

            Slider.linkTo =
                "/our-range/" + Slider.Products[Slider.current].category + "/";
            // -- to implement ------
            updateProducts();
            updateTimelines();
        }
    };

    // Images pre-loaded =========================================================

    const initProducts = _Slider => {
        _Slider.Products.map(product => {
            // define images.
            product.productImage = _Slider.ImageArray[product.index * 2];
            product.particleImage = _Slider.ImageArray[product.index * 2 + 1];

            initParticles(product);
            createParticleAnimation(product);
            return "";
        });
        updateProducts();
        updateCanvas();
    };

    const drawProduct = (context, Product) => {
        context.translate(
            origin.x + Product.sprite.x,
            origin.y + Product.sprite.y
        );
        context.globalAlpha = Product.sprite.alpha;
        context.rotate(Product.sprite.rotation);

        context.drawImage(
            Product.productImage,
            Product.sprite.img.x,
            Product.sprite.img.y,
            Product.sprite.img.size,
            Product.sprite.img.size,
            Product.sprite.img.size * -0.5 * Product.sprite.scale,
            Product.sprite.img.size * -0.5 * Product.sprite.scale,
            Product.sprite.img.size * Product.sprite.scale,
            Product.sprite.img.size * Product.sprite.scale
        );
        context.rotate(-Product.rotation);
        context.resetTransform();
    };

    const drawParticle = (p, _ctx, imgElement) => {
        if (p) {
            _ctx.translate(
                origin.x + p.x + p.wiggle.x,
                origin.y + p.y + p.wiggle.y
            );
            _ctx.globalAlpha = p.alpha;
            _ctx.rotate(p.rotation + p.wiggle.rotation);
            _ctx.drawImage(
                // Source image element.
                imgElement,
                p.img.x,
                p.img.y,
                p.img.size,
                p.img.size,
                p.img.size * -0.5 * p.scale * Slider.scaleMultiplier,
                p.img.size * -0.5 * p.scale * Slider.scaleMultiplier,
                p.img.size * p.scale * Slider.scaleMultiplier,
                p.img.size * p.scale * Slider.scaleMultiplier
            );
            _ctx.rotate(-p.rotation - p.wiggle.rotation);
            _ctx.translate(
                -p.x - p.wiggle.x - origin.x,
                -p.y - p.wiggle.y - origin.y
            );
        }
    };

    const updateProducts = () => {
        const spread = 440;
        const time = 0.75;
        const dir = Slider.direction;
        const next = Slider.Products[Slider.next];
        const curr = Slider.Products[Slider.current];
        const prev = Slider.Products[Slider.previous];

        next.sprite.x = spread;
        next.sprite.scale = 0.4;
        next.sprite.rotation = 0;
        curr.sprite.x = 0;
        curr.sprite.scale = 0.75;
        curr.sprite.rotation = Math.PI * 0.02;
        curr.TL.play(0);
        prev.sprite.x = -spread;
        prev.sprite.scale = 0.4;
        prev.sprite.rotation = 0;

        if (Slider.TL) Slider.TL.kill();
        Slider.TL = new gsap.timeline();
        const tweenObject = {
            x: "+=" + spread * -dir,
            scale: 0.4,
            rotation: Math.PI * 0.02,
            ease: Power3.easeOut
        };

        // current / center
        Slider.TL.from(curr.sprite, time, { ...tweenObject, rotation: 0 }, 0);

        if (dir > 0) {
            Slider.TL.from(
                next.sprite,
                time,
                { ...tweenObject, scale: 0.75 },
                0
            );
            Slider.TL.from(
                prev.sprite,
                time,
                { ...tweenObject, scale: 0, x: "+=0" },
                0
            );
        }
        if (dir < 0) {
            Slider.TL.from(
                next.sprite,
                time,
                { ...tweenObject, scale: 0, x: "+=0" },
                0
            );
            Slider.TL.from(
                prev.sprite,
                time,
                { ...tweenObject, scale: 0.75 },
                0
            );
        }
    };

    const updateTimelines = () => {
        updateCanvas();
        Slider.isUpdatable = true;
    };

    const initParticles = _product => {
        const can = Slider.canvas.current;
        const config = props.data.config;
        const data = _product.product.particles;
        const spriteSheetY =
            (config.smallSpriteSize + config.largeSpriteSize) *
            parseInt(data.index);
        //
        // Set random seed:
        let seed;
        data.randomSeed === 0
            ? (seed = Math.floor(Math.random() * 2000))
            : (seed = data.randomSeed);
        FauxRandom(seed);
        // console.log(">>> RANDOM SEED: ", seed);

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

            //

            // Adjust spacing for small packaging.
            let multiplier = 1;
            _product.product.packImageUrl.indexOf("/nuts/") > -1
                ? (multiplier = 0.66)
                : (multiplier = 1);

            _product.product.packImageUrl.indexOf("/dips/") > -1
                ? (multiplier = 0.82)
                : (multiplier = 1);

            // check particle is not too close to pack.
            if (
                Math.abs(p.x) <
                150 * Slider.particleDistribution * multiplier
            ) {
                if (p.x < 0) {
                    p.x -=
                        config.productSpacing * 0.5 +
                        FauxRandom() *
                        (config.productSpacing *
                            Slider.particleDistribution *
                            multiplier);
                } else {
                    p.x +=
                        config.productSpacing * 0.5 +
                        FauxRandom() *
                        (config.productSpacing *
                            Slider.particleDistribution *
                            multiplier);
                }
            }

            //
            p.x *= Slider.particleDistribution;
            p.y *= Slider.particleDistribution;

            return p;
        };

        // blank array for particles.
        _product.particles = [];
        const smlCount = config.smallSpriteCount;
        const lrgCount = config.largeSpriteCount;

        // add small particles
        for (let i = 0; i < smlCount; ++i) {
            const p = newParticle(true);
            _product.particles.push(p);
        }

        // add large particles
        for (let i = 0; i < lrgCount; ++i) {
            const p = newParticle();
            _product.particles.push(p);
        }

        // set depth based on _product.particles index:
        for (let i = 0; i < Math.floor(smlCount * 0.33); ++i) {
            _product.particles[i].depth = 1.25;
        }
        for (
            let i = Math.floor(smlCount * 0.33);
            i < Math.floor(smlCount * 0.66);
            ++i
        ) {
            _product.particles[i].depth = 1.5;
        }
        for (let i = Math.floor(smlCount * 0.66); i < smlCount; ++i) {
            _product.particles[i].depth = 2.0;
        }
        for (let i = smlCount; i < smlCount + lrgCount; ++i) {
            _product.particles[i].depth = 2.5;
        }
    };

    const updateCanvas = () => {
        const config = props.data.config;
        const can = Slider.canvas.current;

        if (can && origin.x && origin.y) {
            const ctx = Slider.canvas.current.getContext("2d");
            const Product = Slider.Products[Slider.current];
            const nextProduct = Slider.Products[Slider.next];
            const previousProduct = Slider.Products[Slider.previous];

            // clear canvas
            ctx.clearRect(0, 0, can.width, can.height);
            ctx.save();

            // draw pack images
            drawProduct(ctx, nextProduct);
            drawProduct(ctx, previousProduct);

            // Draw small / blurred particles UNDER pack image
            for (let i = 0; i < config.smallSpriteCount; ++i) {
                // drawParticle = (p, _ctx, imgElement, _origin, _scaleMultiplier) => {
                drawParticle(Product.particles[i], ctx, Product.particleImage);
            }

            // upper layer, has dropshadow
            ctx.filter = `drop-shadow(0px 20px 5px rgba(0,0,0,0.2))`;

            drawProduct(ctx, Product);

            // Draw large particles OVER pack image
            for (
                let i = config.smallSpriteCount;
                i < config.smallSpriteCount + config.largeSpriteCount;
                ++i
            ) {
                drawParticle(Product.particles[i], ctx, Product.particleImage);
            }

            ctx.restore();
        }
    };

    // animates particles.
    const createParticleAnimation = _product => {
        if (_product.TL) _product.TL.kill();
        _product.TL = new gsap.timeline({
            paused: true,
            onUpdate: () => {
                updateCanvas();
            }
        });

        _product.particles.map(p => {
            const pDelay = 0.3; //FauxRandom();
            _product.TL.from(
                p,
                0.8,
                {
                    x: p.x * 0.5,
                    y: p.y * 0.5,
                    rotation: p.rotation + CosRandom() * Math.PI * 0.25,
                    ease: Power4.easeOut
                },
                pDelay
            );
            _product.TL.from(
                p,
                0.2,
                {
                    alpha: 0
                },
                pDelay
            );
            _product.TL.to(
                p.wiggle,
                4 + pDelay,
                {
                    x: `+=${p.x * 0.1}`,
                    y: `+=${p.y * 0.1}`,
                    rotation: `+=${CosRandom() * Math.PI * 0.1}`,
                    ease: Sine.easeOut
                },
                0
            );
            return "";
        });
    };

    // MOUNTING -----------------------------
    const allImagesLoaded = () => {
        // console.log(">>> MOUNTING: CURRENT: ", Slider.current);

        onResize();
        Slider.ctx = Slider.canvas.current.getContext("2d");
        Slider.hasInit = true;
        Slider.isUpdatable = true;
        initProducts(Slider);

        // on mount.
        window.addEventListener("resize", onResize);

        return () => {
            // console.log("DIS-MOUNTING: CURRENT: ", Slider.current);
            window.removeEventListener("resize", onResize);
        };
    };

    // Pre load images.
    Slider.ImageArray = ImagePreloader(ImageURLArray, allImagesLoaded);

    return (
        <div className="canvas-container">
            <div className="canvas-inner">
                <canvas
                    width="100%"
                    height="100%"
                    ref={Slider.canvas}
                    className="particle-system"
                />
            </div>
            <div className="controls">
                <button
                    className={"previous"}
                    onClick={() => {
                        nextProduct(-1);
                    }}
                >
                    <IconLast />
                </button>
                <button
                    className={"next"}
                    onClick={() => {
                        nextProduct(+1);
                    }}
                >
                    <IconNext />
                </button>
            </div>
            <div
                className="button-holder"
                onClick={() => {
                    // history.push(Slider.linkTo);
                }}
            >
                <div className={"button-primary"}>
                    <button>
                        Explore our range
                        <span />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePageParticles;
