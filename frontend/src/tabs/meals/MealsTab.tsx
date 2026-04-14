import { View, ActivityIndicator, StyleSheet , FlatList } from "react-native";
import { useMeals } from "@/src/hooks/useMeals";
import { deleteClientApi } from "@/src/api/client";
import MealItem from "@/src/components/mealsComponents/mealItem";
import { useState } from "react";

export default function MealsTab() {

    const { meals, setMeals, loading } = useMeals("699c9b32d5e6e90cb3b09cf1");
    const [_refresh, setRefresh] = useState(false);
    
    const handleDelete = async (id: string) => {
        try {
            
            await deleteClientApi("/meals",id);
            
            setMeals((prev: any[]) => prev.filter((m) => m.id !== id));

        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
        
            <FlatList
                data={meals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<MealItem meal={item} onDelete={handleDelete}/>)}
                contentContainerStyle = {{paddingBottom: 50}}
                style = {{overflow: "visible"}}
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