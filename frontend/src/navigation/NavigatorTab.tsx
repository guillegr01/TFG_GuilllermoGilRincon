import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardTab from "../tabs/dashboard/DashboardTab";
import MealsTab from "../tabs/meals/MealsTab";
import StatsTab from "../tabs/stats/StatsTab";
import SettingsTab from "../tabs/settings/SettingsTab";

const Tab = createBottomTabNavigator();

export default function NavigatorTab() {
    return (
        <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardTab} />
        <Tab.Screen name="Meals" component={MealsTab} />
        <Tab.Screen name="Stats" component={StatsTab} />
        <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
    );
}