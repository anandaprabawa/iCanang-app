import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Dimensions, Image, View, Text } from 'react-native';
import styles, { pinColor } from './styles';
import Header from 'components/HeaderBack';

export default class PenjualTerdekat extends Component {
  static navigationOptions = props => ({
    header: <Header title="Penjual Terdekat" navigation={props.navigation} />,
    drawerLockMode: 'locked-closed'
  });

  constructor(props) {
    super(props);
    this.state = {
      margin: 1,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      }
    };
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

  watchPosition() {
    navigator.geolocation.watchPosition(
      position => {
        this.map.animateToCoordinate(position.coords);
      },
      error => {
        this.watchPosition();
      },
      { enableHighAccuracy: true }
    );
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({ margin: 0 });
    }, 1000);
  }

  componentDidMount() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchPosition);
  }

  render() {
    return (
      <View style={styles.viewContainer}>
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
            <MapView.Marker
              pinColor={pinColor}
              coordinate={{
                latitude: -8.4645,
                longitude: 115.17
              }}
              onCalloutPress={() => this.props.navigation.navigate('Cari')}
            >
              <MapView.Callout tooltip={true}>
                <View style={styles.markerCalloutContainer}>
                  <View style={styles.markerCalloutContent}>
                    <Image
                      source={require('../../assets/images/canang-sari.jpg')}
                      style={styles.calloutImage}
                    />
                    <Text style={styles.name}>Ananda Widiprabawa</Text>
                  </View>
                  <View style={styles.markerCalloutTriangle} />
                </View>
              </MapView.Callout>
            </MapView.Marker>
            <MapView.Marker
              coordinate={{
                latitude: -8.464531,
                longitude: 115.170361
              }}
            />
            <MapView.Marker
              coordinate={{
                latitude: -8.4641,
                longitude: 115.170361
              }}
            />
          </MapView>
        </View>
      </View>
    );
  }
}
