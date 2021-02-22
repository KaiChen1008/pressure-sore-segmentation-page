import React, { Fragment } from 'react';
import { Form, Image} from 'react-bootstrap';

import { Button } from '@material-ui/core';
import * as tf from '@tensorflow/tfjs'
import Cropper  from 'react-cropper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Classify.css';
import Loading from './Loading'
import SelectImage from './SelectImage'
import ShowImage from './ShowImage'
import WaitClassifying from './WaitClassifying'
const IMAGE_SIZE    = 512;
const CANVAS_SIZE   = 512;

const classToColor = [
    [0,0,0],
    [128,0,0],
    [0,0,128],
]
  

export default class Classify extends React.Component {
    
    constructor(props) {
        super(props);
        this.model = null;
        this.modelLastUpdated = null;
        
        this.CropperRef = React.createRef()
        this.CanvasRef  = React.createRef()
        this.state = {
            modelLoaded: false,
            filename: '',
            isModelLoading: false,
            isClassifying: false,
            predictions: null,
            photoSettingsOpen: true,
            modelUpdateAvailable: false,
            showModelUpdateAlert: false,
            showModelUpdateSuccess: false,
            isDownloadingModel: false,
            step: 0,
        };
        this.classifyLocalImage = this.classifyLocalImage.bind(this);
    } 

    async componentDidMount() {
        this.model = await tf.loadLayersModel('http://localhost:3005/download/model.json')
        this.setState({modelLoaded: true})
    }

    componentWillUnmount() {
        // Attempt to dispose of the model.
        try {
            this.model.dispose();
        }
        catch (e) {
            // Assume model is not loaded or already disposed.
        }
    }

    async classifyLocalImage() {
        console.log("classifying")
        this.setState({
            isClassifying: true,
            step:null,
         });
        // const croppedCanvas = this.CropperRef.current.cropper.getCroppedCanvas();
        const croppedCanvas = this.CropperRef.current;
        const image = tf.tidy( () => tf.browser.fromPixels(croppedCanvas).toFloat());

        // Process and resize image before passing in to model.
        const imageData     = await this.processImage(image);
        const resizedImage  = tf.image.resizeBilinear(imageData, [IMAGE_SIZE, IMAGE_SIZE]);
        const logits        = this.model.predict(resizedImage);
        const mask          = await this.logitsToMask(logits) // return imageData
        console.log('cliassifed')

        this.setState({
            predictions: mask,
            isClassifying: false,
            photoSettingsOpen: !this.state.photoSettingsOpen
        });

        
        // Draw thumbnail to UI.
        const context   = this.CanvasRef.current.getContext('2d');
        // const ratioX    = CANVAS_SIZE / croppedCanvas.width;
        // const ratioY    = CANVAS_SIZE / croppedCanvas.height;
        // const ratio     = Math.min(ratioX, ratioY);
        context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        // context.drawImage(croppedCanvas, 0, 0, croppedCanvas.width * ratio, croppedCanvas.height * ratio);
        var img = new window.Image;
        img.onload = function(){
            context.drawImage(img,0,0, 100, 512);
            context.putImageData(mask, 0,0);
        };
        img.src = this.state.file;
        
        
        // Dispose of tensors we are finished with.
        image.dispose();
        imageData.dispose();
        resizedImage.dispose();
        logits.dispose();
    }

    logitsToMask = async (logits) => {
        const imageData = new Uint8ClampedArray(512 * 512 * 4);
        var mask    = null;
        let j       = 0;
        mask = logits.squeeze(0).argMax(2);
        mask = await mask.data();
        
        for(let i = 0; i < imageData.length; i += 4) {
            imageData[i]   =  classToColor[mask[j]][0]  // r
            imageData[i+1] =  classToColor[mask[j]][1]  // g
            imageData[i+2] =  classToColor[mask[j]][2]  // b
            imageData[i+3] =  100                       // a
            j = j + 1
        }

        let img = new ImageData(imageData, 512);
        return img;

    }

    processImage = async (image) => {
        return tf.tidy(() => image.expandDims(0).div(255.0).toFloat());
    }

    handleFileChange = event => {
        if (event.target.files && event.target.files.length > 0) {
            this.setState({
                file: URL.createObjectURL(event.target.files[0]),
                filename: event.target.files[0].name,
                step: 1,
            });
        }
    }

    render() { 
        return (
        <div className="Classify container">

            { !this.state.modelLoaded && 
                <Loading open={!this.state.modelLoaded} />
            }

            { this.state.modelLoaded && 
                <SelectImage open={this.state.modelLoaded && !this.state.file} handleFileChange={this.handleFileChange}/>
            }

            {
                <ShowImage open={ (this.state.step===1)} file={this.state.file} r={this.CropperRef} classifyImage={this.classifyLocalImage}/>   
            }
            { this.state.isClassifying && 
                <WaitClassifying  open={this.state.isClassifying}/>
            }

            { this.state.predictions &&
                <div className="classification-results">
                    <h3>Predictions</h3>
                    <canvas ref={this.CanvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />
                    <br />
                </div>
            }
            
        </div>
    )};

}