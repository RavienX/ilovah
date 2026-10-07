import { useEffect } from "react";
import { Award, Bug, FileCheck, GraduationCap, Handshake, Heart, Home, Leaf, Microscope, Phone, RefreshCw, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import PageFooter from "./PageFooter";
import imgHappy from "./assets/happy.jpg";
import ilovahLogoSrc from "./assets/logo.png";
import imgLogo2 from "./assets/logo2.jpg";


// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP = {
    Award, Bug, FileCheck, GraduationCap, Handshake, Heart,
    Home, Leaf, Microscope, Phone, RefreshCw,
    ShieldCheck, Sparkles, Star, Zap,
};
const Ico = ({ name, size = 18, color = "currentColor" }) => {
    const C = ICON_MAP[name];
    if (!C) return null;
    return <C size={size} color={color} strokeWidth={2} aria-hidden="true" />;
};

// ── Design tokens ──────────────────────────────────────────────────────────────
const RED = "#E8232A";
const RED2 = "#ff4e55";
const RED_DK = "#b01018";
const RED_GLOW = "rgba(232,35,42,0.4)";
const RED_LT = "#fdecea";
const BLUE = "#2B8FD4";
const BLUE2 = "#4AABDB";
const BLUE_GLOW = "rgba(43,143,212,0.35)";
const BLACK = "#0c0c0c";
const DARK = "#111827";
const DARK2 = "#1a2535";
const WHITE = "#ffffff";
const OFFWHITE = "#f7f9fc";
const MID = "#4b5563";
const GOLD = "#FFB800";
const BORDER = "#e8e8e8";
const CREAM = "#fdfaf9";
const CHARCOAL = "#1a1a1a";

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{
  font-family:'Nunito',sans-serif;
  background:#fff;color:${DARK};overflow-x:hidden;
  width:100%;max-width:100%;margin:0;padding:0;
}
:root{
  --red:${RED};--red2:${RED2};--red-dark:${RED_DK};--red-glow:${RED_GLOW};
  --blue:${BLUE};--blue2:${BLUE2};--blue-glow:${BLUE_GLOW};
  --black:${BLACK};--dark:${DARK};--dark2:${DARK2};
  --white:${WHITE};--offwhite:${OFFWHITE};--muted:${MID};
  --gold:${GOLD};--charcoal:${CHARCOAL};--border:${BORDER};--cream:${CREAM};--red-lt:${RED_LT};
}

/* ── ABOUT PAGE HERO ── */
.about-hero{
  background:${DARK};
  padding:140px 5% 80px;
  position:relative;
  overflow:hidden;
  text-align:center;
}
.about-hero::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 60% at 30% 50%,rgba(43,143,212,0.14),transparent 65%),
    radial-gradient(ellipse 50% 50% at 80% 40%,rgba(232,35,42,0.1),transparent 60%);
  pointer-events:none;
}
.about-hero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 16px;border-radius:50px;margin-bottom:24px;
  font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;
  background:rgba(74,171,219,0.12);border:1px solid rgba(74,171,219,0.3);color:${BLUE2};
  position:relative;z-index:2;
}
.about-hero-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:${BLUE2};animation:dotPulse 2s infinite}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.3}}
.about-hero-h1{
  font-family:'Montserrat',sans-serif;
  font-weight:900;font-size:clamp(2.2rem,4vw,3.6rem);
  line-height:1.06;letter-spacing:-0.03em;
  color:${WHITE};margin-bottom:20px;
  position:relative;z-index:2;
}
.about-hero-h1 .hl-red{color:${RED}}
.about-hero-h1 .hl-blue{color:${BLUE2}}
.about-hero-sub{
  font-size:1rem;color:rgba(255,255,255,.68);line-height:1.75;
  max-width:540px;margin:0 auto 36px;
  position:relative;z-index:2;
}
.about-hero-bottom-bar{
  position:absolute;bottom:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,${BLUE} 0%,${BLUE2} 50%,${RED} 50%,${RED2} 100%);
}

