import algoliasearch from 'algoliasearch/reactnative';
import firebase from 'react-native-firebase';

const ALGOLIA_ID = 'G0VLMGQYCH';
const ALGOLIA_ADMIN_KEY = '4453c650d6ece603ddfb7f27bb0f7b8f';
const algoria = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const productsIndex = algoria.initIndex('products');
const usersIndex = algoria.initIndex('users');

class SearchAlgolia {
  listenProducts() {
    firebase
      .firestore()
      .collection('products')
      .onSnapshot(snapshots => {
        console.log(snapshots);
      });
  }

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

export default new SearchAlgolia();
