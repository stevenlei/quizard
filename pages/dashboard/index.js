import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import FACTORY_ABI from "../../contracts/QuizardFactory.json";
import QUIZARD_ABI from "../../contracts/Quizard.json";
import MANAGER_ABI from "../../contracts/QuizardManager.json";
import { ethers } from "ethers";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (router.isReady && !isConnected) {
      // Redirect to homepage
      router.push("/");
    } else if (router.isReady && isConnected) {
      init();
    }
  }, [isConnected, router.isReady]);

  const init = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_QUIZARD_JSON_API_PROVIDER_URL);
    const managerContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_QUIZARD_MANAGER_ADDRESS,
      MANAGER_ABI.abi,
      provider
    );

    try {
      const quizardAddresses = await managerContract.getQuizardsByTeacher(address);

      if (quizardAddresses.length > 0) {
        for (let i = 0; i < quizardAddresses.length; i++) {
          const quizardContract = new ethers.Contract(quizardAddresses[i], QUIZARD_ABI.abi, provider);
          const name = await quizardContract.getName();
          const questions = await quizardContract.getQuestions();

          setQuizzes((prev) => [
            ...prev,
            {
              address: quizardAddresses[i],
              name: name,
              questions: questions,
            },
          ]);
        }
      }
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

          {isLoading && <div className="flex justify-center items-center mt-8">{loadingIcon()}</div>}
          {!isLoading && quizzes.length === 0 && (
            <div className="flex justify-center items-center py-32 text-gray-800">
              No Quizzes yet, let's create a new one.
            </div>
          )}
          {!isLoading && quizzes.length > 0 && (
            <div className="mt-8">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul>
                  {quizzes.map((quiz, quizIndex) => (
                    <li key={quizIndex}>
                      <Link href={`/dashboard/quiz/view/${quiz.address}`} className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-medium text-gray-900 truncate">{quiz.name}</p>
                            <div className="ml-2 flex-shrink-0 flex gap-x-2">
                              <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {quiz.questions.length} Questions
                              </p>
                              {/* <p className="px-3 py-1 inline-flex leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Submitted: 2
                              </p> */}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
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
