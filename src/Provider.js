import React, { useState } from "react";

export const OrderDressContext = React.createContext();

const Provider = (props) => {

  const [grantTotal, setGrantTotal] = useState(0);

  const [salwarDataCon, setSalwarDataCon] = useState([])

  console.log("context Executing")
  console.log(grantTotal)

  const aCallback = () => {
    setGrantTotal(0);
  };

  return (
    <OrderDressContext.Provider
      value={{
        grantTotal,
        updateGrantTotal: (grantTotal) => {
          setGrantTotal(grantTotal);
        },
        salwarDataCon,
        updateSalwarDataCon: (salwarDataCon) => {
          setSalwarDataCon(salwarDataCon);
        },
   
      }}
    >
      {props.children}
    </OrderDressContext.Provider>
  );
};

export default Provider;