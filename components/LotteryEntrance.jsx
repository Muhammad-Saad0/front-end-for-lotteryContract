import React, { useEffect } from "react";
import { contractAddresses, abi } from "@/constants";
import { useMoralis, useWeb3Contract } from "react-moralis";

const LotteryEntrance = () => {
  const { chainId: HexchainId, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(HexchainId);
  console.log(chainId);
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  console.log(raffleAddress);
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress, // specify the networkId
    functionName: "getEntranceFee",
    params: {},
  });

  useEffect(() => {
    const getRaffleFee = async () => {
      if (isWeb3Enabled) {
        console.log("point 1");
        const raffleFee = await getEntranceFee();
        console.log(raffleFee);
      }
    };
    getRaffleFee();
  }, [isWeb3Enabled]);

  return <div></div>;
};

export default LotteryEntrance;
