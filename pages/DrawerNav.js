import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import AddClaim from "./screens/AddClaimScreen";
import { Platform } from "react-native";
import { useState, useLayoutEffect } from "react";

const Drawer = createDrawerNavigator();

export default function DrawerNav({ companies, addClaim, userLogged }) {
  const [plataforma, setPlataforma] = useState("");
  useLayoutEffect(() => {
    if (Platform.OS == "ios") return setPlataforma("IOS");
    if (Platform.OS == "android") return setPlataforma("Android");
    return setPlataforma("Web");
  }, []);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#F0F0F0" },
        headerTintColor: "#1D2530",
        drawerStyle: { backgroundColor: "#F0F0F0" },
      }}
    >
      <Drawer.Screen name={`Início - ${plataforma}`}>
        {() => <HomeScreen companies={companies} />}
      </Drawer.Screen>
      <Drawer.Screen name="Adicionar Reclamação">
        {() => (
          <AddClaim
            companies={companies}
            addClaim={addClaim}
            userLogged={userLogged}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
