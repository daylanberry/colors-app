import React, { Component } from 'react';
import Palette from './Palette';
import Page from './Page';
import './styles/Page.css'
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom';

import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import SingleColorPalette from './SingleColorPalette';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))

    this.state = {
      palettes: savedPalettes || seedColors,
      hi: 'hi'
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
      <Route
        render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='page' timeout={500}>
              <Switch location={location}>
                <Route exact path='/palette/new'
                  render={(routeProps) => (
                    <Page>
                      <NewPaletteForm
                        {...routeProps}
                        savePalette={this.savePalette}
                        palettes={palettes}
                      />
                    </Page>
                  )
                  }
                />
                <Route
                  exact path='/palette/:paletteId/:colorId'
                  render={(routeProps) => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId, palettes)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact path='/'
                  render={(props) => (
                    <Page>
                      <PaletteList
                        deletePalette={this.deletePalette}
                        {...props}
                        palettes={palettes}

                      />
                    </Page>
                    )
                  }
                />
                <Route
                  exact path='/palette/:id'
                  render={(props) => {
                    let palette = generatePalette(this.findPalette(props.match.params.id, palettes))

                    return (
                      <Page>
                        <Palette
                          palette={palette}
                        />
                      </Page>
                    )
                  }}
                />
                <Route
                  render={(props) => (
                    <Page>
                      <PaletteList
                        deletePalette={this.deletePalette}
                        {...props}
                        palettes={palettes}

                      />
                    </Page>
                    )
                  }
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }

}

export default App;