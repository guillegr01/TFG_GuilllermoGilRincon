import { useDashboard } from "@/src/hooks/useDashBoard";
import { View, Text, ActivityIndicator } from "react-native";


export default function DashboardTab() {

    const { data, loading } = useDashboard("699c9b32d5e6e90cb3b09cf1");

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!data) {
        return <Text>Error loading data</Text>;
    }

    return (
        <View style={{ padding: 20 }}>
            <Text>Dashboard</Text>
            
            <Text>
                Glucosa actual:{" "}
                {data.glucoseRegisters?.[0]?.glucoseValue || "No disponible"}
            </Text>

            <Text>
                Último bolus: {data.meals?.[0]?.totalBolus || "No disponible"}
            </Text>

            <Text>
                Carbohidratos: {data.meals?.[0]?.grams || "No disponible"}
            </Text>
        </View>
    );
}