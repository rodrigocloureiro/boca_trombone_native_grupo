import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./assets/logo.png')}
      />
      <ActivityIndicator animating={true} color='#325D87' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
});
