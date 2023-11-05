import React from 'react';
import Navbar from '../layout/nav';
function Chatbot(){
    return (
      <div>
      <section  className="flex gap-6">
   <Navbar/>
   <div className="h-screen flex-1 p-7">
           <h1 className="text-2xl font-semibold ">This is the Chatbot page</h1>
         </div>
         </section>
   
   </div>
    );

}
export default Chatbot;