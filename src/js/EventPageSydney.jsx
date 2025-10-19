import React from "react";
// import { Helmet } from "react-helmet";
import { HeroStatic } from "./components/Hero";
import ScrollReveal from "./utils/ScrollReveal";
import WideFooterImage from "./components/WideFooterImage";
import FeatureVideoItem from "./components/FeatureVideoItem";
// import InstagramFeed from "./components/InstagramFeed";
import ButtonPrimary from "./components/ButtonPrimary";
import Locations from "./components/Locations";
import EventInfo from "./components/EventIntro";

const EventPageSydney = () => {
    return (
        <ScrollReveal>
            <div className="page-wrappers SecretSuppersPage">
                <HeroStatic
                    backgroundUrl={
                        "/images/secret-suppers/ss-event1-hero-wide.jpg"
                    }
                    title={"Earlthy delights"}
                    h3="MONTH XX, YYYY"
                    p="Location details"
                />

                <section className="SecretSuppersCarousel sr-item line-top line-top-black">
                    <EventInfo
                        info={
                            <React.Fragment>
                                <h3>MONTH XX, YYYY</h3>
                                <p>Location address</p>
                                <div>
                                    <h5>
                                        <em>Hosted by:</em>
                                        Colin Fassnidge
                                    </h5>
                                </div>
                            </React.Fragment>
                        }
                        time="Thursday, May 21, 2020"
                        location="Secret Sydney Location"
                        price="$110.00"
                    >
                        <h2>Earthly delights showcase</h2>
                        <p className="large">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse venenatis sit amet nisi vitae
                            aliquet. Vestibulum eget diam erat. Proin rhoncus
                            magna eget nibh semper tincidunt non sed enim. Nam
                            ac sapien lacus. Proin rhoncus magna eget nibh
                            semper tincidunt non sed enim. Nam ac sapien lacus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Quisque ut tincidunt lectus. Integer suscipit
                            scelerisque massa. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Quisque ut tincidunt
                            lectus. Integer suscipit scelerisque massa.Lorem
                            ipsum dolor sit amet, consectetur adipiscing elit.
                            Quisque ut tincidunt lectus. Integer suscipit
                            scelerisque massa.Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Quisque ut tincidunt
                            lectus. Integer suscipit scelerisque massa. Lorem
                            ipsum dolor sit amet, consectetur adipiscing elit.
                            Quisque ut tincidunt lectus. Integer suscipit
                            scelerisque massa. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Lorem ipsum dolor sit
                            amet, consectetur adipiscing elit. Quisque ut
                            tincidunt lectus. Integer suscipit scelerisque
                            massa. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.
                        </p>
                    </EventInfo>

                    <div className="container">
                        <div className="content intro">
                            <p>Your exclusive chef for the evening</p>
                            <h2>Colin Fassnidge</h2>
                        </div>
                    </div>

                    <FeatureVideoItem
                        blackBackground
                        posterImageUrl="/images/secret-suppers/colin-fassnidge-hero.jpg"
                    >
                        <div className="container" style={{ paddingTop: 0 }}>
                            <div className="copy">
                                <p className="large">
                                    Born in Dublin and trained by the legendary
                                    Raymond Blanc, Colin Fassnidge was the
                                    Executive Chef at the Four in Hand for over
                                    ten years.
                                </p>
                                <ButtonPrimary linkTo="/chef1/">
                                    Learn about Colin
                                </ButtonPrimary>
                            </div>
                        </div>
                    </FeatureVideoItem>

                    <div
                        className="container"
                        style={{ marginTop: "80px", paddingBottom: "0" }}
                    >
                        <div className="copy centered700 black">
                            <h2>Secret Suppers Events</h2>
                            <p>
                                Red Rock Deli secret suppers is back with 3 new
                                chefs and 4 new secret locations! Find your
                                nearest event, and enter the ballot for your
                                chance to get invited.
                            </p>
                        </div>
                    </div>
                    <div
                        className="container"
                        style={{ paddingTop: "0", paddingBottom: "160px" }}
                    >
                        <Locations imageUrl="/images/meet-the-chefs/secret-locations2.jpg" />
                    </div>

                    {/* <InstagramFeed /> */}
                </section>

                {/* <MeetTheChefs onSecretSuppersPage /> */}
                <WideFooterImage imageUrl="/images/secret-suppers/ss-event1-footer-wide.jpg" />
                {/* <Helmet>
                    <title>{"Red Rock Deli®"}</title>
                    <meta
                        name="description"
                        content={"Red Rock Deli® - Feed Your Curiosity™"}
                    />
                </Helmet> */}
            </div>
        </ScrollReveal>
    );
};

export default EventPageSydney;
