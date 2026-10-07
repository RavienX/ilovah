import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import PageFooter from "./PageFooter";

// ── Design tokens ─────────────────────────────────────────────────────────────
const RED = "#E8232A";
const BLUE2 = "#4AABDB";
const DARK = "#111827";
const MID = "#4b5563";
const OFFWHITE = "#f7f9fc";
const BORDER = "#e8e8e8";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Nunito:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{
  font-family:'Nunito',sans-serif;
  background:#fff;color:#111827;overflow-x:hidden;
}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#f5f5f5}
::-webkit-scrollbar-thumb{background:#ff4e55;border-radius:3px}

/* ── HERO ── */
.faq-hero{
  background:${DARK};padding:140px 5% 64px;
  text-align:center;position:relative;overflow:hidden;
}
.faq-hero::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(43,143,212,0.1),transparent 65%);
  pointer-events:none;
}
.faq-hero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 16px;border-radius:50px;margin-bottom:20px;
  font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;
  background:rgba(74,171,219,0.12);border:1px solid rgba(74,171,219,0.3);color:${BLUE2};
  position:relative;z-index:2;
}
.faq-hero-dot{width:7px;height:7px;border-radius:50%;background:${BLUE2};animation:dotPulse 2s infinite}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.3}}
.faq-hero h1{
  font-family:'Montserrat',sans-serif;font-weight:900;
  font-size:clamp(2rem,4vw,3.2rem);line-height:1.08;
  letter-spacing:-0.03em;color:#fff;margin-bottom:16px;
  position:relative;z-index:2;
}
.faq-hero h1 .hl-red{color:${RED}}
.faq-hero p{
  font-size:.96rem;color:rgba(255,255,255,.65);line-height:1.7;
  max-width:500px;margin:0 auto;position:relative;z-index:2;
}
.faq-hero-bar{
  position:absolute;bottom:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,#2B8FD4 0%,${BLUE2} 50%,${RED} 50%,#ff4e55 100%);
}

