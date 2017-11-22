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

const PickerItem = Picker.Item;

export default class EditProduk extends Component {
  constructor(props) {
    super(props);
    const { dataProduk } = props.navigation.state.params;
    this.state = {
      docId: dataProduk.id,
      lokasi: dataProduk.lokasi,
      namaProduk: dataProduk.nama,
      harga: dataProduk.harga,
      imageSource: dataProduk.imageUri,
      imageNewSource: null,
      imagePath: null,
      imageFileName: dataProduk.imageRef,
      imageNewFileName: null,
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
        this.setState({
          imageNewSource: response.uri,
          imagePath: response.path,
          imageNewFileName: response.fileName
        });
      }
    });
  }

  showImage() {
    if (this.state.imageNewSource) {
      return { uri: this.state.imageNewSource };
    } else {
      return { uri: this.state.imageSource };
    }
  }

  async removeImageBefore(path) {
    await firebase
      .storage()
      .ref()
      .child(path)
      .delete();
  }

  async uploadToFirebase() {
    await this.checkUser();

    if (this.state.imageNewSource) {
      const snapshot = await firebase
        .storage()
        .ref('products')
        .child(this.state.imageNewFileName)
        .putFile(this.state.imagePath);

      await this.removeImageBefore(this.state.imageFileName);

      const data = {
        nama: this.state.namaProduk,
        harga: this.state.harga,
        lokasi: this.state.lokasi,
        imageUri: snapshot.downloadURL,
        imageRef: snapshot.ref,
        dateUpdated: firebase.firestore.FieldValue.serverTimestamp()
      };

      await firebase
        .firestore()
        .collection('products')
        .doc(this.state.docId)
        .update(data);

      this.navigateTo();
    } else {
      const data = {
        nama: this.state.namaProduk,
        harga: this.state.harga,
        lokasi: this.state.lokasi,
        dateUpdated: firebase.firestore.FieldValue.serverTimestamp()
      };

      await firebase
        .firestore()
        .collection('products')
        .doc(this.state.docId)
        .update(data);

      this.navigateTo();
    }
  }

  checkFormInput() {
    let errors = {
      namaProduk: null,
      harga: null
    };

    if (!this.state.namaProduk) errors.namaProduk = 'Nama produk harus diisi';
    if (!this.state.harga) errors.harga = 'Harga harus diisi';
    if (isNaN(this.state.harga))
      errors.harga = 'Format harga berupa angka tanpa tanda titik';

    if (this.state.namaProduk && this.state.harga) {
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
    if (this.state.imageNewSource) {
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
    this.setState({
      imageNewSource: null,
      imagePath: null,
      imageNewFileName: null
    });
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
        <Header title="Edit Produk" navigation={this.props.navigation} />
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.viewImage}>
            {this.showCancelImage()}
            <Image source={this.showImage()} style={styles.image} />
          </View>
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
            <Text style={styles.textHeaderPicker}>Pilih Lokasi</Text>
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
            </Picker>
          </Form>
          {this.renderButtonOrSpinner()}
        </ScrollView>
      </Container>
    );
  }
}
