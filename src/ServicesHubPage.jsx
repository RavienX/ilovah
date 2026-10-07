import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import PageFooter from "./PageFooter";
import imgCarpet from "./assets/carpet cleaning.jpg";
import imgEndOfLease from "./assets/end of lease cleaning.jpg";
import imgGutter from "./assets/glutter cleaning.jpg";
import imgWindow from "./assets/window cleaning.jpg";
import imgPram from "./assets/pram cleaning.jpg";
import imgPest from "./assets/pest control.jpg";
import imgPressure from "./assets/pressure washing.jpg";
import imgGeneral from "./assets/general house clean.jpg";

// ── Design tokens ─────────────────────────────────────────────────────────────
const RED = "#2B8FD4";
const RED_DK = "#1a6fa8";
const BLUE2 = "#4AABDB";
const DARK = "#111827";
const OFFWHITE = "#f7f8fa";
const MID = "#6b7280";
const BORDER = "#e8eaed";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{font-family:'Nunito',sans-serif;background:#fff;color:${DARK};overflow-x:hidden}

.svc-hub-hero{background:${DARK};padding:140px 5% 70px;text-align:center;position:relative;overflow:hidden}
.svc-hub-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(43,143,212,.09),transparent 65%);pointer-events:none}
.svc-hub-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:50px;margin-bottom:20px;font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;background:rgba(43,143,212,.12);border:1px solid rgba(43,143,212,.3);color:${RED};position:relative;z-index:2}
.svc-hub-dot{width:7px;height:7px;border-radius:50%;background:${RED};animation:svcDotPulse 2s infinite}
@keyframes svcDotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.3}}
.svc-hub-hero h1{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(2.1rem,4.5vw,3.4rem);line-height:1.08;letter-spacing:-0.03em;color:#fff;margin-bottom:16px;position:relative;z-index:2}
.svc-hub-hero h1 .hl-red{color:${RED}}
.svc-hub-hero p{font-size:1rem;color:rgba(255,255,255,.65);line-height:1.7;max-width:560px;margin:0 auto;position:relative;z-index:2}
.svc-hub-bar{position:absolute;bottom:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#2B8FD4 0%,${BLUE2} 50%,${RED} 50%,#4AABDB 100%)}

.svc-hub-wrap{max-width:1200px;margin:0 auto;padding:0 5%}
.svc-hub-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-top:48px}
.svc-hub-card{background:#fff;border:1.5px solid ${BORDER};border-radius:18px;overflow:hidden;text-decoration:none;color:${DARK};display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s,border-color .25s}
.svc-hub-card:hover{transform:translateY(-5px);box-shadow:0 20px 48px rgba(0,0,0,.1);border-color:rgba(43,143,212,.3)}
.svc-hub-img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block}
.svc-hub-body{padding:22px 22px 24px}
.svc-hub-title{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.05rem;margin-bottom:8px;letter-spacing:-.01em}
.svc-hub-desc{font-size:.85rem;color:${MID};line-height:1.6;margin-bottom:16px}
.svc-hub-meta{display:flex;align-items:center;justify-content:space-between;font-size:.78rem;font-weight:800}
.svc-hub-arrow{color:${BLUE2};font-weight:900}

.svc-hub-cta-band{background:${DARK};padding:64px 5%;text-align:center;position:relative;overflow:hidden}
.svc-hub-cta-band::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(43,143,212,.12),transparent 70%)}
.svc-hub-cta-band h2{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(1.6rem,3vw,2.4rem);color:#fff;margin-bottom:14px;position:relative;z-index:1}
.svc-hub-cta-band p{color:rgba(255,255,255,.65);font-size:.95rem;max-width:480px;margin:0 auto 26px;position:relative;z-index:1}
.svc-hub-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
.btn-red-hub{background:${RED};color:#fff;border:none;padding:14px 30px;border-radius:9px;font-family:'Nunito',sans-serif;font-weight:900;font-size:.95rem;cursor:pointer;transition:background .2s}
.btn-red-hub:hover{background:${RED_DK}}
.btn-ghost-hub{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.3);padding:14px 30px;border-radius:9px;font-family:'Nunito',sans-serif;font-weight:900;font-size:.95rem;text-decoration:none;display:inline-flex;align-items:center;transition:border-color .2s}
.btn-ghost-hub:hover{border-color:${RED}}

@media(max-width:600px){.svc-hub-hero{padding:100px 5% 48px}}
`;

const SERVICES = [
    { slug: "/end-of-lease-cleaning", title: "End of Lease Cleaning", desc: "Bond-back guaranteed clean following real estate agent checklists exactly.", img: imgEndOfLease, alt: "End of lease bond cleaning Toowoomba" },
    { slug: "/carpet-cleaning", title: "Dry Carpet Cleaning", desc: "Lift stains, allergens, and odours — dry and walkable in 1–2 hours.", img: imgCarpet, alt: "Dry carpet cleaning Toowoomba" },
    { slug: "/general-house-cleaning", title: "General House Cleaning", desc: "Weekly, fortnightly, or monthly maintenance cleans for every room.", img: imgGeneral, alt: "General house cleaning Toowoomba" },
    { slug: "/window-cleaning", title: "Window Cleaning", desc: "Streak-free internal and external window cleaning for homes and businesses.", img: imgWindow, alt: "Window cleaning Toowoomba" },
    { slug: "/gutter-cleaning", title: "Gutter Cleaning", desc: "Safe, thorough gutter clearing to protect your roof from water damage.", img: imgGutter, alt: "Gutter cleaning Toowoomba" },
    { slug: "/pressure-washing", title: "Pressure Washing", desc: "High-pressure cleaning for driveways, decks, fences, and exteriors.", img: imgPressure, alt: "Pressure washing Toowoomba" },
    { slug: "/pest-control", title: "Pest Control", desc: "Licensed pest treatment for cockroaches, ants, spiders, rodents, and more.", img: imgPest, alt: "Pest control service Toowoomba" },
    { slug: "/pram-cleaning", title: "Pram Cleaning", desc: "Deep sanitising of prams and strollers for a safe, hygienic result.", img: imgPram, alt: "Pram cleaning Toowoomba" },
];

export default function ServicesHubPage() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const BASE_URL = "https://www.ilovahcleaningservices.com.au";

        document.title = "Cleaning & Pest Control Services Toowoomba | iLovah";
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

        setMeta("description", "All cleaning and pest control services from iLovah in Toowoomba — bond cleaning, carpet cleaning, window cleaning, gutter cleaning, pressure washing, pest control & more.");
        setMeta("keywords", "cleaning services Toowoomba, pest control Toowoomba, house cleaning services Toowoomba QLD, iLovah cleaning services");
        setMeta("robots", "index, follow");
        setMeta("og:type", "website", "property");
        setMeta("og:title", "Cleaning & Pest Control Services Toowoomba | iLovah", "property");
        setMeta("og:description", "Bond cleaning, carpet cleaning, window cleaning, gutter cleaning, pressure washing, pest control, and more — all in Toowoomba QLD.", "property");
        setMeta("og:url", `${BASE_URL}/services`, "property");
        setMeta("og:site_name", "iLovah Cleaning Services", "property");
        setMeta("og:locale", "en_AU", "property");
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", "Cleaning & Pest Control Services Toowoomba | iLovah");

        setLink("canonical", `${BASE_URL}/services`);

        const existing = document.getElementById("services-hub-jsonld");
        if (existing) existing.remove();
        const script = document.createElement("script");
        script.id = "services-hub-jsonld";
        script.type = "application/ld+json";
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "@id": `${BASE_URL}/services#breadcrumb`,
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
                        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` }
                    ]
                },
                {
                    "@type": "CollectionPage",
                    "@id": `${BASE_URL}/services#webpage`,
                    "url": `${BASE_URL}/services`,
                    "name": "Cleaning & Pest Control Services Toowoomba",
                    "description": "Full list of cleaning and pest control services offered by iLovah in Toowoomba QLD.",
                    "isPartOf": { "@id": `${BASE_URL}/#website` },
                    "inLanguage": "en-AU"
                },
                {
                    "@type": "ItemList",
                    "@id": `${BASE_URL}/services#itemlist`,
                    "itemListElement": SERVICES.map((s, i) => ({
                        "@type": "ListItem",
                        "position": i + 1,
                        "item": {
                            "@type": "Service",
                            "name": s.title,
                            "url": `${BASE_URL}${s.slug}`,
                            "provider": { "@id": `${BASE_URL}/#business` },
                            "areaServed": { "@type": "City", "name": "Toowoomba" }
                        }
                    }))
                }
            ]
        });
        document.head.appendChild(script);

        return () => { const s = document.getElementById("services-hub-jsonld"); if (s) s.remove(); };
    }, []);

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
            <style>{CSS}</style>
            <NavBar />
            <main>
                <section className="svc-hub-hero" aria-label="All cleaning and pest control services in Toowoomba">
                    <div className="svc-hub-eyebrow">
                        <span className="svc-hub-dot" />
                        Toowoomba's Trusted Local Team
                    </div>
                    <h1>
                        Cleaning &amp; Pest Control<br /><span className="hl-red">Services</span> in Toowoomba
                    </h1>
                    <p>
                        From bond cleans to pest-free homes — explore everything iLovah Cleaning Services and Rest In Pest offer across Toowoomba and surrounding QLD suburbs.
                    </p>
                    <div className="svc-hub-bar" />
                </section>

                <section style={{ padding: "70px 5% 90px", background: OFFWHITE }} aria-label="Service list">
                    <div className="svc-hub-wrap">
                        <div className="svc-hub-grid">
                            {SERVICES.map((s, i) => (
                                <a key={i} href={s.slug} className="svc-hub-card" onClick={e => { e.preventDefault(); navigate(s.slug); }} aria-label={`${s.title} in Toowoomba — learn more`}>
                                    <img src={s.img} alt={s.alt} className="svc-hub-img" loading="lazy" />
                                    <div className="svc-hub-body">
                                        <div className="svc-hub-title">{s.title}</div>
                                        <div className="svc-hub-desc">{s.desc}</div>
                                        <div className="svc-hub-meta"><span className="svc-hub-arrow">Learn more →</span></div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="svc-hub-cta-band" aria-label="Get a free quote">
                    <h2>Not sure which service you need?</h2>
                    <p>Call us or request a free quote and we'll recommend the right service for your Toowoomba home or business.</p>
                    <div className="svc-hub-cta-btns">
                        <a href="tel:0478711829" className="btn-red-hub" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>Call 0478 711 829</a>
                        <a href="/faq" className="btn-ghost-hub">Read our FAQ</a>
                    </div>
                </section>
            </main>
            <PageFooter />
        </div>
    );
}