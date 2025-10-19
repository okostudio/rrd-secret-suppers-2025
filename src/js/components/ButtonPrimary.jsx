import React from "react";
import { Link } from "react-router-dom";
// import { ExternalLink } from "react-external-link";

const ButtonPrimary = props => {
    let classes = "button-primary";
    if (props.isBlack) classes += " button-black";
    return (
        <React.Fragment>
            {props.isExternalLink ? (
                <Link
                    href={props.linkTo ? props.linkTo : ""}
                    className={classes}
                >
                    <button>
                        {props.children}
                        {!props.hideChevron ? <span /> : null}
                    </button>
                </Link>
            ) : (
                <Link to={props.linkTo ? props.linkTo : ""} className={classes}>
                    <button>
                        {props.children}
                        {!props.hideChevron ? <span /> : null}
                    </button>
                </Link>
            )}
        </React.Fragment>
    );
};

export const ButtonSubmit = props => {
    return (
        <div className="button-primary">
            <button type="submit">
                {props.children}
                {!props.hideChevron ? <span /> : null}
            </button>
        </div>
    );
};

export default ButtonPrimary;
