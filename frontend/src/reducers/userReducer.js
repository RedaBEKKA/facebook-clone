import React from "react";

export default function userReducer(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;

    default:
      break;
  }
}