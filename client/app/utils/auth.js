import decode from "jwt-decode";

//class Authservice that will handle authentication tasks using JWT
class AuthService {
  //decodes the current JWT retrived from getToken() to extract user's profile info(payload from the token)
  getProfile() {
    //decode comes from the jwt-library
    return decode(this.getToken());
  }
  //checks whether the user is logged in by validating token
  loggedIn() {
    const token = this.getToken();
    //checks if the token exists and is not expired- returns true if both are met or otherwise false
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    //compares the expiration time to the current time
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      //if expired it removes the token from localStorage
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }
  //retrives the JWT from localstorage under id_token
  getToken() {
    return localStorage.getItem("id_token");
  }
  //stores the provided token idToken in localstorage under id_token
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    //redirects the user to homepage after login
    window.location.assign("/");
  }
  //removes the JWT from localstorage, effectively logging out the user
  logout() {
    localStorage.removeItem("id_token");
    //reloads the page to ensure the logout is reflected in the UI
    window.location.reload();
  }
}

export default new AuthService();
