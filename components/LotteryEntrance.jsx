import React, { useEffect, useState } from "react";
import { contractAddresses, abi } from "@/constants";
import { ethers } from "ethers";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useNotification } from "web3uikit";

const LotteryEntrance = () => {
  const [entranceFee, setEntranceFee] = useState();
  const [formattedEntranceFee, setFormattedEntranceFee] = useState();
  const { chainId: HexchainId, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(HexchainId);

  const dispatch = useNotification();

  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  });

  useEffect(() => {
    const getRaffleFee = async () => {
      if (isWeb3Enabled) {
        const raffleFee = await getEntranceFee();
        setEntranceFee(raffleFee);
        setFormattedEntranceFee(ethers.utils.formatEther(raffleFee));
      }
    };
    getRaffleFee();
  }, [isWeb3Enabled]);

  //THE tx WILL COME AS A PARAMETER FROM WHERE ITS CALLED
  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewNotifiacation();
  };

  const handleNewNotifiacation = () => {
    dispatch({
      type: "success",
      message: "Transaction complete!!!",
      title: "Transaction Notification",
      position: "topR",
      isClosing: true,
    });
  };

  return (
    <div>
      {raffleAddress ? (
        <h4>
          <button
            onClick={async () => {
              /*onSuccess just checks if the transaction
              was sent from metamask to the chain it doesnt
              checks for the block confirmations*/
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              });
              console.log("Raffle Entered");
            }}
            className="px-4 py-2 border-2"
          >
            Enter Raffle
          </button>
          Entrance Fee: {formattedEntranceFee}
          <span className="font-semibold">Eth</span>{" "}
        </h4>
      ) : (
        <div>No Raffle Address detected</div>
      )}
    </div>
  );
};

export default LotteryEntrance;
