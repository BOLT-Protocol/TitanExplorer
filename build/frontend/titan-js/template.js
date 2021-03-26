const TMP = {
  TRANSACTION: "TRANSACTION",
  ADDRESS: "ADDRESS",
  BLOCK: "BLOCK",
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

  return `
      <tr>
          <td>${txHash}</td>
          <td>
              <a href="address.html">${from}</a>
          </td>
          <td>
              <a href="address.html">${to}</a>
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

const addressTmp = ({ address, txCount, balance }) =>
  `
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
    `;

const blockTmp = ({ blockHeight, timestamp, txCount }) =>
  `
  <tr>
    <td><a href="block-detail.html">${blockHeight}</a></td>
    <td>${timestamp}</td>
    <td>1 - 0.3 kB</td>
    <td>${txCount}</td>
    </tr>
    `;
