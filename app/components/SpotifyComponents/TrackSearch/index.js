import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchSongs } from '../../../containers/SpotifyPage/actions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TrackSearch.css';

class TrackSearch extends Component {

	state = {
	  searchTerm: ''
	};

	updateSearchTerm = (e) => {
	  this.setState({
	    searchTerm: e.target.value
	  });
	}

	render() {
	  return(
	    <div className='track-search-container'>
	      <form onSubmit={() => { this.props.searchSongs(this.state.searchTerm, this.props.token);}}>
	        <input onChange={this.updateSearchTerm} type='text' placeholder='Search...' />
	        <button onClick={(e) => { e.preventDefault(); this.props.searchSongs(this.state.searchTerm, this.props.token);}}>
	          <i className="fa fa-search search" aria-hidden="true"/>
	        </button>
	      </form>
	    </div>
	  );
	}
}

TrackSearch.propTypes = {
  searchSongs: PropTypes.func,
  token: PropTypes.string,
};

const mapStateToProps = (state) => {

  return {
    token: state.spotify.token
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    searchSongs,
  }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(TrackSearch);
