import {expect, test} from 'vitest'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'; 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
const auth = getAuth();
const cloudUrl = 'https://europe-central2-bastirchef-3aeef.cloudfunctions.net'

test('Get User With Valid Id', async () => {
    const validUserId = 'X2UA8yOvZLPoKy2x3J0bwJpX2Dh2';
    const docRef = doc(db, "users", validUserId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.exists()).toBe(true);
})

test('Get User With Invalid Id', async () => {
    const invalidUserId = '0X2UA8yOvZLPoKy2x3J0bwJpX2Dh2';
    const docRef = doc(db, "users", invalidUserId);
    const docSnap = await getDoc(docRef);
    expect(docSnap.exists()).toBe(false);
})

test('Report User', async () => {
    const validUserId = 'X2UA8yOvZLPoKy2x3J0bwJpX2Dh2';
    const docRef = doc(db, "users", validUserId);
    await updateDoc(docRef, {
        isReported: true
    });
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().isReported).toBe(true);
})

test('Remove Report From User', async () => {
    const validUserId = 'X2UA8yOvZLPoKy2x3J0bwJpX2Dh2';
    const docRef = doc(db, "users", validUserId);
    await updateDoc(docRef, {
        isReported: false
    });
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().isReported).toBe(false);
})

test('Enable User', async () => {
    const id = 'F8kb3qVEj0b3Ap7P5f12AYfcBcG2';
    const adminId = 's43Wga60gxXqcFEzeg8hy2w19zu1'
    await fetch(cloudUrl + '/enableUser?userId=' + id + '&adminId=' + adminId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().isDisabled).toBe(false);
}, 60000)

test('Disable User', async () => {
    const id = 'F8kb3qVEj0b3Ap7P5f12AYfcBcG2';
    const adminId = 's43Wga60gxXqcFEzeg8hy2w19zu1'
    await fetch(cloudUrl + '/disableUser?userId=' + id + '&adminId=' + adminId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().isDisabled).toBe(true);
}, 60000)


/* test('Ban User', async () => {
    const id = 'F8kb3qVEj0b3Ap7P5f12AYfcBcG2';
    const adminId = 's43Wga60gxXqcFEzeg8hy2w19zu1'
    await fetch(cloudUrl + '/banUser?userId=' + id + '&adminId=' + adminId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    expect(docSnap.data().isDisabled).toBe(false);
}, 60000) */