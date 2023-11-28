import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ToastContainer.defaultProps = {
//     position: "bottom-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     newestOnTop: false,
//     closeOnClick: true,
//     rtl: false,
//     pauseOnFocusLoss: true,
//     draggable: true,
//     pauseOnHover: true,
//   };

//   type toastifyProps = {
//     position: string,
//     theme: string,
//     autoClose: number

//   }

//   {
//     position: position,
//     theme: theme,
//     autoClose: 1000,
// }

export const notify = (message: string) => toast(message)
export const notifyError = (message: string) => toast.error(message)
export const notifySuccess = (message: string) => toast.success(message)
export const notifyWarning = (message: string) => toast.warning(message)



// export default Toastify