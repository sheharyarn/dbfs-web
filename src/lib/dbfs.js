
// DBFS Helpers
// ------------

import Crypto from 'lib/crypto'
import FileSaver from 'file-saver'



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
  const blob = Crypto.decode64Blob(decrypted);

  FileSaver.saveAs(blob, block.data.file_name);
}


// Export

const DBFS = {
  isOwner, decryptDownload,
};


export default DBFS;