/* ── SHARED ── */
.il-wrap{max-width:1200px;margin:0 auto;padding:0 5%}
.sec-tag-blue{
  display:inline-block;font-size:.7rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;
  color:${BLUE2};background:rgba(74,171,219,0.1);
  padding:6px 16px;border-radius:6px;margin-bottom:18px;
  border:1px solid rgba(74,171,219,0.2);
}
.sec-tag-red{
  display:inline-block;font-size:.7rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;
  color:${RED};background:rgba(232,35,42,0.1);
  padding:6px 16px;border-radius:6px;margin-bottom:18px;
  border:1px solid rgba(232,35,42,0.2);
}
.sec-h2{
  font-family:'Montserrat',sans-serif;font-weight:900;
  font-size:clamp(2rem,3.5vw,3rem);line-height:1.1;
  color:${DARK};margin-bottom:18px;letter-spacing:-0.02em;
}
.sec-h2 .hl-red{color:${RED}}
.sec-h2 .hl-blue{color:${BLUE2}}
.sec-sub{
  font-size:1rem;color:${MID};line-height:1.7;
  max-width:560px;margin:0 auto 48px;
}

/* ── ABOUT MAIN SECTION ── */
.about-why{padding:80px 0;background:${OFFWHITE}}
.about-why-inner{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.about-why-img{border-radius:20px;overflow:hidden;position:relative;}
.about-why-badge{
  position:absolute;bottom:24px;left:24px;
  background:#fff;border-radius:14px;padding:14px 18px;
  display:flex;align-items:center;gap:12px;
  box-shadow:0 8px 28px rgba(0,0,0,.12);
}
.about-why-badge-icon{font-size:1.5rem}
.about-why-badge strong{display:block;font-size:.9rem;font-weight:900;color:${DARK};font-family:'Montserrat',sans-serif}
.about-why-badge span{display:block;font-size:.74rem;color:${MID}}
.about-feature{display:flex;align-items:flex-start;gap:14px;margin-bottom:22px}
.about-feat-ico{width:42px;height:42px;border-radius:10px;background:rgba(232,35,42,.08);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
.about-feat-title{font-family:'Montserrat',sans-serif;font-size:.96rem;font-weight:900;color:${DARK};margin-bottom:4px}
.about-feat-desc{font-size:.85rem;color:${MID};line-height:1.6}

/* ── STORY SECTION ── */
.about-story{padding:80px 0;background:#fff}
.about-story-inner{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.about-story-img-wrap{border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.12);position:relative}
.about-story-img-wrap img{width:100%;height:auto;display:block}
.about-story-year-badge{
  position:absolute;top:24px;left:24px;
  background:${RED};color:#fff;border-radius:12px;
  padding:10px 16px;font-family:'Montserrat',sans-serif;
  font-weight:900;font-size:1.1rem;letter-spacing:-.02em;
  box-shadow:0 4px 16px ${RED_GLOW};
}
.about-story-year-badge span{display:block;font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:.12em;opacity:.8}

/* ── VALUES SECTION ── */
.about-values{padding:80px 0;background:${DARK}}
.about-values-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;
}
.about-value-card{
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
  border-radius:20px;padding:32px 28px;
  transition:all .3s;
}
.about-value-card:hover{background:rgba(255,255,255,.08);border-color:rgba(232,35,42,.3);transform:translateY(-4px)}
.about-value-ico{font-size:2rem;margin-bottom:16px}
.about-value-title{font-family:'Montserrat',sans-serif;font-size:1.05rem;font-weight:900;color:${WHITE};margin-bottom:10px;letter-spacing:-.02em}
.about-value-desc{font-size:.88rem;color:rgba(255,255,255,.6);line-height:1.65}

/* ── STATS SECTION ── */
.about-stats{padding:72px 0;background:${OFFWHITE}}
.about-stats-grid{
  display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px;
}
.about-stat-card{
  background:#fff;border-radius:16px;padding:32px 24px;
  text-align:center;border:1.5px solid ${BORDER};
  box-shadow:0 4px 16px rgba(0,0,0,.04);
  transition:all .3s;
}
.about-stat-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.08);border-color:rgba(232,35,42,.2)}
.about-stat-num{
  font-family:'Montserrat',sans-serif;font-weight:900;
  font-size:2.4rem;line-height:1;margin-bottom:8px;
}
.about-stat-num.clr-red{color:${RED}}
.about-stat-num.clr-blue{color:${BLUE2}}
.about-stat-label{font-size:.78rem;font-weight:800;color:${MID};text-transform:uppercase;letter-spacing:.08em}

