import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      answer: 1,
    },
    {
      question: "What is the capital of USA?",
      options: ["New York", "Washington DC", "Los Angeles", "Chicago"],
      answer: 1,
    },
    {
      question: "What is the capital of China?",
      options: ["Beijing", "Shanghai", "Hong Kong", "Shenzhen"],
      answer: 0,
    },
  ]);

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
                <button className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md">
                  Dashboard
                </button>
              </li>
            </ul>
          </div>
        </header>

        <h2 className="text-center mt-12 mb-4 text-gray-900 max-w-3xl leading-snug text-3xl font-bold mx-auto">
          Create a new Quiz
        </h2>

        <div className="my-4 p-4 max-w-7xl mx-auto flex">
          <div className="w-2/3 mr-4">
            <h2 className="text-2xl my-4">Questions</h2>
            <div className="bg-white rounded-lg shadow-md my-4">
              <div className="p-4">
                <div className="flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Question</h3>
                    <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                  </div>
                  <div className="flex-1 mt-4">
                    <h3 className="text-gray-900 text-lg font-bold">Options (First option is the answer)</h3>
                    <div className="flex flex-col gap-2">
                      <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                      <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                      <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                      <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md my-4">
              <div className="p-4">
                <div className="flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Question</h3>
                    <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                  </div>
                  <div className="flex-1 mt-4">
                    <h3 className="text-gray-900 text-lg font-bold">Options (First option is the answer)</h3>
                    <div className="flex flex-col gap-2">
                      <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                      <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                      <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                      <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <h2 className="text-2xl my-4">Settings</h2>
            <div className="bg-white rounded-lg shadow-md my-4">
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Name</h3>
                    <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Description</h3>
                    <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Duration (minutes)</h3>
                    <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Passing Score</h3>
                    <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">NFT Image (PoK)</h3>
                    <button className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500">
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Start Time</h3>
                    <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz End Time</h3>
                    <input className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full bg-yellow-400 text-gray-900 rounded-lg p-4 text-xl hover:bg-yellow-500 font-bold">
              Create Quiz
            </button>
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
