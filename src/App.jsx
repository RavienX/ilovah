import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import heroImg from "./assets/hero.jpg";
import heroImg2 from "./assets/hero2.jpg";
import imgCarpet from "./assets/carpet cleaning.jpg";
import imgEndOfLease from "./assets/end of lease cleaning.jpg";
import imgGutter from "./assets/glutter cleaning.jpg";
import imgWindow from "./assets/window cleaning.jpg";
import imgPram from "./assets/pram cleaning.jpg";
import imgHappy from "./assets/happy.jpg";
import imgBeforeKitchen from "./assets/before kitchen.png";
import imgAfterKitchen from "./assets/after kitchen.png";
import imgBeforeCarpet from "./assets/carpit before.png";
import imgAfterCarpet from "./assets/carpit after.png";
import imgBeforeGutter from "./assets/gutter before.png";
import imgAfterGutter from "./assets/gutter after.png";
import imgBeforePram from "./assets/pram before.png";
import imgAfterPram from "./assets/pram after.png";
import imgBeforeWindow from "./assets/window before.png";
import imgAfterWindow from "./assets/window after.png";
import imgBeforeSala from "./assets/sala before.png";
import imgAfterSala from "./assets/sala after.png";
import imgBeforeBedroom from "./assets/bedroom before.png";
import imgAfterBedroom from "./assets/bedroom after.png";
import imgBeforeBedroom2 from "./assets/bedroom2 before.png";
import imgAfterBedroom2 from "./assets/bedroom2 after.png";
import imgBeforeRoof from "./assets/dirty roof.jpg";
import imgAfterRoof from "./assets/clean roof.jpg";
import imgPest from "./assets/pest control.jpg";
import imgPressure from "./assets/pressure washing.jpg";
import imgGeneral from "./assets/general house clean.jpg";
import ilovahLogoSrc from "./assets/logo.png";
import imgLogo2 from "./assets/logo2.jpg";
import imgInsect from "./assets/insect.png";
import imgBox from "./assets/box.png";
import imgBackground from "./assets/background.png";
import imgCherub from "./assets/cherub.png";
import imgClinic from "./assets/clinic.png";
import imgHousing from "./assets/housing.png";
import imgLiving from "./assets/living.png";
import imgMoons from "./assets/moons.png";

// ── Design tokens matching index.html ──────────────────────────────────────
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
const MID = "#4b5563";
const GOLD = "#FFB800";
const PEST_BG = "#0f0a08";
const BORDER = "#e8e8e8";
const CREAM = "#fdfaf9";
const CHARCOAL = "#1a1a1a";
const RED_LT = "#fdecea";

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
  font-size:.73rem;color:rgba(255,255,255,0.8);
  position:fixed;top:0;left:0;right:0;z-index:901;transition:transform .35s ease;
  border-bottom:1px solid rgba(232,35,42,0.2);
}
.il-topbar.hidden{transform:translateY(-100%)}
.il-topbar-left{display:flex;align-items:center;gap:20px}
.il-topbar-right{display:flex;align-items:center;gap:16px}
.il-topbar-item{display:flex;align-items:center;gap:5px;color:rgba(255,255,255,0.8);text-decoration:none;transition:color .2s;white-space:nowrap}
.il-topbar-item:hover{color:#fff}
.il-topbar-item svg{flex-shrink:0;opacity:.7}
.il-topbar-divider{width:1px;height:14px;background:rgba(255,255,255,0.14)}

/* ── NAV (index.html style: black bg, red border) ── */
.il-nav{
  position:fixed;top:38px;left:0;right:0;z-index:900;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 5%;height:70px;
  background:${BLACK};
  border-bottom:3px solid ${RED};
  transition:all .3s ease;
}
.il-nav.scrolled{box-shadow:0 2px 20px rgba(0,0,0,0.4);height:64px;top:0}

/* Dual brand logos in nav */
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
.il-nav-links-desktop a{text-decoration:none;color:rgba(255,255,255,.8);font-size:.78rem;font-weight:800;padding:7px 14px;border-radius:7px;transition:all .2s;cursor:pointer;letter-spacing:.07em;text-transform:uppercase;white-space:nowrap}
.il-nav-links-desktop a:hover{color:${RED};background:rgba(232,35,42,0.1)}

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

/* ── HERO — split dual brand (index.html style) ── */
.il-hero{
  min-height:100vh;display:grid;grid-template-columns:1fr 1fr;
  padding-top:108px;position:relative;overflow:hidden;
}
/* Left: iLovah (blue-dark) */
.il-hero-left{
  background:${DARK};
  padding:80px 6% 80px 7%;
  display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;
  position:relative;overflow:hidden;
}
.il-hero-left::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 70% 60% at 0% 40%,rgba(43,143,212,0.18),transparent 65%),
    radial-gradient(ellipse 50% 50% at 100% 100%,rgba(232,35,42,0.08),transparent 60%);
}
.il-hero-left::after{
  content:'';position:absolute;top:0;right:-50px;bottom:0;width:100px;
  background:${DARK};
  clip-path:polygon(0 0,50% 0,100% 100%,0 100%);z-index:2;
}
/* Right: Pest Control Service (dark/dramatic) */
.il-hero-right{
  background:${PEST_BG};
  padding:80px 7% 80px 6%;
  display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;
  position:relative;overflow:hidden;
}
.il-hero-right::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 70% 60% at 100% 40%,rgba(204,26,26,0.22),transparent 65%),
    radial-gradient(ellipse 40% 40% at 0% 100%,rgba(232,35,42,0.08),transparent 60%);
}
.bug-bg{
  position:absolute;right:-40px;bottom:-20px;
  font-size:22rem;opacity:.04;line-height:1;
  user-select:none;pointer-events:none;
  animation:bugCreep 20s ease-in-out infinite;
}
@keyframes bugCreep{0%,100%{transform:translate(0,0) rotate(-10deg)}50%{transform:translate(-20px,-15px) rotate(5deg)}}

.hero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 16px;border-radius:50px;margin-bottom:24px;
  font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;
  width:fit-content;position:relative;z-index:3;
}
.ey-blue{background:rgba(74,171,219,0.12);border:1px solid rgba(74,171,219,0.3);color:${BLUE2}}
.ey-red{background:rgba(232,35,42,0.12);border:1px solid rgba(232,35,42,0.35);color:${RED2}}
.ey-dot{width:7px;height:7px;border-radius:50%;animation:dotPulse 2s infinite}
.dot-b{background:${BLUE2}}
.dot-r{background:${RED}}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.3}}

.hero-h1{
  font-family:'Montserrat',sans-serif;
  font-weight:900;line-height:1.04;letter-spacing:-0.03em;
  position:relative;z-index:3;margin-bottom:20px;
}
.hero-h1.big{font-size:clamp(2.4rem,3.8vw,4rem);color:${WHITE}}
.hero-h1.pest-big{font-size:clamp(2.4rem,3.8vw,4rem);color:${WHITE};font-family:'Black Ops One',cursive;font-weight:400;letter-spacing:.02em}
.hero-h1 .hl-red{color:${RED}}
.hero-h1 .hl-blue{color:${BLUE2}}

.rip-hero-logo{position:relative;z-index:3;margin-bottom:22px}

.hero-p{
  font-size:.98rem;line-height:1.72;margin-bottom:36px;
  position:relative;z-index:3;
}
.il-hero-left .hero-p{color:rgba(255,255,255,.75);max-width:400px;text-align:center}
.il-hero-right .hero-p{color:rgba(255,255,255,.7);max-width:400px;text-align:center}

.hero-btns{display:flex;gap:14px;flex-wrap:wrap;position:relative;z-index:3;justify-content:center}

.hero-stats{
  display:flex;gap:28px;margin-top:32px;flex-wrap:wrap;
  position:relative;z-index:3;justify-content:center;
}
.hs-n{
  font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.8rem;line-height:1;
}
.hs-n.clr-blue{color:${BLUE2}}
.hs-n.clr-red{color:${RED}}
.hs-l{font-size:.68rem;font-weight:800;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.08em;margin-top:3px}
.hs-sep{width:1px;background:rgba(255,255,255,.1);align-self:stretch}

.hero-bottom-bar{
  position:absolute;bottom:0;left:0;right:0;height:5px;z-index:10;
  background:linear-gradient(90deg,${BLUE} 0%,${BLUE2} 50%,${RED} 50%,${RED2} 100%);
}

/* ── BUTTONS (index.html style) ── */
.btn-red{
  background:linear-gradient(135deg,${RED},${RED2});
  color:${WHITE};padding:14px 32px;border-radius:8px;
  font-weight:900;font-size:.95rem;text-decoration:none;
  box-shadow:0 6px 24px ${RED_GLOW};
  transition:all .25s;display:inline-flex;align-items:center;gap:8px;
  border:none;cursor:pointer;font-family:'Nunito',sans-serif;
}
.btn-red:hover{transform:translateY(-3px);box-shadow:0 12px 36px ${RED_GLOW};filter:brightness(1.1)}
.btn-blue{
  background:linear-gradient(135deg,${BLUE},${BLUE2});
  color:${WHITE};padding:14px 32px;border-radius:8px;
  font-weight:900;font-size:.95rem;text-decoration:none;
  box-shadow:0 6px 24px ${BLUE_GLOW};
  transition:all .25s;display:inline-flex;align-items:center;gap:8px;
  border:none;cursor:pointer;font-family:'Nunito',sans-serif;
}
.btn-blue:hover{transform:translateY(-3px);box-shadow:0 12px 36px ${BLUE_GLOW};filter:brightness(1.1)}
.btn-ghost-w{
  background:transparent;color:rgba(255,255,255,.9);
  padding:14px 28px;border-radius:8px;
  font-weight:800;font-size:.95rem;text-decoration:none;
  border:1.5px solid rgba(255,255,255,.4);
  transition:all .25s;display:inline-flex;align-items:center;gap:8px;
  cursor:pointer;font-family:'Nunito',sans-serif;
}
.btn-ghost-w:hover{border-color:${RED};color:${RED}}

