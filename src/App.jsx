import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
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

        const loader = document.querySelector(".loader-logo");
        if (loader) loader.classList.add("page-has-loaded");
        const root = document.querySelector("#root");
        if (root) root.classList.remove("isLoading");

        setPageLoading(false);
    }, []);

    return (
        <div className={wrapperClass}>
            {/* <GoogleTagManager gtmId="GTM-W62527N" /> */}
            {hasLoaded ? (
                <>
                    <Nav />
                    <Routes>


                        <Route path="/" element={<HomePage />} />
                        <Route path="/faq/" element={<FAQs />} />
                        <Route path="/our-range/*" element={<OurRange />} />
                        <Route
                            path="/secret-suppers/"
                            element={<SecretSuppersPage />}
                        />
                        <Route
                            path="/secret-suppers/chef-name-1/"
                            element={<ChefPage01 />}
                        />
                        <Route
                            path="/secret-suppers/chef-name-2/"
                            element={<ChefPage01 />}
                        />
                        <Route
                            path="/secret-suppers/sydney/"
                            element={<EventPageSydney />}
                        />
                        <Route
                            path="/secret-suppers/melbourne/"
                            element={<EventPageSydney />}
                        />
                        <Route path="*" element={<PageNotFound />} />



                    </Routes>
                    <ScrollReveal pageIsLoading={pageLoading}>
                        <Footer />
                    </ScrollReveal>
                </>


            ) : null}
            <PageTransition pageIsLoading={pageLoading} />
        </div>
    );
}

export default App;
