import React, { Component } from "react";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ILF from "./components/ILF/ILF";
import Rank from "./components/rank/rank";
import Face from "./components/face/face";
import Signin from "./components/signin/signin";
import Register from "./components/register/register";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";

const options = {
  particles: {
    number: {
      value: 150,
      density: {
        enabled: true,
        value_area: 800,
      },
    },
  },
};

const app = new Clarifai.App({
  apiKey: "d7b607614ea34644a6a42d2f166d843b",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }

  claculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftcol: clarifaiFace.left_col * width,
      toprow: clarifaiFace.top_row * height,
      rightcol: width - clarifaiFace.right_col * width,
      bottomrow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.claculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={options} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ILF
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <Face box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
