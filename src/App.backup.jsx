import React, { useEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import "./scss/App.scss";
import Nav from "./js/components/Nav";
import HomePage from "./js/HomePage";
import PageNotFound from "./js/PageNotFound";
import PageTransition from "./js/components/PageTransition";
import Footer from "./js/components/Footer";
import FAQs from "./js/FAQs";
// import ScrollToTop from "./js/components/ScrollToTop";
import ChefPage01 from "./js/ChefPage01";
import EventPageSydney from "./js/EventPageSydney";
import ScrollReveal from "./js/utils/ScrollReveal";
import OurRange from "./js/OurRange";
// import history from "./js/history";
import SecretSuppersPage from "./js/SecretSuppersPage";
// import GoogleTagManager from "./js/utils/GoogleTagManager";

function App() {
    const [wrapperClass, setWrapperClass] = useState("wrapper");
    const [hasLoaded, setHasLoaded] = useState(false);

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        // console.log("Mounting App");

        setWrapperClass("wrapper appHasLoaded");

        if (!hasLoaded) setHasLoaded(true);

        // const loader = document.querySelector(".loader-logo");
        // loader.classList.add("page-has-loaded");
        // const root = document.querySelector("#root");
        // root.classList.remove("isLoading");

        setPageLoading(false);
    }, []);

    return (
        <div className={wrapperClass}>
            {/* <GoogleTagManager gtmId="GTM-W62527N" /> */}
            {hasLoaded ? (
                <>
                    {/* <Router >
                    {/* <ScrollReveal pageIsLoading={pageLoading}> */}


                    <Route path="/" exact component={HomePage} />
                    <Route path="/faq/" exact component={FAQs} />
                    <Route path="/our-range/" component={OurRange} />
                    <Route
                        path="/secret-suppers/"
                        exact
                        component={SecretSuppersPage}
                    />
                    <Route
                        path="/secret-suppers/chef-name-1/"
                        exact
                        component={ChefPage01}
                    />
                    <Route
                        path="/secret-suppers/chef-name-2/"
                        exact
                        component={ChefPage01}
                    />
                    <Route
                        path="/secret-suppers/sydney/"
                        exact
                        component={EventPageSydney}
                    />
                    <Route
                        path="/secret-suppers/melbourne/"
                        exact
                        component={EventPageSydney}
                    />
                    <Route path="/" component={PageNotFound} />

                    {/* </ScrollToTop> */}
                    <ScrollReveal pageIsLoading={pageLoading}>
                        <Footer />
                    </ScrollReveal>
                </Router> */}
            <Nav />
            <HomePage />

        </>
    ) : null
}
<PageTransition pageIsLoading={pageLoading} />
        </div >
    );
}

export default App;
