

import Swal from "sweetalert2";


export const CustomAlert = (title, text, icon) => {
  Swal.fire({ title: title, text: text, icon: icon, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33", })
    .then((willWarn) => {
      if (willWarn.isConfirmed) {
        // ok
      }
    });
};

