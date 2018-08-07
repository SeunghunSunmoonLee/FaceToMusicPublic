import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import './ArtWork.css';

const ArtWork = (albumArtwork) => {
  return (
    <div className='album-artwork-container'>
      <img className='album-artwork' src={ albumArtwork.albumImage } />
    </div>
  );
};

ArtWork.propTypes = {
  albumArtwork: PropTypes.string
};

const mapStateToProps = (state) => {

  return {
    albumImage: state.spotify.songDetails ? state.spotify.songDetails.album.images[0].url : ''
  };

};

export default connect(mapStateToProps)(ArtWork);
