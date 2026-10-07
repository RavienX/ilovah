// ══════════════════════════════════════════════════════════════
// AdminPage.jsx  —  iLovah / Rest In Pest  Admin Dashboard + CRM + Blog
// ══════════════════════════════════════════════════════════════
import { useState, useEffect, useMemo, useRef } from "react";
import {
    collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc,
    query, orderBy, serverTimestamp, getDoc, setDoc, getDocs,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage, COLLECTIONS } from "./firebaseConfig";
import {
    LayoutDashboard, CalendarCheck, MessageSquare, Zap, Users,
    Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp,
    Search, Lock, Shield, CheckCircle, XCircle, AlertCircle,
    TrendingUp, FileText, Star, ChevronRight, X, Plus,
    LogOut, ArrowUpRight, Filter, BookOpen, Trash2, Edit3,
    ImagePlus, Upload, Eye, EyeOff, KeyRound, Save, Settings,
    Briefcase, UserCheck, GripVertical, Clock as ClockIcon, MessageCircle,
} from "lucide-react";

const ADMIN_PIN_FALLBACK = "ilovahadmin123"; // used only if Firestore doc doesn't exist yet

// ── Tokens ────────────────────────────────────────────────────
const RED = "#E8232A";
const RED_DK = "#b01018";
const DARK = "#0f172a";
const DARK2 = "#1e293b";
const DARK3 = "#293548";
const WHITE = "#ffffff";
const MUTED = "#94a3b8";
const BORDER = "rgba(255,255,255,0.08)";
const GREEN = "#22c55e";
const AMBER = "#f59e0b";
const BLUE = "#3b82f6";

const STATUS_BOOKING = ["new", "confirmed", "completed", "cancelled"];
const STATUS_QUOTE = ["new", "quoted", "booked", "closed"];
const STATUS_LEAD = ["new", "contacted", "converted", "lost"];

const STATUS_CFG = {
    new: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa", label: "NEW" },
    confirmed: { bg: "rgba(34,197,94,0.15)", color: "#4ade80", label: "CONFIRMED" },
    completed: { bg: "rgba(34,197,94,0.25)", color: "#22c55e", label: "COMPLETED" },
    cancelled: { bg: "rgba(239,68,68,0.15)", color: "#f87171", label: "CANCELLED" },
    quoted: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24", label: "QUOTED" },
    booked: { bg: "rgba(34,197,94,0.15)", color: "#4ade80", label: "BOOKED" },
    closed: { bg: "rgba(100,116,139,0.2)", color: "#94a3b8", label: "CLOSED" },
    contacted: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24", label: "CONTACTED" },
    converted: { bg: "rgba(34,197,94,0.25)", color: "#22c55e", label: "CONVERTED" },
    lost: { bg: "rgba(239,68,68,0.15)", color: "#f87171", label: "LOST" },
};

const fmtDate = (ts) => {
    if (!ts) return "—";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" });
};

const fmtDateShort = (ts) => {
    if (!ts) return "—";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
};

async function setStatus(colName, id, newStatus) {
    try {
        await updateDoc(doc(db, colName, id), { status: newStatus, updatedAt: new Date() });
    } catch (e) { console.error("Status update failed:", e); }
}

// ── Badge ──────────────────────────────────────────────────────
function Badge({ status }) {
    const c = STATUS_CFG[status] || STATUS_CFG.new;
    return (
        <span style={{
            background: c.bg, color: c.color,
            padding: "3px 10px", borderRadius: 50,
            fontSize: ".6rem", fontWeight: 900,
            letterSpacing: ".08em", textTransform: "uppercase",
            whiteSpace: "nowrap",
        }}>{c.label}</span>
    );
}

// ── Source pill ────────────────────────────────────────────────
function SourcePill({ source }) {
    const cfg = {
        booking: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa", Icon: CalendarCheck },
        quote: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24", Icon: MessageSquare },
        manual: { bg: "rgba(100,116,139,0.2)", color: "#94a3b8", Icon: FileText },
    }[source] || { bg: "rgba(100,116,139,0.2)", color: "#94a3b8", Icon: AlertCircle };
    const { Icon } = cfg;
    return (
        <span style={{
            background: cfg.bg, color: cfg.color,
            padding: "3px 10px", borderRadius: 50,
            fontSize: ".6rem", fontWeight: 900,
            letterSpacing: ".06em", textTransform: "uppercase",
            whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 4,
        }}>
            <Icon size={10} strokeWidth={2.5} />
            {source}
        </span>
    );
}

