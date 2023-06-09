import { useNavigation } from "@react-navigation/native";
import {
  Select,
  Box,
  CheckIcon,
  Center,
  Input,
  TextArea,
  Button,
  NativeBaseProvider,
} from "native-base";
import { useState } from "react";

export default function AddClaim({ companies, addClaim, userLogged }) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [claim, setClaim] = useState("");
  const navigation = useNavigation();

  const handleResetInputs = () => {
    setSelectedCompany("");
    setClaim("");
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Box maxW="300">
          <Select
            selectedValue={selectedCompany}
            minWidth="90%"
            marginY={2.5}
            accessibilityLabel="Escolha uma empresa"
            placeholder="Escolha uma empresa"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setSelectedCompany(itemValue)}
          >
            {companies.map((item) => (
              <Select.Item label={item.nome} value={item.nome} key={item.id} />
            ))}
          </Select>
          <Input
            placeholder="Nome"
            w="100%"
            marginY={2.5}
            value={userLogged.nome}
            editable={false}
          />
          <Input
            placeholder="Sobrenome"
            w="100%"
            marginY={2.5}
            value={userLogged.sobrenome}
            editable={false}
          />
          <Input
            placeholder="@username"
            w="100%"
            marginY={2.5}
            value={userLogged.username}
            editable={false}
          />
          <TextArea
            h={20}
            placeholder="Escreva sua reclamação"
            w="75%"
            maxW="300"
            marginY={2.5}
            value={claim}
            onChangeText={setClaim}
          />
          <Button
            onPress={() => {
              if (selectedCompany !== "" && claim.trim() !== "") {
                addClaim(
                  selectedCompany,
                  claim,
                  userLogged.nome,
                  userLogged.sobrenome,
                  userLogged.username
                );
                handleResetInputs();
                navigation.goBack();
              } else {
                selectedCompany === ""
                  ? alert("Selecione a empresa")
                  : alert("Escreva uma reclamação");
              }
            }}
            marginY={2.5}
          >
            Enviar reclamação
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
