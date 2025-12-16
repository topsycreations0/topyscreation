// API base URL for Firebase Functions (deployed or emulator)
// Override via Vite env: VITE_API_BASE_URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://<region>-topsy-creations.cloudfunctions.net";

// For emulator, set VITE_API_BASE_URL=http://localhost:5001/topsy-creations/<region>

