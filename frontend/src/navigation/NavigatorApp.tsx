import { NavigationContainer } from "@react-navigation/native";
import NavigatorTab from "./NavigatorTab";

export default function NavigatorApp() {
    return (
        <NavigationContainer>
        <NavigatorTab />
        </NavigationContainer>
    );
}