import { useState, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { postClientApi } from "@/src/api/client";

export default function AddMealTab() {

    const navigation = useNavigation<any>();

  // savinf form states
    const [grams, setGrams] = useState("");
    const [glucoseValue, setGlucoseValue] = useState("");
    const [period, setPeriod] = useState<"desayuno" | "comida" | "merienda" | "cena">("comida");
    const [description, setDescription] = useState("");

    //for reset input fields
    useFocusEffect(
        useCallback(() => {
            setGrams("");
            setGlucoseValue("");
            setDescription("");
            setPeriod("comida");
        }, [])
    );

    //const API_URL = "http://10.0.2.2:3000"; // emulador

    // saving input body and fetch it
    const handleAdd = async () => {
        try {
            const body = {
                userId: "699c9b32d5e6e90cb3b09cf1",
                grams: Number(grams),
                glucoseValue: Number(glucoseValue),
                period: period,
                description: description,
            };

            await postClientApi("/meals", body);
            //navigation.navigate("MainTabs", {screen: "Meals"});
            navigation.goBack();

        } catch (error) {
            console.error("Error creating meal:", error);
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Add Meal</Text>

            {/*grams field input*/}
            <TextInput
                placeholder="Grams"
                keyboardType="numeric"
                value={grams}
                onChangeText={setGrams}
                style={styles.input}
            />

            {/*glucose value field input*/}
            <TextInput
                placeholder="Glucose value"
                keyboardType="numeric"
                value={glucoseValue}
                onChangeText={setGlucoseValue}
                style={styles.input}
            />

            {/*description field input*/}
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            {/*period field selector*/}
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
                    <Text style={styles.periodText}>{p}</Text>
                </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
                <Text style={styles.saveText}>Add Meal</Text>
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
    },
    periodText: {
        color: "#111",
    }
});