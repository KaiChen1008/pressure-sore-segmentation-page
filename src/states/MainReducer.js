const initMainState = {
    fileURL: null,
    fileName: '',
    fileData: null,
    fileImage:null,
    masks:[],
    uploading: false,
    count: 0,
    x:'',
    area:'',
    granulation:'',
    is_reep:'',

};


export function main(state = initMainState, action) {
    switch (action.type) {
        case '@MAIN/READ_IMAGE':
            return {
                ...state,
                fileURL     : action.fileURL,
                fileName    : action.fileName,
                fileData    : action.fileData,
                fileImage   : action.fileImage,
            }
        
        case '@MAIN/START_UPLOAD_IMAGE':
            return {
                ...state,
                uploading   : action.uploading,
            }

        case '@MAIN/END_UPLOAD_IMAGE':
            return {
                ...state,
                uploading   : action.uploading,
                masks       : action.masks,
                area        : action.area,
                granulation : action.granulation,
                is_reep     : action.is_reep,
            }
        
        case '@MAIN/SET_X_VALUE':
            return {
                ...state,
                x           : action.x,
            }
        default:
            return state;
    }
}
