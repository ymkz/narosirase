import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { human, systemWeights, materialColors } from 'react-native-typography'

const EmptyComponent = () => (
  <View style={styles.container}>
    <Text style={[human.title1, systemWeights.bold, styles.color]}>Empty</Text>
    <Text style={[human.body, styles.color]}>contents not found</Text>
    <MaterialIcons name="pets" size={64} style={styles.color} />
  </View>
)

export default EmptyComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 128
  },
  color: {
    color: materialColors.blackPrimary
  }
})
