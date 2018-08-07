/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import {
  CHANGE_USERNAME,
} from './constants';

// The initial state of the App
const initialState = {
  username: '',
  artistIds: '',
  fetchSongsPending: true,
  songPlaying: false,
  timeElapsed: 0,
  songId: 0,
  viewType:'songs',
  songPaused: true,
  title: 'Songs',
};

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return { ...state, username: action.name.replace(/@/gi, '') };
    case "FETCH_ALBUMS_PENDING":
      return {
        ...state,
        fetchAlbumsPending: true
      };

    case "FETCH_ALBUMS_SUCCESS":
      return {
        ...state,
        albums: action.albums,
        fetchAlbumsError: false,
        fetchAlbumsPending: false
      };

    case "FETCH_ALBUMS_ERROR":
      return {
        ...state,
        fetchAlbumsError: true,
        fetchAlbumsPending: false
      };
      case "SET_ARTIST_IDS":
       return {
         ...state,
         artistIds: action.artistIds
       };

     case "FETCH_ARTISTS_PENDING":
       return {
         ...state,
         fetchArtistsPending: true
       };

     case "FETCH_ARTISTS_SUCCESS":
       return {
         ...state,
         artistList: action.artists,
         fetchArtistsError: false,
         fetchArtistsPending: false
       };

     case "FETCH_ARTISTS_ERROR":
       return {
         ...state,
         fetchArtistsError: true,
         fetchArtistsPending: false
       };
     case "FETCH_CATEGORIES_SUCCESS":
       return {
         ...state,
         view: action.categories.items,
         fetchCategoriesError: false
       };

     case "FETCH_CATEGORIES_ERROR":
       return {
         ...state,
         fetchCategoriesError: true
       };

     case "FETCH_NEW_RELEASES_SUCCESS":
       return {
         ...state,
         view: action.newReleases.items,
         fetchNewReleasesError: false
       };

     case "FETCH_NEW_RELEASES_ERROR":
       return {
         ...state,
         fetchNewReleasesError: true
       };

     case "FETCH_FEATURED_SUCCESS":
       return {
         ...state,
         view: action.featured.items,
         fetchFeaturedError: false
       };

     case "FETCH_FEATURED_ERROR":
       return {
         ...state,
         fetchFeaturedError: true
       };
       case "FETCH_PLAYLIST_MENU_PENDING":
         return {
           fetchPlaylistPending: true,
           ...state
         };

       case "FETCH_PLAYLIST_MENU_SUCCESS":
         return {
           playlistMenu: action.playlists,
           playlists: action.playlists,
           fetchPlaylistError: false,
           fetchPlaylistPending: false,
           ...state
         };

       case "ADD_PLAYLIST_ITEM":
         return {
           ...state,
           playlists: [
             ...state.playlists,
             action.playlist
           ]
         };

       case "FETCH_PLAYLIST_MENU_ERROR":
         return {
           fetchPlaylistError: true,
           fetchPlaylistPending: false,
           ...state
         };
         case "UPDATE_VIEW_TYPE":
           return {
             ...state,
             viewType: action.view
           };

         case "FETCH_SONGS_PENDING":
           return {
             ...state,
             fetchSongsPending: true
           };

         case "FETCH_SONGS_SUCCESS":
           return {
             ...state,
             songs: action.songs,
             fetchSongsError: false,
             fetchSongsPending: false,
             viewType: 'songs'
           };

         case "FETCH_SONGS_ERROR":
           return {
             ...state,
             fetchSongsError: true,
             fetchSongsPending: false
           };

         case "SEARCH_SONGS_PENDING":
           return {
             ...state,
             searchSongsPending: true
           };

         case "SEARCH_SONGS_SUCCESS":
           return {
             ...state,
             songs: action.songs,
             searchSongsError: false,
             searchSongsPending: false,
             viewType: 'search'
           };

         case "SEARCH_SONGS_ERROR":
           return {
             ...state,
             searchSongsError: true,
             searchSongsPending: false
           };

         case "FETCH_RECENTLY_PLAYED_PENDING":
           return {
             ...state,
             fetchSongsPending: true
           };

         case "FETCH_RECENTLY_PLAYED_SUCCESS":
           return {
             ...state,
             songs: action.songs,
             viewType: 'Recently Played',
             fetchSongsError: false,
             fetchSongsPending: false
           };

         case "FETCH_RECENTLY_PLAYED_ERROR":
           return {
             ...state,
             fetchSongsError: true,
             fetchSongsPending: false
           };

         case "FETCH_PLAYLIST_SONGS_PENDING":
           return {
             ...state,
             fetchPlaylistSongsPending: true
           };

         case "FETCH_PLAYLIST_SONGS_SUCCESS":
           return {
             ...state,
             songs: action.songs,
             viewType: 'playlist',
             fetchPlaylistSongsError: false,
             fetchPlaylistSongsPending: false
           };

         case "FETCH_PLAYLIST_SONGS_ERROR":
           return {
             ...state,
             fetchPlaylistSongsError: true,
             fetchPlaylistSongsPending: false
           };

         case "FETCH_ARTIST_SONGS_PENDING":
           return {
             ...state,
             fetchArtistSongsPending: true
           };

         case "FETCH_ARTIST_SONGS_SUCCESS":
           return {
             ...state,
             songs: action.songs,
             viewType: 'Artist',
             fetchArtistSongsError: false,
             fetchArtistSongsPending: false
           };

         case "FETCH_ARTIST_SONGS_ERROR":
           return {
             ...state,
             fetchArtistSongsError: true,
             fetchArtistSongsPending: false
           };

         case "PLAY_SONG":
           return {
             ...state,
             songPlaying: true,
             songDetails: action.song,
             songId: action.song.id,
             timeElapsed: 0,
             songPaused: false
           };

         case "STOP_SONG":
           return {
             ...state,
             songPlaying: false,
             songDetails: null,
             timeElapsed: 0,
             songPaused: true
           };

         case "PAUSE_SONG":
           return {
             ...state,
             songPaused: true
           };

         case "RESUME_SONG":
           return {
             ...state,
             songPaused: false
           };

         case "INCREASE_SONG_TIME":
           return {
             ...state,
             timeElapsed: action.time
           };
           case "UPDATE_VOLUME":
             return {
               volume: action.volume
             };
             case "SET_TOKEN":
               return {
                 ...state,
                 token: action.token
               };
               case "UPDATE_HEADER_TITLE":
                 return {
                   ...state,
                   title: action.title
                 };
                 case "FETCH_USER_SUCCESS":
                   return {
                     ...state,
                     user: action.user,
                     fetchUserError: false
                   };

                 case "FETCH_USER_ERROR":
                   return {
                     ...state,
                     fetchUserError: true
                   };

                 case "ADD_SONG_TO_LIBRARY_SUCCESS":
                   return {
                     ...state,
                     songAddedToLibrary: true,
                     songId: action.songId
                   };

                 case "ADD_SONG_TO_LIBRARY_ERROR":
                   return {
                     ...state,
                     songAddedToLibrary: false
                   };
    default:
      return state;
  }
}

export default homeReducer;
