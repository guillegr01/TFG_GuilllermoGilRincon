
/**
 * * Create api client to connect front end with the backend
 */

//const API_URL = "http://192.168.0.19:3000";
export const API_URL = "http://10.0.2.2:3000"; //For android

/**
 * * getClientApi
 * @param endpoint 
 * @returns res.json()
 */
export const getClientApi = async (endpoint: string) => {
    const res: Response = await fetch(`${API_URL}${endpoint}`);
    return res.json();
}

/**
 * * postClientApi
 * @param endpoint 
 * @returns res.json()
 */
export const postClientApi = async (endpoint: string, body: any) => {
    const res: Response = await fetch(`${API_URL}${endpoint}`, 
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return res.json();
}