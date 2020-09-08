import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette'

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))

    this.state = {
      palettes: savedPalettes || seedColors
    }
  }

  findPalette = (id, array) => {
    let colorPalette = array.find(palette => palette.id === id)
    return colorPalette
  };

  deletePalette = (id) => {
    this.setState(state => ({
      palettes: state.palettes.filter(palette => palette.id !== id)
    }), this.syncLocalStorage)

  };

  savePalette = (newPalette) => {
    this.setState({ palettes: [...this.state.palettes, newPalette]}, () => this.syncLocalStorage())

  }

  syncLocalStorage = () => {
    const { palettes } = this.state;
    window.localStorage.setItem('palettes', JSON.stringify(palettes))
  }

  render() {
    const { palettes } = this.state;
    return (
      <Switch>
        <Route exact path='/palette/new'
          render={(routeProps) => (
            <NewPaletteForm
              {...routeProps}
              savePalette={this.savePalette}
              palettes={palettes}
            />
          )
          }
        />
        <Route
          exact path='/palette/:paletteId/:colorId'
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId, palettes)
              )}
            />
          )}
        />
        <Route
          exact path='/'
          render={(props) => (
            <PaletteList
              deletePalette={this.deletePalette}
              {...props}
              palettes={palettes}

            />
            )
          }
        />
        <Route
          exact path='/palette/:id'
          render={(props) => {
            let palette = generatePalette(this.findPalette(props.match.params.id, palettes))

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