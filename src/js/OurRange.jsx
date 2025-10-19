import React, { useEffect, useState } from "react";
import ProductsData from "./data/productData.json";
import ScrollReveal from "./utils/ScrollReveal";
import OurRangeParticles from "./components/OurRangeParticles";
// import history from "./history";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { gsap, Power3 } from "gsap";

const OurRange = () => {
    const navigate = useNavigate();

    const data = ProductsData[0];
    const baseUrl = "/our-range/";
    const [modalShowing, setModalShowing] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        type: "info",
        heading: "Nutritional Info",
        image: "",
        copy: null,
    });
    const [navToggle, setNavToggle] = useState(false);
    const [pathname, setPathname] = useState(window.location.pathname);
    const [current, setCurrent] = useState({
        group: null,
        index: null,
        product: null,
        products: null,
        next: null,
        previous: null,
    });

    const getCurrentProduct = () => {
        const urlArray = pathname.split("/");

        const obj = {
            group: "",
            index: 0,
            product: null,
            products: null,
            next: "",
            previous: "",
            productAnimationDirection: parseInt(
                localStorage.getItem("direction")
            ),
        };

        // if product group is not found in list of products, set to default value
        const group = Object.keys(data.product).find(
            (key) => key === urlArray[2]
        );
        group
            ? (obj.group = group)
            : (obj.group = Object.keys(data.product)[0]);

        obj.products = data.product[obj.group];

        // find product in list of products.
        const currentIndex = data.product[obj.group].findIndex(
            (product) => product.url === decodeURI(urlArray[3])
        );

        // if index not found, use default index
        currentIndex !== -1 ? (obj.index = currentIndex) : (obj.index = 0);

        // define current product
        obj.product = data.product[obj.group][obj.index];

        console.log(">> current product: " + obj.group + ", " + obj.index);

        return obj;
    };

    //

    // Show Modal
    const showModal = (modalType) => {
        const smoothScroll = { y: window.scrollY };
        gsap.to(smoothScroll, 0.25, {
            y: 0,
            onUpdate: () => {
                window.scrollTo(0, smoothScroll.y);
            },
            ease: Power3.easeOut,
        });

        setModalShowing(true);
        switchModal(modalType);
    };
    const switchModal = (modalType) => {
        if (modalType === "info") {
            setModalInfo({
                type: "info",
                heading: "Nutritional Info",
                image: current.product.nutritionalInfo.image,
                copy: null,
            });
        } else {
            setModalInfo({
                type: "pairings",
                heading: "Flavour Pairings",
                image: current.product.flavourPairing.image,
                copy: current.product.flavourPairing.copy,
            });
        }
    };
    const closeModal = () => {
        setModalShowing(false);
    };

    //

    //
    const onKeydown = (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };

    //
    // Extract current product from URL.
    const [pageLoading, setPageLoading] = useState(true);
    useEffect(() => {
        setPageLoading(false);
        console.log(">> Our Range Page Loaded");
        setCurrent({ ...getCurrentProduct() });

        window.addEventListener("keydown", onKeydown);
        return () => {
            window.removeEventListener("keydown", onKeydown);
        };
    }, [pathname]);

    const navigateTo = (url, direction = "") => {
        console.log("navigating to", url, direction);
        localStorage.setItem("direction", direction);
        navigate(baseUrl + url + "/");

        // window.location.pathname = baseUrl + url + "/"
        setPathname(window.location.pathname);
    };
    //props.current.product.title
    return (
        <ScrollReveal>
            <div className="page-wrappers our-range">
                <div
                    className={`blur-container ${modalShowing ? "blurred" : ""
                        }`}
                >
                    {ProductsData && current.group ? (
                        <>
                            <section className="DiscoverTheRange">
                                <OurRangeParticles
                                    data={ProductsData[0]}
                                    current={current}
                                    onClickFunction={navigateTo}
                                    showModal={showModal}
                                    pageIsLoading={pageLoading}
                                />
                                {current ? (
                                    <div
                                        className={
                                            navToggle
                                                ? "our-range-nav-dropdown"
                                                : "our-range-nav-dropdown collapsed"
                                        }
                                        onClick={() => {
                                            setNavToggle(!navToggle);
                                        }}
                                    >
                                        <div className="nav-item label">
                                            <h3>{current.group}</h3>
                                        </div>
                                        <div className={"dropdown"}>
                                            {data.nav.map((item, i) => {
                                                return (
                                                    <NavItem
                                                        hideImage
                                                        {...item}
                                                        rangeUrl={baseUrl}
                                                        onClickFunction={navigateTo}
                                                        pathname={pathname}
                                                        key={3000 + i}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </section>

                            <section className="range-nav">
                                <div className="container">
                                    {data.nav.map((item, i) => {
                                        return (
                                            <NavItem
                                                {...item}
                                                rangeUrl={baseUrl}
                                                onClickFunction={navigateTo}
                                                pathname={pathname}
                                                key={3000 + i}
                                            />
                                        );
                                    })}
                                </div>
                            </section>
                            <div className="hidden">
                                {current.products
                                    ? current.products.map((p, i) => {
                                        return (
                                            <Link
                                                to={
                                                    baseUrl +
                                                    current.group +
                                                    "/" +
                                                    encodeURI(p.url)
                                                }
                                                key={9000 + i}
                                            />
                                        );
                                    })
                                    : ""}
                            </div>
                        </>
                    ) : null}
                </div>

                <div
                    className={`modal ${modalInfo.type} ${modalShowing ? "isActive" : ""
                        }`}
                >
                    <div className="info">
                        <div className="black-box">
                            <div
                                className="header"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                <h3>{modalInfo.heading}</h3>
                            </div>
                            {
                                modalInfo.image ?
                                    <img
                                        src={modalInfo.image}
                                        alt={modalInfo.heading}
                                        onClick={() => {
                                            closeModal();
                                        }}
                                    />
                                    : null
                            }
                            {modalInfo.copy ? (
                                <div
                                    onClick={() => {
                                        closeModal();
                                    }}
                                    className="copy"
                                    dangerouslySetInnerHTML={{
                                        __html: modalInfo.copy,
                                    }}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
};
export default OurRange;

//

const NavItem = (props) => {

    let isActive = "";
    props.pathname && props.pathname.split("/")[2] === props.baseUrl
        ? (isActive = "isActive")
        : (isActive = "");
    return (
        <div
            className={`nav-item ${isActive}`}
            onClick={() => {
                // console.log(">>>>>>>", props.baseUrl, ProductsData[0].product[props.baseUrl][0].url)
                props.onClickFunction(props.baseUrl + "/" + ProductsData[0].product[props.baseUrl][0].url);
                // navigate(props.rangeUrl + props.baseUrl + "/");

            }}
        >
            {props.hideImage ? "" : <img src={props.imageUrl} alt="product" />}

            <h3>{props.label}</h3>
            <Link className="hidden" to={props.rangeUrl + props.baseUrl} />
        </div>
    );
};
