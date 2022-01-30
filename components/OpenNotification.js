import { toast } from "react-toastify";

export const openNotificationWithIcon = (type, message, description) => {
  if (type === "info") {
    toast.info(description);
  } else if (type === "success") {
    toast.success(description);
  } else {
    toast.warning(description);
  }
};

// export const openNotificationWithIcon = (
//   type,
//   message,
//   description,
//   background = "black",
//   color = "white"
// ) => {
//   notification[type]({
//     message,
//     description,
//     style: {
//       background,
//       color,
//     },
//     className: "notification",
//   });
// };
