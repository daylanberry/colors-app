import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const PaletteMetaForm = props => {
  const { palettes, handleSubmit } = props
  const [open, setOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState('')

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    });
  });

  const handleChange = (e) => {
    setNewPaletteName(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <TextValidator
                value={newPaletteName}
                onChange={handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette name', 'Name already taken']}
              />
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >
                Save Palette
              </Button>
            </div>
          </ValidatorForm>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm