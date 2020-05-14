import * as actionType from "../actionTypes/actionTypes";

export const authStart = () => ({
  type: actionType.AUTH_START,
});

export const authSuccess = (token, id) => {
  expirationTimer();

  return {
    type: actionType.AUTH_SUCCESS,
    token,
    id,
  };
};

export const authFail = () => ({ type: actionType.AUTH_FAILURE });

export const authLogout = () => {
  localStorage.removeItem("chopbarh-token");
  localStorage.removeItem("chopbarh-id");

  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const expirationLogout = () => {
  localStorage.removeItem("chopbarh-token");
  localStorage.removeItem("chopbarh-id");

  window.location = "/";

  return {
    type: actionType.AUTH_LOGOUT,
  };
};

export const expirationTimer = () => {
  let time;
  window.onload = resetTimer;
  document.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onmousedown = resetTimer;
  document.ontouchstart = resetTimer;
  document.onclick = resetTimer;
  document.onscroll = resetTimer;
  document.onkeypress = resetTimer;

  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(expirationLogout, 1000 * 60 * 10);
  }
};
