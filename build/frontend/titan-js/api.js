const _headers = {
  "Content-Type": "application/json;charset=UTF-8",
};

const _request = (path, type = "GET", endpointOverride) => (body) =>
  $.ajax({
    url: (endpointOverride || ENDPOINT) + path,
    type,
    dataType: "json",
    xhrFields: { withCredentials: true },
    crossDomain: true,
    beforeSend: (req) => {
      Object.entries(_headers).forEach(([key, value]) =>
        req.setRequestHeader(key, value)
      );
    },
    data: JSON.stringify(body),
    error: (e) => {},
  });

// API
const API = {
  getTransactions: ({ index = 0, limit = 30 }) =>
    _request(`/transactions?index=${index}&limit=${limit}`)(),
  getExplorerInfo: _request("/info"),
  getAddress: (address) => _request(`/address/${address}`)(),
  getTransactionsByAddress: (address, { index = 0, limit = 30 }) =>
    _request(
      `/address/${address}/transactions?index=${index}&limit=${limit}`
    )(),
  getBlocks: _request("/blocks"),
  getBlockDetail: (blockchainId, blockId) =>
    _request(`/blockchain/${blockchainId}/block/${blockId}`)(),
  getTransactionsByBlock: (blockchainId, blockId) =>
    _request(`/blockchain/${blockchainId}/block/${blockId}/transactions`)(),
  postSearch: (keyword) => _request(`/search/${keyword}`, 'POST')(),
  getTransactionDetail: (txId) => _request(`/transaction/${txId}`)(),
};
