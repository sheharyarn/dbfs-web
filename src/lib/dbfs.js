
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
      file_hash: Crypto.Hash.sha256(encrypted),
      file_key:  Crypto.RSA.encrypt(pem, fileKey),
    }
  };

  const signed = Crypto.Block.sign(block, pem);
  const hashed = Crypto.Block.hash(signed);

  return {block: hashed, data: encrypted};
}


const deleteBlock = function(prevHash, parentHash, pem) {
  const block = {
    type: 'file_delete',
    prev: prevHash,
    timestamp: Utils.timestamp(),
    data: {
      parent_hash: parentHash,
    }
  }

  const signed = Crypto.Block.sign(block, pem);
  const hashed = Crypto.Block.hash(signed);

  return hashed;
}


// Export

const DBFS = {
  isOwner, decryptDownload, createBlock, deleteBlock,
};


export default DBFS;
