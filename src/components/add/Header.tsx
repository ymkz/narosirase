import { Entypo } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { color, constraint } from 'src/constants'

interface Props {
  root: boolean
  value: string
  valid: boolean
  clipboard: string
  handleChangeText: (value: string) => void
  handleSubmitEditing: () => void
  handlePressClipboard: () => void
  handlePressAddNovel: () => void
}

class Header extends React.PureComponent<Props> {
  render() {
    const {
      root,
      value,
      valid,
      clipboard,
      handleChangeText,
      handleSubmitEditing,
      handlePressClipboard,
      handlePressAddNovel
    } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Entypo
            name="chevron-down"
            size={28}
            color={color.darkBlack}
            onPress={() => Actions.popTo('HOME')}
          />
          <View style={styles.title}>
            <TextInput
              blurOnSubmit
              value={value}
              autoCorrect={false}
              keyboardType="url"
              autoCapitalize="none"
              clearButtonMode="while-editing"
              placeholder="小説のURLを入力して検索"
              onChangeText={handleChangeText}
              onSubmitEditing={handleSubmitEditing}
              style={styles.input}
            />
          </View>
          <View style={styles.icons}>
            {root && (
              <Entypo
                name="clipboard"
                size={24}
                color={clipboard ? color.darkBlack : color.darkGray}
                style={styles.icon}
                onPress={clipboard ? handlePressClipboard : null}
              />
            )}
            <Entypo
              name="paper-plane"
              size={24}
              color={valid ? color.darkBlack : color.darkGray}
              onPress={valid ? handlePressAddNovel : null}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingTop: constraint.statusBarHeight,
    borderBottomColor: color.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: constraint.headerHeight,
    paddingHorizontal: 12
  },
  title: {
    flex: 1,
    marginHorizontal: 12
  },
  input: {
    paddingVertical: 8
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    marginRight: 10
  }
})
