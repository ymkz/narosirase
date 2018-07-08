import { MaterialIcons } from '@expo/vector-icons'
import * as React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { color } from 'src/constants'
import { snackbar } from 'src/helpers'
import { novelActions, NovelState, Status } from 'src/modules/novels'

interface Props {
  novel: NovelState
  novelPatch: typeof novelActions.novelPatch
  novelRemove: typeof novelActions.novelRemove
}

class ItemHidden extends React.PureComponent<Props> {
  handleChange = (status: Status) => {
    this.props.novelPatch({ ...this.props.novel, status })
  }

  handleRemove = () => {
    Alert.alert('小説の削除', 'この操作は取り消せません', [
      { text: 'キャンセル', style: 'cancel', onPress: null },
      {
        text: '削除',
        style: 'destructive',
        onPress: () => {
          this.props.novelRemove(this.props.novel)
          snackbar.success('小説を削除しました')
        }
      }
    ])
  }

  render() {
    return (
      <View style={styles.container}>
        <MaterialIcons
          name="chrome-reader-mode"
          size={28}
          color={color.darkGray}
          onPress={() => this.handleChange(Status.reading)}
        />
        <MaterialIcons
          name="watch-later"
          size={28}
          color={color.darkGray}
          onPress={() => this.handleChange(Status.pending)}
        />
        <MaterialIcons
          name="archive"
          size={28}
          color={color.darkGray}
          onPress={() => this.handleChange(Status.archive)}
        />
        <MaterialIcons
          name="delete-forever"
          size={28}
          color={color.darkGray}
          onPress={this.handleRemove}
        />
      </View>
    )
  }
}

export default ItemHidden

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.lightGray,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
