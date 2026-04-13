import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getClientApi } from "../api/client";

/**
 * * useDashboard
 * @param userId 
 * @returns 
 */
export function useDashboard(userId: string) {

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchDashboard();
        }, [userId])
    );

    return { data, loading };

}