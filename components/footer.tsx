import { View, Text, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function Footer() {

  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.footer}>
      <Pressable
        style={styles.link}
        onPress={() => Linking.openURL('https://github.com/sebparkin')}
      >
        <Ionicons name='logo-github' size={width * 0.02} />
        <Text style={[styles.linkText, {fontSize: width * 0.015}]}>GitHub</Text>
      </Pressable>

      <Pressable
        style={styles.link}
        onPress={() => Linking.openURL('https://www.linkedin.com/in/seb-parkin-831605284/')}
      >
        <Ionicons name='logo-linkedin' size={width * 0.02} />
        <Text style={[styles.linkText, {fontSize: width * 0.015}]}>LinkedIn</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 100,
    marginBottom: 40,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkText: {
    fontSize: 16,
    fontFamily: 'PTSerif-Regular',
    textDecorationLine: 'underline'
  },
});