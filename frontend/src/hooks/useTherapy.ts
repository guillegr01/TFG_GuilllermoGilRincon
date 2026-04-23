import { useState, useEffect } from "react";
import { getClientApi } from "../api/client";

/**
 * * useTherapy
 * @param userId 
 */
export const useTherapy = (userId: string) => {

    const [therapy, setTherapy] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTherapy = async () => {
            setLoading(true);

            try {
                const data = await getClientApi(`/therapy/user/${userId}`);
                setTherapy(data);
            } catch (err) {
                console.error(err);
                setTherapy(null);
            } finally {
                setLoading(false);
            }
        }

        if(userId) fetchTherapy();

    }, [userId]);

    return { therapy, loading, setTherapy };

}