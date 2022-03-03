import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";
import 'dotenv';

initializeApp({
    credential:applicationDefault(),
});

const db = getFirestore(); 
export default {
    db,
};