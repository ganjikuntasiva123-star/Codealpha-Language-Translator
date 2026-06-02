const languages = [
  { code: "auto", name: "Auto Detect" },
  { code: "en", name: "English" },
  { code: "te", name: "Telugu" },
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
  { code: "ml", name: "Malayalam" },
  { code: "kn", name: "Kannada" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh-CN", name: "Chinese" }
];

const sourceLanguage =
document.getElementById("sourceLanguage");

const targetLanguage =
document.getElementById("targetLanguage");

const inputText =
document.getElementById("inputText");

const outputText =
document.getElementById("outputText");

const translateButton =
document.getElementById("translateButton");

const copyButton =
document.getElementById("copyButton");

const swapButton =
document.getElementById("swapButton");

const message =
document.getElementById("message");

const charCount =
document.getElementById("charCount");

const outputBadge =
document.getElementById("outputBadge");


/* BACKEND URL */

const apiBaseUrl =
"https://codealpha-language-translator-7dzt.onrender.com";


/* WAKE UP RENDER */

window.addEventListener(
"load",
async()=>{

try{

await fetch(apiBaseUrl);

}catch(e){

console.log("Backend waking");

}

}
);


function fillLanguageDropdowns(){

languages.forEach(lang=>{

sourceLanguage.add(
new Option(lang.name,lang.code)
);

if(lang.code!=="auto"){

targetLanguage.add(
new Option(lang.name,lang.code)
);

}

});

sourceLanguage.value="auto";

targetLanguage.value="te";

}


function showMessage(
text,
type="error"
){

message.textContent=text;

message.className=
`message ${type==="success"?"success":""}`;

message.style.display="block";

}


function clearMessage(){

message.style.display="none";

}


function updateCharCount(){

charCount.textContent=
`${inputText.value.length} / ${inputText.maxLength}`;

}


function setOutputBadge(text){

outputBadge.textContent=text;

}


function setLoading(state){

translateButton.disabled=state;

translateButton.querySelector(
".button-text"
).textContent=

state
?
"Forging..."
:
"Forge Translation";

}


async function translateText(){

const text=
inputText.value.trim();

if(!text){

showMessage(
"Please enter text"
);

return;

}

clearMessage();

setLoading(true);

setOutputBadge(
"Translating..."
);

outputText.value="";


try{

const controller =
new AbortController();

const timeout =
setTimeout(
()=>controller.abort(),
20000
);

const response =
await fetch(

`${apiBaseUrl}/api/translate`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

text:text,

source:
sourceLanguage.value,

target:
targetLanguage.value

}),

signal:
controller.signal

}

);

clearTimeout(timeout);

if(!response.ok){

throw new Error(
`Server Error ${response.status}`
);

}

const result =
await response.json();

outputText.value=

result?.data?.translatedText ||

"No translation returned";

setOutputBadge(
"Done"
);

showMessage(
"Translated Successfully",
"success"
);

}

catch(error){

console.log(error);

if(
error.name==="AbortError"
){

showMessage(
"Server Timeout. Backend sleeping."
);

}else{

showMessage(
"Backend Offline / CORS / Failed Fetch"
);

}

setOutputBadge(
"Failed"
);

}

finally{

setLoading(false);

}

}


async function copyTranslation(){

if(
!outputText.value.trim()
){

showMessage(
"Nothing to copy"
);

return;

}

try{

await navigator.clipboard.writeText(
outputText.value
);

showMessage(
"Copied Successfully",
"success"
);

}catch{

showMessage(
"Copy Failed"
);

}

}


function swapLanguages(){

if(
sourceLanguage.value==="auto"
)return;

const temp=
sourceLanguage.value;

sourceLanguage.value=
targetLanguage.value;

targetLanguage.value=
temp;

}


translateButton.addEventListener(
"click",
translateText
);

copyButton.addEventListener(
"click",
copyTranslation
);

swapButton.addEventListener(
"click",
swapLanguages
);

inputText.addEventListener(
"input",
updateCharCount
);

fillLanguageDropdowns();

updateCharCount();
