import { getColorFromImage } from 'mdui/functions/getColorFromImage.js';
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

function GenerateOrgTokens(text) {
  let elementlist = [];
  let isGhost = false;
  for (let char in text) {
    if (!isGhost) {
      if (text[char] === "ż") {
        elementlist.push({ value: text[char], type: "unknown", alt: "rz" });
      } else if (text[char] + text[parseInt(char) + 1] === "rz") {
        elementlist.push({ value: "rz", type: "unknown", alt: "ż" });
        isGhost = true;
      } else if (text[char] === " ") {
        elementlist.push({ value: " ", type: "known", alt: ", " });
      } else if (text[char] === "," && text[parseInt(char) + 1] === " ") {
        elementlist.push({ value: ", ", type: "known", alt: " " });
        isGhost = true;
      } else if (text[char] === "ó") {
        elementlist.push({ value: "u", type: "unknown", alt: "ó" });
      } else if (text[char] === "u") {
        elementlist.push({ value: "u", type: "unknown", alt: "ó" });
      } else {
        elementlist.push({ value: text[char], type: "known", alt: text[char] });
      }
    } else {
      isGhost = false;
    }
  }
  return elementlist;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateStates = (inputs, org, isShowingOrtho) => {
  let states = [];
  let state = "";
  let inp_i = 0;
  let org_i = 0;
  let wrongCount = 0,
    unknownCount = 0;
  for (let i = 0; i < org.length; i++) {
    let prevstate = state;
    if (
      inputs[inp_i] === org[org_i].alt[0] &&
      inputs[inp_i] !== org[org_i].value[0]
    ) {
      wrongCount++;
    }
    if (
      inputs[inp_i] === org[org_i].value[0] ||
      (inputs[inp_i] === org[org_i].alt[0] && !isShowingOrtho)||
      (org_i > 0 &&
        inputs[inp_i - 1] + inputs[inp_i] === org[org_i - 1].value) ||
      ((org_i > 0 && inputs[inp_i - 1] + inputs[inp_i] === org[org_i - 1].alt)  )||
      inputs[inp_i] + inputs[inp_i + 1] === org[org_i].value ||
      (inputs[inp_i] + inputs[inp_i + 1] === org[org_i].alt && !isShowingOrtho)
    ) {
      //typed correctly
      state = "typed";
    } else if (typeof inputs[inp_i] === "undefined") {
      if (org[org_i].type === "known") {
        state = "untyped";
      }
      if (org[org_i].type === "unknown") {
        state = "unknown";
      }
    } else {
      state = "wrong";
    }
    if (org[org_i].type === "unknown") {
      unknownCount++;
    }
    if (inputs[inp_i] === "," && org[org_i].value === " ") {
      unknownCount++;
    }

    states.push(state);

    if (
      org_i > 0 &&
      (inputs[inp_i - 1] + inputs[inp_i] === org[org_i - 1].value ||
        inputs[inp_i - 1] + inputs[inp_i] === org[org_i - 1].alt)
    ) {
      org_i--;
      i--;
    }
    inp_i++;
    org_i++;
  }
  states.push({ wrongCount: wrongCount, unknownCount: unknownCount });
  return states;
};

const createBlocks = (states, inputs, org) => {
  let value = inputs[0];
  let inp_i = 0;
  let org_i = 0;
  let blockarray = [];
  let prevstate;
  let alt, prevAlt;
  let hasEnded = false;
  let state;
  for (let element in states) {
    state = states[element];
    prevstate = states[element - 1];
    if (element < 1) {
      prevstate = "";
    }
    prevAlt = alt;
    alt = org[org_i].alt;

    if (state === prevstate) {
      if (state === "typed") {
        value += inputs[inp_i];
      }
      if(state === "wrong"){
        let spaceposition = org[org_i].value.search(" ");
        if( typeof spaceposition === "undefined"){
          value += inputs[inp_i];
        }
        else{
          value += inputs[inp_i].replace(" ", "_");
        }
      }
      if (state === "untyped") {
        if (org[org_i].value === ", ") {//propably where the spawning commas problem is located
          value += " ";
        } else {
          value += org[org_i].value;
        }
      if(state === "unknown"){
        if(org_i%2  === 1){
          value += org[org_i].value;
          alt = org[org_i].alt;
        }else{
          value += org[org_i].alt;
          alt = org[org_i].value;
        }
      }
      }
    } else {
      if (prevstate !== "") {
        blockarray.push({ value: value, state: prevstate, alt: prevAlt });
        if (state === "typed") {
          value = inputs[inp_i];
        }
        if(state === "wrong"){
          let spaceposition = org[org_i].value.search(" ");
          if( typeof spaceposition === "undefined"){
            value = inputs[inp_i];
          }
          else{
            value = inputs[inp_i].replace(" ", "_");
          }
        }
        if (state === "untyped") {
          if (org[org_i].value === ", ") {//propably where the spawning commas problem is located
            value = " ";
          } else {
            value = org[org_i].value;
          }
        }
        if(state === "unknown"){
          if(org_i%2 === 1){
            value = org[org_i].value;
            alt = org[org_i].alt;
          }else{
            value = org[org_i].alt;
            alt = org[org_i].value;
          }
        }

      }
    }
    //alt two-char values handling
    if (
      org_i > 0 &&
      (inputs[inp_i - 1] + inputs[inp_i] === org[org_i - 1].value ||
        inputs[inp_i - 1] + inputs[inp_i] === org[org_i - 1].alt)
    ) {
      org_i--;
    }
    inp_i++;
    org_i++;
    //check for the end of the org list
    if (org_i >= org.length - 2) {
      if (typeof inputs[inp_i - 1] !== "undefined") {
        hasEnded = true;
      } else {
        hasEnded = false;
      }
    } else {
      hasEnded = false;
    }
  }
  if (prevstate !== "") {
    blockarray.push({ value: value, state: state, alt: prevAlt });
    value = "";
  }
  blockarray.push(hasEnded);
  return blockarray;
};
const setTheme = (mode, isDark, color)=>{
  if(isDark){
    document.documentElement.classList.add("mdui-theme-dark");
    document.documentElement.classList.remove("mdui-theme-light")
}
    else{
        document.documentElement.classList.remove("mdui-theme-dark");
        document.documentElement.classList.add("mdui-theme-light");
    }
if(mode === "profile"){
  const image = new Image();
  image.src = localStorage.getItem("fileBase64");
  getColorFromImage(image).then(color => setColorScheme(color));
}else if(mode === "static"){
  setColorScheme(color);
}else{
  var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
  function deterministicRandom(seed, max_value = 100) {
    const hashValue = MD5(String(seed)).toString();
    const randomFloat = parseInt(hashValue.substring(0, 10), 16) / Math.pow(16, 10);
    return Math.floor(randomFloat * max_value);
  }
  
  // Example usage
  const seed = daysIntoYear(new Date());
  
  const randomNumber = deterministicRandom(seed) % 8;

  switch(randomNumber){
    case 0: 
      setColorScheme("#0394fc");
      break;
    case 1: 
      setColorScheme("#6b03fc");
      break;
    case 2: 
      setColorScheme("#f003fc");
      break;
    case 3: 
      setColorScheme("#fc0384");
      break;
    case 4: 
      setColorScheme("#fc0303");
      break;
    case 5: 
      setColorScheme("#fca103");
      break;
    case 6: 
      setColorScheme("#eaf72f");
      break;
    case 7: 
      setColorScheme("#78f72f");
      break;

  }
}
}
function daysIntoYear(date){
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(parseInt(r)) + componentToHex(parseInt(g)) + componentToHex(parseInt(b));
}
const stringtohex = (string) =>
  {
    let split= string.split(", ");
    return rgbToHex(...split);
  }

  function LightenDarkenColor(col, amt) {
     // Remove leading '#' if present
     col = col.replace(/^#/, '');
  // Check for valid hex color length (6 digits)
  if (col.length !== 6) {
    return col;
  }
  // Convert hex to decimal (base 16)
  const rgb = parseInt(col, 16);
  // Extract red, green, and blue values
  const red = (rgb >> 16) & 0xff;
  const green = (rgb >> 8) & 0xff;
  const blue = rgb & 0xff;
  // Adjust each color component based on amplifier
  const adjustedRed = Math.max(0, Math.min(255, red + amt));
  const adjustedGreen = Math.max(0, Math.min(255, green + amt));
  const adjustedBlue = Math.max(0, Math.min(255, blue + amt));
  // Combine adjusted values back into hex format
  return `#${adjustedRed.toString(16).padStart(2, '0')}${adjustedGreen.toString(16).padStart(2, '0')}${adjustedBlue.toString(16).padStart(2, '0')}`;
  }
  

export default { GenerateOrgTokens, generateStates, createBlocks, setTheme, stringtohex ,LightenDarkenColor};