/* ── BRANDS SECTION ── */
.about-brands{padding:80px 0;background:#fff}
.about-brands-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:48px}
.about-brand-card{
  border-radius:20px;overflow:hidden;border:2px solid ${BORDER};
  transition:all .3s;
}
.about-brand-card:hover{border-color:rgba(232,35,42,.3);box-shadow:0 16px 48px rgba(0,0,0,.08);transform:translateY(-3px)}
.about-brand-card-header{
  padding:32px 32px 24px;
  display:flex;align-items:center;gap:18px;
}
.about-brand-card-header.blue-bg{background:${DARK}}
.about-brand-card-header.red-bg{background:#0f0a08}
.about-brand-card-body{padding:24px 32px 32px;background:${OFFWHITE}}
.about-brand-logo-text{display:flex;flex-direction:column;line-height:1}
.about-brand-name{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.8rem;letter-spacing:-.03em;line-height:1}
.about-brand-name .lr{color:${RED}}
.about-brand-name .lw{color:${WHITE}}
.about-brand-sub{font-size:.6rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:${BLUE2};margin-top:3px}
.about-brand-rip-name{font-family:'Black Ops One',cursive;font-size:1.5rem;letter-spacing:.04em;color:${WHITE}}
.about-brand-rip-name .rr{color:${RED}}
.about-brand-rip-sub{font-size:.6rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:4px}
.about-brand-desc{font-size:.9rem;color:${MID};line-height:1.7}
.about-brand-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}
.about-brand-pill{
  font-size:.72rem;font-weight:800;padding:5px 12px;border-radius:50px;
  text-transform:uppercase;letter-spacing:.06em;
}
.about-brand-pill.blue{background:rgba(74,171,219,.12);color:${BLUE2};border:1px solid rgba(74,171,219,.25)}
.about-brand-pill.red{background:rgba(232,35,42,.1);color:${RED};border:1px solid rgba(232,35,42,.2)}

/* ── TEAM / TRUST SECTION ── */
.about-trust{padding:80px 0;background:${OFFWHITE}}
.about-trust-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:48px}
.about-trust-item{
  background:#fff;border-radius:16px;padding:24px 28px;
  display:flex;align-items:flex-start;gap:16px;
  border:1.5px solid ${BORDER};transition:all .3s;
}
.about-trust-item:hover{border-color:rgba(232,35,42,.2);box-shadow:0 8px 24px rgba(0,0,0,.06);transform:translateY(-2px)}
.about-trust-ico{width:48px;height:48px;border-radius:12px;background:rgba(232,35,42,.08);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0}
.about-trust-title{font-family:'Montserrat',sans-serif;font-size:.95rem;font-weight:900;color:${DARK};margin-bottom:6px}
.about-trust-desc{font-size:.84rem;color:${MID};line-height:1.6}

