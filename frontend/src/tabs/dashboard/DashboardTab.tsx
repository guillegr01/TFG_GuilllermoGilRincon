import { useDashboard } from "@/src/hooks/useDashBoard";
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView  } from "react-native";
import { useNavigation } from "@react-navigation/native";

//Components
import GlucoseCard from "../../components/dashboardComps/GlucoseCard";
import GlucoseRegisterChart from "../../components/dashboardComps/GlucoseRegistersChart";
import MealItem from "@/src/components/mealsComponents/mealItem";


/**
 * * DashboardTab
 * @returns 
 */
export default function DashboardTab() {

    const navigation = useNavigation<any>();

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
        <ScrollView contentContainerStyle={styles.container}>

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

            {meal && (
            <>
                <View>
                    <Text>Last Meal</Text>
                    <MealItem meal={meal} onEdit={() => {}} onDelete={() => {}} showMenu={false}/>
                </View>
            </>
            )}

            <TouchableOpacity style={styles.addMealBtn} onPress={() => navigation.navigate("AddMeal")}>
                <Text style={styles.addMealBtnText}>+</Text>
            </TouchableOpacity>

        </ScrollView>
        
    );
}

//styles for DashBoard tab
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 120,
        paddingTop: 20
    },
    addMealBtn: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#10B981",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5
    },
    addMealBtnText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    }
});


