import React, { Component } from 'react';

class SingleColorPalette extends Component {
  constructor(props){
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    console.log(this._shades)
  }

  gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    }
    return shades;
  }


  render() {

    return (
      <div>
        <h3>Single Color Palette</h3>
      </div>
    )
  }
}

export default SingleColorPalette