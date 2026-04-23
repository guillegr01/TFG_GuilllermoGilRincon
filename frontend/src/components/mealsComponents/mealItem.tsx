import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function MealItem({ meal, onEdit, onDelete,showMenu = true }: any) {

    const [open, setOpen] = useState(false);


    const getPeriodColor = () => {
        switch (meal.period) {
            case "desayuno":
                return "#F59E0B";
            case "comida":
                return "#10B981";
            case "merienda":
                return "#3B82F6";
            case "cena":
                return "#8B5CF6";
            default:
                return "#6B7280";
        }
    };

    const getAndFormatTime = () => {
        const date = new Date(meal.date_hour);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return (
        <View style={[styles.card, open && { zIndex: 999 }]}>

            {/* meal header */}
            <View style={styles.header}>
                <View style={[styles.tag, { backgroundColor: getPeriodColor() }]}>
                    <Text style={styles.tagText}>{meal.period.toUpperCase()}</Text>
                </View>

                <Text style={styles.time}>{getAndFormatTime()}</Text>

                {showMenu && (
                <TouchableOpacity onPress={() => setOpen(!open)}>
                    <Text style={styles.menu}>⋮</Text>
                </TouchableOpacity>
                )}
            </View>

            {/* meal info */}
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.label}>Carbs</Text>
                    <Text style={styles.value}>{meal.grams} g</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Bolus</Text>
                    <Text style={styles.value}>{meal.totalBolus ?? "-"} U</Text>
                </View>
            </View>

            {/* meal description */}
            {meal.description && (
                <Text style={styles.description}>{meal.description}</Text>
            )}

            {/* dropdown */}
            {open && (
                <View style={styles.dropdown}>
                    <TouchableOpacity onPress={() => { setOpen(false), onEdit(meal)}}>
                        <Text style={styles.dropdownText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setOpen(false), onDelete(meal.id)}}>
                        <Text style={[styles.dropdownText, { color: "red" }]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    );
}

//styles for meals items
const styles = StyleSheet.create({
    card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    position: "relative",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },

    tagText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },

    time: {
        fontSize: 12,
        color: "#6B7280",
    },

    menu: {
        fontSize: 18,
    },

    content: {
        marginTop: 10,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },

    label: {
        color: "#6B7280",
    },

    value: {
        fontWeight: "bold",
    },

    description: {
        marginTop: 10,
        fontStyle: "italic",
        color: "#6B7280",
    },

    dropdown: {
        position: "absolute",
        top: 40,
        right: 10,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        elevation: 5,
        zIndex: 999,
    },

    dropdownText: {
        paddingVertical: 5,
    }
});