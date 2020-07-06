export const checkResponseAuthHeaders = (headers) => {
  console.log(headers);
  if (headers.token && headers["refresh-token"]) {
    return checkAndUpdateTokens(headers.token, headers["refresh-token"]);
  } else {
    return false;
  }
};

export const checkAndUpdateTokens = (token, refreshToken) => {
  let storedToken = window.sessionStorage.getItem("token");
  let storedRefreshToken = window.sessionStorage.getItem("refreshToken");

  //   debugger;
  if (token && token.split(" ").length > 1) {
    token = token.split(" ")[1];
  }
  if (token && token !== storedToken) {
    window.sessionStorage.setItem("token", token);
    console.log("\n\n refreshing token \n\n");
  }
  if (refreshToken && refreshToken !== storedRefreshToken) {
    window.sessionStorage.setItem("refreshToken", refreshToken);
    console.log("\n\n refreshing refreshToken \n\n");
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

export const getHeaderConfigWithTokens = () => {
  let tokens = checkStoredTokens();
  if (tokens) {
    let config = {
      headers: {
        authorization: `JWT ${tokens.token}`,
        "refresh-token": tokens.refreshToken,
      },
    };
    return config;
  } else {
    return false;
  }
};
