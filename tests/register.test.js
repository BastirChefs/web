import {expect, test} from 'vitest'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFKCHCg-GsWil4dywv05qZ_XUWJk_FW20",
  authDomain: "bastirchef-3aeef.firebaseapp.com",
  projectId: "bastirchef-3aeef",
  storageBucket: "bastirchef-3aeef.appspot.com",
  messagingSenderId: "353788783151",
  appId: "1:353788783151:web:45765e2f49dd4dac1334da"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

test('Existing Email', async () => {
    let result = null;
    await createUserWithEmailAndPassword(getAuth(),'existingEmail@gmail.com', 'anyPassword').catch((error) => {
        result = error;
    });
    expect(result.code).toBe('auth/email-already-in-use')
})

test('Not an Email', async () => {
    let result = null;
    await createUserWithEmailAndPassword(getAuth(),'notAnEmail', 'anyPassword').catch((error) => {
        result = error;
    });
    expect(result.code).toBe('auth/invalid-email')
})