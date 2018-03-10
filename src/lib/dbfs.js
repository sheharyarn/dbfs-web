
// DBFS Helpers
// ------------

import Utils     from 'lib/utils'
import Crypto    from 'lib/crypto'
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


const createBlock = function(prevHash, file, pem) {
  const encrypted = Crypto.encryptFile(file.data, pem);

  const block = {
    type: 'file_create',
    prev: prevHash,
    timestamp: Utils.timestamp(),
    data: {
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      file_hash: Crypto.sha256(encrypted),
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
