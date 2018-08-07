import { connect } from "react-redux";
import React from 'react';
import PropTypes from 'prop-types';
import './UserDetails.css';

const UserDetails = ({ userImage, displayName}) => {
  return (
    <div className='user-details-container'>
      <img alt='user' className='user-image' src={userImage} />
      <p className='user-name'>{displayName}</p>
    </div>
  );
};

UserDetails.propTypes = {
  userImage: PropTypes.string,
  displayName: PropTypes.string
};

const mapStateToProps = (state) => {

	return {
		displayName: state.spotify.user ? state.spotify.user.display_name : '',
		userImage: state.spotify.user && state.spotify.user.images[0] ? state.spotify.user.images[0].url : ''
	};

};


export default connect(mapStateToProps)(UserDetails);
