import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ilovahLogoSrc from "./assets/logo.png";
import imgInsect from "./assets/insect.png";

const RED = "#E8232A";
const RED2 = "#ff4e55";
const RED_DK = "#b01018";
const RED_GLOW = "rgba(232,35,42,0.4)";
const BLUE2 = "#4AABDB";
const BLACK = "#0c0c0c";
const DARK = "#111827";
const WHITE = "#ffffff";

const NAV_CSS = `
/* ── TOP INFO BAR ── */
.il-topbar{
  background:${BLACK};padding:0 48px;height:38px;
  display:flex;align-items:center;justify-content:space-between;
  font-size:.73rem;color:rgba(255,255,255,0.8);
  position:fixed;top:0;left:0;right:0;z-index:901;transition:transform .35s ease;
  border-bottom:1px solid rgba(232,35,42,0.2);
  font-family:'Nunito',sans-serif;
}
.il-topbar.hidden{transform:translateY(-100%)}
.il-topbar-left{display:flex;align-items:center;gap:20px}
.il-topbar-right{display:flex;align-items:center;gap:16px}
.il-topbar-item{display:flex;align-items:center;gap:5px;color:rgba(255,255,255,0.8);text-decoration:none;transition:color .2s;white-space:nowrap}
.il-topbar-item:hover{color:#fff}
.il-topbar-item svg{flex-shrink:0;opacity:.7}
.il-topbar-divider{width:1px;height:14px;background:rgba(255,255,255,0.14)}

/* ── NAV ── */
.il-nav{
  position:fixed;top:38px;left:0;right:0;z-index:900;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 5%;height:70px;
  background:${BLACK};
  border-bottom:3px solid ${RED};
  transition:all .3s ease;
  font-family:'Nunito',sans-serif;
}
.il-nav.scrolled{box-shadow:0 2px 20px rgba(0,0,0,0.4);height:64px;top:0}

/* Dual brand logos */
.nav-brands{display:flex;align-items:center;gap:20px}
.brand-ilovah{display:flex;align-items:center;gap:9px;cursor:pointer;text-decoration:none;flex-shrink:0}
.brand-ilovah-text{display:flex;flex-direction:column;line-height:1}
.brand-ilovah-t1{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.4rem;letter-spacing:-0.02em;line-height:1}
.brand-ilovah-t1 .ir{color:${RED}}
.brand-ilovah-t1 .iw{color:${WHITE}}
.brand-ilovah-t2{font-size:.55rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:${BLUE2}}
.brand-sep{width:1px;height:32px;background:rgba(255,255,255,0.15)}
.brand-rip{display:flex;flex-direction:column;line-height:1;cursor:pointer}
.brand-rip .r1{font-family:'Black Ops One',cursive;font-size:1rem;letter-spacing:.04em;color:${WHITE}}
.brand-rip .r1 .rr{color:${RED}}
.brand-rip .r2{font-size:.52rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,0.4)}

/* Desktop nav links */
.il-nav-links-desktop{display:flex;gap:1px;list-style:none;align-items:center}
.il-nav-links-desktop a{
  text-decoration:none;color:rgba(255,255,255,.8);font-size:.78rem;font-weight:800;
  padding:7px 14px;border-radius:7px;transition:all .2s;cursor:pointer;
  letter-spacing:.07em;text-transform:uppercase;white-space:nowrap;
  border:1.5px solid transparent;
}
.il-nav-links-desktop a:hover{color:${RED};background:rgba(232,35,42,0.1)}
.il-nav-links-desktop a.nav-active{
  color:${RED};background:rgba(232,35,42,0.12);
  border-color:rgba(232,35,42,0.35);
}

/* Mobile drawer */
.il-nav-links{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:4px;list-style:none;
  position:fixed;top:0;right:0;bottom:0;width:min(300px,82vw);
  background:${DARK};z-index:9999;
  padding:72px 20px 32px;
  transform:translateX(110%);
  transition:transform .38s cubic-bezier(.4,0,.2,1);
  box-shadow:-12px 0 48px rgba(0,0,0,0.5);
  overflow-y:auto;
}
.il-nav-links.open{transform:translateX(0)}
.il-drawer-close{position:absolute;top:16px;right:16px;background:none;border:1.5px solid rgba(255,255,255,.15);border-radius:9px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;color:rgba(255,255,255,.5);transition:all .2s}
.il-drawer-close:hover{border-color:${RED};color:${RED}}
.il-nav-links::before{content:'Menu';display:block;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:rgba(255,255,255,.35);padding:0 4px 14px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:8px}
.il-nav-links a{text-decoration:none;font-size:.97rem;font-weight:700;padding:13px 16px;border-radius:10px;display:block;color:rgba(255,255,255,.85);border:1px solid transparent;transition:all .2s;cursor:pointer;text-transform:uppercase;letter-spacing:.06em}
.il-nav-links a:hover{background:rgba(232,35,42,0.12);color:${RED};border-color:rgba(232,35,42,.2)}
.il-nav-links a.nav-active{background:rgba(232,35,42,0.12);color:${RED};border-color:rgba(232,35,42,.2)}
.il-nav-links .il-nav-quote{margin-top:10px!important;background:${RED}!important;color:#fff!important;text-align:center!important;padding:14px 20px!important;border-radius:10px!important;font-weight:900!important;box-shadow:0 4px 14px ${RED_GLOW}!important;font-size:.95rem!important;display:block}
.il-nav-links .il-nav-quote:hover{background:${RED_DK}!important}
.il-nav-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9998;opacity:0;pointer-events:none;transition:opacity .38s ease;backdrop-filter:blur(4px)}
.il-nav-backdrop.open{opacity:1;pointer-events:all}
.il-nav-quote{background:${RED}!important;color:#fff!important;padding:9px 22px!important;border-radius:6px!important;font-weight:900!important;transition:all .2s!important;box-shadow:0 4px 16px ${RED_GLOW}!important;font-size:.78rem!important;margin-left:6px}
.il-nav-quote:hover{background:${RED2}!important;transform:translateY(-2px)!important}
.il-burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:8px;border-radius:9px;transition:background .2s;z-index:1100;position:relative}
.il-burger:hover{background:rgba(232,35,42,0.1)}
.il-burger span{width:24px;height:2.5px;background:${WHITE};border-radius:3px;display:block;transition:all .35s cubic-bezier(.4,0,.2,1);transform-origin:center}
.il-burger.open span:nth-child(1){transform:rotate(45deg) translate(0,7px)}
.il-burger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.il-burger.open span:nth-child(3){transform:rotate(-45deg) translate(0,-7px)}

/* ── FLOAT CTA ── */
.float-cta{
  position:fixed;bottom:28px;right:28px;z-index:8999;
  background:linear-gradient(135deg,${RED},${RED2});
  border-radius:50px;
  box-shadow:0 8px 32px ${RED_GLOW},0 0 0 3px rgba(232,35,42,0.25);
  animation:ctaFloat 3.5s ease-in-out infinite;
}
.float-cta a{
  color:#fff;text-decoration:none;padding:18px 30px;
  font-family:'Nunito',sans-serif;font-size:1.05rem;font-weight:900;
  display:flex;align-items:center;gap:10px;letter-spacing:.08em;
  text-transform:uppercase;
}
.float-cta:hover{transform:translateY(-3px);box-shadow:0 16px 44px ${RED_GLOW},0 0 0 4px rgba(232,35,42,0.3)}
@keyframes ctaFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

@media(prefers-reduced-motion:reduce){.float-cta{animation:none!important}}
@media(max-width:900px){
  .il-nav{height:60px}
  .il-topbar{padding:0 20px}
  .il-nav-links-desktop{display:none}
  .il-burger{display:flex}
}
@media(max-width:600px){
  .float-cta a{padding:14px 20px;font-size:.88rem}
  .il-topbar{display:none}
  .il-nav{top:0}
  .il-nav.scrolled{top:0}
}
`;

