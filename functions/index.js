const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');

// Initialize Firebase Admin (only once)
if (admin.apps.length === 0) {
    admin.initializeApp();
}

/**
 * Uppercases messages.original field when a new document is created in Firestore.
 * This is an example from the user's provided tutorial.
 */
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
        const original = snap.data().original;
        if (!original) {
            console.log('No "original" field found in document', context.params.documentId);
            return null;
        }

        console.log('Uppercasing', context.params.documentId, original);
        const uppercase = original.toUpperCase();

        // Update the document with the uppercase version
        return snap.ref.set({ uppercase }, { merge: true });
    });
