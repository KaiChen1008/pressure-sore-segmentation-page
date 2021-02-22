import React , {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Form, Image} from 'react-bootstrap';
import { Input } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SelectImage(props) {

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleFileChange}
      >
        <DialogTitle> {"Select Image File"} </DialogTitle>
        <DialogContent>
            <Fragment>
                <Form.Group controlId="file">
                    <Form.Control
                        onChange={props.handleFileChange}
                        type="file"
                        accept="image/*"
                        className="imagefile" />
                </Form.Group>
            </Fragment>
        </DialogContent>

      </Dialog>
    </div>
  );
}