import { useState, useEffect, useRef } from "react";
import heroImg from "./assets/hero.jpg";
import imgCarpet from "./assets/carpet cleaning.jpg";
import imgEndOfLease from "./assets/end of lease cleaning.jpg";
import imgGutter from "./assets/glutter cleaning.jpg";
import imgWindow from "./assets/window cleaning.jpg";
import imgPram from "./assets/pram cleaning.jpg";
import imgHappy from "./assets/happy.jpg";
import imgBeforeKitchen from "./assets/before kitchen.png";
import imgAfterKitchen from "./assets/after kitchen.png";
import imgPest from "./assets/pest control.jpg";
import imgPressure from "./assets/pressure washing.jpg";
import imgGeneral from "./assets/general house clean.jpg";
import ilovahLogoSrc from "./assets/logo.jpg";
import imgBox from "./assets/box.png";
import imgCherub from "./assets/cherub.png";
import imgClinic from "./assets/clinic.png";
import imgHousing from "./assets/housing.png";
import imgLiving from "./assets/living.png";
const RED = "#e8291c";
const RED_DK = "#c01f13";
const RED_LT = "#fdecea";
const RED_MID = "#f5a09a";
const CHARCOAL = "#1a1a1a";
const MID = "#6b6b6b";
const BORDER = "#e8e8e8";
const CREAM = "#fdfaf9";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,300&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{font-family:'DM Sans',sans-serif;background:#fff;color:${CHARCOAL};overflow-x:hidden}
:root{--red:${RED};--red-dk:${RED_DK};--red-lt:${RED_LT};--charcoal:${CHARCOAL};--mid:${MID};--border:${BORDER};--cream:${CREAM}}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#f5f5f5}
::-webkit-scrollbar-thumb{background:${RED_MID};border-radius:3px}

/* ── TOP INFO BAR ── */
.il-topbar{
  background:${CHARCOAL};padding:0 48px;height:38px;
  display:flex;align-items:center;justify-content:space-between;
  font-size:.73rem;color:rgba(255,255,255,0.65);
  position:fixed;top:0;left:0;right:0;z-index:901;transition:transform .35s ease;
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
  padding:0 48px;height:66px;
  background:rgba(255,255,255,0.97);backdrop-filter:blur(16px);
  border-bottom:1px solid rgba(232,41,28,0.1);transition:all .3s ease;
}
.il-nav.scrolled{box-shadow:0 2px 20px rgba(0,0,0,0.08);height:60px;top:0}
.il-logo{display:flex;align-items:center;gap:9px;cursor:pointer;text-decoration:none;flex-shrink:0}
.il-logo-text{font-family:'Fraunces',serif;font-size:1.35rem;font-weight:700;color:${RED};line-height:1}
.il-logo-sub{font-size:.58rem;font-weight:600;letter-spacing:.12em;color:${MID};text-transform:uppercase;display:block;margin-top:2px}
.il-nav-links{display:flex;gap:1px;list-style:none;align-items:center}
.il-nav-links a{text-decoration:none;color:${CHARCOAL};font-size:.84rem;font-weight:500;padding:7px 12px;border-radius:7px;transition:all .2s;cursor:pointer;letter-spacing:-.01em;white-space:nowrap}
.il-nav-links a:hover{color:${RED};background:${RED_LT}}
.il-nav-quote{background:${RED}!important;color:#fff!important;padding:9px 20px!important;border-radius:9px!important;font-weight:700!important;transition:all .2s!important;box-shadow:0 3px 12px rgba(232,41,28,0.3)!important;font-size:.84rem!important;margin-left:6px}
.il-nav-quote:hover{background:${RED_DK}!important;transform:translateY(-1px)!important}
.il-burger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:6px;border-radius:7px}
.il-burger span{width:22px;height:2px;background:${CHARCOAL};border-radius:2px;display:block;transition:all .3s}
.il-burger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.il-burger.open span:nth-child(2){opacity:0}
.il-burger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* ── TAGLINE PILL ── */
.il-nav-tagline{
  position:fixed;top:104px;left:50%;transform:translateX(-50%);z-index:899;
  display:flex;align-items:center;gap:10px;
  background:#fff;border:1px solid ${BORDER};border-radius:100px;padding:6px 18px;
  font-size:.75rem;font-weight:600;color:${MID};
  box-shadow:0 3px 14px rgba(0,0,0,0.07);white-space:nowrap;transition:all .3s ease;
}
.il-nav-tagline.scrolled{opacity:0;pointer-events:none;transform:translateX(-50%) translateY(-6px)}
.il-tagline-dot{width:7px;height:7px;border-radius:50%;background:${RED};display:inline-block}

/* ── HERO ── */
.il-hero{
  min-height:100vh;display:grid;grid-template-columns:1.1fr 0.9fr;
  align-items:center;padding:170px 48px 72px;gap:56px;
  background:${CREAM};position:relative;overflow:hidden;
}
.il-hero-bg{position:absolute;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse 700px 600px at 75% 40%,rgba(232,41,28,0.06) 0%,transparent 70%),radial-gradient(ellipse 350px 280px at 10% 80%,rgba(232,41,28,0.04) 0%,transparent 60%)}
.il-hero-noise{position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px 200px}
.il-hero>*{position:relative;z-index:1}
.il-hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid ${BORDER};border-radius:100px;padding:5px 14px 5px 8px;font-size:.76rem;font-weight:600;color:${MID};margin-bottom:20px;animation:fadeUp .6s ease both;box-shadow:0 2px 10px rgba(0,0,0,0.06)}
.il-eyebrow-dot{width:20px;height:20px;border-radius:50%;background:${RED_LT};display:flex;align-items:center;justify-content:center;font-size:.72rem;flex-shrink:0}
.il-hero h1{font-family:'Fraunces',serif;font-size:clamp(2.6rem,5vw,4rem);line-height:1.06;color:${CHARCOAL};margin-bottom:18px;animation:fadeUp .6s .1s ease both;font-weight:900;letter-spacing:-.03em}
.il-hero h1 em{font-style:italic;color:${RED}}
.il-hero h1 .il-h1-line{display:block}
.il-hero-p{font-size:1rem;line-height:1.78;color:${MID};max-width:460px;margin-bottom:32px;animation:fadeUp .6s .2s ease both}
.il-hero-btns{display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp .6s .3s ease both}
.il-hero-stats{display:flex;gap:0;margin-top:40px;animation:fadeUp .6s .4s ease both;background:#fff;border:1px solid ${BORDER};border-radius:14px;padding:6px;box-shadow:0 3px 16px rgba(0,0,0,0.05);overflow:hidden;width:fit-content}
.il-stat{text-align:center;padding:12px 28px;position:relative}
.il-stat:not(:last-child)::after{content:'';position:absolute;right:0;top:20%;height:60%;width:1px;background:${BORDER}}
.il-stat-num{font-family:'Fraunces',serif;font-size:1.7rem;font-weight:700;color:${CHARCOAL};line-height:1}
.il-stat-num span{color:${RED}}
.il-stat-label{font-size:.69rem;color:${MID};font-weight:500;margin-top:3px}
.il-hero-visual{position:relative;animation:fadeIn .8s .2s ease both}
.il-hero-card{border-radius:22px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,0.13);width:420px;height:420px;margin:0 auto}
.il-float-card{position:absolute;background:#fff;border-radius:12px;padding:10px 14px;box-shadow:0 12px 40px rgba(0,0,0,0.14);display:flex;align-items:center;gap:10px}
.il-fc1{bottom:30px;left:-24px;animation:float 4s ease-in-out infinite}
.il-fc2{top:38px;right:-16px;animation:float 4s 1.5s ease-in-out infinite}
.il-fc-ico{width:32px;height:32px;border-radius:8px;background:${RED_LT};display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0}
.il-fc-t{font-size:.77rem;font-weight:700;color:${CHARCOAL};line-height:1.2}
.il-fc-s{font-size:.67rem;color:${MID};margin-top:2px}
.il-fc-pulse{width:7px;height:7px;border-radius:50%;background:#16a34a;position:absolute;top:10px;right:10px;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,0.5)}50%{box-shadow:0 0 0 5px rgba(22,163,74,0)}}

/* ── BUTTONS ── */
.il-btn{background:${RED};color:#fff;padding:13px 26px;border-radius:10px;font-size:.92rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:7px;border:none;transition:all .25s;font-family:'DM Sans',sans-serif;text-decoration:none;box-shadow:0 4px 14px rgba(232,41,28,0.3);letter-spacing:-.01em}
.il-btn:hover{background:${RED_DK};transform:translateY(-2px);box-shadow:0 8px 22px rgba(232,41,28,0.4)}
.il-btn svg{transition:transform .2s}
.il-btn:hover svg{transform:translateX(3px)}
.il-btn-ghost{background:#fff;color:${CHARCOAL};border:1.5px solid ${BORDER};padding:12px 24px;border-radius:10px;font-size:.92rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .25s;font-family:'DM Sans',sans-serif;text-decoration:none}
.il-btn-ghost:hover{border-color:${CHARCOAL};background:#fafafa;transform:translateY(-1px)}

/* ── TRUST BAR ── */
.il-trust{background:${CHARCOAL};padding:16px 48px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.il-trust-label{font-size:.68rem;text-transform:uppercase;letter-spacing:.12em;color:rgba(255,255,255,0.28);white-space:nowrap;font-weight:500}
.il-trust-logos{display:flex;gap:36px;align-items:center}
.il-trust-logo{font-size:.9rem;font-weight:600;color:rgba(255,255,255,0.3);letter-spacing:-.01em;transition:color .2s;cursor:default}
.il-trust-logo:hover{color:rgba(255,255,255,0.6)}

/* ── SECTION WRAPPER ── */
.il-wrap{max-width:1200px;margin:0 auto;padding:0 48px}

/* ── SECTION HEADER ── */
.il-section-eyebrow{display:inline-flex;align-items:center;gap:7px;font-size:.7rem;text-transform:uppercase;letter-spacing:.12em;color:${RED};font-weight:700;margin-bottom:12px}
.il-section-eyebrow::before{content:'';width:18px;height:2px;background:${RED};border-radius:2px}
.il-section-title{font-family:'Fraunces',serif;font-size:clamp(2rem,3.2vw,2.7rem);line-height:1.1;color:${CHARCOAL};max-width:520px;margin-bottom:36px;font-weight:700;letter-spacing:-.03em}
.il-section-title em{font-style:italic;color:${RED}}

/* ── SERVICES ── */
.il-services-section{padding:72px 0;background:#fff}
.il-svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.il-svc-card{background:#fff;border-radius:16px;border:1.5px solid ${BORDER};cursor:pointer;transition:all .3s;position:relative;overflow:hidden;display:flex;flex-direction:column}
.il-svc-card:hover{transform:translateY(-5px);box-shadow:0 20px 52px rgba(0,0,0,0.1);border-color:rgba(232,41,28,0.25)}
.il-svc-card.featured{background:${RED};border-color:${RED}}
.il-svc-card.featured .il-svc-title,.il-svc-card.featured .il-svc-desc{color:#fff}
.il-svc-card.featured .il-svc-link{color:rgba(255,255,255,0.9)}
.il-svc-card.featured .il-svc-price-badge{background:rgba(255,255,255,0.2);color:#fff}
.il-svc-card.featured .il-svc-img-ph{background:rgba(0,0,0,0.12);border-bottom-color:rgba(255,255,255,0.1)}
.il-svc-card.featured .il-svc-img-dashed{border-color:rgba(255,255,255,0.2)}
.il-svc-card.featured .il-svc-img-label{color:rgba(255,255,255,0.4)}
.il-svc-card.featured .il-svc-img-upload{background:rgba(255,255,255,0.15);border-color:rgba(255,255,255,0.15);color:rgba(255,255,255,0.7)}
.il-svc-card.featured .il-svc-img-upload:hover{background:rgba(255,255,255,0.25);color:#fff}
.il-svc-img-ph{width:100%;height:176px;background:linear-gradient(145deg,#f4f4f4 0%,#ececec 100%);border-bottom:1.5px solid ${BORDER};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;position:relative;overflow:hidden;flex-shrink:0;transition:background .3s}
.il-svc-img-ph::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(232,41,28,0.04) 0%,transparent 55%)}
.il-svc-img-dashed{width:52px;height:52px;border-radius:12px;border:2px dashed rgba(0,0,0,0.14);display:flex;align-items:center;justify-content:center;position:relative;z-index:1}
.il-svc-img-icon{font-size:1.5rem;opacity:.38;position:relative;z-index:1}
.il-svc-img-label{font-size:.67rem;font-weight:700;color:rgba(0,0,0,0.25);letter-spacing:.06em;text-transform:uppercase;position:relative;z-index:1}
.il-svc-img-upload{position:absolute;bottom:10px;right:10px;z-index:2;background:rgba(255,255,255,0.9);border:1px solid rgba(0,0,0,0.09);border-radius:7px;padding:4px 10px;font-size:.67rem;font-weight:600;color:${MID};cursor:pointer;display:flex;align-items:center;gap:4px;transition:all .2s}
.il-svc-img-upload:hover{background:#fff;color:${RED};border-color:rgba(232,41,28,0.3)}
.il-svc-body{padding:18px 20px 20px;display:flex;flex-direction:column;flex:1}
.il-svc-tag{display:flex;align-items:center;gap:6px;margin-bottom:9px}
.il-svc-emoji{font-size:1rem}
.il-svc-price-badge{font-size:.67rem;font-weight:700;color:${RED};background:${RED_LT};padding:2px 8px;border-radius:20px}
.il-svc-title{font-family:'Fraunces',serif;font-size:1.03rem;font-weight:700;margin-bottom:7px;letter-spacing:-.02em;line-height:1.2}
.il-svc-desc{font-size:.83rem;line-height:1.7;color:${MID};margin-bottom:14px;flex:1}
.il-svc-link{font-size:.81rem;font-weight:600;color:${RED};background:none;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:5px;transition:gap .2s;font-family:'DM Sans',sans-serif;padding:0;letter-spacing:-.01em;margin-top:auto}
.il-svc-link:hover{gap:9px}
.il-svc-link svg{transition:transform .2s}
.il-svc-link:hover svg{transform:translateX(3px)}

/* ── HOW ── */
.il-how{background:${CHARCOAL};padding:72px 0}
.il-how .il-section-eyebrow{color:${RED_MID}}
.il-how .il-section-eyebrow::before{background:${RED_MID}}
.il-how .il-section-title{color:#fff}
.il-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:8px}
.il-step{padding:28px 22px;border:1px solid rgba(255,255,255,0.07);border-radius:14px;position:relative;transition:all .3s;background:rgba(255,255,255,0.02)}
.il-step:hover{border-color:rgba(232,41,28,0.4);background:rgba(232,41,28,0.05);transform:translateY(-3px)}
.il-step-num{font-family:'Fraunces',serif;font-size:3.2rem;font-weight:900;color:rgba(255,255,255,0.05);position:absolute;top:12px;right:16px;line-height:1}
.il-step-ico{font-size:1.5rem;margin-bottom:14px}
.il-step-title{font-size:.92rem;font-weight:600;color:#fff;margin-bottom:7px;letter-spacing:-.01em}
.il-step-desc{font-size:.82rem;line-height:1.66;color:rgba(255,255,255,0.4)}

/* ── WHY / ABOUT ── */
.il-why{padding:72px 0;background:${CREAM}}
.il-why-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.il-why-img{border-radius:20px;overflow:hidden;position:relative;box-shadow:0 24px 64px rgba(0,0,0,0.1);min-height:440px}
.il-why-badge{position:absolute;bottom:20px;left:20px;background:#fff;color:${CHARCOAL};padding:13px 17px;border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,0.12);display:flex;align-items:center;gap:12px}
.il-why-badge-icon{width:38px;height:38px;border-radius:9px;background:${RED};display:flex;align-items:center;justify-content:center;font-size:1.05rem;flex-shrink:0}
.il-why-badge strong{display:block;font-family:'Fraunces',serif;font-size:1rem;font-weight:700;letter-spacing:-.02em}
.il-why-badge span{font-size:.7rem;color:${MID};font-weight:500}
.il-why-intro{font-size:.93rem;color:${MID};line-height:1.78}
.il-features{display:flex;flex-direction:column;gap:10px;margin-top:24px}
.il-feature{display:flex;gap:13px;align-items:flex-start;padding:13px 15px;border-radius:11px;border:1.5px solid transparent;transition:all .25s;cursor:default;background:#fff}
.il-feature:hover{border-color:${BORDER};box-shadow:0 5px 18px rgba(0,0,0,0.05)}
.il-feat-ico{width:36px;height:36px;border-radius:9px;background:${RED_LT};display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0}
.il-feat-title{font-weight:600;font-size:.88rem;margin-bottom:2px;letter-spacing:-.01em}
.il-feat-desc{font-size:.81rem;line-height:1.58;color:${MID}}

/* ── RESULTS ── */
.il-results-section{padding:72px 0;background:#fff}
.il-ba-wrap{max-width:760px;margin:0 auto;margin-top:48px;border-radius:20px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,0.1);border:1.5px solid ${BORDER};position:relative}
.il-ba-labels{position:absolute;top:16px;left:16px;right:16px;display:flex;justify-content:space-between;z-index:2}
.il-ba-label{padding:4px 14px;border-radius:50px;font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.il-ba-label.before{background:${CHARCOAL};color:#fff}
.il-ba-label.after{background:#16a34a;color:#fff}
.il-ba-img{width:100%;display:flex;aspect-ratio:16/9}
.il-ba-half{flex:1;display:flex;align-items:stretch;justify-content:stretch;overflow:hidden}
.il-ba-half svg{display:block;width:100%;height:100%}
.il-ba-half.left{background:linear-gradient(135deg,#c8c8c8 0%,#a8a8a8 100%)}
.il-ba-half.right{background:linear-gradient(135deg,#e8f5e9 0%,#c8e6c9 100%)}
.il-ba-divider{width:4px;background:#fff;flex-shrink:0;position:relative;z-index:1}

/* ── CLIENTS ── */
.il-clients-section{padding:72px 0;background:${CREAM}}
.il-clients-grid{display:flex;flex-wrap:wrap;gap:24px;justify-content:center;margin-top:48px}
.il-client-card{background:#fff;border-radius:20px;border:1.5px solid ${BORDER};padding:32px 44px;display:flex;align-items:center;justify-content:center;min-width:220px;min-height:140px;transition:box-shadow .3s,transform .3s,border-color .3s;cursor:default;box-shadow:0 4px 18px rgba(0,0,0,0.06)}
.il-client-card:hover{box-shadow:0 18px 52px rgba(0,0,0,0.13);transform:translateY(-6px);border-color:rgba(232,41,28,0.25)}
.il-client-logo-wrap{display:flex;align-items:center;justify-content:center;width:100%;height:100%}
.il-client-logo-img{max-width:180px;max-height:100px;width:auto;height:auto;object-fit:contain;display:block;transition:transform .3s}
.il-client-card:hover .il-client-logo-img{transform:scale(1.05)}
.il-client-card.galaxy{background:#fff}
.il-client-card.cherubs{background:#fff}
.il-client-card.boxvalley{background:#fff}
.il-client-card.skin{background:#fff}
.il-client-card.cianna{background:#fff}
.il-client-avatar{margin-bottom:8px;border-radius:12px;overflow:hidden;display:flex;align-items:center;justify-content:center}

/* ── REVIEWS CAROUSEL ── */
.il-reviews-section{padding:72px 0;background:#fff}
.il-reviews-carousel{max-width:780px;margin:48px auto 0;position:relative}
.il-rev-card{background:#fff;border:1.5px solid ${BORDER};border-radius:20px;padding:48px 48px 40px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.05);animation:fadeUp .4s ease;position:relative}
.il-rev-stars{font-size:1.15rem;letter-spacing:4px;color:${RED};margin-bottom:22px}
.il-rev-text{font-size:1.05rem;color:${CHARCOAL};line-height:1.78;font-style:italic;margin-bottom:32px}
.il-reviewer{display:flex;align-items:center;justify-content:center;gap:14px}
.il-rev-avatar{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.88rem;color:#fff;flex-shrink:0}
.il-rev-info{text-align:left}
.il-rev-name{font-weight:700;font-size:.93rem;letter-spacing:-.01em}
.il-rev-loc{font-size:.76rem;color:${MID};margin-top:1px}
.il-rev-service{font-size:.72rem;color:${RED};font-weight:600;margin-top:3px}
.il-rev-date{font-size:.71rem;color:${MID};margin-top:1px}
.il-rev-source{position:absolute;top:20px;right:20px;background:${CREAM};border-radius:8px;padding:4px 10px;font-size:.68rem;font-weight:700;color:${MID};border:1px solid ${BORDER};letter-spacing:.02em}
.il-rev-dots{display:flex;gap:8px;justify-content:center;margin-top:28px;flex-wrap:wrap}
.il-rev-dot{width:9px;height:9px;border-radius:50%;background:${BORDER};cursor:pointer;transition:background .2s,transform .2s;border:none;padding:0}
.il-rev-dot.active{background:${RED};transform:scale(1.25)}
.il-rev-nav{display:flex;gap:10px;justify-content:center;margin-top:20px}
.il-rev-btn{width:40px;height:40px;border-radius:50%;border:1.5px solid ${BORDER};background:#fff;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:all .2s;color:${MID}}
.il-rev-btn:hover{border-color:${RED};background:${RED_LT};color:${RED}}

/* ── FAQ ── */
.il-faq-section{padding:72px 0;background:${CREAM}}
.il-faq-inner{max-width:720px;margin:0 auto}
.il-faq-list{margin-top:48px;display:flex;flex-direction:column;gap:10px}
.il-faq-item{background:#fff;border-radius:14px;border:1.5px solid ${BORDER};overflow:hidden;transition:box-shadow .25s}
.il-faq-item:hover{box-shadow:0 6px 22px rgba(0,0,0,0.07)}
.il-faq-item.open{border-color:rgba(232,41,28,0.25);box-shadow:0 6px 22px rgba(232,41,28,0.07)}
.il-faq-q{padding:19px 22px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;font-weight:600;font-size:.92rem;gap:12px;user-select:none;transition:color .2s}
.il-faq-item.open .il-faq-q{color:${RED}}
.il-faq-icon{width:28px;height:28px;min-width:28px;border-radius:50%;background:${RED_LT};color:${RED};display:flex;align-items:center;justify-content:center;font-size:1.1rem;transition:transform .3s,background .2s;font-weight:400;line-height:1}
.il-faq-item.open .il-faq-icon{transform:rotate(45deg);background:${RED};color:#fff}
.il-faq-a{max-height:0;overflow:hidden;transition:max-height .38s ease,padding .3s;padding:0 22px;font-size:.87rem;color:${MID};line-height:1.76}
.il-faq-item.open .il-faq-a{max-height:220px;padding:0 22px 20px}
.il-faq-toggle{display:block;margin:22px auto 0;background:none;border:1.5px solid ${BORDER};color:${RED};font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:600;cursor:pointer;padding:9px 24px;border-radius:9px;transition:all .2s;display:flex;align-items:center;gap:6px}
.il-faq-toggle:hover{background:${RED_LT};border-color:rgba(232,41,28,0.3)}

/* ── CONTACT / CTA ── */
.il-contact-section{padding:0 48px 72px}
.il-cta{background:${CHARCOAL};border-radius:20px;padding:56px 60px;display:flex;align-items:center;justify-content:space-between;gap:32px;position:relative;overflow:hidden}
.il-cta::before{content:'';position:absolute;right:-80px;bottom:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(232,41,28,0.13) 0%,transparent 70%)}
.il-cta-text{position:relative;z-index:1}
.il-cta-text h2{font-family:'Fraunces',serif;font-size:clamp(1.65rem,2.6vw,2.2rem);color:#fff;margin-bottom:9px;font-weight:700;letter-spacing:-.04em}
.il-cta-text h2 em{font-style:italic;color:${RED_MID}}
.il-cta-text p{font-size:.9rem;color:rgba(255,255,255,0.46);max-width:380px;line-height:1.7}
.il-cta-btns{display:flex;gap:11px;flex-shrink:0;position:relative;z-index:1}
.il-cta-contact-info{display:flex;gap:28px;flex-wrap:wrap;margin-top:40px;position:relative;z-index:1}
.il-cta-info-item{display:flex;align-items:center;gap:8px;font-size:.83rem;color:rgba(255,255,255,0.5)}
.il-cta-info-item strong{color:rgba(255,255,255,0.85);font-weight:500}
.il-btn-white{background:#fff;color:${CHARCOAL};padding:12px 24px;border-radius:9px;font-size:.9rem;font-weight:600;cursor:pointer;border:none;transition:all .25s;font-family:'DM Sans',sans-serif;display:inline-block;text-decoration:none;letter-spacing:-.01em}
.il-btn-white:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(0,0,0,0.18)}
.il-btn-ow{border:1.5px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.76);padding:11px 20px;border-radius:9px;font-size:.9rem;font-weight:500;cursor:pointer;background:none;transition:all .25s;font-family:'DM Sans',sans-serif;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.il-btn-ow:hover{border-color:rgba(255,255,255,0.44);color:#fff}

/* ── FOOTER ── */
.il-footer{background:${CHARCOAL};padding:52px 48px 30px;color:rgba(255,255,255,0.4)}
.il-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;margin-bottom:44px}
.il-footer-brand p{font-size:.83rem;line-height:1.7;max-width:250px;margin-top:13px}
.il-footer-col h4{color:rgba(255,255,255,0.86);font-size:.69rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:16px;font-weight:600}
.il-footer-col ul{list-style:none;display:flex;flex-direction:column;gap:9px}
.il-footer-col ul a{text-decoration:none;color:rgba(255,255,255,0.38);font-size:.835rem;transition:color .2s;letter-spacing:-.01em}
.il-footer-col ul a:hover{color:rgba(255,255,255,0.84)}
.il-footer-bottom{border-top:1px solid rgba(255,255,255,0.07);padding-top:22px;display:flex;justify-content:space-between;align-items:center}
.il-footer-bottom p{font-size:.76rem}
.il-socials{display:flex;gap:7px}
.il-social{width:32px;height:32px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:.76rem;color:rgba(255,255,255,0.3);transition:all .25s;cursor:pointer;font-weight:700}
.il-social:hover{border-color:${RED};color:${RED};background:rgba(232,41,28,0.1)}

/* ── MODAL ── */
.il-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.56);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s;padding:16px}
.il-overlay.active{opacity:1;pointer-events:all}
.il-modal{background:#fff;border-radius:20px;width:min(800px,96vw);max-height:92vh;overflow:hidden;display:flex;flex-direction:column;transform:scale(0.97) translateY(20px);transition:transform .35s cubic-bezier(.34,1.56,.64,1);box-shadow:0 40px 90px rgba(0,0,0,0.2)}
.il-overlay.active .il-modal{transform:scale(1) translateY(0)}
.il-stepper{padding:17px 22px;border-bottom:1px solid ${BORDER};display:flex;align-items:center;justify-content:space-between;background:${CREAM}}
.il-stepper-back,.il-stepper-close{width:32px;height:32px;border-radius:7px;border:1.5px solid ${BORDER};background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.95rem;transition:all .2s;color:${MID};flex-shrink:0}
.il-stepper-back:hover,.il-stepper-close:hover{border-color:${RED};color:${RED};background:${RED_LT}}
.il-stepper-back.hidden{visibility:hidden}
.il-steps-wrap{display:flex;align-items:center;gap:0;flex:1;justify-content:center;padding:0 8px}
.il-step-item{display:flex;flex-direction:column;align-items:center;position:relative}
.il-step-dot{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;border:2px solid ${BORDER};color:${MID};background:#fff;transition:all .3s;z-index:1;position:relative}
.il-step-dot.done{background:${RED};border-color:${RED};color:#fff}
.il-step-dot.active{background:${CHARCOAL};border-color:${CHARCOAL};color:#fff}
.il-step-label{font-size:.66rem;font-weight:600;color:${MID};margin-top:4px;text-align:center;white-space:nowrap}
.il-step-label.active{color:${CHARCOAL};font-weight:700}
.il-step-label.done{color:${RED}}
.il-step-line{width:38px;height:2px;background:${BORDER};margin-bottom:18px;transition:background .3s}
.il-step-line.done{background:${RED}}
.il-progress-bar{height:3px;background:${BORDER};overflow:hidden}
.il-progress-fill{height:100%;background:${RED};transition:width .4s cubic-bezier(.4,0,.2,1)}
.il-modal-body{flex:1;overflow-y:auto;padding:26px 30px;scroll-behavior:smooth}
.il-modal-body h3{font-family:'Fraunces',serif;font-size:1.55rem;font-weight:700;color:${CHARCOAL};margin-bottom:5px;text-align:center;letter-spacing:-.03em}
.il-modal-body .il-modal-sub{font-size:.86rem;color:${MID};text-align:center;margin-bottom:22px}
.il-svc-pick-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.il-svc-pick{display:flex;align-items:center;padding:11px 13px;border-radius:10px;border:1.5px solid ${BORDER};cursor:pointer;transition:all .2s;gap:10px;background:#fff}
.il-svc-pick:hover{border-color:rgba(232,41,28,0.4);background:${RED_LT}}
.il-svc-pick.selected{border-color:${RED};background:${RED_LT}}
.il-svc-pick-img{width:42px;height:42px;border-radius:8px;background:#f5f5f5;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.3rem;transition:background .2s}
.il-svc-pick.selected .il-svc-pick-img{background:rgba(232,41,28,0.12)}
.il-svc-pick-info{flex:1;min-width:0}
.il-svc-pick-name{font-weight:600;font-size:.87rem;color:${CHARCOAL};letter-spacing:-.01em}
.il-svc-pick-price{font-size:.73rem;color:${MID};margin-top:2px;font-weight:500}
.il-svc-radio{width:17px;height:17px;border-radius:50%;border:2px solid ${BORDER};flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .2s}
.il-svc-pick.selected .il-svc-radio{border-color:${RED};background:${RED}}
.il-svc-radio-dot{width:6px;height:6px;border-radius:50%;background:#fff;opacity:0;transition:opacity .2s}
.il-svc-pick.selected .il-svc-radio-dot{opacity:1}
.il-svc-pick-exp{flex-direction:column;align-items:stretch;padding:0;gap:0}
.il-svc-pick-top{display:flex;align-items:center;gap:10px;padding:12px 14px}
.il-svc-pick-detail{padding:0 14px 10px;border-top:1px solid rgba(0,0,0,0.06)}
.il-svc-pick-desc{font-size:.79rem;color:${MID};line-height:1.6;margin:10px 0 8px}
.il-svc-pick-bullets{list-style:none;display:flex;flex-direction:column;gap:4px;margin-bottom:4px}
.il-svc-pick-bullets li{font-size:.76rem;color:${MID};display:flex;align-items:center;gap:6px}
.il-svc-pick-bullets li::before{content:'▪';color:${RED};font-size:.6rem;flex-shrink:0}
.il-svc-view-toggle{background:none;border:none;color:${RED};font-size:.76rem;font-weight:600;cursor:pointer;padding:8px 14px;text-align:left;font-family:'DM Sans',sans-serif;border-top:1px solid rgba(0,0,0,0.06);width:100%;transition:background .2s}
.il-svc-view-toggle:hover{background:${RED_LT}}
.il-form-row{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.il-form-group{margin-bottom:11px}
.il-form-group label{display:block;font-size:.75rem;font-weight:600;margin-bottom:5px;color:${CHARCOAL};letter-spacing:-.01em}
.il-form-group label span{color:${RED}}
.il-form-group input,.il-form-group select,.il-form-group textarea{width:100%;padding:9px 12px;border-radius:8px;border:1.5px solid ${BORDER};background:#fff;font-family:'DM Sans',sans-serif;font-size:.87rem;color:${CHARCOAL};outline:none;transition:all .2s}
.il-form-group input:focus,.il-form-group select:focus,.il-form-group textarea:focus{border-color:${RED};box-shadow:0 0 0 3px rgba(232,41,28,0.07)}
.il-form-group input:hover,.il-form-group select:hover,.il-form-group textarea:hover{border-color:#ccc}
.il-contact-pref{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:4px}
.il-pref-btn{padding:9px 7px;border-radius:8px;border:1.5px solid ${BORDER};background:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:.78rem;font-weight:500;color:${MID};transition:all .2s;font-family:'DM Sans',sans-serif}
.il-pref-btn.active{border-color:${RED};background:${RED_LT};color:${RED};font-weight:600}
.il-pref-btn:hover{border-color:rgba(232,41,28,0.4)}
.il-pref-ico{font-size:1.05rem}
.il-property-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.il-addr-section h4{font-family:'Fraunces',serif;font-size:.97rem;font-weight:700;margin-bottom:14px;color:${CHARCOAL};letter-spacing:-.02em}
.il-map-placeholder{border-radius:10px;border:1.5px solid ${BORDER};overflow:hidden;background:#e8f0e8}
.il-map-label{background:#fff;padding:8px 12px;display:flex;align-items:center;gap:5px;border-bottom:1px solid ${BORDER};font-size:.78rem;font-weight:600}
.il-map-label .pin{color:${RED}}
.il-map-body{height:160px;display:flex;align-items:center;justify-content:center;position:relative}
.il-map-note{font-size:.74rem;color:${MID};margin-top:6px;line-height:1.5}
.il-loc-btn{display:inline-flex;align-items:center;gap:5px;font-size:.79rem;color:${RED};font-weight:600;cursor:pointer;background:${RED_LT};border:1.5px solid rgba(232,41,28,0.18);padding:5px 12px;border-radius:7px;font-family:'DM Sans',sans-serif;margin-top:9px;transition:all .2s}
.il-loc-btn:hover{background:rgba(232,41,28,0.12)}
.il-prop-full h4{font-family:'Fraunces',serif;font-size:.97rem;font-weight:700;margin-bottom:11px;margin-top:18px;padding-top:14px;border-top:1px solid ${BORDER};letter-spacing:-.02em}
.il-cal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.il-cal-month{font-family:'Fraunces',serif;font-size:1rem;font-weight:700;letter-spacing:-.03em}
.il-cal-nav{background:#fff;border:1.5px solid ${BORDER};border-radius:7px;width:28px;height:28px;cursor:pointer;font-size:.86rem;display:flex;align-items:center;justify-content:center;transition:all .2s;color:${MID}}
.il-cal-nav:hover{border-color:${RED};color:${RED};background:${RED_LT}}
.il-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:16px}
.il-cal-dow{text-align:center;font-size:.67rem;font-weight:700;color:${MID};padding:4px 0;text-transform:uppercase;letter-spacing:.05em}
.il-cal-day{aspect-ratio:1;border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;border:1.5px solid transparent;font-size:.8rem;font-weight:500;color:${MID};background:#f8f8f8}
.il-cal-day:hover:not(.past){border-color:${RED};background:${RED_LT};color:${RED}}
.il-cal-day.selected{background:${RED};color:#fff;border-color:${RED};box-shadow:0 3px 9px rgba(232,41,28,0.26)}
.il-cal-day.today{border-color:${RED};color:${RED};background:#fff;font-weight:700}
.il-cal-day.today.selected{background:${RED};color:#fff}
.il-cal-day.past{opacity:.3;cursor:not-allowed}
.il-cal-day.has-slots .il-slot-count{font-size:.52rem;color:#16a34a;font-weight:700;margin-top:1px}
.il-cal-day.selected .il-slot-count{color:rgba(255,255,255,0.75)}
.il-urgency{margin-bottom:14px}
.il-urgency label{font-size:.75rem;font-weight:600;margin-bottom:6px;display:block}
.il-time-slots{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:16px}
.il-time-slot{padding:7px 5px;border-radius:7px;border:1.5px solid ${BORDER};background:#f8f8f8;font-size:.75rem;font-weight:500;text-align:center;cursor:pointer;transition:all .2s;color:${MID}}
.il-time-slot:hover{border-color:${RED};color:${RED};background:${RED_LT}}
.il-time-slot.active{border-color:${RED};background:${RED};color:#fff}
.il-time-slot.taken{opacity:.45;cursor:not-allowed;background:#f0f0f0;border-color:#ddd;color:#aaa;position:relative}
.il-time-slot.taken:hover{border-color:#ddd;background:#f0f0f0;color:#aaa}
.il-slot-taken-label{display:block;font-size:.55rem;color:#999;margin-top:1px;letter-spacing:.02em}
.il-info-box{background:${RED_LT};border:1px solid rgba(232,41,28,0.18);border-radius:8px;padding:11px 13px;display:flex;gap:8px;align-items:flex-start}
.il-info-box .il-info-ico{color:${RED};font-size:.9rem;flex-shrink:0;margin-top:1px}
.il-info-box p{font-size:.79rem;color:${CHARCOAL};line-height:1.52}
.il-info-box strong{color:${RED}}
.il-review-card{background:${CREAM};border-radius:10px;padding:16px;margin-bottom:11px}
.il-review-card h4{font-family:'Fraunces',serif;font-size:.93rem;font-weight:700;margin-bottom:11px;letter-spacing:-.02em;color:${CHARCOAL}}
.il-review-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid ${BORDER};font-size:.83rem}
.il-review-row:last-child{border-bottom:none}
.il-review-row span:first-child{color:${MID};font-weight:500}
.il-review-row span:last-child{color:${CHARCOAL};font-weight:600}
.il-submit-btn{width:100%;padding:13px;background:${RED};color:#fff;border:none;border-radius:9px;font-size:.93rem;font-weight:600;cursor:pointer;transition:all .25s;font-family:'DM Sans',sans-serif;margin-top:7px;letter-spacing:-.01em;box-shadow:0 4px 13px rgba(232,41,28,0.24)}
.il-submit-btn:hover{background:${RED_DK};transform:translateY(-1px)}
.il-submit-btn.sent{background:#16a34a;box-shadow:0 4px 13px rgba(22,163,74,0.26)}
.il-terms{font-size:.71rem;color:${MID};text-align:center;margin-top:9px;line-height:1.55}
.il-modal-footer{padding:14px 30px;border-top:1px solid ${BORDER};background:#fff;display:flex;justify-content:space-between;align-items:center}
.il-footer-hint{font-size:.74rem;color:${MID};font-weight:500}
.il-next-btn{background:${CHARCOAL};color:#fff;padding:10px 26px;border-radius:8px;font-size:.87rem;font-weight:600;cursor:pointer;border:none;display:flex;align-items:center;gap:6px;transition:all .25s;font-family:'DM Sans',sans-serif;letter-spacing:-.01em}
.il-next-btn:hover{background:${RED};transform:translateY(-1px);box-shadow:0 5px 14px rgba(232,41,28,0.26)}
.il-next-btn:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none;background:${CHARCOAL}}

/* ── ANIMATIONS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes slideIn{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}
.il-reveal{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}
.il-reveal.visible{opacity:1;transform:none}
.il-step-content{animation:slideIn .3s ease both}

/* ── MOBILE ── */
@media(max-width:1024px){
  .il-nav{padding:0 26px}
  .il-topbar{padding:0 26px}
  .il-nav-links a{padding:6px 9px;font-size:.79rem}
  .il-wrap{padding:0 26px}
  .il-contact-section{padding:0 26px 56px}
  .il-footer{padding:48px 26px 26px}
}
@media(max-width:900px){
  .il-topbar{display:none}
  .il-nav{top:0;padding:0 18px}
  .il-nav.scrolled{top:0}
  .il-nav-tagline{display:none}
  .il-nav-links{display:none;position:fixed;inset:0;background:#fff;flex-direction:column;align-items:center;justify-content:center;gap:20px;z-index:1000;padding:26px}
  .il-nav-links.open{display:flex}
  .il-nav-links a{font-size:1rem}
  .il-burger{display:flex}
  .il-hero{grid-template-columns:1fr;padding:110px 20px 52px;text-align:center;gap:32px}
  .il-hero-visual{display:none}
  .il-hero-stats{justify-content:center}
  .il-hero-btns{justify-content:center}
  .il-trust{padding:13px 18px;flex-wrap:wrap;gap:9px}
  .il-trust-logos{gap:13px;flex-wrap:wrap;justify-content:center}
  .il-wrap{padding:0 18px}
  .il-services-section,.il-how,.il-reviews-section,.il-why,.il-results-section,.il-clients-section,.il-faq-section{padding:52px 0}
  .il-svc-grid{grid-template-columns:repeat(2,1fr)}
  .il-steps{grid-template-columns:1fr}
  .il-why-inner{grid-template-columns:1fr;gap:28px}
  .il-why-img{display:none}
  .il-contact-section{padding:0 18px 52px}
  .il-cta{padding:36px 22px;flex-direction:column;text-align:center;border-radius:16px}
  .il-cta-btns{flex-direction:column;align-items:center;width:100%}
  .il-cta-contact-info{justify-content:center}
  .il-footer{padding:44px 18px 24px}
  .il-footer-grid{grid-template-columns:1fr 1fr;gap:22px}
  .il-footer-bottom{flex-direction:column;gap:11px;text-align:center}
  .il-modal-body{padding:18px 16px}
  .il-modal-footer{padding:13px 16px}
  .il-svc-pick-grid{grid-template-columns:1fr}
  .il-property-grid{grid-template-columns:1fr}
  .il-stepper{padding:11px 8px}
  .il-step-line{width:20px}
  .il-time-slots{grid-template-columns:repeat(3,1fr)}
  .il-cta-btns .il-btn-white,.il-cta-btns .il-btn-ow{width:100%;justify-content:center}
  .il-rev-card{padding:32px 24px 28px}
}
`;
const ILovahLogo = ({ size = 40 }) => (
  <img
    src={ilovahLogoSrc}
    alt="iLovah Logo"
    width={size}
    height={size}
    style={{
      borderRadius: 8,
      objectFit: "contain",
      display: "block",
      background: "#fff"
    }}
  />
);

const HeroSVG = () => (
  <svg viewBox="0 0 460 520" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect width="460" height="520" fill="#fdf4f3" />
    <rect x="0" y="340" width="460" height="180" fill="#fae8e7" />
    <rect x="100" y="60" width="260" height="180" rx="10" fill="#fff" opacity=".75" />
    <line x1="230" y1="60" x2="230" y2="240" stroke="#f2c0bc" strokeWidth="2" />
    <line x1="100" y1="150" x2="360" y2="150" stroke="#f2c0bc" strokeWidth="2" />
    <ellipse cx="230" cy="148" rx="80" ry="34" fill="rgba(255,220,200,0.35)" />
    <rect x="70" y="270" width="250" height="80" rx="14" fill="#fff" opacity=".9" />
    <rect x="70" y="260" width="250" height="26" rx="12" fill="#fde9e7" />
    <rect x="58" y="264" width="26" height="86" rx="9" fill="#fad5d3" />
    <rect x="296" y="264" width="26" height="86" rx="9" fill="#fad5d3" />
    <rect x="100" y="276" width="70" height="50" rx="9" fill={RED} opacity=".7" />
    <rect x="182" y="276" width="70" height="50" rx="9" fill="#e87c75" opacity=".5" />
    <rect x="358" y="276" width="16" height="66" rx="4" fill="#8b6b4e" />
    <ellipse cx="366" cy="258" rx="36" ry="46" fill="#4a9e6f" opacity=".8" />
    <circle cx="168" cy="196" r="24" fill="#fff" opacity=".9" />
    <circle cx="168" cy="190" r="16" fill="#f5c5a3" />
    <circle cx="161" cy="188" r="2.3" fill="#555" />
    <circle cx="175" cy="188" r="2.3" fill="#555" />
    <path d="M162 197 Q168 203 175 197" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <rect x="150" y="216" width="36" height="48" rx="9" fill={RED} />
    <line x1="190" y1="224" x2="226" y2="306" stroke="#8b6b4e" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="226" cy="311" rx="20" ry="9" fill="#aad4f0" opacity=".9" />
    <text x="250" y="182" fontSize="20" opacity=".6">✦</text>
    <text x="76" y="110" fontSize="13" opacity=".45">✦</text>
    <text x="368" y="148" fontSize="16" opacity=".5">✦</text>
    <rect x="28" y="458" width="170" height="42" rx="10" fill="#fff" opacity=".95" />
    <text x="44" y="476" fontFamily="sans-serif" fontSize="9" fill="#6b6b6b">Verified Reviews</text>
    <text x="44" y="493" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#1c1c1c">★★★★★ 4.9 / 5</text>
  </svg>
);

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
};
const R = ({ className = "", children, style }) => {
  const ref = useReveal();
  return <div ref={ref} className={`il-reveal ${className}`} style={style}>{children}</div>;
};

const SvcImg = ({ img, emoji }) => (
  img
    ? <div className="il-svc-img-ph" style={{ padding: 0 }}><img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
    : <div className="il-svc-img-ph">
      <div className="il-svc-img-dashed"><span className="il-svc-img-icon">{emoji}</span></div>
      <span className="il-svc-img-label">Service Photo</span>
    </div>
);

const SERVICES_DATA = [
  { name: "Carpet Cleaning", emoji: "🧹", price: "From $89", img: imgCarpet, desc: "Deep-cleaning that removes dirt, stains, and allergens using professional equipment and eco-friendly solutions. Ideal for homes, offices, and rentals.", bullets: ["Deep professional cleaning", "Duration: 2–4 hours"] },
  { name: "End of Lease Cleaning", emoji: "🚚", price: "From $249", img: imgEndOfLease, desc: "We promise to promptly address and rectify any cleaning issues your property manager identifies during the final inspection, ensuring your bond is secured.", bullets: ["Bond Back Guarantee", "Duration: 4–8 hours"] },
  { name: "Gutter Cleaning", emoji: "🌿", price: "From $120", img: imgGutter, desc: "Protect your property with precision. Our discreet, thorough gutter cleaning ensures seamless drainage and lasting curb appeal.", bullets: ["Precision gutter cleaning", "Duration: 2–3 hours"] },
  { name: "Window Cleaning", emoji: "🪟", price: "From $79", img: imgWindow, desc: "Professional window cleaning for streak-free, crystal-clear results — inside and out.", bullets: ["Spotless, streak-free window cleaning", "Duration: Varies"] },
  { name: "Pram Cleaning", emoji: "👶", price: "From $49", img: imgPram, desc: "Safe, thorough sanitising of prams and strollers to keep your little one's ride fresh and hygienic.", bullets: ["The Pram Patch", "Duration: Varies"] },
  { name: "Pest Control", emoji: "🐛", price: "From $150", img: imgPest, desc: "Safe and effective pest treatment for homes and businesses, keeping unwanted visitors out for good.", bullets: ["Professional service", "Duration: Varies"] },
  { name: "Pressure Washing", emoji: "💧", price: "From $99", img: imgPressure, desc: "Professional pressure washing for buildings, walkways, and common areas. Ideal for property managers, clinics, and commercial spaces.", bullets: ["Professional pressure washing", "Duration: 2–4 hours"] },
  { name: "General House Clean", emoji: "✨", price: "From $89", img: imgGeneral, desc: "Crystal-clear windows inside and out. We remove dirt, spots, and streaks for a spotless finish that brightens your home or business.", bullets: ["Crystal-clear windows", "Duration: 1–3 hours"] },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TIME_SLOTS = ["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM"];

// Simulate some taken slots — key format: "YYYY-M-D"
const now = new Date();
const TAKEN_SLOTS = (() => {
  const result = {};
  // Generate taken slots for the next 14 days (random-ish but deterministic)
  for (let offset = 1; offset <= 14; offset++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    if (d.getDay() === 0) continue; // skip Sunday
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    // Use offset to seed which slots are taken (2–3 per day)
    const taken = TIME_SLOTS.filter((_, i) => (i + offset) % 3 === 0 || (i + offset) % 5 === 0);
    if (taken.length) result[key] = taken;
  }
  return result;
})();

const REVIEWS_DATA = [
  { text: '"The team did a deep clean before my house inspection — thorough, professional, and on time. The place looked better than when I first moved in!"', name: "Jessica M.", loc: "Surry Hills, NSW", initials: "JM", color: RED, service: "Deep Clean", date: "14 Jan 2025", source: "Google" },
  { text: '"Connected with ILOVAHCLEANING SERVICES and would recommend them. Professional carpet cleaning service."', name: "Kui-Po L.", loc: "Mount Lofty, QLD", initials: "KL", color: "#555", service: "Carpet Cleaning", date: "13 Jun 2024", source: "Hipage" },
  { text: '"Got our full bond back thanks to their end-of-lease clean. They followed the agent\'s checklist exactly. Highly recommend!"', name: "Amira L.", loc: "Brisbane, QLD", initials: "AL", color: "#888", service: "End of Lease", date: "5 Sep 2024", source: "Hipage" },
  { text: '"Excellent pressure washing on our driveway. Looks brand new! Will definitely use them again for our gutters."', name: "James R.", loc: "North Toowoomba, QLD", initials: "JR", color: "#c55a11", service: "Pressure Washing", date: "5 Oct 2024", source: "Google" },
  { text: '"Reliable, punctual, and extremely detailed. The window cleaning was spotless. Highly recommended to all my neighbours!"', name: "Linda T.", loc: "East Toowoomba, QLD", initials: "LT", color: "#2e7d9e", service: "Window Cleaning", date: "17 Nov 2024", source: "Google" },
  { text: '"Best cleaning service in Toowoomba! The team was friendly, efficient, and left our place gleaming. 5 stars all the way."', name: "David K.", loc: "Rangeville, QLD", initials: "DK", color: "#5a6b2e", service: "Home Cleaning", date: "2 Dec 2024", source: "Hipage" },
];

const FAQS = [
  { q: "Do you guarantee bond back for end of lease cleaning?", a: "Yes! We offer a bond-back guarantee for all our end-of-lease cleaning services. If your landlord or property manager is not satisfied, we will return to re-clean at no additional cost — no questions asked." },
  { q: "How do I book a cleaning service?", a: "You can book by clicking 'Get Quote' on our website, calling us on 0478 711 829, or emailing ilovahcleaning@gmail.com. We typically respond within 2 hours with a tailored quote." },
  { q: "How far in advance should I book your services?", a: "We recommend booking at least 2–3 days in advance to secure your preferred time slot. For end-of-lease cleans, book as soon as you know your move-out date to ensure availability." },
  { q: "Can I be present during the cleaning?", a: "Absolutely! You are welcome to stay home during the clean. Many clients also choose to leave while we work — our team is fully insured, background-checked, and trusted by thousands of Queensland households." },
  { q: "Do you provide free quotes?", a: "Yes, all quotes are 100% free and obligation-free. Simply reach out via phone, email, or the booking form and we'll provide a detailed quote based on your specific needs." },
  { q: "Do you offer a satisfaction guarantee?", a: "We stand behind every clean with a 100% satisfaction guarantee. If you're not happy with any aspect of the service, contact us within 24 hours and we'll return to make it right at no extra charge." },
  { q: "What areas do you service?", a: "We service Toowoomba and all surrounding areas including Highfields, Gatton, Dalby, and more within ~50km. Contact us to confirm coverage for your specific location." },
  { q: "How long does a typical cleaning service take?", a: "Duration varies by property size and service type. A standard home clean takes 2–4 hours, while a full end-of-lease clean may take 4–8 hours. We'll give you a time estimate when booking." },
  { q: "Do I need to provide cleaning supplies and equipment?", a: "No! We bring all professional-grade cleaning products and equipment. Everything is included — all you need to do is let us in and we'll handle the rest." },
];

function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = (i) => setCurrent(i);
  const next = () => setCurrent(c => (c + 1) % REVIEWS_DATA.length);
  const prev = () => setCurrent(c => (c - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const r = REVIEWS_DATA[current];
  return (
    <div className="il-reviews-carousel">
      <div className="il-rev-card" key={current}>
        <div className="il-rev-source">{r.source}</div>
        <div className="il-rev-stars">★★★★★</div>
        <p className="il-rev-text">{r.text}</p>
        <div className="il-reviewer">
          <div className="il-rev-avatar" style={{ background: r.color }}>{r.initials}</div>
          <div className="il-rev-info">
            <div className="il-rev-name">{r.name}</div>
            <div className="il-rev-loc">{r.loc}</div>
            <div className="il-rev-service">{r.service}</div>
            <div className="il-rev-date">{r.date}</div>
          </div>
        </div>
      </div>
      <div className="il-rev-dots">
        {REVIEWS_DATA.map((_, i) => (
          <button key={i} className={`il-rev-dot ${i === current ? "active" : ""}`} onClick={() => goTo(i)} />
        ))}
      </div>
      <div className="il-rev-nav">
        <button className="il-rev-btn" onClick={prev}>←</button>
        <button className="il-rev-btn" onClick={next}>→</button>
      </div>
    </div>
  );
}

function FaqSection({ onContact }) {
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? FAQS : FAQS.slice(0, 5);

  return (
    <section className="il-faq-section" id="faq">
      <div className="il-wrap">
        <div className="il-faq-inner">
          <R style={{ textAlign: "center" }}>
            <div className="il-section-eyebrow" style={{ justifyContent: "center" }}>FAQ</div>
            <div className="il-section-title" style={{ maxWidth: "100%", textAlign: "center" }}>
              Frequently Asked <em>Questions</em>
            </div>
            <p style={{ color: MID, fontSize: ".93rem", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
              Get answers to common questions about our cleaning services. Still have questions?{" "}
              <button onClick={onContact} style={{ color: RED, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "inherit", fontFamily: "inherit", textDecoration: "underline" }}>
                Contact us
              </button>
            </p>
          </R>
          <div className="il-faq-list">
            {visible.map((f, i) => {
              const globalIdx = FAQS.indexOf(f);
              return (
                <div key={globalIdx} className={`il-faq-item ${open === globalIdx ? "open" : ""}`}>
                  <div className="il-faq-q" onClick={() => setOpen(open === globalIdx ? null : globalIdx)}>
                    <span>{f.q}</span>
                    <span className="il-faq-icon">+</span>
                  </div>
                  <div className="il-faq-a">{f.a}</div>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="il-faq-toggle" onClick={() => setShowAll(s => !s)}>
              {showAll ? "Show Less ↑" : `Show More (${FAQS.length - 5} more) ↓`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicePicker({ service, setService }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <>
      <h3>What do you need cleaned?</h3>
      <p className="il-modal-sub">Select the cleaning service that best fits your needs</p>
      <div className="il-svc-pick-grid">
        {SERVICES_DATA.map((s, i) => {
          const isOpen = expanded === i;
          return (
            <div key={s.name} className={`il-svc-pick il-svc-pick-exp ${service === s.name ? "selected" : ""}`} onClick={() => setService(s.name)}>
              <div className="il-svc-pick-top">
                <div className="il-svc-pick-img" style={{ padding: 0, overflow: "hidden" }}>
                  <img src={s.img} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 8 }} />
                </div>
                <div className="il-svc-pick-info">
                  <div className="il-svc-pick-name">{s.name}</div>
                </div>
                <div className="il-svc-radio"><div className="il-svc-radio-dot" /></div>
              </div>
              {isOpen && (
                <div className="il-svc-pick-detail" onClick={e => e.stopPropagation()}>
                  <p className="il-svc-pick-desc">{s.desc}</p>
                  <ul className="il-svc-pick-bullets">
                    {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
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

function PropertyStep({ street, setStreet, suburb, setSuburb, propState, setPropState, postcode, setPostcode, notes, setNotes }) {
  const [locStatus, setLocStatus] = useState("");
  const [mapSrc, setMapSrc] = useState("https://maps.google.com/maps?q=Toowoomba,QLD,Australia&z=11&output=embed");
  const state = propState;
  const setState = setPropState;

  const updateMap = (sub, st) => {
    const q = [sub, st, "Australia"].filter(Boolean).join(", ");
    setMapSrc(`https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=13&output=embed`);
  };

  const handleLocate = () => {
    if (!navigator.geolocation) { setLocStatus("Geolocation not supported"); return; }
    setLocStatus("Locating...");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setMapSrc(`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`);
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
            { headers: { "Accept-Language": "en", "User-Agent": "iLovahCleaningApp/1.0" } }
          );
          if (!r.ok) throw new Error("Geocode failed");
          const d = await r.json();
          const a = d.address || {};
          setStreet([a.house_number, a.road].filter(Boolean).join(" "));
          setSuburb(a.suburb || a.city_district || a.town || a.city || "");
          setState(a.state_code ? a.state_code.replace("AU-", "") : (a.state || "QLD"));
          setPostcode(a.postcode || "");
          setLocStatus("✓ Location found!");
        } catch {
          // Fallback: just update the map, show coords
          setLocStatus("✓ Map updated — please enter address manually");
        }
      },
      (err) => {
        if (err.code === 1) setLocStatus("⚠ Location access denied — please allow location");
        else if (err.code === 2) setLocStatus("⚠ Location unavailable");
        else setLocStatus("⚠ Location request timed out");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <>
      <h3>Property Information</h3>
      <p className="il-modal-sub">Where would you like us to clean?</p>
      <div className="il-property-grid">
        <div>
          <div className="il-addr-section"><h4>Address</h4></div>
          <div className="il-form-group">
            <label>Street Address <span style={{ color: RED }}>*</span></label>
            <input type="text" value={street} onChange={e => setStreet(e.target.value)} placeholder="123 Main Street" />
          </div>
          <div className="il-form-row">
            <div className="il-form-group">
              <label>Suburb <span style={{ color: RED }}>*</span></label>
              <input type="text" value={suburb} onChange={e => { setSuburb(e.target.value); updateMap(e.target.value, state); }} placeholder="Toowoomba" />
            </div>
            <div className="il-form-group">
              <label>State</label>
              <input type="text" value={state} onChange={e => { setState(e.target.value); updateMap(suburb, e.target.value); }} placeholder="QLD" />
            </div>
          </div>
          <div className="il-form-row">
            <div className="il-form-group">
              <label>Postcode</label>
              <input type="text" value={postcode} onChange={e => setPostcode(e.target.value)} placeholder="4350" />
            </div>
            <div className="il-form-group">
              <label>Country</label>
              <input type="text" defaultValue="Australia" readOnly />
            </div>
          </div>
          <button className="il-loc-btn" onClick={handleLocate}>📍 Use my current location</button>
          {locStatus && (
            <p style={{ fontSize: ".74rem", color: locStatus.startsWith("✓") ? "#16a34a" : RED, marginTop: 7, fontWeight: 600 }}>
              {locStatus}
            </p>
          )}
        </div>
        <div>
          <div className="il-addr-section"><h4>Coverage Map</h4></div>
          <div className="il-map-placeholder">
            <div className="il-map-label"><span className="pin">📍</span> Toowoomba & Surrounds</div>
            <div style={{ height: 200 }}>
              <iframe
                key={mapSrc}
                src={mapSrc}
                width="100%" height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coverage Map"
              />
            </div>
          </div>
          <p className="il-map-note">We cover Toowoomba & surrounds within ~50km.</p>
        </div>
      </div>
      <div className="il-prop-full">
        <h4>Additional Notes</h4>
        <div className="il-form-group">
          <label>Access instructions or special requirements</label>
          <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Gate code #1234, dog in backyard..." style={{ resize: "vertical" }} />
        </div>
      </div>
    </>
  );
}

function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [pref, setPref] = useState("Phone");
  const [calDate, setCalDate] = useState(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth()); });
  const [selDay, setSelDay] = useState(null);
  const [selTime, setSelTime] = useState("9:30 AM");
  const [urgency, setUrgency] = useState("Flexible — within 2 weeks");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  // Contact fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Property fields
  const [street, setStreet] = useState("");
  const [suburb, setSuburb] = useState("Toowoomba");
  const [propState, setPropState] = useState("QLD");
  const [postcode, setPostcode] = useState("4350");
  const [notes, setNotes] = useState("");

  const today = new Date();
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
  // Show slots for future weekdays (Mon–Sat), hide Sundays
  const hasSlots = (d) => {
    if (isPast(d)) return false;
    const dow = new Date(year, month, d).getDay();
    return dow !== 0; // no slots on Sunday
  };
  const progressWidth = `${(step / steps.length) * 100}%`;

  const handleSubmit = async () => {
    setSending(true);
    setSendError("");

    // ── Paste your Firebase Function URL here after deploying ──────────
    // Run: firebase deploy --only functions
    // Then copy the URL printed in the terminal, e.g.:
    // https://sendbookingemail-abc123xyz-uc.a.run.app
    const FUNCTION_URL = "https://us-central1-ilovahclean.cloudfunctions.net/sendBookingEmail";
    // ──────────────────────────────────────────────────────────────────

    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: service || "General House Clean",
          date: `${MONTHS[month]} ${selDay}, ${year}`,
          time: selTime,
          urgency,
          firstName,
          lastName,
          email,
          phone,
          pref,
          street,
          suburb,
          propState,
          postcode,
          notes,
          submittedAt: new Date().toLocaleString("en-AU"),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Send failed");

      setSubmitted(true);
      setTimeout(() => { handleClose(); }, 2800);
    } catch (err) {
      setSendError("Failed to send. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`il-overlay ${isOpen ? "active" : ""}`} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="il-modal">
        <div className="il-progress-bar"><div className="il-progress-fill" style={{ width: progressWidth }} /></div>
        <div className="il-stepper">
          <button className={`il-stepper-back ${step === 1 ? "hidden" : ""}`} onClick={() => setStep(s => s - 1)}>‹</button>
          <div className="il-steps-wrap">
            {steps.map((s, i) => {
              const n = i + 1; const done = n < step; const active = n === step; return (
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
            {step === 2 && (<><h3>Your Contact Details</h3><p className="il-modal-sub">We'll send your quote within 2 hours</p><div className="il-form-row"><div className="il-form-group"><label>First Name <span>*</span></label><input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane" /></div><div className="il-form-group"><label>Last Name <span>*</span></label><input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Smith" /></div></div><div className="il-form-row"><div className="il-form-group"><label>Email <span>*</span></label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" /></div><div className="il-form-group"><label>Phone <span>*</span></label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="0400 000 000" /></div></div><div className="il-form-group"><label>Preferred contact method</label><div className="il-contact-pref">{[{ label: "Phone", ico: "📞" }, { label: "Email", ico: "✉️" }, { label: "SMS", ico: "💬" }].map(p => (<button key={p.label} className={`il-pref-btn ${pref === p.label ? "active" : ""}`} onClick={() => setPref(p.label)}><span className="il-pref-ico">{p.ico}</span>{p.label}</button>))}</div></div></>)}
            {step === 3 && <PropertyStep street={street} setStreet={setStreet} suburb={suburb} setSuburb={setSuburb} propState={propState} setPropState={setPropState} postcode={postcode} setPostcode={setPostcode} notes={notes} setNotes={setNotes} />}
            {step === 4 && (<><h3>Choose Date & Time</h3><p className="il-modal-sub">Pick a date — highlighted dates have slots</p><div className="il-cal-header"><button className="il-cal-nav" onClick={() => { const prev = new Date(year, month - 1); const now = new Date(); if (prev.getFullYear() > now.getFullYear() || (prev.getFullYear() === now.getFullYear() && prev.getMonth() >= now.getMonth())) setCalDate(prev); }}>‹</button><span className="il-cal-month">{MONTHS[month]} {year}</span><button className="il-cal-nav" onClick={() => setCalDate(new Date(year, month + 1))}>›</button></div><div className="il-cal-grid">{DAYS.map(d => <div key={d} className="il-cal-dow">{d}</div>)}{calCells.map((d, i) => d === null ? <div key={`e${i}`} /> : (<div key={d} className={`il-cal-day ${isPast(d) ? "past" : ""} ${selDay === d ? "selected" : ""} ${d === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? "today" : ""} ${hasSlots(d) ? "has-slots" : ""}`} onClick={() => !isPast(d) && setSelDay(d)}>{d}{hasSlots(d) && (() => { const key = `${year}-${month}-${d}`; const taken = (TAKEN_SLOTS[key] || []).length; const rem = TIME_SLOTS.length - taken; return <span className="il-slot-count">{rem} slots</span>; })()}</div>))}</div><div style={{ marginBottom: 14 }}><label style={{ fontSize: ".75rem", fontWeight: 600, display: "block", marginBottom: 8 }}>Preferred time slot</label><div className="il-time-slots">{TIME_SLOTS.map(t => { const isTaken = TAKEN_SLOTS[`${year}-${month}-${selDay}`]?.includes(t); return <div key={t} className={`il-time-slot ${selTime === t && !isTaken ? "active" : ""} ${isTaken ? "taken" : ""}`} onClick={() => !isTaken && setSelTime(t)} title={isTaken ? "This slot is already booked" : ""}>{t}{isTaken && <span className="il-slot-taken-label">Taken</span>}</div>; })}</div></div><div className="il-urgency"><label>Urgency</label><select value={urgency} onChange={e => setUrgency(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${BORDER}`, fontFamily: "'DM Sans',sans-serif", fontSize: ".87rem", outline: "none", color: CHARCOAL, background: "#fff" }}><option>Flexible — within 2 weeks</option><option>Soon — within 3 days</option><option>Urgent — ASAP</option></select></div><div className="il-info-box"><span className="il-info-ico">ℹ️</span><p>We'll confirm your arrival window within <strong>2 hours</strong> of booking.</p></div></>)}
            {step === 5 && (<><h3>Review & Confirm</h3><p className="il-modal-sub">Double-check before submitting</p><div className="il-review-card"><h4>🧹 Service Details</h4><div className="il-review-row"><span>Service</span><span>{service || "General House Clean"}</span></div><div className="il-review-row"><span>Date</span><span>{MONTHS[month]} {selDay}, {year}</span></div><div className="il-review-row"><span>Time</span><span>{selTime}</span></div><div className="il-review-row"><span>Urgency</span><span>{urgency}</span></div><div className="il-review-row"><span>Location</span><span>{suburb}, {propState}</span></div></div><div className="il-review-card"><h4>👤 Contact Details</h4><div className="il-review-row"><span>Name</span><span>{firstName} {lastName}</span></div><div className="il-review-row"><span>Email</span><span>{email}</span></div><div className="il-review-row"><span>Phone</span><span>{phone}</span></div><div className="il-review-row"><span>Contact via</span><span>{pref}</span></div></div>{sendError && <p style={{ color: RED, fontSize: ".82rem", fontWeight: 600, marginBottom: 10, textAlign: "center" }}>{sendError}</p>}<button className={`il-submit-btn ${submitted ? "sent" : ""}`} onClick={handleSubmit} disabled={sending || submitted}>{submitted ? "✓ Booking Sent! We'll be in touch shortly." : sending ? "Sending…" : "Confirm & Send Booking Request"}</button><p className="il-terms">By submitting, you agree to our Terms & Privacy Policy.<br />We'll respond within 2 hours.</p></>)}
          </div>
        </div>
        {step < 5 && (<div className="il-modal-footer"><span className="il-footer-hint">Step {step} of {steps.length}</span><button className="il-next-btn" disabled={step === 1 && !service} onClick={() => setStep(s => s + 1)}>Continue <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button></div>)}
      </div>
    </div>
  );
}

export default function ILovah() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const services = [
    { emoji: "🧹", title: "Carpet Cleaning", desc: "Steam and dry cleaning to lift stains, allergens, and odours from carpets, rugs, and sofas.", featured: false, from: "From $89", img: imgCarpet },
    { emoji: "🚚", title: "End of Lease Cleaning", desc: "Get your full bond back with our end-of-lease clean. We follow real estate agent checklists exactly.", featured: true, from: "From $249", img: imgEndOfLease },
    { emoji: "🌿", title: "Gutter Cleaning", desc: "Safe and thorough gutter clearing to protect your roof and home from water damage year-round.", featured: false, from: "From $120", img: imgGutter },
    { emoji: "🪟", title: "Window Cleaning", desc: "Crystal-clear windows inside and out using streak-free solutions and professional equipment.", featured: false, from: "From $79", img: imgWindow },
    { emoji: "👶", title: "Pram Cleaning", desc: "Deep sanitising and cleaning of prams and strollers to keep your little one safe and fresh.", featured: false, from: "From $49", img: imgPram },
    { emoji: "🐛", title: "Pest Control", desc: "Safe and effective pest treatment for homes and businesses, keeping unwanted visitors out for good.", featured: false, from: "From $150", img: imgPest },
    { emoji: "💧", title: "Pressure Washing", desc: "High-pressure cleaning for driveways, decks, fences, and exteriors — looking brand new again.", featured: false, from: "From $99", img: imgPressure },
    { emoji: "✨", title: "General House Clean", desc: "Regular maintenance cleaning covering all rooms — dusting, vacuuming, mopping, and surface sanitising.", featured: false, from: "From $89", img: imgGeneral },
  ];

  const howSteps = [
    { ico: "📋", title: "Choose Your Service", desc: "Pick the cleaning type — from a quick tidy to a full deep clean." },
    { ico: "📅", title: "Pick Date & Time", desc: "Available 7 days a week, including public holidays." },
    { ico: "🧑‍🔧", title: "We Show Up & Clean", desc: "Trained cleaners arrive on time with all supplies included." },
    { ico: "🌟", title: "Enjoy Your Space", desc: "Come home to spotless results. Guaranteed or we re-clean free." },
  ];

  const clients = [
    { label: "GALAXY HOUSING", sub: "Trusted Partner", cls: "galaxy", logo: imgHousing },
    { label: "East Toowoomba", sub: "Skin Cancer Clinic", cls: "skin", logo: imgClinic },
    { label: "Cherubs", sub: "Early Learning & Kindergarten", cls: "cherubs", logo: imgCherub },
    { label: "CORPORATE BOX VALLEY", sub: null, cls: "boxvalley", logo: imgBox },
    { label: "Cienna Living", sub: null, cls: "cianna", logo: imgLiving },
  ];

  return (
    <div>
      <style>{CSS}</style>

      {/* TOP INFO BAR */}
      <div className={`il-topbar ${scrolled ? "hidden" : ""}`}>
        <div className="il-topbar-left">
          <a className="il-topbar-item" href="#">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
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
            <span style={{ color: RED, fontWeight: 600 }}>0478 711 829</span>
          </a>
          <div className="il-topbar-divider" />
          <a className="il-topbar-item" href="mailto:ilovahcleaning@gmail.com">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            ilovahcleaning@gmail.com
          </a>
        </div>
      </div>

      {/* NAV — no Results/Clients in navbar */}
      <nav className={`il-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="il-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ILovahLogo size={36} />
          <div><span className="il-logo-text">iLovah</span><span className="il-logo-sub">Cleaning Services</span></div>
        </div>
        <ul className={`il-nav-links ${menuOpen ? "open" : ""}`}>
          <li><a onClick={() => go("services")}>Services</a></li>
          <li><a onClick={() => go("about")}>About</a></li>
          <li><a onClick={() => go("reviews")}>Reviews</a></li>
          <li><a onClick={() => go("faq")}>FAQ</a></li>
          <li><a onClick={() => go("contact")}>Contact</a></li>
          <li><a className="il-nav-quote" onClick={() => setModalOpen(true)}>Get Quote</a></li>
        </ul>
        <button className={`il-burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* TAGLINE */}
      <div className={`il-nav-tagline ${scrolled ? "scrolled" : ""}`}>
        <span className="il-tagline-dot" />Professional &bull; Reliable &bull; Trusted Since 2017<span className="il-tagline-dot" />
      </div>

      {/* HERO */}
      <section className="il-hero">
        <div className="il-hero-bg" /><div className="il-hero-noise" />
        <div>
          <div className="il-hero-eyebrow"><div className="il-eyebrow-dot">❤️</div>Trusted by 5,000+ homes across Queensland</div>
          <h1><span className="il-h1-line">Your home,</span><span className="il-h1-line"><em>loved clean</em></span><span className="il-h1-line">every time.</span></h1>
          <p className="il-hero-p">Professional cleaning services tailored to your lifestyle. iLovah handles the mess so you can enjoy a fresh, spotless home — backed by a 100% satisfaction guarantee.</p>
          <div className="il-hero-btns">
            <button className="il-btn" onClick={() => setModalOpen(true)}>Book a Clean <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
            <button className="il-btn-ghost" onClick={() => go("services")}>View Services</button>
          </div>
          <div className="il-hero-stats">
            <div className="il-stat"><div className="il-stat-num">5K<span>+</span></div><div className="il-stat-label">Happy Clients</div></div>
            <div className="il-stat"><div className="il-stat-num">4.9<span>★</span></div><div className="il-stat-label">Avg Rating</div></div>
            <div className="il-stat"><div className="il-stat-num">12<span>yr</span></div><div className="il-stat-label">Experience</div></div>
          </div>
        </div>
        <div className="il-hero-visual">
          <div className="il-hero-card"><img src={heroImg} alt="iLovah cleaning service" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div>
          <div className="il-float-card il-fc1"><div className="il-fc-pulse" /><div className="il-fc-ico">🧹</div><div><div className="il-fc-t">Today's Booking</div><div className="il-fc-s">Deep Clean · 2:00 PM</div></div></div>
          <div className="il-float-card il-fc2"><div className="il-fc-ico">✅</div><div><div className="il-fc-t">Job Completed</div><div className="il-fc-s">Just now · Sarah M.</div></div></div>
        </div>
      </section>

      {/* TRUST */}
      <div className="il-trust">
        <span className="il-trust-label">Trusted by</span>
        <div className="il-trust-logos">{["Galaxy Housing", "East Tbba Skin Clinic", "Cherubs ELC", "Corporate Box Valley", "Cianna Group"].map(l => <span key={l} className="il-trust-logo">{l}</span>)}</div>
      </div>

      {/* SERVICES */}
      <section className="il-services-section" id="services">
        <div className="il-wrap">
          <R><div className="il-section-eyebrow">What We Offer</div><div className="il-section-title">Cleaning services <em>tailored</em><br />to every space</div></R>
          <div className="il-svc-grid">
            {services.map((s, i) => (
              <R key={i} className={`il-svc-card ${s.featured ? "featured" : ""}`} style={{ transitionDelay: `${i * 0.07}s` }}>
                <SvcImg img={s.img} emoji={s.emoji} />
                <div className="il-svc-body">
                  <div className="il-svc-title">{s.title}</div>
                  <div className="il-svc-desc">{s.desc}</div>
                  <button className="il-svc-link" onClick={() => setModalOpen(true)}>Book Now <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="il-how" id="how">
        <div className="il-wrap">
          <R><div className="il-section-eyebrow">Simple Process</div><div className="il-section-title">Booked, cleaned & <em style={{ color: "#e87c75" }}>done</em><br />in 4 easy steps</div></R>
          <div className="il-steps">
            {howSteps.map((s, i) => (<R key={i} className="il-step" style={{ transitionDelay: `${i * 0.08}s` }}><div className="il-step-num">0{i + 1}</div><div className="il-step-ico">{s.ico}</div><div className="il-step-title">{s.title}</div><div className="il-step-desc">{s.desc}</div></R>))}
          </div>
        </div>
      </section>

      {/* WHY / ABOUT */}
      <section className="il-why" id="about">
        <div className="il-wrap">
          <div className="il-why-inner">
            <R>
              <div className="il-why-img">
                <img src={imgHappy} alt="Happy iLovah client" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div className="il-why-badge"><div className="il-why-badge-icon">🏆</div><div><strong>100% Bond Back Guarantee</strong><span>Or we re-clean for free</span></div></div>
              </div>
            </R>
            <R>
              <div className="il-section-eyebrow">Why iLovah</div>
              <div className="il-section-title" style={{ marginBottom: 14 }}>We go beyond <em>clean</em> —<br />we restore comfort</div>
              <p className="il-why-intro">Founded in 2013, iLovah has been helping families and professionals in Toowoomba & surrounds reclaim their time and live in cleaner, healthier spaces. Every cleaner is background-checked, trained, and insured.</p>
              <div className="il-features">
                {[
                  { ico: "🌿", title: "Eco-Friendly Products", desc: "Non-toxic, biodegradable cleaning products safe for children, pets, and the environment." },
                  { ico: "🛡️", title: "Fully Insured & Background Checked", desc: "Every team member is police-cleared and fully insured — your home is protected." },
                  { ico: "🔁", title: "Satisfaction Guarantee", desc: "Not happy? We return and re-clean at absolutely no extra charge." },
                ].map((f, i) => (<div key={i} className="il-feature"><div className="il-feat-ico">{f.ico}</div><div><div className="il-feat-title">{f.title}</div><div className="il-feat-desc">{f.desc}</div></div></div>))}
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* RESULTS — See the Difference (not in navbar) */}
      <section className="il-results-section">
        <div className="il-wrap" style={{ textAlign: "center" }}>
          <R>
            <div className="il-section-eyebrow" style={{ justifyContent: "center" }}>Results</div>
            <div className="il-section-title" style={{ maxWidth: "100%", textAlign: "center" }}>See the <em>Difference</em></div>
            <p style={{ color: MID, fontSize: ".93rem", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>Real results from our professional cleaning services across Queensland.</p>
          </R>
          <R>
            <div className="il-ba-wrap">
              <div className="il-ba-labels">
                <span className="il-ba-label before">Before</span>
                <span className="il-ba-label after">After</span>
              </div>
              <div className="il-ba-img">
                <div className="il-ba-half left">
                  <img src={imgBeforeKitchen} alt="Before cleaning" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div className="il-ba-divider" />
                <div className="il-ba-half right">
                  <img src={imgAfterKitchen} alt="After cleaning" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* CLIENTS — Our Happy Clients (not in navbar) */}
      <section className="il-clients-section">
        <div className="il-wrap" style={{ textAlign: "center" }}>
          <R>
            <div style={{ fontSize: "1.4rem", marginBottom: 12 }}>❤️</div>
            <div className="il-section-eyebrow" style={{ justifyContent: "center" }}>Our Clients</div>
            <div className="il-section-title" style={{ maxWidth: "100%", textAlign: "center" }}>Our <em>Happy</em> Clients</div>
            <p style={{ color: MID, fontSize: ".93rem", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>See the amazing results we've achieved for our satisfied customers across Queensland.</p>
          </R>
          <div className="il-clients-grid">
            {clients.map((c, i) => (
              <R key={i} className={`il-client-card ${c.cls}`} style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="il-client-logo-wrap">
                  <img src={c.logo} alt={c.label} className="il-client-logo-img" />
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS CAROUSEL */}
      <section className="il-reviews-section" id="reviews">
        <div className="il-wrap" style={{ textAlign: "center" }}>
          <R>
            <div className="il-section-eyebrow" style={{ justifyContent: "center" }}>Customer Reviews</div>
            <div className="il-section-title" style={{ maxWidth: "100%", textAlign: "center" }}>What our clients <em>love</em> about us</div>
            <p style={{ color: MID, fontSize: ".93rem", lineHeight: 1.7 }}>Real feedback from satisfied customers across Toowoomba (14 reviews)</p>
          </R>
          <ReviewsCarousel />
        </div>
      </section>

      {/* FAQ */}
      <FaqSection onContact={() => go("contact")} />

      {/* CONTACT CTA */}
      <div className="il-contact-section" id="contact">
        <R>
          <div className="il-cta">
            <div className="il-cta-text">
              <h2>Ready for a cleaner,<br /><em>happier home?</em></h2>
              <p>Join over 5,000 households who trust iLovah. Get your free quote in under 60 seconds.</p>
              <div className="il-cta-contact-info">
                <div className="il-cta-info-item">📍 <strong>4 Kelfield Street, North Toowoomba QLD 4350</strong></div>
                <div className="il-cta-info-item">📞 <strong>0478 711 829</strong></div>
                <div className="il-cta-info-item">✉️ <strong>ilovahcleaning@gmail.com</strong></div>
                <div className="il-cta-info-item">🌐 <strong>www.ilovahcleaningservices.com.au</strong></div>
              </div>
            </div>
            <div className="il-cta-btns">
              <button className="il-btn-white" onClick={() => setModalOpen(true)}>Book a Clean</button>
              <a href="tel:0478711829" className="il-btn-ow"><span>📞</span> 0478 711 829</a>
            </div>
          </div>
        </R>
      </div>

      {/* FOOTER */}
      <footer className="il-footer">
        <div className="il-footer-grid">
          <div className="il-footer-brand">
            <div className="il-logo" style={{ cursor: "default" }}>
              <ILovahLogo size={32} />
              <div><span className="il-logo-text" style={{ color: "#fff" }}>iLovah</span><span className="il-logo-sub" style={{ color: "rgba(255,255,255,0.35)" }}>Cleaning Services</span></div>
            </div>
            <p>Professional cleaning for homes and businesses in Toowoomba & surrounds. Reliable, eco-friendly, always on time.</p>
            <div className="il-socials" style={{ marginTop: 16 }}>
              {[{ l: "f", t: "Facebook" }, { l: "ig", t: "Instagram" }, { l: "yt", t: "YouTube" }, { l: "𝕏", t: "Twitter" }, { l: "♪", t: "TikTok" }].map(s => <span key={s.l} className="il-social" title={s.t}>{s.l}</span>)}
            </div>
          </div>
          <div className="il-footer-col"><h4>Services</h4><ul>{["Standard Clean", "Deep Clean", "End of Lease", "Carpet Cleaning", "Window Cleaning", "Office Cleaning"].map(s => <li key={s}><a href="#">{s}</a></li>)}</ul></div>
          <div className="il-footer-col"><h4>Company</h4><ul>{["About Us", "Our Team", "FAQ", "Contact"].map(s => <li key={s}><a href="#">{s}</a></li>)}</ul></div>
          <div className="il-footer-col"><h4>Contact</h4><ul><li><a href="tel:0478711829">0478 711 829</a></li><li><a href="mailto:ilovahcleaning@gmail.com">ilovahcleaning@gmail.com</a></li>{["Toowoomba, QLD", "Brisbane, QLD", "Ipswich, QLD"].map(c => <li key={c}><a href="#">{c}</a></li>)}</ul></div>
        </div>
        <div className="il-footer-bottom">
          <p>© 2025 iLovah Cleaning Services. All rights reserved. | ABN: 12 345 678 901</p>
          <div style={{ display: "flex", gap: 16, fontSize: ".76rem" }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>Terms of Service</a>
            <a href="#" style={{ color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>Sitemap</a>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}