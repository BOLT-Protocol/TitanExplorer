$(document).ready(() => {
  renderDetail({
    address: "1234568910",
    txCount: 64,
    balance: 1000,
  });
  renderTransactions();
});

const renderDetail = ({ address, txCount, balance }) => {
  $(".table-detail tbody").html(
    tmpGenetator(TMP.ADDRESS, { address, txCount, balance })
  );
};

const renderTransactions = () => {
  new Array(10).fill("").forEach((el) => {
    $(".transaction-list tbody").append(
      tmpGenetator(TMP.TRANSACTION, { value: "100.0" })
    );
  });
};
