import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';


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