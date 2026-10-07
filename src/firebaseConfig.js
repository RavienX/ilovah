// ══════════════════════════════════════════════════════════════
// firebaseConfig.js  —  iLovah / Rest In Pest
// ══════════════════════════════════════════════════════════════
import { initializeApp, getApps } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAd2kPUWd-cMhs2r4ScEFZDtHuvGQgSZbY",
    authDomain: "ilovahclean.firebaseapp.com",
    projectId: "ilovahclean",
    storageBucket: "ilovahclean.firebasestorage.app",
    messagingSenderId: "353359234811",
    appId: "1:353359234811:web:4f777788cce6d3d3e3d25e",
    measurementId: "G-JQKCTRF56G"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);

export const COLLECTIONS = {
    BOOKINGS: "bookings",
    QUOTES: "quotes",
    LEADS: "leads",
};

// ══════════════════════════════════════════════════════════════
// upsertLead
// ══════════════════════════════════════════════════════════════
async function upsertLead({ name, phone, email, service, source, refId }) {
    try {
        const existing = await getDocs(
            query(collection(db, COLLECTIONS.LEADS), where("phone", "==", phone))
        );

        if (!existing.empty) {
            const leadDoc = existing.docs[0];
            const current = leadDoc.data();
            await updateDoc(doc(db, COLLECTIONS.LEADS, leadDoc.id), {
                status: "converted",
                convertedSource: source,
                convertedRefId: refId,
                updatedAt: serverTimestamp(),
                email: current.email === "—" ? (email || "—") : current.email,
                service: service || current.service,
            });
            return leadDoc.id;
        }

        const docRef = await addDoc(collection(db, COLLECTIONS.LEADS), {
            name,
            phone,
            email: email || "—",
            service: service || "—",
            source,
            refId,
            status: "converted",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (err) {
        console.error("[iLovah] upsertLead error:", err);
    }
}

// ══════════════════════════════════════════════════════════════
// saveBooking
// ══════════════════════════════════════════════════════════════
export async function saveBooking(data) {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.BOOKINGS), {
            ...data,
            status: "new",
            createdAt: serverTimestamp(),
        });
        await upsertLead({
            name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
            phone: data.phone,
            email: data.email,
            service: data.service,
            source: "booking",
            refId: docRef.id,
        });
        return docRef.id;
    } catch (err) {
        console.error("[iLovah] saveBooking error:", err);
        throw err;
    }
}

// ══════════════════════════════════════════════════════════════
// saveQuote
// ══════════════════════════════════════════════════════════════
export async function saveQuote(data) {
    try {
        const docRef = await addDoc(collection(db, COLLECTIONS.QUOTES), {
            ...data,
            status: "new",
            createdAt: serverTimestamp(),
        });
        await upsertLead({
            name: data.firstName,
            phone: data.phone,
            email: data.email,
            service: data.service,
            source: "quote",
            refId: docRef.id,
        });
        return docRef.id;
    } catch (err) {
        console.error("[iLovah] saveQuote error:", err);
        throw err;
    }
}

/* ──────────────────────────────────────────────────────────────
   FIRESTORE SECURITY RULES
   (paste into Firebase Console → Firestore → Rules)

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /bookings/{doc} {
         allow create: if true;
         allow read, update, delete: if request.auth != null;
       }
       match /quotes/{doc} {
         allow create: if true;
         allow read, update, delete: if request.auth != null;
       }
       match /leads/{doc} {
         allow create, update: if true;
         allow read, delete: if request.auth != null;
       }
       match /blogPosts/{doc} {
         allow read: if true;
         allow create, update, delete: if request.auth != null;
       }
     }
   }

   STORAGE SECURITY RULES
   (paste into Firebase Console → Storage → Rules)

   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /blog/{allPaths=**} {
         allow read: if true;
         allow write: if true;
       }
     }
   }
──────────────────────────────────────────────────────────────── */