import algoliasearch from 'algoliasearch/reactnative';
import firebase from 'react-native-firebase';

const ALGOLIA_ID = 'G0VLMGQYCH';
const ALGOLIA_ADMIN_KEY = '4453c650d6ece603ddfb7f27bb0f7b8f';
const algoria = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const productsIndex = algoria.initIndex('products');
const usersIndex = algoria.initIndex('users');

class SearchAlgolia {
  search(query) {
    productsIndex
      .search({
        query: query,
        attributesToRetrieve: ['nama'],
        hitsPerPage: 8
      })
      .then(responses => {
        console.log(responses);
      });
  }
}

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

export default new SearchAlgolia();
export const AlgoliaProduct = new Product();
