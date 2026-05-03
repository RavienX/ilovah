import { Routes, Route } from "react-router-dom";
import App from "./App";
import PestControlPage from "./PestControlPage";
import BlogPage from "./Blogpage";

export default function Root() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/pest-control" element={<PestControlPage />} />
            <Route path="/blog" element={<BlogPage />} />
        </Routes>
    );
}