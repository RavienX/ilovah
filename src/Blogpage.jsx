import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Design tokens (match App.jsx) ──────────────────────────────────────────
const RED = "#E8232A";
const RED2 = "#ff4e55";
const RED_DK = "#b01018";
const RED_GLOW = "rgba(232,35,42,0.4)";
const BLUE = "#2B8FD4";
const BLUE2 = "#4AABDB";
const BLACK = "#0c0c0c";
const DARK = "#111827";
const WHITE = "#ffffff";
const OFFWHITE = "#f7f9fc";
const MID = "#64748b";
const BORDER = "#e8e8e8";

const BLOG_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Nunito:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{
  font-family:'Nunito',sans-serif;
  background:#fff;color:${DARK};overflow-x:hidden;
}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#f5f5f5}
::-webkit-scrollbar-thumb{background:${RED2};border-radius:3px}

/* NAV */
.il-nav{
  position:fixed;top:0;left:0;right:0;z-index:900;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 5%;height:70px;
  background:${BLACK};
  border-bottom:3px solid ${RED};
  transition:all .3s ease;
}
.il-nav.scrolled{box-shadow:0 2px 20px rgba(0,0,0,0.4);}
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
.il-nav-links-desktop{display:flex;gap:1px;list-style:none;align-items:center}
.il-nav-links-desktop a{text-decoration:none;color:rgba(255,255,255,.6);font-size:.78rem;font-weight:800;padding:7px 14px;border-radius:7px;transition:all .2s;cursor:pointer;letter-spacing:.07em;text-transform:uppercase;white-space:nowrap}
.il-nav-links-desktop a:hover,.il-nav-links-desktop a.active{color:${RED};background:rgba(232,35,42,0.1)}
.il-nav-quote{background:${RED}!important;color:#fff!important;padding:9px 22px!important;border-radius:6px!important;font-weight:900!important;transition:all .2s!important;box-shadow:0 4px 16px ${RED_GLOW}!important;font-size:.78rem!important;margin-left:6px}
.il-nav-quote:hover{background:${RED2}!important;transform:translateY(-2px)!important}
.il-burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:8px;border-radius:9px;transition:background .2s;z-index:1100;position:relative}
.il-burger:hover{background:rgba(232,35,42,0.1)}
.il-burger span{width:24px;height:2.5px;background:${WHITE};border-radius:3px;display:block;transition:all .35s;transform-origin:center}
.il-burger.open span:nth-child(1){transform:rotate(45deg) translate(0,7px)}
.il-burger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.il-burger.open span:nth-child(3){transform:rotate(-45deg) translate(0,-7px)}
.il-nav-links{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:4px;list-style:none;
  position:fixed;top:0;right:0;bottom:0;width:min(300px,82vw);
  background:${DARK};z-index:9999;
  padding:72px 20px 32px;
  transform:translateX(110%);
  transition:transform .38s cubic-bezier(.4,0,.2,1);
  box-shadow:-12px 0 48px rgba(0,0,0,0.5);
  overflow-y:auto;}
