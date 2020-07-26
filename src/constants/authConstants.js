export const ADMIN_ROLE = "ADMIN";
export const HOSPITAL_ADMIN_ROLE = "HOSPITAL-ADMIN";
export const USER_ROLE = "USER";
let API_BASE_URL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  API_BASE_URL = "http://localhost:5050/api/v1";
} else {
  API_BASE_URL = "http://localhost:1110/api/v1";
}

export { API_BASE_URL };
