import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import Logo from "../../img/logos/rrd-logo-01.svg";
// import EnquiryForm from "./EnquiryForms";

function Footer() {
    return (
        <section className="Footer" id="contact" name="contact">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img className="logo" src={Logo} alt="Red Rock Deli™" />
                        <div className="lockup" />
                    </div>
                    <div className="right">
                        <ExternalLink
                            className="facebook"
                            href="https://www.facebook.com/RedRockDeli/"
                        >
                            <span />
                        </ExternalLink>
                        <ExternalLink
                            className="instagram"
                            href="https://www.instagram.com/red_rock_deli/"
                        >
                            <span />
                        </ExternalLink>
                    </div>
                </div>
                <div className="middle">
                    <div className="left">
                        <h3>WANT TO GET IN CONTACT?</h3>
                        <div>
                            <ContactItem
                                iconClass="phone"
                                description="1800 500 502"
                                link="tel:+611800500502"
                            />
                            <ContactItem
                                iconClass="email"
                                description="info@redrockdeli.com"
                                link="mailto:info@redrockdeli.com"
                            />
                            <ContactItem
                                iconClass="location"
                                description={`The Red Rock Deli Chip Company<br />
                    553-567 South Road,<br />
                    Regency Park, SA, 5010, Australia`}
                                link="https://goo.gl/maps/iMNEpNASEv6uh7aB8"
                            />
                        </div>
                    </div>

                    {/* <EnquiryForm classes=" right" /> */}
                </div>
                <div className="bottom">
                    <div className="left">
                        <Link to="/faq/">FAQs</Link>|
                        <ExternalLink href="https://www.smiths.com.au/assets/PepsiCo-Australian-Privacy-and-Credit-Reporting-Policy-December-2014-72bf6e0725d535527672d7a6b67309aa7feda4a4207e8e87864491f249e29f9c.pdf">
                            Privacy Policy
                        </ExternalLink>
                        |
                        <ExternalLink href="http://www.pepsico.com.au/terms/">
                            Terms of Use
                        </ExternalLink>
                    </div>
                    <div className="right">
                        <p>&copy;Red Rock Deli™ 2020</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;

const ContactItem = props => {
    return (
        <React.Fragment>
            {props.link ? (
                <ExternalLink href={props.link} className="item">
                    <div className={"icon " + props.iconClass}>
                        <span className="email" />
                    </div>
                    <div className="description">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: props.description
                            }}
                        />
                    </div>
                </ExternalLink>
            ) : (
                <div className="item">
                    <div className={"icon " + props.iconClass}>
                        <span className="email" />
                    </div>
                    <div className="description">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: props.description
                            }}
                        />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
