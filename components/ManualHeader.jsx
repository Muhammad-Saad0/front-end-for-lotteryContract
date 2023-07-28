import React from "react";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

const ManualHeader = () => {
  //useMoralis is a hook
  //enableWeb3 we will use to connect to a wallet
  //account will give us the account if an account is connected
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (account == null) {
        window.localStorage.removeItem("connected");
        //sets the isWeb3Enabled to false
        deactivateWeb3();
      }
    });
  }, []);

  return (
    <div>
      {account ? (
        <h4>Connected to {account}</h4>
      ) : (
        <button
          className="px-4 py-2 bg-gray-400 rounded-sm"
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "inject");
            }
          }}
          //we will disable the button when we have
          //already made the request to connect
          disabled={isWeb3EnableLoading}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default ManualHeader;
