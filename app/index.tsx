import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import ScrollableCardStack from "@/components/scrollableCardStack";
import { cards } from "@/data/cards";
import ScrollableCards from "@/components/scrollableCards";
import { useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming }  from 'react-native-reanimated';
import ExpandCard from "@/components/expandCard";
import { expandCards } from "@/data/expandCards";
import Footer from "@/components/footer";

export default function Index() {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const widthMultiplier = (isPortrait) ? 1.0 : 0.8;
  const cardHeight = (isPortrait) ? height * 0.8 : height * 0.6;

  const [autoPlay, setAutoPlay] = useState(true);

  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const expandedCard = expandCards.find(expandCard => expandCard.id === expandedCardId);
    // Opacity values
    const cardOpacity = useSharedValue(1);
    const expandOpacity = useSharedValue(0);
    const expandContentOpacity = useSharedValue(0);
  
    // Width of the expand card (animates from card width to full screen)
    const expandWidth = useSharedValue(width * widthMultiplier);
    const expandHeight = useSharedValue(cardHeight);
  
    const cardStyle = useAnimatedStyle(() => ({ opacity: cardOpacity.value }));
  
    const expandStyle = useAnimatedStyle(() => ({
      opacity: expandOpacity.value,
      width: expandWidth.value,
      height: expandHeight.value,
    }));
  
    const expandContentStyle = useAnimatedStyle(() => ({
      opacity: expandContentOpacity.value,
    }));

    const handleExpand = (id: number) => {
      setAutoPlay(false);
      setExpandedCardId(id);

      // Step 1: fade carousel out and expand card in simultaneously
      cardOpacity.value = withTiming(0, { duration: 300 });
      expandOpacity.value = withTiming(1, { duration: 300 }, (finished) => {
        if (finished) {
          // Step 2: expand width and height
          expandHeight.value = withTiming(height * 0.8, { duration: 400 })
          expandWidth.value = withTiming(width, { duration: 400 }, (finished) => {
            if (finished) {
              // Step 3: fade in content
              expandContentOpacity.value = withTiming(1, { duration: 300 });
            }
          });
        }
      });
    };

  const handleClose = () => {
    // Reverse the sequence
    expandContentOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) {
        expandHeight.value = withTiming((isPortrait) ? height * 0.8 : height * 0.6, {duration: 400 });
        expandWidth.value = withTiming(width * widthMultiplier, { duration: 400 }, (finished) => {
          if (finished) {
            expandOpacity.value = withTiming(0, { duration: 300 });
            cardOpacity.value = withTiming(1, { duration: 300 });
            setTimeout(() => setExpandedCardId(null), 300);
          }
        });
      }
    });
    setAutoPlay(true);
  };

  if (isPortrait) {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={[styles.nameText, {
            fontSize: width * 0.1
          }]}>Sebastian Parkin</Text>
        </View>
        <View style={[styles.container, {
          paddingBottom: 0,
          paddingTop: 0,
        }]}>
          <ScrollableCards handleExpand={handleExpand} autoPlay={autoPlay} setAutoPlay={setAutoPlay}/>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.footerText, {
            fontSize: width * 0.1
          }]}>Development Portfolio</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.nameText}>Sebastian Parkin</Text>
          <Text style={styles.portfolioText}>Development Portfolio</Text>
        </View>
        <View style={styles.container}>
          <Animated.View style={cardStyle}>
            <ScrollableCards handleExpand={handleExpand} autoPlay={autoPlay} setAutoPlay={setAutoPlay}/>
          </Animated.View>
          {expandedCard && (
            <Animated.View style={[expandStyle, {
              position: 'absolute',
            }]}>
              <ExpandCard
                {...expandedCard}
                handleClose={handleClose}
                contentStyle={expandContentStyle}  // pass animated style down
              />
            </Animated.View>
          )}
        </View>
        <View style={styles.footer}>
          <Footer/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,             
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    position: 'relative',
    height: 50,
  },
  nameText: {
    position: 'absolute',
    top: 0,
    left: 2,
    fontSize: 64,
    fontFamily: 'Prata-Regular',
  },
  portfolioText: {
    position: 'absolute',
    top: 0,
    right: 2,
    fontSize: 64,
    fontFamily: 'Prata-Regular',
  },
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center', 
    flex: 1,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    height: 50,
  },
  footerText: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    fontSize: 64,
    fontFamily: 'Prata-Regular',
  }
})