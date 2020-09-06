import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'hex'
    }
  }

  handleChange = (e) => {
    this.setState({ format: e.target.value },
      () => this.props.handleChange(this.state.format))
  }

  render() {
    const { changeLevel, level, handleChange, showingAllColors } = this.props;
    const { format } = this.state

    return (
      <header className='Navbar'>
        <div className='logo'>
          <Link to='/'>React color picker</Link>
        </div>
        {
          showingAllColors &&
          <div className='slider-container'>
            <span>Level: {level}</span>
            <div className='slider'>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>

        }
          <div className='select-container'>
            <Select
              onChange={this.handleChange}
              value={format}
            >
              <MenuItem value='hex'>hex - #fffff</MenuItem>
              <MenuItem value='rgb'>rgb - rgb(255, 255, 255)</MenuItem>
             <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
            </Select>
          </div>

      </header>
    )
  }
};

export default Navbar