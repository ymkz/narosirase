import dayjs from 'dayjs'
import * as React from 'react'
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { color } from 'src/constants'
import { snackbar } from 'src/helpers'
import { NovelState } from 'src/modules/novels'

interface Props {
  novels: NovelState[]
}

type SharedAction = 'sharedAction' | 'dismissedAction'

interface ShareResult {
  action: SharedAction
  activityType?: string
}

class Export extends React.PureComponent<Props> {
  handleExport = async () => {
    try {
      const result = (await Share.share({
        title: `narosirase-export-${dayjs().unix()}`,
        message: JSON.stringify(this.props.novels)
      })) as ShareResult
      if (result.action === 'sharedAction') {
        snackbar.success('小説データをエクスポートしました')
      }
    } catch (error) {
      snackbar.success('エクスポート時にエラーが発生しました')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.message}>小説データをエクスポートします</Text>
          <Text style={styles.message}>Dropboxに保存を選択してください</Text>
        </View>
        <TouchableOpacity onPress={this.handleExport}>
          <View style={styles.button}>
            <Text style={styles.text}>export</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Export

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
  description: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    color: color.black,
    fontSize: 13
  },
  button: {
    alignItems: 'center',
    backgroundColor: color.darkGray,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  text: {
    color: color.black,
    fontWeight: 'bold'
  }
})
