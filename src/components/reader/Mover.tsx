import { Entypo } from '@expo/vector-icons'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { color, constraint } from 'src/constants'

interface Props {
  canMove: boolean
  visible: boolean
  prev?: boolean
  next?: boolean
  move: () => void
}

const Mover: React.SFC<Props> = ({ canMove, visible, prev, next, move }) => {
  if (visible) {
    const text: string = !!prev ? '前のエピソードへ' : '次のエピソードへ'
    return (
      <TouchableOpacity style={styles.container} onPress={move}>
        {prev && (
          <Entypo
            name="chevron-thin-up"
            size={16}
            style={canMove ? styles.active : styles.inactive}
          />
        )}
        <Text style={canMove ? styles.active : styles.inactive}>{text}</Text>
        {next && (
          <Entypo
            name="chevron-thin-down"
            size={16}
            style={canMove ? styles.active : styles.inactive}
          />
        )}
      </TouchableOpacity>
    )
  } else {
    return null
  }
}

export default Mover

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.lightGray,
    height: constraint.scrollOffset,
    justifyContent: 'center'
  },
  active: {
    color: color.black
  },
  inactive: {
    color: color.darkGray
  }
})
