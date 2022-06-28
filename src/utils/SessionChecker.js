
import { decodeToken, isExpired } from "react-jwt";

export const SessionChecker = () => {

  try{
    let token = sessionStorage.getItem('stsToken')
    console.log(token)
    if (isExpired(token)) {
      sessionStorage.removeItem('stsToken')
      return {success:false, message:""}
    }
    else {
      let decodedData = decodeToken(token)
      // settokenData(decodedData)
      console.log(decodedData)
      return {success:true, message:decodedData}
    }
  }
  catch(err){
    return {success:false, message:""}
  }
 
};

