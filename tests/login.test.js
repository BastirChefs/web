import {expect, test} from 'vitest'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'


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
test('Wrong password', async () => {
    let result = null;
    await signInWithEmailAndPassword(getAuth(),'necobabaAdmin@gmail.com', 'wrongPassword').catch((error) => {
        result = error;
    });
    expect(result.code).toBe('auth/invalid-credential')
})

test('Non-Existent Email', async () => {
    let result = null;
    await signInWithEmailAndPassword(getAuth(),'notNecobabaAdmin@gmail.com', 'wrongPassword').catch((error) => {
        result = error;
    });
    expect(result.code).toBe('auth/invalid-credential')
})

test('Invalid Email', async () => {
    let result = null;
    await signInWithEmailAndPassword(getAuth(),'notAnEmail', 'anyPassword').catch((error) => {
        result = error;
    });
    expect(result.code).toBe('auth/invalid-email')
})

test('Correct Email and Password', async () => {
    let result = null;
    await signInWithEmailAndPassword(getAuth(),'rightemail@gmail.com', 'rightPassword').then((userCredential) => {
        result = userCredential;
    });
    expect(result.user.email).toBe('rightemail@gmail.com');
})