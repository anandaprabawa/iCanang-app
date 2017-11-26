import React, { Component } from 'react';
import MapView from 'react-native-maps';
import firebase from 'react-native-firebase';
import { Dimensions, Image, View, Text } from 'react-native';

import styles from './styles';
import Header from 'components/HeaderBack';
import Marker from 'components/MarkerPenjual';

export default class PenjualTerdekat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      margin: 1,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      },
      marker: []
    };
    this.watchId = null;
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ margin: 0 });
    }, 1000);
  }

  componentDidMount() {
    this.getCurrentPosition();
    this.watchPosition();
    this.getMarker();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    navigator.geolocation.stopObserving();
  }

  animateToRegion() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.map.animateToRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003
        });
      },
      error => {
        this.animateToRegion();
      },
      { enableHighAccuracy: true }
    );
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
          }
        });
      },
      error => {
        this.animateToRegion();
      },
      { enableHighAccuracy: true }
    );
  }

  watchPosition = () => {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.map.animateToCoordinate(position.coords);
      },
      error => {
        this.watchPosition();
      },
      { enableHighAccuracy: true }
    );
  };

  async getMarker() {
    const snapshots = await firebase
      .firestore()
      .collection('users')
      .get();
    let items = [];
    snapshots.forEach(doc => {
      items.push(Object.assign({}, doc.data(), { id: doc.id }));
    });
    this.setState({ marker: items });
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Header title="Penjual Terdekat" navigation={this.props.navigation} />
        <View style={styles.viewMapViewContainer}>
          <MapView
            ref={ref => (this.map = ref)}
            style={[styles.map, { marginTop: this.state.margin }]}
            region={this.state.region}
            showsMyLocationButton={true}
            showsUserLocation={true}
            maxZoomLevel={20}
            minZoomLevel={5}
            rotateEnabled={true}
            moveOnMarkerPress={false}
          >
            {this.state.marker.map(doc => (
              <Marker
                key={doc.id}
                latitude={doc.lokasi.latitude}
                longitude={doc.lokasi.longitude}
                imageUri={doc.imageUri}
                namaLengkap={doc.namaLengkap}
                navigation={this.props.navigation}
              />
            ))}
          </MapView>
        </View>
      </View>
    );
  }
}
