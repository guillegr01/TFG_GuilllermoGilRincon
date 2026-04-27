import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorTab from "./NavigatorTab";
import AddMealTab from "../tabs/meals/AddMealTab";
import EditMealTab from "../tabs/meals/EditMealTab";
import TherapyTab from "../tabs/settings/therapyTab";

const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
        <Stack.Navigator>
            {/* Main tabs */}
            <Stack.Screen name="MainTabs" component={NavigatorTab} options={{ headerShown: false }} />

            {/*AddMeal tab*/}
            <Stack.Screen name="AddMeal" component={AddMealTab} options={{headerShown: false, title: "Add Meal"}}/>

            {/*EditMeal Tab*/}
            <Stack.Screen name="EditMeal" component={EditMealTab} options={{headerShown: false, title:"Edit Meal"}}/>

            <Stack.Screen name="TherapyInfo" component={TherapyTab} options={{headerShown: false, title: "My Therapy"}}/>

        </Stack.Navigator>
    );
}