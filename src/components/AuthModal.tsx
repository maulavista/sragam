'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

type Mode = 'login' | 'signup'

export default function AuthModal() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const mode = searchParams.get('auth') as Mode | null
  const isOpen = mode === 'login' || mode === 'signup'

  const [tab, setTab] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (mode) setTab(mode)
  }, [mode])

  const close = () => router.replace(pathname)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const supabase = createClient()

    if (tab === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      })
      if (error) setError(error.message)
      else setSuccess('Cek email Anda untuk konfirmasi akun.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError('Email atau password salah.')
      else router.push('/dashboard')
    }
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex gap-6 mb-6 border-b border-gray-100">
          {(['login', 'signup'] as Mode[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(null); setSuccess(null) }}
              className={`pb-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                tab === t
                  ? 'border-brand-600 text-brand-700'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {t === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          ))}
        </div>

        {success ? (
          <div className="text-center py-4">
            <p className="text-green-700 font-medium mb-2">{success}</p>
            <p className="text-gray-500 text-sm">Setelah konfirmasi, masuk untuk melacak pesanan Anda.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@organisasi.com"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-2.5 text-sm disabled:opacity-50"
            >
              {loading ? 'Memproses...' : tab === 'login' ? 'Masuk' : 'Buat Akun'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
