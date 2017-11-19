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
  View,
  Picker
} from 'native-base';
import styles, { placeholderColor } from './styles';
import Header from 'components/HeaderBack';

const PickerItem = Picker.Item;

export default class TambahProduk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lokasi: null,
      namaProduk: null,
      harga: null
    };
  }

  onValueChange(value) {
    this.setState({
      lokasi: value
    });
  }

  focusNextField = next => {
    this.refs[next]._root.focus();
  };

  render() {
    return (
      <Container>
        <Header title="Tambah Produk" navigation={this.props.navigation} />
        <Content showsVerticalScrollIndicator={false}>
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
            <Item style={styles.formItem}>
              <Input
                ref="namaProduk"
                placeholder="Nama Produk"
                placeholderTextColor={placeholderColor}
                returnKeyType="next"
                onChangeText={namaProduk => this.setState({ namaProduk })}
                value={this.state.namaProduk}
                onSubmitEditing={() => this.focusNextField('harga')}
                blurOnSubmit={false}
              />
            </Item>
            <Item style={styles.formItem}>
              <Input
                ref="harga"
                placeholder="Harga"
                keyboardType="numeric"
                placeholderTextColor={placeholderColor}
                returnKeyType="done"
                onChangeText={harga => this.setState({ harga })}
                value={this.state.harga}
              />
            </Item>
            <Text style={styles.textHeaderPicker}>Pilih Lokasi</Text>
            <Picker
              style={styles.picker}
              mode="dialog"
              selectedValue={this.state.lokasi}
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
      </Container>
    );
  }
}