.il-nav-links.open{transform:translateX(0)}
.il-drawer-close{position:absolute;top:16px;right:16px;background:none;border:1.5px solid rgba(255,255,255,.15);border-radius:9px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;color:rgba(255,255,255,.5);transition:all .2s}
.il-drawer-close:hover{border-color:${RED};color:${RED}}
.il-nav-links::before{content:'Menu';display:block;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:rgba(255,255,255,.35);padding:0 4px 14px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:8px}
.il-nav-links a{text-decoration:none;font-size:.97rem;font-weight:700;padding:13px 16px;border-radius:10px;display:block;color:rgba(255,255,255,.7);border:1px solid transparent;transition:all .2s;cursor:pointer;text-transform:uppercase;letter-spacing:.06em}
.il-nav-links a:hover{background:rgba(232,35,42,0.12);color:${RED};border-color:rgba(232,35,42,.2)}
.il-nav-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9998;opacity:0;pointer-events:none;transition:opacity .38s ease;backdrop-filter:blur(4px)}
.il-nav-backdrop.open{opacity:1;pointer-events:all}
.il-nav-links .il-nav-quote{margin-top:10px!important;background:${RED}!important;color:#fff!important;text-align:center!important;padding:14px 20px!important;border-radius:10px!important;font-weight:900!important;font-size:.95rem!important;display:block}

/* HERO */
.blog-hero{
  background:${BLACK};
  padding:140px 5% 80px;
  position:relative;overflow:hidden;
  text-align:center;
}
.blog-hero::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 50% at 50% 0%,rgba(232,35,42,0.18),transparent 65%);
}
.blog-hero-tag{
  display:inline-block;font-size:.7rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;
  color:${RED2};background:rgba(232,35,42,0.12);
  padding:6px 16px;border-radius:6px;margin-bottom:18px;
  border:1px solid rgba(232,35,42,0.25);position:relative;z-index:1;
}
.blog-hero h1{
  font-family:'Montserrat',sans-serif;font-weight:900;
  font-size:clamp(2.4rem,5vw,3.8rem);color:${WHITE};
  letter-spacing:-0.03em;line-height:1.08;
  position:relative;z-index:1;margin-bottom:18px;
}
.blog-hero h1 .hl-red{color:${RED}}
.blog-hero p{
  color:rgba(255,255,255,.55);font-size:1rem;line-height:1.72;
  max-width:560px;margin:0 auto;position:relative;z-index:1;
}
.blog-hero-bar{
  position:absolute;bottom:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,${BLUE} 0%,${BLUE2} 50%,${RED} 50%,${RED2} 100%);
}

/* FILTER TABS */
.blog-filters{
  display:flex;gap:10px;flex-wrap:wrap;justify-content:center;
  padding:40px 5% 32px;
  background:${OFFWHITE};
  border-bottom:1px solid ${BORDER};
}
.blog-filter-btn{
  background:#fff;border:1.5px solid ${BORDER};color:${MID};
  padding:8px 18px;border-radius:50px;font-size:.8rem;font-weight:800;
  cursor:pointer;font-family:'Nunito',sans-serif;
  transition:all .2s;letter-spacing:.04em;text-transform:uppercase;
}
.blog-filter-btn:hover{border-color:${RED};color:${RED}}
.blog-filter-btn.active{background:${RED};border-color:${RED};color:#fff;box-shadow:0 4px 14px ${RED_GLOW}}

/* GRID */
.blog-section{padding:60px 5% 80px;max-width:1200px;margin:0 auto}
.blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:28px}

