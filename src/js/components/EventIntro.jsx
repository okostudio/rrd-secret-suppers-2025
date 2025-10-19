import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import { ExternalLink } from "react-external-link";

const EventInfo = props => {
    return (
        <div className="event-info">
            <div className="container">
                <div className="panel about">{props.children}</div>
                <div className="panel details">
                    <div>
                        <div class="info">{props.info}</div>
                        <div className="contact-icons">
                            <ContactItem iconClass="time">
                                {props.time}
                            </ContactItem>
                            <ContactItem iconClass="location">
                                {props.location}
                            </ContactItem>
                            <ContactItem iconClass="price">
                                {props.price}
                            </ContactItem>
                        </div>

                        <ButtonPrimary isExternalLink linkTo="">
                            {/* <span className="icon ticket" /> */}
                            Buy a ticket
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventInfo;

const ContactItem = props => {
    return (
        <React.Fragment>
            {props.link ? (
                <ExternalLink href={props.link} className="item">
                    <div className={"icon " + props.iconClass} />
                    <div className="description">
                        <p>{props.children}</p>
                    </div>
                </ExternalLink>
            ) : (
                <div className="item">
                    <div className={"icon " + props.iconClass} />
                    <div className="description">
                        <p>{props.children}</p>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
