// SweetAlert.js

import Swal from 'sweetalert2';

const SweetAlert = {
  confirm(title, text, confirmButtonText, cancelButtonText) {
    console.log(title, text, confirmButtonText, cancelButtonText);
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText || 'Yes',
      cancelButtonText: cancelButtonText || 'No',
    });
  },
  success(message) {
    return Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
  },
  error(message) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  },
  warning(message) {
    return Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message,
    });
  },
};

export default SweetAlert;
