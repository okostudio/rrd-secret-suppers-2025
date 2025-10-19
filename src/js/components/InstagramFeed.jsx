import React, { useEffect, useState, useRef } from "react";
import { ExternalLink } from "react-external-link";
import Juicer from "./Juicer";

const InstagramFeed = (props) => {
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
                    <Juicer feedID="red_rock_deli" feedCount={feedCount} />
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
                <ExternalLink
                    href="https://www.instagram.com/red_rock_deli/"
                    className="button-primary"
                >
                    <button>
                        {props.children} <span />
                    </button>
                </ExternalLink>
            )}
        </React.Fragment>
    );
};
