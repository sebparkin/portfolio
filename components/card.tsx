import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { CardProps } from "@/data/cards";
import { useWindowDimensions } from "react-native";
import * as constants from '@/constants/constants';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Card({id, title, image, content, cardHeight, onExpand}: CardProps) {

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;

  if (isPortrait) {
    return (
      <View style={portraitStyles.cardContainer}>
      <Pressable style={styles.expand}>
        <Ionicons name='expand' size={width * 0.1} />
      </Pressable>
      <View style={portraitStyles.imageContainer}>
        <Image source={image} style = {[
          styles.image, 
          {
            width: width * 0.5,
            height: width * 0.5
          }]}/>
      </View>
      <View style={portraitStyles.textContainer}>
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
        <Pressable style={styles.expand} onPress={() => onExpand?.(id)}>
          <Ionicons name='expand' size={width * 0.025} />
        </Pressable>
        <View style={styles.imageContainer}>
          <Image source={image} style = {[
            styles.image, 
            {
              width: isPortrait ? width * 0.5 : width * 0.2,
              height: isPortrait ? width * 0.5 : width * 0.2,
            }]}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, {
            fontSize: width * 0.03
          }]}>{title}</Text>
          <Text style={[styles.text, {
            fontSize: width * 0.02
          }]}>{content}</Text>
        </View>
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleText: {
    fontSize: 48,
    fontFamily: 'PTSerif-Bold',
  },
  text: {
    flex: 1,
    fontSize: 24,
    paddingTop: 10,
    paddingRight: 10,
    fontFamily: 'PTSerif',
  },
  expand: {
    position: 'absolute',
    left: 5,
    top: 5,
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
  textContainer: {
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