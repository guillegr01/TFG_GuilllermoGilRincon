import { useEffect, useState } from "react";
import { getClientApi } from "../api/client";


/**
 * * useDashboard
 * @param userId 
 * @returns 
 */
export function useDashboard(userId: string) {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const res = await getClientApi(`/dashboard/user/${userId}`);
                setData(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboard();
    }, [userId]);

    return { data, loading };

}