import algoliasearch from 'algoliasearch/reactnative';
import firebase from 'react-native-firebase';

const ALGOLIA_ID = 'G0VLMGQYCH';
const ALGOLIA_ADMIN_KEY = '4453c650d6ece603ddfb7f27bb0f7b8f';
const algoria = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const productsIndex = algoria.initIndex('products');
const usersIndex = algoria.initIndex('users');

class Product {
  async getProductById(id) {
    const doc = await firebase
      .firestore()
      .collection('products')
      .doc(id)
      .get();
    this.addOrUpdateProductsRecord(doc.data(), doc.id);
  }

  async addOrUpdateProductsRecord(data, id) {
    const record = data;
    record.objectID = id;
    await productsIndex.saveObject(record);
  }

  async deleteProductsRecord(objectID) {
    await productsIndex.deleteObject(objectID);
  }
}

class Penjual {
  async getPenjualById(id) {
    const doc = await firebase
      .firestore()
      .collection('users')
      .doc(id)
      .get();
    this.addOrUpdatePenjualRecord(doc.data(), doc.id);
  }

  async addOrUpdatePenjualRecord(data, id) {
    const record = data;
    record.objectID = id;
    await usersIndex.saveObject(record);
  }
}

export const AlgoliaProduct = new Product();
export const AlgoliaPenjual = new Penjual();
