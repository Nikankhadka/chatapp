import { useState } from "react";
import { firebaseConfig } from "../modules/firebaseconfig";
//importing necessary firebase modules and hooks for the chatapp
//these are firbase sdk
import { initializeApp } from "firebase/app";

import {  getFirestore } from "firebase/firestore";
import { getAuth,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";


//we can use order and limit to specify the order in which the documnets is going to be fetched
import {query,orderBy,limit} from "firebase/firestore";



//importing firebase react hooks

//this hook is used to authenticate user and get details of user
import {useAuthState} from "react-firebase-hooks/auth";
//this hook is used to get document data from collection in databasae 
import {useCollectionData} from "react-firebase-hooks/firestore";
import { useRef } from "react";





//since already imported the config obj  now initializing the app
const app=initializeApp(firebaseConfig);

//get auth function will contian all the necessary app and auth info return obj
const auth=getAuth();


//instance of db
const firestore=getFirestore(app);




export default function Index(){

  // using the useauthhook will return obj if user is signed in or null if user is not signed in
  const [user]=useAuthState(auth); 
  console.log("user ko details hai");
  console.log(user);


  return(
    <div>

    < div className="main-container"> 
    <h3 id="head">Nikan Chat app</h3>



    {/* conditionally rendering the compoenent here */}
      
      {user? <Mainchatbox/>:<Signin/>}


    </div>







    </div>
    
    )
}























//this is component
function Mainchatbox() {

  //message send by user gets update on every change
  const[message, setmessage] = useState("");

  //reference to firestore collection
    const collectionRef=collection(firestore,"messages");
  


  //now to fetch data from the database and keep the limit for the message that u want to fetch
  const q=query(collectionRef,orderBy("createdAt"),limit());
 
  //using usecollectiondata hook to get data from the database
  const [realmessage]=useCollectionData(q,{idFieldL:"id"});
  console.log(realmessage)

  var messageClass;

  //now to scroll the message
  const elementref=useRef(null);


  return(
    <div className="child-container">



    {/* this is the div to hold messages that we get from user throgh database */}
    <div className="messages">

    { 

    //when array of objects is fethed in the real message then only it is mapped else not
     realmessage&&realmessage.map(e=>{

       //changing the class of the div according to  the user id so the messae will be styled differently
       messageClass=e.uid=== auth.currentUser.uid ? 'sent' : 'received'
        return(
          <div className={`message ${messageClass}`}>
          <img src={e.photoURL}  />
          <p>{e.text}</p>
        </div>
        
          )
       

      })

    }

    {/* //creating dummy tag for scrooling   */}
    <div ref={elementref}>........</div>

    </div>
    

   <div className="input">
    <input type="text" value={message} placeholder="Enter your message" id="input" className="text" onChange={(e)=>{
      setmessage(e.target.value);
      
      
    }} />
    <button id="send" className="button" onClick={ async(e)=>{
    
      if(message==""){
        console.log("message lekh mog")
      }else{
          // cancels unnecessary rerenders
      e.preventDefault();
        //gettings userid and photo from auth
      const{uid,photoURL}=auth.currentUser;
    
      //creating a new doc in firestore collection
      addDoc(collectionRef,{
        text:message,
        createdAt:new Date(),
        uid:uid,
        photoURL:photoURL
      })
      console.log("message send")
      //resetting the message
      setmessage("");

      console.log(elementref.current);


      }
      
        
    }}>Send</button>
   </div>

   <button id="logout" className="button"  onClick={()=>{
      
     auth.signOut();
     
      


   }}>Logout</button>

   </div>
  )



}



//sign in componnent to allow use to signnin
 
function Signin(){

  return(


    <div>

    <button id="signin" onClick={()=>{
      
      // now using  google provider to sigin
      const provider=new GoogleAuthProvider();
      signInWithPopup(auth,provider).then( (result)=>{
        console.log("signiin ko result hai")
        console.log(result);



      })




    }}>
       Sign in with Google
    </button>

    </div>
  )
}
