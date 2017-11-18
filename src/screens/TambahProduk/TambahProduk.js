import React, { Component } from 'react';
import { Image } from 'react-native';
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
  Picker,
  View
} from 'native-base';
import styles, { headerTintColor } from './styles';
import Header from 'components/HeaderBack';

const PickerItem = Picker.Item;

export default class TambahProduk extends Component {
  static navigationOptions = props => ({
    header: <Header title="Tambah Produk" navigation={props.navigation} />
  });

  constructor(props) {
    super(props);
    this.state = {
      selected1: null
    };
  }

  onValueChange(value) {
    this.setState({
      selected1: value
    });
  }

  render() {
    return (
      <Content style={styles.contentStyle} showsVerticalScrollIndicator={false}>
        <View style={styles.viewImage}>
          <Image
            source={require('../../assets/images/no-image.jpg')}
            style={styles.image}
          />
        </View>
        <Button block bordered iconLeft style={styles.btnUpload}>
          <Icon
            android="md-image"
            ios="ios-image"
            style={styles.btnUploadIcon}
          />
          <Text style={styles.btnUplaodText}>Upload Gambar</Text>
        </Button>
        <Form>
          <Item floatingLabel style={styles.formItem}>
            <Label>Nama Produk</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.formItem}>
            <Label>Harga</Label>
            <Input />
          </Item>
          <Text style={styles.textHeaderPicker}>Pilih Lokasi</Text>
          <Picker
            style={styles.picker}
            mode="dropdown"
            placeholder="Lokasi"
            note={false}
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Item label="Denpasar" value="key0" />
            <Item label="Badung" value="key1" />
            <Item label="Gianyar" value="key2" />
            <Item label="Tabanan" value="key3" />
          </Picker>
        </Form>
        <Button block style={styles.btnSimpan}>
          <Text>Simpan</Text>
        </Button>
      </Content>
    );
  }
}
