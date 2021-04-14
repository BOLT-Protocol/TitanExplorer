$(document).ready(() => {
  const search = new URLSearchParams(location.search);
  const txHash = search.get("hash");

  API.getTransactionDetail(txHash).then(
    (res) => {
      if (res.success) {
        const $list = $(".transaction-list tbody");
        res.payload.forEach((item) => {
          $list.append(tmpGenetator(TMP.TRANSACTION_DETAIL, { ...item, timestamp: item.timestamp * 1000 }));
        });
      }
      fadeOut();
    },
    (e) => console.error(e)
  );
});
