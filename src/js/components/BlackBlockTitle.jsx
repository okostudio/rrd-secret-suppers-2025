import React from "react";

const BlackBlockTitle = props => {
    return (
        <div className="black-block">
            {props.heading ? <h3>{props.heading}</h3> : ""}
            {props.subHeading ? <p>{props.subHeading}</p> : ""}
            {props.children}
        </div>
    );
};

export default BlackBlockTitle;
