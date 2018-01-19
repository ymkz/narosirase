import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'
import {
  human,
  systemWeights,
  iOSColors,
  materialColors
} from 'react-native-typography'
import { MaterialIcons } from '@expo/vector-icons'
import { constraints } from '../constants'

const AdditionHeaderComponent = ({
  value,
  editing,
  handleChangeTextInput,
  handleFocus,
  handleBlur,
  handleSubmitEditing
}) => (
  <View style={styles.container}>
    <View style={styles.form}>
      <MaterialIcons
        name="search"
        size={18}
        color={editing ? iOSColors.blue : materialColors.blackPrimary}
        style={styles.icon}
      />
      <TextInput
        value={value}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        keyboardType="url"
        placeholder="NコードかURLで検索"
        onChangeText={handleChangeTextInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        style={styles.input}
      />
    </View>
    {editing && (
      <TouchableOpacity onPress={handleBlur}>
        <Text style={[human.subhead, systemWeights.thin, styles.cancel]}>
          Cancel
        </Text>
      </TouchableOpacity>
    )}
  </View>
)

export default AdditionHeaderComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: materialColors.whitePrimary,
    flexDirection: 'row',
    paddingBottom: 8,
    paddingHorizontal: 8
  },
  form: {
    alignItems: 'center',
    backgroundColor: iOSColors.customGray,
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    height: constraints.searchHeight
  },
  icon: {
    paddingHorizontal: 6
  },
  input: {
    flex: 1
  },
  cancel: {
    color: iOSColors.blue,
    paddingLeft: 8
  }
})
