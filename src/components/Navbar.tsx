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
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-700 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M7 2 Q12 7 17 2 L22 7 L19 10 L19 20 L5 20 L5 10 L2 7 Z"/>
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">sragam</span>
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
