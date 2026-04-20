import React, { useState } from "react";
import { View, Text, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useStats } from "../../hooks/useStats";
import { PieChart } from "react-native-chart-kit";

const { width: screenWidth } = Dimensions.get("window");

export default function StatsTab() {
    
    //save state for filters
    const [selectedDays, setSelectedDays] = useState(7);
    
    const { stats, loading } = useStats("699c9b32d5e6e90cb3b09cf1", selectedDays);

    const filterOptions = [
        { label: "24h", value: 1 },
        { label: "7d", value: 7 },
        { label: "30d", value: 30 },
    ];

    const chartData = [
        { name: "Low", population: stats?.low || 0, color: "#ef4444" },
        { name: "In Range", population: stats?.inRange || 0, color: "#10b981" },
        { name: "High", population: stats?.high || 0, color: "#ffd900" },
        { name: "Very High", population: stats?.veryHigh || 0, color: "#fb923c" }
    ];

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#F9FAFB" }} contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
            
            {/*Days Filter*/}
            <View style={{ 
                flexDirection: 'row', 
                backgroundColor: '#f3f4f6', 
                borderRadius: 12, 
                padding: 5, 
                marginTop: 25, 
                width: '90%',
                borderWidth: 1,
                borderColor: '#e5e7eb'
            }}>
                {filterOptions.map((elem) => (
                    <TouchableOpacity 
                        key={elem.value}
                        onPress={() => setSelectedDays(elem.value)}
                        style={{
                            flex: 1,
                            paddingVertical: 10,
                            backgroundColor: selectedDays === elem.value ? '#FFFFFF' : 'transparent',
                            borderRadius: 10,
                            alignItems: 'center',
                            shadowColor: selectedDays === elem.value ? "#000" : "transparent",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            elevation: selectedDays === elem.value ? 3 : 0,
                        }}
                    >
                        <Text style={{ 
                            fontWeight: selectedDays === elem.value ? 'bold' : '500', 
                            color: selectedDays === elem.value ? '#10b981' : '#6B7280' 
                        }}>
                            {elem.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/*Graphic*/}
            <View style={{ width: screenWidth, height: 250, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <PieChart
                    data={chartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={(screenWidth / 4).toString()}
                    hasLegend={false}
                    absolute
                />
            </View>

            <Text style={{ fontSize: 18, fontWeight: "700", color: "#374151", marginBottom: 25 }}>
                Glucose Graphic Info
            </Text>

            {/*Glucose legend*/}
            <View style={{ alignItems: "center", width: "100%" }}>
                {chartData.map((item, index) => (
                    <View key={index} style={{ marginBottom: 20, alignItems: "center" }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", color: item.color }}>
                            {item.population}%
                        </Text>
                        <Text style={{ color: "#6B7280", fontSize: 14, fontWeight: "500" }}>{item.name}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}