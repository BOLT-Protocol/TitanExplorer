let connector;
let WCState = {};

$(document).ready(() => {
  walletConnectInit().then(() => {});
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
  }
};

const onSessionUpdate = async (accounts, chainId) => {
  const address = accounts[0];
  await getAccountAssets();
};

const killSession = async () => {
  //   const { connector } = this.state;
  if (connector) {
    connector.killSession();
  }
  //   this.resetApp();
};

const getAccountAssets = async () => {
  const { address, chainId } = WCState;
  // this.setState({ fetching: true });
  try {
    // get account balances
    API.getAssets(address, chainId);

    //   await this.setState({ fetching: false, address, assets });
  } catch (error) {
    console.error(error);
    //   await this.setState({ fetching: false });
  }
};

const onConnect = async (payload) => {
  const { chainId, accounts } = payload.params[0];
  const address = accounts[0];
  console.log(chainId, address);
  await getAccountAssets();
};

const sendTransaction = async () => {
  // TODO:
  const tx = {};
  const result = await connector.sendTransaction(tx);
};
