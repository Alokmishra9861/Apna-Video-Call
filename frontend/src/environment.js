// Use named export for SERVER_URL and default export for compatibility.
const IS_PROD = true;

export const SERVER_URL = IS_PROD
  ? "https://apnacollegebackend-fnby.onrender.com"
  : "http://localhost:8000";

export default SERVER_URL;
