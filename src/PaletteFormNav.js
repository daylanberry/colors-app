import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom'
import PaletteMetaForm from './PaletteMetaForm'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import useStyles from './styles/PaletteFormNavStyles';



const PaletteFormNav = (props) => {
  const classes = useStyles();
  const { open, palettes, handleDrawerOpen, handleSubmit } = props
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true)
  }

  const hideForm = () =>{
    setFormShowing(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton,
              {[ classes.hide]: open
            })}
          >
            <AddToPhotosIcon/>
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to='/'>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={showForm}
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={hideForm}
          />
        )
      }
    </div>
  )
}

export default PaletteFormNav;