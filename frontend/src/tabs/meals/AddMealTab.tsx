import { useState, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { postClientApi } from "@/src/api/client";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddMealTab() {
    const navigation = useNavigation<any>();

    const [grams, setGrams] = useState("");
    const [glucoseValue, setGlucoseValue] = useState("");
    const [period, setPeriod] = useState<"desayuno" | "comida" | "merienda" | "cena">("comida");
    const [description, setDescription] = useState("");

    useFocusEffect(
        useCallback(() => {
            setGrams("");
            setGlucoseValue("");
            setDescription("");
            setPeriod("comida");
        }, [])
    );

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
            navigation.goBack();
        } catch (error) {
            console.error("Error creating meal:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>

            {/* Header */}
            <View style={styles.headerAddMeal}>
                <TouchableOpacity style={styles.arrowBack} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Meal</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>

                {/* Grams */}
                <Text style={styles.label}>Carbohydrates (grams)</Text>
                <TextInput style={styles.input} placeholder="e.g. 50" keyboardType="numeric" value={grams} onChangeText={setGrams} />

                {/* Glucose Value */}
                <Text style={styles.label}>Glucose Value</Text>
                <TextInput style={styles.input} placeholder="e.g. 120" keyboardType="numeric" value={glucoseValue} onChangeText={setGlucoseValue} />

                {/* Decsription */}
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} placeholder="e.g. Pasta" value={description} onChangeText={setDescription} />

                {/* Period */}
                <Text style={styles.label}>Period</Text>
                <View style={styles.periodContainer}>
                    {["desayuno", "comida", "merienda", "cena"].map((p) => (
                        <TouchableOpacity 
                            key={p} 
                            style={[styles.periodButton, period === p && styles.periodSelected]} 
                            onPress={() => setPeriod(p as any)}
                        >
                            <Text style={[styles.periodText, period === p && { color: '#FFF' }]}>{p}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
                    <Text style={styles.saveText}>Add Meal</Text>
                </TouchableOpacity>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: '#FFF' 
    },
    headerAddMeal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: Platform.OS === 'ios' ? 50 : 60, 
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6'
    },
    headerTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#1F2937',
        textAlign: "center"
    },
    arrowBack: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    container: { 
        flex: 1, 
        backgroundColor: "#F9FAFB" 
    },
    label: { 
        fontSize: 14, 
        fontWeight: '600', 
        color: '#6B7280', 
        marginBottom: 8, 
        marginTop: 10 
    },
    input: { 
        backgroundColor: "white", 
        padding: 15, 
        borderRadius: 12, 
        marginBottom: 15, 
        borderWidth: 1, 
        borderColor: '#E5E7EB' 
    },
    periodContainer: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginTop: 10 
    },
    periodButton: { 
        padding: 10, 
        borderRadius: 8, 
        backgroundColor: "#E5E7EB", 
        flex: 1, 
        marginHorizontal: 2, 
        alignItems: 'center' 
    },
    periodSelected: { 
        backgroundColor: "#10B981" 
    },
    periodText: { 
        fontSize: 12, 
        textTransform: 'capitalize', 
        color: '#374151' 
    },
    saveButton: { 
        backgroundColor: "#10B981", 
        padding: 16, 
        borderRadius: 12, 
        alignItems: "center", 
        marginTop: 30 
    },
    saveText: { 
        color: "white", 
        fontWeight: "bold", 
        fontSize: 16 
    }
});