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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [quizName, setQuizName] = useState(null);
  const [quizDescription, setQuizDescription] = useState(null);
  const [quizDuration, setQuizDuration] = useState(null);
  const [quizPassingScore, setQuizPassingScore] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isAttendable, setIsAttendable] = useState(true);

  const init = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUIZARD_JSON_API_PROVIDER_URL);

    const quizardContract = new ethers.Contract(contractAddress, QUIZARD_ABI.abi, provider);

    quizardContract.isAttended(address).then((isAttended) => {
      setIsAttendable(!isAttended);
    });

    quizardContract
      .getBrief()
      .then(({ name, description, duration, passingScore, startTime, endTime }) => {
        setQuizName(name);
        setQuizDescription(description);
        setQuizDuration(duration.toNumber());
        setQuizPassingScore(passingScore.toNumber());
        setQuizStartTime(startTime.toNumber());
        setQuizEndTime(endTime.toNumber());
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });

    quizardContract
      .getQuestions()
      .then((questionsData) => {
        setQuestions(questionsData);
        setAnswers(questionsData.map((question) => null));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const submitQuiz = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, QUIZARD_ABI.abi, signer);

    setIsSubmitting(true);

    try {
      const tx = await contract.attendQuiz(answers);
      await tx.wait();

      router.push(`/claim/${contractAddress}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
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

        {isConnected && !isAttendable && (
          <div className="flex justify-center items-center my-32 text-2xl">You have already attended to this Quiz</div>
        )}

        {isConnected && isAttendable && questions.length > 0 && (
          <>
            <h2 className="text-center mt-12 mb-4 text-gray-900 max-w-3xl leading-snug text-3xl font-bold mx-auto">
              {quizName}
            </h2>
            <p className="text-center text-gray-600">Contract Address: {contractAddress}</p>
            <div className="ml-2 flex-shrink-0 mt-4 gap-x-2 flex justify-center items-center">
              <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {questions.length} Questions
              </p>
              <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Passing Score: {quizPassingScore}
              </p>
              <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Duration: {quizDuration} minutes
              </p>
            </div>

            <div className="my-4 p-4 max-w-7xl mx-auto flex flex-col">
              <div>
                {questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="bg-white rounded-lg shadow-md p-4 my-4">
                    <h3 className="text-gray-900 text-2xl font-bold">Question {questionIndex + 1}</h3>
                    <p className="text-gray-800 text-lg mt-2">{question.question}</p>
                    <div className="mt-4 flex gap-4 flex-wrap">
                      {question.answers.map((option, buttonIndex) => (
                        <button
                          key={buttonIndex}
                          onClick={() => {
                            const newAnswers = [...answers];
                            newAnswers[questionIndex] = buttonIndex;
                            setAnswers(newAnswers);
                          }}
                          disabled={isSubmitting}
                          className={`${
                            answers[questionIndex] !== null && answers[questionIndex] === buttonIndex
                              ? "bg-blue-700 hover:bg-blue-700 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          } rounded-full inline-block py-2 px-6 text-lg`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button
                  disabled={answers.filter((one) => one !== null).length !== questions.length}
                  className="disabled:bg-yellow-200 disabled:text-yellow-500 bg-yellow-400 hover:bg-yellow-500 rounded-full inline-flex justify-center items-center py-2 px-6 text-lg"
                  onClick={submitQuiz || isSubmitting}
                >
                  {isSubmitting && loadingIcon()}
                  Submit Quiz
                </button>
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
