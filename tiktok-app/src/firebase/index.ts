// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAB4NtMPHCA4uNJ0fY6D8V82LIW3L6yw6k",
    authDomain: "mocktiktok-f444b.firebaseapp.com",
    projectId: "mocktiktok-f444b",
    storageBucket: "mocktiktok-f444b.appspot.com",
    messagingSenderId: "427042367630",
    appId: "1:427042367630:web:bbc88d28e845f3eb8201df",
    measurementId: "G-2RG6MQFMZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
