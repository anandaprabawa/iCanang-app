import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { NavigationActions } from 'react-navigation';
import VectorIcon from 'react-native-vector-icons/MaterialIcons';
import {
  Image,
  ImageEditor,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Form,
  Item,
  Label,
  Input,
  View,
  Picker
} from 'native-base';

import styles, {
  placeholderColor,
  iconCancelColor,
  spinnerColor
} from './styles';
import Header from 'components/HeaderBack';
import { AlgoliaProduct } from 'providers/algolia';

const PickerItem = Picker.Item;

export default class TambahProduk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lokasi: 'Denpasar',
      namaProduk: null,
      harga: null,
      imageSource: null,
      imagePath: null,
      imageFileName: null,
      loading: null,
      user: null,
      displayError: false
    };
    this.unsubscribe = null;
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  formatHarga(str) {
    if (str) {
      const harga = str.match(/\d/g).join('');
      this.setState({ harga: harga });
    } else {
      this.setState({ harga: str });
    }
  }

  onValueChange(value) {
    this.setState({
      lokasi: value
    });
  }

  focusNextField = next => {
    this.refs[next]._root.focus();
  };

  getFoto() {
    const options = {
      title: 'Pilih Foto',
      cancelButtonTitle: 'Batal',
      takePhotoButtonTitle: 'Ambil Foto',
      chooseFromLibraryButtonTitle: 'Pilih dari Galeri',
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        const source = { uri: response.uri };
        this.setState({
          imageSource: source,
          imagePath: response.path,
          imageFileName: response.fileName
        });
      }
    });
  }

  showImage() {
    if (this.state.imageSource) {
      return this.state.imageSource;
    } else {
      return require('images/no-image.jpg');
    }
  }

  async uploadToFirebase() {
    const snapshot = await firebase
      .storage()
      .ref('products')
      .child(this.state.imageFileName)
      .putFile(this.state.imagePath);

    await this.checkUser();

    const data = {
      uid: this.state.user.uid,
      nama: this.state.namaProduk,
      harga: this.state.harga,
      // lokasi: this.state.lokasi,
      imageUri: snapshot.downloadURL,
      imageRef: snapshot.ref,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp()
    };

    const result = await firebase
      .firestore()
      .collection('products')
      .add(data);

    AlgoliaProduct.getProductById(result.id);
    this.navigateTo();
  }

  checkFormInput() {
    let errors = {
      image: null,
      namaProduk: null,
      harga: null
    };

    if (!this.state.imagePath) errors.image = 'Foto harus diisi';
    if (!this.state.namaProduk) errors.namaProduk = 'Nama produk harus diisi';
    if (!this.state.harga) errors.harga = 'Harga harus diisi';
    if (isNaN(this.state.harga))
      errors.harga = 'Format harga berupa angka tanpa tanda titik';

    if (this.state.imagePath && this.state.namaProduk && this.state.harga) {
      return false;
    } else {
      return errors;
    }
  }

  displayError(inputName) {
    const errors = this.checkFormInput();
    if (errors[inputName] && this.state.displayError)
      if (inputName === 'image')
        return <Text style={styles.errorMsgImage}>{errors[inputName]}</Text>;
      else return <Text style={styles.errorMsg}>{errors[inputName]}</Text>;
  }

  checkUser() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user });
    });
  }

  navigateTo() {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Beranda' }),
          NavigationActions.navigate({ routeName: 'Produk' })
        ]
      })
    );
  }

  showCancelImage() {
    if (this.state.imageSource) {
      return (
        <View style={styles.viewIconCancel}>
          <VectorIcon
            name="cancel"
            size={40}
            color={iconCancelColor}
            onPress={() => this.onPressCancelImage()}
          />
        </View>
      );
    }
  }

  onPressCancelImage() {
    this.setState({ imageSource: null, imagePath: null, imageFileName: null });
  }

  onPressSimpan() {
    this.setState({ loading: true });
    const errors = this.checkFormInput();
    if (!errors) {
      this.uploadToFirebase();
    } else {
      this.setState({ loading: false, displayError: true });
    }
  }

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return (
        <View style={styles.viewSpinner}>
          <ActivityIndicator size="large" color={spinnerColor} />
        </View>
      );
    } else {
      return (
        <Button
          block
          style={styles.btnSimpan}
          onPress={() => this.onPressSimpan()}
        >
          <Text>Simpan</Text>
        </Button>
      );
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header title="Tambah Produk" navigation={this.props.navigation} />
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.viewImage}>
            {this.showCancelImage()}
            <Image source={this.showImage()} style={styles.image} />
          </View>
          {this.displayError('image')}
          <Button
            block
            bordered
            iconLeft
            style={styles.btnUpload}
            onPress={() => this.getFoto()}
          >
            <Icon
              android="md-image"
              ios="ios-image"
              style={styles.btnUploadIcon}
            />
            <Text style={styles.btnUplaodText}>Upload Foto</Text>
          </Button>
          <Form>
            <Item style={styles.formItem}>
              <Input
                ref="namaProduk"
                placeholder="Nama Produk"
                placeholderTextColor={placeholderColor}
                returnKeyType="next"
                autoCapitalize="words"
                onChangeText={namaProduk => this.setState({ namaProduk })}
                value={this.state.namaProduk}
                onSubmitEditing={() => this.focusNextField('harga')}
                blurOnSubmit={false}
              />
            </Item>
            {this.displayError('namaProduk')}
            <Item style={styles.formItem}>
              <Input
                ref="harga"
                placeholder="Harga"
                keyboardType="numeric"
                placeholderTextColor={placeholderColor}
                returnKeyType="done"
                onChangeText={harga => this.formatHarga(harga)}
                value={this.state.harga}
              />
            </Item>
            {this.displayError('harga')}
            {/* <Text style={styles.textHeaderPicker}>Pilih Lokasi</Text>
            <Picker
              style={styles.picker}
              mode="dialog"
              selectedValue={this.state.lokasi}
              onValueChange={value => this.onValueChange(value)}
            >
              <Item label="Denpasar" value="Denpasar" />
              <Item label="Badung" value="Badung" />
              <Item label="Gianyar" value="Gianyar" />
              <Item label="Tabanan" value="Tabanan" />
            </Picker> */}
          </Form>
          {this.renderButtonOrSpinner()}
        </ScrollView>
      </Container>
    );
  }
}