/* ── FAQ SECTION ── */
.il-faq-section{padding:80px 0;background:${OFFWHITE}}
.il-faq-inner{max-width:800px;margin:0 auto}
.il-faq-cats{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0 32px;justify-content:center}
.il-faq-cat{background:none;border:1.5px solid ${BORDER};color:${MID};padding:6px 16px;border-radius:20px;font-size:.78rem;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .2s;letter-spacing:.04em}
.il-faq-cat.active,.il-faq-cat:hover{background:${RED};border-color:${RED};color:#fff}
.il-faq-list{display:flex;flex-direction:column;gap:8px}
.il-faq-item{border:1.5px solid ${BORDER};border-radius:14px;overflow:hidden;background:#fff;transition:border-color .25s,box-shadow .25s}
.il-faq-item.open{border-color:rgba(232,35,42,.35);box-shadow:0 6px 24px rgba(232,35,42,.09)}
.il-faq-q{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;cursor:pointer;font-weight:800;font-size:.93rem;color:${DARK};gap:12px;font-family:'Montserrat',sans-serif;background:none;border:none;width:100%;text-align:left;transition:color .2s}
.il-faq-item.open .il-faq-q{color:${RED}}
.il-faq-icon{width:24px;height:24px;border-radius:50%;border:1.5px solid rgba(232,35,42,.25);display:flex;align-items:center;justify-content:center;color:${RED};font-size:.85rem;font-weight:900;transition:transform .3s,background .2s;flex-shrink:0;line-height:1}
.il-faq-item.open .il-faq-icon{transform:rotate(45deg);background:${RED};color:#fff;border-color:${RED}}
.il-faq-a{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.4,0,.2,1),padding .3s;font-size:.88rem;color:${MID};line-height:1.75;padding:0 22px}
.il-faq-item.open .il-faq-a{max-height:300px;padding:0 22px 20px}
.il-faq-a-inner{border-top:1px solid ${BORDER};padding-top:14px}
.il-faq-toggle{
  background:none;border:1.5px solid rgba(232,35,42,.25);color:${RED};
  padding:10px 28px;border-radius:8px;font-size:.85rem;font-weight:800;
  cursor:pointer;font-family:'Nunito',sans-serif;margin-top:20px;transition:all .2s;
}
.il-faq-toggle:hover{background:${RED};color:#fff}
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
.sec-sub{font-size:1rem;color:${MID};line-height:1.7;max-width:560px;margin:0 auto 48px}
@media(max-width:600px){.faq-hero{padding:100px 5% 48px}}
`;

const FAQ_CATS = ["All", "Booking & Pricing", "Cleaning", "Pest Control", "Service Areas", "Guarantees"];

const FAQS = [
    { cat: "Cleaning", q: "Do you guarantee bond back for end of lease cleaning?", a: "Yes! We offer a bond-back guarantee for all our end-of-lease cleaning services. If your landlord or property manager is not satisfied, we will return to re-clean at no additional cost — no questions asked." },
    { cat: "Booking & Pricing", q: "How do I book a cleaning or pest control service?", a: "You can book by clicking 'Get Quote' on our website, calling us on 0478 711 829, or emailing ilovahclean@gmail.com. We typically respond within 2 hours with a tailored quote." },
    { cat: "Booking & Pricing", q: "How far in advance should I book your services?", a: "We recommend booking at least 2–3 days in advance to secure your preferred time slot. For end-of-lease cleans, book as soon as you know your move-out date to ensure availability." },
    { cat: "Pest Control", q: "Are your pest treatments safe for children and pets?", a: "Absolutely. Rest In Pest uses certified, pet-safe and child-safe products for all treatments. We'll advise you on any brief ventilation period needed after application, typically 30–60 minutes." },
    { cat: "Cleaning", q: "Can I be present during the cleaning?", a: "Absolutely! You are welcome to stay home during the clean. Many clients also choose to leave while we work." },
    { cat: "Booking & Pricing", q: "Do you provide free quotes?", a: "Yes, all quotes are 100% free and obligation-free. Simply reach out via phone, email, or the booking form and we'll provide a detailed quote based on your specific needs." },
    { cat: "Guarantees", q: "Do you offer a satisfaction guarantee?", a: "We stand behind every clean with a 100% satisfaction guarantee. If you're not happy with any aspect of the service, contact us within 24 hours and we'll return to make it right at no extra charge." },
    { cat: "Service Areas", q: "What areas do you service?", a: "We service Toowoomba and all surrounding suburbs within ~50km, including North Toowoomba, East Toowoomba, South Toowoomba, Harristown, Rangeville, Newtown, Wilsonton, Rockville, Glenvale, Kearneys Spring, Middle Ridge, Centenary Heights, Drayton, Darling Heights, Highfields, Helidon, and Gatton." },
    { cat: "Pest Control", q: "How much does pest control cost in Toowoomba?", a: "Pest control services in Toowoomba typically range from $150 to $300, depending on the size of your property and the level of infestation. Contact us for a free, tailored quote." },
    { cat: "Pest Control", q: "How often should pest control be done in Queensland?", a: "Most homes in Queensland should have pest control done every 6 to 12 months for effective, ongoing protection against common pests like cockroaches, ants, and spiders." },
    { cat: "Cleaning", q: "What is included in bond cleaning?", a: "Bond cleaning includes a thorough deep clean of all areas — kitchens, bathrooms, floors, windows, and all living spaces — carried out to real estate standards to help you get your bond back." },
    { cat: "Pest Control", q: "Is pest control safe for pets and children?", a: "Yes. Our treatments are safe when applied by our licensed technicians. Once the treated areas are dry — typically 30 to 60 minutes — it is safe for both pets and children to return." },
    { cat: "Service Areas", q: "Do you service Highfields and surrounding areas?", a: "Yes! We regularly service Highfields, Helidon, Gatton, and all areas within approximately 50km of Toowoomba. Contact us to confirm availability for your specific suburb." },
    { cat: "Service Areas", q: "Do you cover Harristown, Rangeville, and Newtown?", a: "Absolutely. We regularly service Harristown, Rangeville, Newtown, Wilsonton, Rockville, Glenvale, Kearneys Spring, Middle Ridge, Centenary Heights, Drayton, Darling Heights, and all Toowoomba suburbs. Book online or call 0478 711 829." },
    { cat: "Booking & Pricing", q: "Can I book a same-day or next-day service in Toowoomba?", a: "Subject to availability, yes — we offer same-day and next-day bookings for bond cleans, pest control, and other services across Toowoomba and surrounds. Call 0478 711 829 directly for urgent bookings." },
    { cat: "Booking & Pricing", q: "What payment methods do you accept?", a: "We accept cash, bank transfer (EFT), and credit card. Payment is due on completion of service unless prior arrangements have been made." },
    { cat: "Cleaning", q: "How long does a bond clean take?", a: "Bond cleans typically take 4–8 hours depending on the size and condition of the property. A standard 3-bedroom home usually takes around 5–6 hours with our team." },
    { cat: "Guarantees", q: "Are you insured and licensed?", a: "Yes. iLovah Cleaning Services is fully insured for public liability, and all pest control work is carried out by licensed, certified technicians in accordance with Queensland regulations." },
    { cat: "Cleaning", q: "Do you bring your own cleaning supplies and equipment?", a: "Yes, we arrive fully equipped with all professional-grade cleaning products and equipment. You don't need to supply anything — just let us in and we'll handle the rest." },
];

export default function FaqPage() {
    const [open, setOpen] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [activeCat, setActiveCat] = useState("All");

    useEffect(() => {
        window.scrollTo(0, 0);
        const BASE_URL = "https://www.ilovahcleaningservices.com.au";

        document.title = "FAQ | iLovah Cleaning & Rest In Pest – Toowoomba";
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
        setMeta("description", "Got questions about our cleaning or pest control services in Toowoomba? Browse our FAQ for answers on pricing, bookings, guarantees, and more.");
        setMeta("robots", "index, follow");
        setMeta("og:title", "FAQ | iLovah Cleaning & Rest In Pest", "property");
        setMeta("og:description", "Answers on pricing, bookings, guarantees, service areas and more for iLovah Cleaning Services and Rest In Pest Control in Toowoomba.", "property");
        setMeta("og:type", "website", "property");
        setMeta("og:url", `${BASE_URL}/faq`, "property");
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", "FAQ | iLovah Cleaning & Rest In Pest");
        setMeta("twitter:description", "Answers on pricing, bookings, guarantees, and service areas for cleaning and pest control in Toowoomba.");

        setLink("canonical", `${BASE_URL}/faq`);

        const existing = document.getElementById("faq-jsonld-main");
        if (existing) existing.remove();
        const script = document.createElement("script");
        script.id = "faq-jsonld-main";
        script.type = "application/ld+json";
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "@id": `${BASE_URL}/faq#breadcrumb`,
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
                        { "@type": "ListItem", "position": 2, "name": "FAQ", "item": `${BASE_URL}/faq` }
                    ]
                },
                {
                    "@type": "FAQPage",
                    "@id": `${BASE_URL}/faq#faq`,
                    "mainEntity": FAQS.map(f => ({
                        "@type": "Question",
                        "name": f.q,
                        "acceptedAnswer": { "@type": "Answer", "text": f.a }
                    }))
                }
            ]
        });
        document.head.appendChild(script);

        return () => { const s = document.getElementById("faq-jsonld-main"); if (s) s.remove(); };
    }, []);

    const filtered = activeCat === "All" ? FAQS : FAQS.filter(f => f.cat === activeCat);
    const visible = showAll ? filtered : filtered.slice(0, 6);
    const handleCat = (cat) => { setActiveCat(cat); setOpen(null); setShowAll(false); };

    return (
        <div style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
            <style>{CSS}</style>
            <NavBar />
            <main>
                {/* Hero */}
                <section className="faq-hero" aria-label="Frequently Asked Questions">
                    <div className="faq-hero-eyebrow"><span className="faq-hero-dot" />Help Centre</div>
                    <h1>Frequently Asked <span className="hl-red">Questions</span></h1>
                    <p>Everything you need to know about our cleaning and pest control services in Toowoomba and surrounds.</p>
                    <div className="faq-hero-bar" aria-hidden="true" />
                </section>

                {/* FAQ */}
                <section className="il-faq-section" id="faq" aria-label="FAQ">
                    <div className="il-wrap">
                        <div className="il-faq-inner">
                            <div style={{ textAlign: "center" }}>
                                <div className="sec-tag-blue" style={{ display: "inline-block", marginBottom: 12 }}>FAQ</div>
                                <h2 className="sec-h2" style={{ textAlign: "center" }}>Frequently Asked <span className="hl-red">Questions</span></h2>
                                <p className="sec-sub" style={{ maxWidth: 520, margin: "0 auto 8px" }}>
                                    Browse by category or <a href="/" style={{ color: RED, fontWeight: 800 }}>contact us</a> if you can't find your answer.
                                </p>
                            </div>

                            <div className="il-faq-cats" role="tablist" aria-label="FAQ categories">
                                {FAQ_CATS.map(cat => (
                                    <button key={cat} className={`il-faq-cat${activeCat === cat ? " active" : ""}`} onClick={() => handleCat(cat)} role="tab" aria-selected={activeCat === cat}>{cat}</button>
                                ))}
                            </div>

                            <div className="il-faq-list" role="list">
                                {visible.map((f) => {
                                    const idx = FAQS.indexOf(f);
                                    const isOpen = open === idx;
                                    return (
                                        <div key={idx} className={`il-faq-item${isOpen ? " open" : ""}`} role="listitem">
                                            <button className="il-faq-q" onClick={() => setOpen(isOpen ? null : idx)} aria-expanded={isOpen} aria-controls={`faq-answer-${idx}`} id={`faq-q-${idx}`}>
                                                <span>{f.q}</span>
                                                <span className="il-faq-icon" aria-hidden="true">+</span>
                                            </button>
                                            <div className="il-faq-a" id={`faq-answer-${idx}`} role="region" aria-labelledby={`faq-q-${idx}`}>
                                                <div className="il-faq-a-inner">{f.a}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {filtered.length > 6 && (
                                <div style={{ textAlign: "center" }}>
                                    <button className="il-faq-toggle" onClick={() => setShowAll(s => !s)}>
                                        {showAll ? "Show Less ↑" : `Show ${filtered.length - 6} More ↓`}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <PageFooter />
        </div>
    );
}