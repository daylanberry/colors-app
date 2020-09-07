import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)'
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    padding: "10px",
    left: "0px",
    bottom: "0px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: 'flex',
    justifyContent: 'space-between',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out'
  }
}

const DraggableColorBox = (props) => {
  const { classes } = props
  return (
    <div
      style={{backgroundColor: props.color}}
      className={classes.root}
    >
      <div className={classes.boxContent}>
        <span>{props.name}</span>
        <span className={classes.deleteIcon}><DeleteIcon /></span>
      </div>
    </div>
  )
}

export default withStyles(styles)(DraggableColorBox)