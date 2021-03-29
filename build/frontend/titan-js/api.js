const _headers = {
  'Content-Type': 'application/json;charset=UTF-8',
};


const _request = (path, type = 'GET') => body => $.ajax({
  url: ENDPOINT + path,
  type,
  dataType: 'json',
  xhrFields: { withCredentials: true },
  crossDomain: true,
  beforeSend: (req) => {
    Object.entries(_headers).forEach(([key, value]) => req.setRequestHeader(key, value));
  },
  data: JSON.stringify(body),
  error: (e) => {

  },
});


// API
const API = {
  getNetwork: _request('/api/v1/blockchain'),
  getTransactionList: ({ start, limit }) => _request(`/transaction/list?start=${start}&limit=${limit}`)(),
  getAddress: (address) => _request(`/address/${address}`)
}