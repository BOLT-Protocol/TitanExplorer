$(document).ready(() => {
  API.getExplorerInfo().then(
    (res) => {
      console.log(res);
      if (res.success) {
        renderItems(res.payload.items);
      }
    },
    (e) => console.error(e)
  );
});

const renderItems = (items) => {
  items.forEach((el) => {
    $(".explorer-list").append(
      tmpGenetator(TMP.EXPLORER_ITEM, {
        name: el.name,
        blockHeight: el.blockHeight,
        tps: el.tps,
        avgFee: el.avgFee,
      })
    );
  });
};
