
import React, { useEffect,useState } from "react";


const Timer=(props)=>{
    const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
    // The data/time we want to countdown to
    const countDownDate = new Date()
    countDownDate.setSeconds(countDownDate.getSeconds()+ props.duration)
   
    
    // Run myfunc every second
    const timefunc = ()=> {

    const now = new Date().getTime();
    const timeleft=countDownDate - now
     
    // Calculating the days, hours, minutes and seconds left
     setDays(Math.floor(timeleft / (1000 * 60 * 60 * 24)));
     setHours(Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
     setMinutes(Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)));
     setSeconds(Math.floor((timeleft % (1000 * 60)) / 1000));
    
     if(timeleft<0){
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        document.querySelector('.question-form').requestSubmit()
     }
    }
    useEffect(() => {
        const interval = setInterval(() => timefunc(countDownDate), 1000);

        return () => clearInterval(interval);
      },[])
   
const styleGreen={
    "backgroundColor":"green"
}
const styleRed={
    "backgroundColor":"red"
}

return(
      <div className="timer" >
        <div className="timer-left">
           <p> Duration</p><p>{props.duration}</p>
        </div> 
       <div className="timer-right" style={seconds >10 ?styleGreen : styleRed}><p>Time Remaing</p>
       <p ><span className="timer-item">{days}</span> <span className="timer-item">{hours}</span> <span className="timer-item">{minutes}</span> <span className="timer-item">{seconds}</span></p>
       </div>
       </div>
    
)


}
export default Timer;