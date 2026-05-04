
/**
 * * Create api client to connect front end with the backend
 */

//export const API_URL = "http://192.168.0.19:3000";
export const API_URL = "https://glucocheck-7pr6.onrender.com"; //Deployment URL

/**
 * * getClientApi
 * @param endpoint 
 * @returns res.json()
 */
export const getClientApi = async (endpoint: string) => {
    const res: Response = await fetch(`${API_URL}${endpoint}`);
    if(!res.ok) throw new Error("Error getting data.");
    return res.json();
}

/**
 * * getStatsByUserIdClientApi
 * @param endpoint 
 * @param userId 
 * @param days
 * @returns res.json()
 */
export const getStatsByUserIdClientApi = async (endpoint: string, userId: string, days: number) => {
    const res: Response = await fetch(`${API_URL}${endpoint}/${userId}?days=${days}`);
    if(!res.ok) throw new Error("Error getting data.");
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
            body: JSON.stringify(body)
    });
    return res.json();
}

/**
 * * deleteClientApi
 * @param endpoint 
 * @param id 
 */
export const deleteClientApi = async (endpoint: string, id: string) => {
    const res: Response = await fetch(`${API_URL}${endpoint}/${id}`, {method: "DELETE"});
    if(!res.ok) throw new Error("Error deleting");
}


/**
 * * putClientApi
 * @param endpoint 
 * @param body 
 * @param id 
 */
export const putClientApi = async (endpoint: string, body: any, id:string) => {
    const res: Response = await fetch(`${API_URL}${endpoint}/${id}`, 
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
    });

    if(!res.ok) throw new Error("Error updating");
}

