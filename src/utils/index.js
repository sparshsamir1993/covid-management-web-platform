export const checkAndUpdateTokens = (token, refreshToken) => {
  let storedToken = window.sessionStorage.getItem("token");
  let storedRefreshToken = window.sessionStorage.getItem("refreshToken");

  if (token !== storedToken) {
    window.sessionStorage.setItem("token", token);
  }
  if (refreshToken !== storedRefreshToken) {
    window.sessionStorage.setItem("refreshToken", refreshToken);
  }
  storedToken = window.sessionStorage.getItem("token");
  storedRefreshToken = window.sessionStorage.getItem("refreshToken");

  return { token: storedToken, refreshToken: storedRefreshToken };
};

export const checkStoredTokens = () => {
  let storedToken = window.sessionStorage.getItem("token");
  let storedRefreshToken = window.sessionStorage.getItem("refreshToken");

  if (storedRefreshToken && storedToken) {
    return { token: storedToken, refreshToken: storedRefreshToken };
  } else {
    return false;
  }
};
