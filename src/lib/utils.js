
// Utility Functions
// -----------------


const renderIf = function(cond, then, other) {
  if (cond)
    return then;
  else if (other)
    return other;
}



const toUTF8 = function(string) {
  return unescape(encodeURIComponent(string));
}

const fromUTF8 = function(string) {
  return decodeURIComponent(escape(string));
}



const pluck = function(source, keys) {
  var object = {};
  keys.forEach((key) => { object[key] = source[key]; });
  return object;
}


// Export

const utils = {
  renderIf,
  toUTF8,
  fromUTF8,
  pluck,
};


export default utils;
