import React from 'react'
import { WebBrowser } from 'expo'
import { StyleSheet, View, Image, Text } from 'react-native'
import { human, systemWeights, iOSColors, materialColors } from 'react-native-typography'

const DeveloperComponent = () => (
  <View style={styles.container}>
    <Image
      style={styles.avatar}
      source={{
        uri: 'https://github.com/ymkz.png'
      }}
    />
    <View style={styles.information}>
      <Text style={[human.body, systemWeights.semibold, styles.name]}>ymkz (kazuya yamashita)</Text>
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

export default DeveloperComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: iOSColors.white,
    borderBottomColor: iOSColors.midGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: iOSColors.midGray,
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
    color: materialColors.blackPrimary
  },
  portfolio: {
    textDecorationLine: 'underline'
  },
  information: {
    flex: 1,
    paddingLeft: 16
  }
})
