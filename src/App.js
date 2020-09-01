import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList'

class App extends Component {

  findPalette = (id, array) => {
    let colorPalette = array.find(palette => palette.id === id)
    return colorPalette
  }


  render() {
    return (
      <Switch>
        <Route
          exact path='/'
          render={(props) => <PaletteList {...props} palettes={seedColors}/>}
        />
        <Route
          exact path='/palette/:id'
          render={(props) => {
            let palette = generatePalette(this.findPalette(props.match.params.id, seedColors))

            return (
              <Palette
                palette={palette}
              />
            )
          }}
        />
      </Switch>

      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])}/>
      // </div>
    );
  }

}

export default App;