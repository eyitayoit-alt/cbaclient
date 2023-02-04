<div><p className="question-option"><span>A</span><input type="radio" name={option[0]} value={option[0]} onChange={props.handleAnswers}/><span>{option[0]}</span></p>
<p className="question-option"><span>B</span><input type="radio" name={option[1]} value={option[1]} onChange={props.handleAnswers}/><span>{option[1]}</span></p>
<p className="question-option"><span>C</span><input type="radio" name={option[2]} value={option[2]} onChange={props.handleAnswers}/><span>{option[2]}</span></p>
<p className="question-option"><span>D</span><input type="radio" name={option[1]} value={option[3]} onChange={props.handleAnswers}/><span>{option[3]}</span></p>
</div>


function Exam(){
    let location = useLocation()
  
    const {display_name,reg_id}=location.state.msg
    
    const navigate=useNavigate();
  const[studentAns, setStudentAnswers]=useState([])
  const [appError,setError]=useState('');

const[examQuestion,setExam]=useState();

fetch("http://localhost:3080/exam")
  .then((response) => response.json())
  .then((data) =>{
    setExam(data)
  })
    .catch((error)=>{
      setError("Unable to Fetch Question at the Moment")
    })

    console.log(examQuestion)
function handleAnswers(event){

  setStudentAnswers({...studentAns,[event.target.name]:event.target.value})


}

function handleSubmit(){
  navigate('/scores',{state:{studentAns,quest,correct2,reg_id,display_name}})



}

let {Instruction,Questions}=examQuestion[0]
 
 
  const alpha=["A","B","C","D"]

let questcomponent=[];
let quest=[];
let option2=[]
let correct2=[];
for(let i=0; i<5;i++){

  let {question,option,correct}=Questions[randomNumber[i]]
  quest.push(question)
  option2.push(option)
  correct2.push(correct)
  questcomponent.push(<div key={i+2} className="question"><span>{i+1}</span><span>{question}</span></div>)

    for(let j=0; j<option.length;j++){
  
    questcomponent.push(<div  key={j*2}><p className="question-option"><span>{alpha[j]}</span><input type="radio" name={i+1} value={option[j]} onChange={handleAnswers}/><span>{option[j]}</span></p></div>)
    
    }
 


}
  return(
         <>  
              
       <div className="details"><span>Display name:{display_name}</span> <span>Reg Id:{reg_id}</span></div>
               
              <div className="questions-container scale-up-center">
                <form className="question-form" onSubmit={handleSubmit}>
               
    
                     <div>
                       <p className="exam-instructions"> {Instruction} </p>
                       </div>
                          {quest}

         
    <AlertDialog handleSubmit={handleSubmit}/>
     </form>
           </div>
           </> 
     )
    
      
    
      
  
    }



  
export  default Exam;