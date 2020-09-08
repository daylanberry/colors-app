import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/NavbarStyles.js'


class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'hex'
    }
  }

  // handleChange = (e) => {
  //   this.setState({ format: e.target.value },
  //     () => this.props.handleChange(this.state.format))
  // }

  render() {
    const { changeLevel, level, showingAllColors, classes } = this.props;
    const { format } = this.state

    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>React color picker</Link>
        </div>
        {
          showingAllColors &&
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
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
          <div className={classes.selectContainer}>
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

export default withStyles(styles)(Navbar)