# Face To Music

# Setup
## for cloud vision api - emotion detection
download googleapi.json into base root of the folder. you can find this file from enabling billing for google cloud vision api. And the projectId
```
// server/index.js - it needs it there.
var visionClient = new vision.ImageAnnotatorClient({
  projectId: 'machine-learning-202312',
  keyFilename: './googleapi.json'
});
```
## for spotify api
You need to set .env file at the root of the folder with your spotify api key.

## How to run
```
yarn
```
or
```
npm install
```
Then
```
yarn start
```
or
```
npm start
```
# checkout these two
1. localhost:3000   for face to music with less accurate playlist.
2. localhost:3000/music  for spotify music player for personalized playlist. it's in progress.


# Todos
integrate with personal playlist.
integrate with speechchatbot

## References
This project uses awesome @react-boilerplate  [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

## Author
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/7311039?s=400&u=f9ea536356e677a07dfc605f01a389559e3b9215&v=4" width="100px;"/><br /><sub>Seunghun Lee</sub>](http://leeart.co)<br />[💻](https://github.com/seunghunsh/React.ai/commits?author=seunghunsh "Code") [📖](https://github.com/seunghunsh/React.ai/commits?author=seunghunsh "Documentation") [👀](#review-seunghunsh "Reviewed Pull Requests") [📢](#talk-seunghunsh "Talks")
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

* **Seunghun Lee** - [website](http://leeart.co) / [twitter](https://twitter.com/lifeartlee) / [instagram](https://www.instagram.com/seunghun.sunmoon.lee/)
