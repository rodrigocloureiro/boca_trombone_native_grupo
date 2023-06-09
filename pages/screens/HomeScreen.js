import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Box,
  FlatList,
  Heading,
  Image,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen({ companies }) {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Box>
          <FlatList
            data={companies.sort((a, b) =>
              b.reclamacoes.length - a.reclamacoes.length //(refatorado: Semelhamte a doc do W3Schools para maior clareza)
            )}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Info Company", item)}
              >
                <Box pl={["0", "4"]} pr={["0", "5"]} py="2">
                  <HStack
                    space={[2, 3]}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Image
                      size="sm"
                      resizeMode="contain"
                      source={{
                        uri: item.imageURL,
                      }}
                      alt={`Logo ${item.nome}`}
                    />
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color={index < 3 ? "#ff0000" : "coolGray.800"}
                        bold
                      >
                        {item.nome}
                      </Text>
                      <Text
                        color={index < 3 ? "#ff0000" : "coolGray.800"}
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {item.cnpj}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="sm"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color={index < 3 ? "#ff0000" : "coolGray.800"}
                    >
                      {item.reclamacoes.length}
                    </Text>
                  </HStack>
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
});
