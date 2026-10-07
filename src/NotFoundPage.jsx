import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Phone, Search } from "lucide-react";
import NavBar from "./NavBar";
import PageFooter from "./PageFooter";

const RED = "#E8232A";
const BLUE = "#2B8FD4";
const DARK = "#111827";
const MID = "#6b7280";

const CSS = `
.nf-wrap{min-height:60vh;display:flex;align-items:center;justify-content:center;padding:160px 5% 100px;text-align:center;background:#fff}
.nf-code{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(4rem,12vw,7rem);line-height:1;color:${RED};letter-spacing:-.02em;margin-bottom:8px}
.nf-title{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(1.4rem,3vw,2rem);color:${DARK};margin-bottom:14px}
.nf-desc{font-size:1rem;color:${MID};max-width:480px;margin:0 auto 32px;line-height:1.7}
.nf-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.nf-btn-primary{background:${RED};color:#fff;border:none;padding:14px 28px;border-radius:9px;font-weight:800;font-size:.95rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none;transition:background .2s}
.nf-btn-primary:hover{background:#c91920}
.nf-btn-ghost{background:#fff;color:${DARK};border:1.5px solid #e5e7eb;padding:14px 28px;border-radius:9px;font-weight:800;font-size:.95rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none;transition:border-color .2s}
.nf-btn-ghost:hover{border-color:${BLUE}}
`;

export default function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        // 404 pages must never be indexed — this keeps Google from treating
        // a dead/old link as real content (it currently does for old Wix URLs).
        document.title = "Page Not Found | iLovah Cleaning & Rest In Pest";

        const setMeta = (name, content, attr = "name") => {
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
            el.setAttribute("content", content);
        };

        setMeta("robots", "noindex, nofollow");
        setMeta("googlebot", "noindex, nofollow");
        setMeta("description", "This page couldn't be found. Browse iLovah Cleaning & Rest In Pest's services or get in touch for a free quote.");

        // Remove canonical — a 404 shouldn't claim a canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.remove();

        return () => {
            // Reset robots tag on unmount so the next page isn't accidentally noindexed
            setMeta("robots", "index, follow");
        };
    }, []);

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
            <style>{CSS}</style>
            <NavBar />
            <main className="nf-wrap">
                <div>
                    <div className="nf-code">404</div>
                    <h1 className="nf-title">We couldn't find that page</h1>
                    <p className="nf-desc">
                        The page you're looking for may have moved or no longer exists.
                        Try one of our services below, or get in touch for a free quote.
                    </p>
                    <div className="nf-actions">
                        <a href="/" className="nf-btn-primary" onClick={e => { e.preventDefault(); navigate("/"); }}>
                            <Home size={18} strokeWidth={2} aria-hidden="true" /> Back to Home
                        </a>
                        <a href="/services" className="nf-btn-ghost" onClick={e => { e.preventDefault(); navigate("/services"); }}>
                            <Search size={18} strokeWidth={2} aria-hidden="true" /> View Services
                        </a>
                        <a href="tel:0478711829" className="nf-btn-ghost">
                            <Phone size={18} strokeWidth={2} aria-hidden="true" /> 0478 711 829
                        </a>
                    </div>
                </div>
            </main>
            <PageFooter />
        </div>
    );
}