
// DBFS Helpers
// ------------

import Crypto from 'lib/crypto'



const isOwner = function(block, pem) {
  try {
    const pvtKey  = Crypto.parsePrivateKey(pem);
    const pubKey  = Crypto.getPublicKey(pvtKey);
    const encoded = Crypto.encode16(pubKey);

    return (encoded == block.creator);

  } catch (err) {
    console.error("Invalid Key");
    return false;
  }
}


const decryptDownload = function(block, file, pem) {
  const decrypted = Crypto.decryptFile(file, pem);

  var link = document.createElement('a');

  link.href = 'data:application/octet-stream;base64,' + encodeURIComponent(decrypted);
  link.target = '_self';
  link.download = block.data.file_name;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// Export

const DBFS = {
  isOwner, decryptDownload,
};


export default DBFS;
