import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import AddClaim from "./screens/AddClaimScreen";
import { useState } from "react";

const Drawer = createDrawerNavigator();

export default function DrawerNav({ companies, addClaim, userLogged }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#F0F0F0" },
        headerTintColor: "#1D2530",
        drawerStyle: { backgroundColor: "#F0F0F0" },
      }}
    >
      <Drawer.Screen
        name="Início"
        options={{
          headerTitle: `Início - ${Platform.OS === "ios" ? "iOS" : "Android"}`,
        }}
      >
        {() => <HomeScreen companies={companies} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Adicionar Reclamação"
        options={{
          headerTitle: `Adicionar Reclamação - ${
            Platform.OS === "ios" ? "iOS" : "Android"
          }`,
        }}
      >
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
