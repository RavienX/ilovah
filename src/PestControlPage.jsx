import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ilovahLogoSrc from "./assets/logo.png";
import imgLogo2 from "./assets/logo2.jpg";
import imgInsect from "./assets/insect.png";
import imgMoons from "./assets/moons.png";
import imgCarpet from "./assets/carpet cleaning.jpg";
import imgEndOfLease from "./assets/end of lease cleaning.jpg";
import imgGutter from "./assets/glutter cleaning.jpg";
import imgWindow from "./assets/window cleaning.jpg";
import imgPram from "./assets/pram cleaning.jpg";
import imgPest from "./assets/pest control.jpg";
import imgPressure from "./assets/pressure washing.jpg";
import imgGeneral from "./assets/general house clean.jpg";

// ── Design tokens (shared) ─────────────────────────────────────────────────
const RED = "#E8232A";
const RED2 = "#ff4e55";
const RED_DK = "#b01018";
const RED_GLOW = "rgba(232,35,42,0.4)";
const BLUE = "#2B8FD4";
const BLUE2 = "#4AABDB";
const BLUE_GLOW = "rgba(43,143,212,0.35)";
const BLACK = "#0c0c0c";
const DARK = "#111827";
const DARK2 = "#1a2535";
const WHITE = "#ffffff";
const OFFWHITE = "#f7f9fc";
const MID = "#64748b";
const GOLD = "#FFB800";
const PEST_BG = "#0f0a08";
const BORDER = "#e8e8e8";
const CREAM = "#fdfaf9";
const CHARCOAL = "#1a1a1a";
const RED_LT = "#fdecea";

// ── Services data (shared with main page) ─────────────────────────────────
const SERVICES_DATA = [
    {
        name: "Dry Carpet Cleaning", emoji: "🧹", price: "From $89", img: imgCarpet,
        desc: "Dry carpet cleaning that removes dirt, stains, and allergens using minimal moisture — carpets are ready to walk on straight away, fully dry in just one to two hours.",
        bullets: ["Dry carpet cleaning", "Duration: 2–4 hours"],
        duration: "2–4 hours", ideal: "Homes, offices & rentals",
        steps: [
            { icon: "🔍", title: "Inspection", desc: "We assess carpet condition, fibre type, and stain locations before starting." },
            { icon: "🧴", title: "Pre-treatment", desc: "Stains and high-traffic areas are pre-treated with professional dry solutions." },
            { icon: "🌀", title: "Dry Cleaning", desc: "Low-moisture dry compound is worked deep into fibres, lifting dirt, allergens, and bacteria without soaking." },
            { icon: "🌬️", title: "Ready Instantly", desc: "No wet carpets — fully dry in 1–2 hours and walkable straight away." },
        ],
        includes: ["All rooms & hallways", "Stain pre-treatment", "Deodorising", "Furniture moved on request"],
    },
    {
        name: "End of Lease Cleaning", emoji: "🚚", price: "From $249", img: imgEndOfLease,
        desc: "We promise to promptly address and rectify any cleaning issues your property manager identifies during the final inspection, ensuring your bond is secured.",
        bullets: ["Bond Back Guarantee", "Duration: 4–8 hours"],
        duration: "4–8 hours", ideal: "Renters & landlords",
        steps: [
            { icon: "📋", title: "Checklist Review", desc: "We follow your real estate agent's exact end-of-lease checklist." },
            { icon: "🍳", title: "Kitchen & Bathrooms", desc: "Deep scrub of oven, stovetop, sinks, tiles, and all fixtures." },
            { icon: "🪟", title: "Windows & Walls", desc: "Interior windows, tracks, skirting boards, and wall marks cleaned." },
            { icon: "✅", title: "Final Walkthrough", desc: "We check every room before leaving — bond back guaranteed." },
        ],
        includes: ["Full kitchen deep clean", "Bathroom & toilet scrub", "Interior windows", "Oven & rangehood", "Skirting boards & doors", "Bond back guarantee"],
    },
    {
        name: "Gutter Cleaning", emoji: "🌿", price: "From $120", img: imgGutter,
        desc: "Protect your property with precision. Our discreet, thorough gutter cleaning ensures seamless drainage and lasting curb appeal.",
        bullets: ["Precision gutter cleaning", "Duration: 2–3 hours"],
        duration: "2–3 hours", ideal: "Houses & commercial buildings",
        steps: [
            { icon: "🏠", title: "Roof Access", desc: "Safely access your gutters using ladders and harness equipment." },
            { icon: "🍂", title: "Debris Removal", desc: "Remove all leaves, twigs, dirt, and blockages by hand and blower." },
            { icon: "💧", title: "Flush & Test", desc: "Gutters are flushed with water to confirm clear drainage flow." },
            { icon: "🔍", title: "Damage Report", desc: "We flag any cracks, sagging, or rust for your attention." },
        ],
        includes: ["All gutters & downpipes", "Debris bagged & removed", "Water flow test", "Minor blockage clearing", "Damage report if found"],
    },
    {
        name: "Window Cleaning", emoji: "🪟", price: "From $79", img: imgWindow,
        desc: "Professional window cleaning for streak-free, crystal-clear results — inside and out.",
        bullets: ["Spotless, streak-free window cleaning", "Duration: Varies"],
        duration: "1–3 hours", ideal: "Homes & businesses",
        steps: [
            { icon: "🧽", title: "Frame & Track Clean", desc: "Frames, sills, and tracks wiped down to remove built-up grime." },
            { icon: "🪟", title: "Interior Glass", desc: "Inside surfaces cleaned with streak-free solution and microfibre cloths." },
            { icon: "💦", title: "Exterior Glass", desc: "Outside glass cleaned with water-fed pole or squeegee system." },
            { icon: "✨", title: "Streak-Free Finish", desc: "Final polish ensures crystal-clear, spot-free results every time." },
        ],
        includes: ["Interior & exterior glass", "Window frames & sills", "Sliding door tracks", "Streak-free guarantee", "Fly screens cleaned on request"],
    },
    {
        name: "Pram Cleaning", emoji: "👶", price: "From $49", img: imgPram,
        desc: "Safe, thorough sanitising of prams and strollers to keep your little one's ride fresh and hygienic.",
        bullets: ["The Pram Patch", "Duration: Varies"],
        duration: "1–2 hours", ideal: "Families with young children",
        steps: [
            { icon: "🔧", title: "Disassembly", desc: "Fabric, harness, and removable parts are carefully taken apart." },
            { icon: "🧼", title: "Hand Wash", desc: "All fabric components washed with baby-safe, non-toxic detergents." },
            { icon: "🦠", title: "Sanitising", desc: "Frame, wheels, and buckles sanitised to remove bacteria and mould." },
            { icon: "👶", title: "Reassembly", desc: "Pram reassembled, dried, and ready for your little one." },
        ],
        includes: ["Fabric hand wash", "Frame sanitising", "Wheel & buckle clean", "Baby-safe products only", "Mould treatment if needed"],
    },
    {
        name: "Pest Control Service", emoji: "🐛", price: "From $150", img: imgPest,
        desc: "Safe and effective pest treatment for homes and businesses, keeping unwanted visitors out for good.",
        bullets: ["Professional service", "Duration: Varies"],
        duration: "1–3 hours", ideal: "Residential and Commercial Property Treatment",
        steps: [
            { icon: "🔎", title: "Pest Inspection", desc: "We identify the type and extent of infestation before treatment." },
            { icon: "🚪", title: "Entry Point Check", desc: "Gaps, cracks, and access points are identified and noted." },
            { icon: "🧪", title: "Treatment Applied", desc: "Targeted, pet-safe treatments applied inside and outside the property." },
            { icon: "📅", title: "Follow-up Plan", desc: "We recommend a maintenance schedule to keep pests away long-term." },
        ],
        includes: ["Full property inspection", "Interior & exterior treatment", "Pet & child safe products", "Common pests covered", "Follow-up visit if needed"],
    },
    {
        name: "Pressure Washing", emoji: "💧", price: "From $99", img: imgPressure,
        desc: "Professional pressure washing for buildings, walkways, and common areas. Ideal for property managers, clinics, and commercial spaces.",
        bullets: ["Professional pressure washing", "Duration: 2–4 hours"],
        duration: "2–4 hours", ideal: "Driveways, decks & exteriors",
        steps: [
            { icon: "🧹", title: "Surface Prep", desc: "Loose debris swept away and delicate areas protected before washing." },
            { icon: "🧴", title: "Pre-soak", desc: "Degreaser or mould treatment applied to stubborn stains." },
            { icon: "💦", title: "High-Pressure Wash", desc: "Professional-grade pressure washer blasts away grime, oil, and algae." },
            { icon: "✅", title: "Rinse & Inspect", desc: "Surface rinsed clean and inspected for any missed areas." },
        ],
        includes: ["Driveways & paths", "Decks & patios", "Fences & walls", "Garage floors", "Mould & algae treatment"],
    },
    {
        name: "General House Clean", emoji: "✨", price: "From $89", img: imgGeneral,
        desc: "Regular maintenance cleaning covering all rooms — dusting, vacuuming, mopping, and surface sanitising.",
        bullets: ["Crystal-clear windows", "Duration: 1–3 hours"],
        duration: "2–4 hours", ideal: "Weekly, fortnightly or monthly",
        steps: [
            { icon: "🌀", title: "Dusting & Surfaces", desc: "All surfaces, shelves, and fixtures dusted from top to bottom." },
            { icon: "🧹", title: "Vacuuming", desc: "Carpets, rugs, and hard floors vacuumed throughout the home." },
            { icon: "🪣", title: "Mopping", desc: "Hard floors mopped with appropriate solution for floor type." },
            { icon: "🚿", title: "Bathrooms & Kitchen", desc: "Sinks, benches, stovetop, toilets, and mirrors cleaned and sanitised." },
        ],
        includes: ["All rooms & living areas", "Kitchen & bathrooms", "Vacuuming & mopping", "Dusting all surfaces", "Bin emptying"],
    },
];

// ── Calendar / booking constants ───────────────────────────────────────────
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TIME_SLOTS = [
    { label: "9:00 AM - 10:30 AM", start: "9:00 AM" },
    { label: "10:30 AM - 12:00 PM", start: "10:30 AM" },
    { label: "12:00 PM - 1:30 PM", start: "12:00 PM" },
    { label: "1:30 PM - 3:00 PM", start: "1:30 PM" },
    { label: "3:00 PM - 4:30 PM", start: "3:00 PM" },
    { label: "4:30 PM - 6:00 PM", start: "4:30 PM" },
];
// All slots are available on all days
const TAKEN_SLOTS = {};

