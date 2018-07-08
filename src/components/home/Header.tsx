import { Entypo } from '@expo/vector-icons'
import * as React from 'react'
import {
  ActionSheetIOS,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { color, constraint } from 'src/constants'
import { capitalize } from 'src/helpers'
import { Status } from 'src/modules/novels'
import icon from 'src/resources/icon.png'

interface Props {
  status: string
  handleChangeStatus: (status: string) => void
}

const labels = [Status.reading, Status.pending, Status.archive]

class Header extends React.PureComponent<Props> {
  handlePress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Select the novel status to display',
        options: [...labels.map(label => capitalize(label)), 'Cancel'],
        cancelButtonIndex: labels.length
      },
      index => {
        if (index < labels.length) {
          this.props.handleChangeStatus(labels[index])
        }
      }
    )
  }

  render() {
    const { status } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.image} source={icon} />
          <View style={styles.title}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={this.handlePress}
            >
              <Text style={styles.text}>{capitalize(status)}</Text>
              <Entypo
                name="chevron-small-down"
                size={20}
                color={color.darkBlack}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <Entypo
              name="squared-plus"
              size={26}
              color={color.darkBlack}
              style={styles.icon}
              onPress={Actions.ADD}
            />
            <Entypo
              name="cog"
              size={26}
              color={color.darkBlack}
              onPress={Actions.SETTING}
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
  image: {
    height: 32,
    width: 32
  },
  title: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 12
  },
  touchable: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: color.black,
    fontWeight: '900',
    fontSize: 24
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    marginRight: 12
  }
})
