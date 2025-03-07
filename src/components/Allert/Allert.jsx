import Swal from "sweetalert2";

function Allert({ type = "success", message }) {
  const icon = type === "success" ? "success" : "error";

  // Show the alert when the component is rendered
  Swal.fire({
    title: type === "success" ? "Success!" : "Error!",
    text: message,
    icon: icon,
    confirmButtonText: "OK",
    confirmButtonColor: "#ff69b4", // Pink color
  });

  // Return null as there is no visible JSX to render
  return null;
}

export default Allert;
