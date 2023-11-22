import {Animated, Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from '../../data';
import SlideItem from './SlideItem';
import Pagination from './Pagination';
import { useEffect } from 'react';

const Slider = ({images}) => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  
  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    if(viewableItems) {
      setIndex(viewableItems[0]?.index);
      
    }
  }).current;
  
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextIndex = (index + 1) % Slides.length;

  //     scrollX.setValue(nextIndex * Dimensions.get('window').width);

  //     setIndex(nextIndex);
  //   }, 5000); 

  //   return () => clearInterval(interval);
  // }, [index, scrollX]);

  // console.log(Slides, "<<dari slider")
  // console.log(images, "<<dari slider")
  return (
    <View>
      <FlatList
        data={images}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={images} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