// ── Service Picker ─────────────────────────────────────────────────────────
function ServicePicker({ service, setService }) {
    const [expanded, setExpanded] = useState(null);
    return (
        <>
            <h3>What do you need?</h3>
            <p className="il-modal-sub">Select the service that best fits your needs</p>
            <div className="il-svc-pick-grid">
                {SERVICES_DATA.map((s, i) => {
                    const isOpen = expanded === i;
                    return (
                        <div key={s.name} className={`il-svc-pick ${service === s.name ? "selected" : ""}`} onClick={() => setService(s.name)}>
                            <div className="il-svc-pick-top">
                                <div className="il-svc-pick-img" style={{ padding: 0, overflow: "hidden" }}>
                                    <img src={s.img} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 8 }} />
                                </div>
                                <div className="il-svc-pick-info"><div className="il-svc-pick-name">{s.name}</div></div>
                                <div className="il-svc-radio"><div className="il-svc-radio-dot" /></div>
                            </div>
                            {isOpen && (
                                <div className="il-svc-pick-detail" onClick={e => e.stopPropagation()}>
                                    <p className="il-svc-pick-desc">{s.desc}</p>
                                    <ul className="il-svc-pick-bullets">{s.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                                </div>
                            )}
                            <button className="il-svc-view-toggle" onClick={e => { e.stopPropagation(); setExpanded(isOpen ? null : i); }}>
                                {isOpen ? "View Less ▲" : "View More ▶"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

// ── Property Step ──────────────────────────────────────────────────────────
function PropertyStep({ street, setStreet, suburb, setSuburb, propState, setPropState, postcode, setPostcode, notes, setNotes, errors = {}, touched = {}, setErrors, setTouched }) {
    const [locStatus, setLocStatus] = useState("");
    const [mapSrc, setMapSrc] = useState("https://maps.google.com/maps?q=Toowoomba,QLD,Australia&z=11&output=embed");
    const updateMap = (sub, st) => {
        const q = [sub, st, "Australia"].filter(Boolean).join(", ");
        setMapSrc(`https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=12&output=embed`);
    };
    const useIPLocation = async () => {
        try {
            const r = await fetch("https://ipapi.co/json/");
            const d = await r.json();
            if (d.city) { setSuburb(d.city); setPropState(d.region_code || "QLD"); updateMap(d.city, d.region_code || "QLD"); setLocStatus("✓ Location found via IP"); }
        } catch { setLocStatus("⚠ Could not determine location"); }
    };
    const handleLocate = () => {
        setLocStatus("Locating…");
        if (!navigator.geolocation) { useIPLocation(); return; }
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude: lat, longitude: lng } = pos.coords;
                    setMapSrc(`https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`);
                    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
                    const d = await r.json();
                    const sub = d.address?.suburb || d.address?.city || d.address?.town || "";
                    const st = d.address?.state_code || d.address?.state || "QLD";
                    const pc = d.address?.postcode || "";
                    if (sub) setSuburb(sub); if (pc) setPostcode(pc); setPropState(st);
                    setLocStatus("✓ Location found! Please verify your street address.");
                } catch { setLocStatus("✓ Map updated — enter address manually"); }
            },
            (err) => { if (err.code === 1) { setLocStatus("Denied — trying IP..."); useIPLocation(); } else setLocStatus("⚠ Location unavailable"); },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    };
    return (
        <>
            <h3>Property Information</h3>
            <p className="il-modal-sub">Where would you like us to service?</p>
            <div className="il-property-grid">
                <div>
                    <div className="il-form-group">
                        <label>Street Address <span style={{ color: RED }}>*</span></label>
                        <input type="text" value={street} onChange={e => { setStreet(e.target.value); if (setErrors) setErrors(p => ({ ...p, street: "" })); }} onBlur={() => setTouched && setTouched(p => ({ ...p, street: true }))} placeholder="123 Main Street" className={errors.street && touched.street ? "error" : ""} />
                        {errors.street && touched.street && <div className="il-field-error">{errors.street}</div>}
                    </div>
                    <div className="il-form-row">
                        <div className="il-form-group">
                            <label>Suburb <span style={{ color: RED }}>*</span></label>
                            <input type="text" value={suburb} onChange={e => { setSuburb(e.target.value); updateMap(e.target.value, propState); if (setErrors) setErrors(p => ({ ...p, suburb: "" })); }} onBlur={() => setTouched && setTouched(p => ({ ...p, suburb: true }))} placeholder="Toowoomba" className={errors.suburb && touched.suburb ? "error" : ""} />
                            {errors.suburb && touched.suburb && <div className="il-field-error">{errors.suburb}</div>}
                        </div>
                        <div className="il-form-group">
                            <label>State</label>
                            <input type="text" value={propState} onChange={e => { setPropState(e.target.value); updateMap(suburb, e.target.value); }} placeholder="QLD" />
                        </div>
                    </div>
                    <div className="il-form-row">
                        <div className="il-form-group">
                            <label>Postcode <span style={{ color: RED }}>*</span></label>
                            <input type="text" value={postcode} onChange={e => { setPostcode(e.target.value); if (setErrors) setErrors(p => ({ ...p, postcode: "" })); }} onBlur={() => setTouched && setTouched(p => ({ ...p, postcode: true }))} placeholder="4350" className={errors.postcode && touched.postcode ? "error" : ""} />
                            {errors.postcode && touched.postcode && <div className="il-field-error">{errors.postcode}</div>}
                        </div>
                        <div className="il-form-group">
                            <label>Country</label>
                            <input type="text" defaultValue="Australia" readOnly />
                        </div>
                    </div>
                    <button className="il-loc-btn" onClick={handleLocate}>📍 Use my current location</button>
                    {locStatus && <p style={{ fontSize: ".74rem", color: locStatus.startsWith("✓") ? "#16a34a" : RED, marginTop: 7, fontWeight: 700 }}>{locStatus}</p>}
                </div>
                <div>
                    <div className="il-form-group" style={{ marginBottom: 8 }}><label>Coverage Map</label></div>
                    <div className="il-map-placeholder">
                        <div className="il-map-label"><span className="pin">📍</span> Toowoomba & Surrounds</div>
                        <div style={{ height: 200 }}>
                            <iframe key={mapSrc} src={mapSrc} width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Coverage Map" />
                        </div>
                    </div>
                    <p className="il-map-note">We cover Toowoomba & surrounds within ~50km.</p>
                </div>
            </div>
            <div className="il-form-group" style={{ marginTop: 16 }}>
                <label>Additional Notes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. cockroach problem, rodents in roof, need treatment by Friday…" rows={3} />
            </div>
        </>
    );
}

const PEST_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Nunito:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&display=swap');

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
  --gold:${GOLD};--pest-bg:${PEST_BG};--pest-red:${RED_DK};
  --charcoal:${CHARCOAL};--border:${BORDER};--cream:${CREAM};--red-lt:${RED_LT};
}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#f5f5f5}
::-webkit-scrollbar-thumb{background:${RED2};border-radius:3px}

/* ── TOP INFO BAR ── */
.il-topbar{
  background:${BLACK};padding:0 48px;height:38px;
  display:flex;align-items:center;justify-content:space-between;
  font-size:.73rem;color:rgba(255,255,255,0.65);
  position:fixed;top:0;left:0;right:0;z-index:901;transition:transform .35s ease;
  border-bottom:1px solid rgba(232,35,42,0.2);
}
.il-topbar.hidden{transform:translateY(-100%)}
.il-topbar-left{display:flex;align-items:center;gap:20px}
.il-topbar-right{display:flex;align-items:center;gap:16px}
.il-topbar-item{display:flex;align-items:center;gap:5px;color:rgba(255,255,255,0.65);text-decoration:none;transition:color .2s;white-space:nowrap}
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
}
.il-nav.scrolled{box-shadow:0 2px 20px rgba(0,0,0,0.4);height:64px;top:0}
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
.il-nav-links-desktop a:hover{color:${RED};background:rgba(232,35,42,0.1)}
.il-nav-links-desktop a.active-link{color:${RED};background:rgba(232,35,42,0.1)}

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
.il-nav-links a{text-decoration:none;font-size:.97rem;font-weight:700;padding:13px 16px;border-radius:10px;display:block;color:rgba(255,255,255,.7);border:1px solid transparent;transition:all .2s;cursor:pointer;text-transform:uppercase;letter-spacing:.06em}
.il-nav-links a:hover{background:rgba(232,35,42,0.12);color:${RED};border-color:rgba(232,35,42,.2)}
.il-nav-quote{background:${RED}!important;color:#fff!important;padding:9px 22px!important;border-radius:6px!important;font-weight:900!important;transition:all .2s!important;box-shadow:0 4px 16px ${RED_GLOW}!important;font-size:.78rem!important;margin-left:6px}
.il-nav-quote:hover{background:${RED2}!important;transform:translateY(-2px)!important}
.il-nav-links .il-nav-quote{margin-top:10px!important;background:${RED}!important;color:#fff!important;text-align:center!important;padding:14px 20px!important;border-radius:10px!important;font-weight:900!important;box-shadow:0 4px 14px ${RED_GLOW}!important;font-size:.95rem!important;display:block}
.il-nav-links .il-nav-quote:hover{background:${RED_DK}!important}
.il-nav-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9998;opacity:0;pointer-events:none;transition:opacity .38s ease;backdrop-filter:blur(4px)}
.il-nav-backdrop.open{opacity:1;pointer-events:all}
.il-burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:8px;border-radius:9px;transition:background .2s;z-index:1100;position:relative}
.il-burger:hover{background:rgba(232,35,42,0.1)}
.il-burger span{width:24px;height:2.5px;background:${WHITE};border-radius:3px;display:block;transition:all .35s cubic-bezier(.4,0,.2,1);transform-origin:center}
.il-burger.open span:nth-child(1){transform:rotate(45deg) translate(0,7px)}
.il-burger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.il-burger.open span:nth-child(3){transform:rotate(-45deg) translate(0,-7px)}

/* ── REVEAL ── */
.il-reveal{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}
.il-reveal.visible{opacity:1;transform:translateY(0)}

/* ── BUTTONS ── */
.btn-red{background:${RED};color:#fff;border:none;padding:13px 28px;border-radius:9px;font-family:'Nunito',sans-serif;font-size:.92rem;font-weight:900;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .25s;box-shadow:0 4px 16px ${RED_GLOW};letter-spacing:-.01em}
.btn-red:hover{background:${RED_DK};transform:translateY(-2px);box-shadow:0 8px 26px ${RED_GLOW}}
.btn-ghost-w{background:transparent;color:rgba(255,255,255,.75);border:1.5px solid rgba(255,255,255,.25);padding:13px 24px;border-radius:9px;font-family:'Nunito',sans-serif;font-size:.92rem;font-weight:700;cursor:pointer;transition:all .25s;letter-spacing:-.01em}
.btn-ghost-w:hover{border-color:rgba(255,255,255,.6);color:#fff;background:rgba(255,255,255,.08)}

/* ── PEST PAGE HERO ── */
.pest-page-hero{
  min-height:60vh;
  background:${PEST_BG};
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;
  padding:150px 5% 72px;
  position:relative;overflow:hidden;
}
.pest-page-hero::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 40%,rgba(204,26,26,0.22),transparent 70%),
    radial-gradient(ellipse 40% 40% at 0% 100%,rgba(232,35,42,0.06),transparent 60%);
}
.bug-bg{position:absolute;right:-40px;bottom:-20px;font-size:22rem;opacity:.04;line-height:1;user-select:none;pointer-events:none;animation:bugCreep 20s ease-in-out infinite}
@keyframes bugCreep{0%,100%{transform:translate(0,0) rotate(-10deg)}50%{transform:translate(-20px,-15px) rotate(5deg)}}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:50px;margin-bottom:24px;font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;width:fit-content;position:relative;z-index:3}
.ey-red{background:rgba(232,35,42,0.12);border:1px solid rgba(232,35,42,0.35);color:${RED2}}
.ey-dot{width:7px;height:7px;border-radius:50%;animation:dotPulse 2s infinite}
.dot-r{background:${RED}}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.3}}
.pest-hero-h1{font-family:'Black Ops One',cursive;font-weight:400;line-height:1.1;letter-spacing:.02em;font-size:clamp(2.8rem,6vw,4.8rem);color:${WHITE};position:relative;z-index:3;margin-bottom:20px}
.pest-hero-h1 .hl-red{color:${RED};text-shadow:0 0 30px rgba(232,35,42,.5)}
.pest-hero-p{font-size:1.02rem;line-height:1.72;color:rgba(255,255,255,.55);max-width:540px;margin:0 auto 36px;position:relative;z-index:3}
.pest-hero-btns{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;position:relative;z-index:3}
.pest-hero-stats{display:flex;gap:36px;margin-top:48px;flex-wrap:wrap;justify-content:center;position:relative;z-index:3}
.hs{text-align:center}
.hs-n{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.8rem;line-height:1}
.hs-n.clr-red{color:${RED}}
.hs-l{font-size:.68rem;font-weight:800;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.08em;margin-top:3px}
.hs-sep{width:1px;background:rgba(255,255,255,.1);align-self:stretch}

