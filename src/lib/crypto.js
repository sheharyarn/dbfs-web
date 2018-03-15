
// Crypto Helpers
// --------------


import _     from 'lodash'
import Utils from 'lib/utils'



// Hashing

const sha256 = function(text) {
  return window.KJUR.crypto.Util.sha256(text).toUpperCase();
}




// Base 64 Encoding

const encode64 = function(text) { return btoa(text); }
const decode64 = function(text) { return atob(text); }

const decode64Blob = function(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}




// Base 16 Encoding


const Base16 = {
  /**
   * Encode in Base 16
   */
  encode: function(text) {
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
  },


  /**
   * Decode Base 16
   */
  decode: function(text) {
    var s = '';
    for (var i = 0; i < text.length; i+=2) {
      s += String.fromCharCode(parseInt(text.substr(i, 2), 16));
    }
    return decodeURIComponent(escape(s));
  },
};



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

const encryptRSA = function(pem, string) {
  const rsa = parsePrivateKey(pem);
  return encode64(rsa.encrypt(string));
}

const decryptRSA = function(pem, string) {
  const rsa = parsePrivateKey(pem);
  return rsa.decrypt(decode64(string));
}




// AES

const AES = {

  /**
   * Generate a strong 256-bit AES key
   */
  newKey: function() {
    const pass = window.CryptoJS.lib.WordArray.random(128/8);
    const salt = window.CryptoJS.lib.WordArray.random(128/8);

    return window.CryptoJS.PBKDF2(pass, salt, { keySize: 256/32 }).toString();
  },


  /**
   * Encrypt a string using AES
   */
  encrypt: function(string, key) {
    return window.CryptoJS.AES.encrypt(string, key).toString();
  },


  /**
   * Decrypt a string back to UTF-8
   */
  decrypt: function(string, key) {
    return window.CryptoJS.AES.decrypt(string, key).toString(window.CryptoJS.enc.Utf8);
  },
};






// Files

// Decodes the B64 file, decrypts, encodes back to B64
const decryptFile = function(file, key) {
  const decoded   = decode64(file);
  const decrypted = AES.decrypt(decoded, key);

  return encode64(decrypted);
}

// Takes raw file bytes, encrypts, and encodes to B64
const encryptFile = function(file, key) {
  return encode64(AES.encrypt(file, key));
}




// Blocks

const fields = {
  sign: ['data', 'type', 'prev', 'timestamp'],
  hash: ['data', 'type', 'prev', 'timestamp', 'creator', 'signature']
};

const signBlock = function(block, pem) {
  var block = _.clone(block);
  var json  = Utils.encodeJSON(block, fields.sign);
  var rsa   = parsePrivateKey(pem);
  var pub   = getPublicKey(rsa);

  block.signature = rsa.sign(json, 'sha256').toUpperCase();
  block.creator = Crypto.Base16.encode(pub);

  return block;
}

const hashBlock = function(block) {
  var block = _.clone(block);
  var json  = Utils.encodeJSON(block, fields.hash);

  block.hash = sha256(json);

  return block;
}




// Export

const Crypto = {
  sha256,

  Base16,
  encode64, decode64, decode64Blob,

  parsePrivateKey, getPublicKey, keyToString,
  encryptRSA, decryptRSA,

  AES,

  encryptFile, decryptFile,
  signBlock, hashBlock,
};


export default Crypto;
