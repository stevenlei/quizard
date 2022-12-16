import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import QUIZARD_ABI from "../../../../contracts/Quizard.json";
import { ethers } from "ethers";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && !isConnected) {
      // Redirect to homepage
      router.push("/");
    } else if (router.isReady && isConnected) {
      init();
    }
  }, [isConnected, router.isReady]);

  // Get the contract address from URL
  const { contractAddress } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  const [quizName, setQuizName] = useState(null);
  const [quizDescription, setQuizDescription] = useState(null);
  const [quizDuration, setQuizDuration] = useState(null);
  const [quizPassingScore, setQuizPassingScore] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [questions, setQuestions] = useState([]);

  const init = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUIZARD_JSON_API_PROVIDER_URL);

    try {
      const quizardContract = new ethers.Contract(contractAddress, QUIZARD_ABI.abi, provider);

      quizardContract.getBrief().then(({ name, description, duration, passingScore, startTime, endTime }) => {
        setQuizName(name);
        setQuizDescription(description);
        setQuizDuration(duration.toNumber());
        setQuizPassingScore(passingScore.toNumber());
        setQuizStartTime(startTime.toNumber());
        setQuizEndTime(endTime.toNumber());
      });

      quizardContract.getQuestions().then((questionsData) => {
        setQuestions(questionsData);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
              <li>
                <button className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md">
                  Dashboard
                </button>
              </li>
            </ul>
          </div>
        </header>

        <h2 className="text-center flex justify-center items-center mt-12 mb-4 text-gray-900 max-w-3xl leading-snug text-3xl font-bold mx-auto">
          {quizName ? quizName : loadingIcon()}
        </h2>
        <p className="text-center text-gray-600">Contract Address: {contractAddress}</p>

        <div className="my-4 p-4 max-w-7xl mx-auto flex">
          <div className="w-2/3 mr-4">
            <h2 className="text-2xl my-4">Questions</h2>
            {questions.length === 0
              ? loadingIcon()
              : questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="bg-white rounded-lg shadow-md p-4 my-4">
                    <h3 className="text-gray-900 text-2xl font-bold">Question {questionIndex + 1}</h3>
                    <p className="text-gray-800 text-lg mt-2">{question.question}</p>
                    <div className="mt-4 flex gap-4 flex-wrap">
                      {question.answers.map((option, buttonIndex) => (
                        <span
                          key={buttonIndex}
                          className={`${
                            question.correctAnswer.toNumber() === buttonIndex ? "bg-green-200" : "bg-gray-100"
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
                    <p className="text-gray-800 text-sm">{quizName ? quizName : loadingIcon()}</p>
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
                    <p className="text-gray-800 text-sm">{quizDescription ? quizDescription : loadingIcon()}</p>
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
                    <p className="text-gray-800 text-sm">{quizDuration ? quizDuration : loadingIcon()} minutes</p>
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
                    <p className="text-gray-800 text-sm">{quizStartTime ? quizStartTime : loadingIcon()}</p>
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
                    <p className="text-gray-800 text-sm">{quizEndTime ? quizEndTime : loadingIcon()}</p>
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
