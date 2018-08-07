/*
 * SpotifyPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button } from 'antd';
// import { makeGlobalState, makeFormValue, makeSelectAnswers, makeSelectQuestions, makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { Switch, Route } from 'react-router-dom';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H2 from 'components/H2';
import Header from 'components/SpotifyComponents/Header';
import Footer from 'components/SpotifyComponents/Footer';
import UserPlaylists from 'components/SpotifyComponents/UserPlaylists';
import MainView from 'components/SpotifyComponents/MainView';
import ArtWork from 'components/SpotifyComponents/ArtWork';
import MainHeader from 'components/SpotifyComponents/MainHeader';
import SideMenu from 'components/SpotifyComponents/SideMenu';
// import ImageToMusic from 'components/ImageToMusic';

import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { playSong, stopSong, pauseSong, resumeSong, setToken, fetchUser } from './actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

import showResults from './showResults'
import './index.css';
import './fonts/fonts.css';

export class SpotifyPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
   static audio;

 	componentDidMount() {

 	  let hashParams = {};
 	  let e, r = /([^&;=]+)=?([^&;]*)/g,
 	    q = window.location.hash.substring(1);
 	  while ( e = r.exec(q)) {
 	    hashParams[e[1]] = decodeURIComponent(e[2]);
 	  }

 	  if(!hashParams.access_token) {
 	    window.location.href = 'https://accounts.spotify.com/authorize?client_id=b8081580fd4b4b2082a7a784483fa0af&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/music';
 	  } else {
 	    this.props.setToken(hashParams.access_token);
 	  }

 	}

 	componentWillReceiveProps(nextProps) {
 	  if(nextProps.token) {
 	    this.props.fetchUser(nextProps.token);
 	  };

 	  if(this.audio !== undefined) {
 	    this.audio.volume = nextProps.volume / 100;
 	  }

 	}

 	stopSong = () => {
 	  if(this.audio) {
 	    this.props.stopSong();
 	    this.audio.pause();
 	  }
 	}

 	pauseSong = () => {
 	  if(this.audio) {
 	    this.props.pauseSong();
 	    this.audio.pause();
 	  }
 	}

 	resumeSong = () => {
 	  if(this.audio) {
 	    this.props.resumeSong();
 	    this.audio.play();
 	  }
 	}

 	audioControl = (song) => {

 	  const { playSong, stopSong } = this.props;

 	  if(this.audio === undefined){
 	    playSong(song.track);
 	    this.audio = new Audio(song.track.preview_url);
 	    this.audio.play();
 	  } else {
 	    stopSong();
 	    this.audio.pause();
 	    playSong(song.track);
 	    this.audio = new Audio(song.track.preview_url);
 	    this.audio.play();
 	  }
 	}
  render() {
    return (
      <Fragment>
        <article>
          <Helmet>
            <title>spotify Page</title>
            <meta name="description" content="A React.js Boilerplate application SpotifyPage" />
          </Helmet>
        </article>
        <div className='App'>
          <div className='app-container'>

  	        <div className='left-side-section'>
  	          <SideMenu />
  	          <UserPlaylists />
  	          <ArtWork />
  	        </div>

  	        <div className='main-section'>
  	          <Header />
  	          <div className='main-section-container'>
  	            <MainHeader
  	              pauseSong={ this.pauseSong }
  	              resumeSong={ this.resumeSong }
  	            />
  	            <MainView
  	              pauseSong={this.pauseSong}
  	              resumeSong={ this.resumeSong }
  	              audioControl={ this.audioControl }
  	            />
  	          </div>
  	        </div>

  	        <Footer
  	          stopSong={ this.stopSong }
  	          pauseSong={ this.pauseSong }
  	          resumeSong={ this.resumeSong }
  	          audioControl={ this.audioControl }
  	        />
  	      </div>
        </div>
      </Fragment>
    );
  }
}

SpotifyPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  token: PropTypes.string,
  fetchUser: PropTypes.func,
  setToken: PropTypes.func,
  pauseSong: PropTypes.func,
  playSong: PropTypes.func,
  stopSong: PropTypes.func,
  resumeSong: PropTypes.func,
  volume: PropTypes.number
};

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUser,
    setToken,
    playSong,
    stopSong,
    pauseSong,
    resumeSong
  },dispatch);
}
const mapStateToProps = (state, ownProps) => {
  return {
    token: state.spotify.token,
    volume: state.spotify.volume
  }
}
// const mapStateToProps = createStructuredSelector({
//   globalState: makeGlobalState(),
//   formValue: makeFormValue(),
//   answers: makeSelectAnswers(),
//   questions: makeSelectQuestions(),
//   repos: makeSelectRepos(),
//   username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
// });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'spotify', reducer });
const withSaga = injectSaga({ key: 'spotify', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SpotifyPage);
