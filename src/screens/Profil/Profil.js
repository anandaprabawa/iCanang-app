import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-crop-picker';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  DrawerLayoutAndroid,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from 'react-native';
import { Form, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import DrawerContent from 'components/DrawerContent';
import Header from 'components/HeaderBack';
import Modal from 'components/ModalUploadPhotoProfile';

export default class Profil extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: firebase.auth().currentUser,
      margin: 1,
      renderMap: false,
      currentPosition: {
        latitude: 0,
        longitude: 0
      },
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      },
      showMarker: false,
      marker: {
        latitude: null,
        longitude: null
      },
      modalVisible: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ renderMap: true });
    }, 300);
    setTimeout(() => {
      this.setState({ margin: 0 });
    }, 2000);
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
          },
          currentPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => {
        this.animateToRegion();
      },
      { enableHighAccuracy: true }
    );
  }

  async onMapReady() {
    await this.getCurrentPosition();
    await this.animateToRegion();
    this.setState({ showMarker: true });
  }

  onRegionChangeComplete(region) {
    this.setState({ region: region });
  }

  addMarker(e) {
    this.setState({
      showMarker: true,
      marker: {
        latitude: e.coordinate.latitude,
        longitude: e.coordinate.longitude
      }
    });
  }

  renderMarker() {
    return (
      <MapView.Marker
        coordinate={{
          latitude: this.state.marker.latitude
            ? this.state.marker.latitude
            : this.state.currentPosition.latitude,
          longitude: this.state.marker.longitude
            ? this.state.marker.longitude
            : this.state.currentPosition.longitude
        }}
      />
    );
  }

  showModal() {
    this.setState({ modalVisible: true });
  }

  modalHide() {
    this.setState({ modalVisible: false });
  }

  uploadProfilePhoto() {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      compressImageQuality: 0.8
    })
      .then(image => {
        console.log(image);
        ImagePicker.clean()
          .then(() => {
            console.log('removed all tmp images from tmp directory');
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  closeDrawer() {
    this.refs.drawer.closeDrawer();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="Profil"
          navigation={this.props.navigation}
          openDrawer={() => this.openDrawer()}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.viewImageContainer}>
            <TouchableWithoutFeedback onPress={() => this.showModal()}>
              <View style={styles.viewImage}>
                <Icon
                  name="add-a-photo"
                  size={15}
                  color={'#fff'}
                  style={styles.addPhotoIcon}
                />
                <Image
                  source={require('images/no-image.jpg')}
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
            </TouchableWithoutFeedback>
            <Modal
              visible={this.state.modalVisible}
              modalHide={() => this.modalHide()}
            />
          </View>
          <Form style={styles.form}>
            <Item style={styles.formItem}>
              <Input placeholder="Nama Lengkap" autoCapitalize="words" />
            </Item>
            <Item style={styles.formItem}>
              <Input placeholder="Nomor Telepon" />
            </Item>
            <Item style={styles.formItem}>
              <Input placeholder="Email" disabled />
            </Item>
            <View style={styles.viewTextGanti}>
              <Text style={styles.textGanti}>Ganti email</Text>
            </View>
            <Item style={styles.formItem}>
              <Input placeholder="Password" disabled />
            </Item>
            <View style={styles.viewTextGanti}>
              <Text style={styles.textGanti}>Ganti password</Text>
            </View>
            <View style={styles.mapViewContainer}>
              <Text style={styles.titleLokasiToko}>Lokasi Toko</Text>
              <View style={styles.viewMapView}>
                {this.state.renderMap && (
                  <MapView
                    ref={ref => (this.map = ref)}
                    style={[styles.mapView, { margin: this.state.margin }]}
                    region={this.state.region}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    moveOnMarkerPress={false}
                    onMapReady={() => this.onMapReady()}
                    onRegionChangeComplete={e => this.onRegionChangeComplete(e)}
                    onPress={e => this.addMarker(e.nativeEvent)}
                  >
                    {this.state.showMarker && this.renderMarker()}
                  </MapView>
                )}
              </View>
            </View>
            <TouchableNativeFeedback>
              <View style={styles.viewBtnSimpan}>
                <Text style={styles.btnSimpanText}>SIMPAN</Text>
              </View>
            </TouchableNativeFeedback>
          </Form>
        </ScrollView>
      </View>
    );
  }
}