/* CARD */
.blog-card{
  background:#fff;border-radius:18px;border:1.5px solid ${BORDER};
  overflow:hidden;cursor:pointer;
  transition:all .3s;display:flex;flex-direction:column;
}
.blog-card:hover{transform:translateY(-6px);box-shadow:0 22px 56px rgba(0,0,0,0.09);border-color:rgba(232,35,42,.25)}
.blog-card-img{
  width:100%;height:200px;
  display:flex;align-items:center;justify-content:center;
  font-size:3.5rem;
  flex-shrink:0;
  position:relative;
}
.blog-card-body{padding:22px 24px 24px;display:flex;flex-direction:column;flex:1}
.blog-card-cat{
  display:inline-block;font-size:.65rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;
  padding:4px 12px;border-radius:50px;margin-bottom:12px;width:fit-content;
}
.cat-cleaning{background:rgba(43,143,212,0.1);color:${BLUE};border:1px solid rgba(43,143,212,0.2)}
.cat-pest{background:rgba(232,35,42,0.09);color:${RED};border:1px solid rgba(232,35,42,0.2)}
.cat-tips{background:rgba(255,184,0,0.1);color:#b07d00;border:1px solid rgba(255,184,0,0.25)}
.cat-news{background:rgba(100,116,139,0.1);color:${MID};border:1px solid rgba(100,116,139,0.2)}
.blog-card-title{
  font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.08rem;
  color:${DARK};margin-bottom:10px;line-height:1.3;letter-spacing:-.02em;
}
.blog-card-excerpt{font-size:.88rem;color:${MID};line-height:1.65;flex:1;margin-bottom:18px}
.blog-card-meta{display:flex;align-items:center;justify-content:space-between;font-size:.75rem;color:rgba(100,116,139,.7);font-weight:700}
.blog-card-meta-left{display:flex;align-items:center;gap:8px}
.blog-card-avatar{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,${RED},${RED2});display:flex;align-items:center;justify-content:center;color:#fff;font-size:.7rem;font-weight:900;flex-shrink:0}
.blog-read-more{
  background:none;border:1.5px solid rgba(232,35,42,.25);color:${RED};
  padding:9px 18px;border-radius:8px;font-size:.8rem;font-weight:900;
  cursor:pointer;font-family:'Nunito',sans-serif;
  transition:all .2s;display:inline-flex;align-items:center;gap:5px;
  text-decoration:none;margin-top:4px;
}
.blog-read-more:hover{background:${RED};color:#fff;border-color:${RED}}

/* FEATURED */
.blog-featured{
  background:linear-gradient(135deg,${DARK} 0%,#1a2535 100%);
  border-radius:22px;
  padding:44px 48px;
  margin-bottom:48px;
  display:grid;grid-template-columns:1fr 1fr;gap:40px;
  align-items:center;
  border:1.5px solid rgba(232,35,42,0.2);
  position:relative;overflow:hidden;
}
.blog-featured::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 70% at 0% 50%,rgba(43,143,212,0.1),transparent 60%);
  pointer-events:none;
}
.blog-featured-tag{display:inline-flex;align-items:center;gap:6px;font-size:.7rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:${BLUE2};background:rgba(74,171,219,0.12);padding:5px 14px;border-radius:50px;border:1px solid rgba(74,171,219,0.25);margin-bottom:18px}
.blog-featured-tag::before{content:'★';color:${BLUE2}}
.blog-featured h2{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(1.6rem,2.5vw,2.2rem);color:${WHITE};line-height:1.15;letter-spacing:-.03em;margin-bottom:14px}
.blog-featured h2 .hl-red{color:${RED}}
.blog-featured p{color:rgba(255,255,255,.55);font-size:.95rem;line-height:1.7;margin-bottom:24px}
.blog-featured-img{
  border-radius:16px;height:260px;
  display:flex;align-items:center;justify-content:center;
  font-size:6rem;
  border:1.5px solid rgba(255,255,255,0.08);
  position:relative;overflow:hidden;
  background:rgba(255,255,255,0.04);
}
.btn-blue{
  background:linear-gradient(135deg,${BLUE},${BLUE2});
  color:${WHITE};padding:13px 28px;border-radius:8px;
  font-weight:900;font-size:.9rem;text-decoration:none;
  box-shadow:0 6px 24px rgba(43,143,212,0.35);
  transition:all .25s;display:inline-flex;align-items:center;gap:8px;
  border:none;cursor:pointer;font-family:'Nunito',sans-serif;
}
.btn-blue:hover{transform:translateY(-2px);filter:brightness(1.1)}

/* NEWSLETTER */
.blog-newsletter{
  background:linear-gradient(135deg,${RED} 0%,${RED_DK} 100%);
  border-radius:22px;padding:48px;text-align:center;
  margin:48px 0 0;box-shadow:0 16px 52px ${RED_GLOW};
}
.blog-newsletter h3{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.8rem;color:#fff;letter-spacing:-.03em;margin-bottom:10px}
.blog-newsletter p{color:rgba(255,255,255,.7);font-size:.95rem;margin-bottom:28px}
.newsletter-form{display:flex;gap:10px;max-width:440px;margin:0 auto;flex-wrap:wrap;justify-content:center}
.newsletter-input{
  flex:1;min-width:200px;padding:13px 18px;border-radius:8px;
  border:1.5px solid rgba(255,255,255,.3);background:rgba(255,255,255,.12);
  color:#fff;font-family:'Nunito',sans-serif;font-size:.92rem;font-weight:700;
  outline:none;transition:border-color .2s;
}
.newsletter-input::placeholder{color:rgba(255,255,255,.5)}
.newsletter-input:focus{border-color:rgba(255,255,255,.7)}
.newsletter-btn{
  background:#fff;color:${RED};padding:13px 24px;border-radius:8px;
  font-weight:900;font-size:.9rem;border:none;cursor:pointer;
  font-family:'Nunito',sans-serif;transition:all .2s;white-space:nowrap;
}
.newsletter-btn:hover{background:${OFFWHITE};transform:translateY(-2px)}

/* FOOTER */
.il-footer{background:${DARK};padding:60px 5% 28px;color:rgba(255,255,255,.5);font-size:.85rem}
.il-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px}
.il-footer-brand p{color:rgba(255,255,255,.4);line-height:1.65;margin-top:14px;font-size:.84rem}
.footer-dual-logo{display:flex;align-items:center;gap:14px}
.fdl-il{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.5rem;letter-spacing:-.02em}
.fdl-il .lr{color:${RED}}
.fdl-il .lw{color:#fff}
.fdl-sep{width:1px;height:28px;background:rgba(255,255,255,.15)}
.fdl-rip{font-family:'Black Ops One',cursive;font-size:1.1rem;color:#fff}
.fdl-rip .r{color:${RED}}
.il-footer-col h3{color:#fff;font-size:.85rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:18px}
.il-footer-col ul{list-style:none}
.il-footer-col ul li{margin-bottom:10px}
.il-footer-col ul li a{color:rgba(255,255,255,.4);text-decoration:none;font-size:.84rem;transition:color .2s}
.il-footer-col ul li a:hover{color:${RED}}
.il-footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:.78rem}
.il-footer-bottom .fa{font-weight:700}
.hrt{color:${RED}}

/* FLOAT CTA */
.float-cta{
  position:fixed;bottom:28px;right:28px;z-index:999;
}
.float-cta a{
  background:linear-gradient(135deg,${RED},${RED2});
  color:#fff;padding:14px 22px;border-radius:50px;
  font-size:.82rem;font-weight:900;text-decoration:none;
  box-shadow:0 8px 28px ${RED_GLOW};
  display:flex;align-items:center;gap:8px;
  transition:all .25s;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;
  border:none;font-family:'Nunito',sans-serif;
}
.float-cta a:hover{transform:translateY(-3px);box-shadow:0 14px 40px ${RED_GLOW}}

/* RESPONSIVE */
@media(max-width:900px){
  .blog-featured{grid-template-columns:1fr;padding:32px 28px}
  .blog-featured-img{display:none}
  .il-footer-grid{grid-template-columns:1fr 1fr}
  .il-nav-links-desktop{display:none}
  .il-burger{display:flex}
}
@media(max-width:600px){
  .blog-hero{padding:110px 5% 60px}
  .blog-section{padding:40px 5% 60px}
  .il-footer-grid{grid-template-columns:1fr}
  .blog-newsletter{padding:32px 24px}
  .float-cta{bottom:18px;right:18px}
  .float-cta a{padding:12px 16px;font-size:.75rem}
}
`;

// ── Blog posts data ────────────────────────────────────────────────────────
const POSTS = [
    {
        id: 1,
        cat: "cleaning",
        catLabel: "Cleaning Tips",
        catClass: "cat-cleaning",
        emoji: "🧹",
        bg: "linear-gradient(135deg,#e8f4fd,#cce6f7)",
        title: "The Ultimate End-of-Lease Cleaning Checklist for Toowoomba Renters",
        excerpt: "Moving out? Don't lose your bond. We break down every room, every surface, and every real estate requirement you need to tick off before handing back the keys.",
        author: "iLovah Team",
        date: "Apr 10, 2025",
        readTime: "5 min read",
        featured: true,
    },
    {
        id: 2,
        cat: "pest",
        catLabel: "Pest Control",
        catClass: "cat-pest",
        emoji: "🐛",
        bg: "linear-gradient(135deg,#fdecea,#fccac8)",
        title: "5 Signs You Have a Cockroach Problem (And What To Do About It)",
        excerpt: "Cockroaches are masters of hiding. Learn the telltale signs of an infestation, why DIY sprays rarely work, and when to call a licensed pest technician.",
        author: "Rest In Pest",
        date: "Mar 28, 2025",
        readTime: "4 min read",
        featured: false,
    },
    {
        id: 3,
        cat: "tips",
        catLabel: "Home Tips",
        catClass: "cat-tips",
        emoji: "✨",
        bg: "linear-gradient(135deg,#fffbea,#fff0b3)",
        title: "How to Keep Your Carpets Fresh Between Professional Cleans",
        excerpt: "Dry carpet cleaning gives a deep clean, but everyday maintenance makes all the difference. Here are our professional tips for keeping carpets looking their best.",
        author: "iLovah Team",
        date: "Mar 15, 2025",
        readTime: "3 min read",
        featured: false,
    },
    {
        id: 4,
        cat: "pest",
        catLabel: "Pest Control",
        catClass: "cat-pest",
        emoji: "🕷️",
        bg: "linear-gradient(135deg,#1a1a1a,#2a1010)",
        title: "Spider Season in Toowoomba: What You Need to Know",
        excerpt: "Warmer months bring out more spiders in Toowoomba homes. We explain which species are common, which are dangerous, and how a barrier treatment keeps them out.",
        author: "Rest In Pest",
        date: "Feb 20, 2025",
        readTime: "6 min read",
        featured: false,
    },
    {
        id: 5,
        cat: "cleaning",
        catLabel: "Cleaning Tips",
        catClass: "cat-cleaning",
        emoji: "🪟",
        bg: "linear-gradient(135deg,#e8f4fd,#d0ecff)",
        title: "Why Window Cleaning Is More Important Than You Think",
        excerpt: "Clean windows don't just look great — they let in more light, extend the life of your glass, and improve your home's kerb appeal. Here's what our window clean includes.",
        author: "iLovah Team",
        date: "Feb 5, 2025",
        readTime: "3 min read",
        featured: false,
    },
    {
        id: 6,
        cat: "news",
        catLabel: "News",
        catClass: "cat-news",
        emoji: "🏆",
        bg: "linear-gradient(135deg,#f7f9fc,#eaf0f8)",
        title: "iLovah Hits 1,000 Happy Clients in Toowoomba",
        excerpt: "We're proud to announce a major milestone — over 1,000 satisfied clients across Toowoomba and surrounds. Here's a look back at how we got here.",
        author: "iLovah Team",
        date: "Jan 18, 2025",
        readTime: "2 min read",
        featured: false,
    },
];

const CATEGORIES = [
    { key: "all", label: "All Posts" },
    { key: "cleaning", label: "Cleaning Tips" },
    { key: "pest", label: "Pest Control" },
    { key: "tips", label: "Home Tips" },
    { key: "news", label: "News" },
];

export default function BlogPage() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("all");
    const [menuOpen, setMenuOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const featured = POSTS.find((p) => p.featured);
    const filtered =
        activeCategory === "all"
            ? POSTS.filter((p) => !p.featured)
            : POSTS.filter((p) => p.cat === activeCategory && !p.featured);

    function goHome(section) {
        navigate("/");
        if (section) setTimeout(() => {
            const el = document.getElementById(section);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
        setMenuOpen(false);
    }

    function handleSubscribe() {
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    }

    return (
        <div style={{ width: "100%", maxWidth: "100%", margin: 0, padding: 0, overflowX: "hidden" }}>
            <style>{BLOG_CSS}</style>

            {/* ── NAV ── */}
            <nav className="il-nav" aria-label="Main navigation">
                <div className="nav-brands">
                    <a className="brand-ilovah" onClick={() => navigate("/")}>
                        <div className="brand-ilovah-text">
                            <div className="brand-ilovah-t1"><span className="ir">i</span><span className="iw">Lovah</span></div>
                            <div className="brand-ilovah-t2">Cleaning Services</div>
                        </div>
                    </a>
                    <div className="brand-sep" />
                    <div className="brand-rip" onClick={() => navigate("/pest-control")}>
                        <div className="r1"><span className="rr">REST IN </span>PEST</div>
                        <div className="r2">Control Service</div>
                    </div>
                </div>
                <ul className="il-nav-links-desktop">
                    <li><a onClick={() => goHome("services")}>Cleaning Service</a></li>
                    <li><a onClick={() => navigate("/pest-control")}>Pest Control</a></li>
                    <li><a onClick={() => goHome("about")}>About</a></li>
                    <li><a onClick={() => goHome("reviews")}>Reviews</a></li>
                    <li><a onClick={() => goHome("faq")}>FAQ</a></li>
                    <li><a className="active" style={{ color: RED, background: "rgba(232,35,42,0.1)" }}>Blog</a></li>
                    <li><a className="il-nav-quote" onClick={() => goHome("get-in-touch")}>Get Instant Quote</a></li>
                </ul>
                <button className={`il-burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span /><span /><span />
                </button>
            </nav>

            {/* Mobile drawer */}
            <div className={`il-nav-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
            <ul className={`il-nav-links ${menuOpen ? "open" : ""}`}>
                <button className="il-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <li><a onClick={() => goHome("services")}>Cleaning Service</a></li>
                <li><a onClick={() => navigate("/pest-control")}>Pest Control</a></li>
                <li><a onClick={() => goHome("about")}>About</a></li>
                <li><a onClick={() => goHome("reviews")}>Reviews</a></li>
                <li><a onClick={() => goHome("faq")}>FAQ</a></li>
                <li><a style={{ color: RED }}>Blog</a></li>
                <li><a className="il-nav-quote" onClick={() => goHome("get-in-touch")}>Get Instant Quote</a></li>
            </ul>

            {/* ── HERO ── */}
            <section className="blog-hero">
                <div className="blog-hero-tag">📰 iLovah Blog</div>
                <h1>Cleaning & Pest Tips for<br /><span className="hl-red">Toowoomba Homes</span></h1>
                <p>Expert advice, how-to guides, and local news from the iLovah Cleaning & Rest In Pest team.</p>
                <div className="blog-hero-bar" />
            </section>

            {/* ── FILTER TABS ── */}
            <div className="blog-filters" role="tablist" aria-label="Filter blog posts by category">
                {CATEGORIES.map((c) => (
                    <button
                        key={c.key}
                        className={`blog-filter-btn ${activeCategory === c.key ? "active" : ""}`}
                        onClick={() => setActiveCategory(c.key)}
                        role="tab"
                        aria-selected={activeCategory === c.key}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {/* ── CONTENT ── */}
            <div className="blog-section">

                {/* Featured post — only shown on "all" */}
                {activeCategory === "all" && featured && (
                    <div className="blog-featured">
                        <div>
                            <div className="blog-featured-tag">Featured Article</div>
                            <h2>{featured.title.split("for")[0].trim()} for<br /><span className="hl-red">Toowoomba Renters</span></h2>
                            <p>{featured.excerpt}</p>
                            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                                <button className="btn-blue">Read Article →</button>
                                <span style={{ fontSize: ".78rem", color: "rgba(255,255,255,.35)", fontWeight: 700 }}>
                                    {featured.date} · {featured.readTime}
                                </span>
                            </div>
                        </div>
                        <div className="blog-featured-img">{featured.emoji}</div>
                    </div>
                )}

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="blog-grid">
                        {filtered.map((post) => (
                            <article key={post.id} className="blog-card" aria-label={post.title}>
                                <div className="blog-card-img" style={{ background: post.bg }}>
                                    {post.emoji}
                                </div>
                                <div className="blog-card-body">
                                    <span className={`blog-card-cat ${post.catClass}`}>{post.catLabel}</span>
                                    <div className="blog-card-title">{post.title}</div>
                                    <div className="blog-card-excerpt">{post.excerpt}</div>
                                    <div className="blog-card-meta">
                                        <div className="blog-card-meta-left">
                                            <div className="blog-card-avatar">{post.author[0]}</div>
                                            <span>{post.author}</span>
                                        </div>
                                        <span>{post.date} · {post.readTime}</span>
                                    </div>
                                    <button className="blog-read-more" style={{ marginTop: 16 }}>
                                        Read More →
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: "60px 0", color: MID }}>
                        <div style={{ fontSize: "3rem", marginBottom: 16 }}>📭</div>
                        <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>No posts in this category yet.</div>
                        <div style={{ fontSize: ".9rem", marginTop: 6 }}>Check back soon — new content is on the way!</div>
                    </div>
                )}

                {/* Newsletter */}
                <div className="blog-newsletter">
                    <h3>Get Cleaning Tips in Your Inbox</h3>
                    <p>Join 500+ Toowoomba homeowners who receive our monthly cleaning and pest prevention newsletter.</p>
                    {subscribed ? (
                        <div style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>
                            ✅ You're subscribed! We'll be in touch soon.
                        </div>
                    ) : (
                        <div className="newsletter-form">
                            <input
                                className="newsletter-input"
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                                aria-label="Email address for newsletter"
                            />
                            <button className="newsletter-btn" onClick={handleSubscribe}>Subscribe →</button>
                        </div>
                    )}
                </div>
            </div>
            {/* ── FOLLOW US ON FACEBOOK ── */}
            <section style={{ background: "#0c0c0c", borderTop: "1px solid rgba(232,35,42,0.15)", padding: "52px 5%", textAlign: "center" }}>
                <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: ".68rem", fontWeight: 900, letterSpacing: ".16em", textTransform: "uppercase", color: "#4AABDB", background: "rgba(74,171,219,0.1)", border: "1px solid rgba(74,171,219,0.2)", padding: "5px 14px", borderRadius: 6 }}>Stay Connected</div>
                    <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.7rem", color: "#fff", letterSpacing: "-.02em", lineHeight: 1.15, margin: 0 }}>Follow Us on <span style={{ color: "#E8232A" }}>Facebook</span></h2>
                    <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".9rem", lineHeight: 1.65, margin: 0 }}>See our latest jobs, tips &amp; special offers from both of our pages.</p>

                    {/* Two Facebook page cards */}
                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 8, width: "100%" }}>

                        {/* iLovah Cleaning Services */}
                        <div style={{ flex: "1 1 340px", maxWidth: 400, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,171,219,0.2)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#2B8FD4,#4AABDB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                                </svg>
                            </div>
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: "#fff", textAlign: "center", lineHeight: 1.2 }}>
                                iLovah <span style={{ color: "#4AABDB" }}>Cleaning Services</span>
                            </div>
                            <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".82rem", lineHeight: 1.6, margin: 0, textAlign: "center" }}>Bond cleaning, carpet cleaning, window &amp; gutter cleaning, pressure washing and more.</p>
                            <a
                                href="https://www.facebook.com/people/i-LovahCleaning-Services/61558661136011/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow iLovah Cleaning Services on Facebook"
                                style={{
                                    marginTop: 4, display: "inline-flex", alignItems: "center", gap: 8,
                                    background: "linear-gradient(135deg,#2B8FD4,#4AABDB)",
                                    color: "#fff", padding: "11px 24px", borderRadius: 8,
                                    fontWeight: 900, fontSize: ".88rem",
                                    textDecoration: "none", fontFamily: "'Nunito',sans-serif",
                                    boxShadow: "0 4px 16px rgba(43,143,212,0.35)",
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                                </svg>
                                Follow iLovah
                            </a>
                        </div>

                        {/* Rest In Pest Control */}
                        <div style={{ flex: "1 1 340px", maxWidth: 400, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,35,42,0.25)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#E8232A,#b01018)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                                </svg>
                            </div>
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: "#fff", textAlign: "center", lineHeight: 1.2 }}>
                                Rest In <span style={{ color: "#E8232A" }}>Pest Control</span>
                            </div>
                            <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".82rem", lineHeight: 1.6, margin: 0, textAlign: "center" }}>Licensed pest treatments for cockroaches, ants, spiders, rodents &amp; more across Toowoomba.</p>
                            <a
                                href="https://www.facebook.com/profile.php?id=61583659933160"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Follow Rest In Pest Control on Facebook"
                                style={{
                                    marginTop: 4, display: "inline-flex", alignItems: "center", gap: 8,
                                    background: "linear-gradient(135deg,#E8232A,#b01018)",
                                    color: "#fff", padding: "11px 24px", borderRadius: 8,
                                    fontWeight: 900, fontSize: ".88rem",
                                    textDecoration: "none", fontFamily: "'Nunito',sans-serif",
                                    boxShadow: "0 4px 16px rgba(232,35,42,0.35)",
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                                </svg>
                                Follow Rest In Pest
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="il-footer" aria-label="iLovah footer">
                <div className="il-footer-grid">
                    <div className="il-footer-brand">
                        <div className="footer-dual-logo">
                            <div className="fdl-il"><span className="lr">i</span><span className="lw">Lovah</span></div>
                            <div className="fdl-sep" />
                            <div className="fdl-rip"><span className="r">REST IN </span><span>PEST</span></div>
                        </div>
                        <p>Family-owned and community-focused. Proudly serving Toowoomba and surrounds with professional cleaning and licensed pest control services.</p>
                    </div>
                    <div className="il-footer-col">
                        <h3>Pest Control</h3>
                        <ul>
                            {["Cockroach Control", "Ant Treatments", "Spider Control", "Rodent Control", "End of Lease Flea Treatment"].map((s) => (
                                <li key={s}><a href="/pest-control">{s}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="il-footer-col">
                        <h3>Cleaning</h3>
                        <ul>
                            {["Bond Cleaning", "Carpet Cleaning", "Window Cleaning", "Gutter Cleaning", "Pressure Washing"].map((s) => (
                                <li key={s}><a href="/#services">{s}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="il-footer-col">
                        <h3>Contact</h3>
                        <ul>
                            <li><a href="tel:0478711829">📞 0478 711 829</a></li>
                            <li><a href="mailto:ilovahclean@gmail.com">✉ ilovahclean@gmail.com</a></li>
                            <li><a href="#">📍 North Toowoomba QLD</a></li>
                            <li><a href="#">🕐 Mon–Sat 7am–6pm</a></li>
                        </ul>
                    </div>
                </div>
                <div className="il-footer-bottom">
                    <div>© 2025 <span className="fa" style={{ color: "red" }}>iLovah Cleaning Services</span> &amp; <span className="fa" style={{ color: "red" }}>Rest In Pest Control</span>. All rights reserved.</div>
                    <div>Made with <span className="hrt">♥</span> in Toowoomba, QLD</div>
                </div>
            </footer>

            {/* Float CTA */}
            <div className="float-cta">
                <a onClick={() => goHome("get-in-touch")}>💬 GET INSTANT QUOTE</a>
            </div>
        </div>
    );
}