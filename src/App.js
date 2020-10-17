import React, { Component } from "react";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ILF from "./components/ILF/ILF";
import Rank from "./components/rank/rank";
import Face from "./components/face/face";
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
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    console.log("click");
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (response) {
        console.log(response);
      },
      function (err) {}
    );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={options} />
        <Navigation />
        <Logo />
        <Rank />
        <ILF
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <Face imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
