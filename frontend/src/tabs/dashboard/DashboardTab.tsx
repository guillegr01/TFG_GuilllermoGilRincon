import { useDashboard } from "@/src/hooks/useDashBoard";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import GlucoseCard from "../../components/GlucoseCard";
import GlucoseRegisterChart from "../../components/GlucoseRegistersChart";


/**
 * * DashboardTab
 * @returns 
 */
export default function DashboardTab() {

    const { data, loading } = useDashboard("699c9b32d5e6e90cb3b09cf1");

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!data) {
        return <Text>Error loading data</Text>;
    }

    //saving main data from the api
    const glucose = data.glucoseRegisters?.[0]?.glucoseValue;
    const meal = data.meals?.[0];
    const limits = data.therapy.glucoseLimits;

    return (
        <View style={[styles.container, {paddingBottom: 40}]}>

            {glucose !== undefined && (
                <GlucoseCard
                value={glucose}
                low={limits.lowLimit}
                inRange={limits.inRangeLimit}
                high={limits.highLimit}
                veryHigh={limits.veryHighLimit}
                />
            )}

            <GlucoseRegisterChart 
                data={data.glucoseRegisters}
                low={limits.lowLimit}
                inRange={limits.inRangeLimit}
                high={limits.highLimit}
            />

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Last Meal</Text>
                <Text>Carbs: {meal?.grams ?? "-"}</Text>
                <Text>Bolus: {meal?.totalBolus ?? "-"}</Text>
                <Text>Period: {meal?.period ?? "-"}</Text>
            </View>

        </View>
    );
}

//styles for DashBoard tab
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
    },
    infoCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },
    infoTitle: {
        fontWeight: "bold",
        marginBottom: 10,
    },
});