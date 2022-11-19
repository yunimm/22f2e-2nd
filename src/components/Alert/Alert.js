import Swal from 'sweetalert2';

const AlertTwoButton = (btnText, title, text, cb) => {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: text,

    showDenyButton: false,
    showCancelButton: true,

    // 取消
    confirmButtonText: '取消',
    // 確認
    cancelButtonText: btnText,
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
