import { toast } from "react-toastify";

const useToast = () => {

  const successToast = (message) => {
    toast.success(message, {
      icon: "✅", // Icon thành công
      className: "bg-white text-black font-medium !bg-white !text-black", // Màu nền và text
      position: "bottom-right", // Vị trí ở góc dưới bên phải
    });
  };

  const errorToast = (message) => {
    toast.error(message, {
      icon: "❌", // Icon lỗi
      className: "bg-white text-black font-medium !bg-white !text-black", // Màu nền và text
      position: "bottom-right", // Vị trí ở góc dưới bên phải
    });
  };

  const warningToast = (message) => {
    toast.warning(message, {
      icon: "⚠️", // Icon cảnh báo
      className: "bg-white text-black font-medium !bg-white !text-black", // Màu nền và text
      position: "bottom-right", // Vị trí ở góc dưới bên phải
    });
  };
  

  return { successToast, errorToast, warningToast };
};

export default useToast;
