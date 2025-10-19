import React from "react";
import { Link } from "react-router-dom";

const Locations = props => {
    return (
        <div className="locations">
            <div className="locations-list">
                <Location
                    date={"May 21, 2020"}
                    location={"Secret Sydney Location"}
                    chefName={"Chef Name 1"}
                    eventURL="events/sydney"
                />
                <Location
                    date={"May 28, 2020"}
                    location={"Secret Melbourne Location"}
                    chefName={"Chef Name 2"}
                    eventURL="events/melbourne"
                />
            </div>
            <img
                src={props.imageUrl}
                className="locations-image"
                alt="Shhh, stay up to date with our latest secret locations."
            />
        </div>
    );
};

export default Locations;

const Location = props => {
    return (
        <Link className="location" to={props.eventURL}>
            <div className="location-copy">
                <h3 className="date">{props.date}</h3>
                <p className="location-text">{props.location}</p>
                <br />
                <h5 className="name">
                    <em>Hosted by </em>
                    {props.chefName}
                </h5>
            </div>
            <div className="chevron-holder">
                <div className="chevron" />
            </div>
        </Link>
    );
};
