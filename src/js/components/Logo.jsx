import React from "react";
import { Link } from "react-router-dom";
import LogoUrl from "../../img/logos/rrd-logo-01.svg";

const Logo = props => {
    return (
        <div className="logo-container">
            <Link className="logo" to="/" onClick={props.onClickFunction}>
                <img src={LogoUrl} alt="Red Rock Deli" />
            </Link>
        </div>
    );
};

export default Logo;
