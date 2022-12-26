import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBeYVVITAzALMCamQW_Z6jaAFUIzIHjmpw",
  authDomain: "moneyflow-9c2ce.firebaseapp.com",
  projectId: "moneyflow-9c2ce",
  storageBucket: "moneyflow-9c2ce.appspot.com",
  messagingSenderId: "598549972405",
  appId: "1:598549972405:web:05e0b23bf66733f05645fc"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init servise
const projectFirestore = firebase.firestore()

export { projectFirestore }