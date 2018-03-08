
// Crypto Helpers
// --------------


import Utils from 'lib/utils'



// Hashing

const sha256 = function(text) {
  return KJUR.crypto.Util.sha256(text);
}



// Base 64 Encoding

const encode64 = function(text) { return btoa(text); }
const decode64 = function(text) { return atob(text); }



// Base 16 Encoding

const encode16 = function(text) {
  const text = text.replace(/\r/g, '');
  const digits = "0123456789ABCDEF";
  var hex = "";

  for (var i = 0; i < text.length; i++) {
    const hc = (text.charCodeAt(i) >>> 4) & 0x0F;
    const lc = text.charCodeAt(i) & 0x0F;
    hex += digits[hc];
    hex += digits[lc];
  }

  return hex;
}

const decode16 = function(text) {
  var s = '';
  for (var i = 0; i < text.length; i+=2) {
    s += String.fromCharCode(parseInt(text.substr(i, 2), 16));
  }
  return decodeURIComponent(escape(s));
}






// Export

const Crypto = {
  sha256,
  encode64,
  decode64,
  encode16,
  decode16,
};


export default Crypto;
