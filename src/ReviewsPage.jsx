import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import NavBar from "./NavBar";
import PageFooter from "./PageFooter";

// ── Design tokens ─────────────────────────────────────────────────────────────
const RED = "#E8232A";
const RED_DK = "#b01018";
const BLUE2 = "#4AABDB";
const DARK = "#111827";
const WHITE = "#ffffff";
const GOLD = "#FFB800";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Nunito:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{
  font-family:'Nunito',sans-serif;
  background:#111827;color:#fff;overflow-x:hidden;
}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#1a2535}
::-webkit-scrollbar-thumb{background:#ff4e55;border-radius:3px}

/* ── HERO ── */
.reviews-hero{
  background:${DARK};padding:140px 5% 64px;
  text-align:center;position:relative;overflow:hidden;
}
.reviews-hero::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 50% 50% at 30% 50%,rgba(232,35,42,0.08),transparent 65%),
    radial-gradient(ellipse 50% 50% at 70% 50%,rgba(43,143,212,0.08),transparent 65%);
  pointer-events:none;
}
.reviews-hero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 16px;border-radius:50px;margin-bottom:20px;
  font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;
  background:rgba(255,184,0,0.12);border:1px solid rgba(255,184,0,0.3);color:${GOLD};
  position:relative;z-index:2;
}
.reviews-hero-dot{width:7px;height:7px;border-radius:50%;background:${GOLD};animation:dotPulse 2s infinite}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.3}}
.reviews-hero h1{
  font-family:'Montserrat',sans-serif;font-weight:900;
  font-size:clamp(2rem,4vw,3.2rem);line-height:1.08;
  letter-spacing:-0.03em;color:#fff;margin-bottom:16px;
  position:relative;z-index:2;
}
.reviews-hero h1 .hl-red{color:${RED}}
.reviews-hero p{
  font-size:.96rem;color:rgba(255,255,255,.65);line-height:1.7;
  max-width:500px;margin:0 auto;position:relative;z-index:2;
}
.reviews-hero-bar{
  position:absolute;bottom:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,#2B8FD4 0%,${BLUE2} 50%,${RED} 50%,#ff4e55 100%);
}

