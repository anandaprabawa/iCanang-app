import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Dimensions, Image } from 'react-native';
import { Container, Content, Text, View, Button } from 'native-base';
import styles, { headerTintColor, pinColor } from './styles';

export default class PenjualTerdekat extends Component {
  static navigationOptions = {
    drawerLockMode: 'locked-closed',
    headerTitle: 'Penjual Terdekat',
    headerStyle: styles.headerStyle,
    headerTintColor: headerTintColor,
    headerTitleStyle: {
      fontSize: 19,
      fontFamily: 'Roboto_Medium'
    }
  };

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
      <Container>
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
      </Container>
    );
  }
}
