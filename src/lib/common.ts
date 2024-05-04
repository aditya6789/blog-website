export function isAuthenticated() {
    const user = localStorage.getItem("user");
    return !!user; // Return true if user data exists, false otherwise
  }
  
  export function isAdmin() {
    return true;
  }
  
  export function getToken() {
    const token = localStorage.getItem("token");
    if (token) {
      return token;
    } else {
      return null;
    }
  }