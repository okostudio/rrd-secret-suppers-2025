import React, { useState, useEffect } from "react";
import JuicerFeed from "react-juicer-feed";
import { ExternalLink } from "react-external-link";
import LoadingAnimation from "../utils/LoaderAnimation";

const Juicer = (props) => {
    const [feedData, setFeedData] = useState([]);
    const [feedHasLoaded, setFeedHasLoaded] = useState(false);
    const [feedCount, setFeedCount] = useState(props.feedCount);

    useEffect(() => {
        setFeedCount(props.feedCount);
    }, [props.feedCount]);

    const formatTime = (time) => {
        const d = Date.now() - new Date(time);
        const minutes = d / 1000 / 60;
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        if (weeks > 0) {
            return weeks + "w ago";
        } else if (days > 0) {
            return days + "d ago";
        } else if (hours > 0) {
            return hours + "h ago";
        } else {
            return "Just now";
        }
    };

    const scanForImages = () => {
        setTimeout(() => {
            // get image urls
            const feed = Array.from(
                document.querySelectorAll(".feed-item")
            ).map((item, i) => {
                if (
                    item.querySelector(".j-image img").src &&
                    item.querySelector(".j-date") &&
                    item.querySelector(".j-message")
                ) {
                    return {
                        source: item.querySelector(".j-image img").src,
                        time: item.querySelector(".j-date").dateTime,
                        message: item.querySelector(".j-message").innerText,
                        href: item.querySelector(".j-image").href,
                    };
                }
            });
            console.log("FEED ", feed);
            if (feed.length > 0) {
                setFeedData(feed.slice(0, 9));
                setFeedHasLoaded(true);
            } else {
                scanForImages();
                setFeedHasLoaded(false);
            }
        }, 500);
    };
    if (feedData.length === 0) scanForImages();

    return (
        <React.Fragment>
            <div
                className="hidden-feed"
                style={{ width: 0, height: 0, overflow: "hidden" }}
            >
                {" "}
                {feedData.length > -2 ? (
                    <JuicerFeed feedId={props.feedID} />
                ) : (
                    ""
                )}
            </div>

            {feedHasLoaded ? (
                <div className="feed">
                    {feedData.slice(0, feedCount).map((item, index) => {
                        return (
                            <ExternalLink
                                className="item"
                                key={"feed-item-" + index}
                                href={item.href}
                            >
                                <LoadingAnimation />
                                <img src={item.source} alt={item.message} />
                                <h5>{formatTime(item.time)}</h5>
                            </ExternalLink>
                        );
                    })}
                </div>
            ) : (
                ""
            )}
        </React.Fragment>
    );
};

export default Juicer;
