import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  KeyboardAvoidingView,
  Pressable,
  Icon,
  NativeBaseProvider,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function LoginScreen({ handleLogin, isLogged, setIsLogged }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const handleUsernameValidation = (value) => {
    setIsLogged(null);
    const pattern = /^(?=.*[A-Za-z0-9]$)([@])[A-Za-z\d.-]{2,15}$/;
    if (!pattern.test(value)) {
      setErrors({
        username: "3 a 15 caracteres. Deve começar com @",
      });
    } else {
      setErrors({ username: undefined });
      setUsername(value);
    }
  };

  const handlePasswordValidation = (value) => {
    setIsLogged(null);
    const pattern =
      /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$)/;
    if (!pattern.test(value)) {
      setErrors({
        password: "Deve ter pelo menos um símbolo, letra maiúscula e número",
      });
    } else {
      setErrors({ password: undefined });
      setPassword(value);
    }
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        h={{
          base: "100%",
          lg: "auto",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center w="100%" height="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Bem-vindo
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Entre para continuar!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  onChangeText={handleUsernameValidation}
                  placeholder="@username"
                  focusOutlineColor={errors.username !== undefined && "red.500"}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
                {errors.username !== undefined && (
                  <Text fontSize="xs" color="red.500">
                    {errors.username}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormControl.Label>Senha</FormControl.Label>
                <Input
                  onChangeText={handlePasswordValidation}
                  type={show ? "text" : "password"}
                  placeholder="Senha"
                  focusOutlineColor={errors.password !== undefined && "red.500"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                {errors.password !== undefined && (
                  <Text fontSize="xs" color="red.500">
                    {errors.password}
                  </Text>
                )}
                {isLogged === false && (
                  <Text fontSize="xs" color="red.500">
                    Login ou Senha incorretos
                  </Text>
                )}
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "lime.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Esqueceu sua senha?
                </Link>
              </FormControl>
              <Button
                mt="2"
                colorScheme="lime"
                onPress={() => handleLogin(username, password)}
              >
                Entrar
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Eu sou um novo usuário.{" "}
                </Text>
                <Link
                  _text={{
                    color: "lime.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  href="#"
                >
                  Inscrever-se
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}
