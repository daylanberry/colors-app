import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete'

const MiniPalette = ({ classes, paletteName, emoji, colors, goToPalette, handleDelete, id, openDialog }) => {

  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{backgroundColor: color.color}}
      key={color.name}
    >
    </div>
  ));

  const deletePalette = (e) => {
    e.stopPropagation()
    openDialog(id)
  }

  const handleClick = () => {
    goToPalette(id)
  }

  return (
    <div className={classes.root} onClick={handleClick}>
      <DeleteIcon
        className={classes.deleteIcon}
        style={{transition: 'all 0.3s ease-in-out'}}
        onClick={deletePalette}
      />
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