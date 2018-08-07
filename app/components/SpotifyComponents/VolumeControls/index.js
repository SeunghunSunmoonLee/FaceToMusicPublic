import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateVolume } from '../../../containers/SpotifyPage/actions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VolumeControls.css';

class VolumeControls extends Component {

  constructor(props) {

    super(props);
    this.state = {
      volume: props.volume
    };

  }

	updateVolume = (e) => {

	  this.setState({
	    volume: e.target.value
	  });

	  this.props.updateVolume(Math.ceil(e.target.value / 10) * 10);
	}


	render() {

	  return (
	    <div className='volume-container'>
	      <i className="fa fa-volume-up" aria-hidden="true"/>
	      <input className='volume' type="range" min={0} max={100} value={this.state.volume} onChange={this.updateVolume} />
	    </div>
	  );

	}
}

VolumeControls.propTypes = {
  volume: PropTypes.number,
  updateVolume: PropTypes.func
};

const mapStateToProps = (state) => {

  return {
    volume: state.spotify.volume
  };

};

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    updateVolume
  }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControls);
