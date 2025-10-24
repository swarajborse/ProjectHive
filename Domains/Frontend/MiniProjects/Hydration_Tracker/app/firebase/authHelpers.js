import { auth, db } from "./config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
// for google authetication

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        // result is an object which has user
        // check if user document exists in Firestore

        // creates a Firestore document reference and tells firebase where to look: eg userSettings/abc123
        const userDocRef = doc(db, "userSettings", user.uid);

        // fetches actual document data
        const userDoc = await getDoc(userDocRef);

        // create user doc with default values
        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                name: user.displayName || "",
                email: user.email,
                dailyGoal: 2000,
                buttonAmounts: [100, 200, 500],
                consumed: 0,
            });
        }

        return user;
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        throw error;
    }
};