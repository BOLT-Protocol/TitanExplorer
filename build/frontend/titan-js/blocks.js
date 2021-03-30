$(document).ready(() => {
  API.getBlocks().then(
    (res) => {
      if (res.success) {
        renderBlocks(res.payload.items);
      }
    },
    (e) => console.error(e)
  );
});

const renderBlocks = (blocks) => {
  blocks.forEach((el) => {
    $(".block-list tbody").append(
      tmpGenetator(TMP.BLOCK, {
        name: el.name,
        blockHeight: el.blockHeight,
        timestamp: el.timestamp * 1000,
        txCount: el.txCount,
        blockHash: el.blockHash
      })
    );
  });
};
