import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import Chef from "./chef";
import { Link } from "react-router-dom";
import Locations from "./Locations";

const MeetTheChefs = props => {
    return (
        <section
            className={
                props.onSecretSuppersPage
                    ? "MeetTheChefs onSecretSuppersPage line-top line-top-black"
                    : "MeetTheChefs line-top"
            }
        >
            <div className="container">
                <h2>MEET THE CHEFS</h2>

                <div className="black-background">
                    <div className="content">
                        <div className="chef-holder">
                            <Chef
                                imageUrl="/images/meet-the-chefs/meet-the-chefs-placeholder-1.jpg"
                                chefName="Chef Name 1"
                                key={1}
                                linkTo="/chef1"
                            />
                            <Chef
                                imageUrl="/images/meet-the-chefs/meet-the-chefs-placeholder-2.jpg"
                                chefName="Chef Name 2"
                                key={2}
                                linkTo="/chef1"
                            />
                        </div>

                        <div className="copy">
                            <h2>SECRET SUPPERS</h2>
                            <p>
                                New flavour combinations, new secret locations -
                                find out more below and enter the ballot for
                                your chance to secure your tickets.
                            </p>
                        </div>

                        <Locations imageUrl="/images/meet-the-chefs/secret-locations.jpg" />
                    </div>
                </div>

                <div className="looking-for-a-ticket">
                    <div>
                        <div className="icon icon-ticket" />
                        <h2>LOOKING FOR A TICKET?</h2>
                        <ButtonPrimary>Buy your ticket</ButtonPrimary>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetTheChefs;
