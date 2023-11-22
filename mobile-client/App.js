import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import About from "./screens/About";
import DetailsScreen from "./screens/Details";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import apolloClient from "./config/apolloClient";
import { ApolloProvider } from '@apollo/client';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesignIcon size={size} color={color} name="home" />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <AntDesignIcon size={size} color={color} name="info" />;
          },
          headerShown: false,
        }}
        
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
    <ApolloProvider client={apolloClient} >
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, marginTop: 20 }} >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                component={MainTab}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Details" component={DetailsScreen} options={{
                  headerShown: false,
                }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
      </ApolloProvider>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
