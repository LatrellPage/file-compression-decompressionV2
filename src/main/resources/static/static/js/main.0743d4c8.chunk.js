(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),o=n(68),r=n.n(o),s=(n(89),n(90),n(128)),c=n(132),i=n(134),d=n(131),m=n(127),p=n(129);const u=()=>{const[e,t]=Object(a.useState)(null),[n,l]=Object(a.useState)(!1),[o,r]=Object(a.useState)(!1),[c,i]=Object(a.useState)(null);Object(a.useEffect)(()=>{if(c){const e=setTimeout(()=>{i(null),"success"===c.type&&(t(null),r(!1))},3e3);return()=>clearTimeout(e)}},[c]);return{selectedFile:e,handleFileSelect:e=>{e.target&&e.target.files&&(t(e.target.files[0]),r(!0),i(null))},handleCompression:async()=>{if(!e)return;l(!0),i(null);const n=new FormData;n.append("file",e),n.append("compressorType","gz");try{console.log("Sending file to server:",e.name);const o=await s.a.post("http://localhost:8080/api/compress",n,{responseType:"blob",headers:{"Content-Type":"multipart/form-data"}});console.log("Received response from server:",o);const c=new Blob([o.data],{type:o.headers["content-type"]}),d=document.createElement("a");d.href=window.URL.createObjectURL(c),d.download="".concat(e.name,".gz"),d.click(),console.log("File download triggered"),i({type:"success",text:"".concat(e.name," compressed successfully!")}),setTimeout(()=>{t(null),r(!1)},3e3)}catch(a){console.error("Error compressing file:",a),a.response?i({type:"error",text:"Server error: ".concat(a.response.status)}):a.request?i({type:"error",text:"No response received from server"}):i({type:"error",text:"Error: ".concat(a.message)})}finally{l(!1)}},loading:n,fileSelected:o,message:c,setMessage:i}};var f=function(){const{selectedFile:e,handleFileSelect:t,handleCompression:n,loading:a,fileSelected:o,message:r,setMessage:s}=u();return l.a.createElement("div",{className:"parent-container"},l.a.createElement("div",null,l.a.createElement("div",{className:"p-container"},l.a.createElement("h1",{className:"header-text"},o?"":"Upload a file to compress")),l.a.createElement("div",{className:"p-container"},l.a.createElement("p",{style:{width:"fit-content"}},o?"":"Select a file to reduce its file size with our compressor")),e&&l.a.createElement("div",{className:"p-container"},l.a.createElement("p",{style:{width:"fit-content",color:"#0866fd"}},e.name)),l.a.createElement("div",{className:"button-container"},l.a.createElement(c.a,{variant:"contained",onClick:o?n:()=>{document.getElementById("fileInput").click()},disabled:a},a?l.a.createElement(i.a,{size:24}):o?"Compress File":"Select File")),l.a.createElement("input",{type:"file",accept:"image/*",onChange:t,style:{display:"none"},id:"fileInput"})),l.a.createElement(d.a,{open:!!r,autoHideDuration:3e3,onClose:()=>s(null),TransitionComponent:m.a},l.a.createElement(p.a,{onClose:()=>s(null),severity:null===r||void 0===r?void 0:r.type,sx:{width:"100%"},variant:"filled"},null===r||void 0===r?void 0:r.text)))};var g=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,136)).then(t=>{let{getCLS:n,getFID:a,getFCP:l,getLCP:o,getTTFB:r}=t;n(e),a(e),l(e),o(e),r(e)})};r.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(f,null))),g()},81:function(e,t,n){e.exports=n(100)},89:function(e,t,n){},90:function(e,t,n){}},[[81,1,2]]]);
//# sourceMappingURL=main.0743d4c8.chunk.js.map