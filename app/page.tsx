//Splash page will remove in the future, just here for testing puproses

import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={"text-blue-50"}>
      <h1> This is a Programming Tool </h1>
      <a href="/problems">Problem Page</a><br></br>
      <a href="app\index.js">demo</a>
    </main>
  )
}
