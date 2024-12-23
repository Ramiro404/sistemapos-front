import Swal from "sweetalert2";

export const useAlert = () => {
  const successAlert = (title: string) => {
    return Swal.fire({
      title: title,
      icon: "success",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
  };

  const confirmAlert = (title: string, description: string = "") => {
    return Swal.fire({
      title: title,
      text: description,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    });
  };

  const errorAlert = (title: string) => {
    return Swal.fire({
      title: title,
      showCloseButton: false,
      icon: "error",
      showDenyButton: false,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Aceptar",
    });
  };

  return { successAlert, confirmAlert, errorAlert };
};
