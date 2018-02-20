import request from 'lib/request'


// GET: Node Information
function index() {
  return request({
    url:    `/`,
    method: 'GET'
  })
}


// GET: Connect Node List
function list() {
  return request({
    url:    `/nodes`,
    method: 'GET'
  })
}



const NodeService = {
  index, list,
}

export default NodeService;
