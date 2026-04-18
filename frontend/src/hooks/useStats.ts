import { useEffect, useState } from "react";
import { getByUserIdClientApi } from "../api/client";

/**
 * * useStats
 * @param userId 
 * @returns 
 */
export const useStats = (userId: string) => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
        try {
            const data = await getByUserIdClientApi("/stats/user", userId);
            setStats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchStats();
    }, []);

    return { stats, loading };
};