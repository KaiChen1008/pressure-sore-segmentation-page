import React                    from 'react';
import { connect }              from 'react-redux';
import { Stage, Layer, Image, Text}  from 'react-konva';

class Display extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() { 
        const {fileImage, masks} = this.props;
        let stageHeight = window.innerHeight;
        let stageWidth  = window.innerWidth;
        let originImageWidth = fileImage.width;
        let originImageHeight= fileImage.height;
        let scaling     = (stageWidth / 3 ) / (originImageWidth);
        let imageWidth  = originImageWidth * scaling;
        let imageHeight = originImageHeight* scaling;
        return (
        <div className="display">
            <Stage width={stageWidth } height={stageHeight}>
                <Layer>
                    <Image  image={fileImage} scaleX={scaling} scaleY={scaling}/>
                    <Image  image={fileImage} scaleX={scaling} scaleY={scaling}  x = {imageWidth}/>
                    <Image  image={fileImage} scaleX={scaling} scaleY={scaling}  x = {imageWidth*2}/>
                </Layer>
                <Layer>
                    {
                        masks.length > 0 && <Image  x = {imageWidth}   image={masks[0]} visible={true} scaleX={scaling} scaleY={scaling}/>
                    }
                    {
                        masks.length > 1 && <Image  x = {imageWidth*2} image={masks[1]} visible={true} scaleX={scaling} scaleY={scaling}/>
                    }
                </Layer>
                <Layer>
                    <Text text={`Slough Tissue Area: ${this.props.area} cm^2`}     fill={'#f4f0e6'} fontFamily={'Segoe UI', 'Roboto'} fontSize={35} y={imageHeight + 50} x = {stageWidth/3}/>
                    <Text text={`Granulation       : ${this.props.granulation} %`} fill={'#f4f0e6'} fontFamily={'Segoe UI', 'Roboto'} fontSize={35} y={imageHeight + 80} x = {stageWidth/3}/>
                    <Text text={`Is Re-ep          : ${this.props.is_reep} `}      fill={'#f4f0e6'} fontFamily={'Segoe UI', 'Roboto'} fontSize={35} y={imageHeight + 120} x = {stageWidth/3}/>

                </Layer>

            </Stage>
        </div>
    )};

}


export default connect(state => ({
    ...state.main,
}))(Display);