import React from "react";

const ChefBio = props => {
    return (
        <div className="chef-bio">
            <div className="container">
                <div className="panel photo">
                    <div
                        className="image"
                        style={{
                            backgroundImage: "url(" + props.photoUrl + ")"
                        }}
                    />
                    {/* <img src={props.photoUrl} alt={props.photoAlt} /> */}
                </div>
                <div className="panel details">
                    <div>{props.children}</div>
                </div>
            </div>
        </div>
    );
};

export default ChefBio;
