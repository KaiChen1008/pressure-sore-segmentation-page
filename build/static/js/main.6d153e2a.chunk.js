(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{116:function(e,a,t){e.exports=t(196)},130:function(e,a,t){},190:function(e,a,t){},192:function(e,a,t){},194:function(e,a,t){},196:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(16),i=t.n(l),c=t(38),o=t(39),s=t(45),u=t(40),m=t(46),f=t(93),p=(t(120),t(43)),g=t(36),d=t(29),h=t(230),b=t(232),E=t(234),O=t(235),v=t(226);Object(v.a)(function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"},root:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}}});var j=t(237),I=t(239),x=t(238),y=t(236),w=t(243),A=r.a.forwardRef(function(e,a){return r.a.createElement(y.a,Object.assign({direction:"up",ref:a},e))});function N(e){return r.a.createElement("div",null,r.a.createElement(j.a,{open:e.open,TransitionComponent:A,keepMounted:!0,onClose:e.handleFileChange},r.a.createElement(x.a,null," ","Select Image File"," "),r.a.createElement(I.a,null,r.a.createElement(n.Fragment,null,r.a.createElement(w.a.Group,{controlId:"file"},r.a.createElement(w.a.Control,{onChange:e.handleFileChange,type:"file",accept:"image/*",className:"imagefile"}))))))}var C=t(28),k=t.n(C),_=t(42),R=t(101),D=t(244),L=t(241),M=t(240),U=(t(130),r.a.forwardRef(function(e,a){return r.a.createElement(y.a,Object.assign({direction:"up",ref:a},e))}));function S(e){var a=Object(n.useState)(!0),t=Object(R.a)(a,2),l=t[0],i=t[1],c=function(){var a=Object(_.a)(k.a.mark(function a(){return k.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return i(!1),a.next=3,e.classifyImage();case 3:case"end":return a.stop()}},a)}));return function(){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(j.a,{open:e.open&&l,TransitionComponent:U,onClose:e.classifyImage},r.a.createElement(I.a,null,r.a.createElement(n.Fragment,null,r.a.createElement(M.a,{className:"selected-image",src:e.file,ref:e.r}),r.a.createElement("div",{className:"button-container"},r.a.createElement(L.a,{label:"X",onChange:function(a){return e.handleXChange(a)},autoFocus:!0}),r.a.createElement(D.a,{className:"button",onClick:c},"Classify"))))))}var X=Object(v.a)(function(e){return{backdrop:{zIndex:e.zIndex.drawer+5,color:"#fff"},root:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}}});function F(e){var a=X();return console.log(e.open),r.a.createElement("div",null,r.a.createElement(h.a,{className:a.backdrop,open:e.open},r.a.createElement(b.a,null,r.a.createElement(E.a,null,r.a.createElement(O.a,{className:a.title,color:"textSecondary",gutterBottom:!0},"Classifying...")))))}var T=t(22),z=function(e){function a(e){return Object(c.a)(this,a),Object(s.a)(this,Object(u.a)(a).call(this,e))}return Object(m.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){var e=this.props,a=e.fileImage,t=e.masks,n=window.innerHeight,l=window.innerWidth,i=a.width,c=l/3/i,o=i*c,s=a.height*c;return r.a.createElement("div",{className:"display"},r.a.createElement(T.c,{width:l,height:n},r.a.createElement(T.b,null,r.a.createElement(T.a,{image:a,scaleX:c,scaleY:c}),r.a.createElement(T.a,{image:a,scaleX:c,scaleY:c,x:o}),r.a.createElement(T.a,{image:a,scaleX:c,scaleY:c,x:2*o})),r.a.createElement(T.b,null,t.length>0&&r.a.createElement(T.a,{x:o,image:t[0],visible:!0,scaleX:c,scaleY:c}),t.length>1&&r.a.createElement(T.a,{x:2*o,image:t[1],visible:!0,scaleX:c,scaleY:c})),r.a.createElement(T.b,null,r.a.createElement(T.d,{text:"Slough Tissue Area: ".concat(this.props.area," cm^2"),fontSize:35,y:s+50,x:l/3}),r.a.createElement(T.d,{text:"Granulation       : ".concat(this.props.granulation," %"),fontSize:35,y:s+80,x:l/3}),r.a.createElement(T.d,{text:"Is Re-ep          : ".concat(this.props.is_reep," "),fontSize:35,y:s+120,x:l/3}))))}}]),a}(r.a.Component),G=Object(p.b)(function(e){return Object(d.a)({},e.main)})(z),Y=t(100),B=t.n(Y),P="http://clais1.csie.org:3005";function W(e,a){return J.apply(this,arguments)}function J(){return(J=Object(_.a)(k.a.mark(function e(a,t){var n,r,l,i,c,o,s;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("img",a),n.append("model_id","0"),n.append("x",t),console.log(t),e.next=7,B.a.post("".concat(P,"/predict"),n,{headers:{"Content-Type":"multipart/form-data"}});case 7:return r=e.sent,console.log(r.data),(l=new Image).src="data:image/png;base64,"+r.data[0],(i=new Image).src="data:image/png;base64,"+r.data[1],c=r.data.area,o=r.data.granulation,s=r.data.is_reep,e.abrupt("return",{masks:[l,i],area:c,granulation:o,is_reep:s});case 17:case"end":return e.stop()}},e)}))).apply(this,arguments)}function V(e){return{type:"@MAIN/END_UPLOAD_IMAGE",uploading:!1,masks:e.masks,area:e.area,granulation:e.granulation,is_reep:e.is_reep}}t(190);var H=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(u.a)(a).call(this,e))).handleFileChange=function(e){if(e.target.files&&e.target.files.length>0){var a=new window.Image,n=URL.createObjectURL(e.target.files[0]);a.src=n,t.props.dispatch({type:"@MAIN/READ_IMAGE",fileData:(r={fileData:e.target.files[0],fileImage:a,fileURL:n,fileName:e.target.files[0].name}).fileData,fileURL:r.fileURL,fileName:r.fileName,fileImage:r.fileImage})}var r},t.handleXChange=function(e){var a=e.target.value;t.props.dispatch(function(e){return{type:"@MAIN/SET_X_VALUE",x:e}}(a))},t.classifyLocalImage=function(e){var a;t.props.dispatch((a={fileData:t.props.fileData,x:t.props.x},function(){var e=Object(_.a)(k.a.mark(function e(t,n){var r;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"@MAIN/START_UPLOAD_IMAGE",uploading:!0}),console.log("start classifying"),e.next=4,W(a.fileData,a.x);case 4:r=e.sent,console.log("finsh classifying"),t(V(r));case 7:case"end":return e.stop()}},e)}));return function(a,t){return e.apply(this,arguments)}}()))},t.CropperRef=r.a.createRef(),t.CanvasRef=r.a.createRef(),t}return Object(m.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){var e=this.props,a=e.fileURL,t=e.fileName,n=e.masks,l=e.uploading;e.x;return r.a.createElement("div",{className:"container"},r.a.createElement(N,{open:!a,handleFileChange:this.handleFileChange}),r.a.createElement(S,{open:""!==t&&0==n.length,file:a,r:this.CropperRef,handleXChange:this.handleXChange,classifyImage:this.classifyLocalImage}),r.a.createElement(F,{open:l}),n.length>0&&r.a.createElement(G,null))}}]),a}(r.a.Component),q=Object(p.b)(function(e){return Object(d.a)({},e.main)})(H),K={fileURL:null,fileName:"",fileData:null,fileImage:null,masks:[],uploading:!1,count:0,x:"",area:"",granulation:"",is_reep:""};t(192);var Q=Object(g.e)(Object(g.c)({main:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"@MAIN/READ_IMAGE":return Object(d.a)({},e,{fileURL:a.fileURL,fileName:a.fileName,fileData:a.fileData,fileImage:a.fileImage});case"@MAIN/START_UPLOAD_IMAGE":return Object(d.a)({},e,{uploading:a.uploading});case"@MAIN/END_UPLOAD_IMAGE":return Object(d.a)({},e,{uploading:a.uploading,masks:a.masks,area:a.area,granulation:a.granulation,is_reep:a.is_reep});case"@MAIN/SET_X_VALUE":return Object(d.a)({},e,{x:a.x});default:return e}}}),Object(g.d)(Object(g.a)(f.a))),Z=function(e){function a(e){return Object(c.a)(this,a),Object(s.a)(this,Object(u.a)(a).call(this,e))}return Object(m.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement(p.a,{store:Q,className:"App"},r.a.createElement("div",{className:"App"},r.a.createElement(q,null)))}}]),a}(r.a.Component);t(194);i.a.render(r.a.createElement(Z,null),document.getElementById("root"))}},[[116,2,1]]]);
//# sourceMappingURL=main.6d153e2a.chunk.js.map