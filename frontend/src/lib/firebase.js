/**
 * Firebase client SDK — lazy initialization.
 *
 * getFirebaseAuth() is only called when the user actually triggers phone OTP,
 * so missing / placeholder env vars don't crash the whole app at startup.
 *
 * Fill in frontend/.env:
 *   VITE_FIREBASE_API_KEY=...
 *   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
 *   VITE_FIREBASE_PROJECT_ID=your-project-id
 *   VITE_FIREBASE_APP_ID=...
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

let _auth = null;
let _rtdb = null;
let _firestore = null;
let _storage = null;
let _functions = null;

const getApp = () => {
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || '';
    const isPlaceholder = !apiKey ||
        apiKey.includes('REPLACE') ||
        apiKey.includes('your_firebase') ||
        apiKey.includes('demo') ||
        apiKey.includes('placeholder');

    if (isPlaceholder) {
        // Fallback for development if no keys are provided
        if (import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST) {
            return initializeApp({
                apiKey: "fake-api-key",
                projectId: "demo-nanospace",
                authDomain: "demo-nanospace.firebaseapp.com",
                storageBucket: "demo-nanospace.appspot.com",
                appId: "1:123:web:123"
            });
        }
        throw new Error('Firebase is not configured. Please add your API keys to .env');
    }

    const firebaseConfig = {
        apiKey,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    };

    return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
};

export function getFirebaseAuth() {
    if (_auth) return _auth;
    const app = getApp();
    _auth = getAuth(app);

    const emulatorHost = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST;
    if (emulatorHost) {
        connectAuthEmulator(_auth, `http://${emulatorHost}`);
        console.log(`Connected to Firebase Auth Emulator at ${emulatorHost}`);
    }
    return _auth;
}

/**
 * Sign in with Google using a popup.
 * Returns the Firebase credential result; call result.user.getIdToken() for the ID token.
 */
export async function signInWithGoogle() {
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(auth, provider);
}

/**
 * Send phone OTP using Firebase Phone Auth (invisible reCAPTCHA).
 * containerId must be the id of a <div> in the DOM.
 * Returns a ConfirmationResult — pass it to confirmPhoneOTPFirebase.
 */
export async function sendPhoneOTPFirebase(phone, containerId = 'recaptcha-container') {
    const auth = getFirebaseAuth();
    // Clear any previously rendered verifier so the div can be reused
    if (window._recaptchaVerifier) {
        try { window._recaptchaVerifier.clear(); } catch (_) {}
        window._recaptchaVerifier = null;
    }
    const verifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
    window._recaptchaVerifier = verifier;
    return signInWithPhoneNumber(auth, phone, verifier);
}

/**
 * Confirm a Firebase phone OTP.
 * Returns a UserCredential — call result.user.getIdToken() to get the ID token.
 */
export async function confirmPhoneOTPFirebase(confirmationResult, code) {
    return confirmationResult.confirm(code);
}

/**
 * Upload a file to Firebase Storage.
 * storagePath: e.g. 'listings/1234_photo.jpg'
 * Returns the public download URL.
 */
export async function uploadToFirebaseStorage(file, storagePath) {
    const storage = getFirebaseStorage();
    const storageRef = ref(storage, storagePath);
    await uploadBytesResumable(storageRef, file);
    return getDownloadURL(storageRef);
}

export function getFirebaseDatabase() {
    if (_rtdb) return _rtdb;
    const app = getApp();
    _rtdb = getDatabase(app);

    const emulatorHost = import.meta.env.VITE_FIREBASE_DATABASE_EMULATOR_HOST;
    if (emulatorHost) {
        connectDatabaseEmulator(_rtdb, '127.0.0.1', 9000);
        console.log(`Connected to Firebase Database Emulator at 127.0.0.1:9000`);
    }
    return _rtdb;
}

export function getFirebaseFirestore() {
    if (_firestore) return _firestore;
    const app = getApp();
    _firestore = getFirestore(app);

    const emulatorHost = import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST;
    if (emulatorHost) {
        const [host, port] = emulatorHost.split(':');
        connectFirestoreEmulator(_firestore, host || '127.0.0.1', parseInt(port) || 8080);
        console.log(`Connected to Firestore Emulator at ${emulatorHost}`);
    }
    return _firestore;
}

export function getFirebaseStorage() {
    if (_storage) return _storage;
    const app = getApp();
    _storage = getStorage(app);

    const emulatorHost = import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_HOST;
    if (emulatorHost) {
        const [host, port] = emulatorHost.split(':');
        connectStorageEmulator(_storage, host || '127.0.0.1', parseInt(port) || 9199);
        console.log(`Connected to Storage Emulator at ${emulatorHost}`);
    }
    return _storage;
}

export function getFirebaseFunctions(region = 'us-central1') {
    if (_functions) return _functions;
    const app = getApp();
    _functions = getFunctions(app, region);

    const emulatorHost = import.meta.env.VITE_FIREBASE_FUNCTIONS_EMULATOR_HOST;
    if (emulatorHost) {
        const [host, port] = emulatorHost.split(':');
        connectFunctionsEmulator(_functions, host || '127.0.0.1', parseInt(port) || 5001);
        console.log(`Connected to Cloud Functions Emulator at ${emulatorHost}`);
    }
    return _functions;
}
