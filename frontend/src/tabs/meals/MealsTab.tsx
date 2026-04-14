import { View, ActivityIndicator, StyleSheet , FlatList } from "react-native";
import { useMeals } from "@/src/hooks/useMeals";
import MealItem from "@/src/components/mealsComponents/mealItem";

export default function MealsTab() {

    const { meals, loading } = useMeals("699c9b32d5e6e90cb3b09cf1");

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
        
            <FlatList
                data={meals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MealItem meal={item} />}
            />

        </View>
    );
}

//styles for Meals list tab
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
    },
});