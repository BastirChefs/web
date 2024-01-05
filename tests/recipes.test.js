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
test('Get Recipe with valid Id', async () => {
    const validRecipeId = 'qmP5EGuYSnkIyzDoAslM';
    const docRef = doc(db, "recipes", validRecipeId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.exists()).toBe(true);
})

test('Check if the right recipe is get', async () => {
    const validRecipeId = 'qmP5EGuYSnkIyzDoAslM';
    const docRef = doc(db, "recipes", validRecipeId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.id).toBe(validRecipeId);
})

test('Get chicken nugget', async () => {
    const validRecipeId = 'qmP5EGuYSnkIyzDoAslM';
    const docRef = doc(db, "recipes", validRecipeId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().recipeName).toBe("Chicken Nugget");
})

test('Get ingredient with invalid Id', async () => {
    const validRecipeId = '0qmP5EGuYSnkIyzDoAslM';
    const docRef = doc(db, "recipes", validRecipeId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.exists()).toBe(false);
})

test('Report Recipe', async () => {
    const validRecipeId = 'qmP5EGuYSnkIyzDoAslM';
    const docRef = doc(db, "recipes", validRecipeId);
    await updateDoc(docRef, {
        isReported: true
    });
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().isReported).toBe(true);
})

test('Remove Report from Recipe', async () => {
    const validRecipeId = 'qmP5EGuYSnkIyzDoAslM';
    const docRef = doc(db, "recipes", validRecipeId);
    await updateDoc(docRef, {
        isReported: false
    });
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().isReported).toBe(false);
})
/* test('Delete ingredient', async () => {
    const recipeId = 'qmP5EGuYSnkIyzDoAslM';
    const docRef = doc(db, "recipes", recipeId);
    await deleteDoc(docRef);
    const docSnap = await getDoc(docRef);
    expect(docSnap.exists()).toBe(false);
}) */