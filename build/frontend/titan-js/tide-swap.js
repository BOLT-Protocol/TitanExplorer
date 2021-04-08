let connector;
let WCState = {};

$(document).ready(() => {
    $("#walletconnect-btn").click(function(){
        walletConnectInit().then(() => {});
    });

    $("#swap-btn").click(function(){
      sendTransaction().then(() => {});
  }); 
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
    WCState = {...WCState, assets}

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
  await getAccountAssets();
};

const onDisconnect = () => {
  resetApp();
};

const resetApp = () => {
  WCState = {};
  renderWCBtn();
};

const sendTransaction = async () => {
  console.log(WCState);
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
  const result = await connector.sendTransaction(tx);
};

const updateMaxAmount = (assets) => {
    // TODO
    $('#max-amount').html(`Max: ${assets}`);
}

const renderSwapBtn = () => {
  $('#walletconnect-btn').remove();
  $('#swap-btn').show();
}

const renderReset = () => {
  $('#max-amount').html('');
  $('#walletconnect-btn').show();
  $('#swap-btn').hide();
}