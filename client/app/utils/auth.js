import { jwtDecode } from "jwt-decode";

// AuthService handles authentication tasks using JWT
class AuthService {
  // Decodes the current JWT retrieved from getToken() to extract the user's profile info (payload from the token)
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  // Checks whether the user is logged in by validating the token
  loggedIn() {
    const token = this.getToken();
    console.log("This is the token ", token);
    // Checks if the token exists and is not expired. Returns true if both are met; otherwise, false
    return token && !this.isTokenExpired(token);
  }

  // Checks if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token", decoded);
      // Compares the expiration time to the current time (in seconds)
      if (decoded.exp < Date.now() / 1000) {
        // If expired, remove the token from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("id_token");
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Invalid token", error);
      return true; // Consider invalid token as expired
    }
  }

  // Retrieves the JWT from localStorage under "id_token"
  getToken() {
    // Ensure code runs only on the client
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("id_token");
      console.log("Retrieved token from localStorage:", token);
      //   return localStorage.getItem("id_token");
      return token;
    }
    return null; // No token available server-side
  }

  // Stores the provided token (idToken) in localStorage under "id_token"
  login(idToken) {
    if (typeof window !== "undefined") {
      localStorage.setItem("id_token", idToken);
      // Redirects the user to the homepage after login
      window.location.assign("/");
    }
  }

  // Removes the JWT from localStorage, effectively logging out the user
  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("id_token");
      // Reloads the page to ensure the logout is reflected in the UI
      window.location.reload();
    }
  }
}

export default new AuthService();
