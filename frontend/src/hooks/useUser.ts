import { useState, useEffect } from "react";
import { getClientApi } from "../api/client";

/**
 * * useUser
 * @param userId 
 */
export const useUser = (userId: string) => {

    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchUser = async () => {
            setLoading(true);
            try {
                const data = await getClientApi(`/user/${userId}`);
                setUser(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false)
            }
        };

        fetchUser();
    }, [userId]);

    return{ user, loading}

}