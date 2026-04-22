import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { ICarouselInstance } from 'react-native-reanimated-carousel';
import * as React from "react";
import { useWindowDimensions } from 'react-native';
import Card from './card';
import { cards } from '@/data/cards';
import Animated, { useSharedValue, useAnimatedStyle, withTiming }  from 'react-native-reanimated';
import * as constants from '@/constants/constants';

type ScrollableCardsProps = {
  handleExpand?: (id: number) => void;
  autoPlay: boolean;
  setAutoPlay: (value: boolean) => void; 
}

export default function ScrollableCards({handleExpand, autoPlay, setAutoPlay}: ScrollableCardsProps) {
  const progress = useSharedValue<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const isScrolling = useRef(false);
  const autoPlayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  const widthMultiplier = (isPortrait) ? 1.0 : 0.8
  const cardHeight = (isPortrait) ? height * 0.8 : height * 0.6

  const resetAutoPlay = () => {
    setAutoPlay(false);
    
    if (autoPlayTimeout.current) {
      clearTimeout(autoPlayTimeout.current);
    }
    
    autoPlayTimeout.current = setTimeout(() => {
      setAutoPlay(true);
    }, 0);  // resume autoplay after 3 seconds of inactivity
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        carouselRef.current?.prev();
        resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        carouselRef.current?.next();
        resetAutoPlay();
      }
    };

  const handleWheel = (e: WheelEvent) => {
    if (isScrolling.current) return;

    if (e.deltaX > 0 || e.deltaY > 0) {
      carouselRef.current?.next();
    } else {
      carouselRef.current?.prev();
    }
    resetAutoPlay();
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 600); 
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('wheel', handleWheel);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('wheel', handleWheel);
    if (autoPlayTimeout.current) {
      clearTimeout(autoPlayTimeout.current);
    }
    };
  }, []);

  return (
    <View
			id="carousel-component"
      style={styles.page}
		> 
			<Carousel
				autoPlayInterval={5000}
        autoPlay={autoPlay} 
				loop={true}
				pagingEnabled={true}
				snapEnabled={true}
        ref={carouselRef}
        width={width * widthMultiplier}
        height={cardHeight}
				style={{
					width: width,
					height: cardHeight,
          overflow: 'visible',
          marginLeft: width * ((1-widthMultiplier))
				}}
        mode={"vertical-stack"}
				modeConfig={{
					snapDirection: "left",
					stackInterval: -50,
          showLength: 3,
          moveSize: isPortrait? width * 2 : width,
				}}
				// mode="parallax"
				// modeConfig={{
				// 	parallaxScrollingScale: 0.95,
				// 	parallaxScrollingOffset: 50,
				// }}
				onProgressChange={(offsetProgress, absoluteProgress) => {
					progress.value = absoluteProgress;
				}}
        data={cards}
				renderItem={({ item }) => <Card {...item} cardHeight={cardHeight} onExpand={handleExpand} />}
			/>
		</View>
  );
}



const styles = StyleSheet.create({
  pager: {
    flex: 1,
    width: '100%',
    
  },  
  page: {
    flex: 3,
    alignItems:'center',
    justifyContent:'center',
    overflow: 'visible',
  },
});
