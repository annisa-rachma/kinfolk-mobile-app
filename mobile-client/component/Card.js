import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");
export default function Card({ product }) {
  const navigation = useNavigation();
  // console.log(product.id)
  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("Details", {id: product.id});
        }}
      >
        <View style={styles.card}>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.mainImg }} style={styles.image} />
            </View>
            <Text style={styles.name}>{product.name}</Text>
          </View>
          <View style={styles.containerText}>
            <View>
              <Text style={styles.category}>{product.Category.name}</Text>
              <Text style={styles.category}>${product.price}</Text>
            </View>
            <View style={styles.add}>
              <Entypo name="plus" size={24} color="black" />
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
    backgroundColor: "#EFEFEF",
    width: width / 2 - 25,
    height: 250,
    marginBottom: 10,
    padding: 15,
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "100%",
    height: 130,
    marginLeft: "auto",
    marginRight: "auto",
  },
  image: {
    flex: 1,
    width: "100%",
    objectFit: "cover",
  },
  name: {
    marginTop: 5,
    fontWeight: "bold",
  },
  category: {
    marginTop: 5,
  },
  containerText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  add: {
    backgroundColor: "white",
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "auto",
    marginTop: "auto",
  },
});
