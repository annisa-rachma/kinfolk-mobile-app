import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

const SlideItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Animated.Image
        source={{uri : item.img}}
        resizeMode="contain"
        style={[
          styles.image
        ]}
      />

    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height : 380,
    alignItems: 'center',
    marginTop : 20,
  },
  image: {
    flex: 0.825,
    width: '100%',
    objectFit: "cover"
  },
});
