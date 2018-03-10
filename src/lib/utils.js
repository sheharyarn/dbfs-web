
// Utility Functions
// -----------------


import _ from 'lodash'



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



const canReadFiles = function() {
  return !!(window.File && window.FileReader && window.FileList && window.Blob);
}


const readFile = function(file, onRead) {
  if (onRead && file && canReadFiles()) {
    var reader = new FileReader();

    reader.onerror = function(ev) {
      console.error("Unable to read file: ", file);
    };

    reader.onload = function(ev) {
      var filedata = file;
      filedata.data = ev.target.result;
      onRead(filedata);
    };

    reader.readAsBinaryString(file);
  }
}


const timestamp = function() {
  return (new Date()).toISOString();
}


const encodeJSON = function(object, fields) {
  if (_.isPlainObject(object)) {
    object = (fields ? _.pick(object, fields) : object);

    var encoded =
      Object
      .keys(object)
      .sort()
      .map((k) => encodeJSON(k) + ':' + encodeJSON(object[k]))
      .join(',');

    return ('{' + encoded + '}');

  } else {
    return JSON.stringify(object);
  }
};



// Export

const utils = {
  renderIf,
  toUTF8,
  fromUTF8,
  canReadFiles,
  readFile,
  timestamp,
  encodeJSON,
};


export default utils;
