import { Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./About";
import FaqPage from "./FaqPage";
import ReviewsPage from "./ReviewsPage";
import ServicesHubPage from "./ServicesHubPage";
import PestControlPage from "./PestControlPage";
import CarpetCleaningPage from "./CarpetCleaningPage";
import EndOfLeaseCleaningPage from "./EndOfLeaseCleaningPage";
import WindowCleaningPage from "./WindowCleaningPage";
import GutterCleaningPage from "./GutterCleaningPage";
import PressureWashingPage from "./PressureWashingPage";
import GeneralHouseCleaningPage from "./GeneralHouseCleaningPage";
import PramCleaningPage from "./PramCleaningPage";
import BlogPage from "./Blogpage";
import AdminPage from "./AdminPage";
import NotFoundPage from "./NotFoundPage";

export default function Root() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/services" element={<ServicesHubPage />} />
            <Route path="/pest-control" element={<PestControlPage />} />
            <Route path="/carpet-cleaning" element={<CarpetCleaningPage />} />
            <Route path="/end-of-lease-cleaning" element={<EndOfLeaseCleaningPage />} />
            <Route path="/window-cleaning" element={<WindowCleaningPage />} />
            <Route path="/gutter-cleaning" element={<GutterCleaningPage />} />
            <Route path="/pressure-washing" element={<PressureWashingPage />} />
            <Route path="/general-house-cleaning" element={<GeneralHouseCleaningPage />} />
            <Route path="/pram-cleaning" element={<PramCleaningPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}