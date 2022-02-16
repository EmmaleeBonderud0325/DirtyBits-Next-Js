import { toast } from "react-toastify";

export const openNotificationWithIcon = (
  type: string,
  message: string,
  description: string
) => {
  if (type === "info") {
    toast.info(description);
  } else if (type === "success") {
    toast.success(description);
  } else {
    toast.warning(description);
  }
};
