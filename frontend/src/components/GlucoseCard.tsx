import { View, Text, StyleSheet } from "react-native";

//components props
type Props = {
    value: number;
    low: number;
    inRange: number;
    high: number;
    veryHigh: number;
};


/**
 * * GlucoseCard
 * @param { value, low, inRange, high, veryHigh }: Props 
 * @returns 
 */
export default function GlucoseCard({ value, low, inRange, high, veryHigh }: Props) {
    const getColor = () => {
        if (value < low) return "#ef4444"; 
        if (value <= inRange) return "#10b981"; 
        if (value <= high) return "#f1e425e3";
        if (value <= veryHigh) return "#fb923c";
        return "#fc9a2a"; 
    };

    return (
        <View style={[styles.card, { backgroundColor: getColor() }]}>
        <Text style={styles.label}>Last Glucose Value</Text>

        <Text style={[styles.value, { color: "white" }]}>
            {value}
        </Text>

        <Text style={styles.unit}>mg/dL</Text>
        </View>
    );
}


//styles sheet for glucose card component
const styles = StyleSheet.create({
    card: {
        borderWidth: 2,
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        color: "#ffffff",
    },
    value: {
        fontSize: 48,
        fontWeight: "bold",
    },
    unit: {
        fontSize: 14,
        color: "#ffffff",
    },
});