/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import SpotifyPage from 'containers/SpotifyPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// import Header from 'components/Header';
// import Footer from 'components/Footer';
import './index.css';
import { Layout, Menu, Icon, AutoComplete, Input } from 'antd'

// const AppWrapper = styled.div`
//   max-width: calc(768px + 16px * 2);
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   padding: 0 16px;
//   flex-direction: column;
// `;
const AppWrapper = styled.div`
`;
function new_script(src) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script')
    script.src = src
    script.addEventListener('load', function() {
      resolve()
    })
    script.addEventListener('error', function(e) {
      reject(e)
    })
    // document.body.appendChild(script);
    document.body.insertBefore(script, document.body.firstChild)
  })
}
export default class App extends React.Component {
  state = {
    collapsed: true,
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    return (
      <Fragment>
        <Helmet
          titleTemplate="LeeArt Web, App Development - %s"
          defaultTitle="LeeArt Web, App Development"
        >
          <meta
            name="description"
            content="React, React Native, Machine Learning, Wordpress for Web, Mobile, Ecommerce, SEO"
          />

          <meta
            property="og:image"
            content="https://res.cloudinary.com/seunghunlee/image/upload/v1514172269/Web-Development-1920-1280-7_orpskh.jpg"
          />
          <meta
            property="og:title"
            content="LeeArt Web, App Development. React, React Native, Machine Learning"
          />
          <meta property="og:url" content="http://www.leeart.co" />
          <meta property="og:site_name" content="LeeArt" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@seunghunSunmoon" />
          <meta
            name="twitter:title"
            content="LeeArt Web, App Development. React, React Native, Machine Learning"
          />
          <meta
            name="twitter:description"
            content="React, React Native, Machine Learning, Wordpress for Web, Mobile, Ecommerce, SEO"
          />
          <meta
            name="twitter:image"
            content="https://res.cloudinary.com/seunghunlee/image/upload/v1514172269/Web-Development-1920-1280-7_orpskh.jpg"
          />

          {/*
            <base target="_blank" href="http://leeart.co" />
            <link rel="canonical" href="http://leeart.co" />
            */}

          <link
            rel="apple-touch-icon"
            href="https://res.cloudinary.com/seunghunlee/image/upload/v1515485736/safari-pinned-tab2_xdrpuz.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="https://res.cloudinary.com/seunghunlee/image/upload/v1515485736/safari-pinned-tab2_xdrpuz.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="https://res.cloudinary.com/seunghunlee/image/upload/v1515485736/safari-pinned-tab2_xdrpuz.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="https://res.cloudinary.com/seunghunlee/image/upload/v1515485736/safari-pinned-tab2_xdrpuz.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="https://res.cloudinary.com/seunghunlee/image/upload/v1515485736/safari-pinned-tab2_xdrpuz.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://res.cloudinary.com/seunghunlee/image/upload/v1515485736/safari-pinned-tab2_xdrpuz.png"
          />

          <link
            rel="icon"
            href="https://res.cloudinary.com/seunghunlee/image/upload/v1515485736/safari-pinned-tab2_xdrpuz.png"
          />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/music" component={SpotifyPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Fragment>
    )
  }
}
