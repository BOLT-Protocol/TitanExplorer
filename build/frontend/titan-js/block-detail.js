$(document).ready(() => {
  const search = new URLSearchParams(location.search);
  const blockHash = search.get("blockHash");
  const blockId = search.get('blockId');

  if (!blockHash || !blockId) return;

  API.getBlocks().then(
    (res) => {
      if (res.success) {
        const block = {
            blockHash: blockHash,
            blockchainId: blockId
        }

        if (!block) return;

        Promise.all([
          API.getBlockDetail(block.blockchainId, block.blockHash),
          API.getTransactionsByBlock(block.blockchainId, block.blockHash),
        ]).then(([detailRes, txsRes]) => {
          if (detailRes.success && txsRes.success) {
            const { items } = txsRes.payload;

              renderDetail({
                blockHeight: detailRes.payload.blockHeight,
                txCount: detailRes.payload.txCount,
                timestamp: detailRes.payload.timestamp * 1000,
                blockchain: detailRes.payload.name,
                blockHash: block.blockHash,
                blockId: block.blockchainId
              });
            

            renderTransactions(items);
          }
        });
      }
    },
    (e) => console.error(e)
  );
});

const renderDetail = ({ name, blockHeight, timestamp, txCount, blockHash, blockId }) => {
  $(".block-detail tbody").append(
    tmpGenetator(TMP.BLOCK, { name, blockHeight, timestamp, txCount, blockHash, blockId })
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
        timestamp: el.timestamp * 1000,
        block: el.block,
        fee: el.fee,
      })
    );
  });
};
