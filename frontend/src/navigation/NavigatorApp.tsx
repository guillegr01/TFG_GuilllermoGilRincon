import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./RootStack";

export default function NavigatorApp() {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    );
}