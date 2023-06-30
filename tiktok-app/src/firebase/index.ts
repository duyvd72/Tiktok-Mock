// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// const firebaseConfig = {
//     apiKey: "AIzaSyAB4NtMPHCA4uNJ0fY6D8V82LIW3L6yw6k",
//     authDomain: "mocktiktok-f444b.firebaseapp.com",
//     projectId: "mocktiktok-f444b",
//     storageBucket: "mocktiktok-f444b.appspot.com",
//     messagingSenderId: "427042367630",
//     appId: "1:427042367630:web:bbc88d28e845f3eb8201df",
//     measurementId: "G-2RG6MQFMZK"
// };

const firebaseConfig = {
    apiKey: "AIzaSyB0HWtEpZarGTWRs-oCNmiLOf5cp7EKzk4",
    authDomain: "tiktokbackup-ea31b.firebaseapp.com",
    projectId: "tiktokbackup-ea31b",
    storageBucket: "tiktokbackup-ea31b.appspot.com",
    messagingSenderId: "513146849769",
    appId: "1:513146849769:web:3e52b267fb424c1a19e378",
    measurementId: "G-RRMWRQE2MR"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
