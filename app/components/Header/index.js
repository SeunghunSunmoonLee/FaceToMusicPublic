import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// const firebase = require('../../containers/App/firebase');

import messages from './messages';
import './style.css';

class Header extends React.PureComponent {
  state = {
    url: '',
    current: '',
  };
  componentDidMount() {
    const installGoogleAds = () => {
      const elem = document.createElement('script');
      // elem.rel = "stylesheet";
      elem.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      elem.async = true;
      elem.defer = true;
      document.body.insertBefore(elem, document.body.firstChild);
    };

    // firebase.auth().onAuthStateChanged(authUser => {
    //   if (!authUser) {
    //     this.setState({ authUser: null });
    //   }
    //   if (authUser) {
    //     this.setState({ authUser });
    //   }
    // });

    this.setState({ url: this.props.match.url, current: this.props.match.url });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.url != this.state.url) {
      this.setState({ url: nextProps.match.url, current: nextProps.match.url });
    }
  }
  render() {
    return (
      <Layout.Header className="header">
        <div className="header-children">
          <a href={`${window.location.protocol}//${window.location.host}`} className="logo-wrapper">
            <div className="logo1" >LeeArt</div>
          </a>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            selectedKeys={[this.state.current]}
            className="header-menu"
          >
            <Menu.Item key="home">
              <Link to="/">
                <FormattedMessage {...messages.home} />
              </Link>
            </Menu.Item>
            <Menu.Item key="services">
              <Link to="/services">Services</Link>
            </Menu.Item>
            <Menu.Item key="blog">
              <Link to="/blog">Blog</Link>
            </Menu.Item>
            <Menu.SubMenu key="art" title={<span>Arts</span>}>
              <Menu.Item key="music">
                <Link to="/art/music">Music</Link>
              </Menu.Item>
              <Menu.Item key="dance">
                <Link to="/art/dance">Dance</Link>
              </Menu.Item>
              <Menu.Item key="dance">
                <Link to="/art/dance">Video</Link>
              </Menu.Item>
              <Menu.Item key="dance">
                <Link to="/art/dance">Photography</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="project" title={<span>My Projects</span>}>
              <Menu.Item key="/project/machine-learning">
                <Link to="/project/machine-learning">Machine Learning</Link>
              </Menu.Item>
              <Menu.Item key="/project/IoT">
                <Link to="/project/IoT">Internet Of Things</Link>
              </Menu.Item>
              <Menu.Item key="/project/mobile">
                <Link to="/project/mobile">Mobile Apps</Link>
              </Menu.Item>
              <Menu.Item key="/project/web">
                <Link to="/project/web">Web Apps</Link>
              </Menu.Item>
            </Menu.SubMenu>
            {this.state.authUser ? (
              <Menu.Item key="account">
                <Link to="/account">Account</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="login">
                <Link to="/signIn">Log In / Sign Up</Link>
              </Menu.Item>
            )}
            {this.state.authUser && (
              <Menu.Item key="signOut">
                <Link to="/">
                  Sign Out
                </Link>
              </Menu.Item>
            )}
          </Menu>
        </div>
      </Layout.Header>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  actions: {},
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
