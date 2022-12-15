import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Quizard</title>
        <meta name="description" content="Quiz Platform in the Web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto">
        <h1 className="text-center text-2xl font-bold">Next.js + Tailwind</h1>
      </main>
    </div>
  )
}
