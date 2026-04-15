import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL, putClientApi } from "../../api/client";


/**
 * * EditMealTab
 * @returns 
 */
export default function EditMealTab() {

    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const meal = route.params?.meal;

    // saving existing data for editable meal
    const [grams, setGrams] = useState(meal.grams.toString());
    const [glucoseValue, setGlucoseValue] = useState(meal.glucoseValue.toString());
    const [period, setPeriod] = useState(meal.period);
    const [description, setDescription] = useState(meal.description || "");

    const handleEdit = async () => {
        try {
        const body = {
            userId: meal.userId,
            grams: Number(grams),
            glucoseValue: Number(glucoseValue),
            period,
            description,
        };

        await putClientApi("/meals", body, meal.id);
        navigation.navigate("MainTabs", {screen: "Meals"});

        } catch (error) {
            console.error("Error editing meal:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Meal</Text>

            <TextInput
                value={grams}
                onChangeText={setGrams}
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                value={glucoseValue}
                onChangeText={setGlucoseValue}
                keyboardType="numeric"
                style={styles.input}
            />

            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <View style={styles.periodContainer}>
                {["desayuno", "comida", "merienda", "cena"].map((p) => (
                <TouchableOpacity
                    key={p}
                    style={[
                    styles.periodButton,
                    period === p && styles.periodSelected,
                    ]}
                    onPress={() => setPeriod(p as any)}
                >
                    <Text>{p}</Text>
                </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
                <Text style={styles.saveText}>Edit Meal</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: "#10B981",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    saveText: {
        color: "white",
        fontWeight: "bold",
    },
    periodContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    periodButton: {
        padding: 10,
        backgroundColor: "#E5E7EB",
        borderRadius: 8,
    },
    periodSelected: {
        backgroundColor: "#10B981",
    }
});