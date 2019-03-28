import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';

const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}

const app = new Clarifai.App({
  apiKey: 'f26e532958004d419b50bc732443d338'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      // box: {}
      boxs: [],
      route: 'signin', 
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
//console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    console.log(data.outputs[0].data)
    console.log(data.outputs[0].data.regions.length);
    const clarifaiFaces = new Array();

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    for(var i = 0; i < data.outputs[0].data.regions.length; i++ ) {
      console.log(i);
      var box = data.outputs[0].data.regions[i].region_info.bounding_box;

      clarifaiFaces.push( {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol : width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      });
    }

    return clarifaiFaces;
  }

  displayFaceBox = (boxs) => {
    this.setState({boxs: boxs});
   // console.log(boxs);
  }

  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, boxs } = this.state;
    return (
      <div className="App">
        <div className="particles">
        <Particles
              params={particlesOptions}
        />
        </div>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition boxs={boxs} imageUrl={imageUrl}/>    
            </div> 
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