/* ── CTA SECTION ── */
.about-cta{
  padding:80px 5%;
  background:linear-gradient(135deg,${DARK} 0%,#1a2535 100%);
  text-align:center;position:relative;overflow:hidden;
}
.about-cta::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(232,35,42,.08),transparent 65%);
  pointer-events:none;
}
.about-cta-h2{
  font-family:'Montserrat',sans-serif;font-weight:900;
  font-size:clamp(1.8rem,3.5vw,2.8rem);
  color:${WHITE};letter-spacing:-.03em;line-height:1.1;
  margin-bottom:16px;position:relative;z-index:2;
}
.about-cta-h2 .hl-red{color:${RED}}
.about-cta-sub{
  font-size:.96rem;color:rgba(255,255,255,.65);line-height:1.7;
  max-width:480px;margin:0 auto 36px;position:relative;z-index:2;
}
.about-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative;z-index:2}
.btn-red{
  background:linear-gradient(135deg,${RED},${RED2});
  color:${WHITE};padding:14px 32px;border-radius:8px;
  font-weight:900;font-size:.95rem;text-decoration:none;
  box-shadow:0 6px 24px ${RED_GLOW};
  transition:all .25s;display:inline-flex;align-items:center;gap:8px;
  border:none;cursor:pointer;font-family:'Nunito',sans-serif;
}
.btn-red:hover{transform:translateY(-3px);box-shadow:0 12px 36px ${RED_GLOW};filter:brightness(1.1)}
.btn-ghost-w{
  background:transparent;color:rgba(255,255,255,.9);
  padding:14px 28px;border-radius:8px;
  font-weight:800;font-size:.95rem;text-decoration:none;
  border:1.5px solid rgba(255,255,255,.4);
  transition:all .25s;display:inline-flex;align-items:center;gap:8px;
  cursor:pointer;font-family:'Nunito',sans-serif;
}
.btn-ghost-w:hover{border-color:${RED};color:${RED}}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .about-brands-grid{grid-template-columns:1fr}
  .about-stats-grid{grid-template-columns:repeat(2,1fr)}
  .about-values-grid{grid-template-columns:1fr 1fr}
  .about-why-inner,.about-story-inner{grid-template-columns:1fr;gap:32px}
  .about-why-img{display:none}
  .about-story-img-wrap{max-width:480px;margin:0 auto}
}
@media(max-width:600px){
  .about-hero{padding:100px 5% 60px}
  .about-values-grid{grid-template-columns:1fr}
  .about-stats-grid{grid-template-columns:repeat(2,1fr)}
  .about-trust-grid{grid-template-columns:1fr}
  .about-cta-btns{flex-direction:column;align-items:stretch}
  .about-cta-btns .btn-red,.about-cta-btns .btn-ghost-w{width:100%;justify-content:center}
}
`;

const features = [
    {
        ico: "ShieldCheck",
        title: "Fully Insured & Certified",
        desc: "Every team member is police-cleared, fully insured, and pest-certified — your property is protected.",
    },
    {
        ico: "RefreshCw",
        title: "Satisfaction Guarantee",
        desc: "Not happy? We return and re-clean or re-treat at absolutely no extra charge.",
    },
    {
        ico: "Award",
        title: "100% Bond Back Guarantee",
        desc: "We're so confident in our work that we guarantee your bond back — or we re-clean for free.",
    },
    {
        ico: "Leaf",
        title: "Eco-Friendly Products",
        desc: "We use hospital-grade, environmentally safe cleaning solutions that are gentle on your family and pets.",
    },
];

const values = [
    {
        ico: "Heart",
        title: "Family-Owned & Community-Focused",
        desc: "We're not a franchise. We're your neighbours — a local Toowoomba family who genuinely cares about the community we serve.",
    },
    {
        ico: "Star",
        title: "Quality Without Compromise",
        desc: "We never cut corners. Every clean and every treatment is delivered to the highest professional standard, every single time.",
    },
    {
        ico: "Handshake",
        title: "Honest & Transparent",
        desc: "No hidden fees, no confusing contracts. Just a clear quote, reliable service, and results you can see.",
    },
    {
        ico: "Zap",
        title: "Fast & Responsive",
        desc: "We respond to all enquiries within 1 hour during business hours. Your time matters to us.",
    },
    {
        ico: "Microscope",
        title: "Trained Professionals",
        desc: "All our cleaners and pest technicians undergo ongoing training to stay up-to-date with the latest industry techniques.",
    },
    {
        ico: "MapPin",
        title: "Proudly Local",
        desc: "Based in North Toowoomba, we know our community. Our team lives and works right here in the Darling Downs.",
    },
];

const stats = [
    { num: "2017", label: "Founded", clr: "clr-blue" },
    { num: "500+", label: "Happy Clients", clr: "clr-red" },
    { num: "4.9", label: "Average Rating", clr: "clr-blue" },
    { num: "100%", label: "Bond Back Rate", clr: "clr-red" },
];

const trustItems = [
    {
        ico: "GraduationCap",
        title: "Police Cleared Staff",
        desc: "Every cleaner and technician passes a thorough background check before joining our team.",
    },
    {
        ico: "FileCheck",
        title: "Fully Licensed & Insured",
        desc: "Public liability insurance and all required pest control licences — your property and people are covered.",
    },
    {
        ico: "Home",
        title: "Bond Back Expertise",
        desc: "We know exactly what property managers inspect. We clean to their standards — and back it with a guarantee.",
    },
    {
        ico: "Bug",
        title: "Licensed Pest Technicians",
        desc: "Rest In Pest technicians hold current QLD pest control licences and use only approved, registered products.",
    },
];

export default function About() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const BASE_URL = "https://www.ilovahcleaningservices.com.au";

        document.title = "About iLovah Cleaning & Rest In Pest | Toowoomba's Trusted Cleaning Experts";
        const setMeta = (name, content, attr = "name") => {
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
            el.setAttribute("content", content);
        };
        const setLink = (rel, href) => {
            let el = document.querySelector(`link[rel="${rel}"]`);
            if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
            el.setAttribute("href", href);
        };
        setMeta("description", "Learn about iLovah Cleaning Services and Rest In Pest Control — Toowoomba's family-owned, fully insured cleaning and pest control team. Founded 2017, bond-back guaranteed.");
        setMeta("robots", "index, follow");
        setMeta("og:title", "About iLovah Cleaning & Rest In Pest | Toowoomba", "property");
        setMeta("og:description", "Family-owned, police-cleared, fully insured. Proudly serving Toowoomba and surrounds since 2017.", "property");
        setMeta("og:type", "website", "property");
        setMeta("og:url", `${BASE_URL}/about`, "property");
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", "About iLovah Cleaning & Rest In Pest | Toowoomba");
        setMeta("twitter:description", "Family-owned, fully insured cleaning and pest control team serving Toowoomba since 2017.");

        setLink("canonical", `${BASE_URL}/about`);

        const existing = document.getElementById("about-jsonld-main");
        if (existing) existing.remove();
        const script = document.createElement("script");
        script.id = "about-jsonld-main";
        script.type = "application/ld+json";
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "@id": `${BASE_URL}/about#breadcrumb`,
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
                        { "@type": "ListItem", "position": 2, "name": "About", "item": `${BASE_URL}/about` }
                    ]
                },
                {
                    "@type": "AboutPage",
                    "@id": `${BASE_URL}/about#webpage`,
                    "url": `${BASE_URL}/about`,
                    "name": "About iLovah Cleaning & Rest In Pest",
                    "isPartOf": { "@id": `${BASE_URL}/#website` },
                    "about": { "@id": `${BASE_URL}/#business` },
                    "description": "Family-owned, fully insured cleaning and pest control team serving Toowoomba and surrounds since 2017.",
                    "inLanguage": "en-AU"
                }
            ]
        });
        document.head.appendChild(script);

        return () => { const s = document.getElementById("about-jsonld-main"); if (s) s.remove(); };
    }, []);

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
            <style>{CSS}</style>
            <NavBar />
            <main>
                {/* ── HERO ── */}
                <section className="about-hero" aria-label="About iLovah Cleaning Services">
                    <div className="about-hero-eyebrow">
                        <span className="about-hero-eyebrow-dot" />
                        About Us
                    </div>
                    <h1 className="about-hero-h1">
                        Toowoomba's <span className="hl-red">Trusted</span> Cleaning<br />& Pest Control Team
                    </h1>
                    <p className="about-hero-sub">
                        Family-owned, fully insured, and proud to serve Toowoomba and surrounds since 2017. Two brands, one mission — cleaner, healthier, pest-free spaces.
                    </p>
                    <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
                        <button className="btn-red" onClick={() => navigate("/")}>
                            <Sparkles size={14} strokeWidth={2} aria-hidden="true" /> Get a Free Quote
                        </button>
                        <button className="btn-ghost-w" onClick={() => navigate("/")}>
                            View Our Services
                        </button>
                    </div>
                    <div className="about-hero-bottom-bar" aria-hidden="true" />
                </section>

                {/* ── STATS ── */}
                <section className="about-stats" aria-label="Company statistics">
                    <div className="il-wrap">
                        <div style={{ textAlign: "center", marginBottom: 0 }}>
                            <div className="sec-tag-blue" style={{ display: "inline-block" }}>By the Numbers</div>
                            <h2 className="sec-h2" style={{ textAlign: "center" }}>Our <span className="hl-red">Track Record</span></h2>
                        </div>
                        <div className="about-stats-grid">
                            {stats.map((s, i) => (
                                <div key={i} className="about-stat-card">
                                    <div className={`about-stat-num ${s.clr}`}>{s.num}</div>
                                    <div className="about-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHY US / ABOUT ── */}
                <section className="about-why" id="why-us" aria-label="Why choose iLovah">
                    <div className="il-wrap">
                        <div className="about-why-inner">
                            <div className="about-why-img">
                                <img
                                    src={imgHappy}
                                    alt="Happy iLovah client after professional cleaning service in Toowoomba QLD"
                                    loading="lazy"
                                    style={{ width: "100%", height: "auto", display: "block", borderRadius: 20 }}
                                />
                                <div className="about-why-badge">
                                    <div className="about-why-badge-icon"><Award size={24} strokeWidth={2} aria-hidden="true" /></div>
                                    <div>
                                        <strong>100% Bond Back Guarantee</strong>
                                        <span>Or we re-clean for free</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="sec-tag-blue">Why iLovah & Rest In Pest</div>
                                <h2 className="sec-h2">We go beyond clean — <span className="hl-red">we restore</span> comfort</h2>
                                <p style={{ color: MID, fontSize: ".96rem", lineHeight: 1.7, marginBottom: 28 }}>
                                    Founded in 2017, iLovah has been helping families and professionals in Toowoomba &amp; surrounds reclaim their time and live in cleaner, healthier, pest-free spaces. Every cleaner and technician is background-checked, trained, and insured.
                                </p>
                                <div>
                                    {features.map((f, i) => (
                                        <div key={i} className="about-feature">
                                            <div className="about-feat-ico"><Ico name={f.ico} size={20} /></div>
                                            <div>
                                                <div className="about-feat-title">{f.title}</div>
                                                <div className="about-feat-desc">{f.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── OUR STORY ── */}
                <section className="about-story" aria-label="Our story">
                    <div className="il-wrap">
                        <div className="about-story-inner">
                            <div>
                                <div className="sec-tag-blue">Our Story</div>
                                <h2 className="sec-h2">A passion for <span className="hl-red">clean homes</span> & safe spaces</h2>
                                <p style={{ color: MID, fontSize: ".96rem", lineHeight: 1.8, marginBottom: 20 }}>
                                    iLovah Cleaning Services was born out of a simple belief: every family deserves to come home to a space that's clean, fresh, and safe. What started as a small local operation has grown into one of Toowoomba's most trusted names in professional cleaning.
                                </p>
                                <p style={{ color: MID, fontSize: ".96rem", lineHeight: 1.8, marginBottom: 20 }}>
                                    When our clients started asking about pest control, we knew we had to do it right. That's how <strong style={{ color: DARK }}>Rest In Pest Control</strong> was born — a sister brand with the same commitment to quality, fully licensed, and just as passionate about protecting your home.
                                </p>
                                <p style={{ color: MID, fontSize: ".96rem", lineHeight: 1.8 }}>
                                    Today, we proudly serve homeowners, property investors, real estate agents, clinics, and businesses across Toowoomba and the wider Darling Downs region.
                                </p>
                            </div>
                            <div className="about-story-img-wrap">
                                <img
                                    src={imgHappy}
                                    alt="iLovah Cleaning Services team serving Toowoomba QLD"
                                    loading="lazy"
                                    style={{ width: "100%", height: "auto", display: "block" }}
                                />
                                <div className="about-story-year-badge">
                                    <span>Est.</span>
                                    2017
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── VALUES ── */}
                <section className="about-values" aria-label="Our values">
                    <div className="il-wrap">
                        <div style={{ textAlign: "center" }}>
                            <div className="sec-tag-red" style={{ display: "inline-block" }}>Our Values</div>
                            <h2 className="sec-h2" style={{ textAlign: "center", color: WHITE }}>What <span className="hl-red">drives</span> us every day</h2>
                            <p className="sec-sub" style={{ color: "rgba(255,255,255,.55)", margin: "0 auto 0" }}>These aren't just words on a wall — they're the principles behind every job we do.</p>
                        </div>
                        <div className="about-values-grid">
                            {values.map((v, i) => (
                                <div key={i} className="about-value-card">
                                    <div className="about-value-ico"><Ico name={v.ico} size={24} /></div>
                                    <div className="about-value-title">{v.title}</div>
                                    <div className="about-value-desc">{v.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── TWO BRANDS ── */}
                <section className="about-brands" aria-label="Our two brands">
                    <div className="il-wrap">
                        <div style={{ textAlign: "center" }}>
                            <div className="sec-tag-blue" style={{ display: "inline-block" }}>Two Brands, One Team</div>
                            <h2 className="sec-h2" style={{ textAlign: "center" }}>Meet the <span className="hl-red">family</span></h2>
                            <p className="sec-sub" style={{ margin: "0 auto 0" }}>Two specialist brands under one roof — so you get the best of both worlds.</p>
                        </div>
                        <div className="about-brands-grid">
                            {/* iLovah */}
                            <div className="about-brand-card">
                                <div className="about-brand-card-header blue-bg">
                                    <img src={ilovahLogoSrc} alt="iLovah Cleaning Services logo" width={52} height={52} style={{ borderRadius: 10, objectFit: "contain" }} />
                                    <div className="about-brand-logo-text">
                                        <div className="about-brand-name"><span className="lr">i</span><span className="lw">Lovah</span></div>
                                        <div className="about-brand-sub">Cleaning Services</div>
                                    </div>
                                </div>
                                <div className="about-brand-card-body">
                                    <p className="about-brand-desc">
                                        Your full-service professional cleaning team. From bond cleans and carpet cleaning to window washing and pressure cleaning — we handle it all, backed by our bond-back guarantee.
                                    </p>
                                    <div className="about-brand-pills">
                                        {["Bond Cleaning", "Carpet Cleaning", "Window Cleaning", "Gutter Cleaning", "Pressure Washing", "Pram Cleaning", "General House Clean"].map(s => (
                                            <span key={s} className="about-brand-pill blue">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Rest In Pest */}
                            <div className="about-brand-card">
                                <div className="about-brand-card-header red-bg">
                                    <img src={imgLogo2} alt="Rest In Pest Control logo" width={52} height={52} style={{ borderRadius: 10, objectFit: "contain" }} />
                                    <div className="about-brand-logo-text">
                                        <div className="about-brand-rip-name"><span className="rr">REST IN </span>PEST</div>
                                        <div className="about-brand-rip-sub">Pest Control</div>
                                    </div>
                                </div>
                                <div className="about-brand-card-body">
                                    <p className="about-brand-desc">
                                        Licensed, registered, and ready to protect your home or business. Our pest technicians are QLD-certified and use only approved, safe treatments to eliminate infestations and prevent their return.
                                    </p>
                                    <div className="about-brand-pills">
                                        {["Cockroach Control", "Ant Treatments", "Spider Control", "Rodent Control", "Flea Treatments", "General Pest Control"].map(s => (
                                            <span key={s} className="about-brand-pill red">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── TRUST & CREDENTIALS ── */}
                <section className="about-trust" aria-label="Trust and credentials">
                    <div className="il-wrap">
                        <div style={{ textAlign: "center" }}>
                            <div className="sec-tag-blue" style={{ display: "inline-block" }}>Why Trust Us</div>
                            <h2 className="sec-h2" style={{ textAlign: "center" }}>Your <span className="hl-red">peace of mind</span> is our priority</h2>
                            <p className="sec-sub" style={{ margin: "0 auto 0" }}>We take the responsibility of entering your home seriously — here's how we earn your trust.</p>
                        </div>
                        <div className="about-trust-grid">
                            {trustItems.map((t, i) => (
                                <div key={i} className="about-trust-item">
                                    <div className="about-trust-ico"><Ico name={t.ico} size={22} /></div>
                                    <div>
                                        <div className="about-trust-title">{t.title}</div>
                                        <div className="about-trust-desc">{t.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="about-cta" aria-label="Get a free quote">
                    <h2 className="about-cta-h2">Ready to experience the <span className="hl-red">iLovah difference</span>?</h2>
                    <p className="about-cta-sub">Get a free, no-obligation quote within 1 hour. Serving Toowoomba and surrounds, Mon–Sat 7am–6pm.</p>
                    <div className="about-cta-btns">
                        <button className="btn-red" onClick={() => navigate("/")}><Sparkles size={14} strokeWidth={2} aria-hidden="true" /> Get Instant Quote</button>
                        <a href="tel:0478711829" className="btn-ghost-w"><Phone size={14} strokeWidth={2} aria-hidden="true" /> Call 0478 711 829</a>
                    </div>
                </section>
            </main>
            <PageFooter />
        </div>
    );
}