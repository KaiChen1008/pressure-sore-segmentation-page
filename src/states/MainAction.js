import {uploadImageApi} from '../apis/api.js'

export function setXValue(x) {
    return {
        type        : '@MAIN/SET_X_VALUE',
        x           : x,
    }
}

export function readImage(file) {
    return {
        type        : '@MAIN/READ_IMAGE',
        fileData    : file.fileData,
        fileURL     : file.fileURL,
        fileName    : file.fileName,
        fileImage   : file.fileImage,
    }
}

export function uploadImage(data) {
    return async (dispatch, state) => { 
        
        dispatch(startUploadImage());

        console.log('start classifying')
        const res = await uploadImageApi(data.fileData, data.x);
        
        console.log('finsh classifying');

        dispatch(endUploadImage(res));

    }; 
}

function startUploadImage() {
    return {
        type        : '@MAIN/START_UPLOAD_IMAGE',
        uploading   : true,
    }
}

function endUploadImage(res) {
    return {
        type        : '@MAIN/END_UPLOAD_IMAGE',
        uploading   : false,
        masks       : res.masks,
        area        : res.area,
        granulation : res.granulation,
        is_reep     : res.is_reep,
    }
}