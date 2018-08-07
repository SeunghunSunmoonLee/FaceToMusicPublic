import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, Menu, Icon, AutoComplete, Input, Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'

import A from 'components/A'
import LocaleToggle from 'containers/LocaleToggle'
import Wrapper from './Wrapper'
import messages from './messages'
import './style.css'

const { SubMenu } = Menu

export default class Footer extends React.Component {
  componentDidMount() {
  }
  render() {
    const Option = AutoComplete.Option
    const OptGroup = AutoComplete.OptGroup
    const dataSource = [
      {
        title: 'Projects',
        children: [
          {
            title: 'bjj.co.kr',
            count: 10000,
          },
          {
            title: 'photospellgifts.com',
            count: 10600,
          },
        ],
      },
      {
        title: 'Media',
        children: [
          {
            title: 'Instagram',
            count: 60100,
          },
          {
            title: 'YouTube',
            count: 30010,
          },
        ],
      },
      {
        title: 'Consulting',
        children: [
          {
            title: 'Programming, Tech Seminar',
            count: 100000,
          },
        ],
      },
    ]
    function renderTitle(title) {
      return (
        <span>
          {title}
          <a
            style={{ float: 'right' }}
            href="https://www.google.com/search?q=leeart.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            link
          </a>
        </span>
      )
    }
    const options = dataSource
      .map(group => (
        <OptGroup key={group.title} label={renderTitle(group.title)}>
          {group.children.map(opt => (
            <Option key={opt.title} value={opt.title}>
              {opt.title}
              <span className="certain-search-item-count">
                {opt.count} Followers
              </span>
            </Option>
          ))}
        </OptGroup>
      ))
      .concat([
        <Option disabled key="all" className="show-all">
          <a
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
          >
            See All
          </a>
        </Option>,
      ])
    return (
      <Layout.Footer
        className="footer"
        style={{ textAlign: 'center', paddingTop: '20px' }}
      >
        <Row type="flex" justify="center" align="middle">
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 3, offset: 0 }}>
            <a href={`${window.location.protocol}//${window.location.host}`}>
              <div className="footer-logo" />
            </a>
          </Col>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 5, offset: 1 }}>
            Business Registration Number(South Korea): 334-34-00418<br />
            Leeart<br />
            All rights Reserved<br />
            <FormattedMessage
              {...messages.authorMessage}
              values={{
                author: (
                  <A href="https://www.leeart.co">Seunghun Sunmoon Lee</A>
                ),
              }}
            />
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 3, offset: 1 }}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Link to="/priavcy-policy">Privacy Policy</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/support">Support</Link>
          </Col>
        </Row>
      </Layout.Footer>
    )
  }
}
