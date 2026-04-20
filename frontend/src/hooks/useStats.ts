import { useEffect, useState } from "react";
import { getStatsByUserIdClientApi } from "../api/client";

/**
 * * useStats
 * @param userId 
 * @returns 
 */
export const useStats = (userId: string, days: number) => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
        try {
            const data = await getStatsByUserIdClientApi("/stats/user", userId, days);
            setStats(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchStats();
    }, [userId, days]);

    return { stats, loading };
};