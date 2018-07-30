import * as React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { color } from 'src/constants'
import { snackbar } from 'src/helpers'
import { NovelsAction } from 'src/modules/novels'
import { SettingAction } from 'src/modules/setting'

interface Props {
  action: NovelsAction & SettingAction
}

class Reset extends React.Component<Props> {
  handleReset = () => {
    Alert.alert('小説データの初期化', 'この操作は取り消せません', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '初期化',
        style: 'destructive',
        onPress: () => {
          this.props.action.resetNovel()
          snackbar.success('データを初期化しました')
        }
      }
    ])
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.message}>すべての小説データの初期化を行います</Text>
          <Text style={styles.message}>この操作は取り消しできません</Text>
        </View>
        <TouchableOpacity onPress={this.handleReset}>
          <View style={styles.button}>
            <Text style={styles.text}>reset</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Reset

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.white,
    borderBottomColor: color.red,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.red,
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
    backgroundColor: color.red,
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  text: {
    color: color.white,
    fontSize: 13,
    fontWeight: 'bold'
  }
})
