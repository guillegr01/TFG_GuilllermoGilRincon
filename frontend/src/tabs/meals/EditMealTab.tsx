import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { putClientApi } from "../../api/client";


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
            Alert.alert("Success", "Meal updated correctly");
            //navigation.navigate("MainTabs", {screen: "Meals"});
            navigation.goBack();

        } catch (error) {
            Alert.alert("Error editing meal");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>

            {/* Header */}
            <View style={styles.headerEditMeal}>
                <TouchableOpacity style={styles.arrowBack} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Meal</Text>
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

                <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
                    <Text style={styles.saveText}>Edit Meal</Text>
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
    headerEditMeal: {
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