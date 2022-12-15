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
          Quiz 1
        </h2>
        <p className="text-center text-gray-600">Contract Address: 0x00000...</p>

        <div className="my-4 p-4 max-w-7xl mx-auto flex">
          <div className="w-2/3 mr-4">
            <h2 className="text-2xl my-4">Questions</h2>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="bg-white rounded-lg shadow-md p-4 my-4">
                <h3 className="text-gray-900 text-2xl font-bold">Question {questionIndex + 1}</h3>
                <p className="text-gray-800 text-lg mt-2">{question.question}</p>
                <div className="mt-4 flex gap-4 flex-wrap">
                  {question.options.map((option, buttonIndex) => (
                    <span
                      key={buttonIndex}
                      className={`${
                        question.answer === buttonIndex ? "bg-green-200" : "bg-gray-100"
                      } rounded-full inline-block py-2 px-6 text-lg`}
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/3">
            <h2 className="text-2xl my-4">Settings</h2>
            <div className="bg-white rounded-lg shadow-md my-4">
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Name</h3>
                    <p className="text-gray-800 text-sm">Quiz 1</p>
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md">
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Description</h3>
                    <p className="text-gray-800 text-sm">This is a quiz about India</p>
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md">
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Duration</h3>
                    <p className="text-gray-800 text-sm">30 minutes</p>
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md">
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Prize</h3>
                    <p className="text-gray-800 text-sm">1000 DAI</p>
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md">
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Status</h3>
                    <p className="text-gray-800 text-sm">Active</p>
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md">
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Start Time</h3>
                    <p className="text-gray-800 text-sm">2021-10-10 10:00:00</p>
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md">
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz End Time</h3>
                    <p className="text-gray-800 text-sm">2021-10-10 10:30:00</p>
                  </div>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <h2 className="text-2xl my-4 mt-8">Leaderboard</h2>
            {/* Get a list of dummy leaderboard */}
            <div className="bg-white rounded-lg shadow-md p-4 my-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg font-bold">John Doe</h3>
                  <p className="text-gray-800 text-sm">0x1234567890</p>
                </div>
                <div className="text-gray-900 text-lg font-bold">70</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 my-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg font-bold">John Doe</h3>
                  <p className="text-gray-800 text-sm">0x1234567890</p>
                </div>
                <div className="text-gray-900 text-lg font-bold">70</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 my-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 text-lg font-bold">John Doe</h3>
                  <p className="text-gray-800 text-sm">0x1234567890</p>
                </div>
                <div className="text-gray-900 text-lg font-bold">70</div>
              </div>
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
