import * as React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { color, narou } from 'src/constants'
import about from 'src/images/about.png'

const About: React.SFC = () => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={about} />
    <View style={styles.information}>
      <Text style={styles.message}>
        このアプリは小説家になろうの小説更新を追跡するためのアプリです。
        APIサーバーへの負荷低減のため、小説情報の更新を行う際に
        {narou.wait}
        ミリ秒/小説の遅延を設定しています。
      </Text>
    </View>
  </View>
)

export default About

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
  information: {
    flex: 1,
    paddingLeft: 16
  },
  message: {
    color: color.black
  }
})