/* ── REVIEWS SECTION ── */
.il-reviews-section{padding:80px 0;background:${DARK};position:relative;overflow:hidden}
.il-reviews-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(232,35,42,.06),transparent 65%)}
.il-rev-card{
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
  border-radius:20px;padding:36px 32px;max-width:680px;margin:48px auto 0;
  position:relative;z-index:1;
}
.il-rev-source{display:inline-block;font-size:.62rem;font-weight:900;padding:3px 10px;border-radius:4px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;background:rgba(43,143,212,.15);color:${BLUE2};border:1px solid rgba(43,143,212,.2)}
.il-rev-stars{color:${GOLD};margin-bottom:16px}
.il-rev-text{font-size:.95rem;color:rgba(255,255,255,.75);line-height:1.75;font-style:italic;margin-bottom:22px}
.il-reviewer{display:flex;align-items:center;gap:12px}
.il-rev-avatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:.84rem;color:#fff;flex-shrink:0}
.il-rev-name{font-weight:800;font-size:.9rem;color:#fff;font-family:'Montserrat',sans-serif}
.il-rev-loc{font-size:.72rem;color:rgba(255,255,255,.35)}
.il-rev-service{font-size:.72rem;color:${BLUE2};font-weight:700;margin-top:3px}
.il-rev-date{font-size:.7rem;color:rgba(255,255,255,.25);margin-top:2px}
.il-rev-dots{display:flex;gap:8px;justify-content:center;margin-top:24px}
.il-rev-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2);border:none;cursor:pointer;transition:all .2s;padding:0}
.il-rev-dot.active{background:${RED};transform:scale(1.2)}
.il-rev-nav{display:flex;gap:10px;justify-content:center;margin-top:14px}
.il-rev-btn{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.15);border-radius:8px;width:36px;height:36px;cursor:pointer;font-size:.9rem;color:rgba(255,255,255,.6);transition:all .2s;display:flex;align-items:center;justify-content:center}
.il-rev-btn:hover{border-color:${RED};color:${RED};background:rgba(232,35,42,.1)}
.il-wrap{max-width:1200px;margin:0 auto;padding:0 5%}
.sec-tag-blue{
  display:inline-block;font-size:.7rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;
  color:${BLUE2};background:rgba(74,171,219,0.1);padding:6px 16px;border-radius:6px;margin-bottom:18px;
  border:1px solid rgba(74,171,219,0.2);
}
.sec-h2{
  font-family:'Montserrat',sans-serif;font-weight:900;
  font-size:clamp(2rem,3.5vw,3rem);line-height:1.1;
  color:${DARK};margin-bottom:18px;letter-spacing:-0.02em;
}
.sec-h2 .hl-red{color:${RED}}
@media(max-width:600px){.reviews-hero{padding:100px 5% 48px}}
`;

const REVIEWS_DATA = [
    { text: '"Great value for money and very professional service. The team was efficient and thorough, and the follow-up support has been excellent. Would definitely recommend!"', name: "Ben Miller", loc: "Toowoomba, QLD", initials: "B", color: "#2d8a4e", service: "Cleaning Service", date: "2 days ago", source: "Google", isNew: true, ownerReply: "Hi Ben, thank you so much for your kind words! We're thrilled to hear you had a great experience with us. Your recommendation means the world to our team. We look forward to serving you again! — iLovah Cleaning Services" },
    { text: '"Francis was able to help me out on short notice and he did such a thorough cleaning job for me. The best cleaner I\'ve come across in a long time and I will be recommending him to others."', name: "Renya S.", loc: "Amiens, QLD", initials: "RS", color: "#6b7280", service: "One Off Cleaning", date: "23 May 2024", source: "Hipages" },
    { text: '"Francis was really good, punctual, reliable and effective. I would recommend Francis for a good house and carpets cleaning."', name: "Pratibha", loc: "Toowoomba, QLD", initials: "P", color: "#2563eb", service: "End of Lease Cleaning", date: "27 Jul 2024", source: "Oneflare" },
    { text: '"Had a serious cockroach problem for months. Rest In Pest sorted it in one visit — haven\'t seen a single one since. Fast, professional, and affordable."', name: "David K.", loc: "Toowoomba, QLD", initials: "DK", color: RED_DK, service: "Pest Treatment", date: "14 Sep 2024", source: "Google" },
    { text: '"Friendly and expert clean."', name: "Tiffany H.", loc: "South Toowoomba, QLD", initials: "TH", color: "#6b7280", service: "House Cleaning", date: "22 May 2024", source: "Hipages" },
    { text: '"Prompt and professional Service. Would definitely recommend."', name: "Leanna T.", loc: "Wilsonton, QLD", initials: "LT", color: "#7c3aed", service: "Rental Bond Cleaning", date: "5 May 2024", source: "Hipages" },
    { text: '"Francis and his crew did an amazing job. Didn\'t think the house could get that clean. Great communication and very punctual and a very good price."', name: "Daniel B.", loc: "Meringandan West, QLD", initials: "DB", color: "#ea580c", service: "House Cleaning", date: "16 Aug 2024", source: "Hipages" },
    { text: '"Francis and the whole team are amazing! This is an extremely professional, efficient and pleasant team. Their prices are very fair, especially considering the quality and speed of their work. Hiring strangers to come into your home can be awkward, but this team are so pleasant and professional, we always feel safe and comfortable with them in the house. I highly recommend giving them a call, they\'ll have your home spotless in no time."', name: "Luke Cosgrove", loc: "Toowoomba, QLD", initials: "LC", color: "#1a73e8", service: "House Cleaning", date: "3 weeks ago", source: "Google", ownerReply: "Hi Luke, wow — thank you so much! We're so glad you feel comfortable and trust our team in your home. Comments like yours keep us motivated every single day. See you next time! — iLovah Cleaning Services" },
];

function ReviewsCarousel() {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);
    const next = () => setCurrent(c => (c + 1) % REVIEWS_DATA.length);
    const prev = () => setCurrent(c => (c - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);

    useEffect(() => {
        timerRef.current = setInterval(next, 5500);
        return () => clearInterval(timerRef.current);
    }, []);

    const r = REVIEWS_DATA[current];

    return (
        <div style={{ position: "relative", zIndex: 1 }}>
            <div className="il-rev-card" key={current}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <div className="il-rev-source">{r.source}</div>
                    {r.isNew && <span style={{ fontSize: ".62rem", fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase", border: "1.5px solid #333", borderRadius: 4, padding: "2px 8px", color: "#333" }}>NEW</span>}
                </div>
                <div className="il-rev-stars">
                    <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} strokeWidth={2} fill={GOLD} color={GOLD} aria-hidden="true" />)}
                    </span>
                </div>
                <p className="il-rev-text">{r.text}</p>
                <div className="il-reviewer">
                    <div className="il-rev-avatar" style={{ background: r.color }}>{r.initials}</div>
                    <div>
                        <div className="il-rev-name">{r.name}</div>
                        <div className="il-rev-loc">{r.loc}</div>
                        <div className="il-rev-service">{r.service}</div>
                        <div className="il-rev-date">{r.date}</div>
                    </div>
                </div>
                {r.ownerReply && (
                    <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(255,255,255,0.06)", borderRadius: 10, borderLeft: `3px solid ${RED}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <div style={{ width: 26, height: 26, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".65rem", fontWeight: 900, color: "#fff", flexShrink: 0 }}>iL</div>
                            <div>
                                <div style={{ fontSize: ".78rem", fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>iLovah Cleaning Services</div>
                                <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.4)", fontWeight: 600 }}>Owner · 5 hours ago</div>
                            </div>
                        </div>
                        <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.65)", lineHeight: 1.6, margin: 0 }}>{r.ownerReply}</p>
                    </div>
                )}
            </div>
            <div className="il-rev-dots">
                {REVIEWS_DATA.map((_, i) => (
                    <button key={i} className={`il-rev-dot${i === current ? " active" : ""}`} onClick={() => setCurrent(i)} aria-label={`Review by ${REVIEWS_DATA[i].name}`} />
                ))}
            </div>
            <div className="il-rev-nav">
                <button className="il-rev-btn" onClick={prev} aria-label="Previous review">←</button>
                <button className="il-rev-btn" onClick={next} aria-label="Next review">→</button>
            </div>
        </div>
    );
}

