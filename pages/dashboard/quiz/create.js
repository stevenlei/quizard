import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import FACTORY_ABI from "../../../contracts/QuizardFactory.json";

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

  const [loading, setLoading] = useState(false);
  const [quizName, setQuizName] = useState("Quiz Name");
  const [quizDescription, setQuizDescription] = useState("Description here...");
  const [quizDuration, setQuizDuration] = useState(30);
  const [quizPassingScore, setQuizPassingScore] = useState(60);
  const [quizStartTime, setQuizStartTime] = useState("2022-12-15 00:00:00");
  const [quizEndTime, setQuizEndTime] = useState("2022-12-20 23:59:59");

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

  const createQuiz = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const quizardFactory = new ethers.Contract(
      process.env.NEXT_PUBLIC_QUIZARD_FACTORY_ADDRESS,
      FACTORY_ABI.abi,
      signer
    );

    // Create a Quiz
    const quiz = {
      name: quizName,
      description: quizDescription,
      startTime: new Date(quizStartTime).getTime() / 1000,
      endTime: new Date(quizEndTime).getTime() / 1000,
      duration: +quizDuration,
      passingScore: +quizPassingScore,
      questions: questions.map((q) => {
        const correctAnswer = q.options[q.answer];

        // shuffle the answers
        const answers = q.options.sort(() => Math.random() - 0.5);

        // new correct answer index
        const newCorrectAnswer = answers.indexOf(correctAnswer);

        return {
          question: q.question,
          answers: answers,
          correctAnswer: newCorrectAnswer,
        };
      }),
    };

    try {
      setLoading(true);

      const quizardTx = await quizardFactory.createQuizard(
        quiz.name,
        quiz.description,
        quiz.passingScore,
        quiz.duration,
        quiz.startTime,
        quiz.endTime,
        quiz.questions.map((q) => q.question),
        quiz.questions.map((q) => q.answers),
        quiz.questions.map((q) => q.correctAnswer)
      );

      const quizardReceipt = await quizardTx.wait();

      const quizardContractAddress = quizardReceipt.events[0].args.quizard;
      const quizardTeacher = quizardReceipt.events[0].args.teacher;

      console.log(`Quizard created at ${quizardContractAddress} by ${quizardTeacher}`);

      // Redirect to the quiz page
      router.push(`/dashboard/quiz/view/${quizardContractAddress}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadingIcon = () => (
    <svg
      className="animate-spin h-6 w-6 text-white mx-2"
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

        <h2 className="text-center mt-12 mb-4 text-gray-900 max-w-3xl leading-snug text-3xl font-bold mx-auto">
          Create a new Quiz
        </h2>

        <div className="my-4 p-4 max-w-7xl mx-auto flex">
          <div className="w-2/3 mr-4">
            <h2 className="text-2xl my-4">Questions</h2>
            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="bg-white rounded-lg shadow-md my-4">
                <div className="p-4">
                  <div className="flex flex-col">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-gray-900 text-lg font-bold">Question</h3>
                        <button
                          onClick={() => {
                            const newQuestions = [...questions];
                            newQuestions.splice(questionIndex, 1);
                            setQuestions(newQuestions);
                          }}
                          className="text-red-700 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        value={question.question}
                        onInput={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[questionIndex].question = e.target.value;
                          setQuestions(newQuestions);
                        }}
                        className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div className="flex-1 mt-4">
                      <h3 className="text-gray-900 text-lg font-bold">Options (First option is the answer)</h3>
                      <div className="flex flex-col gap-2">
                        {question.options.map((option, answerIndex) => (
                          <input
                            key={answerIndex}
                            value={option}
                            onInput={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[questionIndex].options[answerIndex] = e.target.value;
                              setQuestions(newQuestions);
                            }}
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center my-8">
              <button
                onClick={() => {
                  const newQuestions = [...questions];
                  newQuestions.push({
                    question: "",
                    options: ["", "", "", ""],
                    answer: 0,
                  });
                  setQuestions(newQuestions);
                }}
                className="bg-gray-200 hover:bg-gray-300 rounded-full inline-block py-2 px-6 text-md"
              >
                Add Question
              </button>
            </div>
          </div>
          <div className="w-1/3">
            <h2 className="text-2xl my-4">Settings</h2>
            <div className="bg-white rounded-lg shadow-md my-4">
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Name</h3>
                    <input
                      value={quizName}
                      onInput={(e) => setQuizName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Description</h3>
                    <input
                      value={quizDescription}
                      onInput={(e) => setQuizDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Duration (minutes)</h3>
                    <input
                      value={quizDuration}
                      onInput={(e) => setQuizDuration(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Passing Score</h3>
                    <input
                      value={quizPassingScore}
                      onInput={(e) => setQuizPassingScore(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">NFT Image (PoK)</h3>
                    <button className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500">
                      Upload Image
                    </button>
                  </div>
                </div>
              </div> */}
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz Start Time (YYYY-mm-dd HH:ii:ss)</h3>
                    <input
                      value={quizStartTime}
                      onInput={(e) => setQuizStartTime(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg font-bold">Quiz End Time (YYYY-mm-dd HH:ii:ss)</h3>
                    <input
                      value={quizEndTime}
                      onInput={(e) => setQuizEndTime(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={createQuiz}
              disabled={loading}
              className="w-full disabled:bg-yellow-300 disabled:text-yellow-700 flex justify-center items-center bg-yellow-400 text-gray-900 rounded-lg p-4 text-xl hover:bg-yellow-500 font-bold"
            >
              {loading && loadingIcon()}
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
