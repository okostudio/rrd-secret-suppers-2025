import React, { useEffect, useState, useRef } from "react";
// import { ExternalLink } from "react-external-link";
// import Juicer from "./Juicer";
import { Link } from "react-router-dom";

const InstagramFeed = () => {
    const data = [
        { url: "/images/instagram/rred-ig-feed-1.jpg", time: "Just now" },
        { url: "/images/instagram/rred-ig-feed-2.jpg", time: "1 week ago" },
        { url: "/images/instagram/rred-ig-feed-3.jpg", time: "1 week ago" },
        { url: "/images/instagram/rred-ig-feed-4.jpg", time: "1 week ago" },
        { url: "/images/instagram/rred-ig-feed-5.jpg", time: "2 weeks ago" },
        { url: "/images/instagram/rred-ig-feed-6.jpg", time: "2 weeks ago" },
        { url: "/images/instagram/rred-ig-feed-7.jpg", time: "2 weeks ago" },
        { url: "/images/instagram/rred-ig-feed-8.jpg", time: "2 weeks ago" },
        { url: "/images/instagram/rred-ig-feed-9.jpg", time: "2 weeks ago" },
    ]

    const feedHolder = useRef();
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const onResizeIG = () => {
        setIsLargeScreen(window.innerWidth >= 768);
    };
    const [feedCount, setFeedCount] = useState(3);


    useEffect(() => {
        window.addEventListener("resize", onResizeIG);
        onResizeIG();
        return () => {
            window.removeEventListener("resize", onResizeIG);
        };
    }, []);

    return (
        <div className={"Instagram"}>
            <div className="container">
                <div className="content">
                    <h2>@RED_ROCK_DELI</h2>
                </div>
                <div
                    ref={feedHolder}
                    className={"feed-holder feed-count-" + feedCount}
                >
                    <div className="feed">
                        {
                            data.slice(0, feedCount).map((image, i) => {
                                return (
                                    <Link
                                        className="item"
                                        key={"feed-item-" + i}
                                        href={"https://www.instagram.com/red_rock_deli/"}
                                    >
                                        <img src={image.url} alt="rrd" />
                                        {/* <h5>{formatTime(item.time)}</h5> */}
                                        <h5>{image.time}</h5>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="showMore">
                <MoreButton
                    feedHolder={feedHolder}
                    count={feedCount}
                    setCount={setFeedCount}
                >
                    Show me more
                </MoreButton>
            </div>
        </div>
    );
};

export default InstagramFeed;

const MoreButton = (props) => {
    return (
        <React.Fragment>
            {props.count < 9 ? (
                <div
                    onClick={() => {
                        props.setCount(props.count + 3);
                        setTimeout(() => {
                            props.feedHolder.current.scrollTo({
                                top: 0,
                                left: props.count * window.innerWidth * 0.7,
                                behavior: "smooth",
                            });
                        }, 50);
                    }}
                    className="button-primary"
                >
                    <button>{props.children}</button>
                </div>
            ) : (
                <Link
                    href="https://www.instagram.com/red_rock_deli/"
                    className="button-primary"
                >
                    <button>
                        {props.children} <span />
                    </button>
                </Link>
            )}
        </React.Fragment>
    );
};
