import Swal from 'sweetalert2';

const AlertTwoButton = (btnText, title, text, cb) => {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    showDenyButton: false,
    showCancelButton: true,
    allowOutsideClick: false,
    // 取消
    confirmButtonText: '取消',
    // 確認
    cancelButtonText: btnText,
    customClass: {
      confirmButton: 'confirm-custom-row',
      cancelButton: 'cancel-custom-row',
    },
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isDismissed) {
      cb();
    } else {
      return;
    }
  });
};

export { AlertTwoButton };
