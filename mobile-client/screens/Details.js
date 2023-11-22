import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import logo from "../assets/logo.png";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "../component/DetailSlider/Slider";
import { GET_PRODUCT_BY_ID } from "../config/apolloQuery";
import { useQuery } from "@apollo/client";

export default function DetailsScreen({ route }) {
  const Logo = Image.resolveAssetSource(logo).uri;
  const navigation = useNavigation();
  const { id } = route.params;

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      productId: id,
    },
  });

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

  const product = data.product;

  let images = [
    {
      id: 1,
      img: product?.mainImg,
    },
  ];
  product?.Images.forEach((el, idx) => {
    images.push({
      id: idx + 2,
      img: el.imgUrl,
    });
  });

  // console.log(product, '<<<<<')

  return (
    <>
      <View style={styles.container}>
        <View style={styles.homeHeader}>
          <View style={styles.leftHeader}>
            <Pressable
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={styles.menu}
            >
              <Ionicons name="arrow-back" size={26} color="black" />
            </Pressable>
          </View>
          <View style={styles.cart}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={26}
              color="black"
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Slider images={images} />
          <Text style={styles.name}>{product?.name}</Text>
          <Text style={styles.category}>{product?.Category.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product?.price}</Text>
          </View>
          <Text style={styles.description}>{product?.description}</Text>
          <Text style={styles.description}>by : {product?.User.email}</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.total}>1</Text>
          </View>
          <View style={styles.addContainer}>
            <Text style={styles.add}>Add to cart</Text>
          </View>
        </ScrollView>
        {/* <Text>Details screen </Text> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginBottom: 50,
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
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  category: {
    fontSize: 18,
    marginTop: 10,
  },
  priceContainer: {
    backgroundColor: "black",
    marginTop: 10,
    padding: 10,
    width: 80,
  },
  price: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    color: "#888888",
  },
  totalContainer: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    marginTop: 25,
    padding: 10,
  },
  total: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  addContainer: {
    backgroundColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    padding: 10,
  },
  add: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
