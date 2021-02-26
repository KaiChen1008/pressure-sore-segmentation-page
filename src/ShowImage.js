import React , {Fragment,useState, useEffect } from 'react';
import Button         from '@material-ui/core/Button';
import Dialog         from '@material-ui/core/Dialog';
import DialogContent  from '@material-ui/core/DialogContent';
import Slide          from '@material-ui/core/Slide';
import TextField      from '@material-ui/core/TextField';
import { Form, Image} from 'react-bootstrap';
import './ShowImage.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowImage(props) {
  const [open, setOpen] = useState(true);

  const handleClose = async () => {
    setOpen(false);
    await props.classifyImage();
  };

  return (
    <div>
      <Dialog
        open={props.open && open}
        TransitionComponent={Transition}
        onClose={props.classifyImage}
      >
        <DialogContent>
            <Fragment>
                <Image className="selected-image" src={props.file} ref={props.r} />
                <div className="button-container">
                    <TextField label="X"  onChange= {e=> props.handleXChange(e)} autoFocus={true}/>
                    <Button className='button' onClick={handleClose}>
                        Classify
                    </Button>
                </div>
            </Fragment>
        </DialogContent>

      </Dialog>
    </div>
  );
}