import React,{ useState,useEffect} from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLocation,useNavigate } from "react-router-dom";
import AlertDialog from "./Dialog";
import Timer from './Timer'





 //function to generate random number

const randomQT=(max,min)=>{
  let randNarr=[]
  for(let i=0;i <5;i++){
    let rand=Math.floor(Math.random()*(max-min)+min)
   if(randNarr.indexOf(rand)===-1){
    randNarr.push(rand)
   }
   else{
    i--
   }
      
  }
return randNarr
}
let randomNumber=randomQT(10,1)


 

//Exam Component
const Exam=()=>{
  let location = useLocation()
  const navigate=useNavigate()
  //state data passed from login page
  const {display_name,reg_id}=location.state.msg
  const [questionData, setQuestionData]=useState()
  const [appError, setError]=useState()
  const[studentAns, setStudentAnswers]=useState([])
  //fetch exam question from backend

useEffect(()=>{   
  fetch("https://cbtserver-7gfq.onrender.com/exam")
  .then((response) => response.json())
  .then((data) =>{
    if(data==="Unauthorised Access"){
    
      navigate("/",{state:{data}})
    }
    else{
    setQuestionData(data)
    }
  })
    .catch((error)=>{
      setError("Unable to Fetch Question at the Moment")
    })
  },[navigate])

  function handleAnswers(event){

    setStudentAnswers({...studentAns,[event.target.name]:event.target.value})
  
  
  }
  // handle submittion redirect to score
  
  let questionArr=[];
  const handleSubmit=(event)=>{
    event.preventDefault();
    
    //array to store question and correct anser
    
    
    navigate('/scores',{state:{studentAns,questionArr,reg_id,display_name}})
    setStudentAnswers("")
  }
 
    //handle user anser
    if(questionData){
          
             //deconstruct question array
          const{Instruction,Questions}= questionData[0]
          
          // generate 5 random question
          for(let i=0; i<5;i++){
            questionArr.push(Questions[randomNumber[i]])
            
          
           
          }
          
          

          


      
                return(
                  <>
                
                  <div className="details"><span><FaUserCircle />{display_name}</span> <span>{reg_id}</span></div>
                  
                  <div className="alert"> <Timer duration={20} /></div>
                  <div className="questions-container scale-up-center">
                    <form id="questions" onSubmit={handleSubmit}  className="question-form" >
                   
                    <div>
                       <p className="exam-instructions"> {Instruction} </p>
                       </div>
                        
                  { questionArr.map((element,index)=>{
                    return(<div key={index}><div key={index+1} className="question"><span>{index+1}</span><span>{element.question}</span></div>
                      <div key={index+2}><p className="question-option"><span>A</span><input type="radio" name={index+element.option[0]} value={element.option[0]}  onChange={handleAnswers}/><span>{element.option[0]}</span></p>
<p className="question-option"><span>B</span><input type="radio" name={index+element.option[0]} value={element.option[1]} onChange={handleAnswers}/><span>{element.option[1]}</span></p>
<p className="question-option"><span>C</span><input type="radio" name={index+element.option[0]} value={element.option[2]} onChange={handleAnswers}/><span>{element.option[2]}</span></p>
<p className="question-option"><span>D</span><input type="radio" name={index+element.option[0]} value={element.option[3]} onChange={handleAnswers}/><span>{element.option[3]}</span></p>
</div>      
                    </div>)
                   })}
                  
                   <AlertDialog  handleSubmit={handleSubmit}/>
                  
                   </form>
                   </div>
     </> 
    ) 
    
    
    }
    else{
     return (
      <div>{appError}</div>)
    }
   
  }




export default Exam;
