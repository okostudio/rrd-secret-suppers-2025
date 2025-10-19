import React from "react";
import logo1 from "../../img/logos/logo-iga-white.png";
import logo2 from "../../img/logos/logo-woolworths-white.png";
import logo3 from "../../img/logos/logo-coles-white.png";
import { ExternalLink } from "react-external-link";

const WhereToBuy = props => {
    return (
        <section className="WhereToBuy">
            <div className="container">
                <div className="content">
                    <h2>Available To Buy</h2>
                    <p>
                        Our products are available for purchase at most leading
                        supermarket retailers. Check out your local supermarket
                        for our products.
                    </p>
                </div>
                <div className="stores">
                    <Store
                        logoUrl={logo2}
                        alt="Woolwoths"
                        href="https://www.woolworths.com.au/shop/search/products?searchTerm=red%20rock%20deli"
                    />
                    <Store
                        logoUrl={logo3}
                        alt="Coles"
                        href="https://shop.coles.com.au/a/national/everything/search/red+rock+deli"
                    />
                    <Store
                        logoUrl={logo1}
                        alt="IGA"
                        href="https://www.iga.com.au/catalogue/"
                    />
                </div>
            </div>
        </section>
    );
};

export default WhereToBuy;

const Store = props => {
    console.log("props.href", props.href);
    return (
        <ExternalLink className="store" href={props.href}>
            <img src={props.logoUrl} alt={props.alt} />
        </ExternalLink>
    );
};
