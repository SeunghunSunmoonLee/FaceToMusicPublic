import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSongs, fetchRecentlyPlayed, updateViewType, fetchAlbums, fetchArtists, fetchFeatured, updateHeaderTitle } from '../../../containers/SpotifyPage/actions';
import React from 'react';
import PropTypes from 'prop-types';
import './SideMenu.css';

const SideMenu = ({
  updateHeaderTitle,
  updateViewType,
  fetchFeatured,
  fetchRecentlyPlayed,
  fetchSongs,
  fetchAlbums,
  fetchArtists,
  token,
  title,
  artistIds
}) => {


  const handleClick = (name)  => {
    updateHeaderTitle(name);
    updateViewType(name);
  };

  const handleBrowseClick = ()  => {
    updateHeaderTitle('Browse');
    updateViewType('Featured');
    fetchFeatured(token);
  };

  const renderSideMenu = () => {
    const menu = [
      {
        name: 'Recently Played',
        action: fetchRecentlyPlayed
      },
      {
        name: 'Songs',
        action: fetchSongs
      },
      {
        name: 'Albums',
        action: fetchAlbums
      },
      {
        name: 'Artists',
        action: fetchArtists,
        getArtists: true
      }
    ];

    return menu.map(item => {
      return (
        <li key={ item.name }
          className={title === item.name ? 'active side-menu-item': 'side-menu-item'}
          onClick={() => {
            item.getArtists ? item.action(token, artistIds) : item.action(token);
            handleClick(item.name); }
          }>
          { item.name }
        </li>
      );
    });
  };

  return (
    <ul className='side-menu-container'>
      <li onClick={ handleBrowseClick } className={title === 'Browse' ? 'active side-menu-item': 'side-menu-item'}>Browse</li>
      <li className='side-menu-item radio'>Radio</li>
      <h3 className='user-library-header'>Your Library</h3>
      {
        renderSideMenu()
      }
    </ul>
  );

};

SideMenu.propTypes = {
  updateHeaderTitle: PropTypes.func,
  updateViewType: PropTypes.func,
  fetchFeatured: PropTypes.func,
  fetchRecentlyPlayed: PropTypes.func,
  fetchSongs: PropTypes.func,
  fetchAlbums: PropTypes.func,
  fetchArtists: PropTypes.func,
  token: PropTypes.string,
  artistIds: PropTypes.string,
  title: PropTypes.string
};

const mapStateToProps = (state) => {

  return {
    userId: state.spotify.user ? state.spotify.user.id : '',
    token: state.spotify.token ? state.spotify.token : '',
    artistIds: state.spotify.artistIds,
    title: state.spotify.title
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    fetchRecentlyPlayed,
    fetchSongs,
    fetchAlbums,
    fetchArtists,
    fetchFeatured,
    updateViewType,
    updateHeaderTitle,
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
