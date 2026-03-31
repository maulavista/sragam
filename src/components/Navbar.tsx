'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const signOut = async () => {
    await createClient().auth.signOut()
    router.push('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="section-container">
        <div className="flex items-center justify-between h-14">
          <Link href="/">
            <img src="/logo.svg" alt="Sragam" width={120} height={32} className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-600 hover:text-brand-700 font-medium"
                >
                  Pesanan Saya
                </Link>
                <button
                  onClick={signOut}
                  className="text-sm text-gray-400 hover:text-gray-600 py-2 px-2"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push('?auth=login')}
                  className="text-sm text-gray-600 hover:text-brand-700 font-medium py-2 px-2"
                >
                  Masuk
                </button>
                <button onClick={scrollToForm} className="btn-primary text-sm py-2 px-4">
                  Pesan Seragam
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
