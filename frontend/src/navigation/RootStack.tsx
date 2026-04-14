import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorTab from "./NavigatorTab";
import AddMealTab from "../tabs/meals/AddMealTab";

const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
        <Stack.Navigator>
        {/* Main tabs */}
        <Stack.Screen name="MainTabs" component={NavigatorTab} options={{ headerShown: false }} />

        {/*AddMeal tab*/}
        <Stack.Screen
            name="AddMeal"
            component={AddMealTab}
            options={{title: "Add Meal", presentation: "fullScreenModal"}}
        />
        </Stack.Navigator>
    );
}