
import React, { useCallback, useState } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

//Score component render and record scorec
const Scores=(props)=>{
  let scoresCount=0
   let location=useLocation();
   let navigate=useNavigate();
   //deconstruct  state
 const {studentAns,questionArr,reg_id,display_name} =location.state;
  const {msg,setMessage}=useState()
 const scoreLog=useCallback(()=>{
  const value={
    reg_id:reg_id,
    scores:scoresCount
 }
 //fetch call to backend
  fetch("https://cbtserver-7gfq.onrender.com/scores",{
 method:"POST",
 headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(value)
})
.then((response) => response.json())
  .catch((error)=>{
    setMessage("Unable to save scores at the Moment")
  })
},[scoresCount,reg_id])

const logout=useCallback(()=>{
  fetch("https://cbtserver-7gfq.onrender.com/logout",{
    method:"GET"
  })
  .then((response)=>{
    if(response.status===200){
      
     setMessage("Succesful Logout")
     location.state={ }
    }
  }).catch((error)=>{
   

  })

},[])

 // Extract student answer using reges and create a map keys
 
 const ansValue=Object.values(studentAns)
 const ansIndex= Object.keys(studentAns)
  const re=/\d+/
  const extAnswer=()=>{
    const ansMap= new Map()
    for(let i=0;i <ansIndex.length;i++){
      let ip=ansIndex[i].match(re)
      ansMap.set(ip[0],ansValue[i])    
  }
  return ansMap
}
 const answeredQ=extAnswer()
 



//handle Logout

 function handleLogout(){
  scoreLog();
  logout();
  navigate("/",{state:msg});
 }



  
  
 

 //set correct and wrong style  
  
  let correctChoice;
 const styleCorrect={
  "color":"green"
 }
 const styleWrong={
  "color":"red"
 }
return(
    <>
     <div className="details"><span><FaUserCircle />{display_name}</span> <span>{reg_id}</span></div>
               
            {msg && <div>{msg}</div>}
    <div  className="score-container scale-up-center" >
   
    
    <table className="exam-table">
    <caption>
      Exam Summary
   </caption>
 <thead>
   <tr>
 <th>S/N</th><th>Question</th><th>Correct Answers</th><th>Your Answers</th></tr></thead>
   <tbody>
   {
   questionArr.map((element,index)=>{
     correctChoice=answeredQ.get(index.toString())
      correctChoice===element.correct && scoresCount++
  return(
  <tr key={index+1}><td>{index+1}</td><td>{element.question}</td><td>{element.correct}</td><td className="test-result" style={correctChoice===element.correct?styleCorrect :styleWrong}>{correctChoice}</td></tr>
  )
  
})}
   </tbody>
   <tfoot>
   
   </tfoot>
</table>
<div className="score-display"><h2 className="resultCaption">Your Test Scores is {scoresCount * 10} out of {questionArr.length * 10}</h2></div>

<div className="decision"> <button className="logout" onClick={handleLogout}>Logout</button></div>
</div>
</>
)

}
export default Scores;
