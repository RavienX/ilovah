import { Phone, Mail, MapPin, Clock, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RED = "#E8232A";
const DARK = "#111827";

const CSS = `
.il-footer{background:${DARK};color:rgba(255,255,255,.7);padding:60px 5% 24px;font-size:.88rem}
.il-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:40px;margin-bottom:48px}
.il-footer-brand p{font-size:.85rem;line-height:1.75;color:rgba(255,255,255,.55);margin-top:16px}
.il-footer-col h4{font-family:'Montserrat',sans-serif;font-weight:900;font-size:.8rem;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.9);margin-bottom:16px}
.il-footer-col ul{list-style:none}
.il-footer-col li{margin-bottom:9px}
.il-footer-col a{color:rgba(255,255,255,.55);text-decoration:none;font-size:.84rem;font-weight:600;transition:color .2s;display:inline-flex;align-items:center;gap:5px}
.il-footer-col a:hover{color:${RED}}
.il-footer-bottom{display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.08);padding-top:20px;font-size:.78rem;color:rgba(255,255,255,.35)}
.il-footer-bottom-right{display:flex;align-items:center;gap:16px}
.hrt{color:${RED}}
.footer-dual-logo{display:flex;align-items:center;gap:12px}
.fdl-il{font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.5rem;letter-spacing:-.03em;line-height:1}
.fdl-il .lr{color:${RED}}
.fdl-il .lw{color:#fff}
.fdl-sep{width:1px;height:24px;background:rgba(255,255,255,.18)}
.fdl-rip{font-family:'Black Ops One',cursive;font-size:1rem;letter-spacing:.04em;line-height:1}
.fdl-rip .r{color:${RED}}
.fdl-rip .w{color:#fff}
@media(max-width:1024px){.il-footer-grid{grid-template-columns:1fr 1fr;gap:28px}}
@media(max-width:600px){
  .il-footer-grid{grid-template-columns:1fr;gap:28px}
  .il-footer-bottom{flex-direction:column;gap:11px;text-align:center}
}
`;

export default function PageFooter() {
    const navigate = useNavigate();

    return (
        <>
            <style>{CSS}</style>
            <footer className="il-footer" aria-label="iLovah Cleaning Services footer">
                <div className="il-footer-grid">
                    <div className="il-footer-brand">
                        <div className="footer-dual-logo">
                            <div className="fdl-il"><span className="lr">i</span><span className="lw">Lovah</span></div>
                            <div className="fdl-sep" aria-hidden="true" />
                            <div className="fdl-rip"><span className="r">REST IN </span><span className="w">PEST</span></div>
                        </div>
                        <p>Family-owned and community-focused. Proudly serving Toowoomba and surrounds with professional bond cleaning, carpet cleaning, window cleaning, gutter cleaning, pressure washing, and licensed pest control services.</p>
                    </div>
                    <div className="il-footer-col">
                        <h4>Pest Control</h4>
                        <ul>
                            {["Cockroach Control", "Ant Treatments", "Spider Control", "Rodent Control", "End of Lease Flea Treatment"].map(s => (
                                <li key={s}><a href="/pest-control" onClick={e => { e.preventDefault(); navigate("/pest-control"); }}>{s}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="il-footer-col">
                        <h4>Cleaning Services</h4>
                        <ul>
                            {["Bond Cleaning", "Dry Carpet Cleaning", "Window Cleaning", "Gutter Cleaning", "Pressure Washing"].map(s => (
                                <li key={s}><a href="/" onClick={e => { e.preventDefault(); navigate("/"); }}>{s}</a></li>
                            ))}
                        </ul>
                        <a href="https://www.ilovahcleaningservices.com.au/admin" style={{ display: "inline-block", marginTop: 12, color: "rgba(255,255,255,.35)", textDecoration: "none", fontSize: ".78rem", fontWeight: 600 }} onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.35)"}>Admin</a>
                    </div>
                    <div className="il-footer-col">
                        <h4>Contact Us</h4>
                        <ul>
                            <li><a href="tel:0478711829"><Phone size={14} strokeWidth={2} aria-hidden="true" /> 0478 711 829</a></li>
                            <li><a href="mailto:ilovahclean@gmail.com"><Mail size={14} strokeWidth={2} aria-hidden="true" /> ilovahclean@gmail.com</a></li>
                            <li><a href="https://maps.google.com/?q=North+Toowoomba+QLD" target="_blank" rel="noopener noreferrer"><MapPin size={14} strokeWidth={2} aria-hidden="true" /> North Toowoomba QLD</a></li>
                            <li><span style={{ display: "flex", alignItems: "center", gap: 7, color: "rgba(255,255,255,.55)", fontSize: ".86rem", fontWeight: 600 }}><Clock size={14} strokeWidth={2} aria-hidden="true" /> Mon–Sat 7am–6pm</span></li>
                            <li><a href="/" onClick={e => { e.preventDefault(); navigate("/"); }}><MessageCircle size={14} strokeWidth={2} aria-hidden="true" /> Get Instant Quote</a></li>
                        </ul>
                    </div>
                </div>
                <div className="il-footer-bottom">
                    <div>© 2025 <span style={{ color: "#ff6b6b" }}>iLovah Cleaning Services</span> &amp; <span style={{ color: "#ff6b6b" }}>Rest In Pest Control</span>. All rights reserved. Serving Toowoomba &amp; QLD Surrounds.</div>
                    <div className="il-footer-bottom-right">
                        <span>Made with <span className="hrt"><Heart size={12} strokeWidth={2} aria-hidden="true" /></span> in Toowoomba, QLD</span>
                    </div>
                </div>
            </footer>
        </>
    );
}