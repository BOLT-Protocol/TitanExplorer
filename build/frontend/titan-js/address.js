$(document).ready(() => {
  const search = new URLSearchParams(location.search);
  const address = search.get("address");

  Promise.all([
    API.getAddress(address),
    API.getTransactionsByAddress(address, {}),
  ]).then(([detailRes, txsRes]) => {
    if (detailRes.success && txsRes.success) {
      const { meta, items } = txsRes.payload;

      detailRes.payload.balance.map((b) => {
        renderDetail({
          address: b.address,
          balance: b.balance,
          blockchain: b.name,
          txCount: meta.count,
        });
      });

      renderTransactions(items);
    }
  });
});

const renderDetail = ({ address, txCount, balance, blockchain }) => {
  $(".table-detail").append(
    tmpGenetator(TMP.ADDRESS, { address, txCount, balance, blockchain })
  );
};

const renderTransactions = (txs) => {
    txs.forEach((el) => {
      $(".transaction-list tbody").append(
        tmpGenetator(TMP.TRANSACTION, { 
            iconUrl: el.iconUrl,
            txHash: el.txHash,
            from: el.from,
            to: el.to,
            value: el.value,
            symbol: el.symbol,
            timestamp: el.timestamp,
            block: el.block,
            fee: el.fee,
         })
      );
    });
  };
  