/* standard app button */
.il-btn{background:${RED};color:#fff;padding:13px 26px;border-radius:8px;font-size:.92rem;font-weight:900;cursor:pointer;display:inline-flex;align-items:center;gap:7px;border:none;transition:all .25s;font-family:'Nunito',sans-serif;text-decoration:none;box-shadow:0 4px 14px ${RED_GLOW};letter-spacing:-.01em}
.il-btn:hover{background:${RED_DK};transform:translateY(-2px);box-shadow:0 8px 22px ${RED_GLOW}}
.il-btn-ghost{background:#fff;color:${CHARCOAL};border:1.5px solid ${BORDER};padding:12px 24px;border-radius:8px;font-size:.92rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .25s;font-family:'Nunito',sans-serif;text-decoration:none}
.il-btn-ghost:hover{border-color:${CHARCOAL};background:#fafafa;transform:translateY(-1px)}

/* ── TRUST BAR (index.html style) ── */
.il-trust{
  background:linear-gradient(90deg,${BLUE} 0%,${DARK} 40%,${DARK} 60%,${RED} 100%);
  padding:18px 5%;display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap;
}
.il-trust-item{display:flex;align-items:center;gap:8px;color:${WHITE};font-size:.82rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
.il-trust-item .ti{font-size:1.1rem}
.il-trust-div{width:1px;height:20px;background:rgba(255,255,255,.2)}

/* ── SECTION WRAPPER ── */
.il-wrap{max-width:1200px;margin:0 auto;padding:0 5%}

/* ── SECTION HEADERS (index.html style) ── */
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
.sec-head{text-align:center;padding:0 5%;margin-bottom:16px}

/* ── SERVICES SECTION ── */
.il-services-section{padding:80px 0;background:${OFFWHITE}}
.il-svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-top:48px}
.il-svc-card{
  background:#fff;border-radius:18px;
  border:1.5px solid ${BORDER};cursor:pointer;
  transition:all .3s;position:relative;overflow:hidden;
  display:flex;flex-direction:column;
}
.il-svc-card:hover{transform:translateY(-5px);box-shadow:0 20px 52px rgba(0,0,0,0.1);border-color:rgba(232,35,42,.25)}
.il-svc-img-ph{width:100%;height:220px;background:linear-gradient(145deg,#f4f4f4 0%,#ececec 100%);border-bottom:1.5px solid ${BORDER};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;position:relative;overflow:hidden;flex-shrink:0;transition:background .3s}
.il-svc-img-ph::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(232,35,42,0.04) 0%,transparent 55%)}
.il-svc-img-dashed{width:52px;height:52px;border-radius:12px;border:2px dashed rgba(0,0,0,.14);display:flex;align-items:center;justify-content:center;position:relative;z-index:1}
.il-svc-img-icon{font-size:1.5rem;opacity:.38;position:relative;z-index:1}
.il-svc-img-label{font-size:.67rem;font-weight:700;color:rgba(0,0,0,.25);letter-spacing:.06em;text-transform:uppercase;position:relative;z-index:1}
.il-svc-body{padding:18px 20px 20px;display:flex;flex-direction:column;flex:1}
.il-svc-title{font-family:'Montserrat',sans-serif;font-size:1rem;font-weight:900;margin-bottom:7px;letter-spacing:-.02em;line-height:1.2;color:${DARK}}
.il-svc-desc{font-size:.86rem;color:${MID};line-height:1.6;flex:1;margin-bottom:14px}
.il-svc-link{background:none;border:1.5px solid rgba(232,35,42,.25);color:${RED};padding:8px 14px;border-radius:7px;font-size:.8rem;font-weight:900;cursor:pointer;font-family:'Nunito',sans-serif;text-align:left;transition:all .2s;display:inline-flex;align-items:center;gap:5px;width:fit-content}
.il-svc-link:hover{background:${RED};color:#fff;border-color:${RED}}
.il-svc-card.featured{border-color:${RED};box-shadow:0 8px 32px rgba(232,35,42,.1)}
.il-svc-card.featured::before{content:'Popular';position:absolute;top:-1px;right:16px;padding:4px 14px;border-radius:0 0 8px 8px;font-size:.64rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em;background:${RED};color:#fff}

/* ── PEST CONTROL SECTION (index.html style: dark, dramatic) ── */
.pest-section{
  background:${PEST_BG};
  padding:100px 0;
  position:relative;overflow:hidden;
  border-top:1px solid rgba(232,35,42,.12);
}
.pest-section::before{
  content:'';position:absolute;left:-200px;top:50%;transform:translateY(-50%);
  width:700px;height:700px;border-radius:50%;
  border:80px solid rgba(232,35,42,0.06);pointer-events:none;
}
.pest-section::after{
  content:'';position:absolute;right:-150px;bottom:-100px;
  width:500px;height:500px;border-radius:50%;
  border:60px solid rgba(232,35,42,0.04);pointer-events:none;
}
.zzz-bug{
  position:absolute;font-size:1.3rem;
  color:rgba(255,255,255,.06);pointer-events:none;user-select:none;
  animation:zzzFloat 8s ease-in-out infinite;
}
@keyframes zzzFloat{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-18px) rotate(5deg)}}

.pest-inner{
  max-width:1200px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1.1fr;gap:80px;align-items:center;
  padding:0 5%;
}

/* logo display column */
.pest-logo-display{position:relative;display:flex;align-items:center;justify-content:center}
.pest-crescent-wrap{position:relative;width:420px;height:420px;flex-shrink:0}
.pest-crescent-wrap::before{
  content:'';position:absolute;inset:-30px;border-radius:50%;
  background:conic-gradient(from 0deg,${RED},transparent 40%,${RED_DK},transparent 70%,${RED});
  animation:rotateSlow 10s linear infinite;opacity:.2;filter:blur(24px);
}
@keyframes rotateSlow{to{transform:rotate(360deg)}}
.pest-svg-logo{position:relative;z-index:2;width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:50%;overflow:hidden}
.rip-crescent{width:360px;height:360px;filter:drop-shadow(0 0 40px rgba(232,35,42,0.5)) drop-shadow(0 4px 16px rgba(0,0,0,0.8))}

/* floating fact cards */
.pest-fact{
  position:absolute;background:${DARK2};
  border:1px solid rgba(232,35,42,.3);
  border-radius:14px;padding:14px 18px;
  display:flex;align-items:center;gap:12px;
  animation:floatFact 5s ease-in-out infinite;
  box-shadow:0 8px 28px rgba(0,0,0,.5);z-index:3;
}
.pest-fact:nth-child(2){bottom:60px;left:10px;animation-delay:0s}
.pest-fact:nth-child(3){top:70px;right:0;animation-delay:2s}
@keyframes floatFact{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.pf-ico{font-size:1.6rem}
.pf-n{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.1rem;color:${RED};line-height:1}
.pf-l{font-size:.68rem;font-weight:700;color:rgba(255,255,255,.65);text-transform:uppercase;letter-spacing:.07em}

/* pest content column */
.pest-content .section-tag{
  display:inline-block;font-size:.7rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;
  color:${RED};background:rgba(232,35,42,.12);
  padding:6px 16px;border-radius:6px;margin-bottom:18px;
  border:1px solid rgba(232,35,42,.25);
}
.pest-title{
  font-family:'Black Ops One',cursive;
  font-size:clamp(2.4rem,4vw,4rem);
  color:${WHITE};line-height:1.1;margin-bottom:10px;
  letter-spacing:.02em;
}
.pest-title .hl-red{color:${RED};text-shadow:0 0 30px rgba(232,35,42,.5)}
.pest-tagline{
  font-family:'Montserrat',sans-serif;font-weight:900;font-style:italic;
  font-size:1.1rem;color:rgba(255,255,255,.65);margin-bottom:28px;letter-spacing:.04em;
}
.pest-desc{font-size:1rem;color:rgba(255,255,255,.75);line-height:1.75;margin-bottom:36px;max-width:500px}

/* pest service cards grid */
.pest-services{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:40px}
.ps-card{
  background:rgba(255,255,255,.04);
  border:1px solid rgba(232,35,42,.2);
  border-radius:14px;padding:18px 16px;transition:all .3s;
}
.ps-card:hover{
  background:rgba(232,35,42,.08);
  border-color:rgba(232,35,42,.5);
  transform:translateY(-4px);
  box-shadow:0 8px 28px rgba(232,35,42,.15);
}
.ps-card .ps-ico{font-size:1.6rem;margin-bottom:10px}
.ps-card h4{font-family:'Montserrat',sans-serif;font-weight:900;font-size:.88rem;color:${WHITE};margin-bottom:5px}
.ps-card p{font-size:.78rem;color:rgba(255,255,255,.65);line-height:1.5}
.pest-cta{display:flex;gap:14px;flex-wrap:wrap;margin-top:4px}

/* ── HOW IT WORKS ── */
.il-how{padding:80px 0;background:#fff}
.il-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px}
.il-step{
  background:${OFFWHITE};border-radius:16px;padding:28px 22px;
  border:1.5px solid ${BORDER};position:relative;overflow:hidden;
}
.il-step::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,${RED},${RED2})}
.il-step-num{font-family:'Montserrat',sans-serif;font-size:2.5rem;font-weight:900;color:rgba(232,35,42,.12);line-height:1;margin-bottom:12px}
.il-step-ico{font-size:1.8rem;margin-bottom:10px}
.il-step-title{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1rem;color:${DARK};margin-bottom:7px}
.il-step-desc{font-size:.84rem;color:${MID};line-height:1.6}

/* ── WHY / ABOUT ── */
.il-why{padding:80px 0;background:${OFFWHITE}}
.il-why-inner{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.il-why-img{border-radius:20px;overflow:hidden;position:relative;}
.il-why-badge{
  position:absolute;bottom:24px;left:24px;
  background:#fff;border-radius:14px;padding:14px 18px;
  display:flex;align-items:center;gap:12px;
  box-shadow:0 8px 28px rgba(0,0,0,.12);
}
.il-why-badge-icon{font-size:1.5rem}
.il-why-badge strong{display:block;font-size:.9rem;font-weight:900;color:${DARK};font-family:'Montserrat',sans-serif}
.il-why-badge span{display:block;font-size:.74rem;color:${MID}}
.il-feature{display:flex;align-items:flex-start;gap:14px;margin-bottom:22px}
.il-feat-ico{width:42px;height:42px;border-radius:10px;background:rgba(232,35,42,.08);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
.il-feat-title{font-family:'Montserrat',sans-serif;font-size:.96rem;font-weight:900;color:${DARK};margin-bottom:4px}
.il-feat-desc{font-size:.85rem;color:${MID};line-height:1.6}

/* ── RESULTS / BEFORE-AFTER ── */
.il-results-section{padding:80px 0;background:#fff}
.il-ba-wrap{max-width:900px;margin:48px auto 0;position:relative}
.il-ba-slider{border-radius:20px;overflow:hidden;position:relative;box-shadow:0 24px 64px rgba(0,0,0,.14)}
.il-ba-images{display:grid;grid-template-columns:1fr 1fr;height:460px;position:relative}
.il-ba-img-side{position:relative;overflow:hidden}
.il-ba-img-side img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:opacity .55s ease}
.il-ba-img-side img.visible{opacity:1}
.il-ba-img-side img.hidden{opacity:0}
.il-ba-divider{position:absolute;left:50%;top:0;bottom:0;width:3px;background:rgba(255,255,255,0.55);transform:translateX(-50%);z-index:2;pointer-events:none}
.il-ba-dots{display:flex;gap:8px;justify-content:center;margin-top:16px}
.il-ba-dot{width:8px;height:8px;border-radius:50%;background:${BORDER};cursor:pointer;transition:all .25s;border:none;padding:0}
.il-ba-dot.active{background:${RED};transform:scale(1.3)}
.il-ba-labels{display:grid;grid-template-columns:1fr 1fr;gap:3px;margin-top:4px}
.il-ba-label{text-align:center;font-size:.75rem;font-weight:800;padding:6px;color:${MID}}
.il-ba-label.before{background:rgba(100,116,139,.08);border-radius:6px}
.il-ba-label.after{background:rgba(232,35,42,.07);color:${RED};border-radius:6px}

/* ── CLIENTS ── */
.il-clients-section{padding:80px 0;background:${OFFWHITE}}
.il-clients-grid{display:flex;gap:40px;flex-wrap:wrap;justify-content:center;align-items:center;margin-top:48px}
.il-client-card{
  display:flex;align-items:center;justify-content:center;
  transition:transform .3s;flex-shrink:0;
}
.il-client-card:hover{transform:translateY(-3px)}
.il-client-logo-img{width:300px;height:200px;object-fit:contain;display:block;filter:none;opacity:1;transition:transform .2s}
.il-client-card:hover .il-client-logo-img{transform:scale(1.05)}

/* ── TESTIMONIALS ── */
.il-reviews-section{padding:80px 0;background:${DARK};position:relative;overflow:hidden}
.il-reviews-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(232,35,42,.06),transparent 65%)}
.il-rev-card{
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);
  border-radius:20px;padding:36px 32px;max-width:680px;margin:48px auto 0;
  transition:all .3s;position:relative;z-index:1;
}
.il-rev-source{display:inline-block;font-size:.62rem;font-weight:900;padding:3px 10px;border-radius:4px;text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;background:rgba(43,143,212,.15);color:${BLUE2};border:1px solid rgba(43,143,212,.2)}
.il-rev-stars{color:${GOLD};font-size:.9rem;letter-spacing:2px;margin-bottom:16px}
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

/* ── FAQ ── */
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

/* ── SERVICE AREAS ACCORDION ── */
.il-areas-section{padding:72px 0;background:#fff;border-top:1px solid ${BORDER}}
.il-areas-inner{max-width:980px;margin:0 auto}
.il-areas-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;margin-top:36px}
.il-area-item{border:1.5px solid ${BORDER};border-radius:14px;overflow:hidden;background:#fff;transition:border-color .25s,box-shadow .25s}
.il-area-item.open{border-color:rgba(232,35,42,.3);box-shadow:0 4px 20px rgba(232,35,42,.08)}
.il-area-q{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;cursor:pointer;font-weight:800;font-size:.88rem;color:${DARK};gap:10px;background:none;border:none;width:100%;text-align:left;font-family:'Montserrat',sans-serif;transition:color .2s}
.il-area-item.open .il-area-q{color:${RED}}
.il-area-ico{color:${RED};font-size:.78rem;transition:transform .3s;flex-shrink:0;font-weight:900}
.il-area-item.open .il-area-ico{transform:rotate(180deg)}
.il-area-body{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.4,0,.2,1),padding .3s;font-size:.82rem;color:${MID};line-height:1.7;padding:0 18px}
.il-area-item.open .il-area-body{max-height:220px;padding:0 18px 14px}
.il-area-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.il-area-tag{background:${RED_LT};color:${RED};border-radius:4px;padding:2px 8px;font-size:.72rem;font-weight:800;font-family:'Nunito',sans-serif}

/* ── CONTACT / CTA ── */
.il-contact-section{padding:0 5% 80px;background:${OFFWHITE}}
.il-cta{
  background:linear-gradient(135deg,${RED} 0%,${RED_DK} 100%);
  border-radius:22px;padding:56px 48px;
  display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap;
  box-shadow:0 20px 60px ${RED_GLOW};
}
.il-cta-text h2{font-family:'Montserrat',sans-serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;line-height:1.1;margin-bottom:14px;letter-spacing:-0.02em}
.il-cta-text h2 em{font-style:italic;opacity:.85}
.il-cta-text p{color:rgba(255,255,255,.9);font-size:.98rem;line-height:1.65;max-width:420px;margin-bottom:24px}
.il-cta-contact-info{display:flex;gap:20px;flex-wrap:wrap}
.il-cta-info-item{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.85);font-size:.88rem}
.il-cta-info-label{font-size:.62rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:rgba(255,255,255,.4);display:block}
.il-cta-btns{display:flex;flex-direction:column;gap:12px;align-items:flex-start}
.il-btn-white{background:#fff;color:${RED};padding:14px 28px;border-radius:9px;font-size:.96rem;font-weight:900;cursor:pointer;border:none;font-family:'Nunito',sans-serif;transition:all .25s;box-shadow:0 4px 16px rgba(0,0,0,.1)}
.il-btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.15)}
.il-btn-ow{background:transparent;border:2px solid rgba(255,255,255,.4);color:#fff;padding:13px 24px;border-radius:9px;font-size:.96rem;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .25s;text-decoration:none;display:flex;align-items:center;gap:8px}
.il-btn-ow:hover{background:rgba(255,255,255,.1);border-color:#fff}

/* ── GET IN TOUCH SECTION ── */
.il-git-section{padding:80px 0;background:${OFFWHITE}}
.il-git-inner{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;max-width:1100px;margin:0 auto;padding:0 5%}
.il-git-left{}
.il-git-tag{display:inline-block;font-size:.7rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;color:${BLUE2};background:rgba(74,171,219,0.1);padding:6px 16px;border-radius:6px;margin-bottom:18px;border:1px solid rgba(74,171,219,0.2)}
.il-git-h1{font-family:'Montserrat',sans-serif;font-weight:900;font-size:clamp(2.2rem,4vw,3.2rem);line-height:1.06;letter-spacing:-.03em;color:${DARK};margin-bottom:16px}
.il-git-h1 .hl-red{color:${RED}}
.il-git-sub{font-size:.97rem;color:${MID};line-height:1.7;margin-bottom:36px;max-width:420px}
.il-git-info{display:flex;flex-direction:column;gap:16px;margin-bottom:32px}
.il-git-info-item{display:flex;align-items:center;gap:16px}
.il-git-info-ico{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
.il-git-ico-red{background:rgba(232,35,42,0.1)}
.il-git-ico-blue{background:rgba(43,143,212,0.1)}
.il-git-ico-gray{background:rgba(100,116,139,0.1)}
.il-git-info-body{}
.il-git-info-label{font-size:.65rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#64748b;margin-bottom:2px}
.il-git-info-val{font-size:.93rem;font-weight:700;color:${DARK}}
.il-git-info-val a{color:${DARK};text-decoration:none}
.il-git-info-val a:hover{color:${RED}}
.il-git-service-btns{display:flex;gap:10px;flex-wrap:wrap}
.il-git-svc-btn{padding:9px 18px;border-radius:8px;font-size:.83rem;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;transition:all .2s;border:1.5px solid;display:flex;align-items:center;gap:6px}
.il-git-svc-btn.blue{background:rgba(74,171,219,0.08);border-color:rgba(74,171,219,0.3);color:${BLUE}}
.il-git-svc-btn.blue:hover{background:${BLUE};color:#fff}
.il-git-svc-btn.red{background:rgba(232,35,42,0.08);border-color:rgba(232,35,42,0.3);color:${RED}}
.il-git-svc-btn.red:hover{background:${RED};color:#fff}
.il-git-form-wrap{background:${DARK2};border-radius:24px;padding:36px 32px;box-shadow:0 20px 60px rgba(0,0,0,0.15)}
.il-git-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
.il-git-form-group{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.il-git-form-group label{font-size:.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.7)}
.il-git-form-group input,.il-git-form-group select,.il-git-form-group textarea{width:100%;padding:13px 16px;border-radius:12px;border:1.5px solid rgba(255,255,255,.08);background:rgba(255,255,255,.05);font-family:'Nunito',sans-serif;font-size:.92rem;color:#fff;outline:none;transition:border-color .2s;resize:none}
.il-git-form-group input::placeholder,.il-git-form-group textarea::placeholder{color:rgba(255,255,255,.25)}
.il-git-form-group select{color:rgba(255,255,255,.7)}
.il-git-form-group select option{background:${DARK};color:#fff}
.il-git-form-group input:focus,.il-git-form-group select:focus,.il-git-form-group textarea:focus{border-color:${RED}}
.il-git-submit{width:100%;padding:16px;background:linear-gradient(135deg,${RED},${RED_DK});color:#fff;border:none;border-radius:12px;font-family:'Nunito',sans-serif;font-size:1rem;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .25s;box-shadow:0 4px 18px rgba(232,35,42,.35);margin-top:4px}
.il-git-submit:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(232,35,42,.45)}
.il-git-submit.sent{background:linear-gradient(135deg,#16a34a,#15803d);box-shadow:0 4px 18px rgba(22,163,74,.35)}
.il-git-disclaimer{font-size:.73rem;color:rgba(255,255,255,.55);text-align:center;margin-top:12px;display:flex;align-items:center;justify-content:center;gap:5px}
@media(max-width:900px){
  .il-git-inner{grid-template-columns:1fr;gap:40px}
  .il-git-form-row{grid-template-columns:1fr}
}
@media(max-width:600px){
  .il-git-form-wrap{padding:24px 18px}
}

/* ── FOOTER (index.html style) ── */
.il-footer{background:#111;border-top:1px solid rgba(255,255,255,.07);padding:60px 5% 0}
.il-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px}
.il-footer-brand{text-align:left!important}
.footer-dual-logo{margin-bottom:16px;text-align:left}
.fdl-il{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.75rem;line-height:1;letter-spacing:-.02em;text-align:left}
.fdl-il .lr{color:${RED}}
.fdl-il .lw{color:${WHITE}}
.fdl-sep{width:36px;height:3px;background:${RED};margin:10px 0 12px;border-radius:2px;display:block}
.fdl-rip{font-family:'Black Ops One',cursive;font-size:1.25rem;letter-spacing:.08em;line-height:1;text-align:left}
.fdl-rip .r{color:${RED}}
.fdl-rip .w{color:${WHITE}}
.il-footer-brand p{font-size:.84rem;color:rgba(255,255,255,.5);line-height:1.78;max-width:300px;margin-top:18px;text-align:left}
.il-footer-col h4{
  font-family:'Montserrat',sans-serif;font-size:.72rem;font-weight:900;
  text-transform:uppercase;letter-spacing:.18em;
  color:rgba(255,255,255,.55);margin-bottom:20px;
  padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.06);
}
.il-footer-col ul{list-style:none;display:flex;flex-direction:column;gap:11px}
.il-footer-col ul li a{
  color:rgba(255,255,255,.55);text-decoration:none;
  font-size:.86rem;font-weight:600;transition:color .2s;
  display:flex;align-items:center;gap:7px;
}
.il-footer-col ul li a:hover{color:rgba(255,255,255,.75)}
.il-footer-col ul li a .fc-icon{font-size:.85rem;opacity:.7;flex-shrink:0}
.il-footer-bottom{
  display:flex;align-items:center;justify-content:space-between;
  padding:20px 0;
  border-top:1px solid rgba(255,255,255,.07);
  font-size:.76rem;color:rgba(255,255,255,.45);
  margin-top:0;
}
.il-footer-bottom .fa{color:rgba(255,255,255,.45);font-weight:700}
.il-footer-bottom-right{display:flex;gap:20px;align-items:center;font-size:.74rem;color:rgba(255,255,255,.4)}
.il-footer-bottom-right span{display:flex;align-items:center;gap:5px}
.il-footer-bottom-right .hrt{color:${RED};font-size:.7rem}
.il-footer-made{color:rgba(255,255,255,.18)}
/* hide old social styles but keep references valid */
.il-socials,.il-social-link,.il-social-icon,.il-social-label-main,.il-social-label-sub,.il-socials-row,.il-social{display:none}

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

/* ── ANIMATIONS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
.il-reveal{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.il-reveal.visible{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){
  *{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
  .il-reveal{opacity:1!important;transform:none!important}
  .float-cta{animation:none!important}
  .bug-bg{animation:none!important}
}
:focus-visible{outline:3px solid #E8232A;outline-offset:3px;border-radius:3px}

/* ── MODALS ── */
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
.il-date-error{font-size:.76rem;color:${RED};font-weight:700;margin-bottom:8px}
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
.il-addr-section h4{font-family:'Montserrat',sans-serif;font-size:.97rem;font-weight:900;margin-bottom:11px;letter-spacing:-.02em}
.il-map-placeholder{border-radius:10px;border:1.5px solid ${BORDER};overflow:hidden}
.il-map-label{background:#fff;padding:8px 12px;display:flex;align-items:center;gap:5px;border-bottom:1px solid ${BORDER};font-size:.78rem;font-weight:700}
.il-map-label .pin{color:${RED}}
.il-map-note{font-size:.74rem;color:${MID};margin-top:6px;line-height:1.5}
.il-loc-btn{display:inline-flex;align-items:center;gap:5px;font-size:.79rem;color:${RED};font-weight:700;cursor:pointer;background:${RED_LT};border:1.5px solid rgba(232,35,42,.18);padding:5px 12px;border-radius:7px;font-family:'Nunito',sans-serif;margin-top:9px;transition:all .2s}
.il-loc-btn:hover{background:rgba(232,35,42,.12)}

/* Get Quote Modal */
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

/* ── SERVICE DETAIL MODAL ── */
.il-svc-modal-overlay{position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,0.72);display:flex;align-items:center;justify-content:center;padding:12px;opacity:0;pointer-events:none;transition:opacity .25s ease;backdrop-filter:blur(8px)}
.il-svc-modal-overlay.active{opacity:1;pointer-events:all}
.il-svc-modal{background:#0d1f3c;border-radius:24px;width:min(680px,100%);max-height:94vh;display:flex;flex-direction:column;box-shadow:0 40px 100px rgba(0,0,0,0.45);animation:svcModalUp .32s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden}
@keyframes svcModalUp{from{opacity:0;transform:translateY(28px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
.il-svc-modal-scroll{overflow-y:auto;flex:1;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
.il-svc-modal-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.18);border:1.5px solid rgba(255,255,255,0.22);color:#fff;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s,border-color .2s;z-index:20;font-family:'Nunito',sans-serif}
.il-svc-modal-close:hover{background:${RED};border-color:${RED}}
.il-svc-modal-hero{background:#0d1f3c;padding:44px 28px 0;position:relative;text-align:center}
.il-svc-modal-eyebrow{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:${RED};margin-bottom:12px;display:flex;align-items:center;justify-content:flex-start;gap:7px}
.il-svc-modal-eyebrow::before{content:'';width:16px;height:2px;background:${RED};border-radius:2px;flex-shrink:0}
.il-svc-modal-name{font-family:'Montserrat',sans-serif;font-size:clamp(1.7rem,5vw,2.4rem);font-weight:900;color:#fff;letter-spacing:-.04em;line-height:1.06;margin-bottom:12px;text-align:center}
.il-svc-modal-tagline{font-size:.9rem;color:rgba(255,255,255,0.55);line-height:1.65;max-width:480px;margin:0 auto 20px;text-align:center}
.il-svc-meta-pills{display:flex;gap:8px;flex-wrap:wrap;padding-bottom:28px;justify-content:center}
.il-svc-meta-pill{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:100px;padding:5px 14px;font-size:.75rem;font-weight:600;color:rgba(255,255,255,0.8);display:inline-flex;align-items:center;gap:5px}
.il-svc-modal-img-wrap{width:100%;background:#0d1f3c;line-height:0;flex-shrink:0}
.il-svc-modal-img-wrap img{width:100%;display:block;height:auto;max-height:none;object-fit:unset}
.il-svc-modal-body{padding:24px 28px 32px;background:#fff}
.il-svc-modal-section{margin-bottom:24px}
.il-svc-modal-section-title{font-family:'Montserrat',sans-serif;font-size:.7rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:${RED};margin-bottom:14px;display:flex;align-items:center;gap:8px}
.il-svc-modal-section-title::after{content:'';flex:1;height:1.5px;background:linear-gradient(to right,rgba(232,35,42,0.2),transparent)}
.il-svc-steps-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.il-svc-step-card{background:#f8faff;border:1.5px solid #e4eaf5;border-radius:14px;padding:16px;position:relative;overflow:hidden;transition:border-color .2s,box-shadow .2s}
.il-svc-step-card:hover{border-color:rgba(13,31,60,0.3);box-shadow:0 4px 16px rgba(13,31,60,0.08)}
.il-svc-step-num{position:absolute;top:10px;right:12px;font-size:2rem;font-weight:900;color:rgba(13,31,60,0.06);line-height:1;font-family:'Montserrat',sans-serif}
.il-svc-step-title{font-size:.88rem;font-weight:700;color:#0d1f3c;margin-bottom:4px;letter-spacing:-.01em}
.il-svc-step-desc{font-size:.78rem;color:${MID};line-height:1.6}
.il-svc-includes-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}
.il-svc-include-item{display:flex;align-items:center;gap:8px;font-size:.83rem;color:${CHARCOAL};background:#fff;border:1.5px solid #e4eaf5;border-radius:10px;padding:9px 13px;transition:border-color .2s}
.il-svc-include-item:hover{border-color:rgba(232,35,42,.25)}
.il-svc-include-check{width:18px;height:18px;border-radius:50%;background:${RED};color:#fff;font-size:.65rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.il-svc-modal-footer{position:sticky;bottom:0;display:flex;align-items:center;justify-content:space-between;padding:16px 28px;border-top:1.5px solid ${BORDER};background:#fdfaf9;gap:12px;z-index:5}
.il-svc-modal-footer-note{font-size:.78rem;color:${MID};font-weight:600;display:flex;align-items:center;gap:5px}
@media(max-width:600px){
  .il-svc-modal-overlay{padding:0;align-items:flex-end}
  .il-svc-modal{width:100%;max-height:96vh;border-radius:24px 24px 0 0}
  .il-svc-modal-hero{padding:44px 18px 0}
  .il-svc-steps-grid{grid-template-columns:1fr}
  .il-svc-includes-grid{grid-template-columns:1fr}
  .il-svc-modal-body{padding:18px 18px 24px}
  .il-svc-modal-footer{padding:14px 18px;flex-direction:column;align-items:stretch}
  .il-svc-modal-footer .btn-red{width:100%;justify-content:center}
  .il-svc-modal-footer-note{justify-content:center}
}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .pest-inner{grid-template-columns:1fr;gap:48px;text-align:center}
  .pest-logo-display{justify-content:center}
  .pest-crescent-wrap{width:320px;height:320px}
  .rip-crescent{width:280px;height:280px}
  .pest-services{grid-template-columns:repeat(3,1fr)}
  .pest-cta{justify-content:center}
  .pest-desc{margin:0 auto 36px}
  .il-hero{grid-template-columns:1fr;min-height:auto}
  .il-hero-left{padding:80px 5%}
  .il-hero-right{padding:60px 5%}
  .il-hero-left::after{display:none}
  .il-why-inner{grid-template-columns:1fr;gap:32px}
  .il-why-img{display:none}
  .il-steps{grid-template-columns:repeat(2,1fr)}
  .il-footer-grid{grid-template-columns:1fr 1fr;gap:28px}
  .il-svc-grid{grid-template-columns:1fr 1fr}
}
@media(min-width:901px){
  .il-nav-links{display:none!important}
  .il-nav-backdrop{display:none!important}
  .il-burger{display:none!important}
}
@media(max-width:900px){
  .il-topbar{display:none}
  .il-nav{top:0;padding:0 5%}
  .il-nav.scrolled{top:0}
  .il-nav-links-desktop{display:none}
  .il-burger{display:flex}
  .il-cta{flex-direction:column;text-align:center;padding:36px 20px;border-radius:16px;gap:28px}
  .il-cta-text h2{font-size:clamp(1.5rem,5vw,2rem)}
  .il-cta-text p{font-size:.9rem;max-width:100%}
  .il-cta-btns{flex-direction:column;align-items:stretch;width:100%}
  .il-cta-btns .il-btn-white,.il-cta-btns .il-btn-ow{width:100%;justify-content:center;text-align:center}
  .il-cta-contact-info{justify-content:center;flex-direction:column;align-items:center;gap:12px}
  .il-cta-info-item{flex-direction:column;align-items:center;text-align:center;gap:4px;font-size:.82rem;word-break:break-word;max-width:100%}
  .il-footer{padding:44px 5% 24px}
  .il-footer-bottom{flex-direction:column;gap:11px;text-align:center}
  .il-modal-body{padding:18px 16px}
  .il-modal-footer{padding:13px 16px}
  .il-svc-pick-grid{grid-template-columns:1fr}
  .il-property-grid{grid-template-columns:1fr}
  .il-form-row{grid-template-columns:1fr}
  .pest-services{grid-template-columns:1fr 1fr}
}
@media(max-width:600px){
  .il-nav{height:60px}
  .il-hero-left,.il-hero-right{padding:60px 5%}
  .il-steps{grid-template-columns:1fr}
  .il-footer-grid{grid-template-columns:1fr;gap:28px}
  .il-svc-grid{grid-template-columns:1fr}
  .il-gq-row{grid-template-columns:1fr}
  .il-contact-section{padding:0 4% 60px}
  .il-cta{padding:28px 16px;border-radius:14px}
  .il-cta-text h2{font-size:1.5rem}
  .pest-services{grid-template-columns:1fr 1fr}
  .il-svc-steps-grid,.il-svc-includes-grid{grid-template-columns:1fr}
}

/* ── PACKAGES SECTION ── */
.il-packages-section{
  padding:72px 0;background:#fff;
}
.il-packages-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:44px;
  align-items:stretch;max-width:1000px;margin-left:auto;margin-right:auto;
}
.il-pkg-card{
  border-radius:16px;padding:28px 24px 24px;position:relative;
  display:flex;flex-direction:column;
  transition:transform .28s,box-shadow .28s;
  box-shadow:0 2px 10px rgba(0,0,0,0.06);
}
.il-pkg-card:hover{transform:translateY(-4px);box-shadow:0 14px 36px rgba(0,0,0,0.13)}
.il-pkg-card.starter{background:#f4f6fb;border:1.5px solid #e4e9f2}
.il-pkg-card.popular{background:#1a2535;border:1.5px solid rgba(255,255,255,0.06)}
.il-pkg-card.pest{background:#111;border:1.5px solid rgba(232,35,42,0.2)}
/* badge */
.il-pkg-badge{
  position:absolute;top:0;right:20px;
  transform:translateY(-50%);
  padding:4px 13px;border-radius:50px;font-size:.6rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;
}
.badge-starter{background:${BLUE};color:#fff}
.badge-popular{background:${RED};color:#fff}
.badge-pest{background:${RED};color:#fff}
/* icon */
.il-pkg-icon{font-size:2rem;margin-bottom:14px;line-height:1;display:block;text-align:center}
/* name */
.il-pkg-name{
  font-family:'Montserrat',sans-serif;font-size:1.2rem;font-weight:900;
  letter-spacing:-.02em;line-height:1.15;margin-bottom:8px;text-align:center;
}
.il-pkg-card.starter .il-pkg-name{color:${DARK}}
.il-pkg-card.popular .il-pkg-name,.il-pkg-card.pest .il-pkg-name{color:#fff}
/* tagline */
.il-pkg-tagline{font-size:.8rem;line-height:1.55;margin-bottom:20px;text-align:center}
.il-pkg-card.starter .il-pkg-tagline{color:${MID}}
.il-pkg-card.popular .il-pkg-tagline,.il-pkg-card.pest .il-pkg-tagline{color:rgba(255,255,255,.65)}
/* list */
.il-pkg-list{list-style:none;display:flex;flex-direction:column;gap:9px;margin-bottom:22px;flex:1}
.il-pkg-list li{display:flex;align-items:flex-start;gap:8px;font-size:.82rem;font-weight:600;line-height:1.4}
.il-pkg-card.starter .il-pkg-list li{color:${DARK}}
.il-pkg-card.popular .il-pkg-list li,.il-pkg-card.pest .il-pkg-list li{color:rgba(255,255,255,.88)}
/* markers */
.il-pkg-marker{font-weight:900;font-size:.88rem;flex-shrink:0;line-height:1.5}
.marker-blue{color:${BLUE}}
.marker-red{color:${RED}}
.marker-skull{color:${RED}}
/* button */
.il-pkg-btn{
  width:100%;padding:13px;border:none;border-radius:9px;
  font-family:'Nunito',sans-serif;font-size:.9rem;font-weight:900;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:7px;
  transition:all .25s;letter-spacing:-.01em;margin-top:auto;
}
.pkg-btn-blue{background:linear-gradient(135deg,${BLUE},${BLUE2});color:#fff;box-shadow:0 4px 14px ${BLUE_GLOW}}
.pkg-btn-blue:hover{transform:translateY(-2px);box-shadow:0 8px 22px ${BLUE_GLOW}}
.pkg-btn-red{background:linear-gradient(135deg,${RED},${RED2});color:#fff;box-shadow:0 4px 14px ${RED_GLOW}}
.pkg-btn-red:hover{transform:translateY(-2px);box-shadow:0 8px 22px ${RED_GLOW}}
@media(max-width:900px){.il-packages-grid{grid-template-columns:1fr;max-width:400px}}
@media(max-width:600px){.il-packages-grid{max-width:100%}}
`;

// ── Logo component ──────────────────────────────────────────────────────────
const ILovahLogo = ({ size = 40 }) => (
  <img src={ilovahLogoSrc} alt="iLovah Logo" width={size} height={size} loading="eager" decoding="sync"
    style={{ borderRadius: 8, objectFit: "contain", display: "block", background: "#fff" }} />
);

// ── Reveal on scroll ────────────────────────────────────────────────────────
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

// ── Service image placeholder ───────────────────────────────────────────────
const SvcImg = ({ img, emoji, alt }) => (
  img
    ? <div className="il-svc-img-ph" style={{ padding: 0 }}>
      <img src={img} alt={alt || `${emoji} cleaning service Toowoomba`} loading="lazy" decoding="async" width="400" height="300" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform .4s ease" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      />
    </div>
    : <div className="il-svc-img-ph">
      <div className="il-svc-img-dashed"><span className="il-svc-img-icon" aria-hidden="true">{emoji}</span></div>
      <span className="il-svc-img-label">Service Photo</span>
    </div>
);

// ── Pest control crescent SVG (from index.html) ─────────────────────────────
const PestCrescent = () => (
  <svg className="rip-crescent" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bigCrescent" cx="35%" cy="25%" r="75%">
        <stop offset="0%" style={{ stopColor: "#ff4e55" }} />
        <stop offset="60%" style={{ stopColor: "#E8232A" }} />
        <stop offset="100%" style={{ stopColor: "#8b0e10" }} />
      </radialGradient>
      <filter id="bigGlow">
        <feGaussianBlur stdDeviation="6" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <path d="M200 20 A180 180 0 1 1 20 200 A120 120 0 1 0 200 20Z" fill="url(#bigCrescent)" filter="url(#bigGlow)" />
    <circle cx="145" cy="238" r="70" fill="#b01018" />
    <circle cx="145" cy="238" r="66" fill="#E8232A" />
    <ellipse cx="145" cy="250" rx="30" ry="22" fill="white" opacity="0.95" />
    <circle cx="145" cy="222" r="16" fill="white" opacity="0.95" />
    <circle cx="139" cy="219" r="3" fill="#E8232A" />
    <circle cx="151" cy="219" r="3" fill="#E8232A" />
    <line x1="140" y1="207" x2="130" y2="192" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <line x1="150" y1="207" x2="160" y2="192" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <line x1="115" y1="238" x2="90" y2="225" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <line x1="115" y1="250" x2="88" y2="250" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <line x1="115" y1="262" x2="90" y2="275" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <line x1="175" y1="238" x2="200" y2="225" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <line x1="175" y1="250" x2="202" y2="250" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <line x1="175" y1="262" x2="200" y2="275" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    <text x="158" y="215" fontFamily="Arial Black" fontSize="18" fill="white" fontWeight="900" opacity="0.9">zzz</text>
  </svg>
);

// ── Services data ───────────────────────────────────────────────────────────
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
const now = new Date();
const TAKEN_SLOTS = {}; // All slots available

// ── Reviews data ────────────────────────────────────────────────────────────
const REVIEWS_DATA = [
  { text: '"Great value for money and very professional service. The team was efficient and thorough, and the follow-up support has been excellent. Would definitely recommend!"', name: "Ben Miller", loc: "Toowoomba, QLD", initials: "B", color: "#2d8a4e", service: "Cleaning Service", date: "2 days ago", source: "Google", isNew: true, ownerReply: "Hi Ben, thank you so much for your kind words! We're thrilled to hear you had a great experience with us. Your recommendation means the world to our team. We look forward to serving you again! 😊 — iLovah Cleaning Services" },
  { text: '"Francis was able to help me out on short notice and he did such a thorough cleaning job for me. The best cleaner I\'ve come across in a long time and I will be recommending him to others."', name: "Renya S.", loc: "Amiens, QLD", initials: "RS", color: "#6b7280", service: "One Off Cleaning", date: "23 May 2024", source: "Hipages" },
  { text: '"Francis was really good, punctual, reliable and effective. I would recommend Francis for a good house and carpets cleaning."', name: "Pratibha", loc: "Toowoomba, QLD", initials: "P", color: "#2563eb", service: "End of Lease Cleaning", date: "27 Jul 2024", source: "Oneflare" },
  { text: '"Had a serious cockroach problem for months. Rest In Pest sorted it in one visit — haven\'t seen a single one since. Fast, professional, and affordable."', name: "David K.", loc: "Toowoomba, QLD", initials: "DK", color: RED_DK, service: "Pest Treatment", date: "14 Sep 2024", source: "Google" },
  { text: '"Friendly and expert clean."', name: "Tiffany H.", loc: "South Toowoomba, QLD", initials: "TH", color: "#6b7280", service: "House Cleaning", date: "22 May 2024", source: "Hipages" },
  { text: '"Prompt and professional Service. Would definitely recommend."', name: "Leanna T.", loc: "Wilsonton, QLD", initials: "LT", color: "#7c3aed", service: "Rental Bond Cleaning", date: "5 May 2024", source: "Hipages" },
  { text: '"Francis and his crew did an amazing job. Didn\'t think the house could get that clean. Great communication and very punctual and a very good price."', name: "Daniel B.", loc: "Meringandan West, QLD", initials: "DB", color: "#ea580c", service: "House Cleaning", date: "16 Aug 2024", source: "Hipages" },
  { text: '"Francis and the whole team are amazing! This is an extremely professional, efficient and pleasant team. Their prices are very fair, especially considering the quality and speed of their work. Hiring strangers to come into your home can be awkward, but this team are so pleasant and professional, we always feel safe and comfortable with them in the house. I highly recommend giving them a call, they\'ll have your home spotless in no time."', name: "Luke Cosgrove", loc: "Toowoomba, QLD", initials: "LC", color: "#1a73e8", service: "House Cleaning", date: "3 weeks ago", source: "Google", ownerReply: "Hi Luke, wow — thank you so much! We're so glad you feel comfortable and trust our team in your home. Comments like yours keep us motivated every single day. See you next time! 🙏 — iLovah Cleaning Services" },
];

const FAQ_CATS = ["All", "Booking & Pricing", "Cleaning", "Pest Control", "Service Areas", "Guarantees"];
const FAQS = [
  { cat: "Cleaning", q: "Do you guarantee bond back for end of lease cleaning?", a: "Yes! We offer a bond-back guarantee for all our end-of-lease cleaning services. If your landlord or property manager is not satisfied, we will return to re-clean at no additional cost — no questions asked." },
  { cat: "Booking & Pricing", q: "How do I book a cleaning or pest control service?", a: "You can book by clicking 'Get Quote' on our website, calling us on 0478 711 829, or emailing ilovahclean@gmail.com. We typically respond within 2 hours with a tailored quote." },
  { cat: "Booking & Pricing", q: "How far in advance should I book your services?", a: "We recommend booking at least 2–3 days in advance to secure your preferred time slot. For end-of-lease cleans, book as soon as you know your move-out date to ensure availability." },
  { cat: "Pest Control", q: "Are your pest treatments safe for children and pets?", a: "Absolutely. Rest In Pest uses certified, pet-safe and child-safe products for all treatments. We'll advise you on any brief ventilation period needed after application, typically 30–60 minutes." },
  { cat: "Cleaning", q: "Can I be present during the cleaning?", a: "Absolutely! You are welcome to stay home during the clean. Many clients also choose to leave while we work." },
  { cat: "Booking & Pricing", q: "Do you provide free quotes?", a: "Yes, all quotes are 100% free and obligation-free. Simply reach out via phone, email, or the booking form and we'll provide a detailed quote based on your specific needs." },
  { cat: "Guarantees", q: "Do you offer a satisfaction guarantee?", a: "We stand behind every clean with a 100% satisfaction guarantee. If you're not happy with any aspect of the service, contact us within 24 hours and we'll return to make it right at no extra charge." },
  { cat: "Service Areas", q: "What areas do you service?", a: "We service Toowoomba and all surrounding suburbs within ~50km, including North Toowoomba, East Toowoomba, South Toowoomba, Harristown, Rangeville, Newtown, Wilsonton, Rockville, Glenvale, Kearneys Spring, Middle Ridge, Centenary Heights, Drayton, Darling Heights, Highfields, Gatton, Pittsworth, Oakey, and Dalby." },
  { cat: "Pest Control", q: "How much does pest control cost in Toowoomba?", a: "Pest control services in Toowoomba typically range from $150 to $300, depending on the size of your property and the level of infestation. Contact us for a free, tailored quote." },
  { cat: "Pest Control", q: "How often should pest control be done in Queensland?", a: "Most homes in Queensland should have pest control done every 6 to 12 months for effective, ongoing protection against common pests like cockroaches, ants, and spiders." },
  { cat: "Cleaning", q: "What is included in bond cleaning?", a: "Bond cleaning includes a thorough deep clean of all areas — kitchens, bathrooms, floors, windows, and all living spaces — carried out to real estate standards to help you get your bond back." },
  { cat: "Pest Control", q: "Is pest control safe for pets and children?", a: "Yes. Our treatments are safe when applied by our licensed technicians. Once the treated areas are dry — typically 30 to 60 minutes — it is safe for both pets and children to return." },
  { cat: "Service Areas", q: "Do you service Highfields and surrounding areas?", a: "Yes! We regularly service Highfields, Oakey, Pittsworth, Gatton, Dalby, and all areas within approximately 50km of Toowoomba. Contact us to confirm availability for your specific suburb." },
  { cat: "Service Areas", q: "Do you cover Harristown, Rangeville, and Newtown?", a: "Absolutely. We regularly service Harristown, Rangeville, Newtown, Wilsonton, Rockville, Glenvale, Kearneys Spring, Middle Ridge, Centenary Heights, Drayton, Darling Heights, and all Toowoomba suburbs. Book online or call 0478 711 829." },
  { cat: "Booking & Pricing", q: "Can I book a same-day or next-day service in Toowoomba?", a: "Subject to availability, yes — we offer same-day and next-day bookings for bond cleans, pest control, and other services across Toowoomba and surrounds. Call 0478 711 829 directly for urgent bookings." },
  { cat: "Booking & Pricing", q: "What payment methods do you accept?", a: "We accept cash, bank transfer (EFT), and credit card. Payment is due on completion of service unless prior arrangements have been made." },
  { cat: "Cleaning", q: "How long does a bond clean take?", a: "Bond cleans typically take 4–8 hours depending on the size and condition of the property. A standard 3-bedroom home usually takes around 5–6 hours with our team." },
  { cat: "Guarantees", q: "Are you insured and licensed?", a: "Yes. iLovah Cleaning Services is fully insured for public liability, and all pest control work is carried out by licensed, certified technicians in accordance with Queensland regulations." },
  { cat: "Cleaning", q: "Do you bring your own cleaning supplies and equipment?", a: "Yes, we arrive fully equipped with all professional-grade cleaning products and equipment. You don't need to supply anything — just let us in and we'll handle the rest." },
];

// ── Reviews carousel ────────────────────────────────────────────────────────
function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const next = () => setCurrent(c => (c + 1) % REVIEWS_DATA.length);
  const prev = () => setCurrent(c => (c - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  useEffect(() => { timerRef.current = setInterval(next, 5500); return () => clearInterval(timerRef.current); }, []);
  const r = REVIEWS_DATA[current];
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div className="il-rev-card" key={current}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div className="il-rev-source">{r.source}</div>
          {r.isNew && (
            <span style={{
              fontSize: ".62rem", fontWeight: 900, letterSpacing: ".08em", textTransform: "uppercase",
              border: "1.5px solid #333", borderRadius: 4, padding: "2px 8px", color: "#333",
            }}>NEW</span>
          )}
        </div>
        <div className="il-rev-stars">★★★★★</div>
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
          <div style={{
            marginTop: 14, padding: "12px 14px",
            background: "rgba(255,255,255,0.06)", borderRadius: 10,
            borderLeft: `3px solid ${RED}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%", background: RED,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: ".65rem", fontWeight: 900, color: "#fff", flexShrink: 0,
              }}>iL</div>
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
        {REVIEWS_DATA.map((r, i) => <button key={i} className={`il-rev-dot ${i === current ? "active" : ""}`} onClick={() => setCurrent(i)} aria-label={`Review by ${r.name}`} />)}
      </div>
      <div className="il-rev-nav">
        <button className="il-rev-btn" onClick={prev} aria-label="Previous review">←</button>
        <button className="il-rev-btn" onClick={next} aria-label="Next review">→</button>
      </div>
    </div>
  );
}

// ── FAQ section ─────────────────────────────────────────────────────────────
function FaqSection({ onContact }) {
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? FAQS : FAQS.filter(f => f.cat === activeCat);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  const handleCat = (cat) => { setActiveCat(cat); setOpen(null); setShowAll(false); };

  return (
    <section className="il-faq-section" id="faq" aria-label="Frequently Asked Questions">
      <div className="il-wrap">
        <div className="il-faq-inner">
          <R style={{ textAlign: "center" }}>
            <div className="sec-tag-blue" style={{ display: "inline-block", marginBottom: 12 }}>FAQ</div>
            <h2 className="sec-h2" style={{ textAlign: "center" }}>Frequently Asked <span className="hl-red">Questions</span></h2>
            <p className="sec-sub" style={{ maxWidth: 520, margin: "0 auto 8px" }}>
              Browse by category or{" "}
              <button onClick={onContact} style={{ color: RED, background: "none", border: "none", cursor: "pointer", fontWeight: 800, fontSize: "inherit", fontFamily: "inherit", textDecoration: "underline" }}>
                contact us
              </button>{" "}if you can't find your answer.
            </p>
          </R>

          {/* Category filter pills */}
          <div className="il-faq-cats" role="tablist" aria-label="FAQ categories">
            {FAQ_CATS.map(cat => (
              <button
                key={cat}
                className={`il-faq-cat ${activeCat === cat ? "active" : ""}`}
                onClick={() => handleCat(cat)}
                role="tab"
                aria-selected={activeCat === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion items */}
          <div className="il-faq-list" role="list">
            {visible.map((f, i) => {
              const idx = FAQS.indexOf(f);
              const isOpen = open === idx;
              return (
                <div key={idx} className={`il-faq-item ${isOpen ? "open" : ""}`} role="listitem">
                  <button
                    className="il-faq-q"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-q-${idx}`}
                  >
                    <span>{f.q}</span>
                    <span className="il-faq-icon" aria-hidden="true">+</span>
                  </button>
                  <div
                    className="il-faq-a"
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-q-${idx}`}
                  >
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
  );
}

// ── Service Areas Accordion ──────────────────────────────────────────────────
const SERVICE_AREAS = [
  {
    region: "Toowoomba City",
    emoji: "🏙️",
    desc: "Full service coverage across all city suburbs",
    suburbs: ["North Toowoomba", "East Toowoomba", "South Toowoomba", "Harristown", "Rangeville", "Newtown", "Wilsonton", "Rockville", "Glenvale"],
    services: ["Bond Cleaning", "Carpet Cleaning", "Pest Control", "Window Cleaning"],
    postcode: "4350",
  },
  {
    region: "Toowoomba Inner West",
    emoji: "🏡",
    desc: "Kearneys Spring, Middle Ridge & surrounds",
    suburbs: ["Kearneys Spring", "Middle Ridge", "Mount Lofty", "Centenary Heights", "Drayton", "Darling Heights"],
    services: ["Bond Cleaning", "Pest Control", "Gutter Cleaning", "General Clean"],
    postcode: "4350",
  },
  {
    region: "Highfields & North",
    emoji: "🌿",
    desc: "Highfields corridor and northern growth areas",
    suburbs: ["Highfields", "Meringandan", "Meringandan West", "Wyreema", "Cambooya"],
    services: ["Bond Cleaning", "Pest Control", "Pressure Washing"],
    postcode: "4352",
  },
  {
    region: "Gatton & Lockyer Valley",
    emoji: "🌾",
    desc: "Gatton, Laidley and surrounding valley towns",
    suburbs: ["Gatton", "Laidley", "Plainland", "Forest Hill", "Hatton Vale"],
    services: ["Pest Control", "Bond Cleaning", "General Clean"],
    postcode: "4343",
  },
  {
    region: "Pittsworth & South West",
    emoji: "🌄",
    desc: "Pittsworth, Millmerran and south-west region",
    suburbs: ["Pittsworth", "Millmerran", "Greenmount", "Brookstead"],
    services: ["Pest Control", "Bond Cleaning", "Carpet Cleaning"],
    postcode: "4356",
  },
  {
    region: "Oakey & Darling Downs",
    emoji: "🌻",
    desc: "Oakey, Dalby and western Darling Downs",
    suburbs: ["Oakey", "Dalby", "Jondaryan", "Bowenville"],
    services: ["Pest Control", "Bond Cleaning", "Pressure Washing"],
    postcode: "4401",
  },
];

function ServiceAreasSection({ onBook }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="il-areas-section" id="service-areas" aria-label="Service areas across Toowoomba and surrounds">
      <div className="il-wrap">
        <div className="il-areas-inner">
          <R style={{ textAlign: "center" }}>
            <div className="sec-tag-blue" style={{ display: "inline-block", marginBottom: 12 }}>Coverage</div>
            <h2 className="sec-h2" style={{ textAlign: "center" }}>Areas We <span className="hl-red">Service</span></h2>
            <p className="sec-sub" style={{ maxWidth: 560, margin: "0 auto" }}>
              Based in North Toowoomba, we cover the full city and all surrounding regions within ~50km. Click your area to see suburbs and available services.
            </p>
          </R>
          <div className="il-areas-grid">
            {SERVICE_AREAS.map((area, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`il-area-item ${isOpen ? "open" : ""}`}>
                  <button
                    className="il-area-q"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`area-body-${i}`}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: "1.1rem" }}>{area.emoji}</span>
                      <span>
                        <span style={{ display: "block", fontWeight: 900, fontSize: ".9rem" }}>{area.region}</span>
                        <span style={{ display: "block", fontWeight: 600, fontSize: ".74rem", color: "#6b7280", fontFamily: "'Nunito',sans-serif", marginTop: 1 }}>{area.postcode}</span>
                      </span>
                    </span>
                    <span className="il-area-ico" aria-hidden="true">▾</span>
                  </button>
                  <div className="il-area-body" id={`area-body-${i}`}>
                    <p style={{ fontSize: ".82rem", color: "#6b7280", marginBottom: 8, fontStyle: "italic" }}>{area.desc}</p>
                    <div style={{ fontSize: ".78rem", fontWeight: 800, color: "#111827", marginBottom: 5, fontFamily: "'Montserrat',sans-serif" }}>Suburbs:</div>
                    <div className="il-area-tags">
                      {area.suburbs.map(s => <span key={s} className="il-area-tag">{s}</span>)}
                    </div>
                    <div style={{ fontSize: ".78rem", fontWeight: 800, color: "#111827", margin: "10px 0 5px", fontFamily: "'Montserrat',sans-serif" }}>Available services:</div>
                    <div className="il-area-tags">
                      {area.services.map(s => (
                        <span key={s} style={{ background: "rgba(43,143,212,0.08)", color: "#2B8FD4", borderRadius: 4, padding: "2px 8px", fontSize: ".72rem", fontWeight: 800, fontFamily: "'Nunito',sans-serif" }}>{s}</span>
                      ))}
                    </div>
                    <button
                      onClick={onBook}
                      style={{ marginTop: 12, background: RED, color: "#fff", border: "none", borderRadius: 7, padding: "8px 16px", fontSize: ".78rem", fontWeight: 800, cursor: "pointer", fontFamily: "'Nunito',sans-serif", width: "100%" }}
                    >
                      Book for {area.region} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", marginTop: 28, fontSize: ".82rem", color: "#6b7280" }}>
            Not sure if we cover your area?{" "}
            <a href="tel:0478711829" style={{ color: RED, fontWeight: 800, textDecoration: "none" }}>Call 0478 711 829</a>
            {" "}and we'll confirm in seconds.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Get In Touch Form ────────────────────────────────────────────────────────
function GetInTouchForm({ onQuote }) {
  const [form, setForm] = useState({ firstName: "", phone: "", email: "", service: "", address: "", details: "" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = () => {
    if (!form.firstName || !form.phone) return;
    setSent(true);
  };
  if (sent) return (
    <div className="il-git-form-wrap" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 360, gap: 16 }}>
      <div style={{ fontSize: "3rem" }}>✅</div>
      <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: "#fff", fontSize: "1.5rem", letterSpacing: "-.03em" }}>Quote Request Sent!</h3>
      <p style={{ color: "rgba(255,255,255,.5)", fontSize: ".92rem", lineHeight: 1.65, maxWidth: 300 }}>Thanks {form.firstName}! We'll get back to you within 1 hour during business hours.</p>
      <button className="il-git-submit" style={{ maxWidth: 200, marginTop: 8 }} onClick={() => { setSent(false); setForm({ firstName: "", phone: "", email: "", service: "", address: "", details: "" }); }}>Send Another</button>
    </div>
  );
  return (
    <div className="il-git-form-wrap">
      <div className="il-git-form-row">
        <div className="il-git-form-group">
          <label htmlFor="git-firstName">First Name</label>
          <input id="git-firstName" type="text" placeholder="Jane" value={form.firstName} onChange={e => set("firstName", e.target.value)} />
        </div>
        <div className="il-git-form-group">
          <label htmlFor="git-phone">Phone</label>
          <input id="git-phone" type="tel" placeholder="04XX XXX XXX" value={form.phone} onChange={e => set("phone", e.target.value)} />
        </div>
      </div>
      <div className="il-git-form-row">
        <div className="il-git-form-group">
          <label htmlFor="git-email">Email</label>
          <input id="git-email" type="email" placeholder="jane@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
        </div>
        <div className="il-git-form-group">
          <label htmlFor="git-service">Service Needed</label>
          <select id="git-service" value={form.service} onChange={e => set("service", e.target.value)}>
            <option value="">Select service...</option>
            <option>Bond / End of Lease Cleaning</option>
            <option>Dry Carpet Cleaning</option>
            <option>Window Cleaning</option>
            <option>Gutter Cleaning</option>
            <option>Pressure Washing</option>
            <option>General House Clean</option>
            <option>Pest Control</option>
            <option>Pram Cleaning</option>
            <option>Bundle (Cleaning + Pest)</option>
          </select>
        </div>
      </div>
      <div className="il-git-form-group">
        <label htmlFor="git-address">Property Address</label>
        <input id="git-address" type="text" placeholder="123 Main Street, Toowoomba" value={form.address} onChange={e => set("address", e.target.value)} />
      </div>
      <div className="il-git-form-group">
        <label htmlFor="git-details">Additional Details</label>
        <textarea id="git-details" rows={4} placeholder="e.g. 3 bed/2 bath, cockroach problem in kitchen, need clean by Friday..." value={form.details} onChange={e => set("details", e.target.value)} />
      </div>
      <button className={`il-git-submit${sent ? " sent" : ""}`} onClick={handleSubmit}>
        ✦ Get Instant Quote
      </button>
      <div className="il-git-disclaimer">🔒 No spam. We respond within 1 hour during business hours.</div>
    </div>
  );
}

// ── Before/After slider ─────────────────────────────────────────────────────
const BA_SETS = [
  { label: "Kitchen", before: imgBeforeKitchen, after: imgAfterKitchen },
  { label: "Carpet", before: imgBeforeCarpet, after: imgAfterCarpet },
  { label: "Gutter", before: imgBeforeGutter, after: imgAfterGutter },
  { label: "Pram", before: imgBeforePram, after: imgAfterPram },
  { label: "Windows", before: imgBeforeWindow, after: imgAfterWindow },
  { label: "Sala", before: imgBeforeSala, after: imgAfterSala },
  { label: "Bedroom", before: imgBeforeBedroom, after: imgAfterBedroom },
  { label: "Bedroom 2", before: imgBeforeBedroom2, after: imgAfterBedroom2 },
  { label: "Roof", before: imgBeforeRoof, after: imgAfterRoof },
];
function BeforeAfterSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [fading, setFading] = useState(false);

  const goTo = (i) => {
    if (i === current || fading) return;
    setFading(true);
    setPrev(current);
    setTimeout(() => {
      setCurrent(i);
      setPrev(null);
      setFading(false);
    }, 500);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => {
        const next = (c + 1) % BA_SETS.length;
        setFading(true);
        setPrev(c);
        setTimeout(() => { setPrev(null); setFading(false); }, 500);
        return next;
      });
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="il-ba-wrap">
      <div className="il-ba-slider">
        <div className="il-ba-images">
          {/* Before side */}
          <div className="il-ba-img-side">
            {BA_SETS.map((s, i) => (
              <img key={i} src={s.before} alt={`Before ${s.label} cleaning – iLovah Cleaning Services Toowoomba`}
                loading="lazy"
                className={i === current ? "visible" : "hidden"} />
            ))}
          </div>
          {/* After side */}
          <div className="il-ba-img-side">
            {BA_SETS.map((s, i) => (
              <img key={i} src={s.after} alt={`After ${s.label} cleaning – professional results by iLovah Toowoomba`}
                loading="lazy"
                className={i === current ? "visible" : "hidden"} />
            ))}
          </div>
        </div>
        <div className="il-ba-divider" />
      </div>
      <div className="il-ba-labels">
        <div className="il-ba-label before">Before</div>
        <div className="il-ba-label after">After ✓</div>
      </div>
      <div className="il-ba-dots">
        {BA_SETS.map((s, i) => (
          <button key={i} className={`il-ba-dot ${i === current ? "active" : ""}`} onClick={() => goTo(i)} aria-label={`View ${s.label} before and after`} />
        ))}
      </div>
    </div>
  );
}

// ── Service picker (booking modal step 1) ───────────────────────────────────
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
                  <img src={s.img} alt={`${s.name} – iLovah Cleaning Services Toowoomba`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 8 }} />
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
              <button className="il-svc-view-toggle" onClick={e => { e.stopPropagation(); setExpanded(isOpen ? null : i); }} aria-expanded={isOpen} aria-label={isOpen ? `Hide details for ${s.name}` : `View details for ${s.name}`}>
                {isOpen ? "View Less ▲" : "View More ▶"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── Property step ────────────────────────────────────────────────────────────
function PropertyStep({ street, setStreet, suburb, setSuburb, propState, setPropState, postcode, setPostcode, notes, setNotes, errors = {}, touched = {}, setErrors, setTouched }) {
  const [locStatus, setLocStatus] = useState("");
  const [mapSrc, setMapSrc] = useState("https://maps.google.com/maps?q=Toowoomba,QLD,Australia&z=11&output=embed");
  const updateMap = (sub, st) => {
    const q = [sub, st, "Australia"].filter(Boolean).join(", ");
    setMapSrc(`https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=13&output=embed`);
  };
  const useIPLocation = async () => {
    try {
      const r = await fetch("https://ipapi.co/json/");
      const d = await r.json();
      if (d.city) { setSuburb(d.city); setPropState(d.region_code || "QLD"); setPostcode(d.postal || ""); updateMap(d.city, d.region_code); setLocStatus("✓ Location estimated from IP"); }
      else setLocStatus("⚠ Could not detect location");
    } catch { setLocStatus("⚠ Could not detect location"); }
  };
  const handleLocate = () => {
    if (!navigator.geolocation) { setLocStatus("Locating via IP..."); useIPLocation(); return; }
    setLocStatus("Locating...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setMapSrc(`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`);
        try {
          const r = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
          const d = await r.json();
          setStreet(""); setSuburb(d.locality || d.city || ""); setPropState(d.principalSubdivisionCode?.replace("AU-", "") || "QLD"); setPostcode(d.postcode || "");
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
            <label htmlFor="prop-street">Street Address <span style={{ color: RED }} aria-hidden="true">*</span></label>
            <input id="prop-street" type="text" value={street} onChange={e => { setStreet(e.target.value); if (setErrors) setErrors(p => ({ ...p, street: "" })); }} onBlur={() => setTouched && setTouched(p => ({ ...p, street: true }))} placeholder="123 Main Street" className={errors.street && touched.street ? "error" : ""} aria-required="true" />
            {errors.street && touched.street && <div className="il-field-error" role="alert">{errors.street}</div>}
          </div>
          <div className="il-form-row">
            <div className="il-form-group">
              <label htmlFor="prop-suburb">Suburb <span style={{ color: RED }} aria-hidden="true">*</span></label>
              <input id="prop-suburb" type="text" value={suburb} onChange={e => { setSuburb(e.target.value); updateMap(e.target.value, propState); if (setErrors) setErrors(p => ({ ...p, suburb: "" })); }} onBlur={() => setTouched && setTouched(p => ({ ...p, suburb: true }))} placeholder="Toowoomba" className={errors.suburb && touched.suburb ? "error" : ""} aria-required="true" />
              {errors.suburb && touched.suburb && <div className="il-field-error" role="alert">{errors.suburb}</div>}
            </div>
            <div className="il-form-group">
              <label htmlFor="prop-state">State</label>
              <input id="prop-state" type="text" value={propState} onChange={e => { setPropState(e.target.value); updateMap(suburb, e.target.value); }} placeholder="QLD" />
            </div>
          </div>
          <div className="il-form-row">
            <div className="il-form-group">
              <label htmlFor="prop-postcode">Postcode <span style={{ color: RED }} aria-hidden="true">*</span></label>
              <input id="prop-postcode" type="text" value={postcode} onChange={e => { setPostcode(e.target.value); if (setErrors) setErrors(p => ({ ...p, postcode: "" })); }} onBlur={() => setTouched && setTouched(p => ({ ...p, postcode: true }))} placeholder="4350" className={errors.postcode && touched.postcode ? "error" : ""} aria-required="true" />
              {errors.postcode && touched.postcode && <div className="il-field-error" role="alert">{errors.postcode}</div>}
            </div>
            <div className="il-form-group">
              <label htmlFor="prop-country">Country</label>
              <input id="prop-country" type="text" defaultValue="Australia" readOnly />
            </div>
          </div>
          <button className="il-loc-btn" onClick={handleLocate}>📍 Use my current location</button>
          {locStatus && <p style={{ fontSize: ".74rem", color: locStatus.startsWith("✓") ? "#16a34a" : RED, marginTop: 7, fontWeight: 700 }} role="status">{locStatus}</p>}
        </div>
        <div>
          <div className="il-form-group" style={{ marginBottom: 8 }}><label id="coverage-map-label">Coverage Map</label></div>
          <div className="il-map-placeholder" aria-labelledby="coverage-map-label">
            <div className="il-map-label"><span aria-hidden="true" className="pin">📍</span> Toowoomba &amp; Surrounds</div>
            <div style={{ height: 200 }}>
              <iframe key={mapSrc} src={mapSrc} width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Coverage Map – Toowoomba and surrounding areas" />
            </div>
          </div>
          <p className="il-map-note">We cover Toowoomba &amp; surrounds within ~50km.</p>
        </div>
      </div>
      <div className="il-form-group" style={{ marginTop: 16 }}>
        <label htmlFor="prop-notes">Additional Notes</label>
        <textarea id="prop-notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. 3 bed/2 bath, cockroach problem, need clean by Friday…" rows={3} />
      </div>
    </>
  );
}

// ── Service Detail Modal ─────────────────────────────────────────────────────
function ServiceDetailModal({ service, onClose, onBook }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    if (!service) return;
    document.body.style.overflow = "hidden";
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    return () => { document.body.style.overflow = ""; };
  }, [service]);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);
  if (!service) return null;
  return (
    <div className="il-svc-modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="il-svc-modal">
        <button className="il-svc-modal-close" onClick={onClose} aria-label="Close service details">✕</button>
        <div className="il-svc-modal-scroll" ref={scrollRef}>
          <div className="il-svc-modal-hero">
            <div className="il-svc-modal-eyebrow">What We Offer</div>
            <div className="il-svc-modal-name">{service.name}</div>
            <div className="il-svc-modal-tagline">{service.desc}</div>
            <div className="il-svc-meta-pills">
              <span className="il-svc-meta-pill">🏠 {service.ideal}</span>
            </div>
          </div>
          <div className="il-svc-modal-img-wrap">
            <img src={service.img} alt={`${service.name} – professional cleaning service in Toowoomba QLD`} loading="lazy" decoding="async" width="680" height="400" style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="il-svc-modal-body">
            <div className="il-svc-modal-section">
              <div className="il-svc-modal-section-title">How It Works</div>
              <div className="il-svc-steps-grid">
                {service.steps.map((step, i) => (
                  <div key={i} className="il-svc-step-card">
                    <div className="il-svc-step-num">{i + 1}</div>
                    <div className="il-svc-step-title">{step.title}</div>
                    <div className="il-svc-step-desc">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="il-svc-modal-section">
              <div className="il-svc-modal-section-title">What's Included</div>
              <div className="il-svc-includes-grid">
                {service.includes.map((item, i) => (
                  <div key={i} className="il-svc-include-item">
                    <span className="il-svc-include-check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="il-svc-modal-footer">
            <div className="il-svc-modal-footer-note">🛡️ 100% satisfaction guarantee</div>
            <button className="btn-red" style={{ padding: "11px 28px", fontSize: ".9rem", display: "inline-flex", alignItems: "center", gap: 8 }} onClick={() => { onClose(); onBook(service.name); }}>
              Book Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Booking Modal ────────────────────────────────────────────────────────────
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
        body: JSON.stringify({ type: "booking", service: service || "General House Clean", date: `${MONTHS[month]} ${selDay}, ${year}`, time: selTime, urgency, firstName, lastName, email, phone, pref, street, suburb, propState, postcode, notes, submittedAt: new Date().toLocaleString("en-AU") }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Send failed");
      setSubmitted(true); setTimeout(() => { handleClose(); }, 2800);
    } catch (err) { setSendError("Failed to send. Please try again or call us directly."); }
    finally { setSending(false); }
  };

  return (
    <div className={`il-overlay ${isOpen ? "active" : ""}`} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="il-modal">
        <div className="il-progress-bar"><div className="il-progress-fill" style={{ width: progressWidth }} /></div>
        <div className="il-stepper">
          <button className={`il-stepper-back ${step === 1 ? "hidden" : ""}`} onClick={() => setStep(s => s - 1)} aria-label="Go to previous step">‹</button>
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
          <button className="il-stepper-close" onClick={handleClose} aria-label="Close booking modal">✕</button>
        </div>
        <div className="il-modal-body">
          <div className="il-step-content">
            {step === 1 && <ServicePicker service={service} setService={setService} />}
            {step === 2 && (
              <>
                <h3>Your Contact Details</h3>
                <p className="il-modal-sub">We'll send your quote within 2 hours</p>
                {service && <div className="il-selected-svc-pill"><span className="il-selected-svc-check">✓</span><span>Booking: <strong>{service}</strong></span><button onClick={() => setStep(1)} className="il-selected-svc-change">Change</button></div>}
                {Object.keys(errors).length > 0 && <div className="il-step-error-banner" role="alert">⚠ Please fill in all required fields before continuing</div>}
                <div className="il-form-row">
                  <div className="il-form-group">
                    <label htmlFor="bk-firstName">First Name <span style={{ color: RED }} aria-hidden="true">*</span></label>
                    <input id="bk-firstName" type="text" value={firstName} onChange={e => { setFirstName(e.target.value); if (errors.firstName) setErrors(p => ({ ...p, firstName: "" })); }} onBlur={() => setTouched(p => ({ ...p, firstName: true }))} placeholder="Jane" className={errors.firstName && touched.firstName ? "error" : ""} aria-required="true" />
                    {errors.firstName && touched.firstName && <div className="il-field-error" role="alert">{errors.firstName}</div>}
                  </div>
                  <div className="il-form-group">
                    <label htmlFor="bk-lastName">Last Name <span style={{ color: RED }} aria-hidden="true">*</span></label>
                    <input id="bk-lastName" type="text" value={lastName} onChange={e => { setLastName(e.target.value); if (errors.lastName) setErrors(p => ({ ...p, lastName: "" })); }} onBlur={() => setTouched(p => ({ ...p, lastName: true }))} placeholder="Smith" className={errors.lastName && touched.lastName ? "error" : ""} aria-required="true" />
                    {errors.lastName && touched.lastName && <div className="il-field-error" role="alert">{errors.lastName}</div>}
                  </div>
                </div>
                <div className="il-form-row">
                  <div className="il-form-group">
                    <label htmlFor="bk-email">Email <span style={{ color: RED }} aria-hidden="true">*</span></label>
                    <input id="bk-email" type="email" value={email} onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: "" })); }} onBlur={() => setTouched(p => ({ ...p, email: true }))} placeholder="jane@example.com" className={errors.email && touched.email ? "error" : ""} aria-required="true" />
                    {errors.email && touched.email && <div className="il-field-error" role="alert">{errors.email}</div>}
                  </div>
                  <div className="il-form-group">
                    <label htmlFor="bk-phone">Phone <span style={{ color: RED }} aria-hidden="true">*</span></label>
                    <input id="bk-phone" type="tel" value={phone} onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: "" })); }} onBlur={() => setTouched(p => ({ ...p, phone: true }))} placeholder="0400 000 000" className={errors.phone && touched.phone ? "error" : ""} aria-required="true" />
                    {errors.phone && touched.phone && <div className="il-field-error" role="alert">{errors.phone}</div>}
                  </div>
                </div>
                <div className="il-form-group">
                  <label id="contact-pref-label">Preferred contact method</label>
                  <div className="il-contact-pref" role="group" aria-labelledby="contact-pref-label">
                    {[{ label: "Phone", ico: "📞" }, { label: "Email", ico: "✉️" }, { label: "SMS", ico: "💬" }].map(p => (
                      <button key={p.label} className={`il-pref-btn ${pref === p.label ? "active" : ""}`} onClick={() => setPref(p.label)} aria-pressed={pref === p.label}><span className="il-pref-ico" aria-hidden="true">{p.ico}</span>{p.label}</button>
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
                  <label htmlFor="bk-urgency">Urgency</label>
                  <select id="bk-urgency" value={urgency} onChange={e => setUrgency(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${BORDER}`, fontFamily: "'Nunito',sans-serif", fontSize: ".87rem", outline: "none", color: CHARCOAL, background: "#fff" }}>
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
                  <div className="il-review-row"><span>Service</span><span>{service || "General House Clean"}</span></div>
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

// ── Get Quote Modal ──────────────────────────────────────────────────────────
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
          <button className="il-gq-close" onClick={onClose} aria-label="Close quote modal">✕</button>
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
                  <label htmlFor="gq-firstName">First Name <span aria-hidden="true">*</span></label>
                  <input id="gq-firstName" type="text" value={firstName} onChange={e => { setFirstName(e.target.value); if (errors.firstName) setErrors(p => ({ ...p, firstName: "" })); }} placeholder="Jane" className={errors.firstName ? "error" : ""} aria-required="true" />
                  {errors.firstName && <div className="il-gq-field-error" role="alert">{errors.firstName}</div>}
                </div>
                <div className="il-gq-group">
                  <label htmlFor="gq-phone">Phone <span aria-hidden="true">*</span></label>
                  <input id="gq-phone" type="tel" value={phone} onChange={e => { setPhone(e.target.value); if (errors.phone) setErrors(p => ({ ...p, phone: "" })); }} placeholder="04XX XXX XXX" className={errors.phone ? "error" : ""} aria-required="true" />
                  {errors.phone && <div className="il-gq-field-error" role="alert">{errors.phone}</div>}
                </div>
              </div>
              <div className="il-gq-group">
                <label htmlFor="gq-email">Email <span aria-hidden="true">*</span></label>
                <input id="gq-email" type="email" value={email} onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: "" })); }} placeholder="jane@email.com" className={errors.email ? "error" : ""} aria-required="true" />
                {errors.email && <div className="il-gq-field-error" role="alert">{errors.email}</div>}
              </div>
              <div className="il-gq-group">
                <label htmlFor="gq-service">Service Needed <span aria-hidden="true">*</span></label>
                <select id="gq-service" value={service} onChange={e => { setService(e.target.value); if (errors.service) setErrors(p => ({ ...p, service: "" })); }} className={errors.service ? "error" : ""} aria-required="true">
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
                {errors.service && <div className="il-gq-field-error" role="alert">{errors.service}</div>}
              </div>
              <div className="il-gq-group">
                <label htmlFor="gq-address">Property Address</label>
                <input id="gq-address" type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main Street, Toowoomba" />
              </div>
              <div className="il-gq-group">
                <label htmlFor="gq-notes">Additional Details</label>
                <textarea id="gq-notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. 3 bed/2 bath, cockroach problem, need service by Friday…" rows={3} />
              </div>
              {sendError && <p style={{ color: RED, fontSize: ".82rem", fontWeight: 700, textAlign: "center" }} role="alert">{sendError}</p>}
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

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // When navigating back from PestControlPage with a section target, scroll to it
  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      // Clear the state so refreshing doesn't re-trigger the scroll
      window.history.replaceState({}, "");
    }
  }, [location.state]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState("");
  const [detailService, setDetailService] = useState(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState("");
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    let ticking = false;
    const h = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 30); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % 2), 4000);
    return () => clearInterval(t);
  }, []);

  // ── SEO: meta tags, Open Graph, JSON-LD structured data ──────────────────
  useEffect(() => {
    const BASE_URL = "https://www.ilovahcleaningservices.com.au";

    // Page title — keyword-rich, under 60 chars for Google
    document.title = "iLovah Cleaning Services | Bond Cleaning, Carpet & Pest Control Toowoomba";

    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const setLink = (rel, href, extra = {}) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
      el.setAttribute("href", href);
      Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
    };

    // ── Font loading (non-blocking, swap, preconnect for speed) ──────────
    if (!document.getElementById("il-gfonts")) {
      // Preconnect for DNS resolution speed
      const pc1 = document.createElement("link");
      pc1.rel = "preconnect"; pc1.href = "https://fonts.googleapis.com";
      document.head.prepend(pc1);
      const pc2 = document.createElement("link");
      pc2.rel = "preconnect"; pc2.href = "https://fonts.gstatic.com"; pc2.crossOrigin = "anonymous";
      document.head.prepend(pc2);
      // Load fonts with display=swap (avoids FOIT)
      const gf = document.createElement("link");
      gf.id = "il-gfonts"; gf.rel = "stylesheet";
      gf.href = "https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Nunito:wght@400;600;700;800;900&family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&display=swap";
      document.head.appendChild(gf);
    }
    // Set lang attribute for accessibility
    document.documentElement.lang = "en-AU";

    // ── Core meta ──────────────────────────────────────────────────────────
    // Description: 150–160 chars, includes primary keyword + CTA
    setMeta("description", "iLovah Cleaning Services – Toowoomba's trusted bond cleaning, dry carpet cleaning, pest control & more. Family-owned, fully insured, bond-back guaranteed. Free quotes in 1 hr. Call 0478 711 829.");
    // Keywords: long-tail + suburb-level targeting
    setMeta("keywords", "bond cleaning Toowoomba, end of lease cleaning Toowoomba, carpet cleaning Toowoomba QLD, pest control Toowoomba, window cleaning Toowoomba, gutter cleaning Toowoomba, pressure washing Toowoomba, pram cleaning Toowoomba, house cleaning Toowoomba, cleaning services North Toowoomba, bond back guarantee QLD, iLovah cleaning, Rest In Pest Control, cockroach treatment Toowoomba, ant pest control Toowoomba 4350, bond cleaning Harristown, carpet cleaning Rangeville, pest control Highfields, cleaning services Newtown Toowoomba, bond cleaning Glenvale, house cleaning Kearneys Spring, pest control Middle Ridge, cleaning Darling Heights, bond cleaning Wilsonton, end of lease Centenary Heights, carpet cleaning South Toowoomba, pest control Drayton, gutter cleaning East Toowoomba, bond cleaning Rockville, cleaning services Pittsworth, pest control Oakey QLD, cleaning Gatton QLD, house cleaning Mount Lofty Toowoomba");
    setMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setMeta("googlebot", "index, follow, max-snippet:-1, max-image-preview:large");
    setMeta("author", "iLovah Cleaning Services");
    setMeta("publisher", "iLovah Cleaning Services");
    setMeta("copyright", "iLovah Cleaning Services");
    setMeta("rating", "General");
    setMeta("revisit-after", "7 days");
    setMeta("language", "en-AU");
    setMeta("content-language", "en-AU");

    // ── Viewport & mobile ──────────────────────────────────────────────────
    setMeta("viewport", "width=device-width, initial-scale=1.0, maximum-scale=5.0");
    setMeta("theme-color", "#E8232A");
    setMeta("mobile-web-app-capable", "yes");
    setMeta("apple-mobile-web-app-capable", "yes");
    setMeta("apple-mobile-web-app-status-bar-style", "black-translucent");
    setMeta("apple-mobile-web-app-title", "iLovah Cleaning");
    setMeta("application-name", "iLovah Cleaning Services");
    setMeta("msapplication-TileColor", "#E8232A");

    // ── Geo / local SEO ────────────────────────────────────────────────────
    setMeta("geo.region", "AU-QLD");
    setMeta("geo.placename", "Toowoomba, Queensland, Australia");
    setMeta("geo.position", "-27.5598;151.9507");
    setMeta("ICBM", "-27.5598, 151.9507");

    // ── Canonical & preconnect ─────────────────────────────────────────────
    setLink("canonical", `${BASE_URL}/`);
    setLink("preconnect", "https://fonts.googleapis.com");
    setLink("preconnect", "https://fonts.gstatic.com", { crossorigin: "" });
    setLink("dns-prefetch", "https://www.google.com");
    setLink("dns-prefetch", "https://maps.googleapis.com");

    // ── Open Graph (Facebook / LinkedIn / WhatsApp previews) ───────────────
    setMeta("og:type", "website", "property");
    setMeta("og:title", "iLovah Cleaning Services | Bond, Carpet & Pest Control – Toowoomba QLD", "property");
    setMeta("og:description", "Professional bond cleaning, dry carpet cleaning, window & gutter cleaning, and licensed pest control in Toowoomba & surrounds. Family-owned. Bond-back guaranteed. Free quotes within 1 hour.", "property");
    setMeta("og:url", `${BASE_URL}/`, "property");
    setMeta("og:site_name", "iLovah Cleaning Services", "property");
    setMeta("og:locale", "en_AU", "property");
    setMeta("og:image", `${BASE_URL}/og-image.jpg`, "property");
    setMeta("og:image:secure_url", `${BASE_URL}/og-image.jpg`, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:image:type", "image/jpeg", "property");
    setMeta("og:image:alt", "iLovah Cleaning Services – Bond, Carpet & Pest Control in Toowoomba QLD", "property");
    setMeta("og:phone_number", "+61478711829", "property");
    setMeta("og:email", "ilovahclean@gmail.com", "property");
    setMeta("og:street-address", "4 Kelfield Street", "property");
    setMeta("og:locality", "North Toowoomba", "property");
    setMeta("og:region", "QLD", "property");
    setMeta("og:postal-code", "4350", "property");
    setMeta("og:country-name", "Australia", "property");

    // ── Twitter / X Card ──────────────────────────────────────────────────
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@ilovahcleaning");
    setMeta("twitter:creator", "@ilovahcleaning");
    setMeta("twitter:title", "iLovah Cleaning Services – Toowoomba's #1 Bond & Pest Specialists");
    setMeta("twitter:description", "Bond cleaning, carpet cleaning, pest control & more across Toowoomba QLD. Family-owned. Bond-back guaranteed. Call 0478 711 829 for a free quote.");
    setMeta("twitter:url", `${BASE_URL}/`);
    setMeta("twitter:image", `${BASE_URL}/og-image.jpg`);
    setMeta("twitter:image:alt", "iLovah Cleaning Services – Bond, Carpet & Pest Control Toowoomba QLD");
    setMeta("twitter:label1", "📞 Call Us");
    setMeta("twitter:data1", "0478 711 829");
    setMeta("twitter:label2", "📍 Location");
    setMeta("twitter:data2", "Toowoomba, QLD 4350");

    // ── JSON-LD structured data ────────────────────────────────────────────
    const existing = document.getElementById("il-jsonld-main");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "il-jsonld-main";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        // ── WebSite (enables Google Sitelinks Search Box) ──────────────────
        {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          "url": `${BASE_URL}/`,
          "name": "iLovah Cleaning Services",
          "description": "Toowoomba's trusted bond cleaning, carpet cleaning and pest control specialists.",
          "publisher": { "@id": `${BASE_URL}/#business` },
          "inLanguage": "en-AU",
          "potentialAction": {
            "@type": "SearchAction",
            "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/?s={search_term_string}` },
            "query-input": "required name=search_term_string"
          }
        },
        // ── WebPage ────────────────────────────────────────────────────────
        {
          "@type": "WebPage",
          "@id": `${BASE_URL}/#webpage`,
          "url": `${BASE_URL}/`,
          "name": "iLovah Cleaning Services | Bond Cleaning, Carpet & Pest Control Toowoomba",
          "isPartOf": { "@id": `${BASE_URL}/#website` },
          "about": { "@id": `${BASE_URL}/#business` },
          "description": "iLovah Cleaning Services – Toowoomba's trusted bond cleaning, dry carpet cleaning, pest control & more. Family-owned, fully insured, bond-back guaranteed.",
          "inLanguage": "en-AU",
          "datePublished": "2024-01-01",
          "dateModified": "2025-07-01",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` }
            ]
          }
        },
        // ── LocalBusiness + CleaningService ───────────────────────────────
        {
          "@type": ["LocalBusiness", "ProfessionalService", "HomeAndConstructionBusiness"],
          "@id": `${BASE_URL}/#business`,
          "name": "iLovah Cleaning Services",
          "alternateName": ["iLovah", "iLovah Cleaning", "Rest In Pest Control"],
          "description": "Toowoomba's trusted professional cleaning company offering bond cleaning, carpet cleaning, end-of-lease cleaning, window cleaning, gutter cleaning, pressure washing, pram cleaning, and licensed pest control services.",
          "url": `${BASE_URL}/`,
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/logo.png`,
            "width": 200,
            "height": 60
          },
          "image": `${BASE_URL}/og-image.jpg`,
          "telephone": "+610478711829",
          "email": "ilovahclean@gmail.com",
          "priceRange": "$$",
          "currenciesAccepted": "AUD",
          "paymentAccepted": "Cash, Bank Transfer, Credit Card",
          "foundingDate": "2022",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "4 Kelfield Street",
            "addressLocality": "North Toowoomba",
            "addressRegion": "QLD",
            "postalCode": "4350",
            "addressCountry": "AU"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -27.5598,
            "longitude": 151.9507
          },
          "hasMap": "https://maps.google.com/?q=4+Kelfield+Street+North+Toowoomba+QLD",
          "areaServed": [
            { "@type": "City", "name": "Toowoomba", "sameAs": "https://en.wikipedia.org/wiki/Toowoomba" },
            { "@type": "AdministrativeArea", "name": "North Toowoomba" },
            { "@type": "AdministrativeArea", "name": "East Toowoomba" },
            { "@type": "AdministrativeArea", "name": "South Toowoomba" },
            { "@type": "AdministrativeArea", "name": "Harristown" },
            { "@type": "AdministrativeArea", "name": "Rangeville" },
            { "@type": "AdministrativeArea", "name": "Newtown" },
            { "@type": "AdministrativeArea", "name": "Wilsonton" },
            { "@type": "AdministrativeArea", "name": "Rockville" },
            { "@type": "AdministrativeArea", "name": "Glenvale" },
            { "@type": "AdministrativeArea", "name": "Kearneys Spring" },
            { "@type": "AdministrativeArea", "name": "Mount Lofty" },
            { "@type": "AdministrativeArea", "name": "Middle Ridge" },
            { "@type": "AdministrativeArea", "name": "Centenary Heights" },
            { "@type": "AdministrativeArea", "name": "Drayton" },
            { "@type": "AdministrativeArea", "name": "Darling Heights" },
            { "@type": "AdministrativeArea", "name": "Highfields" },
            { "@type": "AdministrativeArea", "name": "Gatton" },
            { "@type": "AdministrativeArea", "name": "Pittsworth" },
            { "@type": "AdministrativeArea", "name": "Oakey" },
            { "@type": "AdministrativeArea", "name": "Dalby" },
            { "@type": "State", "name": "Queensland", "sameAs": "https://en.wikipedia.org/wiki/Queensland" }
          ],
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": { "@type": "GeoCoordinates", "latitude": -27.5598, "longitude": 151.9507 },
            "geoRadius": "50000"
          },
          "knowsAbout": [
            "Bond Cleaning Toowoomba", "End of Lease Cleaning Toowoomba", "Carpet Cleaning Toowoomba",
            "Pest Control Toowoomba", "Cockroach Treatment Toowoomba", "Ant Control Toowoomba",
            "Window Cleaning Toowoomba", "Gutter Cleaning Toowoomba", "Pressure Washing Toowoomba",
            "Pram Cleaning Toowoomba", "General House Cleaning Toowoomba", "Spider Control Toowoomba",
            "Rodent Control Toowoomba", "End of Lease Pest Treatment QLD"
          ],
          "openingHoursSpecification": [
            { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "07:00", "closes": "18:00" }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "87",
            "bestRating": "5",
            "worstRating": "1"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cleaning & Pest Control Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bond Cleaning / End of Lease Cleaning Toowoomba", "description": "Full bond-back guaranteed end-of-lease clean following real estate agent checklists.", "url": `${BASE_URL}/` } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dry Carpet Cleaning Toowoomba", "description": "Dry carpet cleaning to remove stains, allergens, and odours — fully dry in 1–2 hours.", "url": `${BASE_URL}/` } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Window Cleaning Toowoomba", "description": "Internal and external streak-free window cleaning for homes and businesses.", "url": `${BASE_URL}/` } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gutter Cleaning Toowoomba", "description": "Safe gutter clearing and inspection to protect your roof from water damage.", "url": `${BASE_URL}/` } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pressure Washing Toowoomba", "description": "High-pressure cleaning for driveways, decks, fences, and exterior surfaces.", "url": `${BASE_URL}/` } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pest Control Toowoomba", "description": "Licensed pest treatment for cockroaches, ants, spiders, rodents, and more.", "url": `${BASE_URL}/pest-control` } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "General House Cleaning Toowoomba", "description": "Regular residential maintenance cleans covering all rooms.", "url": `${BASE_URL}/` } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pram Cleaning Toowoomba", "description": "Deep sanitising of prams and strollers for a safe, hygienic result.", "url": `${BASE_URL}/` } }
            ]
          },
          "sameAs": [
            "https://www.facebook.com/ilovahcleaning",
            "https://www.instagram.com/ilovahcleaning"
          ],
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+610478711829",
              "contactType": "customer service",
              "availableLanguage": "English",
              "areaServed": "AU",
              "contactOption": "TollFree"
            },
            {
              "@type": "ContactPoint",
              "email": "ilovahclean@gmail.com",
              "contactType": "customer support",
              "availableLanguage": "English"
            }
          ]
        },
        // ── FAQPage (enables rich FAQ snippets in Google) ──────────────────
        {
          "@type": "FAQPage",
          "@id": `${BASE_URL}/#faq`,
          "mainEntity": [
            { "@type": "Question", "name": "Do you guarantee bond back after end-of-lease cleaning?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. iLovah Cleaning Services offers a bond-back guarantee on all end-of-lease cleans. If your property manager is not satisfied, we return free of charge to rectify." } },
            { "@type": "Question", "name": "What areas do you service around Toowoomba?", "acceptedAnswer": { "@type": "Answer", "text": "We service Toowoomba and all surrounding suburbs within ~50km, including North Toowoomba, East Toowoomba, South Toowoomba, Harristown, Rangeville, Newtown, Wilsonton, Rockville, Glenvale, Kearneys Spring, Middle Ridge, Centenary Heights, Drayton, Darling Heights, Highfields, Gatton, Pittsworth, Oakey, and Dalby." } },
            { "@type": "Question", "name": "Do you service Highfields and surrounding areas?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We regularly service Highfields, Oakey, Pittsworth, Gatton, Dalby, and all areas within approximately 50km of Toowoomba. Contact us on 0478 711 829 to confirm availability for your suburb." } },
            { "@type": "Question", "name": "Do you offer bond cleaning in Harristown, Rangeville and Newtown?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We service Harristown, Rangeville, Newtown, and all Toowoomba suburbs for bond cleaning, pest control, carpet cleaning and more. Call 0478 711 829 to book." } },
            { "@type": "Question", "name": "How quickly can I get a quote?", "acceptedAnswer": { "@type": "Answer", "text": "We respond to all free quote requests within 1 hour during business hours (Mon–Sat 7am–6pm)." } },
            { "@type": "Question", "name": "Are your pest control technicians licensed?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All pest control treatments are carried out by licensed and certified technicians using safe, targeted solutions approved for residential and commercial use in Queensland." } },
            { "@type": "Question", "name": "How much does bond cleaning cost in Toowoomba?", "acceptedAnswer": { "@type": "Answer", "text": "Bond cleaning in Toowoomba starts from $249 with iLovah Cleaning Services. The final price depends on property size and condition. We provide free quotes within 1 hour." } },
            { "@type": "Question", "name": "How much does pest control cost in Toowoomba?", "acceptedAnswer": { "@type": "Answer", "text": "Pest control services in Toowoomba typically range from $150 to $300 depending on property size and infestation level. Contact us for a free, tailored quote." } },
            { "@type": "Question", "name": "Do you offer same-day cleaning services in Toowoomba?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, subject to availability we offer same-day and next-day bookings across Toowoomba and surrounding suburbs. Call 0478 711 829 to check availability." } },
            { "@type": "Question", "name": "Is iLovah Cleaning Services insured?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. iLovah Cleaning Services is fully insured for public liability, giving you complete peace of mind on every job." } },
            { "@type": "Question", "name": "How often should pest control be done in Queensland?", "acceptedAnswer": { "@type": "Answer", "text": "Most homes in Queensland should have pest control done every 6 to 12 months for effective, ongoing protection against common pests like cockroaches, ants, and spiders." } },
            { "@type": "Question", "name": "What payment methods do you accept?", "acceptedAnswer": { "@type": "Answer", "text": "We accept cash, bank transfer (EFT), and credit card. Payment is due on completion of service unless prior arrangements have been made." } }
          ]
        },
        // ── Service schema for Pest Control page ──────────────────────────
        {
          "@type": "Service",
          "@id": `${BASE_URL}/pest-control#service`,
          "name": "Pest Control Toowoomba – Rest In Pest",
          "serviceType": "Pest Control",
          "provider": { "@id": `${BASE_URL}/#business` },
          "areaServed": { "@type": "City", "name": "Toowoomba" },
          "description": "Licensed pest control services in Toowoomba QLD. Treatment for cockroaches, ants, spiders, rodents, and pre-lease pest treatments. Safe for families and pets.",
          "url": `${BASE_URL}/pest-control`,
          "offers": {
            "@type": "Offer",
            "price": "150",
            "priceCurrency": "AUD",
            "priceSpecification": { "@type": "PriceSpecification", "minPrice": "150", "priceCurrency": "AUD" }
          }
        }
      ]
    });
    document.head.appendChild(script);

    return () => { const s = document.getElementById("il-jsonld-main"); if (s) s.remove(); };
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const openBooking = (svc = "") => { setBookingService(svc); setModalOpen(true); };
  const openQuote = (svc = "") => { setQuoteService(svc); setQuoteOpen(true); };

  const services = [
    { emoji: "🧹", title: "Dry Carpet Cleaning", desc: "Dry carpet cleaning to lift stains, allergens, and odours — ready to walk on in 1–2 hours.", featured: false, from: "From $89", img: imgCarpet, alt: "Professional dry carpet cleaning service in Toowoomba QLD" },
    { emoji: "🚚", title: "End of Lease Cleaning", desc: "Get your full bond back with our end-of-lease clean. We follow real estate agent checklists exactly.", featured: true, from: "From $249", img: imgEndOfLease, alt: "End of lease bond cleaning Toowoomba – bond-back guaranteed" },
    { emoji: "🌿", title: "Gutter Cleaning", desc: "Safe and thorough gutter clearing to protect your roof and home from water damage year-round.", featured: false, from: "From $120", img: imgGutter, alt: "Gutter cleaning service Toowoomba QLD" },
    { emoji: "🪟", title: "Window Cleaning", desc: "Crystal-clear windows inside and out using streak-free solutions and professional equipment.", featured: false, from: "From $79", img: imgWindow, alt: "Window cleaning service Toowoomba – internal and external" },
    { emoji: "👶", title: "Pram Cleaning", desc: "Deep sanitising and cleaning of prams and strollers to keep your little one safe and fresh.", featured: false, from: "From $49", img: imgPram, alt: "Pram and stroller deep cleaning service Toowoomba" },
    { emoji: "🐛", title: "Pest Control Service", desc: "Safe and effective pest treatment for homes and businesses, keeping unwanted visitors out for good.", featured: false, from: "From $150", img: imgPest, alt: "Licensed pest control service Toowoomba QLD – cockroaches, ants, spiders, rodents" },
    { emoji: "💧", title: "Pressure Washing", desc: "High-pressure cleaning for driveways, decks, fences, and exteriors — looking brand new again.", featured: false, from: "From $99", img: imgPressure, alt: "Pressure washing service Toowoomba – driveways, decks, fences" },
    { emoji: "✨", title: "General House Clean", desc: "Regular maintenance cleaning covering all rooms — dusting, vacuuming, mopping, and surface sanitising.", featured: false, from: "From $89", img: imgGeneral, alt: "General house cleaning service Toowoomba QLD" },
  ];

  const howSteps = [
    { ico: "📋", title: "Choose Your Service", desc: "Pick the cleaning or pest treatment type — from a quick tidy to a full deep clean." },
    { ico: "📅", title: "Pick Date & Time", desc: "Available 7 days a week, including public holidays." },
    { ico: "🧑‍🔧", title: "We Show Up & Handle It", desc: "Trained technicians arrive on time with all supplies included." },
    { ico: "🌟", title: "Enjoy Your Space", desc: "Come home to spotless, pest-free results. Guaranteed or we come back free." },
  ];

  const clients = [
    { label: "GALAXY HOUSING", sub: "Trusted Partner", cls: "galaxy", logo: imgHousing },
    { label: "East Toowoomba", sub: "Skin Cancer Clinic", cls: "skin", logo: imgClinic },
    { label: "Cherubs", sub: "Early Learning & Kindergarten", cls: "cherubs", logo: imgCherub },
    { label: "CORPORATE BOX VALLEY", sub: null, cls: "boxvalley", logo: imgBox },
    { label: "Cienna Living", sub: null, cls: "cianna", logo: imgLiving },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "100%", margin: 0, padding: 0, overflowX: "hidden" }}>
      <a href="#main-content" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }} onFocus={e => { e.target.style.left = "16px"; e.target.style.top = "16px"; e.target.style.width = "auto"; e.target.style.height = "auto"; e.target.style.zIndex = "99999"; e.target.style.background = "#fff"; e.target.style.padding = "8px 16px"; e.target.style.borderRadius = "6px"; }} onBlur={e => { e.target.style.left = "-9999px"; }}>Skip to main content</a>
      <style>{CSS}</style>

      {/* ── TOP INFO BAR ── */}
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

      {/* ── NAV (dual brand, index.html style) ── */}
      <nav className={`il-nav ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation – iLovah Cleaning Services Toowoomba">
        <div className="nav-brands">
          <a className="brand-ilovah" href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="iLovah Cleaning Services – home">
            <ILovahLogo size={36} />
            <div className="brand-ilovah-text">
              <div className="brand-ilovah-t1"><span className="ir">i</span><span className="iw">Lovah</span></div>
              <div className="brand-ilovah-t2">Cleaning Services</div>
            </div>
          </a>
          <div className="brand-sep" aria-hidden="true" />
          <div className="brand-rip" role="button" tabIndex={0} aria-label="Rest In Pest Control – pest control service page" onClick={() => navigate("/pest-control")} onKeyDown={e => e.key === "Enter" && navigate("/pest-control")}>
            <div className="r1"><span className="rr">REST IN </span>PEST</div>
            <div className="r2">Control Service</div>
          </div>
        </div>
        <ul className="il-nav-links-desktop" role="list">
          <li><a href="#services" onClick={e => { e.preventDefault(); go("services"); }} aria-label="Cleaning Services">Cleaning Service</a></li>
          <li><a href="/pest-control" onClick={e => { e.preventDefault(); navigate("/pest-control"); }} aria-label="Pest Control Service">Pest Control Service</a></li>
          <li><a href="#about" onClick={e => { e.preventDefault(); go("about"); }} aria-label="About us">About</a></li>
          <li><a href="#reviews" onClick={e => { e.preventDefault(); go("reviews"); }} aria-label="Customer reviews">Reviews</a></li>
          <li><a href="/blog" onClick={e => { e.preventDefault(); navigate("/blog"); }} aria-label="Blog">Blog</a></li>
          <li><a href="#faq" onClick={e => { e.preventDefault(); go("faq"); }} aria-label="Frequently asked questions">FAQ</a></li>
          <li><a className="il-nav-quote" href="#quote" onClick={e => { e.preventDefault(); openQuote(); }} aria-label="Get Instant Qoute"><img src={imgInsect} alt="" aria-hidden="true" width={40} height={40} loading="lazy" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", marginRight: 4, filter: "brightness(0) invert(1)" }} /> Get Instant Quote</a></li>
        </ul>
        <button className={`il-burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-nav-menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`il-nav-backdrop ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      <ul id="mobile-nav-menu" className={`il-nav-links ${menuOpen ? "open" : ""}`} role="list" aria-label="Mobile navigation">
        <button className="il-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        <li><a href="#services" onClick={e => { e.preventDefault(); go("services"); }}>Cleaning Service</a></li>
        <li><a href="/pest-control" onClick={e => { e.preventDefault(); navigate("/pest-control"); }}>Pest Control Service</a></li>
        <li><a href="#about" onClick={e => { e.preventDefault(); go("about"); }}>About</a></li>
        <li><a href="#reviews" onClick={e => { e.preventDefault(); go("reviews"); }}>Reviews</a></li>
        <li><a href="/blog" onClick={e => { e.preventDefault(); navigate("/blog"); setMenuOpen(false); }}>Blog</a></li>
        <li><a href="#faq" onClick={e => { e.preventDefault(); go("faq"); }}>FAQ</a></li>
        <li><a className="il-nav-quote" href="#quote" onClick={e => { e.preventDefault(); openQuote(); setMenuOpen(false); }}><img src={imgInsect} alt="" aria-hidden="true" width={40} height={40} loading="lazy" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", marginRight: 4, filter: "brightness(0) invert(1)" }} /> Get Instant Quote</a></li>
      </ul>

      {/* ── HERO — dual brand split (index.html style) ── */}
      <main id="main-content">
        <section className="il-hero" style={{ paddingTop: 108 }} aria-label="iLovah Cleaning Services – Professional Cleaning and Pest Control in Toowoomba QLD">
          {/* LEFT — iLovah Cleaning */}
          <div className="il-hero-left">
            <div className="hero-eyebrow ey-blue">
              <span className="ey-dot dot-b" aria-hidden="true" />
              Cleaning Services · Toowoomba's #1
            </div>
            <h1 className="hero-h1 big">
              Toowoomba's Trusted <span className="hl-blue">Cleaning</span> &amp; <span className="hl-red">Pest Control</span> Experts –<br />
              Fast, Affordable &amp; <span className="hl-blue">Guaranteed</span>
            </h1>
            <p className="hero-p">From end-of-lease bond cleaning to professional pest control in Toowoomba, we deliver a complete property solution — fast, reliable, and done right the first time.</p>
            <div className="hero-btns">
              <button className="btn-blue" onClick={() => openBooking()}>Book a Clean →</button>
              <button className="btn-ghost-w" onClick={() => go("services")}>View Services</button>
            </div>
            <div className="hero-stats">
              <div className="hs"><div className="hs-n clr-blue">1K+</div><div className="hs-l">Happy Clients</div></div>
              <div className="hs-sep" aria-hidden="true" />
              <div className="hs"><div className="hs-n clr-blue">4.9★</div><div className="hs-l">Avg Rating</div></div>
              <div className="hs-sep" aria-hidden="true" />
              <div className="hs"><div className="hs-n clr-blue">100%</div><div className="hs-l">Bond Back</div></div>
            </div>
          </div>

          {/* RIGHT — Rest In Pest */}
          <div className="il-hero-right">
            <div className="bug-bg" aria-hidden="true">🐛</div>
            <div className="hero-eyebrow ey-red">
              <span className="ey-dot dot-r" aria-hidden="true" />
              Certified Pest Control Service · Licensed Technicians
            </div>
            <h2 className="hero-h1 pest-big">
              <span className="hl-red">Rest In</span><br />
              Pest<span className="hl-red">.</span>
            </h2>
            <p className="hero-p">Certified control service technicians eliminating cockroaches, ants, spiders, rodents &amp; more. Safe, targeted, and guaranteed treatments across Toowoomba.</p>
            <div className="hero-btns">
              <button className="btn-red" onClick={() => navigate("/pest-control")}><img src={imgInsect} alt="" aria-hidden="true" width={40} height={40} loading="lazy" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", marginRight: 4, filter: "brightness(0) invert(1)" }} /> Control the Pests</button>
              <button className="btn-ghost-w" onClick={() => openBooking("Pest Control Service")}>Book Treatment →</button>
            </div>
            <div className="hero-stats">
              <div className="hs"><div className="hs-n clr-red">500+</div><div className="hs-l">Treatments Done</div></div>
              <div className="hs-sep" aria-hidden="true" />
              <div className="hs"><div className="hs-n clr-red">8+</div><div className="hs-l">Pest Types</div></div>
              <div className="hs-sep" aria-hidden="true" />
              <div className="hs"><div className="hs-n clr-red">100%</div><div className="hs-l">Safe &amp; Certified</div></div>
            </div>
          </div>
          <div className="hero-bottom-bar" aria-hidden="true" />
        </section>

        {/* ── TRUST BAR (index.html style) ── */}
        <div className="il-trust" aria-label="Trust highlights">
          <div className="il-trust-item"><span className="ti" aria-hidden="true">🏠</span> Toowoomba &amp; Surrounds</div>
          <div className="il-trust-div" aria-hidden="true" />
          <div className="il-trust-item"><span className="ti" aria-hidden="true">✦</span> Bond-Back Guarantee</div>
          <div className="il-trust-div" aria-hidden="true" />
          <div className="il-trust-item"><span className="ti" aria-hidden="true">🛡️</span> Fully Insured &amp; Certified</div>
          <div className="il-trust-div" aria-hidden="true" />
          <div className="il-trust-item"><span className="ti" aria-hidden="true">❤️</span> Family Owned &amp; Operated</div>
        </div>

        {/* ── SERVICES ── */}
        <section className="il-services-section" id="services" aria-label="Cleaning and pest control services in Toowoomba">
          <div className="il-wrap">
            <R>
              <div className="sec-tag-blue">🧹 What We Offer</div>
              <h2 className="sec-h2">Cleaning & Pest Control Services <span className="hl-red">Tailored</span> for Toowoomba</h2>
              <p className="sec-sub">From bond cleans to pest elimination — iLovah handles every corner of your property across Toowoomba and surrounds.</p>
            </R>
            <div className="il-svc-grid">
              {services.map((s, i) => {
                const svcData = SERVICES_DATA.find(d => d.name === s.title);
                return (
                  <R key={i} className={`il-svc-card ${s.featured ? "featured" : ""}`} style={{ transitionDelay: `${i * 0.07}s`, cursor: "pointer" }} onClick={() => svcData && setDetailService(svcData)}>
                    <SvcImg img={s.img} emoji={s.emoji} alt={s.alt} />
                    <div className="il-svc-body">
                      <div className="il-svc-title">{s.title}</div>
                      <div className="il-svc-desc">{s.desc}</div>
                      <button className="il-svc-link" onClick={e => { e.stopPropagation(); openBooking(s.title); }} aria-label={`Book ${s.title}`}>Book Now →</button>
                    </div>
                  </R>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PEST CONTROL → Separate page. Link via nav "Pest Control Service" ── */}

        {/* ── PACKAGES ── */}
        <section className="il-packages-section" id="packages">
          <div className="il-wrap">
            <R style={{ textAlign: "center" }}>
              <div className="sec-tag-blue" style={{ display: "inline-block" }}>Bundle & Save</div>
              <h2 className="sec-h2" style={{ textAlign: "center", maxWidth: "100%" }}>Choose your <span className="hl-red">Package</span></h2>
              <p className="sec-sub" style={{ maxWidth: 560, margin: "0 auto" }}>Combine cleaning + pest control and save big. Perfect for Toowoomba renters, homeowners, and landlords.</p>
            </R>
            <div className="il-packages-grid">

              {/* ── Starter ── */}
              <R className="il-pkg-card starter" style={{ transitionDelay: "0s" }}>
                <div className="il-pkg-badge badge-starter">Starter</div>
                <span className="il-pkg-icon">🏠</span>
                <div className="il-pkg-name">Bond Clean Essentials</div>
                <div className="il-pkg-tagline">Perfect exit clean for renters needing their bond back fast.</div>
                <ul className="il-pkg-list">
                  {["Bond / End of Lease Clean", "Dry Carpet Cleaning", "Window Cleaning ( internal & external)", "Real Estate Checklist Included"].map((item, i) => (
                    <li key={i}><span className="il-pkg-marker marker-blue">✦</span>{item}</li>
                  ))}
                </ul>
                <button className="il-pkg-btn pkg-btn-blue" onClick={() => openQuote("End of Lease / Bond Cleaning")}>Get a Quote →</button>
              </R>

              {/* ── Most Popular ── */}
              <R className="il-pkg-card popular" style={{ transitionDelay: "0.08s" }}>
                <div className="il-pkg-badge badge-popular">Most Popular ★</div>
                <span className="il-pkg-icon">🏆</span>
                <div className="il-pkg-name">Full Property Reset</div>
                <div className="il-pkg-tagline">Complete inside + outside transformation, pest-free and sparkling.</div>
                <ul className="il-pkg-list">
                  {["Bond / End of Lease Clean", "Dry Carpet Cleaning", "Window Clean (In & Out)", "Pressure Washing", "Kitchen/ Oven Cleaning", "Pest/Flea treatment"].map((item, i) => (
                    <li key={i}><span className="il-pkg-marker marker-red">✦</span>{item}</li>
                  ))}
                </ul>
                <button className="il-pkg-btn pkg-btn-red" onClick={() => openQuote("Bundle Package (Cleaning + Pest)")}>Get a Quote →</button>
              </R>

              {/* ── Pest Special ── */}
              <R className="il-pkg-card pest" style={{ transitionDelay: "0.16s" }}>
                <div className="il-pkg-badge badge-pest"><img src={imgInsect} alt="" aria-hidden="true" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", marginRight: 3, filter: "brightness(0) invert(1)" }} /> Pest Special</div>
                <span className="il-pkg-icon"><img src={imgMoons} alt="" aria-hidden="true" style={{ width: 40, height: 40, objectFit: "contain" }} /></span>
                <div className="il-pkg-name">Pest Control Service Only</div>
                <div className="il-pkg-tagline">Targeted pest elimination for your home or business — standalone treatment.</div>
                <ul className="il-pkg-list">
                  {["Full Inspection & Assessment", "Cockroach & Ant Treatment", "Spider & Rodent Control", "Internal & External Treatment", "12 Month Warranty Included", "Flea, Cockroach, and etc Treatment"].map((item, i) => (
                    <li key={i}><span className="il-pkg-marker marker-skull"><img src={imgInsect} alt="" aria-hidden="true" style={{ width: 18, height: 18, objectFit: "contain", verticalAlign: "middle", filter: "brightness(0) saturate(100%) invert(18%) sepia(96%) saturate(2933%) hue-rotate(344deg) brightness(97%) contrast(97%)" }} /></span>{item}</li>
                  ))}
                </ul>
                <button className="il-pkg-btn pkg-btn-red" onClick={() => openBooking("Pest Control Service")}>Book Treatment →</button>
              </R>

            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="il-how" id="how">
          <div className="il-wrap">
            <R>
              <div className="sec-tag-blue">Simple Process</div>
              <h2 className="sec-h2">Booked, serviced & <span className="hl-red">done</span> in 4 easy steps</h2>
            </R>
            <div className="il-steps">
              {howSteps.map((s, i) => (
                <R key={i} className="il-step" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="il-step-num">0{i + 1}</div>
                  <div className="il-step-ico">{s.ico}</div>
                  <div className="il-step-title">{s.title}</div>
                  <div className="il-step-desc">{s.desc}</div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY / ABOUT ── */}
        <section className="il-why" id="about">
          <div className="il-wrap">
            <div className="il-why-inner">
              <R>
                <div className="il-why-img">
                  <img src={imgHappy} alt="Happy iLovah client after professional cleaning service in Toowoomba QLD" loading="lazy" style={{ width: "100%", height: "auto", display: "block", borderRadius: 20 }} />
                  <div className="il-why-badge">
                    <div className="il-why-badge-icon">🏆</div>
                    <div><strong>100% Bond Back Guarantee</strong><span>Or we re-clean for free</span></div>
                  </div>
                </div>
              </R>
              <R>
                <div className="sec-tag-blue">Why iLovah & Rest In Pest</div>
                <h2 className="sec-h2">We go beyond clean — <span className="hl-red">we restore</span> comfort</h2>
                <p style={{ color: MID, fontSize: ".96rem", lineHeight: 1.7, marginBottom: 28 }}>
                  Founded in 2017, iLovah has been helping families and professionals in Toowoomba & surrounds reclaim their time and live in cleaner, healthier, pest-free spaces. Every cleaner and technician is background-checked, trained, and insured.
                </p>
                <div className="il-features">
                  {[
                    { ico: "🛡️", title: "Fully Insured & Certified", desc: "Every team member is police-cleared, fully insured, and pest-certified — your property is protected." },
                    { ico: "🔁", title: "Satisfaction Guarantee", desc: "Not happy? We return and re-clean or re-treat at absolutely no extra charge." },
                  ].map((f, i) => (
                    <div key={i} className="il-feature">
                      <div className="il-feat-ico">{f.ico}</div>
                      <div><div className="il-feat-title">{f.title}</div><div className="il-feat-desc">{f.desc}</div></div>
                    </div>
                  ))}
                </div>
              </R>
            </div>
          </div>
        </section>

        {/* ── RESULTS — Before & After ── */}
        <section className="il-results-section">
          <div className="il-wrap" style={{ textAlign: "center" }}>
            <R>
              <div className="sec-tag-blue" style={{ display: "inline-block" }}>Results</div>
              <h2 className="sec-h2" style={{ textAlign: "center", maxWidth: "100%" }}>See the <span className="hl-red">Difference</span></h2>
              <p className="sec-sub" style={{ maxWidth: 480, margin: "0 auto" }}>Real results from our professional cleaning services across Queensland.</p>
            </R>
            <R><BeforeAfterSlider /></R>
          </div>
        </section>

        {/* ── CLIENTS ── */}
        <section className="il-clients-section">
          <div className="il-wrap" style={{ textAlign: "center" }}>
            <R>
              <div style={{ fontSize: "1.4rem", marginBottom: 12 }}>❤️</div>
              <div className="sec-tag-blue" style={{ display: "inline-block" }}>Our Clients</div>
              <h2 className="sec-h2" style={{ textAlign: "center", maxWidth: "100%" }}>Our <span className="hl-red">Happy</span> Clients</h2>
              <p className="sec-sub" style={{ maxWidth: 500, margin: "0 auto" }}>Trusted by homeowners, property investors, clinics, and businesses across Toowoomba, Queensland.</p>
            </R>
            <div className="il-clients-grid">
              {clients.map((c, i) => (
                <R key={i} className="il-client-card" style={{ transitionDelay: `${i * 0.07}s` }}>
                  <img src={c.logo} alt={`${c.label}${c.sub ? ` – ${c.sub}` : ""} client of iLovah Cleaning Services`} className="il-client-logo-img" loading="lazy" decoding="async" loading="lazy" width="300" height="200" />
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="il-reviews-section" id="reviews" aria-label="Customer testimonials and reviews" aria-label="Customer reviews for iLovah Cleaning Services Toowoomba">
          <div className="il-wrap" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <R>
              <div className="sec-tag-blue" style={{ color: GOLD, background: "rgba(255,184,0,0.1)", borderColor: "rgba(255,184,0,0.2)", display: "inline-block", marginBottom: 12 }}>Real Reviews</div>
              <h2 className="sec-h2" style={{ textAlign: "center", color: WHITE, maxWidth: "100%" }}>Toowoomba <span className="hl-red">Loves</span> Our Cleaning & Pest Services</h2>
              <p style={{ color: "rgba(255,255,255,.65)", fontSize: ".93rem", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>From sparkling bond cleans to pest-free homes — here's what our Toowoomba clients say.</p>
            </R>
            <ReviewsCarousel />
          </div>
        </section>

        {/* ── FAQ ── */}
        <FaqSection onContact={() => go("contact")} />

        {/* ── SERVICE AREAS ── */}
        <ServiceAreasSection onBook={() => openQuote()} />

        {/* ── GET IN TOUCH ── */}
        <section className="il-git-section" id="get-in-touch" aria-label="Contact iLovah Cleaning Services Toowoomba for a free quote">
          <div className="il-git-inner">
            {/* Left: info */}
            <div className="il-git-left">
              <R>
                <div className="il-git-tag">Get In Touch</div>
                <h2 className="il-git-h1">Get Your <span className="hl-red">Instant Quote</span><br />Today</h2>
                <p className="il-git-sub">Whether you need a bond clean, dry carpet clean, pest treatment, or all three — we'll get back within 1 hour with a clear, no-obligation quote across Toowoomba QLD.</p>
                <div className="il-git-info">
                  <div className="il-git-info-item">
                    <div className="il-git-info-ico il-git-ico-red">📞</div>
                    <div className="il-git-info-body">
                      <div className="il-git-info-label">Call or Text</div>
                      <div className="il-git-info-val"><a href="tel:0478711829">0478 711 829</a></div>
                    </div>
                  </div>
                  <div className="il-git-info-item">
                    <div className="il-git-info-ico il-git-ico-blue">✉️</div>
                    <div className="il-git-info-body">
                      <div className="il-git-info-label">Email</div>
                      <div className="il-git-info-val"><a href="mailto:ilovahclean@gmail.com">ilovahclean@gmail.com</a></div>
                    </div>
                  </div>
                  <div className="il-git-info-item">
                    <div className="il-git-info-ico il-git-ico-gray">📍</div>
                    <div className="il-git-info-body">
                      <div className="il-git-info-label">Location</div>
                      <div className="il-git-info-val">North Toowoomba, QLD &amp; surrounds</div>
                    </div>
                  </div>
                  <div className="il-git-info-item">
                    <div className="il-git-info-ico il-git-ico-gray">🕐</div>
                    <div className="il-git-info-body">
                      <div className="il-git-info-label">Hours</div>
                      <div className="il-git-info-val">Monday – Saturday: 7am – 6pm</div>
                    </div>
                  </div>
                </div>
                <div className="il-git-service-btns">
                  <button className="il-git-svc-btn blue" onClick={() => openQuote("Bond Cleaning")}>✏️ Cleaning Services</button>
                  <button className="il-git-svc-btn red" onClick={() => openQuote("Pest Control Service")}>🐛 Pest Control</button>
                </div>
              </R>
            </div>

            {/* Right: form */}
            <R>
              <GetInTouchForm onQuote={openQuote} />
            </R>
          </div>
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

        {/* ── SEO: visually hidden local keyword + GEO content for crawlers ── */}
        <div
          itemScope
          itemType="https://schema.org/LocalBusiness"
          style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}
          aria-hidden="true"
        >
          <span itemProp="name">iLovah Cleaning Services</span>
          <span itemProp="alternateName">Rest In Pest Control</span>
          <span itemProp="telephone">+610478711829</span>
          <span itemProp="email">ilovahclean@gmail.com</span>
          <span itemProp="priceRange">$$</span>
          <span itemProp="currenciesAccepted">AUD</span>
          <span itemProp="paymentAccepted">Cash, Bank Transfer, Credit Card</span>
          <span itemProp="openingHours">Mo-Sa 07:00-18:00</span>
          <span itemProp="description">
            iLovah Cleaning Services is Toowoomba&apos;s leading professional cleaning company offering bond cleaning, end of lease cleaning, carpet cleaning, window cleaning, gutter cleaning, pressure washing, general house cleaning, pram cleaning, and licensed pest control. Servicing Toowoomba, North Toowoomba, East Toowoomba, South Toowoomba, Harristown, Rangeville, Newtown, Wilsonton, Rockville, Glenvale, Kearneys Spring, Mount Lofty, Middle Ridge, Centenary Heights, Drayton, Darling Heights, Highfields, Gatton, Pittsworth, Oakey, Dalby, and all surrounding QLD suburbs within 50km. Family-owned, fully insured, and bond-back guaranteed.
          </span>
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="streetAddress">4 Kelfield Street</span>
            <span itemProp="addressLocality">North Toowoomba</span>
            <span itemProp="addressRegion">QLD</span>
            <span itemProp="postalCode">4350</span>
            <span itemProp="addressCountry">AU</span>
          </div>
          <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates">
            <span itemProp="latitude">-27.5598</span>
            <span itemProp="longitude">151.9507</span>
          </div>
          <span itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <span itemProp="ratingValue">4.9</span>
            <span itemProp="reviewCount">87</span>
            <span itemProp="bestRating">5</span>
          </span>
          <span itemProp="areaServed">Toowoomba QLD</span>
          <span itemProp="areaServed">North Toowoomba QLD 4350</span>
          <span itemProp="areaServed">East Toowoomba QLD 4350</span>
          <span itemProp="areaServed">South Toowoomba QLD 4350</span>
          <span itemProp="areaServed">Harristown QLD 4350</span>
          <span itemProp="areaServed">Rangeville QLD 4350</span>
          <span itemProp="areaServed">Newtown Toowoomba QLD 4350</span>
          <span itemProp="areaServed">Wilsonton QLD 4350</span>
          <span itemProp="areaServed">Rockville QLD 4350</span>
          <span itemProp="areaServed">Glenvale QLD 4350</span>
          <span itemProp="areaServed">Kearneys Spring QLD 4350</span>
          <span itemProp="areaServed">Mount Lofty QLD 4350</span>
          <span itemProp="areaServed">Middle Ridge QLD 4350</span>
          <span itemProp="areaServed">Centenary Heights QLD 4350</span>
          <span itemProp="areaServed">Drayton QLD 4350</span>
          <span itemProp="areaServed">Darling Heights QLD 4350</span>
          <span itemProp="areaServed">Highfields QLD 4352</span>
          <span itemProp="areaServed">Gatton QLD 4343</span>
          <span itemProp="areaServed">Pittsworth QLD 4356</span>
          <span itemProp="areaServed">Oakey QLD 4401</span>
          <span itemProp="areaServed">Dalby QLD 4405</span>
          <link itemProp="sameAs" href="https://www.facebook.com/ilovahcleaning" />
          <link itemProp="sameAs" href="https://www.instagram.com/ilovahcleaning" />
          <link itemProp="url" href="https://www.ilovahcleaningservices.com.au" />
        </div>

        {/* ── FOOTER ── */}
      </main>
      <footer className="il-footer" aria-label="iLovah Cleaning Services footer">
        <div className="il-footer-grid">
          <div className="il-footer-brand">
            <div className="footer-dual-logo" aria-label="iLovah Cleaning Services and Rest In Pest">
              <div className="fdl-il"><span className="lr">i</span><span className="lw">Lovah</span></div>
              <div className="fdl-sep" aria-hidden="true" />
              <div className="fdl-rip"><span className="r">REST IN </span><span className="w">PEST</span></div>
            </div>
            <p>Family-owned and community-focused. Proudly serving Toowoomba and surrounds with professional bond cleaning, carpet cleaning, window cleaning, gutter cleaning, pressure washing, and licensed pest control services since day one.</p>
          </div>
          <div className="il-footer-col">
            <h4>Pest Control</h4>
            <ul>
              {["Cockroach Control", "Ant Treatments", "Spider Control", "Rodent Control", "End of Lease Flea Treatment"].map(s => (
                <li key={s}><a href="/pest-control" aria-label={`${s} in Toowoomba QLD`}>{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="il-footer-col">
            <h4>Cleaning Services</h4>
            <ul>
              {["Bond Cleaning", "Dry Carpet Cleaning", "Window Cleaning", "Gutter Cleaning", "Pressure Washing"].map(s => (
                <li key={s}><a href="#services" aria-label={`${s} in Toowoomba QLD`}>{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="il-footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li><a href="tel:0478711829" aria-label="Call us: 0478 711 829"><span className="fc-icon" aria-hidden="true">📞</span> 0478 711 829</a></li>
              <li><a href="mailto:ilovahclean@gmail.com" aria-label="Email us: ilovahclean@gmail.com"><span className="fc-icon" aria-hidden="true">✉</span> ilovahclean@gmail.com</a></li>
              <li><a href="https://maps.google.com/?q=North+Toowoomba+QLD" target="_blank" rel="noopener noreferrer" aria-label="Our location: North Toowoomba QLD"><span className="fc-icon" aria-hidden="true">📍</span> North Toowoomba QLD</a></li>
              <li><span style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,.55)", fontSize: ".86rem", fontWeight: 600 }}><span className="fc-icon" aria-hidden="true">🕐</span> Mon–Sat 7am–6pm</span></li>
              <li><a href="#quote" onClick={e => { e.preventDefault(); openQuote(); }} aria-label="Get Instant Qoute"><span className="fc-icon" aria-hidden="true">💬</span> Get Instant Qoute</a></li>
            </ul>
          </div>
        </div>
        <div className="il-footer-bottom">
          <div>© 2025 <span className="fa" style={{ color: "#ff6b6b" }}>iLovah Cleaning Services</span> &amp; <span className="fa" style={{ color: "#ff6b6b" }}>Rest In Pest Control</span>. All rights reserved. ABN provided. Serving Toowoomba &amp; QLD Surrounds.</div>
          <div className="il-footer-bottom-right">
            <span>Made with <span className="hrt" aria-hidden="true">♥</span> in Toowoomba, QLD</span>
          </div>
        </div>
      </footer>

      {/* ── MODALS ── */}
      <ServiceDetailModal service={detailService} onClose={() => setDetailService(null)} onBook={openBooking} />
      <BookingModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setBookingService(""); }} initialService={bookingService} />
      <GetQuoteModal isOpen={quoteOpen} onClose={() => { setQuoteOpen(false); setQuoteService(""); }} initialService={quoteService} />

      {/* ── FLOATING QUOTE CTA ── */}
      <div className="float-cta">
        <a href="#quote" onClick={e => { e.preventDefault(); openQuote(); }} aria-label="Get Instant Qoute from iLovah Cleaning Services"><img src={imgInsect} alt="" aria-hidden="true" width={40} height={40} loading="lazy" style={{ width: 40, height: 40, objectFit: "contain", verticalAlign: "middle", marginRight: 8, filter: "brightness(0) invert(1)" }} /> GET INSTANT QUOTE</a>
      </div>
    </div>
  );
}