import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && !isConnected) {
      // Redirect to homepage
      router.push("/");
    }
  }, [isConnected, router.isReady]);

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
              <li>
                <button className="bg-yellow-400 hover:bg-yellow-500 rounded-full inline-block py-2 px-6 text-lg">
                  Dashboard
                </button>
              </li>
            </ul>
          </div>
        </header>

        <h2 className="text-center my-12 text-gray-900 max-w-3xl leading-snug text-3xl font-bold mx-auto">
          Welcome to Dashboard
        </h2>

        <div className="my-12 p-4 max-w-7xl mx-auto">
          <ul className="flex justify-between items-center">
            <li className="text-2xl text-gray-800">Created Quizzes</li>
            <li className="text-2xl">
              <Link
                className="bg-blue-700 shadow hover:bg-blue-800 text-white rounded-full inline-block py-2 px-6 text-lg"
                href="/dashboard/quiz/create"
              >
                Create New Quiz
              </Link>
            </li>
          </ul>

          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul>
                <li>
                  <Link href="/dashboard/quiz/view/0x000000" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-900 truncate">Quiz 1</p>
                        <div className="ml-2 flex-shrink-0 flex gap-x-2">
                          <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            3 Questions
                          </p>
                          <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Passing Score: 60
                          </p>
                          <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Submitted: 2
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/quiz/view/0x000000" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-900 truncate">Quiz 1</p>
                        <div className="ml-2 flex-shrink-0 flex gap-x-2">
                          <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            3 Questions
                          </p>
                          <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Passing Score: 60
                          </p>
                          <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Submitted: 2
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/quiz/view/0x000000" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-900 truncate">Quiz 1</p>
                        <div className="ml-2 flex-shrink-0 flex gap-x-2">
                          <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            3 Questions
                          </p>
                          <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Passing Score: 60
                          </p>
                          <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Submitted: 2
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
