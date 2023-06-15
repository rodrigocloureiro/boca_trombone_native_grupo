import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./pages/screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import DrawerNav from "./pages/DrawerNav";
import LoginScreen from "./pages/screens/LoginScreen";
import InfoCompany from "./pages/screens/InfoCompany";
import mockLogin from "./pages/screens/assets/mockLogin.json";
import data from "./pages/screens/assets/data.json";
import * as Location from "expo-location";

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLogged, setIsLogged] = useState(null);
  const [companies, setCompanies] = useState(data);
  const [users, setUsers] = useState(mockLogin);
  const [userLogged, setUserLogged] = useState("");
  const [regionName, setRegionName] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização negada!");
      } else {
        let location = await Location.getCurrentPositionAsync();
        console.log(location);
        const regionName = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setRegionName(...regionName);
      }
    })();
    const interval = setInterval(() => setAppIsReady(true), 1000);
    return () => clearInterval(interval);
  }, []);

  const addClaim = async (
    selectedCompany,
    claim,
    nome,
    sobrenome,
    username
  ) => {
    console.log(regionName);
    alert("Reclamação enviada!");
    const date = new Date();
    setCompanies(
      companies.map((item) => {
        return item.nome === selectedCompany
          ? {
              ...item,
              reclamacoes: [
                ...item.reclamacoes,
                {
                  data: date.toISOString().replaceAll("-", "/").split("T")[0],
                  horario: date.toLocaleTimeString(),
                  id: item.reclamacoes.length + 1,
                  nome: nome,
                  reclamacao: claim,
                  sobrenome: sobrenome,
                  status: "Aberta",
                  username: username,
                  location:
                    errorMsg !== null
                      ? errorMsg
                      : `${regionName.subregion} - ${regionName.region}`,
                },
              ],
            }
          : item;
      })
    );
  };

  const handleLogin = (username, password) => {
    const isUserFound = users.some(user => user.username === username && user.senha === password);
    const tempUser = users.find(user => user.username === username && user.senha === password);
    isUserFound ? (setUserLogged(tempUser), setIsLogged(true)) : setIsLogged(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!appIsReady && !isLogged && (
          <Stack.Screen name="Splash" component={SplashScreen} />
        )}
        {!isLogged && (
          <Stack.Screen name="Login">
            {() => (
              <LoginScreen handleLogin={handleLogin} isLogged={isLogged} setIsLogged={setIsLogged} />
            )}
          </Stack.Screen>
        )}
        <Stack.Screen name="Home">
          {() => (
            <DrawerNav
              companies={companies}
              addClaim={addClaim}
              userLogged={userLogged}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Info Company"
          options={{ title: "Perfil da Empresa", headerShown: true }}
          component={InfoCompany}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
