import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import NavBar from "./NavBar";
import PageFooter from "./PageFooter";

// ── Design tokens ──────────────────────────────────────────────────────────
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

// Category config (matches what admin saves)
const CAT_CFG = {
    cleaning: { label: "Cleaning Tips", cls: "cat-cleaning", fallbackBg: "linear-gradient(135deg,#e8f4fd,#cce6f7)", emoji: "🧹" },
    pest: { label: "Pest Control", cls: "cat-pest", fallbackBg: "linear-gradient(135deg,#fdecea,#fccac8)", emoji: "🐛" },
    tips: { label: "Home Tips", cls: "cat-tips", fallbackBg: "linear-gradient(135deg,#fffbea,#fff0b3)", emoji: "✨" },
    news: { label: "News", cls: "cat-news", fallbackBg: "linear-gradient(135deg,#f7f9fc,#eaf0f8)", emoji: "🏆" },
};

const CATEGORIES = [
    { key: "all", label: "All Posts" },
    { key: "cleaning", label: "Cleaning Tips" },
    { key: "pest", label: "Pest Control" },
    { key: "tips", label: "Home Tips" },
    { key: "news", label: "News" },
];

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
  overflow:hidden;
}
.blog-card-img img{
  width:100%;height:100%;object-fit:cover;
  position:absolute;inset:0;
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
.blog-featured-img img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
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

/* SKELETON */
.skeleton{
  background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);
  background-size:200% 100%;
  animation:shimmer 1.5s infinite;
  border-radius:8px;
}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* RESPONSIVE */
@media(max-width:900px){
  .blog-featured{grid-template-columns:1fr;padding:32px 28px}
  .blog-featured-img{display:none}
}
@media(max-width:600px){
  .blog-hero{padding:110px 5% 60px}
  .blog-section{padding:40px 5% 60px}
  .blog-newsletter{padding:32px 24px}
}
`;

// ── Skeleton loader ────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="blog-card" style={{ pointerEvents: "none" }}>
            <div className="skeleton" style={{ width: "100%", height: 200 }} />
            <div className="blog-card-body" style={{ gap: 12 }}>
                <div className="skeleton" style={{ height: 20, width: "40%" }} />
                <div className="skeleton" style={{ height: 22, width: "90%" }} />
                <div className="skeleton" style={{ height: 16, width: "100%" }} />
                <div className="skeleton" style={{ height: 16, width: "80%" }} />
                <div className="skeleton" style={{ height: 16, width: "60%", marginTop: 8 }} />
            </div>
        </div>
    );
}

export default function BlogPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null); // null = loading
    const [activeCategory, setActiveCategory] = useState("all");
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    // Load published posts from Firestore in real-time
    useEffect(() => {
        const q = query(
            collection(db, "blogPosts"),
            where("published", "==", true),
            orderBy("createdAt", "desc")
        );
        const unsub = onSnapshot(q, snap => {
            setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        }, err => {
            console.error("Blog fetch error:", err);
            setPosts([]);
        });
        return unsub;
    }, []);

    // SEO: meta tags, canonical, and JSON-LD for the blog index
    useEffect(() => {
        window.scrollTo(0, 0);
        const BASE_URL = "https://www.ilovahcleaningservices.com.au";

        document.title = "Cleaning & Pest Control Tips Blog | iLovah – Toowoomba";
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
        setMeta("description", "Expert cleaning and pest control tips for Toowoomba homes. Guides on bond cleaning, carpet care, gutter maintenance, and pest prevention from iLovah Cleaning & Rest In Pest.");
        setMeta("robots", "index, follow");
        setMeta("og:title", "Cleaning & Pest Control Tips Blog | iLovah Toowoomba", "property");
        setMeta("og:description", "Expert advice, how-to guides, and local news from the iLovah Cleaning & Rest In Pest team in Toowoomba.", "property");
        setMeta("og:type", "website", "property");
        setMeta("og:url", `${BASE_URL}/blog`, "property");
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", "Cleaning & Pest Control Tips Blog | iLovah Toowoomba");

        setLink("canonical", `${BASE_URL}/blog`);

        const existing = document.getElementById("blog-jsonld-main");
        if (existing) existing.remove();
        const script = document.createElement("script");
        script.id = "blog-jsonld-main";
        script.type = "application/ld+json";
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "BreadcrumbList",
                    "@id": `${BASE_URL}/blog#breadcrumb`,
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
                        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` }
                    ]
                },
                {
                    "@type": "Blog",
                    "@id": `${BASE_URL}/blog#blog`,
                    "url": `${BASE_URL}/blog`,
                    "name": "iLovah Cleaning & Rest In Pest Blog",
                    "description": "Cleaning and pest control tips, guides, and local news for Toowoomba homes.",
                    "publisher": { "@id": `${BASE_URL}/#business` },
                    "inLanguage": "en-AU"
                }
            ]
        });
        document.head.appendChild(script);

        return () => { const s = document.getElementById("blog-jsonld-main"); if (s) s.remove(); };
    }, []);

    const featured = posts?.find(p => p.featured) ?? null;
    const filtered = posts === null ? null :
        activeCategory === "all"
            ? posts.filter(p => !p.featured)
            : posts.filter(p => p.cat === activeCategory && !p.featured);

    function handleSubscribe() {
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    }

    return (
        <div style={{ width: "100%", maxWidth: "100%", margin: 0, padding: 0, overflowX: "hidden" }}>
            <style>{BLOG_CSS}</style>
            <NavBar />

            {/* ── HERO ── */}
            <section className="blog-hero">
                <div className="blog-hero-tag">📰 iLovah Blog</div>
                <h1>Cleaning & Pest Tips for<br /><span className="hl-red">Toowoomba Homes</span></h1>
                <p>Expert advice, how-to guides, and local news from the iLovah Cleaning & Rest In Pest team.</p>
                <div className="blog-hero-bar" />
            </section>

            {/* ── FILTER TABS ── */}
            <div className="blog-filters" role="tablist" aria-label="Filter blog posts by category">
                {CATEGORIES.map(c => (
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

                {/* Loading state */}
                {posts === null && (
                    <div className="blog-grid" style={{ marginBottom: 40 }}>
                        {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                    </div>
                )}

                {/* Featured post — only on "all" tab */}
                {posts !== null && activeCategory === "all" && featured && (
                    <div className="blog-featured">
                        <div>
                            <div className="blog-featured-tag">Featured Article</div>
                            <h2>{featured.title}</h2>
                            <p>{featured.excerpt}</p>
                            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                                <button className="btn-blue">Read Article →</button>
                                <span style={{ fontSize: ".78rem", color: "rgba(255,255,255,.35)", fontWeight: 700 }}>
                                    {featured.date} · {featured.readTime}
                                </span>
                            </div>
                        </div>
                        <div className="blog-featured-img">
                            {featured.imageUrl
                                ? <img src={featured.imageUrl} alt={featured.title} />
                                : <span>{CAT_CFG[featured.cat]?.emoji || "📝"}</span>
                            }
                        </div>
                    </div>
                )}

                {/* Grid */}
                {posts !== null && filtered !== null && (
                    filtered.length > 0 ? (
                        <div className="blog-grid">
                            {filtered.map(post => {
                                const catInfo = CAT_CFG[post.cat] || CAT_CFG.news;
                                return (
                                    <article key={post.id} className="blog-card" aria-label={post.title}>
                                        <div className="blog-card-img" style={{ background: post.imageUrl ? "#f0f0f0" : catInfo.fallbackBg }}>
                                            {post.imageUrl
                                                ? <img src={post.imageUrl} alt={post.title} />
                                                : catInfo.emoji
                                            }
                                        </div>
                                        <div className="blog-card-body">
                                            <span className={`blog-card-cat ${catInfo.cls}`}>{catInfo.label}</span>
                                            <div className="blog-card-title">{post.title}</div>
                                            <div className="blog-card-excerpt">{post.excerpt}</div>
                                            <div className="blog-card-meta">
                                                <div className="blog-card-meta-left">
                                                    <div className="blog-card-avatar">{(post.author || "i")[0]}</div>
                                                    <span>{post.author}</span>
                                                </div>
                                                <span>{post.date} · {post.readTime}</span>
                                            </div>
                                            <button className="blog-read-more" style={{ marginTop: 16 }}>
                                                Read More →
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", padding: "60px 0", color: MID }}>
                            <div style={{ fontSize: "3rem", marginBottom: 16 }}>📭</div>
                            <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>No posts in this category yet.</div>
                            <div style={{ fontSize: ".9rem", marginTop: 6 }}>Check back soon — new content is on the way!</div>
                        </div>
                    )
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
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleSubscribe()}
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

                    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 8, width: "100%" }}>
                        {/* iLovah Cleaning */}
                        <div style={{ flex: "1 1 340px", maxWidth: 400, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,171,219,0.2)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#2B8FD4,#4AABDB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
                            </div>
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: "#fff", textAlign: "center", lineHeight: 1.2 }}>iLovah <span style={{ color: "#4AABDB" }}>Cleaning Services</span></div>
                            <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".82rem", lineHeight: 1.6, margin: 0, textAlign: "center" }}>Bond cleaning, carpet cleaning, window &amp; gutter cleaning, pressure washing and more.</p>
                            <a href="https://www.facebook.com/people/i-LovahCleaning-Services/61558661136011/" target="_blank" rel="noopener noreferrer" style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#2B8FD4,#4AABDB)", color: "#fff", padding: "11px 24px", borderRadius: 8, fontWeight: 900, fontSize: ".88rem", textDecoration: "none", fontFamily: "'Nunito',sans-serif", boxShadow: "0 4px 16px rgba(43,143,212,0.35)" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
                                Follow iLovah
                            </a>
                        </div>

                        {/* Rest In Pest */}
                        <div style={{ flex: "1 1 340px", maxWidth: 400, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,35,42,0.25)", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#E8232A,#b01018)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
                            </div>
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: "#fff", textAlign: "center", lineHeight: 1.2 }}>Rest In <span style={{ color: "#E8232A" }}>Pest Control</span></div>
                            <p style={{ color: "rgba(255,255,255,.6)", fontSize: ".82rem", lineHeight: 1.6, margin: 0, textAlign: "center" }}>Licensed pest treatments for cockroaches, ants, spiders, rodents &amp; more across Toowoomba.</p>
                            <a href="https://www.facebook.com/profile.php?id=61583659933160" target="_blank" rel="noopener noreferrer" style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#E8232A,#b01018)", color: "#fff", padding: "11px 24px", borderRadius: 8, fontWeight: 900, fontSize: ".88rem", textDecoration: "none", fontFamily: "'Nunito',sans-serif", boxShadow: "0 4px 16px rgba(232,35,42,0.35)" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
                                Follow Rest In Pest
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <PageFooter />
        </div>
    );
}