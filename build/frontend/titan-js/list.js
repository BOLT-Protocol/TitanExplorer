let currentIndex = 0;

$(document).ready(() => {
  API.getTransactions({ index: currentIndex })
    .then((res) => {
      if (res.success) {
        const $list = $("table.list");
        res.payload.items.forEach((item) => {
          $list.append(tmpGenetator(TMP.TRANSACTION, { ...item }));
        });

        fadeOut();
      }
    }, (e) => console.error(e))
});
