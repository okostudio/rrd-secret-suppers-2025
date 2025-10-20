import React from "react";
import { Link } from "react-router-dom";

const Chef = props => {
    return (
        <Link
            className="Chef"
            to={props.linkTo}
            style={{ backgroundImage: `url(${props.imageUrl})` }}
            onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }}
        >
            <div className="chefName">
                <span className="chevron" />
                <h3>{props.chefName}</h3>
            </div>
        </Link>
    );
};

export default Chef;
