import { DocumentPicker, FileSystem } from 'expo'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { color } from 'src/constants'
import { snackbar } from 'src/helpers'
import { novelActions, NovelState } from 'src/modules/novels'

interface Props {
  novelHydrate: typeof novelActions.novelHydrate
}

class Import extends React.PureComponent<Props> {
  handleImport = async () => {
    try {
      const picked = await DocumentPicker.getDocumentAsync()
      if (picked.type === 'cancel') {
        return
      } else if (picked.type === 'success') {
        const fileUri = `${FileSystem.documentDirectory}import.json`
        const downloaded = await FileSystem.downloadAsync(picked.uri, fileUri)
        const read = await FileSystem.readAsStringAsync(downloaded.uri)
        const json: NovelState[] = JSON.parse(read)
        this.props.novelHydrate(json)
        snackbar.success('小説データをインポートしました')
      } else {
        return
      }
    } catch (error) {
      snackbar.error('インポート時にエラーが発生しました')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.message}>小説データをインポートします</Text>
          <Text style={styles.message}>Dropboxを選択してください</Text>
        </View>
        <TouchableOpacity onPress={this.handleImport}>
          <View style={styles.button}>
            <Text style={styles.text}>import</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Import

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