/* ── PEST SECTION (main content block) ── */
.pest-section{
  background:${PEST_BG};
  padding:80px 5%;
  position:relative;overflow:hidden;
}
.pest-section::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 50% at 0% 50%,rgba(176,16,24,0.15),transparent 65%),
             radial-gradient(ellipse 50% 60% at 100% 80%,rgba(232,35,42,0.08),transparent 60%);
  pointer-events:none;
}
.zzz-bug{
  position:absolute;font-size:1.1rem;color:rgba(255,80,80,0.35);
  font-weight:900;letter-spacing:.1em;z-index:0;
  animation:zzFloat 6s ease-in-out infinite;
  display:flex;align-items:center;gap:4px;
}
@keyframes zzFloat{0%,100%{transform:translateY(0) rotate(-8deg);opacity:.35}50%{transform:translateY(-14px) rotate(6deg);opacity:.6}}
.pest-inner{
  max-width:1140px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1.2fr;gap:72px;align-items:center;
  position:relative;z-index:1;
}
.pest-logo-display{display:flex;justify-content:flex-start}
.pest-crescent-wrap{
  position:relative;width:380px;height:380px;flex-shrink:0;
}
.rip-crescent{width:320px;height:320px}
.pest-svg-logo{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:200px;height:200px;border-radius:50%;overflow:hidden;
  border:3px solid rgba(232,35,42,0.4);
  box-shadow:0 0 40px rgba(232,35,42,0.25);
}
.pest-fact{
  position:absolute;background:rgba(20,10,10,0.9);
  border:1px solid rgba(232,35,42,0.25);border-radius:12px;
  padding:10px 14px;display:flex;align-items:center;gap:10px;
  backdrop-filter:blur(8px);
  box-shadow:0 4px 20px rgba(0,0,0,0.4);
  white-space:nowrap;
}
.pest-fact:first-of-type{top:8%;right:-10px}
.pest-fact:last-of-type{bottom:15%;right:-20px}
.pf-ico{font-size:1.4rem}
.pf-n{font-family:'Montserrat',sans-serif;font-weight:900;font-size:.95rem;color:#fff;line-height:1}
.pf-l{font-size:.66rem;color:rgba(255,255,255,.4);margin-top:2px;text-transform:uppercase;letter-spacing:.06em}
.pest-content{display:flex;flex-direction:column;gap:4px}
.section-tag{
  display:inline-flex;align-items:center;gap:6px;
  font-size:.7rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;
  color:${RED2};background:rgba(232,35,42,0.1);
  border:1px solid rgba(232,35,42,0.2);border-radius:50px;
  padding:5px 14px;width:fit-content;margin-bottom:20px;
}
.pest-title{
  font-family:'Black Ops One',cursive;
  font-size:clamp(2.4rem,4vw,4rem);color:#fff;
  line-height:1.1;letter-spacing:.02em;margin-bottom:10px;
}
.pest-title .hl-red{color:${RED};text-shadow:0 0 30px rgba(232,35,42,.5)}
.pest-tagline{font-family:'Montserrat',sans-serif;font-style:italic;font-weight:700;font-size:1.1rem;color:rgba(255,255,255,.35);margin-bottom:20px;letter-spacing:-.01em}
.pest-desc{font-size:.97rem;line-height:1.72;color:rgba(255,255,255,.5);margin-bottom:36px;max-width:520px}
.pest-services{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:36px}
.ps-card{
  background:rgba(255,255,255,0.04);border:1px solid rgba(232,35,42,0.15);
  border-radius:14px;padding:18px 14px;transition:all .25s;
}
.ps-card:hover{background:rgba(232,35,42,0.08);border-color:rgba(232,35,42,0.35);transform:translateY(-3px)}
.ps-ico{font-size:1.6rem;margin-bottom:8px}
.ps-card h4{font-family:'Montserrat',sans-serif;font-size:.82rem;font-weight:900;color:#fff;margin-bottom:5px;letter-spacing:-.01em}
.ps-card p{font-size:.74rem;color:rgba(255,255,255,.4);line-height:1.55}
.pest-cta{display:flex;gap:12px;flex-wrap:wrap}

/* ── WHY CHOOSE US (on pest page) ── */
.pest-why-section{
  background:#fff;padding:80px 5%;
}
.pest-why-grid{
  max-width:1100px;margin:0 auto;
  display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:48px;
}
.pest-why-card{
  background:${OFFWHITE};border:1.5px solid ${BORDER};border-radius:18px;
  padding:32px 24px;text-align:center;
  transition:all .28s;
}
.pest-why-card:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(0,0,0,.1);border-color:rgba(232,35,42,.25)}
.pest-why-ico{font-size:2.4rem;margin-bottom:14px}
.pest-why-title{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.05rem;color:${DARK};margin-bottom:8px;letter-spacing:-.02em}
.pest-why-desc{font-size:.85rem;color:${MID};line-height:1.65}

/* ── PROCESS STEPS ── */
.pest-process-section{
  background:${DARK};padding:80px 5%;
}
.pest-process-grid{
  max-width:960px;margin:48px auto 0;
  display:grid;grid-template-columns:repeat(4,1fr);gap:20px;
}
.pest-step{
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  border-radius:16px;padding:28px 20px;text-align:center;
  transition:all .25s;position:relative;
}
.pest-step:hover{border-color:rgba(232,35,42,.4);background:rgba(232,35,42,.06);transform:translateY(-3px)}
.pest-step-num{font-family:'Montserrat',sans-serif;font-weight:900;font-size:2.4rem;color:rgba(232,35,42,.18);line-height:1;margin-bottom:10px}
.pest-step-ico{font-size:1.8rem;margin-bottom:10px}
.pest-step-title{font-family:'Montserrat',sans-serif;font-size:.88rem;font-weight:900;color:#fff;margin-bottom:6px;letter-spacing:-.01em}
.pest-step-desc{font-size:.78rem;color:rgba(255,255,255,.4);line-height:1.6}

/* ── CTA BAND ── */
.pest-cta-band{
  background:linear-gradient(135deg,${RED},${RED_DK});
  padding:64px 5%;text-align:center;
}
.pest-cta-band h2{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(1.8rem,3.5vw,2.6rem);color:#fff;letter-spacing:-.04em;margin-bottom:14px}
.pest-cta-band p{color:rgba(255,255,255,.75);font-size:.97rem;line-height:1.65;max-width:500px;margin:0 auto 32px}
.pest-cta-band-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-white{background:#fff;color:${RED};border:none;padding:14px 30px;border-radius:9px;font-family:'Nunito',sans-serif;font-size:.95rem;font-weight:900;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .25s;box-shadow:0 4px 16px rgba(0,0,0,.15)}
.btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 26px rgba(0,0,0,.2)}

/* ── GET QUOTE MODAL ── */
.il-gq-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;pointer-events:none;transition:opacity .3s ease;backdrop-filter:blur(6px)}
.il-gq-overlay.active{opacity:1;pointer-events:all}
.il-gq-modal{background:#fff;border-radius:24px;width:min(520px,100%);max-height:92vh;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,.25);display:flex;flex-direction:column}
.il-gq-header{background:linear-gradient(135deg,${RED},${RED_DK});padding:28px 28px 24px;border-radius:24px 24px 0 0;position:relative;flex-shrink:0}
.il-gq-close{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.2);border:1.5px solid rgba(255,255,255,.3);color:#fff;font-size:.85rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}
.il-gq-close:hover{background:rgba(255,255,255,.35)}
.il-gq-eyebrow{font-size:.65rem;font-weight:900;text-transform:uppercase;letter-spacing:.14em;color:rgba(255,255,255,.7);margin-bottom:6px}
.il-gq-title{font-family:'Montserrat',sans-serif;font-size:1.7rem;font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.1;margin-bottom:6px}
.il-gq-sub{font-size:.84rem;color:rgba(255,255,255,.75);line-height:1.5}
.il-gq-body{padding:28px;display:flex;flex-direction:column;gap:16px;flex:1}
.il-gq-group{display:flex;flex-direction:column;gap:5px}
.il-gq-group label{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:${MID}}
.il-gq-group input,.il-gq-group select,.il-gq-group textarea{width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid ${BORDER};font-family:'Nunito',sans-serif;font-size:.9rem;color:${CHARCOAL};outline:none;transition:border-color .2s;background:#fff;resize:none}
.il-gq-group input:focus,.il-gq-group select:focus,.il-gq-group textarea:focus{border-color:${RED}}
.il-gq-group input.error,.il-gq-group select.error{border-color:${RED};background:#fff8f8}
.il-gq-field-error{font-size:.74rem;color:${RED};font-weight:700;margin-top:2px}
.il-gq-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.il-gq-submit{width:100%;padding:15px;background:linear-gradient(135deg,${RED},${RED_DK});color:#fff;border:none;border-radius:12px;font-family:'Nunito',sans-serif;font-size:1rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .25s;box-shadow:0 4px 16px rgba(232,35,42,.35);letter-spacing:-.01em;margin-top:4px}
.il-gq-submit:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 24px rgba(232,35,42,.4)}
.il-gq-submit:disabled{opacity:.7;cursor:not-allowed;transform:none}
.il-gq-submit.sent{background:#16a34a;box-shadow:0 4px 16px rgba(22,163,74,.35)}
.il-gq-disclaimer{font-size:.74rem;color:${MID};text-align:center;line-height:1.5;padding:0 4px}

/* ── FOOTER ── */
.il-footer{background:${DARK};color:rgba(255,255,255,.5);padding:60px 5% 24px;font-size:.85rem}
.il-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px;max-width:1200px;margin-left:auto;margin-right:auto}
.il-footer-brand p{line-height:1.7;max-width:280px;margin-top:14px;font-size:.83rem}
.il-footer-col h4{font-family:'Montserrat',sans-serif;font-weight:900;font-size:.88rem;letter-spacing:.04em;text-transform:uppercase;color:#fff;margin-bottom:14px}
.il-footer-col ul{list-style:none}
.il-footer-col ul li{margin-bottom:8px}
.il-footer-col ul li a{color:rgba(255,255,255,.45);text-decoration:none;font-size:.82rem;transition:color .2s;display:flex;align-items:center;gap:6px}
.il-footer-col ul li a:hover{color:${RED}}
.fc-icon{font-size:.9rem}
.il-footer-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;display:flex;justify-content:space-between;align-items:center;font-size:.75rem;color:rgba(255,255,255,.25);max-width:1200px;margin:0 auto}
.il-footer-bottom-right{display:flex;align-items:center;gap:10px}
.hrt{color:${RED};font-size:.85rem}
.footer-dual-logo{display:flex;align-items:center;gap:14px;margin-bottom:4px}
.fdl-il{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.5rem;letter-spacing:-.02em}
.fdl-il .lr{color:${RED}}.fdl-il .lw{color:#fff}
.fdl-sep{width:1px;height:24px;background:rgba(255,255,255,.15)}
.fdl-rip{font-family:'Black Ops One',cursive;font-size:.95rem;letter-spacing:.06em}
.fdl-rip .r{color:${RED}}.fdl-rip .w{color:#fff}

/* ── SHARED LAYOUT ── */
.il-wrap{max-width:1200px;margin:0 auto;padding:0 5%}
.sec-tag-blue{display:inline-flex;align-items:center;gap:6px;font-size:.7rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:${BLUE2};background:rgba(74,171,219,0.1);border:1px solid rgba(74,171,219,0.2);border-radius:50px;padding:5px 14px;margin-bottom:14px}
.sec-tag-red{display:inline-flex;align-items:center;gap:6px;font-size:.7rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:${RED2};background:rgba(232,35,42,0.1);border:1px solid rgba(232,35,42,0.2);border-radius:50px;padding:5px 14px;margin-bottom:14px}
.sec-h2{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(1.8rem,3vw,2.4rem);letter-spacing:-.04em;line-height:1.08;margin-bottom:14px;color:${DARK}}
.sec-h2-white{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(1.8rem,3vw,2.4rem);letter-spacing:-.04em;line-height:1.08;margin-bottom:14px;color:#fff}
.sec-sub{font-size:.95rem;color:${MID};line-height:1.72;margin-bottom:40px;max-width:560px}
.hl-red{color:${RED}}

/* ── FLOAT CTA ── */
.float-cta{
  position:fixed;bottom:28px;right:28px;z-index:8999;
  background:linear-gradient(135deg,${RED},${RED2});
  border-radius:50px;
  box-shadow:0 8px 32px ${RED_GLOW},0 0 0 3px rgba(232,35,42,0.25);
  animation:ctaFloat 3.5s ease-in-out infinite;
}
.float-cta a{display:flex;align-items:center;gap:10px;color:#fff;font-family:'Nunito',sans-serif;font-size:1.05rem;font-weight:900;padding:18px 30px;border-radius:50px;text-decoration:none;transition:all .25s;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
.float-cta:hover{transform:translateY(-3px);box-shadow:0 16px 44px ${RED_GLOW},0 0 0 4px rgba(232,35,42,0.3)}
@keyframes ctaFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

/* ── BOOKING MODAL ── */
.il-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;pointer-events:none;transition:opacity .3s ease;backdrop-filter:blur(6px)}
.il-overlay.active{opacity:1;pointer-events:all}
.il-modal{background:#fff;border-radius:24px;width:min(680px,100%);max-height:92vh;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,.25);display:flex;flex-direction:column}
.il-progress-bar{height:3px;background:rgba(232,35,42,.12);border-radius:3px 3px 0 0;overflow:hidden}
.il-progress-fill{height:100%;background:linear-gradient(90deg,${RED},${RED2});transition:width .4s ease;border-radius:3px}
.il-stepper{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid ${BORDER};gap:8px}
.il-stepper-back,.il-stepper-close{background:none;border:1.5px solid ${BORDER};border-radius:9px;width:34px;height:34px;cursor:pointer;font-size:1rem;color:${MID};display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;font-family:'Nunito',sans-serif}
.il-stepper-back:hover,.il-stepper-close:hover{border-color:${RED};color:${RED};background:${RED_LT}}
.il-stepper-back.hidden{visibility:hidden}
.il-steps-wrap{display:flex;align-items:center;flex:1;justify-content:center;flex-wrap:wrap;gap:0}
.il-step-item{display:flex;flex-direction:column;align-items:center;gap:4px}
.il-step-dot{width:28px;height:28px;border-radius:50%;border:2px solid ${BORDER};background:#fff;color:${MID};font-size:.8rem;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .3s;font-family:'Montserrat',sans-serif}
.il-step-dot.active{border-color:${RED};background:${RED};color:#fff;box-shadow:0 3px 10px rgba(232,35,42,.3)}
.il-step-dot.done{border-color:${RED};background:${RED_LT};color:${RED}}
.il-step-label{font-size:.62rem;font-weight:700;color:${MID};letter-spacing:.05em}
.il-step-label.active{color:${RED}}
.il-step-label.done{color:${RED};opacity:.6}
.il-step-line{width:24px;height:2px;background:${BORDER};border-radius:2px;margin-bottom:18px;transition:background .3s}
.il-step-line.done{background:${RED}}
.il-modal-body{padding:24px 28px;flex:1;overflow-y:auto}
.il-modal-body h3{font-family:'Montserrat',sans-serif;font-size:1.35rem;font-weight:900;color:${DARK};margin-bottom:6px;letter-spacing:-0.02em}
.il-modal-sub{font-size:.88rem;color:${MID};margin-bottom:22px}
.il-form-group{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}
.il-form-group label{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:${MID}}
.il-form-group input,.il-form-group select,.il-form-group textarea{width:100%;padding:11px 14px;border-radius:9px;border:1.5px solid ${BORDER};font-family:'Nunito',sans-serif;font-size:.9rem;color:${CHARCOAL};outline:none;transition:border-color .2s;background:#fff;resize:none}
.il-form-group input:focus,.il-form-group select:focus,.il-form-group textarea:focus{border-color:${RED}}
.il-form-group input.error,.il-form-group select.error{border-color:${RED};background:#fff8f8}
.il-field-error{font-size:.73rem;color:${RED};font-weight:700}
.il-form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.il-step-error-banner{background:#fff0f0;border:1.5px solid rgba(232,35,42,.25);border-radius:9px;padding:10px 14px;font-size:.83rem;color:${RED};font-weight:700;margin-bottom:14px}
.il-contact-pref{display:flex;gap:8px;flex-wrap:wrap}
.il-pref-btn{display:flex;align-items:center;gap:6px;padding:9px 16px;border-radius:8px;border:1.5px solid ${BORDER};background:#fff;font-size:.85rem;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .2s}
.il-pref-btn.active{border-color:${RED};background:${RED_LT};color:${RED}}
.il-selected-svc-pill{display:flex;align-items:center;gap:8px;background:${RED_LT};border:1px solid rgba(232,35,42,.2);border-radius:8px;padding:8px 12px;font-size:.84rem;margin-bottom:16px}
.il-selected-svc-check{color:${RED};font-weight:900}
.il-selected-svc-change{background:none;border:none;color:${RED};cursor:pointer;font-size:.8rem;font-weight:700;font-family:'Nunito',sans-serif;margin-left:auto;text-decoration:underline}
.il-svc-pick-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:8px}
.il-svc-pick{border:1.5px solid ${BORDER};border-radius:12px;padding:14px;cursor:pointer;transition:all .25s;background:#fff}
.il-svc-pick.selected{border-color:${RED};background:${RED_LT};box-shadow:0 4px 16px rgba(232,35,42,.12)}
.il-svc-pick-top{display:flex;align-items:center;gap:10px}
.il-svc-pick-img{width:44px;height:44px;border-radius:8px;overflow:hidden;flex-shrink:0;background:${RED_LT};display:flex;align-items:center;justify-content:center}
.il-svc-pick-name{font-size:.84rem;font-weight:800;color:${DARK};font-family:'Montserrat',sans-serif}
.il-svc-radio{margin-left:auto;width:18px;height:18px;border-radius:50%;border:2px solid ${BORDER};display:flex;align-items:center;justify-content:center;flex-shrink:0}
.il-svc-pick.selected .il-svc-radio{border-color:${RED}}
.il-svc-radio-dot{width:8px;height:8px;border-radius:50%;background:${RED};display:none}
.il-svc-pick.selected .il-svc-radio-dot{display:block}
.il-svc-pick-desc{font-size:.8rem;color:${MID};line-height:1.5;margin-top:10px}
.il-svc-pick-bullets{font-size:.78rem;color:${MID};padding-left:16px;margin-top:6px}
.il-svc-view-toggle{background:none;border:none;color:${RED};cursor:pointer;font-size:.76rem;font-weight:700;font-family:'Nunito',sans-serif;margin-top:8px;padding:0;text-decoration:underline}
.il-cal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.il-cal-month{font-family:'Montserrat',sans-serif;font-size:1rem;font-weight:900;letter-spacing:-.03em;color:${DARK}}
.il-cal-nav{background:#fff;border:1.5px solid ${BORDER};border-radius:7px;width:28px;height:28px;cursor:pointer;font-size:.86rem;display:flex;align-items:center;justify-content:center;transition:all .2s;color:${MID}}
.il-cal-nav:hover{border-color:${RED};color:${RED};background:${RED_LT}}
.il-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:16px}
.il-cal-dow{text-align:center;font-size:.67rem;font-weight:800;color:${MID};padding:4px 0;text-transform:uppercase;letter-spacing:.05em}
.il-cal-day{aspect-ratio:1;border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;border:1.5px solid transparent;font-size:.8rem;font-weight:500;color:${MID};background:#f8f8f8}
.il-cal-day:hover:not(.past){border-color:${RED};background:${RED_LT};color:${RED}}
.il-cal-day.selected{background:${RED};color:#fff;border-color:${RED};box-shadow:0 3px 9px rgba(232,35,42,.26)}
.il-cal-day.today{border-color:${RED};color:${RED};background:#fff;font-weight:700}
.il-cal-day.today.selected{background:${RED};color:#fff}
.il-cal-day.past{opacity:.3;cursor:not-allowed}
.il-slot-count{font-size:.52rem;color:#16a34a;font-weight:700;margin-top:1px}
.il-cal-day.selected .il-slot-count{color:rgba(255,255,255,.75)}
.il-time-slots{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}
.il-time-slot{padding:12px 10px;border-radius:10px;border:1.5px solid ${BORDER};background:#fff;font-size:.82rem;font-weight:700;text-align:left;cursor:pointer;transition:all .2s;color:${CHARCOAL};display:flex;flex-direction:column;gap:3px;box-shadow:0 1px 4px rgba(0,0,0,.04)}
.il-time-slot:hover:not(.taken){border-color:${RED};background:${RED_LT}}
.il-time-slot.active{border-color:${RED};background:${RED_LT}}
.il-time-slot.active .il-slot-status{color:${RED};font-weight:800}
.il-time-slot.taken{opacity:.5;cursor:not-allowed;background:#f5f5f5;border-color:#e0e0e0;color:#999}
.il-slot-status{font-size:.72rem;font-weight:700;color:#16a34a}
.il-info-box{background:${RED_LT};border:1px solid rgba(232,35,42,.18);border-radius:8px;padding:11px 13px;display:flex;gap:8px;align-items:flex-start}
.il-info-box .il-info-ico{color:${RED};font-size:.9rem;flex-shrink:0;margin-top:1px}
.il-info-box p{font-size:.79rem;color:${CHARCOAL};line-height:1.52}
.il-info-box strong{color:${RED}}
.il-urgency{margin-bottom:14px}
.il-urgency label{font-size:.75rem;font-weight:700;margin-bottom:6px;display:block}
.il-review-card{background:${OFFWHITE};border-radius:10px;padding:16px;margin-bottom:11px}
.il-review-card h4{font-family:'Montserrat',sans-serif;font-size:.93rem;font-weight:900;margin-bottom:11px;letter-spacing:-.02em;color:${DARK}}
.il-review-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid ${BORDER};font-size:.83rem}
.il-review-row:last-child{border-bottom:none}
.il-review-row span:first-child{color:${MID};font-weight:500}
.il-review-row span:last-child{color:${CHARCOAL};font-weight:700}
.il-submit-btn{width:100%;padding:13px;background:${RED};color:#fff;border:none;border-radius:9px;font-size:.93rem;font-weight:900;cursor:pointer;transition:all .25s;font-family:'Nunito',sans-serif;margin-top:7px;letter-spacing:-.01em;box-shadow:0 4px 13px rgba(232,35,42,.24)}
.il-submit-btn:hover{background:${RED_DK};transform:translateY(-1px)}
.il-submit-btn.sent{background:#16a34a;box-shadow:0 4px 13px rgba(22,163,74,.26)}
.il-terms{font-size:.71rem;color:${MID};text-align:center;margin-top:9px;line-height:1.55}
.il-modal-footer{padding:14px 28px;border-top:1px solid ${BORDER};background:#fff;display:flex;justify-content:space-between;align-items:center}
.il-footer-hint{font-size:.74rem;color:${MID};font-weight:600}
.il-next-btn{background:${CHARCOAL};color:#fff;padding:10px 26px;border-radius:8px;font-size:.87rem;font-weight:900;cursor:pointer;border:none;display:flex;align-items:center;gap:6px;transition:all .25s;font-family:'Nunito',sans-serif;letter-spacing:-.01em}
.il-next-btn:hover{background:${RED};transform:translateY(-1px);box-shadow:0 5px 14px rgba(232,35,42,.26)}
.il-next-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none;background:${CHARCOAL}}
.il-property-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.il-map-placeholder{border-radius:10px;border:1.5px solid ${BORDER};overflow:hidden}
.il-map-label{background:#fff;padding:8px 12px;display:flex;align-items:center;gap:5px;border-bottom:1px solid ${BORDER};font-size:.78rem;font-weight:700}
.il-map-label .pin{color:${RED}}
.il-map-note{font-size:.74rem;color:${MID};margin-top:6px;line-height:1.5}
.il-loc-btn{display:inline-flex;align-items:center;gap:5px;font-size:.79rem;color:${RED};font-weight:700;cursor:pointer;background:${RED_LT};border:1.5px solid rgba(232,35,42,.18);padding:5px 12px;border-radius:7px;font-family:'Nunito',sans-serif;margin-top:9px;transition:all .2s}
.il-loc-btn:hover{background:rgba(232,35,42,.12)}

/* ── RESPONSIVE ── */
@media(min-width:901px){
  .il-nav-links{display:none!important}
  .il-nav-backdrop{display:none!important}
  .il-burger{display:none!important}
}
@media(max-width:1024px){
  .pest-inner{grid-template-columns:1fr;gap:48px;text-align:center}
  .pest-logo-display{justify-content:center}
  .pest-crescent-wrap{width:320px;height:320px}
  .rip-crescent{width:280px;height:280px}
  .pest-services{grid-template-columns:repeat(3,1fr)}
  .pest-cta{justify-content:center}
  .pest-desc{margin:0 auto 36px}
  .pest-why-grid{grid-template-columns:1fr 1fr}
  .pest-process-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:900px){
  .il-topbar{display:none}
  .il-nav{top:0;padding:0 5%}
  .il-nav.scrolled{top:0}
  .il-nav-links-desktop{display:none}
  .il-burger{display:flex}
  .pest-services{grid-template-columns:1fr 1fr}
  .il-footer{padding:44px 5% 24px}
  .il-footer-bottom{flex-direction:column;gap:11px;text-align:center}
  .il-modal-body{padding:18px 16px}
  .il-modal-footer{padding:13px 16px}
  .il-svc-pick-grid{grid-template-columns:1fr}
  .il-property-grid{grid-template-columns:1fr}
  .il-form-row{grid-template-columns:1fr}
  .il-time-slots{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:600px){
  .il-nav{height:60px}
  .pest-services{grid-template-columns:1fr 1fr}
  .pest-why-grid{grid-template-columns:1fr}
  .pest-process-grid{grid-template-columns:1fr 1fr}
  .il-footer-grid{grid-template-columns:1fr;gap:28px}
  .il-time-slots{grid-template-columns:1fr 1fr}
}
@media(max-width:480px){
  .pest-process-grid{grid-template-columns:1fr}
}
`;

// ── Logo ─────────────────────────────────────────────────────────────────────
const ILovahLogo = ({ size = 40 }) => (
    <img src={ilovahLogoSrc} alt="iLovah Logo" width={size} height={size}
        style={{ borderRadius: 8, objectFit: "contain", display: "block", background: "#fff" }} />
);

// ── Reveal on scroll ─────────────────────────────────────────────────────────
const useReveal = () => {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
            { threshold: 0.08 }
        );
        obs.observe(el); return () => obs.disconnect();
    }, []);
    return ref;
};
const R = ({ className = "", children, style, onClick, ...rest }) => {
    const ref = useReveal();
    return <div ref={ref} className={`il-reveal ${className}`} style={style} onClick={onClick} {...rest}>{children}</div>;
};

// ── Get Quote Modal (identical to main page) ──────────────────────────────
const QUOTE_FUNCTION_URL = "https://us-central1-ilovahclean.cloudfunctions.net/sendBookingEmail";

function GetQuoteModal({ isOpen, onClose, initialService = "" }) {
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [service, setService] = useState(initialService);
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sendError, setSendError] = useState("");

    useEffect(() => { if (isOpen) { setSubmitted(false); setSendError(""); setErrors({}); } }, [isOpen]);
    useEffect(() => { if (isOpen && initialService) setService(initialService); }, [isOpen, initialService]);
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onClose(); };
        if (isOpen) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    const validate = () => {
        const errs = {};
        if (!firstName.trim()) errs.firstName = "First name is required";
        if (!phone.trim()) errs.phone = "Phone is required";
        if (!email.trim()) errs.email = "Email is required";
        else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = "Enter a valid email";
        if (!service) errs.service = "Please select a service";
        return errs;
    };

    const handleSubmit = async () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setSending(true); setSendError("");
        try {
            const res = await fetch(QUOTE_FUNCTION_URL, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, phone, email, service, address, notes, submittedAt: new Date().toLocaleString("en-AU"), type: "quote" }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Send failed");
            setSubmitted(true); setTimeout(() => { onClose(); }, 2800);
        } catch { setSendError("Failed to send. Please try again or call us directly."); }
        finally { setSending(false); }
    };

    return (
        <div className={`il-gq-overlay ${isOpen ? "active" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="il-gq-modal">
                <div className="il-gq-header">
                    <button className="il-gq-close" onClick={onClose}>✕</button>
                    <div className="il-gq-eyebrow">iLovah Cleaning & Rest In Pest</div>
                    <div className="il-gq-title">Get Your Instant Quote</div>
                    <div className="il-gq-sub">We'll respond within 1 hour with a clear, no-obligation quote.</div>
                </div>
                <div className="il-gq-body">
                    {submitted ? (
                        <div style={{ textAlign: "center", padding: "32px 0" }}>
                            <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "1.3rem", fontWeight: 900, color: DARK, marginBottom: 8 }}>Quote Request Sent!</div>
                            <p style={{ color: MID, fontSize: ".9rem" }}>We'll be in touch within 1 hour during business hours.</p>
                        </div>
                    ) : (
                        <>
                            <div className="il-gq-row">
                                <div className="il-gq-group">
                                    <label>First Name *</label>
                                    <input type="text" value={firstName} onChange={e => { setFirstName(e.target.value); if (errors.firstName) setErrors(p => ({ ...p, firstName: "" })); }} placeholder="Jane" className={errors.firstName ? "error" : ""} />
                                    {errors.firstName && <div className="il-gq-field-error">{errors.firstName}</div>}
                                </div>
                                <div className="il-gq-group">
                                    <label>Phone *</label>
                                    <input type="tel" value={phone} onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: "" })); }} placeholder="04XX XXX XXX" className={errors.phone ? "error" : ""} />
                                    {errors.phone && <div className="il-gq-field-error">{errors.phone}</div>}
                                </div>
                            </div>
                            <div className="il-gq-group">
                                <label>Email *</label>
                                <input type="email" value={email} onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: "" })); }} placeholder="jane@email.com" className={errors.email ? "error" : ""} />
                                {errors.email && <div className="il-gq-field-error">{errors.email}</div>}
                            </div>
                            <div className="il-gq-group">
                                <label>Service Needed *</label>
                                <select value={service} onChange={e => { setService(e.target.value); if (errors.service) setErrors(p => ({ ...p, service: "" })); }} className={errors.service ? "error" : ""}>
                                    <option value="" disabled>Select service…</option>
                                    <optgroup label="— Pest Control Service —">
                                        <option>Pest Control Service (General)</option>
                                        <option>Cockroach Treatment</option>
                                        <option>Ant Treatment</option>
                                        <option>Spider Control</option>
                                        <option>Rodent Control</option>
                                        <option>End of Lease Flea Treatment</option>
                                    </optgroup>
                                    <optgroup label="— Cleaning —">
                                        <option>End of Lease / Bond Cleaning</option>
                                        <option>General House Cleaning</option>
                                        <option>Dry Carpet Cleaning</option>
                                        <option>Window Cleaning</option>
                                        <option>Gutter Cleaning</option>
                                        <option>Pressure Washing</option>
                                        <option>Pram Cleaning</option>
                                    </optgroup>
                                    <option>Bundle Package (Cleaning + Pest)</option>
                                </select>
                                {errors.service && <div className="il-gq-field-error">{errors.service}</div>}
                            </div>
                            <div className="il-gq-group">
                                <label>Property Address</label>
                                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main Street, Toowoomba" />
                            </div>
                            <div className="il-gq-group">
                                <label>Additional Details</label>
                                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. 3 bed/2 bath, cockroach problem, need service by Friday…" rows={3} />
                            </div>
                            {sendError && <p style={{ color: RED, fontSize: ".82rem", fontWeight: 700, textAlign: "center" }}>{sendError}</p>}
                            <button className={`il-gq-submit ${submitted ? "sent" : ""}`} onClick={handleSubmit} disabled={sending || submitted}>
                                {sending ? "Sending…" : "✦ Get Instant Quote"}
                            </button>
                            <p className="il-gq-disclaimer">🔒 No spam. We respond within 1 hour during business hours.</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Full Booking Modal (identical to main page) ───────────────────────────
function BookingModal({ isOpen, onClose, initialService = "" }) {
    const [step, setStep] = useState(initialService ? 2 : 1);
    const [service, setService] = useState(initialService);
    const [pref, setPref] = useState("Phone");
    const [calDate, setCalDate] = useState(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth()); });
    const [selDay, setSelDay] = useState(null);
    const [selTime, setSelTime] = useState("");
    const [urgency, setUrgency] = useState("Flexible — within 2 weeks");
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [suburb, setSuburb] = useState("Toowoomba");
    const [propState, setPropState] = useState("QLD");
    const [postcode, setPostcode] = useState("4350");
    const [notes, setNotes] = useState("");
    const today = new Date();

    useEffect(() => {
        if (isOpen && initialService) { setService(initialService); setStep(2); }
        else if (isOpen && !initialService) { setStep(1); setService(""); }
    }, [isOpen, initialService]);
    useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; }, [isOpen]);
    useEffect(() => { const h = (e) => { if (e.key === "Escape") handleClose(); }; document.addEventListener("keydown", h); return () => document.removeEventListener("keydown", h); }, []);

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep(1); setService(""); setSubmitted(false); setSending(false); setSendError("");
            setFirstName(""); setLastName(""); setEmail(""); setPhone("");
            setStreet(""); setSuburb("Toowoomba"); setPropState("QLD"); setPostcode("4350"); setNotes("");
        }, 400);
    };

    const steps = [{ label: "Service" }, { label: "Contact" }, { label: "Property" }, { label: "Schedule" }, { label: "Review" }];
    const year = calDate.getFullYear(), month = calDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calCells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    const isPast = (d) => { const dt = new Date(year, month, d); const t = new Date(); t.setHours(0, 0, 0, 0); return dt < t; };
    const hasSlots = (d) => { if (isPast(d)) return false; return true; };
    const progressWidth = `${(step / steps.length) * 100}%`;

    const validate = (stepNum) => {
        const errs = {};
        if (stepNum === 1 && !service) errs.service = "Please select a service";
        if (stepNum === 2) {
            if (!firstName.trim()) errs.firstName = "First name is required";
            if (!lastName.trim()) errs.lastName = "Last name is required";
            if (!email.trim()) errs.email = "Email is required";
            else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = "Enter a valid email";
            if (!phone.trim()) errs.phone = "Phone is required";
            else if (!/^[0-9\s\+\-\(\)]{8,}$/.test(phone)) errs.phone = "Enter a valid phone";
        }
        if (stepNum === 3) {
            if (!street.trim()) errs.street = "Street address is required";
            if (!suburb.trim()) errs.suburb = "Suburb is required";
            if (!postcode.trim()) errs.postcode = "Postcode is required";
        }
        if (stepNum === 4) {
            if (!selDay) errs.selDay = "Please select a date";
            if (!selTime) errs.selTime = "Please select a time slot";
        }
        return errs;
    };

    const handleNext = () => {
        const errs = validate(step);
        if (Object.keys(errs).length > 0) { setErrors(errs); setTouched(Object.keys(errs).reduce((a, k) => ({ ...a, [k]: true }), {})); return; }
        setErrors({}); setTouched({}); setStep(s => s + 1);
    };

    const handleSubmit = async () => {
        setSending(true); setSendError("");
        const FUNCTION_URL = "https://us-central1-ilovahclean.cloudfunctions.net/sendBookingEmail";
        try {
            const res = await fetch(FUNCTION_URL, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "booking", service: service || "Pest Control Service", date: `${MONTHS[month]} ${selDay}, ${year}`, time: selTime, urgency, firstName, lastName, email, phone, pref, street, suburb, propState, postcode, notes, submittedAt: new Date().toLocaleString("en-AU") }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.error("Booking email error:", data);
                throw new Error(data.error || "Send failed");
            }
            setSubmitted(true); setTimeout(() => { handleClose(); }, 2800);
        } catch (err) {
            console.error("Booking submit error:", err.message);
            setSendError("Failed to send. Please try again or call us directly.");
        }
        finally { setSending(false); }
    };

    return (
        <div className={`il-overlay ${isOpen ? "active" : ""}`} onClick={(e) => e.target === e.currentTarget && handleClose()}>
            <div className="il-modal">
                <div className="il-progress-bar"><div className="il-progress-fill" style={{ width: progressWidth }} /></div>
                <div className="il-stepper">
                    <button className={`il-stepper-back ${step === 1 ? "hidden" : ""}`} onClick={() => setStep(s => s - 1)}>‹</button>
                    <div className="il-steps-wrap">
                        {steps.map((s, i) => {
                            const n = i + 1; const done = n < step; const active = n === step;
                            return (
                                <div key={n} style={{ display: "flex", alignItems: "center" }}>
                                    <div className="il-step-item">
                                        <div className={`il-step-dot ${done ? "done" : ""} ${active ? "active" : ""}`}>{done ? "✓" : n}</div>
                                        <div className={`il-step-label ${active ? "active" : ""} ${done ? "done" : ""}`}>{s.label}</div>
                                    </div>
                                    {i < steps.length - 1 && <div className={`il-step-line ${done ? "done" : ""}`} style={{ marginBottom: 18 }} />}
                                </div>
                            );
                        })}
                    </div>
                    <button className="il-stepper-close" onClick={handleClose}>✕</button>
                </div>
                <div className="il-modal-body">
                    <div className="il-step-content">
                        {step === 1 && <ServicePicker service={service} setService={setService} />}
                        {step === 2 && (
                            <>
                                <h3>Your Contact Details</h3>
                                <p className="il-modal-sub">We'll send your quote within 2 hours</p>
                                {service && <div className="il-selected-svc-pill"><span className="il-selected-svc-check">✓</span><span>Booking: <strong>{service}</strong></span><button onClick={() => setStep(1)} className="il-selected-svc-change">Change</button></div>}
                                {Object.keys(errors).length > 0 && <div className="il-step-error-banner">⚠ Please fill in all required fields before continuing</div>}
                                <div className="il-form-row">
                                    <div className="il-form-group">
                                        <label>First Name <span style={{ color: RED }}>*</span></label>
                                        <input type="text" value={firstName} onChange={e => { setFirstName(e.target.value); if (errors.firstName) setErrors(p => ({ ...p, firstName: "" })); }} onBlur={() => setTouched(p => ({ ...p, firstName: true }))} placeholder="Jane" className={errors.firstName && touched.firstName ? "error" : ""} />
                                        {errors.firstName && touched.firstName && <div className="il-field-error">{errors.firstName}</div>}
                                    </div>
                                    <div className="il-form-group">
                                        <label>Last Name <span style={{ color: RED }}>*</span></label>
                                        <input type="text" value={lastName} onChange={e => { setLastName(e.target.value); if (errors.lastName) setErrors(p => ({ ...p, lastName: "" })); }} onBlur={() => setTouched(p => ({ ...p, lastName: true }))} placeholder="Smith" className={errors.lastName && touched.lastName ? "error" : ""} />
                                        {errors.lastName && touched.lastName && <div className="il-field-error">{errors.lastName}</div>}
                                    </div>
                                </div>
                                <div className="il-form-row">
                                    <div className="il-form-group">
                                        <label>Email <span style={{ color: RED }}>*</span></label>
                                        <input type="email" value={email} onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: "" })); }} onBlur={() => setTouched(p => ({ ...p, email: true }))} placeholder="jane@example.com" className={errors.email && touched.email ? "error" : ""} />
                                        {errors.email && touched.email && <div className="il-field-error">{errors.email}</div>}
                                    </div>
                                    <div className="il-form-group">
                                        <label>Phone <span style={{ color: RED }}>*</span></label>
                                        <input type="tel" value={phone} onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: "" })); }} onBlur={() => setTouched(p => ({ ...p, phone: true }))} placeholder="0400 000 000" className={errors.phone && touched.phone ? "error" : ""} />
                                        {errors.phone && touched.phone && <div className="il-field-error">{errors.phone}</div>}
                                    </div>
                                </div>
                                <div className="il-form-group">
                                    <label>Preferred contact method</label>
                                    <div className="il-contact-pref">
                                        {[{ label: "Phone", ico: "📞" }, { label: "Email", ico: "✉️" }, { label: "SMS", ico: "💬" }].map(p => (
                                            <button key={p.label} className={`il-pref-btn ${pref === p.label ? "active" : ""}`} onClick={() => setPref(p.label)}><span className="il-pref-ico">{p.ico}</span>{p.label}</button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        {step === 3 && <PropertyStep street={street} setStreet={setStreet} suburb={suburb} setSuburb={setSuburb} propState={propState} setPropState={setPropState} postcode={postcode} setPostcode={setPostcode} notes={notes} setNotes={setNotes} errors={errors} touched={touched} setErrors={setErrors} setTouched={setTouched} />}
                        {step === 4 && (
                            <>
                                <h3>Choose Date & Time</h3>
                                <p className="il-modal-sub">Pick a date — highlighted dates have slots</p>
                                {(errors.selDay || errors.selTime) && <div className="il-step-error-banner">⚠ Please select both a date and a time slot</div>}
                                <div className="il-cal-header">
                                    <button className="il-cal-nav" onClick={() => { const prev = new Date(year, month - 1); const n = new Date(); if (prev >= new Date(n.getFullYear(), n.getMonth())) setCalDate(prev); }}>‹</button>
                                    <span className="il-cal-month">{MONTHS[month]} {year}</span>
                                    <button className="il-cal-nav" onClick={() => setCalDate(new Date(year, month + 1))}>›</button>
                                </div>
                                <div className="il-cal-grid">
                                    {DAYS.map(d => <div key={d} className="il-cal-dow">{d}</div>)}
                                    {calCells.map((d, i) => d === null ? <div key={`e${i}`} /> : (
                                        <div key={d} className={`il-cal-day ${isPast(d) ? "past" : ""} ${selDay === d ? "selected" : ""} ${d === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? "today" : ""} ${hasSlots(d) ? "has-slots" : ""}`}
                                            onClick={() => { if (!isPast(d)) { setSelDay(d); setErrors(p => ({ ...p, selDay: "" })); } }}>
                                            {d}
                                            {hasSlots(d) && (() => { const key = `${year}-${month}-${d}`; const taken = (TAKEN_SLOTS[key] || []).length; return <span className="il-slot-count">{TIME_SLOTS.length - taken} slots</span>; })()}
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginBottom: 14 }}>
                                    <div className="il-cal-month" style={{ marginBottom: 10, fontSize: ".9rem" }}>
                                        Available Time Slots{selDay ? ` for ${DAYS[new Date(year, month, selDay).getDay()]}, ${MONTHS[month]} ${selDay}` : ""}
                                    </div>
                                    <div className="il-time-slots">
                                        {TIME_SLOTS.map(slot => {
                                            const isTaken = TAKEN_SLOTS[`${year}-${month}-${selDay}`]?.includes(slot.start);
                                            const isActive = selTime === slot.label && !isTaken;
                                            return <div key={slot.label} className={`il-time-slot ${isActive ? "active" : ""} ${isTaken ? "taken" : ""}`} onClick={() => { if (!isTaken) { setSelTime(slot.label); setErrors(p => ({ ...p, selTime: "" })); } }}>
                                                <span>{slot.label}</span>
                                                {isTaken ? <span style={{ fontSize: ".72rem", color: "#aaa" }}>Booked</span> : <span className="il-slot-status">Available</span>}
                                            </div>;
                                        })}
                                    </div>
                                </div>
                                <div className="il-urgency">
                                    <label>Urgency</label>
                                    <select value={urgency} onChange={e => setUrgency(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${BORDER}`, fontFamily: "'Nunito',sans-serif", fontSize: ".87rem", outline: "none", color: CHARCOAL, background: "#fff" }}>
                                        <option>Flexible — within 2 weeks</option>
                                        <option>Soon — within 3 days</option>
                                        <option>Urgent — ASAP</option>
                                    </select>
                                </div>
                                <div className="il-info-box"><span className="il-info-ico">ℹ️</span><p>We'll confirm your arrival window within <strong>2 hours</strong> of booking.</p></div>
                            </>
                        )}
                        {step === 5 && (
                            <>
                                <h3>Review & Confirm</h3>
                                <p className="il-modal-sub">Double-check before submitting</p>
                                <div className="il-review-card">
                                    <h4>🔧 Service Details</h4>
                                    <div className="il-review-row"><span>Service</span><span>{service || "Pest Control Service"}</span></div>
                                    <div className="il-review-row"><span>Date</span><span>{MONTHS[month]} {selDay}, {year}</span></div>
                                    <div className="il-review-row"><span>Time</span><span>{selTime}</span></div>
                                    <div className="il-review-row"><span>Urgency</span><span>{urgency}</span></div>
                                    <div className="il-review-row"><span>Location</span><span>{suburb}, {propState}</span></div>
                                </div>
                                <div className="il-review-card">
                                    <h4>👤 Contact Details</h4>
                                    <div className="il-review-row"><span>Name</span><span>{firstName} {lastName}</span></div>
                                    <div className="il-review-row"><span>Email</span><span>{email}</span></div>
                                    <div className="il-review-row"><span>Phone</span><span>{phone}</span></div>
                                    <div className="il-review-row"><span>Contact via</span><span>{pref}</span></div>
                                </div>
                                {sendError && <p style={{ color: RED, fontSize: ".82rem", fontWeight: 700, marginBottom: 10, textAlign: "center" }}>{sendError}</p>}
                                <button className={`il-submit-btn ${submitted ? "sent" : ""}`} onClick={handleSubmit} disabled={sending || submitted}>
                                    {submitted ? "✓ Booking Sent! We'll be in touch shortly." : sending ? "Sending…" : "Confirm & Send Booking Request"}
                                </button>
                                <p className="il-terms">By submitting, you agree to our Terms & Privacy Policy.<br />We'll respond within 2 hours.</p>
                            </>
                        )}
                    </div>
                </div>
                {step < 5 && (
                    <div className="il-modal-footer">
                        <span className="il-footer-hint">Step {step} of {steps.length}</span>
                        <button className="il-next-btn" onClick={handleNext}>
                            Continue <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// PEST CONTROL PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function PestControlPage() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    // SEO: meta tags, Open Graph, JSON-LD structured data
    useEffect(() => {
        document.title = "Pest Control Toowoomba | Rest In Pest \u2013 Licensed & Certified | iLovah";

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

        setMeta("description", "Rest In Pest \u2013 Toowoomba\u2019s licensed pest control specialists. Cockroach, ant, spider, rodent control & end-of-lease flea treatments. Safe, certified, guaranteed. Call 0478 711 829 for a free quote.");
        setMeta("keywords", "pest control Toowoomba, cockroach control Toowoomba, ant treatment Toowoomba, spider control Toowoomba, rodent control Toowoomba, flea treatment Toowoomba, end of lease pest control Toowoomba, licensed pest control QLD, Rest In Pest, iLovah pest control, residential pest control Toowoomba, commercial pest control Toowoomba, wasp removal Toowoomba, pest inspection Toowoomba");
        setMeta("robots", "index, follow");
        setMeta("author", "Rest In Pest \u2013 iLovah Cleaning Services");
        setMeta("geo.region", "AU-QLD");
        setMeta("geo.placename", "Toowoomba, Queensland, Australia");
        setMeta("geo.position", "-27.5598;151.9507");
        setMeta("ICBM", "-27.5598, 151.9507");

        setLink("canonical", "https://www.ilovahcleaning.com.au/pest-control");

        setMeta("og:type", "website", "property");
        setMeta("og:title", "Pest Control Toowoomba | Rest In Pest \u2013 Licensed Technicians", "property");
        setMeta("og:description", "Licensed pest control in Toowoomba QLD. Cockroach, ant, spider, rodent & flea treatments for homes and businesses. Family-owned. Free quotes within 1 hour. Call 0478 711 829.", "property");
        setMeta("og:url", "https://www.ilovahcleaning.com.au/pest-control", "property");
        setMeta("og:site_name", "iLovah Cleaning Services & Rest In Pest", "property");
        setMeta("og:locale", "en_AU", "property");

        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", "Rest In Pest \u2013 Licensed Pest Control Toowoomba QLD");
        setMeta("twitter:description", "Cockroach, ant, spider, rodent & flea treatments across Toowoomba. Certified technicians, pet-safe products. Call 0478 711 829.");

        const existing = document.getElementById("rip-jsonld-main");
        if (existing) existing.remove();
        const script = document.createElement("script");
        script.id = "rip-jsonld-main";
        script.type = "application/ld+json";
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": ["LocalBusiness", "ProfessionalService"],
                    "@id": "https://www.ilovahcleaning.com.au/pest-control#business",
                    "name": "Rest In Pest \u2013 Pest Control Toowoomba",
                    "alternateName": ["Rest In Pest", "iLovah Pest Control"],
                    "description": "Licensed and certified pest control specialists serving Toowoomba and surrounding Queensland suburbs. Treatments for cockroaches, ants, spiders, rodents, wasps, fleas, and more. Safe, targeted, and guaranteed results for residential and commercial properties.",
                    "url": "https://www.ilovahcleaning.com.au/pest-control",
                    "telephone": "+610478711829",
                    "email": "ilovahclean@gmail.com",
                    "priceRange": "$$",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "4 Kelfield Street",
                        "addressLocality": "North Toowoomba",
                        "addressRegion": "QLD",
                        "postalCode": "4350",
                        "addressCountry": "AU"
                    },
                    "geo": { "@type": "GeoCoordinates", "latitude": -27.5598, "longitude": 151.9507 },
                    "areaServed": [
                        { "@type": "City", "name": "Toowoomba" },
                        { "@type": "AdministrativeArea", "name": "Queensland" }
                    ],
                    "openingHoursSpecification": [
                        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "07:00", "closes": "18:00" }
                    ],
                    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "87", "bestRating": "5" },
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Pest Control Services Toowoomba",
                        "itemListElement": [
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cockroach Control Toowoomba", "description": "Full cockroach elimination with residual internal and external treatment." } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ant Treatment Toowoomba", "description": "Baiting, barrier spray and nest elimination for all ant species." } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spider Control Toowoomba", "description": "Safe removal and repellent treatment for dangerous and nuisance spiders." } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rodent Control Toowoomba", "description": "Rat and mouse trapping, baiting, and exclusion services." } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wasp and Bee Removal Toowoomba", "description": "Fast, safe nest removal and treatment for wasps and bees." } },
                            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "End of Lease Flea Treatment Toowoomba", "description": "Full property flea treatment for end-of-lease requirements." } }
                        ]
                    },
                    "sameAs": ["https://www.facebook.com/ilovahcleaning", "https://www.instagram.com/ilovahcleaning"]
                },
                {
                    "@type": "FAQPage",
                    "@id": "https://www.ilovahcleaning.com.au/pest-control#faq",
                    "mainEntity": [
                        { "@type": "Question", "name": "Are your pest control technicians licensed in Queensland?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All Rest In Pest technicians are fully licensed and certified under Queensland pest management regulations. We use safe, targeted, and approved treatments for residential and commercial properties." } },
                        { "@type": "Question", "name": "What pests do you treat in Toowoomba?", "acceptedAnswer": { "@type": "Answer", "text": "We treat cockroaches, ants, spiders, rodents (rats and mice), wasps, bees, and fleas across Toowoomba and surrounding QLD suburbs." } },
                        { "@type": "Question", "name": "Are your pest treatments safe for children and pets?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We use pet-safe and child-safe approved products. Our technicians will advise on any short-term precautions needed after treatment." } },
                        { "@type": "Question", "name": "Do you offer end-of-lease flea treatment in Toowoomba?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We provide complete end-of-lease flea treatments to meet real estate agency requirements across Toowoomba and surrounding areas." } },
                        { "@type": "Question", "name": "How quickly can you respond for pest control in Toowoomba?", "acceptedAnswer": { "@type": "Answer", "text": "We respond to all free quote requests within 1 hour during business hours (Mon\u2013Sat 7am\u20136pm) and can often book urgent treatments within 24\u201348 hours." } }
                    ]
                }
            ]
        });
        document.head.appendChild(script);

        return () => { const s = document.getElementById("rip-jsonld-main"); if (s) s.remove(); };
    }, []);

    // Navigate back to main page, passing scroll target via state (no hash in URL)
    const goMain = (section) => {
        setMenuOpen(false);
        navigate("/", { state: { scrollTo: section || null } });
    };
    const go = (id) => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }
        else goMain(id);
    };

    const openQuote = () => { setQuoteOpen(true); setMenuOpen(false); };

    return (
        <div style={{ width: "100%", maxWidth: "100%", margin: 0, padding: 0, overflowX: "hidden" }}>
            <style>{PEST_CSS}</style>

            {/* TOP INFO BAR */}
            <div className={`il-topbar ${scrolled ? "hidden" : ""}`} role="complementary" aria-label="Contact information">
                <div className="il-topbar-left">
                    <a className="il-topbar-item" href="https://maps.google.com/?q=4+Kelfield+Street+North+Toowoomba+QLD" rel="noopener noreferrer" target="_blank" aria-label="Our address: 4 Kelfield Street, North Toowoomba QLD">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        4 Kelfield Street, North Toowoomba QLD, Australia
                    </a>
                    <div className="il-topbar-divider" />
                    <span className="il-topbar-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
                        Mon–Sun: 7AM–7PM
                    </span>
                </div>
                <div className="il-topbar-right">
                    <a className="il-topbar-item" href="tel:0478711829">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>
                        <span style={{ color: RED, fontWeight: 700 }}>0478 711 829</span>
                    </a>
                    <div className="il-topbar-divider" />
                    <a className="il-topbar-item" href="mailto:ilovahclean@gmail.com">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        ilovahclean@gmail.com
                    </a>
                </div>
            </div>

            {/* NAV (same dual brand navbar) */}
            <nav className={`il-nav ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation – Rest In Pest Toowoomba">
                <div className="nav-brands">
                    {/* iLovah brand → back to home */}
                    <a className="brand-ilovah" onClick={() => goMain("")} style={{ cursor: "pointer" }}>
                        <ILovahLogo size={36} />
                        <div className="brand-ilovah-text">
                            <div className="brand-ilovah-t1"><span className="ir">i</span><span className="iw">Lovah</span></div>
                            <div className="brand-ilovah-t2">Cleaning Services</div>
                        </div>
                    </a>
                    <div className="brand-sep" />
                    {/* Rest In Pest brand → current page (no action needed) */}
                    <div className="brand-rip" style={{ cursor: "default" }}>
                        <div className="r1"><span className="rr">REST IN </span>PEST</div>
                        <div className="r2">Control Service</div>
                    </div>
                </div>

                <ul className="il-nav-links-desktop">
                    <li><a onClick={() => goMain("services")}>Cleaning Service</a></li>
                    <li><a className="active-link" onClick={() => go("pest-services")}>Pest Control Service</a></li>
                    <li><a onClick={() => goMain("about")}>About</a></li>
                    <li><a onClick={() => goMain("reviews")}>Reviews</a></li>

                    <li><a onClick={() => goMain("faq")}>FAQ</a></li>
                    <li><a onClick={() => navigate("/blog")}>Blog</a></li>
                    <li>
                        <a className="il-nav-quote" onClick={openQuote}>
                            <img src={imgInsect} alt="" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", marginRight: 4, filter: "brightness(0) invert(1)" }} />
                            Get Instant Quote
                        </a>
                    </li>
                </ul>

                <button className={`il-burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    <span /><span /><span />
                </button>
            </nav>

            {/* Mobile drawer */}
            <div className={`il-nav-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
            <ul className={`il-nav-links ${menuOpen ? "open" : ""}`}>
                <button className="il-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                <li><a onClick={() => goMain("services")}>Cleaning Service</a></li>
                <li><a onClick={() => go("pest-services")}>Pest Control Service</a></li>
                <li><a onClick={() => goMain("about")}>About</a></li>
                <li><a onClick={() => goMain("reviews")}>Reviews</a></li>
                <li><a onClick={() => goMain("faq")}>FAQ</a></li>
                <li><a onClick={() => { navigate("/blog"); setMenuOpen(false); }}>Blog</a></li>
                <li><a className="il-nav-quote" onClick={openQuote}><img src={imgInsect} alt="" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", marginRight: 4, filter: "brightness(0) invert(1)" }} /> Get Instant Quote</a></li>
            </ul>

            {/* HERO */}
            <main>
                <section className="pest-page-hero" aria-label="Rest In Pest – Licensed Pest Control Toowoomba QLD">
                    <div className="bug-bg" aria-hidden="true">🐛</div>
                    <R>
                        <div className="hero-eyebrow ey-red" style={{ margin: "0 auto 24px" }}>
                            <span className="ey-dot dot-r" />
                            Certified Pest Control Toowoomba · Licensed Technicians
                        </div>
                        <h1 className="pest-hero-h1">
                            <span className="hl-red">Rest In</span><br />
                            Pest<span className="hl-red">.</span>
                        </h1>
                        <p className="pest-hero-p">
                            Licensed pest control technicians eliminating cockroaches, ants, spiders, rodents &amp; more across Toowoomba QLD.
                            Safe, targeted, pet-friendly, and guaranteed treatments for homes and businesses.
                        </p>
                        <div className="pest-hero-btns">
                            <button className="btn-red" onClick={() => setBookingOpen(true)}>
                                <img src={imgInsect} alt="" style={{ width: 40, height: 40, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                                Book Pest Treatment
                            </button>
                            <button className="btn-ghost-w" onClick={() => go("pest-services")}>Our Services ↓</button>
                        </div>
                        <div className="pest-hero-stats">
                            <div className="hs"><div className="hs-n clr-red">500+</div><div className="hs-l">Treatments Done</div></div>
                            <div className="hs-sep" />
                            <div className="hs"><div className="hs-n clr-red">8+</div><div className="hs-l">Pest Types</div></div>
                            <div className="hs-sep" />
                            <div className="hs"><div className="hs-n clr-red">100%</div><div className="hs-l">Safe & Certified</div></div>
                        </div>
                    </R>
                </section>

                {/* PEST SERVICES */}
                <section className="pest-section" id="pest-services" aria-label="Pest control services in Toowoomba QLD">
                    <div className="zzz-bug" style={{ top: "12%", right: "4%" }} aria-hidden="true">
                        <img src={imgInsect} alt="" style={{ width: 40, height: 40, objectFit: "contain", filter: "brightness(0) invert(1)" }} /> zzz
                    </div>
                    <div className="zzz-bug" style={{ top: "40%", left: "3%", fontSize: "1rem", animationDelay: "1.5s" }} aria-hidden="true">🐛</div>
                    <div className="zzz-bug" style={{ bottom: "20%", right: "6%", fontSize: ".85rem", animationDelay: "3s" }} aria-hidden="true">zzz</div>

                    <div className="pest-inner">
                        {/* Logo display */}
                        <R className="pest-logo-display">
                            <div className="pest-crescent-wrap">
                                <div className="pest-svg-logo">
                                    <img src={imgLogo2} alt="Rest In Pest – Licensed Pest Control Toowoomba" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "50%" }} />
                                </div>
                                <div className="pest-fact">
                                    <div className="pf-ico"><img src={imgInsect} alt="" style={{ width: 40, height: 40, objectFit: "contain", filter: "brightness(0) invert(1)" }} /></div>
                                    <div><div className="pf-n">500+</div><div className="pf-l">Treatments Done</div></div>
                                </div>
                                <div className="pest-fact">
                                    <div className="pf-ico">🛡️</div>
                                    <div><div className="pf-n">Certified</div><div className="pf-l">Licensed Technicians</div></div>
                                </div>
                            </div>
                        </R>

                        {/* Content */}
                        <R className="pest-content">
                            <div className="section-tag">⚠ Pest Control Toowoomba</div>
                            <h2 className="pest-title"><span className="hl-red">REST IN</span><br />PEST<span className="hl-red">.</span></h2>
                            <p className="pest-tagline">"Sleep Easy, We Handle the Creepy."</p>
                            <p className="pest-desc">
                                Our licensed pest control technicians use safe, targeted treatments to eliminate infestations
                                and protect your Toowoomba property. We handle residential, commercial, and end-of-lease flea treatments
                                across Toowoomba and all surrounding QLD suburbs.
                            </p>

                            <div className="pest-services">
                                {[
                                    { ico: "🪳", title: "Cockroach Control Toowoomba", desc: "Full elimination with residual treatment. Internal & external." },
                                    { ico: "🐜", title: "Ant Treatments Toowoomba", desc: "Baiting, barrier spray and nest elimination for all ant species." },
                                    { ico: "🕷️", title: "Spider Control Toowoomba", desc: "Safe removal and repellent treatment for dangerous & nuisance spiders." },
                                    { ico: "🐭", title: "Rodent Control Toowoomba", desc: "Trapping, baiting and exclusion for rats and mice." },
                                    { ico: "🐝", title: "Wasps & Bees Toowoomba", desc: "Nest removal and treatment. Fast, safe and effective." },
                                    { ico: "🏠", title: "End of Lease Flea Treatment", desc: "Full property flea treatment at end of lease before tenants move in." },
                                ].map((p, i) => (
                                    <div key={i} className="ps-card">
                                        <div className="ps-ico" aria-hidden="true">{p.ico}</div>
                                        <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".82rem", fontWeight: 900, color: "#fff", marginBottom: 5, letterSpacing: "-.01em" }}>{p.title}</h3>
                                        <p>{p.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pest-cta">
                                <button className="btn-red" onClick={() => setBookingOpen(true)}>
                                    <img src={imgInsect} alt="" style={{ width: 40, height: 40, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                                    Book Pest Treatment Now
                                </button>
                            </div>
                        </R>
                    </div>
                </section>

                {/* CTA BAND */}
                <section className="pest-cta-band" aria-label="Book pest control in Toowoomba">
                    <R>
                        <h2>Ready to live <span style={{ color: "rgba(255,255,255,.85)" }}>pest-free in Toowoomba?</span></h2>
                        <p>Contact Rest In Pest today for a free, no-obligation pest control quote. We service Toowoomba, North Toowoomba, East Toowoomba, Harristown, Rangeville, and all surrounding QLD areas.</p>
                        <div className="pest-cta-band-btns">
                            <button className="btn-white" onClick={openQuote}>
                                <img src={imgInsect} alt="" style={{ width: 40, height: 40, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                                Get Instant Quote
                            </button>
                            <a href="tel:0478711829" className="btn-ghost-w" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 9, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".95rem" }}>
                                📞 Call 0478 711 829
                            </a>
                        </div>
                    </R>
                </section>
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
                {/* SEO: visually hidden LocalBusiness microdata for crawlers */}
                <div
                    itemScope
                    itemType="https://schema.org/LocalBusiness"
                    style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}
                    aria-hidden="true"
                >
                    <span itemProp="name">Rest In Pest – Pest Control Toowoomba</span>
                    <span itemProp="telephone">0478 711 829</span>
                    <span itemProp="email">ilovahclean@gmail.com</span>
                    <span itemProp="description">
                        Licensed pest control in Toowoomba QLD. Rest In Pest by iLovah provides cockroach control, ant treatments, spider control, rodent control, wasp removal, and end-of-lease flea treatments across Toowoomba, North Toowoomba, East Toowoomba, Harristown, Rangeville, Newtown, and all surrounding QLD suburbs. Pet-safe, child-safe, certified technicians.
                    </span>
                    <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                        <span itemProp="streetAddress">4 Kelfield Street</span>
                        <span itemProp="addressLocality">North Toowoomba</span>
                        <span itemProp="addressRegion">QLD</span>
                        <span itemProp="postalCode">4350</span>
                        <span itemProp="addressCountry">AU</span>
                    </div>
                    <span itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                        <span itemProp="ratingValue">4.9</span>
                        <span itemProp="reviewCount">87</span>
                    </span>
                </div>

                {/* FOOTER */}
            </main>
            <footer className="il-footer" aria-label="Rest In Pest footer – iLovah Cleaning Services Toowoomba">
                <div className="il-footer-grid">
                    <div className="il-footer-brand">
                        <div className="footer-dual-logo">
                            <div className="fdl-il"><span className="lr">i</span><span className="lw">Lovah</span></div>
                            <div className="fdl-sep" />
                            <div className="fdl-rip"><span className="r">REST IN </span><span className="w">PEST</span></div>
                        </div>
                        <p>Family-owned and community-focused. Proudly serving Toowoomba and surrounds with licensed pest control and professional cleaning services — cockroaches, ants, spiders, rodents, and more.</p>
                    </div>
                    <div className="il-footer-col">
                        <h3>Pest Control</h3>
                        <ul>
                            {["Cockroach Control", "Ant Treatments", "Spider Control", "Rodent Control", "End of Lease Flea Treatment"].map(s => (
                                <li key={s}><a href="#pest-services" aria-label={`${s} in Toowoomba QLD`}>{s}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="il-footer-col">
                        <h3>Cleaning Services</h3>
                        <ul>
                            {["Bond Cleaning", "Dry Carpet Cleaning", "Window Cleaning", "Gutter Cleaning", "Pressure Washing"].map(s => (
                                <li key={s}><a onClick={() => goMain("services")} style={{ cursor: "pointer" }} aria-label={`${s} in Toowoomba QLD`}>{s}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="il-footer-col">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><a href="tel:0478711829"><span className="fc-icon">📞</span> 0478 711 829</a></li>
                            <li><a href="mailto:ilovahclean@gmail.com"><span className="fc-icon">✉</span> ilovahclean@gmail.com</a></li>
                            <li><a href="#"><span className="fc-icon">📍</span> North Toowoomba QLD</a></li>
                            <li><a href="#"><span className="fc-icon">🕐</span> Mon–Sat 7am–6pm</a></li>
                            <li><a onClick={openQuote} style={{ cursor: "pointer" }}><span className="fc-icon">💬</span> Get Instant Quote</a></li>
                        </ul>
                    </div>
                </div>
                <div className="il-footer-bottom">
                    <div>© 2025 <span style={{ color: "red" }}>iLovah Cleaning Services</span> &amp; <span style={{ color: "red" }}>Rest In Pest Control</span>. All rights reserved. ABN provided. Licensed Pest Control Toowoomba QLD.</div>
                    <div className="il-footer-bottom-right">
                        <span>Made with <span className="hrt">♥</span> in Toowoomba, QLD</span>
                    </div>
                </div>
            </footer>

            {/* ── MODALS ── */}
            <GetQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} initialService="Pest Control Service (General)" />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} initialService="Pest Control Service" />

            {/* ── FLOATING QUOTE CTA ── */}
            <div className="float-cta">
                <a onClick={openQuote}>
                    <img src={imgInsect} alt="" style={{ width: 40, height: 40, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                    GET INSTANT QUOTE
                </a>
            </div>
        </div>
    );
}