// ══════════════════════════════════════════════════════════════
// PIN LOCK
// ══════════════════════════════════════════════════════════════
function PinLock({ onUnlock }) {
    const [pin, setPin] = useState("");
    const [err, setErr] = useState(false);
    const [adminPin, setAdminPin] = useState(null); // null = still loading

    // Load PIN from Firestore on mount
    useEffect(() => {
        const load = async () => {
            try {
                const snap = await getDoc(doc(db, "adminConfig", "credentials"));
                if (snap.exists() && snap.data().pin) {
                    setAdminPin(snap.data().pin);
                } else {
                    setAdminPin(ADMIN_PIN_FALLBACK);
                }
            } catch {
                setAdminPin(ADMIN_PIN_FALLBACK);
            }
        };
        load();
    }, []);

    const tryPin = () => {
        if (adminPin === null) return; // still loading
        if (pin === adminPin) { onUnlock(); }
        else { setErr(true); setPin(""); setTimeout(() => setErr(false), 1500); }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: `radial-gradient(ellipse at 60% 40%, #1a0a0b 0%, #0f172a 50%, #060d1a 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Nunito',sans-serif", position: "relative", overflow: "hidden",
        }}>
            <div style={{
                position: "absolute", top: "15%", left: "10%",
                width: 500, height: 500, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(232,35,42,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", bottom: "10%", right: "5%",
                width: 400, height: 400, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                backgroundSize: "48px 48px", pointerEvents: "none",
            }} />

            <div style={{
                position: "relative", zIndex: 1,
                background: "rgba(15,23,42,0.85)",
                backdropFilter: "blur(20px)",
                border: `1px solid rgba(255,255,255,0.1)`,
                borderRadius: 24, padding: "52px 44px 44px",
                maxWidth: 400, width: "90%", textAlign: "center",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}>
                <div style={{
                    position: "absolute", top: 0, left: "10%", right: "10%", height: 2,
                    background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
                    borderRadius: 2,
                }} />

                <div style={{ marginBottom: 28 }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 60, height: 60, borderRadius: 16, marginBottom: 16,
                        background: `linear-gradient(135deg, ${RED}, ${RED_DK})`,
                        boxShadow: `0 8px 32px rgba(232,35,42,0.4)`,
                    }}>
                        <Shield size={28} color="#fff" strokeWidth={2} />
                    </div>
                    <div style={{
                        fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                        fontSize: "1.7rem", color: WHITE, lineHeight: 1, marginBottom: 6,
                        letterSpacing: "-.02em",
                    }}>
                        <span style={{ color: RED }}>iLovah</span> Admin
                    </div>
                    <div style={{
                        display: "inline-block",
                        background: "rgba(232,35,42,0.1)",
                        border: "1px solid rgba(232,35,42,0.25)",
                        color: "rgba(255,255,255,0.45)",
                        borderRadius: 50, padding: "3px 12px",
                        fontSize: ".68rem", fontWeight: 700,
                        letterSpacing: ".1em", textTransform: "uppercase",
                    }}>
                        Restricted Access
                    </div>
                </div>

                <div style={{ height: 1, background: BORDER, marginBottom: 28 }} />

                <p style={{ color: MUTED, fontSize: ".83rem", marginBottom: 20, lineHeight: 1.6 }}>
                    Enter your admin PIN to access the dashboard
                </p>

                <div style={{ position: "relative", marginBottom: err ? 8 : 16 }}>
                    <input
                        type="password" value={pin}
                        onChange={e => setPin(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && tryPin()}
                        placeholder="• • • • • • • •"
                        style={{
                            width: "100%", boxSizing: "border-box",
                            background: "rgba(255,255,255,0.04)",
                            border: `1.5px solid ${err ? RED : "rgba(255,255,255,0.12)"}`,
                            borderRadius: 12, padding: "14px 48px 14px 18px",
                            color: WHITE, fontSize: "1.1rem",
                            fontFamily: "'Nunito',sans-serif",
                            outline: "none", textAlign: "center", letterSpacing: "0.35em",
                            transition: "border-color .2s, box-shadow .2s",
                            boxShadow: err ? "0 0 0 3px rgba(232,35,42,0.2)" : "0 0 0 3px transparent",
                        }}
                        autoFocus
                    />
                    <span style={{
                        position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                        opacity: 0.3, pointerEvents: "none",
                    }}>
                        <Lock size={18} color={WHITE} />
                    </span>
                </div>

                {err && (
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        color: "#f87171", fontSize: ".78rem", fontWeight: 700, marginBottom: 14,
                    }}>
                        <XCircle size={14} /> Incorrect PIN — please try again
                    </div>
                )}

                <button onClick={tryPin} disabled={adminPin === null} style={{
                    width: "100%",
                    background: adminPin === null
                        ? "rgba(232,35,42,0.4)"
                        : `linear-gradient(135deg, ${RED} 0%, ${RED_DK} 100%)`,
                    color: WHITE, border: "none", borderRadius: 12,
                    padding: "14px", fontFamily: "'Nunito',sans-serif",
                    fontWeight: 900, fontSize: "1rem", cursor: adminPin === null ? "default" : "pointer",
                    boxShadow: `0 6px 24px rgba(232,35,42,0.45)`,
                    letterSpacing: ".03em", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8, transition: "transform .15s, box-shadow .15s",
                }}
                    onMouseEnter={e => { if (adminPin !== null) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 10px 32px rgba(232,35,42,0.55)`; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 24px rgba(232,35,42,0.45)`; }}
                >
                    {adminPin === null ? "Loading…" : <><span>Unlock Dashboard</span> <ArrowUpRight size={16} /></>}
                </button>

                <p style={{ color: "rgba(255,255,255,0.15)", fontSize: ".68rem", marginTop: 20 }}>
                    iLovah / Rest In Pest · Admin Portal
                </p>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
// STAT CARD
// ══════════════════════════════════════════════════════════════
function StatCard({ IconComp, label, value, sub, accent }) {
    return (
        <div style={{
            background: DARK2, border: `1px solid ${BORDER}`,
            borderRadius: 16, padding: "20px 22px",
            borderTop: `3px solid ${accent}`, flex: "1 1 150px",
        }}>
            <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `${accent}22`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 12,
            }}>
                <IconComp size={18} color={accent} strokeWidth={2} />
            </div>
            <div style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: "2rem", color: WHITE, lineHeight: 1,
            }}>{value}</div>
            <div style={{ color: accent, fontWeight: 800, fontSize: ".7rem", marginTop: 4, textTransform: "uppercase", letterSpacing: ".08em" }}>{label}</div>
            {sub && <div style={{ color: MUTED, fontSize: ".7rem", marginTop: 2 }}>{sub}</div>}
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
// RECORD ROW (expandable)
// ══════════════════════════════════════════════════════════════
function RecordRow({ row, summaryFields, statusOptions, colName }) {
    const [open, setOpen] = useState(false);
    const SKIP = new Set(["id", "status", ...summaryFields.map(f => f.key)]);

    return (
        <div style={{
            background: open ? DARK3 : DARK2,
            border: `1px solid ${open ? "rgba(232,35,42,0.3)" : BORDER}`,
            borderRadius: 12, overflow: "hidden", transition: "all .2s",
        }}>
            <div
                onClick={() => setOpen(o => !o)}
                className="il-record-row-header"
                style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 16px", cursor: "pointer", flexWrap: "wrap",
                    overflowX: "auto",
                }}
            >
                <Badge status={row.status} />
                {summaryFields.map(f => (
                    <div key={f.key} style={{ flex: f.flex || "0 0 auto", minWidth: f.min, minWidth: 0 }}>
                        <div style={{ color: MUTED, fontSize: ".58rem", textTransform: "uppercase", letterSpacing: ".07em", fontWeight: 700 }}>{f.label}</div>
                        <div style={{ color: WHITE, fontWeight: 700, fontSize: ".82rem", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {f.render ? f.render(row[f.key], row) : (row[f.key] || "—")}
                        </div>
                    </div>
                ))}
                <div style={{ marginLeft: "auto", color: MUTED }}>
                    {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
            </div>

            {open && (
                <div style={{ borderTop: `1px solid ${BORDER}`, padding: "16px 16px 18px" }}>
                    <div style={{
                        display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(175px,1fr))",
                        gap: "10px 20px", marginBottom: 16,
                    }}>
                        {Object.entries(row)
                            .filter(([k]) => !SKIP.has(k))
                            .map(([k, v]) => (
                                <div key={k}>
                                    <div style={{ color: MUTED, fontSize: ".6rem", textTransform: "uppercase", letterSpacing: ".07em", fontWeight: 700, marginBottom: 2 }}>
                                        {k.replace(/([A-Z])/g, " $1").toLowerCase()}
                                    </div>
                                    <div style={{ color: WHITE, fontSize: ".82rem", fontWeight: 600, wordBreak: "break-word" }}>
                                        {k === "createdAt" || k === "updatedAt" ? fmtDate(v) : String(v || "—")}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ color: MUTED, fontSize: ".7rem", fontWeight: 700 }}>Update status:</span>
                        {statusOptions.map(s => (
                            <button key={s} onClick={() => setStatus(colName, row.id, s)} style={{
                                background: row.status === s ? STATUS_CFG[s]?.bg : "transparent",
                                border: `1.5px solid ${STATUS_CFG[s]?.color || MUTED}`,
                                color: STATUS_CFG[s]?.color || WHITE,
                                padding: "4px 12px", borderRadius: 50,
                                fontSize: ".66rem", fontWeight: 900, cursor: "pointer",
                                textTransform: "uppercase", letterSpacing: ".06em",
                                opacity: row.status === s ? 1 : 0.5,
                                transition: "opacity .2s",
                            }}>{s}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
// DATA TABLE
// ══════════════════════════════════════════════════════════════
function DataTable({ rows, summaryFields, statusOptions, colName, emptyMsg }) {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const filtered = useMemo(() => {
        if (!rows) return [];
        let r = rows;
        if (filterStatus !== "all") r = r.filter(x => x.status === filterStatus);
        if (search.trim()) {
            const q = search.toLowerCase();
            r = r.filter(x => Object.values(x).some(v => String(v || "").toLowerCase().includes(q)));
        }
        return r;
    }, [rows, search, filterStatus]);

    const allStatuses = useMemo(() => ["all", ...new Set((rows || []).map(r => r.status))], [rows]);

    if (!rows) return <div style={{ color: MUTED, padding: "40px", textAlign: "center" }}>Loading…</div>;

    return (
        <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 340 }}>
                    <Search size={14} color={MUTED} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search name, phone, service…"
                        style={{
                            width: "100%", boxSizing: "border-box",
                            background: DARK3, border: `1px solid ${BORDER}`,
                            borderRadius: 8, padding: "9px 14px 9px 34px",
                            color: WHITE, fontFamily: "'Nunito',sans-serif",
                            fontSize: ".84rem", outline: "none",
                        }}
                    />
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {allStatuses.map(s => (
                        <button key={s} onClick={() => setFilterStatus(s)} style={{
                            background: filterStatus === s ? (STATUS_CFG[s]?.bg || "rgba(255,255,255,.1)") : "transparent",
                            border: `1px solid ${STATUS_CFG[s]?.color || BORDER}`,
                            color: filterStatus === s ? (STATUS_CFG[s]?.color || WHITE) : MUTED,
                            padding: "5px 11px", borderRadius: 50,
                            fontSize: ".65rem", fontWeight: 900, cursor: "pointer",
                            textTransform: "uppercase", letterSpacing: ".06em",
                            transition: "all .15s",
                        }}>{s === "all" ? `All (${rows.length})` : s}</button>
                    ))}
                </div>
            </div>

            {filtered.length === 0 ? (
                <div style={{
                    color: MUTED, textAlign: "center", padding: "48px 0",
                    border: `1px dashed ${BORDER}`, borderRadius: 12, fontSize: ".88rem",
                }}>
                    {search || filterStatus !== "all" ? "No matching records." : emptyMsg}
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {filtered.map(row => (
                        <RecordRow
                            key={row.id} row={row}
                            summaryFields={summaryFields}
                            statusOptions={statusOptions}
                            colName={colName}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
// CRM — CONTACT CARD (slide-in panel)
// ══════════════════════════════════════════════════════════════
function ContactPanel({ contact, onClose, allBookings, allQuotes }) {
    const [noteText, setNoteText] = useState("");
    const [notes, setNotes] = useState(contact.notes || []);
    const [saving, setSaving] = useState(false);

    const linkedBookings = useMemo(() =>
        (allBookings || []).filter(b => b.phone === contact.phone),
        [allBookings, contact.phone]);
    const linkedQuotes = useMemo(() =>
        (allQuotes || []).filter(q => q.phone === contact.phone),
        [allQuotes, contact.phone]);

    const totalValue = linkedBookings.filter(b => b.status === "completed").length;
    const lastActivity = useMemo(() => {
        const all = [...linkedBookings, ...linkedQuotes];
        if (!all.length) return null;
        return all.sort((a, b) => {
            const ta = a.createdAt?.toDate?.() || 0;
            const tb = b.createdAt?.toDate?.() || 0;
            return tb - ta;
        })[0].createdAt;
    }, [linkedBookings, linkedQuotes]);

    const saveNote = async () => {
        if (!noteText.trim()) return;
        setSaving(true);
        try {
            const newNote = { text: noteText.trim(), createdAt: new Date().toISOString() };
            const updatedNotes = [...notes, newNote];
            await updateDoc(doc(db, COLLECTIONS.LEADS, contact.id), { notes: updatedNotes });
            setNotes(updatedNotes);
            setNoteText("");
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    const initials = contact.name
        ? contact.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
        : "?";

    const avatarColors = ["#E8232A", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#06b6d4"];
    const avatarColor = avatarColors[(contact.phone || "").charCodeAt(0) % avatarColors.length];

    return (
        <>
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, backdropFilter: "blur(2px)" }} />
            <div style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(480px, 100vw)",
                background: DARK2, borderLeft: `1px solid ${BORDER}`,
                zIndex: 201, overflowY: "auto",
                boxShadow: "-16px 0 48px rgba(0,0,0,0.5)",
                display: "flex", flexDirection: "column",
            }}>
                <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: DARK2, zIndex: 1 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <div style={{ width: 52, height: 52, borderRadius: "50%", background: avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "#fff", flexShrink: 0 }}>{initials}</div>
                            <div>
                                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: WHITE }}>{contact.name || "Unknown"}</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                                    <Badge status={contact.status} />
                                    <SourcePill source={contact.source} />
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${BORDER}`, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: MUTED, flexShrink: 0 }}>
                            <X size={16} />
                        </button>
                    </div>
                </div>

                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: DARK3, borderRadius: 12, padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: MUTED, marginBottom: 4 }}>Contact Details</div>
                        {contact.phone && (<a href={`tel:${contact.phone}`} style={{ display: "flex", alignItems: "center", gap: 10, color: WHITE, textDecoration: "none", fontSize: ".88rem", fontWeight: 700 }}><Phone size={14} color={BLUE} strokeWidth={2} /> {contact.phone}</a>)}
                        {contact.email && contact.email !== "—" && (<a href={`mailto:${contact.email}`} style={{ display: "flex", alignItems: "center", gap: 10, color: WHITE, textDecoration: "none", fontSize: ".88rem", fontWeight: 700 }}><Mail size={14} color={AMBER} strokeWidth={2} /> {contact.email}</a>)}
                        {contact.service && (<div style={{ display: "flex", alignItems: "center", gap: 10, color: MUTED, fontSize: ".84rem" }}><Star size={14} color={GREEN} strokeWidth={2} /> {contact.service}</div>)}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, color: MUTED, fontSize: ".84rem" }}><Clock size={14} strokeWidth={2} /> Added {fmtDateShort(contact.createdAt)}</div>
                        {lastActivity && (<div style={{ display: "flex", alignItems: "center", gap: 10, color: MUTED, fontSize: ".84rem" }}><TrendingUp size={14} strokeWidth={2} /> Last activity {fmtDateShort(lastActivity)}</div>)}
                    </div>

                    <div className="il-contact-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        {[
                            { label: "Bookings", value: linkedBookings.length, color: BLUE, Icon: CalendarCheck },
                            { label: "Quotes", value: linkedQuotes.length, color: AMBER, Icon: MessageSquare },
                            { label: "Completed", value: totalValue, color: GREEN, Icon: CheckCircle },
                        ].map(({ label, value, color, Icon }) => (
                            <div key={label} style={{ background: DARK3, borderRadius: 10, padding: "12px 10px", textAlign: "center", border: `1px solid ${BORDER}` }}>
                                <Icon size={16} color={color} strokeWidth={2} style={{ marginBottom: 4 }} />
                                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.4rem", color: WHITE }}>{value}</div>
                                <div style={{ fontSize: ".62rem", color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div style={{ fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: MUTED, marginBottom: 10 }}>Lead Status</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {STATUS_LEAD.map(s => (
                                <button key={s} onClick={() => setStatus(COLLECTIONS.LEADS, contact.id, s)} style={{ background: contact.status === s ? STATUS_CFG[s]?.bg : "transparent", border: `1.5px solid ${STATUS_CFG[s]?.color || MUTED}`, color: STATUS_CFG[s]?.color || WHITE, padding: "5px 13px", borderRadius: 50, fontSize: ".66rem", fontWeight: 900, cursor: "pointer", textTransform: "uppercase", letterSpacing: ".06em", opacity: contact.status === s ? 1 : 0.5, transition: "opacity .2s" }}>{s}</button>
                            ))}
                        </div>
                    </div>

                    {linkedBookings.length > 0 && (
                        <div>
                            <div style={{ fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: MUTED, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                                <CalendarCheck size={12} color={BLUE} /> Bookings ({linkedBookings.length})
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                                {linkedBookings.map(b => (
                                    <div key={b.id} style={{ background: DARK3, borderRadius: 10, padding: "12px 14px", border: `1px solid ${BORDER}` }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                                            <div>
                                                <div style={{ color: WHITE, fontWeight: 700, fontSize: ".85rem" }}>{b.service || "—"}</div>
                                                <div style={{ color: MUTED, fontSize: ".75rem", marginTop: 3 }}>{b.date} {b.time ? `· ${b.time}` : ""}</div>
                                                <div style={{ color: MUTED, fontSize: ".72rem" }}>{fmtDateShort(b.createdAt)}</div>
                                            </div>
                                            <Badge status={b.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {linkedQuotes.length > 0 && (
                        <div>
                            <div style={{ fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: MUTED, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                                <MessageSquare size={12} color={AMBER} /> Quote Requests ({linkedQuotes.length})
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                                {linkedQuotes.map(q => (
                                    <div key={q.id} style={{ background: DARK3, borderRadius: 10, padding: "12px 14px", border: `1px solid ${BORDER}` }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                                            <div>
                                                <div style={{ color: WHITE, fontWeight: 700, fontSize: ".85rem" }}>{q.service || "—"}</div>
                                                {q.message && <div style={{ color: MUTED, fontSize: ".75rem", marginTop: 3, lineHeight: 1.5 }}>{q.message}</div>}
                                                <div style={{ color: MUTED, fontSize: ".72rem", marginTop: 2 }}>{fmtDateShort(q.createdAt)}</div>
                                            </div>
                                            <Badge status={q.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <div style={{ fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: MUTED, marginBottom: 10 }}>Notes</div>
                        {notes.length > 0 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                                {notes.map((n, i) => (
                                    <div key={i} style={{ background: DARK3, borderRadius: 8, padding: "10px 12px", border: `1px solid ${BORDER}` }}>
                                        <div style={{ color: WHITE, fontSize: ".84rem", lineHeight: 1.5 }}>{n.text}</div>
                                        <div style={{ color: MUTED, fontSize: ".68rem", marginTop: 4 }}>
                                            {n.createdAt ? new Date(n.createdAt).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" }) : ""}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div style={{ display: "flex", gap: 8 }}>
                            <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note about this contact…" rows={2} style={{ flex: 1, background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".84rem", outline: "none", resize: "vertical" }} />
                            <button onClick={saveNote} disabled={saving || !noteText.trim()} style={{ background: noteText.trim() ? RED : "rgba(255,255,255,0.05)", border: "none", borderRadius: 8, color: noteText.trim() ? WHITE : MUTED, padding: "9px 14px", cursor: noteText.trim() ? "pointer" : "default", fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".82rem", transition: "all .2s", display: "flex", alignItems: "center", gap: 6, alignSelf: "flex-start" }}>
                                <Plus size={14} /> Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// ══════════════════════════════════════════════════════════════
// CRM CONTACTS LIST
// ══════════════════════════════════════════════════════════════
function CRMView({ leads, bookings, quotes }) {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selected, setSelected] = useState(null);

    const filtered = useMemo(() => {
        if (!leads) return [];
        let r = leads;
        if (filterStatus !== "all") r = r.filter(x => x.status === filterStatus);
        if (search.trim()) {
            const q = search.toLowerCase();
            r = r.filter(x => Object.values(x).some(v => String(v || "").toLowerCase().includes(q)));
        }
        return r;
    }, [leads, search, filterStatus]);

    const avatarColors = ["#E8232A", "#3b82f6", "#22c55e", "#f59e0b", "#8b5cf6", "#06b6d4"];

    if (!leads) return <div style={{ color: MUTED, padding: "40px", textAlign: "center" }}>Loading…</div>;

    const allStatuses = ["all", ...new Set(leads.map(l => l.status))];

    return (
        <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 340 }}>
                    <Search size={14} color={MUTED} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts…" style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 14px 9px 34px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".84rem", outline: "none" }} />
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    <Filter size={12} color={MUTED} />
                    {allStatuses.map(s => (
                        <button key={s} onClick={() => setFilterStatus(s)} style={{ background: filterStatus === s ? (STATUS_CFG[s]?.bg || "rgba(255,255,255,.1)") : "transparent", border: `1px solid ${STATUS_CFG[s]?.color || BORDER}`, color: filterStatus === s ? (STATUS_CFG[s]?.color || WHITE) : MUTED, padding: "5px 11px", borderRadius: 50, fontSize: ".65rem", fontWeight: 900, cursor: "pointer", textTransform: "uppercase", letterSpacing: ".06em", transition: "all .15s" }}>{s === "all" ? `All (${leads.length})` : s}</button>
                    ))}
                </div>
            </div>

            {filtered.length === 0 ? (
                <div style={{ color: MUTED, textAlign: "center", padding: "48px 0", border: `1px dashed ${BORDER}`, borderRadius: 12, fontSize: ".88rem" }}>
                    {search || filterStatus !== "all" ? "No matching contacts." : "No contacts yet."}
                </div>
            ) : (
                <div className="il-crm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                    {filtered.map(contact => {
                        const initials = contact.name ? contact.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?";
                        const avatarColor = avatarColors[(contact.phone || "").charCodeAt(0) % avatarColors.length];
                        const linkedB = (bookings || []).filter(b => b.phone === contact.phone).length;
                        const linkedQ = (quotes || []).filter(q => q.phone === contact.phone).length;

                        return (
                            <div key={contact.id} onClick={() => setSelected(contact)} style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px", cursor: "pointer", transition: "all .2s", display: "flex", flexDirection: "column", gap: 12 }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,35,42,0.4)"; e.currentTarget.style.background = DARK3; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = DARK2; }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: avatarColor, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: ".9rem", color: "#fff" }}>{initials}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 800, fontSize: ".9rem", color: WHITE, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{contact.name || "Unknown"}</div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}><Badge status={contact.status} /></div>
                                    </div>
                                    <ChevronRight size={16} color={MUTED} style={{ flexShrink: 0 }} />
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                    {contact.phone && (<div style={{ display: "flex", alignItems: "center", gap: 7, color: MUTED, fontSize: ".8rem" }}><Phone size={12} strokeWidth={2} /> {contact.phone}</div>)}
                                    {contact.email && contact.email !== "—" && (<div style={{ display: "flex", alignItems: "center", gap: 7, color: MUTED, fontSize: ".8rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}><Mail size={12} strokeWidth={2} /> {contact.email}</div>)}
                                    {contact.service && (<div style={{ display: "flex", alignItems: "center", gap: 7, color: MUTED, fontSize: ".8rem" }}><Star size={12} strokeWidth={2} /> {contact.service}</div>)}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 8, borderTop: `1px solid ${BORDER}` }}>
                                    <SourcePill source={contact.source} />
                                    <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                                        {linkedB > 0 && (<span style={{ display: "flex", alignItems: "center", gap: 4, color: BLUE, fontSize: ".72rem", fontWeight: 700 }}><CalendarCheck size={11} /> {linkedB}</span>)}
                                        {linkedQ > 0 && (<span style={{ display: "flex", alignItems: "center", gap: 4, color: AMBER, fontSize: ".72rem", fontWeight: 700 }}><MessageSquare size={11} /> {linkedQ}</span>)}
                                        <span style={{ color: MUTED, fontSize: ".7rem" }}>{fmtDateShort(contact.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {selected && (<ContactPanel contact={selected} onClose={() => setSelected(null)} allBookings={bookings} allQuotes={quotes} />)}
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
// BLOG MANAGEMENT
// ══════════════════════════════════════════════════════════════
const BLOG_CATEGORIES = [
    { key: "cleaning", label: "Cleaning Tips" },
    { key: "pest", label: "Pest Control" },
    { key: "tips", label: "Home Tips" },
    { key: "news", label: "News" },
];

const EMPTY_POST = {
    title: "",
    excerpt: "",
    content: "",
    cat: "cleaning",
    author: "iLovah Team",
    featured: false,
    published: true,
    imageUrl: "",
    imagePath: "",
};

function BlogView() {
    const [posts, setPosts] = useState(null);
    const [editing, setEditing] = useState(null); // null = list, "new" = new form, post obj = edit form
    const [form, setForm] = useState(EMPTY_POST);
    const [imgFile, setImgFile] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const fileRef = useRef();

    // Load posts from Firestore
    useEffect(() => {
        const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, snap => {
            setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
        return unsub;
    }, []);

    const openNew = () => {
        setForm(EMPTY_POST);
        setImgFile(null);
        setImgPreview(null);
        setEditing("new");
    };

    const openEdit = (post) => {
        setForm({
            title: post.title || "",
            excerpt: post.excerpt || "",
            content: post.content || "",
            cat: post.cat || "cleaning",
            author: post.author || "iLovah Team",
            featured: post.featured || false,
            published: post.published !== false,
            imageUrl: post.imageUrl || "",
            imagePath: post.imagePath || "",
        });
        setImgFile(null);
        setImgPreview(post.imageUrl || null);
        setEditing(post);
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImgFile(file);
        setImgPreview(URL.createObjectURL(file));
    };

    const uploadImage = async () => {
        if (!imgFile) return { url: form.imageUrl, path: form.imagePath };
        setUploading(true);
        const path = `blog/${Date.now()}_${imgFile.name}`;
        const storageRef = ref(storage, path);
        await new Promise((resolve, reject) => {
            const task = uploadBytesResumable(storageRef, imgFile);
            task.on("state_changed",
                snap => setUploadProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
                reject,
                () => resolve()
            );
        });
        const url = await getDownloadURL(storageRef);
        setUploading(false);
        setUploadProgress(0);
        return { url, path };
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.excerpt.trim()) return alert("Title and excerpt are required.");
        setSaving(true);
        try {
            const { url: imageUrl, path: imagePath } = await uploadImage();
            const dateStr = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });

            if (editing === "new") {
                // Delete old image if replacing (n/a for new)
                await addDoc(collection(db, "blogPosts"), {
                    ...form,
                    imageUrl,
                    imagePath,
                    date: dateStr,
                    readTime: `${Math.max(1, Math.ceil((form.content || "").split(" ").length / 200))} min read`,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
            } else {
                // If new image uploaded and old one existed in storage, delete old
                if (imgFile && editing.imagePath) {
                    try { await deleteObject(ref(storage, editing.imagePath)); } catch (_) { }
                }
                await updateDoc(doc(db, "blogPosts", editing.id), {
                    ...form,
                    imageUrl,
                    imagePath,
                    readTime: `${Math.max(1, Math.ceil((form.content || "").split(" ").length / 200))} min read`,
                    updatedAt: serverTimestamp(),
                });
            }
            setEditing(null);
        } catch (e) { console.error(e); alert("Error saving post."); }
        setSaving(false);
    };

    const handleDelete = async (post) => {
        try {
            if (post.imagePath) {
                try { await deleteObject(ref(storage, post.imagePath)); } catch (_) { }
            }
            await deleteDoc(doc(db, "blogPosts", post.id));
        } catch (e) { console.error(e); }
        setDeleteConfirm(null);
    };

    const togglePublished = async (post) => {
        await updateDoc(doc(db, "blogPosts", post.id), { published: !post.published });
    };

    // ── Form view ──────────────────────────────────────────────
    if (editing !== null) {
        const isNew = editing === "new";
        return (
            <div>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                    <button onClick={() => setEditing(null)} style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, color: MUTED, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontSize: ".82rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                        <ChevronDown size={14} style={{ transform: "rotate(90deg)" }} /> Back
                    </button>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.1rem", color: WHITE }}>
                        {isNew ? "New Blog Post" : "Edit Post"}
                    </div>
                </div>

                <div className="il-blog-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>
                    {/* Left — main fields */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {/* Title */}
                        <div>
                            <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>Title *</label>
                            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Enter blog post title…" style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 14px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: "1rem", fontWeight: 700, outline: "none" }} />
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>Excerpt * <span style={{ color: "rgba(255,255,255,.3)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(shown on blog card)</span></label>
                            <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short description shown on the blog listing page…" rows={3} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 14px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".9rem", outline: "none", resize: "vertical" }} />
                        </div>

                        {/* Content */}
                        <div>
                            <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>Full Content <span style={{ color: "rgba(255,255,255,.3)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(supports line breaks)</span></label>
                            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Write the full article here…" rows={12} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 14px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none", resize: "vertical", lineHeight: 1.7 }} />
                        </div>
                    </div>

                    {/* Right — meta + image */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {/* Image upload */}
                        <div style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "18px", display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em" }}>Cover Image</div>
                            {imgPreview ? (
                                <div style={{ position: "relative" }}>
                                    <img src={imgPreview} alt="preview" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10, display: "block" }} />
                                    <button onClick={() => { setImgFile(null); setImgPreview(null); setForm(f => ({ ...f, imageUrl: "", imagePath: "" })); }} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.7)", border: "none", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: WHITE }}>
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div onClick={() => fileRef.current?.click()} style={{ height: 140, border: `2px dashed ${BORDER}`, borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", color: MUTED, transition: "border-color .2s" }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(232,35,42,0.4)"}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
                                >
                                    <ImagePlus size={28} />
                                    <span style={{ fontSize: ".78rem", fontWeight: 700 }}>Click to upload image</span>
                                    <span style={{ fontSize: ".68rem", opacity: 0.6 }}>JPG, PNG, WebP</span>
                                </div>
                            )}
                            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImgChange} />
                            {!imgPreview && (
                                <button onClick={() => fileRef.current?.click()} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: MUTED, borderRadius: 8, padding: "8px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontSize: ".8rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                    <Upload size={14} /> Choose Image
                                </button>
                            )}
                            {uploading && (
                                <div>
                                    <div style={{ height: 4, background: DARK3, borderRadius: 2, overflow: "hidden" }}>
                                        <div style={{ height: "100%", width: `${uploadProgress}%`, background: RED, transition: "width .3s" }} />
                                    </div>
                                    <div style={{ color: MUTED, fontSize: ".7rem", marginTop: 4 }}>Uploading… {uploadProgress}%</div>
                                </div>
                            )}
                        </div>

                        {/* Category + Author */}
                        <div style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "18px", display: "flex", flexDirection: "column", gap: 14 }}>
                            <div style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em" }}>Post Settings</div>
                            <div>
                                <label style={{ color: MUTED, fontSize: ".72rem", fontWeight: 700, display: "block", marginBottom: 5 }}>Category</label>
                                <select value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))} style={{ width: "100%", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }}>
                                    {BLOG_CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ color: MUTED, fontSize: ".72rem", fontWeight: 700, display: "block", marginBottom: 5 }}>Author</label>
                                <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Author name" style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                                    <div onClick={() => setForm(f => ({ ...f, featured: !f.featured }))} style={{ width: 36, height: 20, borderRadius: 10, background: form.featured ? RED : DARK3, border: `1px solid ${form.featured ? RED : BORDER}`, position: "relative", transition: "background .2s", flexShrink: 0 }}>
                                        <div style={{ position: "absolute", top: 2, left: form.featured ? 18 : 2, width: 14, height: 14, borderRadius: "50%", background: WHITE, transition: "left .2s" }} />
                                    </div>
                                    <span style={{ color: WHITE, fontSize: ".85rem", fontWeight: 700 }}>Featured Post</span>
                                </label>
                                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                                    <div onClick={() => setForm(f => ({ ...f, published: !f.published }))} style={{ width: 36, height: 20, borderRadius: 10, background: form.published ? GREEN : DARK3, border: `1px solid ${form.published ? GREEN : BORDER}`, position: "relative", transition: "background .2s", flexShrink: 0 }}>
                                        <div style={{ position: "absolute", top: 2, left: form.published ? 18 : 2, width: 14, height: 14, borderRadius: "50%", background: WHITE, transition: "left .2s" }} />
                                    </div>
                                    <span style={{ color: WHITE, fontSize: ".85rem", fontWeight: 700 }}>Published</span>
                                </label>
                            </div>
                        </div>

                        {/* Save button */}
                        <button onClick={handleSave} disabled={saving || uploading} style={{ background: saving || uploading ? "rgba(232,35,42,0.5)" : `linear-gradient(135deg, ${RED}, ${RED_DK})`, border: "none", borderRadius: 10, padding: "14px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: "1rem", cursor: saving || uploading ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                            {saving ? "Saving…" : uploading ? "Uploading image…" : isNew ? "Publish Post" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── List view ──────────────────────────────────────────────
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.1rem", color: WHITE }}>Blog Posts</div>
                    <div style={{ color: MUTED, fontSize: ".8rem", marginTop: 2 }}>{posts?.length ?? "…"} total posts</div>
                </div>
                <button onClick={openNew} style={{ background: `linear-gradient(135deg, ${RED}, ${RED_DK})`, border: "none", borderRadius: 10, padding: "10px 18px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".88rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 4px 16px rgba(232,35,42,0.35)` }}>
                    <Plus size={16} /> New Post
                </button>
            </div>

            {!posts ? (
                <div style={{ color: MUTED, padding: "40px", textAlign: "center" }}>Loading…</div>
            ) : posts.length === 0 ? (
                <div style={{ color: MUTED, textAlign: "center", padding: "64px 0", border: `1px dashed ${BORDER}`, borderRadius: 16 }}>
                    <BookOpen size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
                    <div style={{ fontWeight: 700 }}>No blog posts yet.</div>
                    <div style={{ fontSize: ".85rem", marginTop: 4 }}>Click "New Post" to create your first article.</div>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {posts.map(post => (
                        <div key={post.id} className="il-blog-row" style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 16 }}>
                            {/* Thumbnail */}
                            <div className="il-blog-row-thumb" style={{ width: 72, height: 54, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: DARK3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {post.imageUrl
                                    ? <img src={post.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    : <BookOpen size={22} color={MUTED} />
                                }
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                                    <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: ".92rem", color: WHITE, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</span>
                                    {post.featured && <span style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa", padding: "2px 8px", borderRadius: 50, fontSize: ".58rem", fontWeight: 900, letterSpacing: ".06em" }}>FEATURED</span>}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                    <span style={{ color: MUTED, fontSize: ".75rem" }}>{BLOG_CATEGORIES.find(c => c.key === post.cat)?.label || post.cat}</span>
                                    <span style={{ color: "rgba(255,255,255,.15)" }}>·</span>
                                    <span style={{ color: MUTED, fontSize: ".75rem" }}>{post.author}</span>
                                    <span style={{ color: "rgba(255,255,255,.15)" }}>·</span>
                                    <span style={{ color: MUTED, fontSize: ".75rem" }}>{post.date}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="il-blog-row-actions" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                                {/* Publish toggle */}
                                <button onClick={() => togglePublished(post)} title={post.published ? "Published — click to unpublish" : "Draft — click to publish"} style={{ background: post.published ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${post.published ? "rgba(34,197,94,0.3)" : BORDER}`, color: post.published ? GREEN : MUTED, borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: ".72rem", fontWeight: 900 }}>
                                    {post.published ? <Eye size={13} /> : <EyeOff size={13} />}
                                    {post.published ? "Live" : "Draft"}
                                </button>
                                <button onClick={() => openEdit(post)} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: BLUE, borderRadius: 8, padding: "7px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: ".72rem", fontWeight: 900 }}>
                                    <Edit3 size={13} /> Edit
                                </button>
                                <button onClick={() => setDeleteConfirm(post)} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171", borderRadius: 8, padding: "7px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete confirm modal */}
            {deleteConfirm && (
                <>
                    <div onClick={() => setDeleteConfirm(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 300, backdropFilter: "blur(3px)" }} />
                    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 18, padding: "32px 28px", zIndex: 301, width: "min(400px,90vw)", textAlign: "center", boxShadow: "0 24px 64px rgba(0,0,0,0.6)" }}>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                            <Trash2 size={22} color="#f87171" />
                        </div>
                        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.1rem", color: WHITE, marginBottom: 8 }}>Delete Post?</div>
                        <div style={{ color: MUTED, fontSize: ".85rem", lineHeight: 1.6, marginBottom: 24 }}>
                            "{deleteConfirm.title}" will be permanently deleted along with its image.
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                            <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: MUTED, borderRadius: 10, padding: "11px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 800 }}>Cancel</button>
                            <button onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1, background: "linear-gradient(135deg,#ef4444,#b91c1c)", border: "none", color: WHITE, borderRadius: 10, padding: "11px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 900 }}>Delete</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
// OVERVIEW TAB
// ══════════════════════════════════════════════════════════════
function OverviewTab({ bookings, quotes, leads }) {
    const recent = useMemo(() => {
        const all = [
            ...(bookings || []).map(b => ({ ...b, _type: "booking" })),
            ...(quotes || []).map(q => ({ ...q, _type: "quote" })),
        ].sort((a, b) => {
            const ta = a.createdAt?.toDate?.() || 0;
            const tb = b.createdAt?.toDate?.() || 0;
            return tb - ta;
        }).slice(0, 8);
        return all;
    }, [bookings, quotes]);

    const byStatus = (arr, status) => (arr || []).filter(x => x.status === status).length;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: DARK2, borderRadius: 16, padding: "20px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: MUTED, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                    <CalendarCheck size={13} color={BLUE} /> Booking Pipeline
                </div>
                <div className="il-pipeline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
                    {STATUS_BOOKING.map(s => (
                        <div key={s} style={{ background: STATUS_CFG[s]?.bg || DARK3, borderRadius: 10, padding: "12px 14px", border: `1px solid rgba(255,255,255,0.06)` }}>
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.6rem", color: STATUS_CFG[s]?.color || WHITE }}>{byStatus(bookings, s)}</div>
                            <div style={{ color: STATUS_CFG[s]?.color || MUTED, fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", opacity: 0.8 }}>{s}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ background: DARK2, borderRadius: 16, padding: "20px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: MUTED, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                    <MessageSquare size={13} color={AMBER} /> Quote Pipeline
                </div>
                <div className="il-pipeline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
                    {STATUS_QUOTE.map(s => (
                        <div key={s} style={{ background: STATUS_CFG[s]?.bg || DARK3, borderRadius: 10, padding: "12px 14px", border: `1px solid rgba(255,255,255,0.06)` }}>
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.6rem", color: STATUS_CFG[s]?.color || WHITE }}>{byStatus(quotes, s)}</div>
                            <div style={{ color: STATUS_CFG[s]?.color || MUTED, fontSize: ".68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", opacity: 0.8 }}>{s}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ background: DARK2, borderRadius: 16, padding: "20px", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", color: MUTED, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                    <TrendingUp size={13} color={GREEN} /> Recent Activity
                </div>
                {recent.length === 0 ? (
                    <div style={{ color: MUTED, fontSize: ".85rem" }}>No activity yet.</div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {recent.map((item, i) => (
                            <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 0", borderBottom: i < recent.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                                <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: item._type === "booking" ? "rgba(59,130,246,0.15)" : "rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {item._type === "booking" ? <CalendarCheck size={14} color={BLUE} /> : <MessageSquare size={14} color={AMBER} />}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, fontSize: ".85rem", color: WHITE, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {item._type === "booking" ? `${item.firstName || ""} ${item.lastName || ""}`.trim() || "Unknown" : item.firstName || "Unknown"}
                                    </div>
                                    <div style={{ color: MUTED, fontSize: ".75rem" }}>{item.service || "—"}</div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                                    <Badge status={item.status} />
                                    <div style={{ color: MUTED, fontSize: ".68rem" }}>{fmtDateShort(item.createdAt)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
// CREDENTIALS / SETTINGS VIEW
// ══════════════════════════════════════════════════════════════
function CredentialsView() {
    const [currentPin, setCurrentPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [status, setStatus] = useState(null); // { type: "success"|"error", msg }
    const [saving, setSaving] = useState(false);
    const [loadedPin, setLoadedPin] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const snap = await getDoc(doc(db, "adminConfig", "credentials"));
                setLoadedPin(snap.exists() && snap.data().pin ? snap.data().pin : ADMIN_PIN_FALLBACK);
            } catch {
                setLoadedPin(ADMIN_PIN_FALLBACK);
            }
        };
        load();
    }, []);

    const handleSave = async () => {
        setStatus(null);
        if (!currentPin) return setStatus({ type: "error", msg: "Enter your current PIN to confirm." });
        if (currentPin !== loadedPin) return setStatus({ type: "error", msg: "Current PIN is incorrect." });
        if (!newPin) return setStatus({ type: "error", msg: "New PIN cannot be empty." });
        if (newPin.length < 6) return setStatus({ type: "error", msg: "New PIN must be at least 6 characters." });
        if (newPin !== confirmPin) return setStatus({ type: "error", msg: "New PIN and confirmation don't match." });
        setSaving(true);
        try {
            await setDoc(doc(db, "adminConfig", "credentials"), { pin: newPin, updatedAt: new Date() });
            setLoadedPin(newPin);
            setCurrentPin(""); setNewPin(""); setConfirmPin("");
            setStatus({ type: "success", msg: "PIN updated successfully! Use it next time you log in." });
        } catch (e) {
            console.error(e);
            setStatus({ type: "error", msg: "Failed to save. Check Firestore permissions." });
        }
        setSaving(false);
    };

    const inputStyle = {
        width: "100%", boxSizing: "border-box",
        background: DARK3, border: `1px solid ${BORDER}`,
        borderRadius: 10, padding: "11px 44px 11px 14px",
        color: WHITE, fontFamily: "'Nunito',sans-serif",
        fontSize: ".92rem", outline: "none",
    };

    const Field = ({ label, value, onChange, show, onToggle, placeholder }) => (
        <div>
            <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>{label}</label>
            <div style={{ position: "relative" }}>
                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder || "••••••••"}
                    style={inputStyle}
                />
                <button
                    onClick={onToggle}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: MUTED, display: "flex", alignItems: "center" }}
                >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: 480 }}>
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.15rem", color: WHITE, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
                    <KeyRound size={20} color={RED} /> Admin Credentials
                </div>
                <div style={{ color: MUTED, fontSize: ".84rem" }}>Change the PIN used to access this dashboard. Stored securely in Firestore.</div>
            </div>

            <div style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
                <Field
                    label="Current PIN"
                    value={currentPin}
                    onChange={setCurrentPin}
                    show={showCurrent}
                    onToggle={() => setShowCurrent(v => !v)}
                    placeholder="Enter current PIN"
                />
                <div style={{ height: 1, background: BORDER }} />
                <Field
                    label="New PIN"
                    value={newPin}
                    onChange={setNewPin}
                    show={showNew}
                    onToggle={() => setShowNew(v => !v)}
                    placeholder="Min. 6 characters"
                />
                <Field
                    label="Confirm New PIN"
                    value={confirmPin}
                    onChange={setConfirmPin}
                    show={showConfirm}
                    onToggle={() => setShowConfirm(v => !v)}
                    placeholder="Repeat new PIN"
                />

                {status && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: status.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                        border: `1px solid ${status.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                        borderRadius: 10, padding: "10px 14px",
                        color: status.type === "success" ? "#4ade80" : "#f87171",
                        fontSize: ".84rem", fontWeight: 700,
                    }}>
                        {status.type === "success" ? <CheckCircle size={15} /> : <XCircle size={15} />}
                        {status.msg}
                    </div>
                )}

                <button
                    onClick={handleSave}
                    disabled={saving || loadedPin === null}
                    style={{
                        background: saving ? "rgba(232,35,42,0.5)" : `linear-gradient(135deg, ${RED}, ${RED_DK})`,
                        border: "none", borderRadius: 10, padding: "13px",
                        color: WHITE, fontFamily: "'Nunito',sans-serif",
                        fontWeight: 900, fontSize: ".95rem",
                        cursor: saving ? "default" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        boxShadow: `0 4px 16px rgba(232,35,42,0.35)`,
                        transition: "opacity .2s",
                    }}
                >
                    <Save size={16} /> {saving ? "Saving…" : "Update PIN"}
                </button>
            </div>

            <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, fontSize: ".78rem", color: "rgba(255,255,255,.5)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <AlertCircle size={14} color={AMBER} style={{ flexShrink: 0, marginTop: 1 }} />
                Make sure to remember your new PIN. There is no recovery option — if lost, it must be reset directly in Firestore.
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
// JOBS — Kanban board
// ══════════════════════════════════════════════════════════════
const JOB_STATUSES = ["booked", "on-the-way", "in-progress", "done", "cancelled"];
const JOB_STATUS_LABELS = {
    "booked": "Booked",
    "on-the-way": "On the Way",
    "in-progress": "In Progress",
    "done": "Done",
    "cancelled": "Cancelled",
};
const JOB_STATUS_COLORS = {
    "booked": BLUE,
    "on-the-way": AMBER,
    "in-progress": "#a855f7",
    "done": GREEN,
    "cancelled": "#f87171",
};

function JobsView() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [dragging, setDragging] = useState(null);
    const [dragOver, setDragOver] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "jobs"), orderBy("updatedAt", "desc"));
        const unsub = onSnapshot(q,
            (snap) => { setJobs(snap.docs.map(d => ({ id: d.id, ...d.data() }))); setLoading(false); },
            (err) => { console.error(err); setLoading(false); }
        );
        return unsub;
    }, []);

    const moveJob = async (jobId, newStatus) => {
        try { await updateDoc(doc(db, "jobs", jobId), { status: newStatus, updatedAt: serverTimestamp() }); }
        catch (e) { console.error(e); }
    };

    const handleDrop = (status) => {
        if (dragging && dragging.status !== status) moveJob(dragging.id, status);
        setDragging(null); setDragOver(null);
    };

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.1rem", color: WHITE }}>Jobs Board</div>
                    <div style={{ color: MUTED, fontSize: ".8rem", marginTop: 2 }}>Drag cards to update job status</div>
                </div>
                <button onClick={() => setShowAdd(true)} style={{ background: `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "10px 18px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".88rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: `0 4px 16px rgba(232,35,42,.35)` }}>
                    <Plus size={16} /> New Job
                </button>
            </div>

            {loading ? (
                <div style={{ color: MUTED, padding: "40px", textAlign: "center" }}>Loading jobs…</div>
            ) : (
                <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 12 }}>
                    {JOB_STATUSES.map(status => {
                        const col = jobs.filter(j => j.status === status);
                        const accent = JOB_STATUS_COLORS[status];
                        const isOver = dragOver === status;
                        return (
                            <div
                                key={status}
                                onDragOver={e => { e.preventDefault(); setDragOver(status); }}
                                onDragLeave={() => setDragOver(null)}
                                onDrop={() => handleDrop(status)}
                                style={{ flexShrink: 0, width: 220, background: isOver ? `rgba(255,255,255,0.04)` : DARK2, border: `1px solid ${isOver ? accent : BORDER}`, borderRadius: 14, overflow: "hidden", transition: "border-color .2s, background .2s" }}
                            >
                                <div style={{ padding: "12px 14px 10px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent }} />
                                        <span style={{ color: WHITE, fontWeight: 900, fontSize: ".82rem" }}>{JOB_STATUS_LABELS[status]}</span>
                                    </div>
                                    <span style={{ background: `${accent}22`, color: accent, fontSize: ".62rem", fontWeight: 900, padding: "2px 7px", borderRadius: 50 }}>{col.length}</span>
                                </div>
                                <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: 8, minHeight: 80 }}>
                                    {col.length === 0 && (
                                        <div style={{ color: MUTED, fontSize: ".75rem", textAlign: "center", padding: "16px 0", opacity: 0.5 }}>Drop here</div>
                                    )}
                                    {col.map(j => (
                                        <div
                                            key={j.id}
                                            draggable
                                            onDragStart={() => setDragging(j)}
                                            onDragEnd={() => { setDragging(null); setDragOver(null); }}
                                            onClick={() => setSelected(j)}
                                            style={{ background: dragging?.id === j.id ? "rgba(255,255,255,0.03)" : DARK3, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 13px", cursor: "grab", transition: "opacity .2s", opacity: dragging?.id === j.id ? 0.4 : 1 }}
                                        >
                                            <div style={{ fontWeight: 800, fontSize: ".85rem", color: WHITE, marginBottom: 3 }}>{j.clientName || "Unknown"}</div>
                                            <div style={{ color: accent, fontWeight: 700, fontSize: ".75rem", marginBottom: 4 }}>{j.service || "—"}</div>
                                            {j.scheduledFor && (
                                                <div style={{ color: MUTED, fontSize: ".7rem", display: "flex", alignItems: "center", gap: 4 }}>
                                                    <ClockIcon size={10} /> {new Date(j.scheduledFor?.seconds ? j.scheduledFor.seconds * 1000 : j.scheduledFor).toLocaleDateString("en-AU")}
                                                </div>
                                            )}
                                            {j.estimatedValue > 0 && <div style={{ color: GREEN, fontSize: ".7rem", fontWeight: 700, marginTop: 3 }}>${j.estimatedValue}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {selected && <JobDrawerPanel job={selected} onClose={() => setSelected(null)} />}
            {showAdd && <AddJobPanel onClose={() => setShowAdd(false)} />}
        </>
    );
}

function JobDrawerPanel({ job, onClose }) {
    const [form, setForm] = useState({ ...job });
    const [busy, setBusy] = useState(false);

    const save = async () => {
        setBusy(true);
        try { await updateDoc(doc(db, "jobs", job.id), { ...form, updatedAt: serverTimestamp() }); onClose(); }
        finally { setBusy(false); }
    };
    const remove = async () => {
        if (!confirm("Delete this job?")) return;
        setBusy(true);
        try { await deleteDoc(doc(db, "jobs", job.id)); onClose(); } finally { setBusy(false); }
    };

    return (
        <>
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, backdropFilter: "blur(2px)" }} />
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px,100vw)", background: DARK2, borderLeft: `1px solid ${BORDER}`, zIndex: 201, overflowY: "auto", boxShadow: "-16px 0 48px rgba(0,0,0,.5)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: DARK2, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: WHITE }}>{job.clientName || "Job"}</div>
                    <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${BORDER}`, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: MUTED }}>
                        <X size={16} />
                    </button>
                </div>
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                        { key: "status", label: "Status", type: "select", options: JOB_STATUSES.map(s => ({ value: s, label: JOB_STATUS_LABELS[s] })) },
                        { key: "clientName", label: "Client Name" },
                        { key: "service", label: "Service" },
                        { key: "address", label: "Address" },
                        { key: "estimatedValue", label: "Estimated Value ($)", type: "number" },
                    ].map(({ key, label, type, options }) => (
                        <div key={key}>
                            <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 5 }}>{label}</label>
                            {type === "select" ? (
                                <select value={form[key] || ""} onChange={e => setForm({ ...form, [key]: e.target.value })} style={{ width: "100%", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }}>
                                    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            ) : (
                                <input type={type || "text"} value={form[key] || ""} onChange={e => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }} />
                            )}
                        </div>
                    ))}
                    <div>
                        <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 5 }}>Notes</label>
                        <textarea rows={3} value={form.notes || ""} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none", resize: "vertical" }} />
                    </div>
                    <button onClick={save} disabled={busy} style={{ background: busy ? "rgba(232,35,42,.5)" : `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".9rem", cursor: busy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Save size={15} /> {busy ? "Saving…" : "Save Changes"}
                    </button>
                    <button onClick={remove} disabled={busy} style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", borderRadius: 10, padding: "11px", color: "#f87171", fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <Trash2 size={15} /> Delete Job
                    </button>
                </div>
            </div>
        </>
    );
}

function AddJobPanel({ onClose }) {
    const [form, setForm] = useState({ clientName: "", service: "", status: "booked", estimatedValue: 0, address: "", notes: "" });
    const [busy, setBusy] = useState(false);

    const submit = async () => {
        if (!form.clientName || !form.service) { alert("Client name and service are required."); return; }
        setBusy(true);
        try {
            await addDoc(collection(db, "jobs"), { ...form, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
            onClose();
        } finally { setBusy(false); }
    };

    return (
        <>
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, backdropFilter: "blur(2px)" }} />
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px,100vw)", background: DARK2, borderLeft: `1px solid ${BORDER}`, zIndex: 201, overflowY: "auto", boxShadow: "-16px 0 48px rgba(0,0,0,.5)" }}>
                <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: DARK2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: WHITE }}>New Job</div>
                    <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${BORDER}`, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: MUTED }}><X size={16} /></button>
                </div>
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                        { key: "clientName", label: "Client Name *" },
                        { key: "service", label: "Service *", placeholder: "e.g. End-of-lease clean, Cockroach treatment" },
                        { key: "address", label: "Address" },
                        { key: "estimatedValue", label: "Estimated Value ($)", type: "number" },
                    ].map(({ key, label, placeholder, type }) => (
                        <div key={key}>
                            <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 5 }}>{label}</label>
                            <input type={type || "text"} value={form[key] || ""} onChange={e => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })} placeholder={placeholder || ""} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }} />
                        </div>
                    ))}
                    <div>
                        <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 5 }}>Status</label>
                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ width: "100%", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }}>
                            {JOB_STATUSES.map(s => <option key={s} value={s}>{JOB_STATUS_LABELS[s]}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 5 }}>Notes</label>
                        <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none", resize: "vertical" }} />
                    </div>
                    <button onClick={submit} disabled={busy} style={{ background: busy ? "rgba(232,35,42,.5)" : `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "13px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".95rem", cursor: busy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 4px 16px rgba(232,35,42,.35)` }}>
                        <Plus size={16} /> {busy ? "Creating…" : "Create Job"}
                    </button>
                </div>
            </div>
        </>
    );
}

// ══════════════════════════════════════════════════════════════
// CLIENTS DATABASE
// ══════════════════════════════════════════════════════════════
function parseCSV(text) {
    const lines = text.replace(/\r\n/g, "\n").split("\n").filter(l => l.trim());
    if (!lines.length) return { headers: [], rows: [] };
    const splitLine = (line) => {
        const out = []; let cur = "", inQ = false;
        for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') { if (inQ && line[i + 1] === '"') { cur += '"'; i++; } else inQ = !inQ; }
            else if (c === ',' && !inQ) { out.push(cur.trim()); cur = ""; }
            else cur += c;
        }
        out.push(cur.trim()); return out;
    };
    const headers = splitLine(lines[0]).map(h => h.toLowerCase().trim());
    return { headers, rows: lines.slice(1).map(line => { const cols = splitLine(line); const obj = {}; headers.forEach((h, i) => { obj[h] = cols[i] || ""; }); return obj; }) };
}

function normaliseClientRow(row) {
    const get = (...keys) => { for (const k of keys) if (row[k] !== undefined && row[k] !== "") return row[k]; return ""; };
    return {
        name: get("name", "client", "customer", "full name", "fullname"),
        phone: get("phone", "mobile", "phone number", "contact"),
        email: get("email", "e-mail", "email address"),
        address: get("address", "street"),
        suburb: get("suburb", "city", "town"),
        notes: get("notes", "comments", "remarks"),
        totalJobs: Number(get("total_jobs", "totaljobs", "jobs")) || 0,
        totalSpent: Number(get("total_spent", "totalspent", "spent", "revenue")) || 0,
    };
}

function ClientsView() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);
    const [showAdd, setShowAdd] = useState(false);
    const [showImport, setShowImport] = useState(false);

    const normaliseClient = (raw) => {
        const g = (...keys) => { for (const k of keys) if (raw[k] !== undefined && raw[k] !== null && raw[k] !== "") return raw[k]; return ""; };
        return {
            ...raw,
            name: g("name", "clientName", "client", "customer", "fullName", "full_name"),
            phone: g("phone", "mobile", "phoneNumber", "phone_number", "contact"),
            email: g("email", "emailAddress", "email_address"),
            address: g("address", "street", "streetAddress"),
            suburb: g("suburb", "city", "town", "location"),
            notes: g("notes", "comments", "remarks"),
            totalJobs: Number(g("totalJobs", "total_jobs", "jobs")) || 0,
            totalSpent: Number(g("totalSpent", "total_spent", "spent", "revenue", "value")) || 0,
        };
    };

    const refresh = async () => {
        setLoading(true);
        try {
            const snap = await getDocs(query(collection(db, "clients"), orderBy("createdAt", "desc")));
            setClients(snap.docs.map(d => normaliseClient({ id: d.id, ...d.data() })));
        } catch (e) {
            // no orderBy index yet — fall back to unordered
            try {
                const snap = await getDocs(collection(db, "clients"));
                setClients(snap.docs.map(d => normaliseClient({ id: d.id, ...d.data() })));
            } catch (e2) { console.error(e2); }
        } finally { setLoading(false); }
    };

    useEffect(() => { refresh(); }, []);

    const filtered = clients.filter(c => {
        if (!search) return true;
        const s = search.toLowerCase();
        return (c.name || "").toLowerCase().includes(s) || (c.phone || "").includes(s) || (c.email || "").toLowerCase().includes(s) || (c.suburb || "").toLowerCase().includes(s);
    });

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.1rem", color: WHITE }}>Clients</div>
                    <div style={{ color: MUTED, fontSize: ".8rem", marginTop: 2 }}>{clients.length} total · search, view history, import CSV</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setShowImport(true)} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", color: BLUE, borderRadius: 10, padding: "9px 14px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".82rem", display: "flex", alignItems: "center", gap: 6 }}>
                        <Upload size={14} /> Import CSV
                    </button>
                    <button onClick={() => setShowAdd(true)} style={{ background: `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "9px 16px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, boxShadow: `0 4px 16px rgba(232,35,42,.35)` }}>
                        <Plus size={14} /> Add Client
                    </button>
                </div>
            </div>

            <div style={{ position: "relative", marginBottom: 16 }}>
                <Search size={14} color={MUTED} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, email or suburb…" style={{ width: "100%", boxSizing: "border-box", background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "10px 14px 10px 36px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }} />
            </div>

            {loading ? (
                <div style={{ color: MUTED, padding: "40px", textAlign: "center" }}>Loading clients…</div>
            ) : filtered.length === 0 ? (
                <div style={{ color: MUTED, textAlign: "center", padding: "64px 0", border: `1px dashed ${BORDER}`, borderRadius: 16 }}>
                    <UserCheck size={32} style={{ marginBottom: 12, opacity: 0.4, display: "block", margin: "0 auto 12px" }} />
                    <div style={{ fontWeight: 700 }}>{search ? "No matching clients." : "No clients yet."}</div>
                    <div style={{ fontSize: ".85rem", marginTop: 4 }}>Import from CSV or add manually.</div>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {filtered.map(c => {
                        // Try every possible name-like field as fallback
                        const displayName = c.name || c.clientName || c.customer || c.fullName || "";
                        const displayPhone = c.phone || c.mobile || c.phoneNumber || "";
                        const displaySuburb = c.suburb || c.city || c.location || "";
                        const initials = displayName ? displayName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "?";
                        const avatarColors = [RED, BLUE, GREEN, AMBER, "#8b5cf6", "#06b6d4"];
                        const avatarColor = avatarColors[(displayPhone || displayName || "").charCodeAt(0) % avatarColors.length];
                        return (
                            <div key={c.id} onClick={() => setSelected(c)} style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "all .2s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,35,42,0.3)"; e.currentTarget.style.background = DARK3; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = DARK2; }}
                            >
                                <div style={{ width: 42, height: 42, borderRadius: "50%", background: avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: ".92rem", color: "#fff", flexShrink: 0 }}>{initials || "?"}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 800, fontSize: ".9rem", color: WHITE }}>{displayName || <span style={{ color: MUTED, fontStyle: "italic" }}>No name (ID: {c.id.slice(0, 8)})</span>}</div>
                                    <div style={{ color: MUTED, fontSize: ".75rem", marginTop: 2 }}>{displayPhone || "No phone"}{displaySuburb ? ` · ${displaySuburb}` : ""}</div>
                                </div>
                                <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1rem", color: WHITE }}>{c.totalJobs || 0}</div>
                                        <div style={{ color: MUTED, fontSize: ".6rem", textTransform: "uppercase", letterSpacing: ".06em" }}>Jobs</div>
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1rem", color: GREEN }}>${(c.totalSpent || 0).toLocaleString("en-AU")}</div>
                                        <div style={{ color: MUTED, fontSize: ".6rem", textTransform: "uppercase", letterSpacing: ".06em" }}>Spent</div>
                                    </div>
                                </div>
                                <ChevronRight size={14} color={MUTED} style={{ flexShrink: 0 }} />
                            </div>
                        );
                    })}
                </div>
            )}

            {selected && <ClientDetailPanel client={selected} onClose={() => { setSelected(null); refresh(); }} />}
            {showAdd && <AddClientPanel onClose={() => { setShowAdd(false); refresh(); }} />}
            {showImport && <ImportCSVPanel onClose={() => { setShowImport(false); refresh(); }} />}
        </div>
    );
}

function ClientDetailPanel({ client, onClose }) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        ...client,
        // Normalize to canonical field names for editing
        name: client.name || client.clientName || client.customer || client.fullName || "",
        phone: client.phone || client.mobile || client.phoneNumber || "",
        email: client.email || client.emailAddress || "",
        address: client.address || client.street || "",
        suburb: client.suburb || client.city || client.location || "",
    });
    const [busy, setBusy] = useState(false);

    // Resolve display values with fallbacks for different field name variants
    const displayName = client.name || client.clientName || client.customer || client.fullName || "";
    const displayPhone = client.phone || client.mobile || client.phoneNumber || "";
    const displayEmail = client.email || client.emailAddress || "";
    const displayAddr = client.address || client.street || "";
    const displaySuburb = client.suburb || client.city || client.location || "";

    const save = async () => {
        setBusy(true);
        try { await updateDoc(doc(db, "clients", client.id), { ...form, name: form.name || displayName, phone: form.phone || displayPhone, updatedAt: serverTimestamp() }); setEditing(false); }
        finally { setBusy(false); }
    };
    const remove = async () => {
        if (!confirm(`Delete ${displayName || "this client"}? This can't be undone.`)) return;
        setBusy(true);
        try { await deleteDoc(doc(db, "clients", client.id)); onClose(); } finally { setBusy(false); }
    };

    return (
        <>
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, backdropFilter: "blur(2px)" }} />
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(440px,100vw)", background: DARK2, borderLeft: `1px solid ${BORDER}`, zIndex: 201, overflowY: "auto", boxShadow: "-16px 0 48px rgba(0,0,0,.5)" }}>
                <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: DARK2, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: WHITE }}>{displayName || <span style={{ color: MUTED, fontStyle: "italic" }}>Unknown client</span>}</div>
                    <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${BORDER}`, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: MUTED }}><X size={16} /></button>
                </div>
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
                    {!editing ? (
                        <>
                            <div style={{ background: DARK3, borderRadius: 12, padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
                                {displayPhone && <a href={`tel:${displayPhone}`} style={{ display: "flex", alignItems: "center", gap: 10, color: WHITE, textDecoration: "none", fontSize: ".88rem", fontWeight: 700 }}><Phone size={14} color={BLUE} /> {displayPhone}</a>}
                                {displayEmail && <a href={`mailto:${displayEmail}`} style={{ display: "flex", alignItems: "center", gap: 10, color: WHITE, textDecoration: "none", fontSize: ".88rem", fontWeight: 700 }}><Mail size={14} color={AMBER} /> {displayEmail}</a>}
                                {displayAddr && <div style={{ display: "flex", alignItems: "center", gap: 10, color: MUTED, fontSize: ".84rem" }}><MapPin size={14} /> {displayAddr}{displaySuburb ? `, ${displaySuburb}` : ""}</div>}
                                <div style={{ display: "flex", alignItems: "center", gap: 10, color: MUTED, fontSize: ".84rem" }}><ClockIcon size={14} /> Client since {client.createdAt ? fmtDateShort(client.createdAt) : "—"}</div>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                {[
                                    { label: "Total Jobs", value: client.totalJobs || 0, color: BLUE },
                                    { label: "Total Spent", value: `$${(client.totalSpent || 0).toLocaleString("en-AU")}`, color: GREEN },
                                ].map(({ label, value, color }) => (
                                    <div key={label} style={{ background: DARK3, borderRadius: 10, padding: "14px 12px", textAlign: "center", border: `1px solid ${BORDER}` }}>
                                        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.4rem", color }}>{value}</div>
                                        <div style={{ fontSize: ".62rem", color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginTop: 2 }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                            {client.notes && <div style={{ background: DARK3, borderRadius: 10, padding: "12px", color: MUTED, fontSize: ".84rem", lineHeight: 1.6 }}>{client.notes}</div>}
                            <button onClick={() => setEditing(true)} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: BLUE, borderRadius: 10, padding: "11px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".88rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                                <Edit3 size={14} /> Edit Client
                            </button>
                            <button onClick={remove} disabled={busy} style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", color: "#f87171", borderRadius: 10, padding: "11px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".88rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                                <Trash2 size={14} /> Delete Client
                            </button>
                        </>
                    ) : (
                        <>
                            {["name", "phone", "email", "address", "suburb"].map(k => (
                                <div key={k}>
                                    <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "capitalize", letterSpacing: ".08em", display: "block", marginBottom: 5 }}>{k}</label>
                                    <input value={form[k] || ""} onChange={e => setForm({ ...form, [k]: e.target.value })} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }} />
                                </div>
                            ))}
                            <div>
                                <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 5 }}>Notes</label>
                                <textarea rows={3} value={form.notes || ""} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none", resize: "vertical" }} />
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={save} disabled={busy} style={{ flex: 1, background: `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "11px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, cursor: "pointer" }}>{busy ? "Saving…" : "Save"}</button>
                                <button onClick={() => { setEditing(false); setForm({ ...client }); }} style={{ background: "rgba(255,255,255,.05)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "11px 16px", color: MUTED, fontFamily: "'Nunito',sans-serif", fontWeight: 800, cursor: "pointer" }}>Cancel</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

function AddClientPanel({ onClose }) {
    const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", suburb: "", notes: "" });
    const [busy, setBusy] = useState(false);

    const save = async () => {
        if (!form.name || !form.phone) { alert("Name and phone are required."); return; }
        setBusy(true);
        try { await addDoc(collection(db, "clients"), { ...form, totalJobs: 0, totalSpent: 0, createdAt: serverTimestamp() }); onClose(); }
        finally { setBusy(false); }
    };

    return (
        <>
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, backdropFilter: "blur(2px)" }} />
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px,100vw)", background: DARK2, borderLeft: `1px solid ${BORDER}`, zIndex: 201, overflowY: "auto", boxShadow: "-16px 0 48px rgba(0,0,0,.5)" }}>
                <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: DARK2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: WHITE }}>Add Client</div>
                    <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${BORDER}`, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: MUTED }}><X size={16} /></button>
                </div>
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
                    {["name", "phone", "email", "address", "suburb"].map(k => (
                        <div key={k}>
                            <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "capitalize", letterSpacing: ".08em", display: "block", marginBottom: 5 }}>{k}{(k === "name" || k === "phone") && " *"}</label>
                            <input value={form[k] || ""} onChange={e => setForm({ ...form, [k]: e.target.value })} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }} />
                        </div>
                    ))}
                    <div>
                        <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 5 }}>Notes</label>
                        <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none", resize: "vertical" }} />
                    </div>
                    <button onClick={save} disabled={busy} style={{ background: busy ? "rgba(232,35,42,.5)" : `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "13px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, cursor: busy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 4px 16px rgba(232,35,42,.35)` }}>
                        <Plus size={16} /> {busy ? "Saving…" : "Add Client"}
                    </button>
                </div>
            </div>
        </>
    );
}

function ImportCSVPanel({ onClose }) {
    const [preview, setPreview] = useState(null);
    const [busy, setBusy] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleFile = (f) => {
        setError(""); setResult(null);
        if (!f) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const { rows } = parseCSV(e.target.result);
                const mapped = rows.map(normaliseClientRow);
                const missingRequired = mapped.filter(r => !r.name || !r.phone).length;
                setPreview({ totalRows: rows.length, mapped: mapped.slice(0, 5), allMapped: mapped, missingRequired, fileName: f.name });
            } catch { setError("Could not parse CSV. Check it has a header row and is comma-separated."); }
        };
        reader.readAsText(f);
    };

    const runImport = async () => {
        if (!preview) return;
        setBusy(true);
        let imported = 0, skipped = 0, errors = 0;
        for (const row of preview.allMapped) {
            if (!row.name || !row.phone) { skipped++; continue; }
            try { await addDoc(collection(db, "clients"), { ...row, createdAt: serverTimestamp() }); imported++; }
            catch { errors++; }
        }
        setResult({ imported, skipped, errors });
        setBusy(false);
    };

    return (
        <>
            <div onClick={busy ? null : onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, backdropFilter: "blur(2px)" }} />
            <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(480px,100vw)", background: DARK2, borderLeft: `1px solid ${BORDER}`, zIndex: 201, overflowY: "auto", boxShadow: "-16px 0 48px rgba(0,0,0,.5)" }}>
                <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: DARK2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.05rem", color: WHITE }}>Import CSV</div>
                    <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${BORDER}`, borderRadius: 8, width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: MUTED }}><X size={16} /></button>
                </div>
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ color: MUTED, fontSize: ".82rem", lineHeight: 1.6 }}>
                        Required columns: <code style={{ background: DARK3, padding: "1px 5px", borderRadius: 4, color: WHITE }}>name</code> and <code style={{ background: DARK3, padding: "1px 5px", borderRadius: 4, color: WHITE }}>phone</code>.
                        Also recognised: email, address, suburb, notes, total_jobs, total_spent.
                    </div>
                    {!result && (
                        <div style={{ border: `2px dashed ${BORDER}`, borderRadius: 12, padding: "28px", textAlign: "center", color: MUTED }}>
                            <Upload size={24} style={{ marginBottom: 8, display: "block", margin: "0 auto 8px" }} />
                            <input type="file" accept=".csv,text/csv" onChange={e => handleFile(e.target.files[0])} style={{ display: "block", margin: "0 auto", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".82rem" }} />
                            {preview && <div style={{ marginTop: 8, fontSize: ".8rem", fontWeight: 700, color: WHITE }}>{preview.fileName}</div>}
                        </div>
                    )}
                    {error && <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 8, padding: "10px 14px", color: "#f87171", fontSize: ".82rem" }}>{error}</div>}
                    {preview && !result && (
                        <>
                            <div style={{ background: DARK3, borderRadius: 10, padding: "14px", fontSize: ".82rem", color: MUTED }}>
                                <span style={{ color: WHITE, fontWeight: 800 }}>{preview.totalRows} rows</span> found.
                                {preview.missingRequired > 0 && <span style={{ color: AMBER }}> · {preview.missingRequired} row(s) missing name/phone — will be skipped.</span>}
                            </div>
                            <div style={{ overflowX: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".78rem" }}>
                                    <thead><tr>{["Name", "Phone", "Email", "Suburb"].map(h => <th key={h} style={{ color: MUTED, fontWeight: 700, textAlign: "left", padding: "6px 10px", borderBottom: `1px solid ${BORDER}` }}>{h}</th>)}</tr></thead>
                                    <tbody>
                                        {preview.mapped.map((r, i) => (
                                            <tr key={i}>
                                                {[r.name, r.phone, r.email || "—", r.suburb || "—"].map((v, j) => <td key={j} style={{ color: WHITE, padding: "7px 10px", borderBottom: `1px solid ${BORDER}` }}>{v || <span style={{ color: "#f87171" }}>missing</span>}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button onClick={runImport} disabled={busy} style={{ background: busy ? "rgba(232,35,42,.5)" : `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "13px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, cursor: busy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                <Upload size={15} /> {busy ? "Importing…" : `Import ${preview.totalRows} rows`}
                            </button>
                        </>
                    )}
                    {result && (
                        <div style={{ background: "rgba(34,197,94,.07)", border: "1px solid rgba(34,197,94,.25)", borderRadius: 12, padding: "20px", textAlign: "center" }}>
                            <CheckCircle size={28} color={GREEN} style={{ display: "block", margin: "0 auto 10px" }} />
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: GREEN, fontSize: "1rem", marginBottom: 8 }}>Import complete!</div>
                            <div style={{ color: MUTED, fontSize: ".84rem" }}>
                                {result.imported} imported · {result.skipped} skipped{result.errors > 0 ? ` · ${result.errors} errors` : ""}
                            </div>
                            <button onClick={onClose} style={{ marginTop: 14, background: `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "11px 24px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, cursor: "pointer" }}>Done</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// ══════════════════════════════════════════════════════════════
// EXTENDED SETTINGS (Business Hours + Templates + PIN)
// ══════════════════════════════════════════════════════════════
const DEFAULT_TEMPLATES = {
    leadConfirm: "Hi {{name}}, thanks for getting in touch with iLovah Cleaning & Rest In Pest. I'll be back to you within 15 minutes during business hours with a quote. - Francis",
    reviewRequest: "Hi {{name}}, hope you're happy with the {{service}}! If you have 30 seconds, would you mind leaving us a quick Google review? It really helps a small family business: {{reviewLink}} - Francis",
    warrantyReminder: "Hi {{name}}, this is your reminder that your 12-month pest warranty is expiring soon. Want us to come back and re-treat? Reply YES to book in. - Francis",
};

function ExtendedSettingsView() {
    const [activeSection, setActiveSection] = useState("hours");
    // Hours
    const [hours, setHours] = useState({ monday: "07:00-18:00", tuesday: "07:00-18:00", wednesday: "07:00-18:00", thursday: "07:00-18:00", friday: "07:00-18:00", saturday: "07:00-18:00", sunday: "Closed" });
    const [templates, setTemplates] = useState(DEFAULT_TEMPLATES);
    const [hoursBusy, setHoursBusy] = useState(false);
    const [hoursSaved, setHoursSaved] = useState(null);
    // PIN
    const [currentPin, setCurrentPin] = useState(""); const [newPin, setNewPin] = useState(""); const [confirmPin, setConfirmPin] = useState("");
    const [showC, setShowC] = useState(false); const [showN, setShowN] = useState(false); const [showCf, setShowCf] = useState(false);
    const [pinStatus, setPinStatus] = useState(null);
    const [pinBusy, setPinBusy] = useState(false);
    const [loadedPin, setLoadedPin] = useState(null);
    const [loadingSettings, setLoadingSettings] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const [settingsSnap, pinSnap] = await Promise.all([
                    getDoc(doc(db, "settings", "business")),
                    getDoc(doc(db, "adminConfig", "credentials")),
                ]);
                if (settingsSnap.exists()) {
                    if (settingsSnap.data().hours) setHours(settingsSnap.data().hours);
                    if (settingsSnap.data().templates) setTemplates({ ...DEFAULT_TEMPLATES, ...settingsSnap.data().templates });
                }
                setLoadedPin(pinSnap.exists() && pinSnap.data().pin ? pinSnap.data().pin : ADMIN_PIN_FALLBACK);
            } catch { setLoadedPin(ADMIN_PIN_FALLBACK); }
            finally { setLoadingSettings(false); }
        })();
    }, []);

    const saveHours = async () => {
        setHoursBusy(true);
        try { await setDoc(doc(db, "settings", "business"), { hours, templates, updatedAt: serverTimestamp() }, { merge: true }); setHoursSaved(new Date()); }
        finally { setHoursBusy(false); }
    };

    const savePin = async () => {
        setPinStatus(null);
        if (!currentPin) return setPinStatus({ type: "error", msg: "Enter your current PIN." });
        if (currentPin !== loadedPin) return setPinStatus({ type: "error", msg: "Current PIN is incorrect." });
        if (!newPin || newPin.length < 6) return setPinStatus({ type: "error", msg: "New PIN must be at least 6 characters." });
        if (newPin !== confirmPin) return setPinStatus({ type: "error", msg: "New PIN and confirmation don't match." });
        setPinBusy(true);
        try {
            await setDoc(doc(db, "adminConfig", "credentials"), { pin: newPin, updatedAt: serverTimestamp() });
            setLoadedPin(newPin); setCurrentPin(""); setNewPin(""); setConfirmPin("");
            setPinStatus({ type: "success", msg: "PIN updated successfully!" });
        } catch { setPinStatus({ type: "error", msg: "Save failed. Check Firestore permissions." }); }
        setPinBusy(false);
    };

    const sections = [
        { id: "hours", label: "Business Hours", Icon: ClockIcon },
        { id: "templates", label: "SMS Templates", Icon: MessageCircle },
        { id: "pin", label: "Change PIN", Icon: KeyRound },
    ];

    const inputSt = { width: "100%", boxSizing: "border-box", background: DARK3, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "9px 12px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" };

    if (loadingSettings) return <div style={{ color: MUTED, padding: "40px", textAlign: "center" }}>Loading…</div>;

    return (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {/* Section nav */}
            <div style={{ flexShrink: 0, width: 180 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {sections.map(({ id, label, Icon }) => (
                        <button key={id} onClick={() => setActiveSection(id)} style={{ background: activeSection === id ? "rgba(232,35,42,0.12)" : "transparent", border: activeSection === id ? "1px solid rgba(232,35,42,0.3)" : `1px solid transparent`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: ".85rem", color: activeSection === id ? WHITE : MUTED, display: "flex", alignItems: "center", gap: 9, textAlign: "left", width: "100%", transition: "all .15s" }}>
                            <Icon size={15} color={activeSection === id ? RED : MUTED} strokeWidth={2} /> {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: "1 1 300px" }}>
                {activeSection === "hours" && (
                    <div style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px" }}>
                        <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1rem", color: WHITE, marginBottom: 4 }}>Business Hours</div>
                        <div style={{ color: MUTED, fontSize: ".8rem", marginBottom: 20 }}>Used in automated replies. Format: HH:MM-HH:MM or "Closed".</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "12px 16px", marginBottom: 20 }}>
                            {Object.keys(hours).map(day => (
                                <div key={day}>
                                    <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "capitalize", letterSpacing: ".08em", display: "block", marginBottom: 5 }}>{day}</label>
                                    <input value={hours[day]} onChange={e => setHours({ ...hours, [day]: e.target.value })} style={inputSt} />
                                </div>
                            ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <button onClick={saveHours} disabled={hoursBusy} style={{ background: hoursBusy ? "rgba(232,35,42,.5)" : `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "11px 22px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".9rem", cursor: hoursBusy ? "default" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                                <Save size={15} /> {hoursBusy ? "Saving…" : "Save Hours"}
                            </button>
                            {hoursSaved && <span style={{ color: GREEN, fontSize: ".78rem", fontWeight: 700 }}>✓ Saved {hoursSaved.toLocaleTimeString("en-AU")}</span>}
                        </div>
                    </div>
                )}

                {activeSection === "templates" && (
                    <div style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
                        <div>
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1rem", color: WHITE, marginBottom: 4 }}>Message Templates</div>
                            <div style={{ color: MUTED, fontSize: ".8rem" }}>Variables like <code style={{ background: DARK3, padding: "1px 5px", borderRadius: 4 }}>{"{{name}}"}</code> are filled in automatically.</div>
                        </div>
                        {[
                            { key: "leadConfirm", label: "Lead Confirmation SMS", sub: "Sent after a quote form submission" },
                            { key: "reviewRequest", label: "Review Request", sub: "Sent 7 days after a job is marked done" },
                            { key: "warrantyReminder", label: "Warranty Reminder", sub: "Sent at 11 months for pest treatments" },
                        ].map(({ key, label, sub }) => (
                            <div key={key}>
                                <label style={{ color: WHITE, fontSize: ".85rem", fontWeight: 800, display: "block", marginBottom: 3 }}>{label}</label>
                                <div style={{ color: MUTED, fontSize: ".72rem", marginBottom: 6 }}>{sub}</div>
                                <textarea rows={3} value={templates[key]} onChange={e => setTemplates({ ...templates, [key]: e.target.value })} style={{ ...inputSt, resize: "vertical", lineHeight: 1.5 }} />
                            </div>
                        ))}
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <button onClick={saveHours} disabled={hoursBusy} style={{ background: hoursBusy ? "rgba(232,35,42,.5)" : `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "11px 22px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: ".9rem", cursor: hoursBusy ? "default" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                                <Save size={15} /> {hoursBusy ? "Saving…" : "Save Templates"}
                            </button>
                            {hoursSaved && <span style={{ color: GREEN, fontSize: ".78rem", fontWeight: 700 }}>✓ Saved</span>}
                        </div>
                    </div>
                )}

                {activeSection === "pin" && (
                    <div style={{ background: DARK2, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px", display: "flex", flexDirection: "column", gap: 18, maxWidth: 420 }}>
                        <div>
                            <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1rem", color: WHITE, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                                <KeyRound size={18} color={RED} /> Admin PIN
                            </div>
                            <div style={{ color: MUTED, fontSize: ".8rem" }}>Change the PIN used to access this dashboard. Stored in Firestore.</div>
                        </div>
                        {[
                            { label: "Current PIN", value: currentPin, onChange: setCurrentPin, show: showC, onToggle: () => setShowC(v => !v), placeholder: "Enter current PIN" },
                            { label: "New PIN", value: newPin, onChange: setNewPin, show: showN, onToggle: () => setShowN(v => !v), placeholder: "Min. 6 characters" },
                            { label: "Confirm New PIN", value: confirmPin, onChange: setConfirmPin, show: showCf, onToggle: () => setShowCf(v => !v), placeholder: "Repeat new PIN" },
                        ].map(({ label, value, onChange, show, onToggle, placeholder }) => (
                            <div key={label}>
                                <label style={{ color: MUTED, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>{label}</label>
                                <div style={{ position: "relative" }}>
                                    <input type={show ? "text" : "password"} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...inputSt, padding: "11px 44px 11px 14px" }} />
                                    <button onClick={onToggle} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: MUTED, display: "flex", alignItems: "center" }}>
                                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                        {pinStatus && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8, background: pinStatus.type === "success" ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)", border: `1px solid ${pinStatus.type === "success" ? "rgba(34,197,94,.3)" : "rgba(239,68,68,.3)"}`, borderRadius: 10, padding: "10px 14px", color: pinStatus.type === "success" ? "#4ade80" : "#f87171", fontSize: ".84rem", fontWeight: 700 }}>
                                {pinStatus.type === "success" ? <CheckCircle size={15} /> : <XCircle size={15} />} {pinStatus.msg}
                            </div>
                        )}
                        <button onClick={savePin} disabled={pinBusy || loadedPin === null} style={{ background: pinBusy ? "rgba(232,35,42,.5)" : `linear-gradient(135deg,${RED},${RED_DK})`, border: "none", borderRadius: 10, padding: "13px", color: WHITE, fontFamily: "'Nunito',sans-serif", fontWeight: 900, cursor: pinBusy ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: `0 4px 16px rgba(232,35,42,.35)` }}>
                            <Save size={16} /> {pinBusy ? "Saving…" : "Update PIN"}
                        </button>
                        <div style={{ padding: "10px 14px", background: "rgba(245,158,11,.07)", border: "1px solid rgba(245,158,11,.2)", borderRadius: 10, fontSize: ".75rem", color: "rgba(255,255,255,.5)", display: "flex", gap: 8 }}>
                            <AlertCircle size={14} color={AMBER} style={{ flexShrink: 0, marginTop: 1 }} />
                            Remember your new PIN — there is no recovery option. If lost, reset it directly in Firestore.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════
// TABS CONFIG
// ══════════════════════════════════════════════════════════════
const TABS_CFG = [
    { id: "overview", label: "Overview", Icon: LayoutDashboard },
    { id: "bookings", label: "Bookings", Icon: CalendarCheck },
    { id: "quotes", label: "Quotes", Icon: MessageSquare },
    { id: "leads", label: "Leads", Icon: Zap },
    { id: "crm", label: "CRM", Icon: Users },
    { id: "jobs", label: "Jobs", Icon: Briefcase },
    { id: "clients", label: "Clients", Icon: UserCheck },
    { id: "blog", label: "Blog", Icon: BookOpen },
    { id: "settings", label: "Settings", Icon: Settings },
];

// ══════════════════════════════════════════════════════════════
// MAIN ADMIN PAGE
// ══════════════════════════════════════════════════════════════
export default function AdminPage() {
    const [unlocked, setUnlocked] = useState(
        () => sessionStorage.getItem("il-admin") === "1"
    );
    const [activeTab, setActiveTab] = useState("overview");
    const [bookings, setBookings] = useState(null);
    const [quotes, setQuotes] = useState(null);
    const [leads, setLeads] = useState(null);

    const handleUnlock = () => {
        sessionStorage.setItem("il-admin", "1");
        setUnlocked(true);
    };

    useEffect(() => {
        if (!unlocked) return;
        const q1 = query(collection(db, COLLECTIONS.BOOKINGS), orderBy("createdAt", "desc"));
        const q2 = query(collection(db, COLLECTIONS.QUOTES), orderBy("createdAt", "desc"));
        const q3 = query(collection(db, COLLECTIONS.LEADS), orderBy("createdAt", "desc"));
        const u1 = onSnapshot(q1, s => setBookings(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const u2 = onSnapshot(q2, s => setQuotes(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        const u3 = onSnapshot(q3, s => setLeads(s.docs.map(d => ({ id: d.id, ...d.data() }))));
        return () => { u1(); u2(); u3(); };
    }, [unlocked]);

    if (!unlocked) return <PinLock onUnlock={handleUnlock} />;

    const newBookings = (bookings || []).filter(b => b.status === "new").length;
    const newQuotes = (quotes || []).filter(q => q.status === "new").length;
    const newLeads = (leads || []).filter(l => l.status === "new").length;
    const converted = (leads || []).filter(l => l.status === "converted").length;

    const BOOKING_FIELDS = [
        { key: "firstName", label: "Name", flex: "1 1 120px", render: (_, r) => `${r.firstName || ""} ${r.lastName || ""}`.trim() || "—" },
        { key: "phone", label: "Phone", min: 100 },
        { key: "service", label: "Service", flex: "2 1 160px" },
        { key: "date", label: "Date", min: 110 },
        { key: "createdAt", label: "Received", min: 130, render: v => fmtDate(v) },
    ];
    const QUOTE_FIELDS = [
        { key: "firstName", label: "Name", flex: "1 1 120px" },
        { key: "phone", label: "Phone", min: 100 },
        { key: "email", label: "Email", flex: "2 1 150px" },
        { key: "service", label: "Service", flex: "2 1 160px" },
        { key: "createdAt", label: "Received", min: 130, render: v => fmtDate(v) },
    ];
    const LEAD_FIELDS = [
        { key: "name", label: "Name", flex: "1 1 120px" },
        { key: "phone", label: "Phone", min: 100 },
        { key: "source", label: "Source", min: 100, render: v => <SourcePill source={v} /> },
        { key: "service", label: "Service", flex: "2 1 160px" },
        { key: "createdAt", label: "Captured", min: 130, render: v => fmtDate(v) },
    ];

    const BADGE_COUNTS = {
        bookings: newBookings,
        quotes: newQuotes,
        leads: newLeads,
        crm: 0,
        overview: 0,
        jobs: 0,
        clients: 0,
        blog: 0,
        settings: 0,
    };

    return (
        <div style={{ minHeight: "100vh", background: DARK, fontFamily: "'Nunito',sans-serif", color: WHITE }}>

            {/* TOP BAR */}
            <div style={{
                background: DARK2, borderBottom: `3px solid ${RED}`,
                padding: "0 5%", height: 60,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                position: "sticky", top: 0, zIndex: 100,
                boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}>
                <div className="il-topbar-brand" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: RED }}>iLovah</span>
                    <span style={{ color: "rgba(255,255,255,.3)", fontWeight: 400 }}>|</span>
                    <span style={{ fontSize: ".9rem" }}>Admin CRM</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <a href="tel:0478711829" style={{ color: MUTED, fontSize: ".8rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
                        <Phone size={13} />
                    </a>
                    <button
                        onClick={() => { sessionStorage.removeItem("il-admin"); setUnlocked(false); }}
                        style={{ background: "transparent", border: `1px solid ${BORDER}`, color: MUTED, padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontSize: ".78rem", fontFamily: "'Nunito',sans-serif", display: "flex", alignItems: "center", gap: 6 }}
                    >
                        <LogOut size={13} /> Lock
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>

                {/* SIDEBAR NAV */}
                <nav className="il-sidebar" style={{
                    width: 200, flexShrink: 0,
                    background: DARK2,
                    borderRight: `1px solid ${BORDER}`,
                    padding: "24px 12px",
                    display: "flex", flexDirection: "column", gap: 4,
                    position: "sticky", top: 60, height: "calc(100vh - 60px)",
                    overflowY: "auto",
                }}>
                    {TABS_CFG.map(t => {
                        const active = activeTab === t.id;
                        const badge = BADGE_COUNTS[t.id];
                        return (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                style={{
                                    background: active ? `rgba(232,35,42,0.12)` : "transparent",
                                    border: active ? `1px solid rgba(232,35,42,0.3)` : "1px solid transparent",
                                    borderRadius: 10, padding: "10px 14px",
                                    cursor: "pointer", fontFamily: "'Nunito',sans-serif",
                                    fontWeight: 800, fontSize: ".85rem",
                                    color: active ? WHITE : MUTED,
                                    display: "flex", alignItems: "center", gap: 10,
                                    transition: "all .15s", textAlign: "left",
                                    width: "100%",
                                }}
                            >
                                <t.Icon size={16} color={active ? RED : MUTED} strokeWidth={2} />
                                {t.label}
                                {badge > 0 && (
                                    <span style={{ marginLeft: "auto", background: RED, color: WHITE, borderRadius: 50, fontSize: ".58rem", fontWeight: 900, padding: "2px 6px", minWidth: 16, textAlign: "center" }}>{badge}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* MAIN CONTENT */}
                <main className="il-main" style={{ flex: 1, minWidth: 0, padding: "28px 24px 64px" }}>

                    {activeTab === "overview" && (
                        <>
                            {/* Stat cards */}
                            <div className="il-stat-grid" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                                <StatCard IconComp={CalendarCheck} label="Bookings" value={bookings?.length ?? "—"} sub={`${newBookings} new`} accent={BLUE} />
                                <StatCard IconComp={MessageSquare} label="Quotes" value={quotes?.length ?? "—"} sub={`${newQuotes} new`} accent={AMBER} />
                                <StatCard IconComp={Zap} label="Leads" value={leads?.length ?? "—"} sub={`${newLeads} new`} accent={RED} />
                                <StatCard IconComp={CheckCircle} label="Converted" value={converted} sub="leads → clients" accent={GREEN} />
                            </div>

                            {/* Auto-lead note */}
                            <div style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 22, fontSize: ".8rem", color: "rgba(255,255,255,.6)", display: "flex", alignItems: "center", gap: 9 }}>
                                <CheckCircle size={14} color={GREEN} strokeWidth={2} />
                                <span>
                                    <strong style={{ color: "#4ade80" }}>Auto-lead active</strong> — every booking and quote
                                    automatically creates or updates a lead matched by phone number.
                                </span>
                            </div>
                        </>
                    )}

                    {activeTab === "overview" && <OverviewTab bookings={bookings} quotes={quotes} leads={leads} />}
                    {activeTab === "bookings" && <DataTable rows={bookings} summaryFields={BOOKING_FIELDS} statusOptions={STATUS_BOOKING} colName={COLLECTIONS.BOOKINGS} emptyMsg="No bookings yet." />}
                    {activeTab === "quotes" && <DataTable rows={quotes} summaryFields={QUOTE_FIELDS} statusOptions={STATUS_QUOTE} colName={COLLECTIONS.QUOTES} emptyMsg="No quote requests yet." />}
                    {activeTab === "leads" && <DataTable rows={leads} summaryFields={LEAD_FIELDS} statusOptions={STATUS_LEAD} colName={COLLECTIONS.LEADS} emptyMsg="No leads yet." />}
                    {activeTab === "crm" && <CRMView leads={leads} bookings={bookings} quotes={quotes} />}
                    {activeTab === "jobs" && <JobsView />}
                    {activeTab === "clients" && <ClientsView />}
                    {activeTab === "blog" && <BlogView />}
                    {activeTab === "settings" && <ExtendedSettingsView />}
                </main>
            </div>

            {/* RESPONSIVE STYLES */}
            <style>{`
                /* ── Sidebar / nav toggle ── */
                @media (min-width: 768px) {
                    .il-mobile-nav { display: none !important; }
                }
                @media (max-width: 767px) {
                    .il-sidebar { display: none !important; }
                    .il-main { padding: 14px 12px 96px !important; }
                }

                /* ── Stat cards: 2-up on mobile ── */
                @media (max-width: 480px) {
                    .il-stat-grid {
                        display: grid !important;
                        grid-template-columns: 1fr 1fr !important;
                        gap: 10px !important;
                    }
                    .il-stat-grid > * { flex: none !important; }
                }

                /* ── Blog form: single-column on mobile ── */
                @media (max-width: 767px) {
                    .il-blog-form-grid {
                        grid-template-columns: 1fr !important;
                    }
                }

                /* ── Blog post row: stack actions below info on small screens ── */
                @media (max-width: 520px) {
                    .il-blog-row {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 10px !important;
                    }
                    .il-blog-row-actions {
                        width: 100% !important;
                        justify-content: flex-start !important;
                    }
                    .il-blog-row-thumb {
                        width: 100% !important;
                        height: 120px !important;
                    }
                }

                /* ── RecordRow: allow horizontal scroll on very small screens ── */
                @media (max-width: 480px) {
                    .il-record-row-header {
                        gap: 6px !important;
                        padding: 10px 12px !important;
                    }
                    .il-record-row-header > * {
                        font-size: .75rem !important;
                    }
                }

                /* ── Top bar: shrink text on mobile ── */
                @media (max-width: 380px) {
                    .il-topbar-brand { font-size: .9rem !important; }
                }

                /* ── CRM grid: single column on mobile ── */
                @media (max-width: 480px) {
                    .il-crm-grid {
                        grid-template-columns: 1fr !important;
                    }
                }

                /* ── Overview pipeline grids: 2-up min ── */
                @media (max-width: 480px) {
                    .il-pipeline-grid {
                        grid-template-columns: 1fr 1fr !important;
                    }
                }

                /* ── ContactPanel mini-stat row ── */
                @media (max-width: 380px) {
                    .il-contact-stats {
                        grid-template-columns: 1fr 1fr !important;
                    }
                }

                /* ── Filter pills: allow wrap & scroll ── */
                .il-filter-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }

                /* ── General inputs full-width on mobile ── */
                @media (max-width: 480px) {
                    .il-search-bar { max-width: 100% !important; flex: 1 1 100% !important; }
                }
            `}</style>

            <div className="il-mobile-nav" style={{
                position: "fixed", bottom: 0, left: 0, right: 0,
                background: DARK2, borderTop: `1px solid ${BORDER}`,
                display: "flex", zIndex: 150,
                boxShadow: "0 -4px 20px rgba(0,0,0,0.4)",
            }}>
                {TABS_CFG.map(t => {
                    const active = activeTab === t.id;
                    const badge = BADGE_COUNTS[t.id];
                    return (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            style={{
                                flex: 1, background: "none", border: "none",
                                padding: "10px 4px 12px",
                                display: "flex", flexDirection: "column",
                                alignItems: "center", gap: 4,
                                cursor: "pointer", position: "relative",
                                color: active ? RED : MUTED,
                                transition: "color .15s",
                            }}
                        >
                            {badge > 0 && (
                                <span style={{ position: "absolute", top: 6, right: "calc(50% - 18px)", background: RED, color: WHITE, borderRadius: 50, fontSize: ".52rem", fontWeight: 900, padding: "1px 5px", lineHeight: 1.4 }}>{badge}</span>
                            )}
                            <t.Icon size={18} strokeWidth={active ? 2.5 : 2} color={active ? RED : MUTED} />
                            <span style={{ fontSize: ".6rem", fontWeight: 800, letterSpacing: ".04em" }}>{t.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}