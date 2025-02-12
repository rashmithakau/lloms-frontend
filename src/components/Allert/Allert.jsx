import Swal from "sweetalert2";

function Allert() {
  return (
    Swal.fire({
        title: "Success!",
        text: "Your order is placed",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff69b4", // Pink color
      })
  )
}

export default Allert