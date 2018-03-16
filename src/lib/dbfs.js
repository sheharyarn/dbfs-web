
// DBFS Helpers
// ------------

import Utils     from 'lib/utils'
import Crypto    from 'lib/crypto'
import FileSaver from 'file-saver'



const isOwner = function(block, pem) {
  try {
    const pvtKey  = Crypto.RSA.parsePrivateKey(pem);
    const pubKey  = Crypto.RSA.getPublicKey(pvtKey);
    const encoded = Crypto.Base16.encode(pubKey);

    return (encoded == block.creator);

  } catch (err) {
    console.error("Invalid Key");
    return false;
  }
}


const decryptDownload = function(block, file, pem) {
  const file_key  = Crypto.RSA.decrypt(pem, block.data.file_key);
  const decrypted = Crypto.File.decrypt(file, file_key);
  const file_blob = Crypto.Base64.decodeBlob(decrypted);

  FileSaver.saveAs(file_blob, block.data.file_name);
}


const createBlock = function(prevHash, file, pem) {
  const fileKey   = Crypto.AES.newKey();
  const encrypted = Crypto.File.encrypt(file.data, fileKey);

  const block = {
    type: 'file_create',
    prev: prevHash,
    timestamp: Utils.timestamp(),
    data: {
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      file_hash: Crypto.sha256(encrypted),
      file_key:  Crypto.RSA.encrypt(pem, fileKey),
    }
  };

  const signed = Crypto.signBlock(block, pem);
  const hashed = Crypto.hashBlock(signed);

  return {block: hashed, data: encrypted};
}


// Export

const DBFS = {
  isOwner, decryptDownload, createBlock,
};


export default DBFS;
