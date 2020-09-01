import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid black',
    '&:hover': {
      cursor: 'pointer'
    }

  },
  color: {
    backgroundColor: 'dae1d4',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden'

  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    height: '8%',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative'

  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem'
  },
  miniColor: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: '-3.5px'
  }
}


const MiniPalette = (props) => {

  const { classes, paletteName, emoji, colors, handleClick } = props;

  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{backgroundColor: color.color}}
      key={color.name}
    >
    </div>
  ))

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.color}>
        {miniColorBoxes}
      </div>
      <h6 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h6>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);