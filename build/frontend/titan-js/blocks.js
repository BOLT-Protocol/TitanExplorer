$(document).ready(() => {
    renderBlocks();
  });


  const renderBlocks = () => {
    new Array(10).fill("").forEach((el) => {
      $(".block-list tbody").append(
        tmpGenetator(TMP.BLOCK, { blockHeight: 10000, timestamp: Date.now(), txCount: 999 })
      );
    });
  };
  