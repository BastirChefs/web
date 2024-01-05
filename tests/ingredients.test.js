import {expect, test} from 'vitest'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'; 
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
const db = getFirestore();
test('Get ingredient with valid Id', async () => {
    const validIngredientId = '1vP2oH86TTC3x30Khjqk';
    const docRef = doc(db, "ingredients", validIngredientId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.exists()).toBe(true);
})

test('Check if the right ingredients is get', async () => {
    const validIngredientId = '1vP2oH86TTC3x30Khjqk';
    const docRef = doc(db, "ingredients", validIngredientId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.id).toBe(validIngredientId);
})

test('Get chicken breast', async () => {
    const validIngredientId = '1vP2oH86TTC3x30Khjqk';
    const docRef = doc(db, "ingredients", validIngredientId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().name).toBe("chicken breast");
})

test('Get ingredient with invalid Id', async () => {
    const validIngredientId = '01vP2oH86TTC3x30Khjqk';
    const docRef = doc(db, "ingredients", validIngredientId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.exists()).toBe(false);
})

test('Verify ingredient', async () => {
    const invalidIngredient = '9bbUladbPjOfYtKJPYCP';
    const docRef = doc(db, "ingredients", invalidIngredient);
    await updateDoc(docRef, {
        isVerified: true
    });
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().isVerified).toBe(true);
})

/* test('Delete ingredient', async () => {
    const ingredientId = '1vP2oH86TTC3x30Khjqk';
    const docRef = doc(db, "ingredients", ingredientId);
    await deleteDoc(docRef);
    const docSnap = await getDoc(docRef);
    expect(docSnap.exists()).toBe(false);
}) */