import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardTab from "../tabs/dashboard/DashboardTab";
import MealsTab from "../tabs/meals/MealsTab";
import StatsTab from "../tabs/stats/StatsTab";
import SettingsTab from "../tabs/settings/SettingsTab";

const Tab = createBottomTabNavigator();

export default function NavigatorTab() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({

            tabBarActiveTintColor: "#10B981",
            tabBarInactiveTintColor: "gray",

            tabBarStyle: {
            backgroundColor: "#F9FAFB",
            borderTopWidth: 0,
            },

            tabBarIcon: ({ color, size, focused }) => {
            let iconName: any;

            if (route.name === "Dashboard") {
                iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Meals") {
                iconName = focused ? "restaurant" : "restaurant-outline";
            } else if (route.name === "Stats") {
                iconName = focused ? "stats-chart" : "stats-chart-outline";
            } else if (route.name === "Settings") {
                iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}
        >
            <Tab.Screen name="Dashboard" component={DashboardTab} />
            <Tab.Screen name="Meals" component={MealsTab} />
            <Tab.Screen name="Stats" component={StatsTab} />
            <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
    );
}