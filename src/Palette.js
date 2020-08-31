import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';


class Palette extends Component {

  constructor(props) {
    super(props);

    this.state = {
      level: 500,
      format: 'hex',
      open: false
    }
  }

  changeLevel = (level) => {
    this.setState({ level })
  }

  handleFormatChange = (val) => {
    this.setState({ format: val, open: true })
  }

  closeSnackBar = () => {
    this.setState({ open: false})
  }

  render() {
    const { colors, paletteName, emoji } = this.props.palette;
    const { level, format, open } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.name}
      />

    ))
    return (
      <div className='Palette'>
        <Navbar
          changeLevel={this.changeLevel}
          level={level}
          handleChange={this.handleFormatChange}
        />
        <div className='Palette-colors'>
          {colorBoxes}
        </div>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={open}
          message={<span id='message-id'>Format changed to {format.toUpperCase()}</span>}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          onClose={this.closeSnackBar}
          action={[
            <IconButton
              onClick={this.closeSnackBar}
              color='inherit'
              key='close'
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <footer className='Palette-footer'>
          {paletteName}
          <span className='emoji'>{emoji}</span>
        </footer>
      </div>
    )
  }
}

export default Palette;