
import React,{useState} from "react";
import { TextField,Button } from "@mui/material";

const Form=(props)=>{
    const [examForm, setForm]=useState({regId:'',
                                       displayname:''})
    //handle form change event
    const handleChange=(event)=>{
        setForm({...examForm,[event.target.name]:event.target.value})
    }
    const handleForm=(event)=>{
      event.preventDefault();
     props.validate(examForm);

    }
return(
   <>
    <form   onSubmit={handleForm} className="form-container">
        
        <section className="input-group">
            
        <TextField className="textinput" required id="outlined-required" label="Display Name"
          defaultValue="timifrank" name="displayname" onChange={handleChange}  />
        </section>
        <section className="input-group">

        <TextField className="textinput" required id="outlined-required" label="Reg Id"
          defaultValue="111111" name="regId" onChange={handleChange}/>
          
        </section>
        <Button type="submit" variant="contained">Start Exam</Button>
        

    </form>

   </>
)

}
export default Form;
