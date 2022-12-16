import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const [walletAddress, setWalletAddress] = useState(null);

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
            <h1 className="text-white text-3xl font-bold">Quizard</h1>
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
                <li>
                  <Link
                    href="/dashboard"
                    className="bg-yellow-400 hover:bg-yellow-500 rounded-full inline-block py-2 px-6 text-lg"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {isConnected && (
                <li>
                  <button
                    onClick={() => disconnect()}
                    className="ml-4 bg-gray-700 hover:bg-gray-600 text-gray-400 rounded-full inline-block py-2 px-6 text-lg"
                  >
                    Disconnect
                  </button>
                </li>
              )}
            </ul>
          </div>
        </header>

        <h2 className="text-center my-24 text-gray-900 max-w-3xl leading-snug text-5xl font-bold mx-auto">
          Quizard is a Web3 Quiz Platform where students can claim POK(Proof of Knowledge) NFTs after passing the
          quizzes.
        </h2>
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
