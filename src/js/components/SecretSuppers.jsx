import React, { useRef, useState } from "react";
import secretSuppersLockup from "../../img/lockups/secret-suppers-lockup--white.png";
// import EmailRegistration from "./EmailRegistrationForm";
// import InstagramFeed from "./InstagramFeed";
// import ReactPlayer from "react-player";

const SecretSuppers = () => {
    const videoPlayer = useRef();
    const [isPlaying, setPlaying] = useState(false);
    const videoUrl =
        window.innerWidth < 768
            ? "/videos/secret-suppers-teaser-video-sml"
            : "/videos/secret-suppers-teaser-video-lrg";

    return (
        <section className="SecretSuppers sr-item">
            <div className="scroll-prompt scroll-prompt-top" />
            <div className="container intro">
                <div className="content">
                    <img
                        className="lockup"
                        src={secretSuppersLockup}
                        alt="Red Rock Deli, Secret Suppers"
                    />

                    <div className="copy">
                        <h3>SECRET DINING EXPERIENCES</h3>
                        <p>
                            A series of dining experiences hosted by some of
                            Australia's most loved chefs with specially crafted
                            menus inspired by Red Rock Deli's unique flavour
                            combinations.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container black-background">
                <div className="content">
                    <div
                        className={
                            isPlaying
                                ? "image-holder is-playing"
                                : "image-holder is-not-playing"
                        }
                        onClick={() => {
                            setPlaying(true);
                        }}
                    >
                        <video
                            ref={videoPlayer}
                            poster="/videos/secret-suppers-teaser-video.jpg"
                            className="ss-video"
                            width="100%"
                            height="100%"
                            muted autoPlay loop
                            controls={isPlaying}
                        >
                            <source src={videoUrl + ".mp4"} type="video/mp4" />
                            <source src={videoUrl + ".webm"} type="video/webm" />
                        </video>
                    </div>

                    <div className="copy">
                        <h2>Secret suppers 2020 is coming soon!</h2>
                        <p>
                            Are you interested in being part of our next edition
                            of Secret Suppers? We will keep you in the loop
                            about the new date, exclusive chefs and ticket
                            releases. Drop your email below to stay up to date
                            about what’s coming up.
                        </p>

                        {/* <EmailRegistration /> */}
                    </div>
                </div>
            </div>
            {/* <InstagramFeed /> */}
        </section>
    );
};

export default SecretSuppers;
