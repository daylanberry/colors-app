import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette'

class App extends Component {

  findPalette = (id, array) => {
    let colorPalette = array.find(palette => palette.id === id)
    return colorPalette
  }


  render() {
    return (
      <Switch>
        <Route exact path='/palette/new' render={() => <NewPaletteForm />}/>
        <Route
          exact path='/palette/:paletteId/:colorId'
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId, seedColors)
              )}
            />
          )}
        />
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
    );
  }

}

export default App;