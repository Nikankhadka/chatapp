import { useState } from "react";
import { firebaseConfig } from "../modules/firebaseconfig";
//importing necessary firebase modules and hooks for the chatapp
//these are firbase sdk
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";





//importing firebase react hooks

//this hook is used to authenticate user and get details of user
import {useAuthState} from "react-firebase-hooks/auth";
//this hook is used to get document data from collection in databasae 
import {useCollectionData} from "react-firebase-hooks/firestore";





//since already imported the config obj  now initializing the app
firebase.initializeApp(firebaseConfig);

//create instance of firebase auth
const auth = firebase.auth();
//instance of db
const firestore=firebase.firestore();
//instance of analytics
const analytics = firebase.analytics();



export default function Index(){

  // using the useauthhook will return obj if user is signed in or null if user is not signed in
  const [user]=useAuthState(auth); 
  


  return(
    <div>

    < div className="main-container"> 
    <h3 id="head">Nikan Chat app</h3>



    {/* conditionally rendering the compoenent here */}
      
      <Signin />


    </div>







    </div>
    
    )
}





//sign in componnent to allow use to signnin
 
function Signin(){






  return(


    <div>

    <button id="signin" onClick={()=>{
      
      // now using  google provider to sigin
      const provider=new firebase.auth.GoogleAuthProvider();
      //auth to pop up the modal to signin
      auth.SigninwithPopup(provider); 




    }}>
       Sign in with Google
    </button>

    </div>
  )
}



















//this is component
function Mainchatbox() {


  const[message, setmessage] = useState("");

  return(
    <div className="child-container">



    {/* this is the div to hold messages that we get from user throgh database */}
    <div className="messages">


    </div>
    

   <div className="input">
    <input type="text" placeholder="Enter your message" id="input" className="text" onChange={(e)=>{
      setmessage(e.target.value);
      
    }} />
    <button id="send" className="button" onClick={()=>{
        console.log(message);
    }}>Send</button>
   </div>

   <button id="logout" className="button">Logout</button>

   </div>
  )



}
