
// Crypto Helpers
// --------------



// Hashing

const sha256 = function(text) {
  return window.KJUR.crypto.Util.sha256(text);
}




// Base 64 Encoding

const encode64 = function(text) { return btoa(text); }
const decode64 = function(text) { return atob(text); }




// Base 16 Encoding

const encode16 = function(text) {
  var text = text.replace(/\r/g, '');
  var digits = "0123456789ABCDEF";
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




// RSA

const parsePrivateKey = function(pem) {
  var rsa = new window.RSAKey();
  rsa.readPrivateKeyFromPEMString(pem);
  return rsa;
}

const getPublicKey = function(rsa) {
  var pub = window.KEYUTIL.getKey({n: rsa.n, e: rsa.e});
  return keyToString(pub);
}

const keyToString = function(key) {
  return window.KEYUTIL.getPEM(key);
}

const decryptFile = function(file, pem) {
  // TODO:
  // Decode file, decrypt and encode again
  //const pvtKey = parsePrivateKey(pem);
  return file;
}



// Export

const Crypto = {
  sha256,

  encode64, decode64,
  encode16, decode16,

  parsePrivateKey, getPublicKey, keyToString, decryptFile,
};


export default Crypto;