export default function ReviewsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
        const BASE_URL = "https://www.ilovahcleaningservices.com.au";

        document.title = "Customer Reviews | iLovah Cleaning & Rest In Pest – Toowoomba";
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
        setMeta("description", "See what Toowoomba locals say about iLovah Cleaning Services and Rest In Pest Control. Real reviews from Google, Hipages, and Oneflare.");
        setMeta("robots", "index, follow");
        setMeta("og:title", "Customer Reviews | iLovah Cleaning & Rest In Pest", "property");
        setMeta("og:type", "website", "property");
        setMeta("og:url", `${BASE_URL}/reviews`, "property");
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", "Customer Reviews | iLovah Cleaning & Rest In Pest");

        setLink("canonical", `${BASE_URL}/reviews`);

        const existing = document.getElementById("reviews-jsonld-main");
        if (existing) existing.remove();
        const script = document.createElement("script");
        script.id = "reviews-jsonld-main";
        script.type = "application/ld+json";
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "@id": `${BASE_URL}/reviews#breadcrumb`,
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
                        { "@type": "ListItem", "position": 2, "name": "Reviews", "item": `${BASE_URL}/reviews` }
                    ]
                },
                {
                    "@type": "LocalBusiness",
                    "@id": `${BASE_URL}/#business`,
                    "name": "iLovah Cleaning Services",
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "reviewCount": "87",
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "review": REVIEWS_DATA.slice(0, 8).map(r => ({
                        "@type": "Review",
                        "author": { "@type": "Person", "name": r.name },
                        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                        "reviewBody": r.text.replace(/^"|"$/g, ""),
                        "publisher": { "@type": "Organization", "name": r.source }
                    }))
                }
            ]
        });
        document.head.appendChild(script);

        return () => { const s = document.getElementById("reviews-jsonld-main"); if (s) s.remove(); };
    }, []);

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
            <style>{CSS}</style>
            <NavBar />
            <main>
                {/* Reviews */}
                <section className="il-reviews-section" id="reviews" aria-label="Customer reviews" style={{ paddingTop: 108 }}>
                    <div className="il-wrap" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                        <div className="sec-tag-blue" style={{ display: "inline-block", marginBottom: 12, color: GOLD, background: "rgba(255,184,0,0.1)", borderColor: "rgba(255,184,0,0.2)" }}>
                            Real Reviews
                        </div>
                        <h2 className="sec-h2" style={{ textAlign: "center", color: WHITE, maxWidth: "100%" }}>
                            Toowoomba <span className="hl-red">Loves</span> Our Cleaning &amp; Pest Services
                        </h2>
                        <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".93rem", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
                            From sparkling bond cleans to pest-free homes — here's what our Toowoomba clients say.
                        </p>
                        <ReviewsCarousel />
                    </div>
                </section>
            </main>
            <PageFooter />
        </div>
    );
}