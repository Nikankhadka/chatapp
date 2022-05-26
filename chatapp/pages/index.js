

export default function Index(){

  


  return(
    <div>

    < div className="main-container"> 
    <h3 id="head">Nikan Chat app</h3>

    <div className="child-container">



    {/* this is the div to hold messages that we get from user throgh database */}
    <div className="messages">


    </div>
    

   <div className="input">
    <input type="text" placeholder="Enter your message" id="input" className="text" onChange={(e)=>{
      console.log(e.target.value);
    }} />
    <button id="send" className="button">Send</button>
   </div>



   </div>
    


    </div>







    </div>
    
    )
}