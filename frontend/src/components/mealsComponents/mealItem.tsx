import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function MealItem({ meal, onEdit, onDelete }: any) {

    const [open, setOpen] = useState(false);

    return (
        <View style={[styles.card, open && {zIndex:999}]}>
        
            {/* meal recicle view */}
            <View>
                <Text style={styles.title}>{meal.period}</Text>
                <Text>Carbs: {meal.grams}</Text>
                <Text>Bolus: {meal.totalBolus ?? "-"}</Text>
            </View>

            {/* options button */}
            <View>
                <TouchableOpacity onPress={() => setOpen(!open)}>
                    <Text style={styles.menu}>⋮</Text>
                </TouchableOpacity>

                {open && (
                <View style={styles.dropdown}>
                    <TouchableOpacity onPress={() => { setOpen(false); onEdit(meal)}}>
                        <Text>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setOpen(false); onDelete(meal.id)}}>
                        <Text style={{ color: "red" }}>Delete</Text>
                    </TouchableOpacity>
                </View>
                )}
            </View>

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
        position: "relative",
        zIndex: 1
    },
    title: {
        fontWeight: "bold",
        marginBottom: 5
    },
    menu: {
        fontSize: 20
    }, 
    dropdown: {
        position: "absolute",
        top: 30,
        right: 0,
        backgroundColor: "white",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        elevation: 5,
        zIndex: 999,
        minWidth: 100
    }
});