import React, { Suspense } from "react";
// import { Helmet } from "react-helmet";

import Hero from "./components/Hero";
// import SecretSuppers from "./components/SecretSuppers";
// import MeetTheChefs from "./components/MeetTheChefs";
// import DiscoverTheRange from "./components/DiscoverTheRange";
// import WhereToBuy from "./components/WhereToBuy";
import ScrollReveal from "./utils/ScrollReveal";
import LoadingAnimation from "./utils/LoaderAnimation";
import InstagramFeed from "./components/InstagramFeed";

const HomePage = () => {
    const DiscoverTheRange = React.lazy(() =>
        import("./components/DiscoverTheRange")
    );
    const SecretSuppers = React.lazy(() =>
        import("./components/SecretSuppers")
    );
    const WhereToBuy = React.lazy(() => import("./components/WhereToBuy"));

    return (
        <ScrollReveal>
            <div className="page-wrapper home-page">
                <Hero />
                <Suspense>
                    <DiscoverTheRange showCanvas={false} />
                </Suspense>
                <Suspense>
                    <SecretSuppers />
                </Suspense>
                <Suspense>
                    <InstagramFeed count={3} />
                </Suspense>
                <Suspense>
                    <WhereToBuy />
                </Suspense>

                {/* <Helmet>
                    <title>{"Red Rock Deli®"}</title>
                    <meta
                        name="description"
                        content={"Red Rock Deli® - Feed Your Curiosity™"}
                    />
                    <meta
                        name="keywords"
                        content={
                            "Red, Rock, Deli, Chips, Nuts, Feed your curiosity, curious chips and nuts"
                        }
                    />
                    <meta property="og:site_name" content={"Red Rock Deli®"} />
                    <meta name="og:title" content={"Red Rock Deli®"} />
                    <meta
                        name="og:description"
                        content={"Red Rock Deli® - Feed Your Curiosity™"}
                    />
                    <meta
                        property="og:image"
                        content={
                            "https://rrd-secret-suppers-2025.vercel.app//images/backgorund-secret-suppers.jpg"
                        }
                    />
                </Helmet> */}
            </div>
        </ScrollReveal>
    );
};

export default HomePage;
