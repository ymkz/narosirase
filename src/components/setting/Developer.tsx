import { WebBrowser } from 'expo'
import * as React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { color } from 'src/constants'
import avatar from 'src/images/avatar.png'

const Developer: React.SFC = () => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={avatar} />
    <View style={styles.information}>
      <Text style={styles.name}>ymkz (kazuya yamashita)</Text>
      <Text>
        front-end web engineer -{' '}
        <Text
          style={styles.portfolio}
          onPress={() => WebBrowser.openBrowserAsync('https://ymkz.co')}
        >
          ymkz.co
        </Text>
      </Text>
    </View>
  </View>
)

export default Developer

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.white,
    borderBottomColor: color.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.darkGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    marginVertical: 8,
    padding: 16
  },
  avatar: {
    borderRadius: 8,
    height: 48,
    width: 48
  },
  name: {
    color: color.black,
    fontSize: 17,
    fontWeight: 'bold'
  },
  portfolio: {
    textDecorationLine: 'underline'
  },
  information: {
    flex: 1,
    paddingLeft: 16
  }
})
