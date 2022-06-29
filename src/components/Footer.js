import React, {  useState } from "react";
import { Colors, Fonts } from "../constants";

export default function Footer(props) {
    const [dataBackParent] = useState(props.dataBackParent);
    
    return (
        <div  style={{display:'flex',left:0,right:0,bottom:0,justifyContent:'center',alignContent:'center',height:30,backgroundColor:dataBackParent.backColor}}>
            <p style={{color:'black',margin:'auto',fontSize:14, fontFamily:Fonts.UBUNTU}}>Powered By  <span style={{color:'green', fontWeight:"bold",cursor:'pointer', fontFamily:Fonts.UBUNTU}} onClick={()=> window.open("https://netcomcomputersindia.com/")} >  Netcom Computers Pvt Ltd</span></p>
        </div>
    )
}
