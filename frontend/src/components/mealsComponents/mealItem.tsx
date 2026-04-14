import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MealItem({ meal }: any) {
    return (
        <View style={styles.card}>
        
            <View>
                <Text style={styles.title}>{meal.period}</Text>
                <Text>Carbs: {meal.grams}</Text>
                <Text>Bolus: {meal.totalBolus ?? "-"}</Text>
            </View>

            {/* botón 3 puntos */}
            <TouchableOpacity>
                <Text style={styles.menu}>⋮</Text>
            </TouchableOpacity>

        </View>
    );
}

//styles for meals items
const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    menu: {
        fontSize: 20,
    }
});