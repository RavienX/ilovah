import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import PageFooter from "./PageFooter";
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
import { saveBooking, saveQuote } from "./firebaseConfig";

// ── Design tokens (shared) ─────────────────────────────────────────────────
const RED = "#2B8FD4";
const RED2 = "#4AABDB";
const RED_DK = "#1a6fa8";
const RED_GLOW = "rgba(43,143,212,0.4)";
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
const PEST_BG = "#ffffff";
const BORDER = "#e8e8e8";
const CREAM = "#fdfaf9";
const CHARCOAL = "#1a1a1a";
const RED_LT = "#e8f4fd";

// ── Services data (shared with main page) ─────────────────────────────────
const SERVICES_DATA = [
    {
        name: "Dry Carpet Cleaning", emoji: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 3 5 7l11 11 4-4L9 3z'/><path d='m5 7-3 13 7-3'/><path d='m22 3-3 3'/></svg>", price: "From $89", img: imgCarpet,
        desc: "Dry carpet cleaning that removes dirt, stains, and allergens using minimal moisture — carpets are ready to walk on straight away, fully dry in just one to two hours.",
        bullets: ["Dry carpet cleaning", "Duration: 2–4 hours"],
        duration: "2–4 hours", ideal: "Homes, offices & rentals",
        steps: [
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.35-4.35'/></svg>", title: "Inspection", desc: "We assess carpet condition, fibre type, and stain locations before starting." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 2h6l1 4H8z'/><rect x='6' y='6' width='12' height='16' rx='2'/><path d='M8 14h8M8 18h5'/></svg>", title: "Pre-treatment", desc: "Stains and high-traffic areas are pre-treated with professional dry solutions." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 2a10 10 0 1 0 10 10'/><path d='M12 8a4 4 0 1 0 4 4'/><path d='M12 12h.01'/></svg>", title: "Dry Cleaning", desc: "Low-moisture dry compound is worked deep into fibres, lifting dirt, allergens, and bacteria without soaking." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2'/><path d='M9.6 4.6A2 2 0 1 1 11 8H2'/><path d='M12.6 19.4A2 2 0 1 0 14 16H2'/></svg>", title: "Ready Instantly", desc: "No wet carpets — fully dry in 1–2 hours and walkable straight away." },
        ],
        includes: ["All rooms & hallways", "Stain pre-treatment", "Deodorising", "Furniture moved on request"],
    },
    {
        name: "End of Lease Cleaning", emoji: "truck", price: "From $249", img: imgEndOfLease,
        desc: "We promise to promptly address and rectify any cleaning issues your property manager identifies during the final inspection, ensuring your bond is secured.",
        bullets: ["Bond Back Guarantee", "Duration: 4–8 hours"],
        duration: "4–8 hours", ideal: "Renters & landlords",
        steps: [
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='8' y='2' width='8' height='4' rx='1'/><path d='M8 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2'/><path d='m9 14 2 2 4-4'/></svg>", title: "Checklist Review", desc: "We follow your real estate agent's exact end-of-lease checklist." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M3 11l19-9-9 19-2-8z'/></svg>", title: "Kitchen & Bathrooms", desc: "Deep scrub of oven, stovetop, sinks, tiles, and all fixtures." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='2' y='2' width='20' height='20' rx='2'/><path d='M2 12h20M12 2v20'/></svg>", title: "Windows & Walls", desc: "Interior windows, tracks, skirting boards, and wall marks cleaned." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><path d='M20 6 9 17l-5-5'/></svg>", title: "Final Walkthrough", desc: "We check every room before leaving — bond back guaranteed." },
        ],
        includes: ["Full kitchen deep clean", "Bathroom & toilet scrub", "Interior windows", "Oven & rangehood", "Skirting boards & doors", "Bond back guarantee"],
    },
    {
        name: "Gutter Cleaning", emoji: "leaf", price: "From $120", img: imgGutter,
        desc: "Protect your property with precision. Our discreet, thorough gutter cleaning ensures seamless drainage and lasting curb appeal.",
        bullets: ["Precision gutter cleaning", "Duration: 2–3 hours"],
        duration: "2–3 hours", ideal: "Houses & commercial buildings",
        steps: [
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/><polyline points='9 22 9 12 15 12 15 22'/></svg>", title: "Roof Access", desc: "Safely access your gutters using ladders and harness equipment." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z'/><path d='M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'/></svg>", title: "Debris Removal", desc: "Remove all leaves, twigs, dirt, and blockages by hand and blower." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'/></svg>", title: "Flush & Test", desc: "Gutters are flushed with water to confirm clear drainage flow." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.35-4.35'/></svg>", title: "Damage Report", desc: "We flag any cracks, sagging, or rust for your attention." },
        ],
        includes: ["All gutters & downpipes", "Debris bagged & removed", "Water flow test", "Minor blockage clearing", "Damage report if found"],
    },
    {
        name: "Window Cleaning", emoji: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='2' y='2' width='20' height='20' rx='2'/><path d='M2 12h20M12 2v20'/></svg>", price: "From $79", img: imgWindow,
        desc: "Professional window cleaning for streak-free, crystal-clear results — inside and out.",
        bullets: ["Spotless, streak-free window cleaning", "Duration: Varies"],
        duration: "1–3 hours", ideal: "Homes & businesses",
        steps: [
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='3' width='18' height='18' rx='3'/><path d='M3 9h18M3 15h18M9 3v18M15 3v18'/></svg>", title: "Frame & Track Clean", desc: "Frames, sills, and tracks wiped down to remove built-up grime." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='2' y='2' width='20' height='20' rx='2'/><path d='M2 12h20M12 2v20'/></svg>", title: "Interior Glass", desc: "Inside surfaces cleaned with streak-free solution and microfibre cloths." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z'/><path d='M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97'/></svg>", title: "Exterior Glass", desc: "Outside glass cleaned with water-fed pole or squeegee system." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z'/></svg>", title: "Streak-Free Finish", desc: "Final polish ensures crystal-clear, spot-free results every time." },
        ],
        includes: ["Interior & exterior glass", "Window frames & sills", "Sliding door tracks", "Streak-free guarantee", "Fly screens cleaned on request"],
    },
    {
        name: "Pram Cleaning", emoji: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 12h.01M15 12h.01'/><path d='M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5'/><path d='M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5.5 4.5 1.4'/></svg>", price: "From $49", img: imgPram,
        desc: "Safe, thorough sanitising of prams and strollers to keep your little one's ride fresh and hygienic.",
        bullets: ["The Pram Patch", "Duration: Varies"],
        duration: "1–2 hours", ideal: "Families with young children",
        steps: [
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'/></svg>", title: "Disassembly", desc: "Fabric, harness, and removable parts are carefully taken apart." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M18 8h1a4 4 0 0 1 0 8h-1'/><path d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z'/><line x1='6' y1='1' x2='6' y2='4'/><line x1='10' y1='1' x2='10' y2='4'/><line x1='14' y1='1' x2='14' y2='4'/></svg>", title: "Hand Wash", desc: "All fabric components washed with baby-safe, non-toxic detergents." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0'/><path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41'/></svg>", title: "Sanitising", desc: "Frame, wheels, and buckles sanitised to remove bacteria and mould." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 12h.01M15 12h.01'/><path d='M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5'/><path d='M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5.5 4.5 1.4'/></svg>", title: "Reassembly", desc: "Pram reassembled, dried, and ready for your little one." },
        ],
        includes: ["Fabric hand wash", "Frame sanitising", "Wheel & buckle clean", "Baby-safe products only", "Mould treatment if needed"],
    },
    {
        name: "Pest Control Service", emoji: "bug", price: "From $150", img: imgPest,
        desc: "Safe and effective pest treatment for homes and businesses, keeping unwanted visitors out for good.",
        bullets: ["Professional service", "Duration: Varies"],
        duration: "1–3 hours", ideal: "Residential and Commercial Property Treatment",
        steps: [
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='11' cy='11' r='8'/><path d='m21 21-4.35-4.35'/></svg>", title: "Pest Inspection", desc: "We identify the type and extent of infestation before treatment." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M13 4h3a2 2 0 0 1 2 2v14'/><path d='M2 20h3'/><path d='M13 20h9'/><path d='M10 12v.01'/><path d='M13 4.562v16.157a1 1 0 0 1-1.279.962L5 20V5.562a2 2 0 0 1 1.279-1.859L12 2a1 1 0 0 1 1 1z'/></svg>", title: "Entry Point Check", desc: "Gaps, cracks, and access points are identified and noted." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2'/><path d='M8.5 2h7'/><path d='M14.5 16h-5'/></svg>", title: "Treatment Applied", desc: "Targeted, pet-safe treatments applied inside and outside the property." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='4' width='18' height='18' rx='2'/><line x1='16' y1='2' x2='16' y2='6'/><line x1='8' y1='2' x2='8' y2='6'/><line x1='3' y1='10' x2='21' y2='10'/><path d='M8 14h.01M12 14h.01M16 14h.01'/></svg>", title: "Follow-up Plan", desc: "We recommend a maintenance schedule to keep pests away long-term." },
        ],
        includes: ["Full property inspection", "Interior & exterior treatment", "Pet & child safe products", "Common pests covered", "Follow-up visit if needed"],
    },
    {
        name: "Pressure Washing", emoji: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'/></svg>", price: "From $99", img: imgPressure,
        desc: "Professional pressure washing for buildings, walkways, and common areas. Ideal for property managers, clinics, and commercial spaces.",
        bullets: ["Professional pressure washing", "Duration: 2–4 hours"],
        duration: "2–4 hours", ideal: "Driveways, decks & exteriors",
        steps: [
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 3 5 7l11 11 4-4L9 3z'/><path d='m5 7-3 13 7-3'/><path d='m22 3-3 3'/></svg>", title: "Surface Prep", desc: "Loose debris swept away and delicate areas protected before washing." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 2h6l1 4H8z'/><rect x='6' y='6' width='12' height='16' rx='2'/><path d='M8 14h8M8 18h5'/></svg>", title: "Pre-soak", desc: "Degreaser or mould treatment applied to stubborn stains." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z'/><path d='M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97'/></svg>", title: "High-Pressure Wash", desc: "Professional-grade pressure washer blasts away grime, oil, and algae." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><path d='M20 6 9 17l-5-5'/></svg>", title: "Rinse & Inspect", desc: "Surface rinsed clean and inspected for any missed areas." },
        ],
        includes: ["Driveways & paths", "Decks & patios", "Fences & walls", "Garage floors", "Mould & algae treatment"],
    },
    {
        name: "General House Clean", emoji: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z'/></svg>", price: "From $89", img: imgGeneral,
        desc: "Regular maintenance cleaning covering all rooms — dusting, vacuuming, mopping, and surface sanitising.",
        bullets: ["Crystal-clear windows", "Duration: 1–3 hours"],
        duration: "2–4 hours", ideal: "Weekly, fortnightly or monthly",
        steps: [
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 2a10 10 0 1 0 10 10'/><path d='M12 8a4 4 0 1 0 4 4'/><path d='M12 12h.01'/></svg>", title: "Dusting & Surfaces", desc: "All surfaces, shelves, and fixtures dusted from top to bottom." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M9 3 5 7l11 11 4-4L9 3z'/><path d='m5 7-3 13 7-3'/><path d='m22 3-3 3'/></svg>", title: "Vacuuming", desc: "Carpets, rugs, and hard floors vacuumed throughout the home." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0z'/><path d='M4 10h16'/></svg>", title: "Mopping", desc: "Hard floors mopped with appropriate solution for floor type." },
            { icon: "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m4 4 2.5 2.5'/><path d='M13.5 6.5a4.95 4.95 0 0 0-7 7'/><path d='M15 5 5 15'/><path d='M14 17v.01M10 16v.01M13 13v.01M16 10v.01M11 20v.01M17 14v.01M20 11v.01'/></svg>", title: "Bathrooms & Kitchen", desc: "Sinks, benches, stovetop, toilets, and mirrors cleaned and sanitised." },
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
                                    <img src={s.img} alt={s.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 8 }} />
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
                    <button className="il-loc-btn" onClick={handleLocate}><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg> Use my current location</button>
                    {locStatus && <p style={{ fontSize: ".74rem", color: locStatus.startsWith("✓") ? "#16a34a" : RED, marginTop: 7, fontWeight: 700 }}>{locStatus}</p>}
                </div>
                <div>
                    <div className="il-form-group" style={{ marginBottom: 8 }}><label>Coverage Map</label></div>
                    <div className="il-map-placeholder">
                        <div className="il-map-label"><span className="pin"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg></span> Toowoomba &amp; Surrounds</div>
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
    radial-gradient(ellipse 70% 60% at 50% 40%,rgba(43,143,212,0.08),transparent 70%),
    radial-gradient(ellipse 40% 40% at 0% 100%,rgba(74,171,219,0.06),transparent 60%);
}
.bug-bg{position:absolute;right:-40px;bottom:-20px;width:22rem;height:22rem;opacity:.04;user-select:none;pointer-events:none;animation:bugCreep 20s ease-in-out infinite;color:#fff}
@keyframes bugCreep{0%,100%{transform:translate(0,0) rotate(-10deg)}50%{transform:translate(-20px,-15px) rotate(5deg)}}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:50px;margin-bottom:24px;font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;width:fit-content;position:relative;z-index:3}
.ey-red{background:rgba(43,143,212,0.1);border:1px solid rgba(43,143,212,0.3);color:${RED_DK}}
.ey-dot{width:7px;height:7px;border-radius:50%;animation:dotPulse 2s infinite}
.dot-r{background:${RED}}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.3}}
.pest-hero-h1{font-family:'Black Ops One',cursive;font-weight:400;line-height:1.1;letter-spacing:.02em;font-size:clamp(2.8rem,6vw,4.8rem);color:#fff;position:relative;z-index:3;margin-bottom:20px}
.pest-hero-h1 .hl-red{color:${RED};text-shadow:0 0 30px rgba(43,143,212,.25)}
.pest-hero-p{font-size:1.02rem;line-height:1.72;color:rgba(255,255,255,.6);max-width:540px;margin:0 auto 36px;position:relative;z-index:3}
.pest-hero-btns{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;position:relative;z-index:3}
.pest-hero-stats{display:flex;gap:36px;margin-top:48px;flex-wrap:wrap;justify-content:center;position:relative;z-index:3}
.hs{text-align:center}
.hs-n{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.8rem;line-height:1;color:#fff}
.hs-n.clr-red{color:${RED2}}
.hs-l{font-size:.68rem;font-weight:800;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:.08em;margin-top:3px}
.hs-sep{width:1px;background:rgba(255,255,255,.15);align-self:stretch}

/* ── PEST SECTION (main content block) ── */
.pest-section{
  background:${PEST_BG};
  padding:80px 5%;
  position:relative;overflow:hidden;
}
.pest-section::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 50% at 0% 50%,rgba(43,143,212,0.06),transparent 65%),
             radial-gradient(ellipse 50% 60% at 100% 80%,rgba(74,171,219,0.05),transparent 60%);
  pointer-events:none;
}
.zzz-bug{
  position:absolute;font-size:1.1rem;color:rgba(43,143,212,0.3);
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
  position:relative;width:440px;height:440px;flex-shrink:0;
}
.rip-crescent{width:320px;height:320px}
.pest-svg-logo{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:380px;height:380px;border-radius:20px;overflow:hidden;
  border:3px solid rgba(43,143,212,0.25);
  box-shadow:0 12px 48px rgba(43,143,212,0.18);
}
.pest-fact{
  position:absolute;background:#fff;
  border:1px solid ${BORDER};border-radius:12px;
  padding:10px 14px;display:flex;align-items:center;gap:10px;
  backdrop-filter:blur(8px);
  box-shadow:0 8px 28px rgba(0,0,0,0.1);
  white-space:nowrap;
}
.pest-fact:first-of-type{top:8%;right:-10px}
.pest-fact:last-of-type{bottom:15%;right:-20px}
.pf-ico{font-size:1.4rem;display:flex;align-items:center;justify-content:center}
.pf-n{font-family:'Montserrat',sans-serif;font-weight:900;font-size:.95rem;color:${DARK};line-height:1}
.pf-l{font-size:.66rem;color:${MID};margin-top:2px;text-transform:uppercase;letter-spacing:.06em}
.pest-content{display:flex;flex-direction:column;gap:4px}
.section-tag{
  display:inline-flex;align-items:center;gap:6px;
  font-size:.7rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;
  color:${RED2};background:rgba(43,143,212,0.1);
  border:1px solid rgba(43,143,212,0.2);border-radius:50px;
  padding:5px 14px;width:fit-content;margin-bottom:20px;
}
.pest-title{
  font-family:'Black Ops One',cursive;
  font-size:clamp(2.4rem,4vw,4rem);color:${DARK};
  line-height:1.1;letter-spacing:.02em;margin-bottom:10px;
}
.pest-title .hl-red{color:${RED};text-shadow:0 0 30px rgba(43,143,212,.25)}
.pest-tagline{font-family:'Montserrat',sans-serif;font-style:italic;font-weight:700;font-size:1.1rem;color:${RED2};margin-bottom:20px;letter-spacing:-.01em}
.pest-desc{font-size:.97rem;line-height:1.72;color:${MID};margin-bottom:36px;max-width:520px}
.pest-services{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:36px}
.ps-card{
  background:#fff;border:1px solid ${BORDER};
  border-radius:14px;padding:18px 14px;transition:all .25s;
  box-shadow:0 2px 10px rgba(0,0,0,0.03);
}
.ps-card:hover{background:rgba(43,143,212,0.05);border-color:rgba(43,143,212,0.3);transform:translateY(-3px)}
.ps-ico{margin-bottom:8px;display:flex;align-items:center;justify-content:center;color:${RED}}
.ps-card h4{font-family:'Montserrat',sans-serif;font-size:.82rem;font-weight:900;color:${DARK};margin-bottom:5px;letter-spacing:-.01em}
.ps-card p{font-size:.74rem;color:${MID};line-height:1.55}
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
.pest-why-card:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(0,0,0,.1);border-color:rgba(43,143,212,.25)}
.pest-why-ico{margin-bottom:14px;display:flex;align-items:center;justify-content:center}
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
.pest-step:hover{border-color:rgba(43,143,212,.4);background:rgba(43,143,212,.06);transform:translateY(-3px)}
.pest-step-num{font-family:'Montserrat',sans-serif;font-weight:900;font-size:2.4rem;color:rgba(43,143,212,.18);line-height:1;margin-bottom:10px}
.pest-step-ico{margin-bottom:10px;display:flex;align-items:center;justify-content:center}
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
.il-gq-submit{width:100%;padding:15px;background:linear-gradient(135deg,${RED},${RED_DK});color:#fff;border:none;border-radius:12px;font-family:'Nunito',sans-serif;font-size:1rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .25s;box-shadow:0 4px 16px rgba(43,143,212,.35);letter-spacing:-.01em;margin-top:4px}
.il-gq-submit:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 24px rgba(43,143,212,.4)}
.il-gq-submit:disabled{opacity:.7;cursor:not-allowed;transform:none}
.il-gq-submit.sent{background:#16a34a;box-shadow:0 4px 16px rgba(22,163,74,.35)}
.il-gq-disclaimer{font-size:.74rem;color:${MID};text-align:center;line-height:1.5;padding:0 4px}

/* ── SHARED LAYOUT ── */
.il-wrap{max-width:1200px;margin:0 auto;padding:0 5%}
.sec-tag-blue{display:inline-flex;align-items:center;gap:6px;font-size:.7rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:${BLUE2};background:rgba(74,171,219,0.1);border:1px solid rgba(74,171,219,0.2);border-radius:50px;padding:5px 14px;margin-bottom:14px}
.sec-tag-red{display:inline-flex;align-items:center;gap:6px;font-size:.7rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:${RED2};background:rgba(43,143,212,0.1);border:1px solid rgba(43,143,212,0.2);border-radius:50px;padding:5px 14px;margin-bottom:14px}
.sec-h2{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(1.8rem,3vw,2.4rem);letter-spacing:-.04em;line-height:1.08;margin-bottom:14px;color:${DARK}}
.sec-h2-white{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(1.8rem,3vw,2.4rem);letter-spacing:-.04em;line-height:1.08;margin-bottom:14px;color:#fff}
.sec-sub{font-size:.95rem;color:${MID};line-height:1.72;margin-bottom:40px;max-width:560px}
.hl-red{color:${RED}}

/* ── BOOKING MODAL ── */
.il-overlay{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;pointer-events:none;transition:opacity .3s ease;backdrop-filter:blur(6px)}
.il-overlay.active{opacity:1;pointer-events:all}
.il-modal{background:#fff;border-radius:24px;width:min(680px,100%);max-height:92vh;overflow-y:auto;box-shadow:0 40px 100px rgba(0,0,0,.25);display:flex;flex-direction:column}
.il-progress-bar{height:3px;background:rgba(43,143,212,.12);border-radius:3px 3px 0 0;overflow:hidden}
.il-progress-fill{height:100%;background:linear-gradient(90deg,${RED},${RED2});transition:width .4s ease;border-radius:3px}
.il-stepper{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid ${BORDER};gap:8px}
.il-stepper-back,.il-stepper-close{background:none;border:1.5px solid ${BORDER};border-radius:9px;width:34px;height:34px;cursor:pointer;font-size:1rem;color:${MID};display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;font-family:'Nunito',sans-serif}
.il-stepper-back:hover,.il-stepper-close:hover{border-color:${RED};color:${RED};background:${RED_LT}}
.il-stepper-back.hidden{visibility:hidden}
.il-steps-wrap{display:flex;align-items:center;flex:1;justify-content:center;flex-wrap:wrap;gap:0}
.il-step-item{display:flex;flex-direction:column;align-items:center;gap:4px}
.il-step-dot{width:28px;height:28px;border-radius:50%;border:2px solid ${BORDER};background:#fff;color:${MID};font-size:.8rem;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .3s;font-family:'Montserrat',sans-serif}
.il-step-dot.active{border-color:${RED};background:${RED};color:#fff;box-shadow:0 3px 10px rgba(43,143,212,.3)}
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
.il-step-error-banner{background:#fff0f0;border:1.5px solid rgba(43,143,212,.25);border-radius:9px;padding:10px 14px;font-size:.83rem;color:${RED};font-weight:700;margin-bottom:14px}
.il-contact-pref{display:flex;gap:8px;flex-wrap:wrap}
.il-pref-btn{display:flex;align-items:center;gap:6px;padding:9px 16px;border-radius:8px;border:1.5px solid ${BORDER};background:#fff;font-size:.85rem;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .2s}
.il-pref-btn.active{border-color:${RED};background:${RED_LT};color:${RED}}
.il-selected-svc-pill{display:flex;align-items:center;gap:8px;background:${RED_LT};border:1px solid rgba(43,143,212,.2);border-radius:8px;padding:8px 12px;font-size:.84rem;margin-bottom:16px}
.il-selected-svc-check{color:${RED};font-weight:900}
.il-selected-svc-change{background:none;border:none;color:${RED};cursor:pointer;font-size:.8rem;font-weight:700;font-family:'Nunito',sans-serif;margin-left:auto;text-decoration:underline}
.il-svc-pick-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:8px}
.il-svc-pick{border:1.5px solid ${BORDER};border-radius:12px;padding:14px;cursor:pointer;transition:all .25s;background:#fff}
.il-svc-pick.selected{border-color:${RED};background:${RED_LT};box-shadow:0 4px 16px rgba(43,143,212,.12)}
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
.il-cal-day.selected{background:${RED};color:#fff;border-color:${RED};box-shadow:0 3px 9px rgba(43,143,212,.26)}
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
.il-info-box{background:${RED_LT};border:1px solid rgba(43,143,212,.18);border-radius:8px;padding:11px 13px;display:flex;gap:8px;align-items:flex-start}
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
.il-submit-btn{width:100%;padding:13px;background:${RED};color:#fff;border:none;border-radius:9px;font-size:.93rem;font-weight:900;cursor:pointer;transition:all .25s;font-family:'Nunito',sans-serif;margin-top:7px;letter-spacing:-.01em;box-shadow:0 4px 13px rgba(43,143,212,.24)}
.il-submit-btn:hover{background:${RED_DK};transform:translateY(-1px)}
.il-submit-btn.sent{background:#16a34a;box-shadow:0 4px 13px rgba(22,163,74,.26)}
.il-terms{font-size:.71rem;color:${MID};text-align:center;margin-top:9px;line-height:1.55}
.il-modal-footer{padding:14px 28px;border-top:1px solid ${BORDER};background:#fff;display:flex;justify-content:space-between;align-items:center}
.il-footer-hint{font-size:.74rem;color:${MID};font-weight:600}
.il-next-btn{background:${CHARCOAL};color:#fff;padding:10px 26px;border-radius:8px;font-size:.87rem;font-weight:900;cursor:pointer;border:none;display:flex;align-items:center;gap:6px;transition:all .25s;font-family:'Nunito',sans-serif;letter-spacing:-.01em}
.il-next-btn:hover{background:${RED};transform:translateY(-1px);box-shadow:0 5px 14px rgba(43,143,212,.26)}
.il-next-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none;background:${CHARCOAL}}
.il-property-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.il-map-placeholder{border-radius:10px;border:1.5px solid ${BORDER};overflow:hidden}
.il-map-label{background:#fff;padding:8px 12px;display:flex;align-items:center;gap:5px;border-bottom:1px solid ${BORDER};font-size:.78rem;font-weight:700}
.il-map-label .pin{color:${RED}}
.il-map-note{font-size:.74rem;color:${MID};margin-top:6px;line-height:1.5}
.il-loc-btn{display:inline-flex;align-items:center;gap:5px;font-size:.79rem;color:${RED};font-weight:700;cursor:pointer;background:${RED_LT};border:1.5px solid rgba(43,143,212,.18);padding:5px 12px;border-radius:7px;font-family:'Nunito',sans-serif;margin-top:9px;transition:all .2s}
.il-loc-btn:hover{background:rgba(43,143,212,.12)}

/* ── FAQ SECTION (visible, matches FAQPage schema) ── */
.pest-faq-section{background:${OFFWHITE};padding:80px 5%;position:relative}
.pest-faq-inner{max-width:800px;margin:0 auto}
.pest-faq-list{display:flex;flex-direction:column;gap:8px;margin-top:32px}
.pest-faq-item{border:1.5px solid ${BORDER};border-radius:14px;overflow:hidden;background:#fff;transition:border-color .25s,box-shadow .25s}
.pest-faq-item.open{border-color:rgba(43,143,212,.35);box-shadow:0 6px 24px rgba(43,143,212,.09)}
.pest-faq-q{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;cursor:pointer;font-weight:800;font-size:.93rem;color:${DARK};gap:12px;font-family:'Montserrat',sans-serif;background:none;border:none;width:100%;text-align:left;transition:color .2s}
.pest-faq-item.open .pest-faq-q{color:${RED}}
.pest-faq-icon{width:24px;height:24px;border-radius:50%;border:1.5px solid rgba(43,143,212,.25);display:flex;align-items:center;justify-content:center;color:${RED};font-size:.85rem;font-weight:900;transition:transform .3s,background .2s;flex-shrink:0;line-height:1}
.pest-faq-item.open .pest-faq-icon{transform:rotate(45deg);background:${RED};color:#fff;border-color:${RED}}
.pest-faq-a{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.4,0,.2,1),padding .3s;font-size:.88rem;color:${MID};line-height:1.75;padding:0 22px}
.pest-faq-item.open .pest-faq-a{max-height:300px;padding:0 22px 20px}
.pest-faq-a-inner{border-top:1px solid ${BORDER};padding-top:14px}

/* ── RESPONSIVE ── */
@media(min-width:901px){
}
@media(max-width:1024px){
  .pest-inner{grid-template-columns:1fr;gap:48px;text-align:center}
  .pest-logo-display{justify-content:center}
  .pest-crescent-wrap{width:340px;height:340px}
  .pest-svg-logo{width:300px;height:300px}
  .rip-crescent{width:280px;height:280px}
  .pest-services{grid-template-columns:repeat(3,1fr)}
  .pest-cta{justify-content:center}
  .pest-desc{margin:0 auto 36px}
  .pest-why-grid{grid-template-columns:1fr 1fr}
  .pest-process-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:900px){
  .pest-services{grid-template-columns:1fr 1fr}
  .il-modal-body{padding:18px 16px}
  .il-modal-footer{padding:13px 16px}
  .il-svc-pick-grid{grid-template-columns:1fr}
  .il-property-grid{grid-template-columns:1fr}
  .il-form-row{grid-template-columns:1fr}
  .il-time-slots{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:600px){
  .pest-services{grid-template-columns:1fr 1fr}
  .pest-why-grid{grid-template-columns:1fr}
  .pest-process-grid{grid-template-columns:1fr 1fr}
  .il-time-slots{grid-template-columns:1fr 1fr}
  .pest-crescent-wrap{width:280px;height:280px}
  .pest-svg-logo{width:250px;height:250px}
  .pest-fact{padding:8px 11px}
  .pf-n{font-size:.84rem}
}
@media(max-width:480px){
  .pest-process-grid{grid-template-columns:1fr}
  .pest-crescent-wrap{width:240px;height:240px}
  .pest-svg-logo{width:215px;height:215px;border-radius:16px}
}
`;

// ── Logo ─────────────────────────────────────────────────────────────────────
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
        const payload = { firstName, phone, email, service, address, notes, submittedAt: new Date().toLocaleString("en-AU"), type: "quote" };
        try {
            // Save to Firebase (also auto-creates/updates lead)
            await saveQuote(payload);
            // Send email notification
            const res = await fetch(QUOTE_FUNCTION_URL, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
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
                            <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg></div>
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
                                {sending ? "Sending…" : <><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" /></svg> Get Instant Quote</>}
                            </button>
                            <p className="il-gq-disclaimer"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> No spam. We respond within 1 hour during business hours.</p>
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
        const payload = {
            type: "booking",
            service: service || "Pest Control Service",
            date: `${MONTHS[month]} ${selDay}, ${year}`,
            time: selTime, urgency,
            firstName, lastName, email, phone, pref,
            street, suburb, propState, postcode, notes,
            submittedAt: new Date().toLocaleString("en-AU"),
        };
        try {
            // Save to Firebase (also auto-creates/updates lead)
            await saveBooking(payload);
            // Send email notification
            const res = await fetch(FUNCTION_URL, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
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
                                {Object.keys(errors).length > 0 && <div className="il-step-error-banner"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "middle", marginRight: 4, flexShrink: 0 }}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> Please fill in all required fields before continuing</div>}
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
                                        {[{ label: "Phone", ico: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg> }, { label: "Email", ico: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> }, { label: "SMS", ico: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> }].map(p => (
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
                                {(errors.selDay || errors.selTime) && <div className="il-step-error-banner"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "middle", marginRight: 4, flexShrink: 0 }}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> Please select both a date and a time slot</div>}
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
                                <div className="il-info-box"><span className="il-info-ico"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg></span><p>We'll confirm your arrival window within <strong>2 hours</strong> of booking.</p></div>
                            </>
                        )}
                        {step === 5 && (
                            <>
                                <h3>Review & Confirm</h3>
                                <p className="il-modal-sub">Double-check before submitting</p>
                                <div className="il-review-card">
                                    <h4><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "middle", marginRight: 5 }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg> Service Details</h4>
                                    <div className="il-review-row"><span>Service</span><span>{service || "Pest Control Service"}</span></div>
                                    <div className="il-review-row"><span>Date</span><span>{MONTHS[month]} {selDay}, {year}</span></div>
                                    <div className="il-review-row"><span>Time</span><span>{selTime}</span></div>
                                    <div className="il-review-row"><span>Urgency</span><span>{urgency}</span></div>
                                    <div className="il-review-row"><span>Location</span><span>{suburb}, {propState}</span></div>
                                </div>
                                <div className="il-review-card">
                                    <h4><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "middle", marginRight: 5 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> Contact Details</h4>
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
// PRESSURE WASHING PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function PressureWashingPage() {
    const navigate = useNavigate();
    const [quoteOpen, setQuoteOpen] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        const BASE_URL = "https://www.ilovahcleaningservices.com.au";
        document.title = "Pressure Washing Toowoomba | Driveways, Decks & Fences – iLovah";

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

        setMeta("description", "High-pressure cleaning for driveways, decks, fences & exteriors in Toowoomba. Looking brand new again. Free quotes within 1 hour. Call 0478 711 829.");
        setMeta("keywords", "pressure washing Toowoomba, driveway cleaning Toowoomba QLD, deck cleaning Toowoomba, high pressure cleaning Toowoomba, exterior cleaning Toowoomba, iLovah pressure washing");
        setMeta("robots", "index, follow");
        setMeta("author", "iLovah Cleaning Services");
        setMeta("geo.region", "AU-QLD");
        setMeta("geo.placename", "Toowoomba, Queensland, Australia");
        setMeta("geo.position", "-27.5598;151.9507");
        setMeta("ICBM", "-27.5598, 151.9507");

        setLink("canonical", `${BASE_URL}/pressure-washing`);

        setMeta("og:type", "website", "property");
        setMeta("og:title", "Pressure Washing Toowoomba | Driveways, Decks & Fences – iLovah", "property");
        setMeta("og:description", "Professional pressure washing across Toowoomba QLD for driveways, decks, fences, and exteriors. Free quotes within 1 hour. Call 0478 711 829.", "property");
        setMeta("og:url", `${BASE_URL}/pressure-washing`, "property");
        setMeta("og:site_name", "iLovah Cleaning Services", "property");
        setMeta("og:locale", "en_AU", "property");

        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", "Pressure Washing Toowoomba | iLovah Cleaning Services");
        setMeta("twitter:description", "High-pressure cleaning for driveways, decks, fences & exteriors across Toowoomba QLD. Call 0478 711 829.");

        const existing = document.getElementById("pressure-jsonld-main");
        if (existing) existing.remove();
        const script = document.createElement("script");
        script.id = "pressure-jsonld-main";
        script.type = "application/ld+json";
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "@id": `${BASE_URL}/pressure-washing#breadcrumb`,
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
                        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BASE_URL}/services` },
                        { "@type": "ListItem", "position": 3, "name": "Pressure Washing Toowoomba", "item": `${BASE_URL}/pressure-washing` }
                    ]
                },
                {
                    "@type": "Service",
                    "@id": `${BASE_URL}/pressure-washing#service`,
                    "name": "Pressure Washing Toowoomba",
                    "serviceType": "Pressure Washing",
                    "provider": { "@id": `${BASE_URL}/#business` },
                    "areaServed": [
                        { "@type": "City", "name": "Toowoomba" },
                        { "@type": "AdministrativeArea", "name": "North Toowoomba" },
                        { "@type": "AdministrativeArea", "name": "Highfields" },
                        { "@type": "State", "name": "Queensland" }
                    ],
                    "description": "Professional high-pressure cleaning in Toowoomba QLD for driveways, decks, fences, garage floors, and exterior surfaces. Mould and algae treatment included.",
                    "url": `${BASE_URL}/pressure-washing`,
                    "image": `${BASE_URL}/og-image.jpg`
                },
                {
                    "@type": "FAQPage",
                    "@id": `${BASE_URL}/pressure-washing#faq`,
                    "mainEntity": [
                        { "@type": "Question", "name": "What surfaces can be pressure washed?", "acceptedAnswer": { "@type": "Answer", "text": "We pressure wash driveways, paths, decks, patios, fences, walls, and garage floors. We adjust pressure settings to suit each surface safely." } },
                        { "@type": "Question", "name": "Do you provide a quote before starting the job?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We provide a free quote within 1 hour, based on the size and number of areas to be cleaned." } },
                        { "@type": "Question", "name": "Can pressure washing remove mould and algae?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We apply a degreaser or mould treatment as a pre-soak before pressure washing to lift stubborn mould, algae, and oil stains effectively." } },
                        { "@type": "Question", "name": "Will pressure washing damage my surfaces?", "acceptedAnswer": { "@type": "Answer", "text": "No. Our technicians adjust pressure and nozzle settings for each surface type — gentler for decks and painted surfaces, stronger for concrete — to clean safely without damage." } },
                        { "@type": "Question", "name": "Do you offer pressure washing for commercial properties?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide pressure washing for both residential and commercial properties, including walkways and common areas, across Toowoomba and surrounds." } }
                    ]
                }
            ]
        });
        document.head.appendChild(script);

        return () => { const s = document.getElementById("pressure-jsonld-main"); if (s) s.remove(); };
    }, []);

    const goMain = (section) => { navigate("/", { state: { scrollTo: section || null } }); };
    const go = (id) => {
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: "smooth" }); }
        else goMain(id);
    };
    const openQuote = () => { setQuoteOpen(true); };

    const FAQS = [
        { q: "What surfaces can be pressure washed?", a: "We pressure wash driveways, paths, decks, patios, fences, walls, and garage floors. We adjust pressure settings to suit each surface safely." },
        { q: "Do you provide a quote before starting the job?", a: "Yes. We provide a free quote within 1 hour, based on the size and number of areas to be cleaned." },
        { q: "Can pressure washing remove mould and algae?", a: "Yes. We apply a degreaser or mould treatment as a pre-soak before pressure washing to lift stubborn mould, algae, and oil stains effectively." },
        { q: "Will pressure washing damage my surfaces?", a: "No. Our technicians adjust pressure and nozzle settings for each surface type — gentler for decks and painted surfaces, stronger for concrete — to clean safely without damage." },
        { q: "Do you offer pressure washing for commercial properties?", a: "Yes, we provide pressure washing for both residential and commercial properties, including walkways and common areas, across Toowoomba and surrounds." },
    ];

    return (
        <div style={{ width: "100%", maxWidth: "100%", margin: 0, padding: 0, overflowX: "hidden" }}>
            <style>{PEST_CSS}</style>
            <NavBar />
            <main>
                <section className="pest-page-hero" aria-label="Pressure Washing Toowoomba – iLovah Cleaning Services" style={{ background: DARK }}>
                    <R>
                        <div className="hero-eyebrow ey-red" style={{ margin: "0 auto 24px" }}>
                            <span className="ey-dot dot-r" />
                            Pressure Washing Toowoomba · Driveways, Decks & Fences
                        </div>
                        <h1 className="pest-hero-h1" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,5vw,3.6rem)" }}>
                            Pressure <span className="hl-red">Washing</span><br />Toowoomba
                        </h1>
                        <p className="pest-hero-p">
                            High-pressure cleaning for driveways, decks, fences, and exteriors — looking brand new again. Ideal for homes, property managers, and commercial spaces.
                        </p>
                        <div className="pest-hero-btns">
                            <button className="btn-red" onClick={() => setBookingOpen(true)}>Book Pressure Washing</button>
                            <button className="btn-ghost-w" onClick={() => go("pressure-services")}>How It Works ↓</button>
                        </div>
                        <div className="pest-hero-stats">
                            <div className="hs"><div className="hs-n clr-red">2–4 hrs</div><div className="hs-l">Typical Duration</div></div>
                            <div className="hs-sep" />
                            <div className="hs"><div className="hs-n clr-red">100%</div><div className="hs-l">Insured & Local</div></div>
                        </div>
                    </R>
                </section>

                <section className="pest-section" id="pressure-services" aria-label="Pressure washing process Toowoomba">
                    <div className="pest-inner">
                        <R className="pest-logo-display">
                            <div className="pest-crescent-wrap">
                                <div className="pest-svg-logo">
                                    <img src={imgPressure} alt="Pressure washing, Toowoomba" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                </div>
                                <div className="pest-fact" style={{ top: "8%", right: "-10px", bottom: "auto" }}><div><div className="pf-n">2–4 Hours</div><div className="pf-l">Typical Job Time</div></div></div>
                            </div>
                        </R>

                        <R className="pest-content">
                            <div className="section-tag">Pressure Washing Toowoomba</div>
                            <h2 className="pest-title">Like-New<br />Exteriors<span className="hl-red">.</span></h2>
                            <p className="pest-tagline">"Blast Away the Grime."</p>
                            <p className="pest-desc">
                                Professional pressure washing for buildings, walkways, and common areas. Ideal for property managers, clinics, and commercial spaces across Toowoomba.
                            </p>

                            <div className="pest-services">
                                {[
                                    { title: "Surface Prep", desc: "Loose debris swept away and delicate areas protected before washing." },
                                    { title: "Pre-soak", desc: "Degreaser or mould treatment applied to stubborn stains." },
                                    { title: "High-Pressure Wash", desc: "Professional-grade pressure washer blasts away grime, oil, and algae." },
                                    { title: "Rinse & Inspect", desc: "Surface rinsed clean and inspected for any missed areas." },
                                ].map((p, i) => (
                                    <div key={i} className="ps-card">
                                        <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: ".82rem", fontWeight: 900, color: DARK, marginBottom: 5, letterSpacing: "-.01em" }}>{p.title}</h3>
                                        <p>{p.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <p style={{ fontSize: ".85rem", color: MID, marginBottom: 24 }}>
                                <strong style={{ color: DARK }}>What's included:</strong> Driveways &amp; paths, decks &amp; patios, fences &amp; walls, garage floors, mould &amp; algae treatment.
                            </p>

                            <div className="pest-cta">
                                <button className="btn-red" onClick={() => setBookingOpen(true)}>Book Pressure Washing Now</button>
                            </div>
                        </R>
                    </div>
                </section>

                <section className="pest-faq-section" id="pressure-faq" aria-label="Pressure washing frequently asked questions">
                    <div className="pest-faq-inner">
                        <div className="sec-tag-blue" style={{ display: "inline-block", color: BLUE2, background: "rgba(74,171,219,0.1)", borderColor: "rgba(74,171,219,0.2)", fontSize: ".7rem", fontWeight: 900, letterSpacing: ".16em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 6, border: "1px solid rgba(74,171,219,0.2)" }}>FAQ</div>
                        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: DARK, margin: "16px 0 8px", letterSpacing: "-0.02em" }}>
                            Pressure Washing <span style={{ color: RED }}>Questions</span> Answered
                        </h2>
                        <p style={{ color: MID, fontSize: ".95rem", lineHeight: 1.7 }}>
                            Common questions about pressure washing in Toowoomba. Can't find what you need? <a href="/faq" style={{ color: RED, fontWeight: 700 }}>See the full FAQ</a> or call 0478 711 829.
                        </p>
                        <div className="pest-faq-list">
                            {FAQS.map((f, i) => (
                                <div key={i} className={`pest-faq-item${openFaq === i ? " open" : ""}`}>
                                    <button className="pest-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                                        {f.q}<span className="pest-faq-icon" aria-hidden="true">+</span>
                                    </button>
                                    <div className="pest-faq-a"><div className="pest-faq-a-inner">{f.a}</div></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="pest-cta-band" aria-label="Book pressure washing in Toowoomba">
                    <R>
                        <h2>Ready for <span style={{ color: "rgba(255,255,255,.85)" }}>spotless exteriors in Toowoomba?</span></h2>
                        <p>Contact iLovah Cleaning Services today for a free, no-obligation pressure washing quote. We service Toowoomba, Highfields, Helidon, Gatton, North Toowoomba, Harristown, Rangeville, and all surrounding QLD areas.</p>
                        <div className="pest-cta-band-btns">
                            <button className="btn-white" onClick={openQuote}>Get Instant Quote</button>
                            <a href="tel:0478711829" className="btn-ghost-w" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 9, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".95rem" }}>Call 0478 711 829</a>
                        </div>
                    </R>
                </section>

                <section style={{ background: OFFWHITE, padding: "60px 5%" }}>
                    <div className="il-wrap" style={{ textAlign: "center" }}>
                        <h2 className="sec-h2" style={{ textAlign: "center", maxWidth: "100%" }}>Related <span className="hl-red">Services</span></h2>
                        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
                            <a href="/gutter-cleaning" style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "12px 22px", fontWeight: 800, color: DARK, textDecoration: "none", fontSize: ".88rem" }}>Gutter Cleaning →</a>
                            <a href="/window-cleaning" style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "12px 22px", fontWeight: 800, color: DARK, textDecoration: "none", fontSize: ".88rem" }}>Window Cleaning →</a>
                            <a href="/general-house-cleaning" style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "12px 22px", fontWeight: 800, color: DARK, textDecoration: "none", fontSize: ".88rem" }}>General House Cleaning →</a>
                            <a href="/pest-control" style={{ background: "#fff", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: "12px 22px", fontWeight: 800, color: DARK, textDecoration: "none", fontSize: ".88rem" }}>Pest Control →</a>
                            <a href="/services" style={{ background: RED, border: `1.5px solid ${RED}`, borderRadius: 10, padding: "12px 22px", fontWeight: 800, color: "#fff", textDecoration: "none", fontSize: ".88rem" }}>View All Services →</a>
                        </div>
                    </div>
                </section>

                <div itemScope itemType="https://schema.org/LocalBusiness" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }} aria-hidden="true">
                    <span itemProp="name">iLovah Cleaning Services – Pressure Washing Toowoomba</span>
                    <span itemProp="telephone">+61478711829</span>
                    <span itemProp="email">ilovahclean@gmail.com</span>
                    <span itemProp="description">Professional pressure washing in Toowoomba QLD by iLovah Cleaning Services, covering Toowoomba, Highfields, Helidon, Gatton, North Toowoomba, Harristown, Rangeville, Cabarlah, Withcott, Laidley, and surrounding QLD suburbs.</span>
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
            </main>
            <PageFooter />
            <GetQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} initialService="Pressure Washing" />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} initialService="Pressure Washing" />
        </div>
    );
}