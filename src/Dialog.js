import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
    if(event.target.id==="submit"){
      document.querySelector('.question-form').requestSubmit()
    }
  };

  return (
    <div className='decision'>
      <Button className="decision-button" variant="outlined" onClick={handleClickOpen}>
        Submit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to Submit?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleClose}>Cancel</Button>
          <Button id="submit" onClick={handleClose} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}