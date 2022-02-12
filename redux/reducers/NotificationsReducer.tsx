import { NotificationsI } from "../interfaces";
import { UpdateNotifications } from "../types";

type Action = {
  type: string;
  payload: NotificationsI;
};

let initial: NotificationsI = {
  notifications: [],
  last_requested: null,
};



export const NotificationReducer = (
  state = initial,
  action: Action
): NotificationsI => {
  switch (action.type) {
    case UpdateNotifications:
      return action.payload;
    default:
      return state;
  }
};
