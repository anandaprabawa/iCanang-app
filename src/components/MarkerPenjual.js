import React from 'react';
import MapView from 'react-native-maps';
import { View, Image, Text, StyleSheet } from 'react-native';
import { colors } from 'styles';

export default ({ user, navigation }) => (
  <MapView.Marker
    coordinate={{
      latitude: user.lokasi.latitude,
      longitude: user.lokasi.longitude
    }}
    onCalloutPress={() => navigation.navigate('DetailPenjual', { user: user })}
  >
    <MapView.Callout tooltip={true}>
      <View style={styles.markerCalloutContainer}>
        <View style={styles.markerCalloutContent}>
          <Image
            source={
              user.imageUri
                ? { uri: user.imageUri }
                : require('images/no-image.jpg')
            }
            style={styles.calloutImage}
          />
          <Text style={styles.name}>{user.namaLengkap}</Text>
        </View>
        <View style={styles.markerCalloutTriangle} />
      </View>
    </MapView.Callout>
  </MapView.Marker>
);

const styles = StyleSheet.create({
  markerCalloutContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 2,
    maxWidth: 250
  },
  markerCalloutContent: {
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  markerCalloutTriangle: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderTopWidth: 15,
    borderRightWidth: 15,
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.secondary
  },
  calloutImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 100,
    borderColor: colors.light,
    borderWidth: 2
  },
  name: {
    textAlign: 'center',
    marginTop: 3,
    color: colors.light,
    fontWeight: 'bold'
  }
});
