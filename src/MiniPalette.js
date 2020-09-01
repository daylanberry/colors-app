import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  main: {
    backgroundColor: 'purple',
    border: '3px solid teal',
    color: 'blue',
    '& h1': {
      color: 'white'
    }
  },
  secondary: {
    backgroundColor: 'pink'
  }
}


const MiniPalette = (props) => {
  console.log(props)
  const { classes } = props
  return (
    <div className={classes.main}>
      <h1>Mini Palette</h1>
      <section className={classes.secondary}>secondary</section>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);