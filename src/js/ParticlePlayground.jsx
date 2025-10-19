import React from "react";
import DiscoverTheRange from "./components/DiscoverTheRange";
import ScrollReveal from "./utils/ScrollReveal";

const ParticlePlayground = () => {
    return (
        <ScrollReveal>
            <div className="page-wrapper home-page">
                <DiscoverTheRange showCanvas={true} />
            </div>
        </ScrollReveal>
    );
};

export default ParticlePlayground;
