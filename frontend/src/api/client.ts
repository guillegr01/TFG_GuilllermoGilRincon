
/**
 * * Create api client to connect front end with the backend
 */

//const API_URL = "http://192.168.0.19:3000";
const API_URL = "http://10.0.2.2:3000"; //For android

/**
 * * getClientApi
 * @param endpoint 
 * @returns 
 */
export async function getClientApi(endpoint: string) {
    const res = await fetch(`${API_URL}${endpoint}`);
    return res.json();
}