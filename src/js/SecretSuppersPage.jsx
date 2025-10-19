import React from "react";
import { Helmet } from "react-helmet";
import { HeroStatic } from "./components/Hero";
import ScrollReveal from "./utils/ScrollReveal";
import SecretSuppersCarousel from "./components/SecretSuppersCarousel";
import MeetTheChefs from "./components/MeetTheChefs";
import WideFooterImage from "./components/WideFooterImage";

const SecretSuppersPage = () => {
    return (
        <ScrollReveal>
            <div className="page-wrappers SecretSuppersPage">
                <HeroStatic
                    backgroundUrl={
                        "/images/secret-suppers/rrd-ss-hero-wide.jpg"
                    }
                    title={"Secret Suppers"}
                    h3="red rock deli secret suppers is back with 3 new chefs and 4 new secret locations!"
                    onSecretSupperPage
                />
                <SecretSuppersCarousel />

                <MeetTheChefs onSecretSuppersPage />
                <WideFooterImage imageUrl="/images/secret-suppers/rrd-ss-footer-wide.jpg" />
                <Helmet>
                    <title>{"Red Rock Deli®"}</title>
                    <meta
                        name="description"
                        content={"Red Rock Deli® - Feed Your Curiosity™"}
                    />
                </Helmet>
            </div>
        </ScrollReveal>
    );
};

export default SecretSuppersPage;
