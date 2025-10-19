import React from "react";
import ProductsData from "../data/productData.json";

const DiscoverTheRange = () => {
    const HomePageParticles = React.lazy(() => import("./HomePageParticles"));

    return (
        <section className="DiscoverTheRange sr-item">
            {ProductsData ? <HomePageParticles data={ProductsData[0]} /> : null}
            <h2>Discover The Range</h2>
        </section>
    );
};

export default DiscoverTheRange;
