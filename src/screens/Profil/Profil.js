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
  TouchableNativeFeedback,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { Form, Item, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles, { iconColor, spinnerColor } from './styles';
import DrawerContent from 'components/DrawerContent';
import Header from 'components/HeaderBack';
import Modal from 'components/ModalUploadPhotoProfile';
import { AlgoliaPenjual } from 'providers/algolia';

export default class Profil extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      displayError: false,
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
      modalVisible: false,
      imageUri: null,
      namaLengkap: null,
      nomorPonsel: null
    };
  }

  componentDidMount() {
    this.getUser();
    setTimeout(() => {
      this.setState({ renderMap: true });
    }, 300);
    setTimeout(() => {
      this.setState({ margin: 0 });
    }, 2000);
  }

  getUser() {
    firebase
      .firestore()
      .collection('users')
      .doc(this.state.user.uid)
      .onSnapshot(doc => {
        this.setState({
          namaLengkap: doc.data().namaLengkap,
          nomorPonsel: doc.data().nomorPonsel,
          imageUri: doc.data().imageUri ? doc.data().imageUri : null,
          marker: {
            latitude: doc.data().lokasi.latitude,
            longitude: doc.data().lokasi.longitude
          }
        });
      });
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

  async uploadFoto(image) {
    const result = await firebase
      .storage()
      .ref('profiles')
      .child(image.filename)
      .putFile(image.path);

    await firebase
      .firestore()
      .collection('users')
      .doc(this.state.user.uid)
      .update({
        imageUri: result.downloadURL
      });
  }

  async onPressKamera() {
    try {
      this.modalHide();
      const image = await ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
        compressImageQuality: 0.8,
        hideBottomControls: true
      });
    } catch (error) {}
  }

  async onPressPilihFoto() {
    try {
      this.modalHide();
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        compressImageQuality: 0.8,
        hideBottomControls: true,
        mediaType: 'photo',
        cropperCircleOverlay: true
      });
      image.filename = image.path.match(/[^/]+$/g).join('');
      await this.uploadFoto(image);
    } catch (error) {}
  }

  pickFoto() {
    if (this.state.imageUri) {
      return { uri: this.state.imageUri };
    } else {
      return require('images/no-image.jpg');
    }
  }

  async updateUserProfile() {
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(this.state.user.uid)
        .update({
          namaLengkap: this.state.namaLengkap,
          nomorPonsel: this.state.nomorPonsel,
          lokasi: {
            latitude: this.state.marker.latitude
              ? this.state.marker.latitude
              : this.state.currentPosition.latitude,
            longitude: this.state.marker.longitude
              ? this.state.marker.longitude
              : this.state.currentPosition.longitude
          }
        });
      AlgoliaPenjual.getPenjualById(this.state.user.uid);
      ToastAndroid.showWithGravityAndOffset(
        'Update Berhasil',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      this.setState({ loading: false });
    } catch (error) {
      if (error) {
        ToastAndroid.showWithGravityAndOffset(
          'Update Gagal',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        this.setState({ loading: false });
      }
    }
  }

  onPressSimpan() {
    this.setState({ loading: true });
    if (this.inputError()) {
      this.setState({ loading: false, displayError: true });
    } else {
      this.updateUserProfile();
    }
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          size="large"
          color={spinnerColor}
          style={styles.spinner}
        />
      );
    } else {
      return (
        <TouchableNativeFeedback onPress={() => this.onPressSimpan()}>
          <View style={styles.viewBtnSimpan}>
            <Text style={styles.btnSimpanText}>SIMPAN</Text>
          </View>
        </TouchableNativeFeedback>
      );
    }
  }

  inputError() {
    if (!this.state.namaLengkap || !this.state.nomorPonsel) {
      return true;
    } else {
      return false;
    }
  }

  displayError(input) {
    if (this.state.displayError) {
      if (!this.state.namaLengkap && input === 'namaLengkap') return true;
      if (!this.state.nomorPonsel && input === 'nomorPonsel') return true;
    }
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
                  color={iconColor}
                  style={styles.addPhotoIcon}
                />
                <Image
                  source={this.pickFoto()}
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
            </TouchableWithoutFeedback>
            <Modal
              visible={this.state.modalVisible}
              modalHide={() => this.modalHide()}
              onPressKamera={() => this.onPressKamera()}
              onPressPilihFoto={() => this.onPressPilihFoto()}
            />
          </View>
          <Form style={styles.form}>
            <View style={styles.formItemContainer}>
              <Text style={styles.textItem}>Nama Lengkap</Text>
              <Item style={styles.formItem}>
                <Input
                  style={styles.itemInput}
                  placeholder="Nama Lengkap"
                  autoCapitalize="words"
                  value={this.state.namaLengkap}
                  onChangeText={text => this.setState({ namaLengkap: text })}
                />
              </Item>
              {this.displayError('namaLengkap') && (
                <Text style={styles.inputError}>Nama lengkap harus diisi</Text>
              )}
            </View>
            <View style={styles.formItemContainer}>
              <Text style={styles.textItem}>Nomor Ponsel</Text>
              <Item style={styles.formItem}>
                <Input
                  style={styles.itemInput}
                  placeholder="Nomor Ponsel"
                  value={this.state.nomorPonsel}
                  onChangeText={num => this.setState({ nomorPonsel: num })}
                />
              </Item>
              {this.displayError('nomorPonsel') && (
                <Text style={styles.inputError}>Nomor ponsel harus diisi</Text>
              )}
            </View>
            <View style={styles.formItemContainer}>
              <Text style={styles.textItem}>Email</Text>
              <Item style={styles.formItem}>
                <Input
                  style={styles.itemInput}
                  placeholder="Email"
                  value={this.state.user.email}
                  disabled
                />
              </Item>
              <View style={styles.viewTextGanti}>
                <Text style={styles.textGanti}>Ganti email</Text>
              </View>
            </View>
            <View style={styles.formItemContainer}>
              <Text style={styles.textItem}>Password</Text>
              <Item style={styles.formItem}>
                <Input
                  style={styles.itemInput}
                  placeholder="Password"
                  value="qwerty"
                  secureTextEntry={true}
                  disabled
                />
              </Item>
              <View style={styles.viewTextGanti}>
                <Text style={styles.textGanti}>Ganti password</Text>
              </View>
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
            {this.renderButtonOrSpinner()}
          </Form>
        </ScrollView>
      </View>
    );
  }
}
