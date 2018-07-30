import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color } from 'src/constants'

const Disclaimer: React.SFC = () => (
  <View style={styles.container}>
    <Text style={styles.message}>
      <Text style={styles.strong}>Disclaimer</Text>
      <Text>
        「小説家になろう」は株式会社ヒナプロジェクトの登録商標であり、本アプリケーションは株式会社ヒナプロジェクトが提供するものではありません。
      </Text>
    </Text>
  </View>
)

export default Disclaimer

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
  strong: {
    color: color.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 16
  },
  message: {
    color: color.black
  }
})
