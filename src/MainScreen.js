import React, {Fragment}            from 'react';
import Loading                      from './Loading';
import SelectImage                  from './SelectImage';
import ShowImage                    from './ShowImage';
import WaitClassifying              from './WaitClassifying';
import { connect }                  from 'react-redux';
import {Image}                      from 'react-bootstrap';
import Display                      from './Display';

import {readImage, uploadImage, setXValue}     from './states/MainAction';

import './MainScreen.css';

class MainScreen extends React.Component {
    
    constructor(props) {
        super(props);

        this.CropperRef = React.createRef()
        this.CanvasRef  = React.createRef()
    } 


    handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            var imageObj = new window.Image;
            var fileURL  = URL.createObjectURL(e.target.files[0]);
            imageObj.src = fileURL;

            this.props.dispatch( readImage({
                fileData    : e.target.files[0],
                fileImage   : imageObj,
                fileURL     : fileURL,
                fileName    : e.target.files[0].name,
            }))
        
        }
    }

    handleXChange = (e) => {
        this.props.dispatch( setXValue(e.target.value));
    }

    classifyLocalImage = (e) => {
        this.props.dispatch( uploadImage({
            fileData: this.props.fileData,
            x:        this.props.x,
        }))
    }

    render() { 
        const {fileURL, fileName, masks, uploading, x} = this.props;
        return (
        <div className="container">

            <SelectImage open={!fileURL} handleFileChange={this.handleFileChange}/>
            
            <ShowImage open={ fileName !== '' &&  masks.length == 0} file={fileURL} r={this.CropperRef}  handleXChange={this.handleXChange} classifyImage={this.classifyLocalImage}/>   
            
            {
                <WaitClassifying open={uploading}/>
            }
            {
                masks.length > 0 && <Display/>
            }
        </div>
    )};

}


export default connect(state => ({
    ...state.main,
}))(MainScreen);