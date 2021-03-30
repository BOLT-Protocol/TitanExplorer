const TMP = {
  TRANSACTION: "TRANSACTION",
  ADDRESS: "ADDRESS",
  BLOCK: "BLOCK",
  EXPLORER_ITEM: 'EXPLORER_ITEM'
};

const tmpGenetator = (tmp, resource) => {
  if (tmp === TMP.TRANSACTION) {
    return txTmp(resource);
  }

  if (tmp === TMP.ADDRESS) {
    return addressTmp(resource);
  }

  if (tmp === TMP.BLOCK) {
    return blockTmp(resource);
  }

  if (tmp === TMP.EXPLORER_ITEM) {
      return explorerItemTmp(resource);
  }

  return "";
};

const txTmp = ({
  iconUrl,
  txHash,
  from,
  to,
  value,
  symbol,
  timestamp,
  block,
  fee,
}) => {
  const amount = value.split(".");

  const _from = from.startsWith("[")
    ? JSON.parse(from).map((a) => a.addresses[0])
    : [from];

  const _to = to.startsWith("[")
    ? JSON.parse(to).map((a) => a.addresses[0])
    : [to];

  return `
      <tr>
        <td><img src="${iconUrl}" alt="${symbol}"></td>
          <td>${formatLength(txHash)}</td>
          <td>
            ${_from
              .map(
                (addr) =>
                  `<a href="address.html?address=${addr}">${formatLength(
                    addr
                  )}</a><br/>`
              )
              .join("")}
          </td>
          <td>
          ${_to
            .map(
              (addr) =>
                `<a href="address.html?address=${addr}">${formatLength(
                  addr
                )}</a><br/>`
            )
            .join("")}

          </td>
          <td>${amount[0]}<small>.${amount[1] || "0"}</small> ${symbol}</td>
          <!--
          <td>
              <div class="table-progress">
                  <div class="progress-line" data-value="${fee}"></div>
                  <span>${fee}</span>
              </div>
          </td>
          -->
          <td>${new Date(timestamp)}</td>
      </tr>
  `;
};

const addressTmp = ({ address, txCount, balance, blockchain }) =>
  `
  <table class="table table-striped table-latests ">
        <tbody >
            <tr>
                <td><strong>Blockchain</strong></td>
                <td>${blockchain}</td>
            </tr>
            
            <tr>
                <td><strong>Address</strong></td>
                <td>${address}</td>
            </tr>

            <tr>
                <td><strong>No. Transactions</strong></td>
                <td>${txCount}</td>
            </tr>
            <tr>
                <td><strong>Balance</strong></td>
                <td>${balance}</td>
            </tr>
        </ tbody>
    </table>
`;

const blockTmp = ({ name, blockHeight, timestamp, txCount, blockHash }) =>
  `
  <tr>
    <td>${name}</td>
    <td><a href="block-detail.html?blockHash=${blockHash}">${blockHeight}</a></td>
    <td>${new Date(timestamp)}</td>
    <!-- <td>1 - 0.3 kB</td>-->
    <td>${txCount}</td>
    </tr>
    `;

const explorerItemTmp = ({ name, blockHeight, tps, avgFee }) => `
    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="item">
            <div class="title">
                <div class="icon"></div>
                <h5>${name}</h5>
            </div>
            <div class="text">
                <span>${blockHeight} Blocks</span>
            </div>

            <div class="text">
                <span>${tps} TPS</span>
            </div>

            <div class="text">
                <span>Fee: ${avgFee} </span>
            </div>
        </div>
    </div>
`;

const formatLength = (str, length = 16) => {
  try {
    return str.substr(0, length) + "...";
  } catch (e) {
    console.error(e);

    return str;
  }
};
