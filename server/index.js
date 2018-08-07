/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const dotenv = require('dotenv');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const { google } = require('googleapis')
const bodyParser = require('body-parser')
const vision = require('@google-cloud/vision');
const axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

// var sslRedirect = require('heroku-ssl-redirect');
// heroku enable ssl redirect
// app.use(sslRedirect()); //heroku https

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb'}))

// parse application/json
app.use(bodyParser.json({limit: '50mb'}))

dotenv.config();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});

/**
 * [visionClient]
 */
var visionClient = new vision.ImageAnnotatorClient({
  projectId: 'machine-learning-202312',
  keyFilename: './googleapi.json'
});

app.post('/api/googleCloudVision', async (req, res, next) => {
    /**
     * spotify playlist api
     *
     */
    const getSpotifyPlaylist = (emotions) => {
      return new Promise((resolve, reject) => {
        console.log("emotions", emotions)
        const emotionArr = [];
        for (const key in emotions) {
          if(emotions[key] === 'VERY_LIKELY' || emotions[key] === 'LIKELY' || emotions[key] === 'POSSIBLE') {
            console.log("emotion", emotions, key.split("Likelihood")[0])
            if(key.split("Likelihood")[0] === 'joy') {
              emotionArr.push("happy")
            }
            if(key.split("Likelihood")[0] === 'sorrow' || key.split("Likelihood")[0] === 'anger' || key.split("Likelihood")[0] === 'surprise' ) {
              emotionArr.push(key.split("Likelihood")[0])
            }
          }
        }
        if(emotionArr.length === 0) {
          emotionArr.push("ok mood")
        }
        console.log("emotionArr", emotionArr)
        spotifyApi.searchPlaylists(emotionArr[0], {limit: '20', offset: String(Math.floor(Math.random() * 10)*10 + 0 )})
          .then((data) => {
            console.log("spotifyApi searchTracks", data)
            /**
             * [can get track detail]
             * @return {[type]}          [description]
             */
            // data.body.playlists.items.map(item => {
            //   return item.tracks.href
            // })
            resolve(data)
          }, function(err) {
            console.error(err);
          });

      })
    }

  // const inputFile = await new File([req.body.imageBlob], "inputFile.png", {type: 'image/png', lastModified: Date.now()});
  // const outputFile = await new File([], "outputFile.png", {type: 'image/png', lastModified: Date.now()});
  // const request = {image: {source: req.body.inputFile}};

  /**
   * [vision api description]
   * @type {[type]}
   */
  // console.log("=========req.body=====", req.body, req.body.base64Img)
  const request = await {image: {content: req.body.base64Img }};
  visionClient
    .faceDetection(request)
    .then(async results => {
      const faces = results[0].faceAnnotations;
      const emotions = results[0].faceAnnotations[0]
      // const resultBase64 = await highlightFaces(req.body.base64Img, faces, console.log)
      var numFaces = faces.length;
      console.log('Found ' + numFaces + (numFaces === 1 ? ' face' : ' faces'));
      // console.log('resultBase64', resultBase64)
      const playlist = await getSpotifyPlaylist(emotions)
      return res.send({googleVision: results, spotify: playlist})
      // callback(null, faces);
    })
    .catch(err => {
      console.error('ERROR:', err);
      // callback(err);
    });
  // visionClient.batchAnnotateImages({requests: requests}).then(responses => {
  //     var response = responses[0];
  //     console.log("vision response", response)
  //     res.send({response})
  //     // doThingsWith(response)
  // })
  // .catch(err => {
  //     console.error(err);
  // });

  // let parsedBody = JSON.parse(req.body)
  /**
   * Uses the Vision API to detect faces in the given file.
   */
  // function detectFaces(inputFile, callback) {
  //   // Make a call to the Vision API to detect the faces
  //   const request = {image: {source: {filename: inputFile}}};
  //   client
  //     .faceDetection(request)
  //     .then(results => {
  //       const faces = results[0].faceAnnotations;
  //       var numFaces = faces.length;
  //       console.log('Found ' + numFaces + (numFaces === 1 ? ' face' : ' faces'));
  //       callback(null, faces);
  //     })
  //     .catch(err => {
  //       console.error('ERROR:', err);
  //       callback(err);
  //     });
  // }

  /**
   * TODO make canvas drawing work in backend serverside
   * Draws a polygon around the faces, then saves to outputFile.
   */
  // const highlightFaces = async (image, faces, callback) => {
  //     // var Image = Canvas.Image;
  //     // Open the original image into a canvas
  //     function loadImage (image) {
  //       return new Promise((resolve, reject) => {
  //         const img = new Image()
  //
  //         img.onload = () => resolve(img)
  //         img.onerror = () => reject(new Error('Failed to load image'))
  //         img.src = image
  //       })
  //     }
  //
  //     // var img = await new Image;
  //     // img.src = await image;
  //     // var canvas = new Canvas(img.width, img.height);
  //     loadImage(image).then(async img => {
  //       const canvas = await createCanvas(img.width, img.height)
  //       // const ctx = canvas.getContext('2d')
  //       var context = await canvas.getContext('2d');
  //       await context.drawImage(img, 0, 0, img.width, img.height);
  //
  //       // Now draw boxes around all the faces
  //       context.strokeStyle = 'rgba(0,255,0,0.8)';
  //       context.lineWidth = '5';
  //
  //       faces.forEach(face => {
  //         context.beginPath();
  //         let origX = 0;
  //         let origY = 0;
  //         face.boundingPoly.vertices.forEach((bounds, i) => {
  //           if (i === 0) {
  //             origX = bounds.x;
  //             origY = bounds.y;
  //           }
  //           context.lineTo(bounds.x, bounds.y);
  //         });
  //         context.lineTo(origX, origY);
  //         context.stroke();
  //       });
  //
  //       // conver to base64
  //       const resultBase64 = await canvas.toDataURL("image/png");
  //       // canvas.toDataURL('image/png', function(err, png){ resultBase64 = png });
  //
  //       console.log("resultBase64 Finished", resultBase64)
  //     // Write the result to a file
  //     // console.log('Writing to file ' + outputFile);
  //     // var writeStream = fs.createWriteStream(outputFile);
  //     // var pngStream = canvas.pngStream();
  //     //
  //     // pngStream.on('data', chunk => {
  //     //   writeStream.write(chunk);
  //     // });
  //     // pngStream.on('error', console.log);
  //     // pngStream.on('end', callback);
  //
  //       return resultBase64
  //     })
  // }
  //
})

