import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <div>
          <Link href="/sales">
            <a>Ir a Ventas</a>
          </Link>
        </div>
        <div>
          <Link href="/payments">
            <a>Ir a Pagos</a>
          </Link>
        </div>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
