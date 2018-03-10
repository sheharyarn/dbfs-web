import request from 'lib/request'


// GET: Block Information
function get(hash) {
  return request({
    url:    `/blocks/${hash}`,
    method: 'GET'
  })
}


// GET: Block File
function getFile(hash) {
  return request({
    url:    `/blocks/${hash}/file`,
    method: 'GET'
  }).then((data) => {
    return data.file;
  })
}


// POST: Insert new Block
function create({block, data}) {
  return request({
    url:    `/blocks`,
    method: 'POST',
    data: { block, data }
  })
}



const BlockService = {
  get, getFile, create,
}

export default BlockService;

