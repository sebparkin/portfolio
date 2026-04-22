import { Text, View, StyleSheet, Image, Pressable, useWindowDimensions } from "react-native";
import { ExpandCardProps } from "@/data/expandCards";
import { useEffect } from "react";
import Animated from "react-native-reanimated";
import * as constants from '@/constants/constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Asset } from 'expo-asset';

export default function ExpandCard({id, title, video, content, cardHeight, handleClose, contentStyle}: ExpandCardProps) {

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const uri = Asset.fromModule(video).uri;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose?.();
      }
    };

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  }
  }, []);

  if (isPortrait) {
    return (
      <View style={portraitStyles.cardContainer}>
      <Pressable style={styles.expand}>
        <Ionicons name='expand' size={width * 0.1}/>
      </Pressable>
      {/* <View style={portraitStyles.imageContainer}>
        <Image source={image} style = {[
          styles.image, 
          {
            width: width * 0.5,
            height: width * 0.5
          }]}/>
      </View> */}
      <View style={portraitStyles.container}>
        <Text style={[portraitStyles.titleText, {
          fontSize: width * 0.08
        }]}>{title}</Text>
        <Text style={[portraitStyles.text, {
          fontSize: width * 0.06
        }]}>{content}</Text>
      </View>
    </View>
    )
  } else {
    return (
      <View style={styles.cardContainer}>
        <Pressable style={styles.expand} onPress={() => handleClose?.()} hitSlop={{ top: 100, bottom: 100, left: 100, right: 100 }}>
          <Ionicons name='close-sharp' size={width * 0.028} />
        </Pressable>
        
        <Animated.View style={[{flex: 1, flexDirection: 'row', padding: 20}, contentStyle]} pointerEvents='none'>
          <View style={styles.textContainer}>
            <Text style={[styles.titleText, {fontSize: width * 0.03}]}>{title}</Text>
            <Text style={[styles.text, {fontSize: width * 0.016}]} pointerEvents="auto">{content}</Text>
          </View>

          {/* Right side - Video */}
          <View style={styles.videoContainer}>
            <video
              src={uri}
              controls
              loop
              autoPlay
              muted
              playsInline
              style={{ width: '100%' }}
            />
          </View>
        </Animated.View>
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 6,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 4,
    backgroundColor: "#FFFAFB",
  },
  imageContainer: {
    flex: 0.4,
    alignItems: 'center'
  },
  image: {
    borderColor: 'black',
    borderWidth: 5,
  },
  textContainer: {
    flex: 1,
    padding: '2%',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 48,
    textAlign: 'left',
    fontFamily: 'PTSerif-Bold',
  }, 
  text: {
    fontSize: 24,
    paddingTop: 10,
    paddingRight: 10,
    textAlign: 'justify',
    fontFamily: 'PTSerif-Regular'
  },
  expand: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  videoContainer: {
    width: '35%',
    justifyContent: 'center',
    borderWidth: 5,
    marginRight: '1%',
  }
})

const portraitStyles = StyleSheet.create({
  cardContainer: {
    borderWidth: 6,
    borderColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 4,
    backgroundColor: "#FFFAFB",
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    borderColor: 'black',
    borderWidth: 5,
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    flex: 1,
    fontSize: 24,
    paddingTop: 10,
    textAlign: 'center',
  },
  expand: {
    position: 'absolute',
    left: 5,
    top: 5,
  }
})