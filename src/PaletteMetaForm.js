import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

const PaletteMetaForm = ({ palettes, handleSubmit, hideForm })=> {
  const [stage, setStage] = useState('form');
  const [newPaletteName, setNewPaletteName] = useState('')

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    });
  });

  const handleChange = (e) => {
    setNewPaletteName(e.target.value)
  };

  const showEmojiPicker = () => {
    setStage('emoji')
  };

  const savePalette = (emoji) => {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native
    }

    handleSubmit(newPalette)
    setStage('')
  }

  const handleClose = () => {
    hideForm()
  };

  return (
    <div>
      <Dialog open={stage === 'emoji'} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">
          Choose a Palette Emoji
        </DialogTitle>
        <Picker onSelect={savePalette} title='Choose an emoji!'/>
      </Dialog>
      <Dialog
        open={stage === 'form'}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette. Make sure it unique!
          </DialogContentText>
            <TextValidator
              value={newPaletteName}
              onChange={handleChange}
              fullWidth
              margin='normal'
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter Palette name','Name already taken']}
            />
        </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            >
            Save Palette
          </Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm