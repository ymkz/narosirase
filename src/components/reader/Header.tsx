import { Entypo } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { color, constraint } from 'src/constants'
import { NovelState } from 'src/modules/novels'

interface Props {
  novel: NovelState
}

class Header extends React.PureComponent<Props> {
  render() {
    const { novel } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Entypo
            name="chevron-small-left"
            size={32}
            color={color.darkBlack}
            style={styles.back}
            onPress={() => Actions.popTo('HOME')}
          />
          <View style={styles.title}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              {novel.title}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.sub}>
              {novel.isShort ? novel.writer : novel.contents.subtitle}
            </Text>
          </View>
          <Entypo
            name="list"
            size={24}
            color={color.darkBlack}
            onPress={() => console.log('press')}
          />
        </View>
      </View>
    )
  }
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    borderBottomColor: color.darkGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: constraint.statusBarHeight,
    position: 'absolute',
    width: constraint.deviceWidth,
    zIndex: 1
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
  back: {
    marginHorizontal: -10
  },
  text: {
    color: color.black,
    fontWeight: 'bold'
  },
  sub: {
    color: color.black,
    fontSize: 10
  }
})
