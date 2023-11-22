import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import logo from "../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import Card from "../component/Card";
import Slider from "../component/HomepageSlider/Slider";
import { useQuery, gql } from "@apollo/client";
import { GET_PRODUCT } from "../config/apolloQuery";

export default function HomeScreen(props) {
  const { navigation } = props;
  const Logo = Image.resolveAssetSource(logo).uri;

  const category = ["All", "Art Prints", "Books", "Kindling", "Magazine"];
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = "";
  if (timesPressed > 1) {
    textLog = timesPressed + "x onPress";
  } else if (timesPressed > 0) {
    textLog = "onPress";
  }

  const { loading, error, data } = useQuery(GET_PRODUCT);
  // console.log(loading, error, data , '<<<< ')

  if (loading)
    return (
      <>
        <View style={[styles.containerLoading, styles.horizontal]}>
          <ActivityIndicator size="large" color="black" />
        </View>
      </>
    );
  if (error)
    return (
      <View>
        <Text>Error : {error.message}</Text>
      </View>
    );

  const products = data.products;

  // console.log(products)

  return (
    <>
      <View style={styles.container}>
        {/** top header */}
        <View style={styles.homeHeader}>
          <View style={styles.leftHeader}>
            <View style={styles.menu}>
              <Ionicons name="menu" size={26} color="black" />
            </View>
            <Image
              style={styles.logo}
              source={{
                uri: Logo,
              }}
            />
          </View>
          <View style={styles.cart}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={26}
              color="black"
            />
          </View>
        </View>

        <FlatList
          data={products}
          renderItem={({ item }) => <Card product={item} />}
          keyExtractor={(el) => el.id}
          numColumns={2}
          style={styles.productsList}
          columnWrapperStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <Slider style={styles.carousel} />
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.categories}
              >
                {category.map((el, idx) => {
                  return (
                    <Pressable
                      key={idx}
                      onPress={() => {
                        setTimesPressed((current) => current + 1);
                      }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? "black" : "white",
                        },
                        styles.wrapperCustom,
                      ]}
                      children={({ pressed }) => (
                        <Text style={{ color: pressed ? "white" : "black" }}>
                          {el}
                        </Text>
                      )}
                    ></Pressable>
                  );
                })}
              </ScrollView>
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    //   alignItems: "center",
    //   justifyContent: "center",
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  logo: {
    width: 150,
    height: 50,
    objectFit: "contain",
    paddingBottom: 10,
    marginLeft: 10,
  },
  homeHeader: {
    flexDirection: "row",
  },
  menu: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#c9c9c9",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  leftHeader: {
    flex: 1,
    flexDirection: "row",
  },
  cart: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#c9c9c9",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  carousel: {
    marginTop: 50,
    // backgroundColor : "#c9c9c9"
  },
  categories: {
    flexDirection: "row",
    // flex : 1,
    // backgroundColor: "yellow",
    height: 50,
    marginBottom: 20,
  },
  categoryList: {
    fontSize: 20,
    paddingVertical: 10,
    // marginHorizontal: 15,
  },
  wrapperCustom: {
    // borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginHorizontal: 15,
    padding: 5,
    fontSize: 20,
  },
  productsList: {
    marginTop: 10,
    // marginLeft : 5
  },
});
