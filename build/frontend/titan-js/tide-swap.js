let connector;
let WCState = {};
// TODO: Get From API
let exchangeRate = 0.5;

$(document).ready(() => {
  $("#walletconnect-btn").click(function () {
    walletConnectInit().then(() => {});
  });

  $("#swap-btn").click(function () {
    sendTransaction().then(() => {});
  });

  $("#from-input").on("keyup", handleInput("from"));
  $("#to-input").on("keyup", handleInput("to"));

  function handleInput(direction) {
    var _timeout;

    return () => {
      clearTimeout(_timeout);
      if (!exchangeRate) return;
      _timeout = setTimeout(() => {
        const $input = direction === "from" ? $("#from-input") : $("#to-input");
        const amount = parseFloat($input.val());
        if (!amount) return;
        const value =
          direction === "from" ? amount * exchangeRate : amount / exchangeRate;
        const $result =
          direction === "from" ? $("#to-input") : $("#from-input");
        $result.val(value);
      }, 500);
    };
  }
});

const walletConnectInit = async () => {
  // bridge url
  const bridge = "https://bridge.walletconnect.org";

  // create new connector
  connector = new WCClient({ bridge, qrcodeModal: WCQRCode });

  // check if already connected
  if (!connector.connected) {
    // create new session
    await connector.createSession();
  }

  //   // subscribe to events
  await subscribeToEvents();
};

const subscribeToEvents = () => {
  if (!connector) {
    return;
  }

  connector.on("session_update", async (error, payload) => {
    console.log(`connector.on("session_update")`);

    if (error) {
      throw error;
    }

    const { chainId, accounts } = payload.params[0];
    onSessionUpdate(accounts, chainId);
  });

  connector.on("connect", (error, payload) => {
    console.log(`connector.on("connect")`);

    if (error) {
      throw error;
    }

    onConnect(payload);
  });

  connector.on("disconnect", (error, payload) => {
    console.log(`connector.on("disconnect")`);

    if (error) {
      throw error;
    }

    onDisconnect();
  });

  if (connector.connected) {
    const { chainId, accounts } = connector;
    const address = accounts[0];

    WCState = {
      connected: true,
      chainId,
      accounts,
      address,
    };

    onSessionUpdate(accounts, chainId);
    renderSwapBtn();
    updateAddress(address);
  }
};

const onSessionUpdate = async (accounts, chainId) => {
  const address = accounts[0];
  await getAccountAssets();
};

const killSession = async () => {
  if (connector) {
    connector.killSession();
  }
  resetApp();
};

const getAccountAssets = async () => {
  const { address, chainId } = WCState;
  // this.setState({ fetching: true });
  try {
    // get account balances
    // const assets = await API.getAssets(address, chainId);
    const assets = 1;

    //   await this.setState({ fetching: false, address, assets });
    WCState = { ...WCState, assets };

    updateMaxAmount(assets);
  } catch (error) {
    console.error(error);
    //   await this.setState({ fetching: false });
  }
};

const onConnect = async (payload) => {
  const { chainId, accounts } = payload.params[0];
  const address = accounts[0];
  WCState = {
    connected: true,
    chainId,
    accounts,
    address,
  };
  renderSwapBtn();
  updateAddress(address);
  await getAccountAssets();
};

const onDisconnect = () => {
  resetApp();
};

const resetApp = () => {
  WCState = {};
  renderReset();
};

const sendTransaction = async () => {
  console.log(WCState);
  console.log(connector);
  // TODO:

  // from
  const from = WCState.address;

  // to
  const to = WCState.address;

  // nonce
  const nonce = "0x1";

  // gasPrice
  const gasPrices = "0x6c341080bd1fb00000";

  // gasLimit
  const gasLimit = "0x5208";

  // value
  const value = "0x0";

  // data
  const data = "0x";

  const tx = {
    from,
    to,
    nonce,
    gasPrices,
    gasLimit,
    value,
    data,
  };

  renderPending();
  toggleModal();
  try {
    const result = await connector.sendTransaction(tx);
    console.log(result);
    renderResult();
  } catch (e) {
    console.error(e);
    renderReject();
    // toggleModal();
  }
};

const updateMaxAmount = (assets) => {
  // TODO
  $("#max-amount").html(`Max: ${assets}`);
};

const updateAddress = (address) => {
  $("#swap-address").html(formatLength(address));
};

const renderSwapBtn = () => {
  $("#walletconnect-btn").hide();
  $("#swap-btn").show();
};

const renderReset = () => {
  $("#max-amount").html("");
  $("#swap-address").html("");
  $("#walletconnect-btn").show();
  $("#swap-btn").hide();
};

const renderPending = () => {
  $("#swap-modal .modal-body").html(
    `
      <div class="row pb-3">
        <div class="col d-flex flex-column align-items-center">
          <h4>
            Pending Call Request
          </h4>
          <div class="loading-ripple m-4"><div></div><div></div></div>
          <p>Approve or reject request using your wallet</p>
        </div>
      </div>
    `
  );
};

const renderReject = () => {
  $("#swap-modal .modal-body").html(
    `
      <div class="row pb-3">
        <div class="col d-flex flex-column align-items-center">
          <h4>
           Call Resuest Rejected
          </h4>
          
        </div>
      </div>
    `
  );
};

// TODO: Render Transaction Content
const renderResult = () => {
  $("#swap-modal .modal-body").html(
    `
      <div class="row pb-3">
        <div class="col d-flex flex-column align-items-center">
          <h4>
           Call Resuest Approved
          </h4>
          
        </div>
      </div>
    `
  );
};

const toggleModal = () => {
  $("#swap-modal").modal("toggle");
};
