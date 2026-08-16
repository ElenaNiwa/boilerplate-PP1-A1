import type { Metadata } from 'next'
import Image from 'next/image'
import { getServerSession } from '@/actions/auth.actions'
import { adminDb } from '@/lib/firebase/admin'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const session = await getServerSession()
  const profileSnap = session ? await adminDb.collection('users').doc(session.uid).get() : null

  const displayName = profileSnap?.exists
    ? (profileSnap.data()?.displayName as string | null)
    : null
  const greetingName = displayName ?? session?.email ?? null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Welcome back{greetingName ? `, ${greetingName}` : ''}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mt-4 text-sm font-medium text-zinc-500">
            Name
          </p>

          <p className="mt-1 text-3xl font-bold">
            Elena Niwa
          </p>
          <Image
            src="/profile.jpg"
            alt="Elena Niwa"
            width={120}
            height={120}
            unoptimized
            className="h-28 w-28 rounded-full object-cover"
          />
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-500">Role</p>
          <p className="mt-2 text-3xl font-bold">Business Analyst</p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-500">About</p>
          <p className="mt-2 text-base font-medium">
            I am 3rd year Computer Science student, majoring in cyber security. My role for this
            project is to define the requirements and make sure our deliverables meet them. I
            love playing sports and games.
          </p>
        </div>
      </div>
    </div>
  )
}