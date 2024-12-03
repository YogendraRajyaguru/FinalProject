  
  // import { initializeApp } from 'firebase/app';
  // import { getDatabase, ref, set, get } from 'firebase/database';

  // const firebaseConfig = {
  //   apiKey: "AIzaSyAUSiEhJz5dXYQyNxQc7ySxIfq4VzWSMHw",
  //   authDomain: "sdsds-ebdd9.firebaseapp.com",
  //   databaseURL: "https://sdsds-ebdd9-default-rtdb.firebaseio.com",
  //   projectId: "sdsds-ebdd9",
  //   storageBucket: "sdsds-ebdd9.appspot.com",
  //   messagingSenderId: "888532283103",
  //   appId: "1:888532283103:web:ad95eef5799bee39ef436a",
  //   measurementId: "G-FVH8MN0VTB"
  // };

  // const app = initializeApp(firebaseConfig);
  // const database = getDatabase(app);

  // export { database, ref, set, get };


  import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, push } from 'firebase/database'; // Added update

const firebaseConfig = {
  apiKey: "AIzaSyAUSiEhJz5dXYQyNxQc7ySxIfq4VzWSMHw",
  authDomain: "sdsds-ebdd9.firebaseapp.com",
  databaseURL: "https://sdsds-ebdd9-default-rtdb.firebaseio.com",
  projectId: "sdsds-ebdd9",
  storageBucket: "sdsds-ebdd9.appspot.com",
  messagingSenderId: "888532283103",
  appId: "1:888532283103:web:ad95eef5799bee39ef436a",
  measurementId: "G-FVH8MN0VTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Export Firebase utilities
export { database, ref, set, get, update, push };