/**
 * [spotifyApi description]
 * @type {SpotifyWebApi}
 */
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: isDev ? process.env.REDIRECT_URL : 'https://leeart.co',
});
// Get an access token and 'save' it using a setter
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('spotify access token is ' + data.body['access_token']);
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

// TODO integrate with speechchatbot
// change it to const server = app.listen(port, host, (err) => {
// SpeechChatBot
// SPEECH CHATBOT stuffs
// chatbot stuffs
// const socketServer = !isDev
//   ? require("https").Server(app)
//   : require("http").Server(app);
// const server = require("http").Server(app);
// const io = require('socket.io')(server);
// const apiai = require('apiai');
//
// const { APIAI_TOKEN } = process.env;
// const { APIAI_SESSION_ID } = process.env;
//
// io.on('connection', socket => {
//   console.log('io connected');
//   console.log('a user connected');
//
//   socket.emit('now', {
//     message: 'zeit',
//   });
//   socket.on('chat message', text => {
//     console.log(`Message: ${text}`);
//
//     // Get a reply from API.ai
//
//     const apiaiReq = apiaiapp.textRequest(text, {
//       sessionId: APIAI_SESSION_ID,
//     });
//
//     apiaiReq.on('response', response => {
//       const aiText = response.result.fulfillment.speech;
//       console.log(`Bot reply: ${aiText}`);
//       socket.emit('bot reply', aiText);
//     });
//
//     apiaiReq.on('error', error => {
//       console.log(error);
//     });
//
//     apiaiReq.end();
//   });
// });
//
// const apiaiapp = apiai(APIAI_TOKEN);
