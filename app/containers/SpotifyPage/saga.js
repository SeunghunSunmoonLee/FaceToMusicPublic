/**
 * Gets the repositories of the user from Github
 */

 import { delay } from 'redux-saga'
import { call, take, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
// import { LOAD_REPOS, GET_LISTS, GET_LISTS_SUCCESS, GET_COMMENTS, GET_COMMENTS_SUCCESS, DELETE_COMMENTS, SEARCH_LISTS } from 'containers/App/constants';
import { fetchAlbumsSuccess, fetchAlbumsError, fetchArtistsError, fetchArtistSongsSuccess, fetchArtistSongsError, fetchCategoriesSuccess, fetchCategoriesError, fetchNewReleasesSuccess, fetchNewReleasesError, fetchFeaturedSuccess, fetchFeaturedError, fetchPlaylistMenuSuccess, fetchPlaylistMenuError, fetchPlaylistSongsError, fetchPlaylistSongsSuccess, fetchSongsError, fetchSongsSuccess, setArtistIds, searchSongsSuccess, fetchRecentlyPlayedPending, fetchRecentlyPlayedError, fetchUserError, fetchUserSuccess, addSongToLibraryError, addSongToLibrarySuccess } from './actions';
import faker from 'faker';
import axios from 'axios';
import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import { makeSelectLists } from 'containers/App/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}
/**
 * Comments handler
 */
export function* getComments(action) {
  let comments = []
  const [...lists] = yield select(state => state.global.lists)
  yield axios.get('https://jsonplaceholder.typicode.com/comments', {
      params: {
      }
    })
    .then((response) => {
      comments = response.data.length > 10 ? response.data.slice(0,10) : response.data.slice()
      // lists[0] = {id: 0, name: 'posts', cards: posts}
      // lists[1] = {id: 1, name: 'comments', cards: comments.filter(comment => comment.postId === post.id)}
      comments = comments.filter(comment => comment.postId === action.postId)
      if(!lists.find(list=>list.id ===action.postId)) {
        lists.push({
          id: action.postId,
          name: `Comments of Post ${action.postId}`,
          cards: comments
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    yield put(getCommentsSuccess(lists));
}
export function* deleteComments(action) {
  let comments = []
  const [...lists] = yield select(state => state.global.lists)
  yield lists.splice(lists.findIndex(item => item.id === action.postId), 1)
  yield put(deleteCommentsSuccess(lists));
}

export function* searchLists(action) {
  let comments = []
  /**
   * you are grabbing the reference to some nested object in your state and
   * then you are mutating its content so it gets updated in state too, so when
   * you grab it again on the second run of startSomething you are geting mutated
   * result and you will probably just push to it again so those MORE will just pile up in your state.
   * I would suggest to const [...features] = yield select(selectFeatures)
   */
  const [...lists] = yield select(state => state.global.originalLists)
  const resultCards = lists[0].cards.filter(card => card.title.toLowerCase().includes(action.value.toLowerCase()))
  lists.splice(0, 1, {
    id: 0,
    name: 'Posts',
    cards: resultCards
  })
  yield put(searchListsSuccess(lists));
}
export function* getListsWorkerSaga(action) {
  let lists = [];
  yield axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
      }
    })
    .then((response) => {
      lists.push({
        id: 0,
        name: 'Posts',
        cards: response.data.slice(0,10)
      })
      /**
       *     // lists[0] = {id: 0, name: 'posts', cards: posts}
       *     // lists[1] = {id: 1, name: 'comments', cards: comments.filter(comment => comment.postId === post.id)}
       */

    })
    .catch(function (error) {
      console.log(error);
    });
    /**
     *  Data Model
     */
  // let count = 0;
  // for (let i = 0; i < action.quantity; i++) {
  //   const cards = [];
  //   const randomQuantity = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  //   for (let ic = 0; ic < randomQuantity; ic++) {
  //     cards.push({
  //       id: count,
  //       firstName: faker.name.firstName(),
  //       lastName: faker.name.lastName(),
  //       title: faker.name.jobTitle()
  //     });
  //     count = count + 1;
  //   }
  //   lists.push({
  //     id: i,
  //     name: faker.commerce.productName(),
  //     cards
  //   });
  // }
  yield put(getListsSuccess(lists));
}
// export function* fetchAlbums(action) {
//   const request = new Request(`https://api.spotify.com/v1/me/albums`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//
//   // const username = yield select(makeSelectUsername());
//   // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
//   //
//   // try {
//   //   // Call our request helper (see 'utils/request')
//   //   const repos = yield call(request, requestURL);
//   //   yield put(reposLoaded(repos, username));
//   // } catch (err) {
//   //   yield put(repoLoadingError(err));
//   // }
//
//
//   yield fetch(request).then(res => {
// 			return res.json();
// 		}).then(res => {
//       return put(fetchAlbumsSuccess(res.items))
// 		}).catch(err => {
// 			return put(fetchAlbumsError(err));
// 		});
// }
// export function* fetchArtists(action) {
//   const request = new Request(`https://api.spotify.com/v1/artists?ids=${action.artistIds}`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   })
//
//   yield fetch(request).then(res => {
//       return res.json();
//     }).then(res => {
//       return put(fetchArtistsSuccess(res));
//     }).catch(err => {
//       return put(fetchArtistsError(err));
//     });
// }
// export function* fetchArtistSongs(action) {
//   const request = new Request(`https://api.spotify.com/v1/artists/${action.artistId}/top-tracks?country=US`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//
//   yield fetch(request).then(res => {
//     if(res.statusText === "Unauthorized") {
//       window.location.href = './';
//     }
//     return res.json();
//   }).then(res => {
//     // map the response to match that returned from get song request
//     res.items = res.tracks.map(item => {
//       return {
//         track: item
//       };
//     });
//
//     return put(fetchArtistSongsSuccess(res.items));
//   }).catch(err => {
//     return put(fetchArtistSongsError(err));
//   });
// }
// export function* fetchCategories(action) {
//   const request = new Request(`https://api.spotify.com/v1/browse/categories`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//
//   yield fetch(request).then(res => {
//     return res.json();
//   }).then(res => {
//     return put(fetchCategoriesSuccess(res.categories));
//   }).catch(err => {
//     return put(fetchCategoriesError(err));
//   });
// }
// export function* fetchNewReleases(action) {
//   const request = new Request(`https://api.spotify.com/v1/browse/new-releases`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//   yield fetch(request).then(res => {
//     return res.json();
//   }).then(res => {
//     return put(fetchNewReleasesSuccess(res.albums));
//   }).catch(err => {
//     return put(fetchNewReleasesError(err));
//   });
// }
// export function* fetchFeatured(action) {
//   const request = new Request(`https://api.spotify.com/v1/browse/featured-playlists`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//
//   yield fetch(request).then(res => {
//     return res.json();
//   }).then(res => {
//     return put(fetchFeaturedSuccess(res.playlists));
//   }).catch(err => {
//     return put(fetchFeaturedError(err));
//   });
// }
// export function* fetchPlaylistsMenu(action) {
//   const request = new Request(`https://api.spotify.com/v1/users/${action.userId}/playlists`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//
//   yield fetch(request).then(res => {
//     if(res.statusText === "Unauthorized") {
//       window.location.href = './';
//     }
//     return res.json();
//   }).then(res => {
//     return put(fetchPlaylistMenuSuccess(res.items));
//   }).catch(err => {
//     return put(fetchPlaylistMenuError(err));
//   });
// }
// export function* fetchPlaylistSongs(action) {
//   const request = new Request(`https://api.spotify.com/v1/users/${action.userId}/playlists/${action.playlistId}/tracks`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//
//   yield fetch(request).then(res => {
//     return res.json();
//   }).then(res => {
//     //remove duplicate tracks
//     res.items = uniqBy(res.items, (item) => {
//       return item.track.id;
//     });
//     return put(fetchPlaylistSongsSuccess(res.items));
//   }).catch(err => {
//     return put(fetchPlaylistSongsError(err));
//   });
// }
// export function* fetchSongs(action) {
//   const request = new Request(`https://api.spotify.com/v1/me/tracks?limit=50`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//
//   yield fetch(request).then(res => {
//     if(res.statusText === "Unauthorized") {
//       window.location.href = './';
//     }
//     return res.json();
//   }).then(res => {
//     // get all artist ids and remove duplicates
//     let artistIds = uniqBy(res.items, (item) => {
//       return item.track.artists[0].name;
//     }).map(item => {
//       return item.track.artists[0].id;
//     }).join(',');
//
//     return all([put(setArtistIds(artistIds)), put(fetchSongsSuccess(res.items))]);
//
//   }).catch(err => {
//     return put(fetchSongsError(err));
//   });
// }
// export function* searchSongs(action) {
//   const request = new Request(`https://api.spotify.com/v1/search?q=${action.searchTerm}&type=track`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken,
//       'Accept': 'application/json'
//     })
//   });
//
//   yield fetch(request).then(res => {
//     if(res.statusText === "Unauthorized") {
//       window.location.href = './';
//     }
//     return res.json();
//   }).then(res => {
//     res.items = res.tracks.items.map(item => {
//       return {
//         track: item
//       };
//     });
//     return put(searchSongsSuccess(res.items));
//   }).catch(err => {
//     return put(fetchSongsError(err));
//   });
// }
// export function* fetchRecentlyPlayed(action) {
//   const request = new Request(`https://api.spotify.com/v1/me/player/recently-played`, {
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//
//   yield fetch(request).then(res => {
//     return res.json();
//   }).then(res => {
//     //remove duplicates from recently played
//     res.items = uniqBy(res.items, (item) => {
//       return item.track.id;
//     });
//     return put(fetchRecentlyPlayedSuccess(res.items));
//   }).catch(err => {
//     return put(fetchRecentlyPlayedError(err));
//   });
// }
// export function* fetchUser(action) {
//   // const request = new Request('https://api.spotify.com/v1/me', {
//   //   headers: new Headers({
//   //     'Authorization': 'Bearer ' + action.accessToken
//   //   })
//   // });
//
//   try {
//     const res = axios({
//         method: 'GET',
//         headers: { 'Authorization': 'Bearer ' + action.accessToken },
//         'https://api.spotify.com/v1/me',
//     })
//     yield put(loadDataSuccess(res.data));
//   } catch (err) {
//     console.log(err);
//     yield put(failure(err.response));
//   }
//
//   axios({
//     method: 'GET',
//     headers: { 'Authorization': 'Bearer ' + action.accessToken },
//     'https://api.spotify.com/v1/me',
//   })
//   .then(res => {
//     console.log("response")
//     if(res.statusText === "Unauthorized") {
//       window.location.href = './';
//     }
//     return res.json();
//   })
//   .catch(err => {
//
//   })
//
//   yield fetch(request).then(res => {
//     // send user back to homepage if no token
//     if(res.statusText === "Unauthorized") {
//       window.location.href = './';
//     }
//     return res.json();
//   }).then(res => {
//     return put(fetchUserSuccess(res));
//   }).catch(err => {
//     return put(fetchUserError(err));
//   });
// }
// export function* addSongToLibrary(action) {
//   const request = new Request(`https://api.spotify.com/v1/me/tracks?ids=${action.id}`, {
//     method: 'PUT',
//     headers: new Headers({
//       'Authorization': 'Bearer ' + action.accessToken
//     })
//   });
//
//   yield fetch(request).then(res => {
//     if(res.ok) {
//       return put(addSongToLibrarySuccess(id));
//     }
//   }).catch(err => {
//     return put(addSongToLibraryError(err));
//   });
// }
/**
 * Root saga manages watcher lifecycle
 */
export default function* watcherSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount


  // yield takeLatest('FETCH_ALBUMS', fetchAlbums);
  // yield takeLatest('FETCH_ARTISTS', fetchArtists);
  // yield takeLatest('FETCH_ARTIST_SONGS', fetchArtistSongs);
  // yield takeLatest('FETCH_CATEGORIES', fetchCategories);
  // yield takeLatest('FETCH_NEW_RELEASES', fetchNewReleases);
  // yield takeLatest('FETCH_FEATURED', fetchFeatured);
  // yield takeLatest('FETCH_PLAYLISTS_MENU', fetchPlaylistsMenu);
  // yield takeLatest('FETCH_PLAYLIST_SONGS', fetchPlaylistSongs);
  // yield takeLatest('FETCH_SONGS', fetchSongs);
  // yield takeLatest('SEARCH_SONGS', searchSongs);
  // yield takeLatest('FETCH_RECENTLY_PLAYED', fetchRecentlyPlayed);
  // yield takeLatest('FETCH_USER', fetchUser);
  // yield takeLatest('ADD_SONG_TO_LIBRARY', addSongToLibrary);
}