const ILovahLogo = ({ size = 36 }) => (
    <img src={ilovahLogoSrc} alt="iLovah Logo" width={size} height={size} loading="eager" decoding="sync"
        style={{ borderRadius: 8, objectFit: "contain", display: "block", background: "#fff" }} />
);

// Route → which nav link gets active class
const ROUTE_MAP = {
    "/pest-control": "/pest-control",
    "/reviews": "/reviews",
    "/blog": "/blog",
    "/faq": "/faq",
};

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    const goHome = (hash) => {
        if (location.pathname === "/") {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(`/#${hash}`);
        }
    };

    const active = (path) => location.pathname === path ? "nav-active" : "";

    return (
        <>
            <style>{NAV_CSS}</style>

            {/* Top info bar */}
            <div className={`il-topbar ${scrolled ? "hidden" : ""}`} role="complementary" aria-label="Contact information">
                <div className="il-topbar-left">
                    <a className="il-topbar-item" href="https://maps.google.com/?q=4+Kelfield+Street+North+Toowoomba+QLD" rel="noopener noreferrer" target="_blank" aria-label="Our address: 4 Kelfield Street, North Toowoomba QLD">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        4 Kelfield Street, North Toowoomba QLD, Australia
                    </a>
                    <div className="il-topbar-divider" aria-hidden="true" />
                    <span className="il-topbar-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
                        Mon–Sun: 7AM–7PM
                    </span>
                </div>
                <div className="il-topbar-right">
                    <a className="il-topbar-item" href="tel:0478711829" aria-label="Call us: 0478 711 829">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>
                        <span style={{ color: RED, fontWeight: 700 }}>0478 711 829</span>
                    </a>
                    <div className="il-topbar-divider" aria-hidden="true" />
                    <a className="il-topbar-item" href="mailto:ilovahclean@gmail.com" aria-label="Email us: ilovahclean@gmail.com">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        ilovahclean@gmail.com
                    </a>
                </div>
            </div>

            {/* Main nav */}
            <nav className={`il-nav ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation – iLovah Cleaning Services Toowoomba">
                <div className="nav-brands">
                    <a className="brand-ilovah" href="/" onClick={e => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="iLovah Cleaning Services – home">
                        <ILovahLogo size={36} />
                        <div className="brand-ilovah-text">
                            <div className="brand-ilovah-t1"><span className="ir">i</span><span className="iw">Lovah</span></div>
                            <div className="brand-ilovah-t2">Cleaning Services</div>
                        </div>
                    </a>
                    <div className="brand-sep" aria-hidden="true" />
                    <div className="brand-rip" role="button" tabIndex={0} aria-label="Rest In Pest Control" onClick={() => navigate("/pest-control")} onKeyDown={e => e.key === "Enter" && navigate("/pest-control")}>
                        <div className="r1"><span className="rr">REST IN </span>PEST</div>
                        <div className="r2">Control Service</div>
                    </div>
                </div>

                <ul className="il-nav-links-desktop" role="list">
                    <li><a href="/#services" className={active("/")} onClick={e => { e.preventDefault(); goHome("services"); }}>Cleaning Service</a></li>
                    <li><a href="/pest-control" className={active("/pest-control")} onClick={e => { e.preventDefault(); navigate("/pest-control"); }}>Pest Control Service</a></li>
                    <li><a href="/about" className={active("/about")} onClick={e => { e.preventDefault(); navigate("/about"); }}>About</a></li>
                    <li><a href="/reviews" className={active("/reviews")} onClick={e => { e.preventDefault(); navigate("/reviews"); }}>Reviews</a></li>
                    <li><a href="/blog" className={active("/blog")} onClick={e => { e.preventDefault(); navigate("/blog"); }}>Blog</a></li>
                    <li><a href="/faq" className={active("/faq")} onClick={e => { e.preventDefault(); navigate("/faq"); }}>FAQ</a></li>
                    <li>
                        <a className="il-nav-quote" href="tel:0478711829" aria-label="Get Instant Quote">
                            <img src={imgInsect} alt="" aria-hidden="true" width={40} height={40} loading="lazy" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", marginRight: 4, filter: "brightness(0) invert(1)" }} />
                            Get Instant Quote
                        </a>
                    </li>
                </ul>

                <button className={`il-burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-nav-menu">
                    <span /><span /><span />
                </button>
            </nav>

            {/* Mobile drawer */}
            <div className={`il-nav-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
            <ul id="mobile-nav-menu" className={`il-nav-links ${menuOpen ? "open" : ""}`} role="list" aria-label="Mobile navigation">
                <button className="il-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <li><a href="/#services" className={active("/")} onClick={e => { e.preventDefault(); goHome("services"); setMenuOpen(false); }}>Cleaning Service</a></li>
                <li><a href="/pest-control" className={active("/pest-control")} onClick={e => { e.preventDefault(); navigate("/pest-control"); setMenuOpen(false); }}>Pest Control Service</a></li>
                <li><a href="/about" className={active("/about")} onClick={e => { e.preventDefault(); navigate("/about"); setMenuOpen(false); }}>About</a></li>
                <li><a href="/reviews" className={active("/reviews")} onClick={e => { e.preventDefault(); navigate("/reviews"); setMenuOpen(false); }}>Reviews</a></li>
                <li><a href="/blog" className={active("/blog")} onClick={e => { e.preventDefault(); navigate("/blog"); setMenuOpen(false); }}>Blog</a></li>
                <li><a href="/faq" className={active("/faq")} onClick={e => { e.preventDefault(); navigate("/faq"); setMenuOpen(false); }}>FAQ</a></li>
                <li>
                    <a className="il-nav-quote" href="tel:0478711829" onClick={() => setMenuOpen(false)}>
                        <img src={imgInsect} alt="" aria-hidden="true" width={40} height={40} loading="lazy" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", marginRight: 4, filter: "brightness(0) invert(1)" }} />
                        Get Instant Quote
                    </a>
                </li>
            </ul>

            {/* Floating CTA */}
            <div className="float-cta">
                <a href="tel:0478711829" aria-label="Get Instant Quote from iLovah Cleaning Services">
                    <img src={imgInsect} alt="" aria-hidden="true" width={40} height={40} loading="lazy" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", filter: "brightness(0) invert(1)" }} />
                    GET INSTANT QUOTE
                </a>
            </div>
        </>
    );
}