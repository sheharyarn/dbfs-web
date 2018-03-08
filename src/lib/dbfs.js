
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


// Export

const DBFS = {
  isOwner,
};


export default DBFS;
