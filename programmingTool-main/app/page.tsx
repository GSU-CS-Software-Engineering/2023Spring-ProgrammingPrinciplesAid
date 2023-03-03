//Splash page

import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={"text-blue-50"}>
      <h1> This is a Programming Tool </h1>
      <a href="/problems">Problem Page</a>
    </main>
  )
}
