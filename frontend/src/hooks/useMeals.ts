import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getClientApi } from "../api/client";

/**
 * * useMeals
 * @param userId 
 * @returns 
 */
export function useMeals(userId: string) {

    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchMeals() {
        try {
            const res = await getClientApi(`/meals/user/${userId}`);
            setMeals(res);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            fetchMeals();
        }, [userId])
    );

    return { meals, loading };
}