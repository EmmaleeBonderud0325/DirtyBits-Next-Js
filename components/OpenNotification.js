import { notification } from "antd";

export const openNotificationWithIcon = (
  type,
  message,
  description,
  background = "black",
  color = "white"
) => {
  notification[type]({
    message,
    description,
    style: {
      background,
      color,
    },
    className: "notification",
  });
};
