import { View, Text, ActivityIndicator } from "react-native";
import { useStats } from "../../hooks/useStats";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";


export default function StatsTab() {

    const { stats, loading } = useStats("699c9b32d5e6e90cb3b09cf1");

    const screenWidth = Dimensions.get("window").width;

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!stats) {
        return (
            <View style={{ padding: 20 }}>
                <Text>No data available</Text>
            </View>
        );
    }

    const chartData = [
        {
            name: "Low",
            population: stats.low,
            color: "#ef4444"
        },
        {
            name: "In Range",
            population: stats.inRange,
            color: "#10b981"
        },
        {
            name: "High",
            population: stats.high,
            color: "#ffd900e3"
        },
        {
            name: "Very High",
            population: stats.veryHigh,
            color: "#fb923c"
        }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "#F9FAFB", alignItems: "center" }}>

            <View 
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
                    overflow: "hidden",
                }}
            >

                <PieChart
                    data={chartData}
                    width={screenWidth - 40}
                    height={250}
                    chartConfig={{
                        backgroundColor: "#F9FAFB",
                        backgroundGradientFrom: "#F9FAFB",
                        backgroundGradientTo: "#F9FAFB",
                        color: () => `#000`
                    }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"85"}
                    hasLegend={false}
                />

            </View>

            <View style={{ marginTop: 30, alignItems: "center" }}>

                <View style={{ marginBottom: 15, alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ef4444" }}>{stats.low}%</Text>
                    <Text style={{ color: "#6B7280" }}>Low</Text>
                </View>

                <View style={{ marginBottom: 15, alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#10b981" }}>{stats.inRange}%</Text>
                    <Text style={{ color: "#6B7280" }}>In Range</Text>
                </View>

                <View style={{ marginBottom: 15, alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffd900e3" }}>{stats.high}%</Text>
                    <Text style={{ color: "#6B7280" }}>High</Text>
                </View>

                <View style={{ marginBottom: 15, alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fb923c" }}>{stats.veryHigh}%</Text>
                    <Text style={{ color: "#6B7280" }}>Very High</Text>
                </View>

            </View>

        </View>
    );
}