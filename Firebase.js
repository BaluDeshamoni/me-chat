import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCnWVtEf_ZGN6c4Lt0yQH34eHArjiWGpak",
    authDomain: "signal-clone-7f371.firebaseapp.com",
    projectId: "signal-clone-7f371",
    storageBucket: "signal-clone-7f371.appspot.com",
    messagingSenderId: "296121707499",
    appId: "1:296121707499:web:22be0b3b33a861af6dc7ae"
  };

let app
if(firebase.apps.length ===0)
{
    app=firebase.initializeApp(firebaseConfig)
}
else
{
    app=firebase.app()
}
const auth=firebase.auth()
const db=app.firestore()
export { auth,db }