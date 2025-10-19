import React from "react";

const WideFooterImage = props => {
    return (
        <section
            className="WideFooterImage"
            style={{ backgroundImage: "url(" + props.imageUrl + ")" }}
        />
    );
};

export default WideFooterImage;
