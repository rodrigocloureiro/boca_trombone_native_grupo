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

export default function InfoCompany({ route }) {
  const { nome, id, cnpj, imageURL, reclamacoes } = route.params;
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Box>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Image
              size="sm"
              resizeMode="contain"
              source={{
                uri: imageURL,
              }}
              alt={`Logo ${nome}`}
            />
            <Box>
              <Text
                fontSize="lg"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {nome}
              </Text>
              <Text
                fontSize="sm"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {cnpj}
              </Text>
            </Box>
          </Box>
          <FlatList
            data={reclamacoes}
            renderItem={({ item, index }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "muted.50",
                }}
                borderColor="muted.800"
                pl={["0", "4"]}
                pr={["0", "5"]}
                py="2"
              >
                <HStack
                  space={[2, 3]}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.reclamacao}
                    </Text>
                    <Text
                      color="coolGray.800"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.username}
                    </Text>
                    <Text
                      fontSize="sm"
                      bold
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color={item.status === "Aberta" ? "red.500" : "green.500"}
                    >
                      {item.status}
                    </Text>
                    <Text
                      fontSize="sm"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                    >
                      {item.data} - {item.horario}
                    </Text>
                    <Text
                      fontSize="sm"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                    >
                      {item.location}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
