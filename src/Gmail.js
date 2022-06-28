import React ,{useState}from 'react'
import {
   
    Button,
    TextareaAutosize,
    TextField,
    Typography,
   
  } from "@material-ui/core";
export default function Gmail() {

    const [sent, setsent] = useState(false)
    const [text, settext] = useState("")

    const handleSend=async()=>
    {
        setsent(true)
        try{
            await 
            text
        }
        catch(error)
        {
            console.log(error)
        }
    }
    return (
        <div>
            {!sent ?(
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center",marginTop:'150px'}}> 
          <form onSubmit={handleSend}>
              <Typography> Name<TextField variant="outlined" value={text} onChange={(e)=>{settext(e.target.value)}} /></Typography>
            <Typography> Email <TextField variant="outlined" /></Typography>
            <Typography> Message
                <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />
                </Typography>
            <Button>Send Message</Button>
           </form>
      </div>):(<Typography>Email Send</Typography>)}
      </div>
    )
}
