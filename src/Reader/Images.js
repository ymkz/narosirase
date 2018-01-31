import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const ImagesComponent = ({ images }) => (
  <View style={styles.container}>
    {images.map(image => (
      <Image
        key={image}
        style={styles.image}
        source={{
          uri: image
        }}
      />
    ))}
  </View>
)

export default ImagesComponent

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 24
  },
  image: {
    borderRadius: 8,
    height: 72,
    marginRight: 16,
    width: 72
  }
})
