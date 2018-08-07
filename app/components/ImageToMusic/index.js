import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import { finalSubmitForm} from '../../containers/App/actions';
import { Row, Col, Card, Button, Spin } from 'antd';
import axios from 'axios'
import Camera from 'react-camera';
import uuid from 'uuid/v4'
import './index.css'


export class ImageToMusic extends React.Component {
  constructor(props) {
    super(props)
    this.takePicture = this.takePicture.bind(this);

    this.state = {
      page: 0,
    }
  }
  componentDidMount() {

  }
  cameraOnOff() {
    this.setState((prevState, props) => {
      return {cameraOn: !prevState.cameraOn};
    });
  }

  drawBoundaries(blob, image, faces) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = "data:image/jpeg;base64," + image
      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.id = "emotionalFace";
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');

        context.drawImage(img, 0, 0, img.width, img.height);

        // Now draw boxes around all the faces
        context.strokeStyle = 'rgba(0,255,0,0.8)';
        context.lineWidth = '5';

        faces.forEach(face => {
          context.beginPath();
          let origX = 0;
          let origY = 0;
          face.boundingPoly.vertices.forEach((bounds, i) => {
            if (i === 0) {
              origX = bounds.x;
              origY = bounds.y;
            }
            context.lineTo(bounds.x, bounds.y);
          });
          context.lineTo(origX, origY);
          context.stroke();
        });
        // conver to base64
        const resultBase64 = canvas.toDataURL("image/jpeg");
        resolve(resultBase64)
      }
    })
  }
  async takePicture() {
    this.camera.capture()
    .then(async blob => {
      this.setState({loading: true})
      this.blob = blob
      /**
       * [base64 ify]
       * @type {[type]}
       */
       const base64ify = (blob) => {
           return new Promise((resolve, reject) => {
               const reader = new FileReader();
               // reader.onload = function(evt){
               //     console.log("Just read", file.name);
               //     resolve(evt.target.result);
               // };
               reader.readAsDataURL(blob);
               reader.onloadend = () => {
                 resolve(reader.result.split(',')[1]);
               }
               reader.onerror = (err) => {
                   console.error("Failed to base64ify", "due to", err);
                   reject(err);
               };
               // Would be sweet if readAsDataURL already returned a promise
           });
       }

      base64ify(blob).then(async(base64Img) => {
        const response = await this.imageToEmotion(base64Img, blob)
        console.log("response", response)
        const faces = response.data.googleVision[0].faceAnnotations
        const emotions = response.data.googleVision[0].faceAnnotations[0]
        const playlists = response.data.spotify.body.playlists.items
        this.drawBoundaries(blob, base64Img, faces).then(resultBase64 => {
          this.img.src = resultBase64;
          this.img.onload = () => { return URL.revokeObjectURL(this.src); }
          this.setState({faces, emotions, playlists, loading: false})
          // this.img.src = await URL.createObjectURL(blob);
          // this.img.onload = () => { URL.revokeObjectURL(this.src); }
        })
      })
    })
  }
  async imageToEmotion(base64Img, imageBlob) {
      return axios({
        method: 'post',
        url: '/api/googleCloudVision/',
        data: {base64Img}
      })
  }

  render() {
    const playlist = [
      {
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3',
        cover: 'https://pbs.twimg.com/profile_images/766360293953802240/kt0hiSmv_400x400.jpg',
        title: 'Despacito',
        artist: [
          'Luis Fonsi',
          'Daddy Yankee'
        ]
      },
      {
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3',
        cover: 'https://pbs.twimg.com/profile_images/766360293953802240/kt0hiSmv_400x400.jpg',
        title: 'Despacito',
        artist: [
          'Luis Fonsi',
          'Daddy Yankee'
        ]
      },
    ]
    return (
      <Fragment>
        <Row type="flex" justify="center" align="top" className="imageToMusic">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <Camera
              className={`${this.state.cameraOn && 'hidden'}`}
              style={style.preview}
              ref={(cam) => {
                this.camera = cam;
              }}
            >
              <div style={style.captureContainer} onClick={this.takePicture}>
                <div style={style.captureButton} />
              </div>
            </Camera>
          </Col>
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
          >
            <Row>
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 12, offset: 0 }}
              >
                <img
                  style={style.captureImage}
                  ref={(img) => {
                    this.img = img;
                  }}
                />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 12, offset: 0 }}
                style={{padding: '10px', textAlign: 'center'}}
              >
                <h1>Your Emotion</h1>
                {this.state.loading && <Spin size="large" />}
                {this.state.emotions &&
                  <p>
                    {
                    `Joy: ${this.state.emotions.joyLikelihood}
                    Anger: ${this.state.emotions.angerLikelihood}
                    Sorrow: ${this.state.emotions.sorrowLikelihood}
                    Surprise: ${this.state.emotions.surpriseLikelihood}
                    Detection Confidence: ${(this.state.emotions.detectionConfidence * 100).toFixed(2)}%
                    `}
                  </p>
                }
              </Col>
            </Row>
          </Col>
          {/*<Col span={24}>
            <ReactMusic musics={MusicData} />
          </Col>
        */}
        </Row>
        {this.state.playlists &&
        <Row className="MemberView" type="flex" justify="center" align="top">
          <Col
            style={{ padding: '10px' }}
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 20, offset: 0 }}
          >
            <Row className="MemberView" type="flex" justify="center" align="top">
            {this.state.playlists.map(playlist => (
              <Col key={uuid()}
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 0 }}
              >
                <Card
                  key={uuid()}
                  hoverable
                  style={{
                    width: '100%',
                    marginBottom: '10px',
                  }}
                  cover={
                    <img
                      alt="example"
                      src={
                        playlist.images[0].url
                      }
                    />
                  }
                  onClick={() => window.open(playlist.external_urls.spotify, '_blank')}
                >
                  <div style={{ fontSize: '24px', fontWeight: '800', textAlign: 'center' }}>
                    {playlist.name}
                  </div>
                </Card>
              </Col>
            ))}
            </Row>
          </Col>
        </Row>
        }
      </Fragment>
    )
  }
}
const style = {
  preview: {
    position: 'relative',
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
  }
};
const mapStateToProps = (state, ownProps) => {
  return {
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageToMusic)
