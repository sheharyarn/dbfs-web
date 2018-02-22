import request from 'lib/request'


// GET: Block Information
function get(hash) {
  return request({
    url:    `/blocks/${hash}`,
    method: 'GET'
  })
}


const BlockService = {
  get,
}

export default BlockService;

