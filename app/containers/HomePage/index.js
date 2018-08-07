/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Layout, Row, Col, Button } from 'antd';
// import { } from 'containers/App/selectors';
import { Switch, Route } from 'react-router-dom';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H2 from 'components/H2';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ImageToMusic from 'components/ImageToMusic';

import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
// import {  } from '../App/actions';
// import {  } from './actions';
// import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

import showResults from './showResults'
import './index.css';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {

  }

  render() {
    return (
      <Fragment>
        <article>
          <Helmet>
            <title>Home Page</title>
            <meta name="description" content="A React.js Boilerplate application homepage" />
          </Helmet>
        </article>
        <Header
          className="header"
        />
        <Layout.Content className="app-layout-content">
          <Row className="TypistExample">
            <Col span={24}>
            <Typist
                className="TypistExample-header"
                avgTypingSpeed={6}
                startDelay={3000}
                onTypingDone={this.onHeaderTyped}
              >
                Check your emotional state and receive free playlist :)
            </Typist>
            </Col>
          </Row>
          <ImageToMusic/>
        </Layout.Content>
        <Footer />
      </Fragment>
    );
  }
}

HomePage.propTypes = {
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
