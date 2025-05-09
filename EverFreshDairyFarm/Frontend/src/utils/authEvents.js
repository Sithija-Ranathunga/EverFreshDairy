export const notifyLogin = () => {
  window.dispatchEvent(new Event("login"));
  // Also trigger storage event for cross-component communication
  localStorage.setItem("_authEvent", Date.now().toString());
  localStorage.removeItem("_authEvent");
};

export const notifyLogout = () => {
  window.dispatchEvent(new Event("logout"));
  // Also trigger storage event for cross-component communication
  localStorage.setItem("_authEvent", Date.now().toString());
  localStorage.removeItem("_authEvent");
};
