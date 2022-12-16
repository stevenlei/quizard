import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import QUIZARD_ABI from "../../contracts/Quizard.json";
import { ethers } from "ethers";

import { useWeb3Modal } from "@web3modal/react";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const router = useRouter();

  useEffect(() => {
    if (router.isReady && isConnected) {
      init();
    }
  }, [isConnected, router.isReady]);

  // Get the contract address from URL
  const { contractAddress } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [quizName, setQuizName] = useState(null);
  const [tokenId, setTokenId] = useState(null);

  const init = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUIZARD_JSON_API_PROVIDER_URL);
      const quizardContract = new ethers.Contract(contractAddress, QUIZARD_ABI.abi, provider);

      const brief = await quizardContract.getBrief();
      setQuizName(brief.name);

      const eligibleStatus = await quizardContract.isEligibleToClaimNFT(address);
      setIsEligible(eligibleStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const claim = async () => {
    setIsClaiming(true);

    try {
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizard: contractAddress,
          student: address,
        }),
      });

      if (response.status === 200) {
        const { tokenId } = await response.json();
        setTokenId(tokenId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsClaiming(false);
    }
  };

  const loadingIcon = () => (
    <svg
      className="animate-spin h-6 w-6 text-gray-500 mx-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>Quizard</title>
        <meta name="description" content="Quiz Platform in the Web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto">
        <header className="bg-slate-900">
          <div className="px-4 py-4 max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-white text-3xl font-bold">
              <Link href="/">Quizard</Link>
            </h1>
            <ul className="flex">
              {!isConnected && (
                <li>
                  <button
                    onClick={() => open()}
                    className="bg-yellow-400 hover:bg-yellow-500 rounded-full inline-block py-2 px-6 text-lg"
                  >
                    Connect with Wallet
                  </button>
                </li>
              )}
              {isConnected && (
                <>
                  <li className="mt-2 mr-2">
                    <p className="text-gray-400 text-lg">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </p>
                  </li>
                  <li>
                    <button
                      onClick={() => disconnect()}
                      className="ml-4 bg-gray-700 hover:bg-gray-600 text-gray-400 rounded-full inline-block py-2 px-6 text-lg"
                    >
                      Disconnect
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </header>

        {isConnected && isLoading && <div className="flex justify-center items-center my-32">{loadingIcon()}</div>}

        {!isConnected && (
          <div className="flex justify-center items-center my-32 text-2xl">Please connect wallet to begin</div>
        )}

        {!isLoading && !isEligible && (
          <div className="flex justify-center items-center my-32 text-2xl">You are not eligible to claim the NFT</div>
        )}

        {!isLoading && isEligible && (
          <>
            <h2 className="text-center mt-12 mb-4 text-gray-900 max-w-3xl leading-snug text-3xl font-bold mx-auto">
              Claim your NFT for <strong>{quizName}</strong>!
            </h2>
            <p className="text-center text-gray-600">Quiz Contract Address: {contractAddress}</p>

            <div className="my-4 p-4 max-w-7xl mx-auto flex flex-col">
              {/* A dummy square image placeholder */}
              <div className="h-96 w-96 bg-gray-200 rounded-lg mx-auto"></div>

              <div className="text-center mt-8">
                {!tokenId && (
                  <>
                    <button
                      onClick={claim}
                      disabled={isClaiming}
                      className="disabled:bg-yellow-300 disabled:text-yellow-500 bg-yellow-400 hover:bg-yellow-500 justify-center items-center rounded-full inline-flex py-2 px-6 text-lg"
                    >
                      {isClaiming && loadingIcon()}
                      Claim Your NFT
                    </button>
                    <p className="text-gray-600 text-center mt-3 text-xs">Gas fee is covered by Quizard</p>
                  </>
                )}

                {tokenId && (
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://testnets.opensea.io/assets/${process.env.NEXT_PUBLIC_QUIZARD_NFT_ADDRESS}/${tokenId}`}
                    className=" bg-blue-700 hover:bg-blue-800 text-white justify-center items-center rounded-full inline-flex py-2 px-6 text-lg"
                  >
                    View on OpenSea (Testnet)
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer>
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-gray-600 text-center text-sm">&copy; 2022 Quizard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
