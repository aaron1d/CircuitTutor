import React, { Component } from 'react';
import Schematic from '../containers/schematic';
import NavigationBar from './navigation_bar';
import CompButtonBar from '../containers/comp_button_bar';
import CompEditor from '../containers/comp_editor';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row">
          <NavigationBar className="col-12"/>
        </div>
        <div className="row">
          <CompButtonBar className="col-12" />
        </div>

        <div className="row">
          <Schematic height={300} width = {600} />
        </div>

        <div className="row">
          <CompEditor  />
        </div>
      </div>
    );
  }
}

export default App;
