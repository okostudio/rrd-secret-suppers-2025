import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import FeatureVideoItem from "./FeatureVideoItem";
import ImageSlider from "./ImageSlider";

const SecretSuppersCarousel = () => {
    return (
        <section className="SecretSuppersCarousel sr-item line-top line-top-black">
            <div className="container">
                <div className="content intro">
                    <h2>RED ROCK DELI SECRET SUPPERS</h2>
                    <p>
                        Pop-up dining experiences held in secret locations,
                        hosted by some of Australia's most loved chefs featuring
                        specially crafted menus inspired by Red Rock Deli unique
                        flavour combinations.
                    </p>
                </div>
            </div>

            <FeatureVideoItem
                blackBackground
                posterImageUrl="/images/secret-suppers/secret-supper-video-placeholder-thumbnail.jpg"
            >
                <ImageSlider
                    images={[
                        "/images/secret-suppers/image-slider/placeholder-1.jpg",
                        "/images/secret-suppers/image-slider/placeholder-2.jpg",
                        "/images/secret-suppers/image-slider/placeholder-3.jpg",
                        "/images/secret-suppers/image-slider/placeholder-4.jpg"
                    ]}
                />
                <div className="looking-for-a-ticket">
                    <div>
                        <div className="icon icon-ticket" />
                        <h2>LOOKING FOR A TICKET?</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Quisque ut tincidunt lectus. Integer suscipit
                            scelerisque massa.
                        </p>
                        <ButtonPrimary>Buy your ticket</ButtonPrimary>
                    </div>
                </div>
            </FeatureVideoItem>
        </section>
    );
};

export default SecretSuppersCarousel;
