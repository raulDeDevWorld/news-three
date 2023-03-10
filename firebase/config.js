import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB9t1678VL9EZjZ5uT7jfQkLOVCJhL4xyY",
  authDomain: "hoy-bo-8b964.firebaseapp.com",
  databaseURL: "https://hoy-bo-8b964-default-rtdb.firebaseio.com",
  projectId: "hoy-bo-8b964",
  storageBucket: "hoy-bo-8b964.appspot.com",
  messagingSenderId: "551277367590",
  appId: "1:551277367590:web:c1ae3952ab6b3a63a7f1e7"
};

export const app = initializeApp(firebaseConfig)
