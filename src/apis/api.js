import axios from 'axios'

const base_url = 'http://clais1.csie.org:3005'

export async function uploadImageApi(image, x) {
    var formData = new FormData();
    formData.append("img", image);
    formData.append("x", x)
    var res = await axios.post(
        `${base_url}/predict`, 
        formData,
        {
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        }
    );

    var mask = new Image();
    mask.src = 'data:image/png;base64,' + res.data['0'];

    var mask1 = new Image();
    mask1.src = 'data:image/png;base64,' + res.data['1'];

    var area        = res.data['area']
    var granulation = res.data['granulation']
    var is_reep     = res.data['is_reep']


    return {
        masks       :[mask,mask1], 
        area        : area,
        granulation :granulation,
        is_reep     :is_reep,
    };
}