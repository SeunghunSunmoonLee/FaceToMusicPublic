import uniqBy from 'lodash';
/*
 * SpotifyPage Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export const fetchAlbumsPending = () => {
	return {
		type: 'FETCH_ALBUMS_PENDING'
	};
};

export const fetchAlbumsSuccess = (albums) => {
	return {
		type: 'FETCH_ALBUMS_SUCCESS',
		albums
	};
};

export const fetchAlbumsError = () => {
	return {
		type: 'FETCH_ALBUMS_ERROR'
	};
};

export const fetchAlbums = (accessToken) => {
	return dispatch => {
		const request = new Request(`https://api.spotify.com/v1/me/albums`, {
			headers: new Headers({
				'Authorization': 'Bearer ' + accessToken
			})
		});

		dispatch(fetchAlbumsPending());

		fetch(request).then(res => {
			return res.json();
		}).then(res => {
			dispatch(fetchAlbumsSuccess(res.items));
		}).catch(err => {
			dispatch(fetchAlbumsError(err));
		});
	};
};
export const fetchArtistsPending = () => {
  return {
    type: 'FETCH_ARTISTS_PENDING'
  };
};

export const fetchArtistsSuccess = (artists) => {
  return {
    type: 'FETCH_ARTISTS_SUCCESS',
    artists
  };
};

export const fetchArtistsError = () => {
  return {
    type: 'FETCH_ARTISTS_ERROR'
  };
};

export const fetchArtists = (accessToken, artistIds) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchArtistsPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      dispatch(fetchArtistsSuccess(res));
    }).catch(err => {
      dispatch(fetchArtistsError(err));
    });
  };
};


export const fetchArtistSongsPending = () => {
  return {
    type: 'FETCH_ARTIST_SONGS_PENDING'
  };
};

export const fetchArtistSongsSuccess = (songs) => {
  return {
    type: 'FETCH_ARTIST_SONGS_SUCCESS',
    songs
  };
};

export const fetchArtistSongsError = () => {
  return {
    type: 'FETCH_ARTIST_SONGS_ERROR'
  };
};

export const fetchArtistSongs = (artistId, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchArtistSongsPending());

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      // map the response to match that returned from get song request
      res.items = res.tracks.map(item => {
        return {
          track: item
        };
      });

      dispatch(fetchArtistSongsSuccess(res.items));
    }).catch(err => {
      dispatch(fetchArtistSongsError(err));
    });
  };
};


export const setArtistIds = (artistIds) => {
  return {
    type: 'SET_ARTIST_IDS',
    artistIds
  };
};
export const fetchCategoriesSuccess = (categories) => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    categories
  };
};

export const fetchCategoriesError = () => {
  return {
    type: 'FETCH_CATEGORIES_ERROR'
  };
};

export const fetchCategories = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/browse/categories`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });
    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      dispatch(fetchCategoriesSuccess(res.categories));
    }).catch(err => {
      dispatch(fetchCategoriesError(err));
    });
  };
};

export const fetchNewReleasesSuccess = (newReleases) => {
  return {
    type: 'FETCH_NEW_RELEASES_SUCCESS',
    newReleases
  };
};

export const fetchNewReleasesError = () => {
  return {
    type: 'FETCH_NEW_RELEASES_ERROR'
  };
};

export const fetchNewReleases = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/browse/new-releases`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });
    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      dispatch(fetchNewReleasesSuccess(res.albums));
    }).catch(err => {
      dispatch(fetchNewReleasesError(err));
    });
  };
};

export const fetchFeaturedSuccess = (featured) => {
  return {
    type: 'FETCH_FEATURED_SUCCESS',
    featured
  };
};

export const fetchFeaturedError = () => {
  return {
    type: 'FETCH_FEATURED_ERROR'
  };
};

export const fetchFeatured = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/browse/featured-playlists`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });
    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      dispatch(fetchFeaturedSuccess(res.playlists));
    }).catch(err => {
      dispatch(fetchFeaturedError(err));
    });
  };
};
export const fetchPlaylistMenuPending = () => {
  return {
    type: 'FETCH_PLAYLIST_MENU_PENDING'
  };
};

export const fetchPlaylistMenuSuccess = (playlists) => {
  return {
    type: 'FETCH_PLAYLIST_MENU_SUCCESS',
    playlists
  };
};

export const fetchPlaylistMenuError = () => {
  return {
    type: 'FETCH_PLAYLIST_MENU_ERROR'
  };
};

export const addPlaylistItem = (playlist) => {
  return {
    type: 'ADD_PLAYLIST_ITEM',
    playlist
  };
};

export const fetchPlaylistsMenu = (userId, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchPlaylistMenuPending());

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      dispatch(fetchPlaylistMenuSuccess(res.items));
    }).catch(err => {
      dispatch(fetchPlaylistMenuError(err));
    });
  };
};


export const fetchPlaylistSongsPending = () => {
  return {
    type: 'FETCH_PLAYLIST_SONGS_PENDING'
  };
};

export const fetchPlaylistSongsSuccess = (songs) => {
  return {
    type: 'FETCH_PLAYLIST_SONGS_SUCCESS',
    songs
  };
};

export const fetchPlaylistSongsError = () => {
  return {
    type: 'FETCH_PLAYLIST_SONGS_ERROR'
  };
};

export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchPlaylistSongsPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      //remove duplicate tracks
      res.items = uniqBy(res.items, (item) => {
        return item.track.id;
      });
      dispatch(fetchPlaylistSongsSuccess(res.items));
    }).catch(err => {
      dispatch(fetchPlaylistSongsError(err));
    });
  };
};


export const fetchSongsPending = () => {
  return {
    type: 'FETCH_SONGS_PENDING'
  };
};

export const fetchSongsSuccess = (songs) => {
  return {
    type: 'FETCH_SONGS_SUCCESS',
    songs
  };
};

export const fetchSongsError = () => {
  return {
    type: 'FETCH_SONGS_ERROR'
  };
};

export const fetchSongs = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/tracks?limit=50`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchSongsPending());

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      // get all artist ids and remove duplicates
      let artistIds = uniqBy(res.items, (item) => {
        return item.track.artists[0].name;
      }).map(item => {
        return item.track.artists[0].id;
      }).join(',');

      dispatch(setArtistIds(artistIds));

      dispatch(fetchSongsSuccess(res.items));
    }).catch(err => {
      dispatch(fetchSongsError(err));
    });
  };
};

export const searchSongsPending = () => {
  return {
    type: 'SEARCH_SONGS_PENDING'
  };
};

export const searchSongsSuccess = (songs) => {
  return {
    type: 'SEARCH_SONGS_SUCCESS',
    songs
  };
};

export const searchSongsError = () => {
  return {
    type: 'SEARCH_SONGS_ERROR'
  };
};

export const searchSongs = (searchTerm, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
      })
    });

    dispatch(searchSongsPending());

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      res.items = res.tracks.items.map(item => {
        return {
          track: item
        };
      });
      dispatch(searchSongsSuccess(res.items));
    }).catch(err => {
      dispatch(fetchSongsError(err));
    });
  };
};

export const fetchRecentlyPlayedPending = () => {
  return {
    type: 'FETCH_RECENTLY_PLAYED_PENDING'
  };
};

export const fetchRecentlyPlayedSuccess = (songs) => {
  return {
    type: 'FETCH_RECENTLY_PLAYED_SUCCESS',
    songs
  };
};

export const fetchRecentlyPlayedError = () => {
  return {
    type: 'FETCH_RECENTLY_PLAYED_ERROR'
  };
};

export const fetchRecentlyPlayed = (accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/me/player/recently-played`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchRecentlyPlayedPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      //remove duplicates from recently played
      res.items = uniqBy(res.items, (item) => {
        return item.track.id;
      });
      dispatch(fetchRecentlyPlayedSuccess(res.items));
    }).catch(err => {
      dispatch(fetchRecentlyPlayedError(err));
    });
  };
};

export const playSong = (song) => {
  return {
    type: 'PLAY_SONG',
    song
  };
};

export const stopSong = () => {
  return {
    type: 'STOP_SONG'
  };
};

export const pauseSong = () => {
  return {
    type: 'PAUSE_SONG'
  };
};

export const resumeSong = () => {
  return {
    type: 'RESUME_SONG'
  };
};

export const increaseSongTime = (time) => {
  return {
    type: 'INCREASE_SONG_TIME',
    time
  };
};

export const updateViewType = (view) => {
  return {
    type: 'UPDATE_VIEW_TYPE',
    view
  };
};
export const updateVolume = (volume) => {
  return {
    type: 'UPDATE_VOLUME',
    volume
  };
};
export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    token
  };
};
export const updateHeaderTitle = (title) => {
  return {
    type: 'UPDATE_HEADER_TITLE',
    title
  };
};
export const fetchUserSuccess = (user) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    user
  };
};

export const fetchUserError = () => {
  return {
    type: 'FETCH_USER_ERROR'
  };
};

export const fetchUser = (accessToken) => {

  return dispatch => {
    const request = new Request('https://api.spotify.com/v1/me', {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request).then(res => {
      // send user back to homepage if no token
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      dispatch(fetchUserSuccess(res));
    }).catch(err => {
      dispatch(fetchUserError(err));
    });
  };
};

export const addSongToLibrarySuccess = (songId) => {
  return {
    type: 'ADD_SONG_TO_LIBRARY_SUCCESS',
    songId
  };
};

export const addSongToLibraryError = () => {
  return {
    type: 'ADD_SONG_TO_LIBRARY_ERROR'
  };
};

export const addSongToLibrary = (accessToken, id) => {

  return dispatch => {

    const request = new Request(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    fetch(request).then(res => {
      if(res.ok) {
        dispatch(addSongToLibrarySuccess(id));
      }
    }).catch(err => {
      dispatch(addSongToLibraryError(err));
    });
  };
};
