import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPlaylistSongs, addPlaylistItem, updateHeaderTitle } from '../../../containers/SpotifyPage/actions';
import React from 'react';
import PropTypes from 'prop-types';
import './BrowseView.css';

const BrowseView = ({ view, viewType, token, fetchPlaylistSongs, updateHeaderTitle, addPlaylistItem }) => {

  let browseView;

  if(view) {

    browseView = view.map((item, i) => {

      const getPlaylistSongs = () => {
        addPlaylistItem(item);
        fetchPlaylistSongs(item.owner.id, item.id, token);
        updateHeaderTitle(item.name);
      };

      return(
        <li onClick={viewType === 'Featured' ? getPlaylistSongs : null} className='category-item' key={ i }>
          <div className='category-image'>
            <img src={ item.icons ? item.icons[0].url : item.images[0].url} />
            {viewType === 'Genres' && (
              <p className='category-name'>{ item.name }</p>
            )}
          </div>
        </li>
      );
    });
  }

  return (
    <ul className='browse-view-container'>
      { browseView }
    </ul>
  );
};


BrowseView.propTypes = {
  view: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  viewType:  PropTypes.string,
  token: PropTypes.string,
  fetchPlaylistSongs: PropTypes.func,
  updateHeaderTitle: PropTypes.func,
  addPlaylistItem: PropTypes.func
};

const mapStateToProps = (state) => {

  return {
    view: state.spotify.view,
    viewType: state.spotify.viewType,
    token: state.spotify.token
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    fetchPlaylistSongs,
    updateHeaderTitle,
    addPlaylistItem
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseView);
