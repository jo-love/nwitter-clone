import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCtdkduQf0BBKXnF4DBeZVX080RDLLHHbI',
  authDomain: 'ntwitter-1695b.firebaseapp.com',
  projectId: 'ntwitter-1695b',
  storageBucket: 'ntwitter-1695b.appspot.com',
  messagingSenderId: '428001972870',
  appId: '1:428001972870:web:fcee4c9186fcfde013f707',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
