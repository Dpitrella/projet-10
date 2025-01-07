export const setTokenCookie = (token) => {
    document.cookie = `token=${token}; path=/; HttpOnly; Secure; SameSite=Strict`;
  };
  
  export const getTokenFromCookie = () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  };
  
  export const removeTokenCookie = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };
  