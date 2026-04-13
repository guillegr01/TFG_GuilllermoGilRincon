import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MealsTab from "../tabs/meals/MealsTab";
import AddMealTab from "../tabs/meals/AddMealTab";

const Stack = createNativeStackNavigator();

export default function MealsStack() {

    return (

        <Stack.Navigator>
            <Stack.Screen name="Meals Tab" component={MealsTab} />
            <Stack.Screen name="Add Meal Tab" component={AddMealTab} />
        </Stack.Navigator>

    );

}