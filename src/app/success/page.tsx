import Link from 'next/link'
import { createSessionClient } from '@/lib/supabase-server'

export default async function SuccessPage() {
  const supabase = createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">Terima kasih!</h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            Kami sudah menerima kebutuhan Anda. Tim kami akan review dan menghubungi Anda
            di WhatsApp untuk konfirmasi sebelum diteruskan ke supplier.
          </p>

          <div className="bg-blue-50 rounded-xl p-4 mb-8 text-sm text-blue-800 text-left space-y-2">
            <p className="font-semibold text-blue-900">Yang terjadi selanjutnya:</p>
            <div className="flex gap-2.5">
              <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0 mt-0.5">1</span>
              <p>Kami review dan rapikan kebutuhan Anda</p>
            </div>
            <div className="flex gap-2.5">
              <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0 mt-0.5">2</span>
              <p>Kami hubungi Anda di WhatsApp untuk konfirmasi</p>
            </div>
            <div className="flex gap-2.5">
              <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0 mt-0.5">3</span>
              <p>Setelah konfirmasi, kami kirim ke beberapa supplier dan sampaikan penawaran kepada Anda</p>
            </div>
          </div>

          {!user && (
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-5 mb-6 text-left">
              <p className="font-semibold text-brand-900 mb-1">Lacak pesanan Anda</p>
              <p className="text-sm text-brand-700 mb-4">
                Buat akun untuk melihat status pesanan dan penawaran yang masuk.
              </p>
              <Link
                href="/?auth=signup"
                className="btn-primary text-sm py-2 px-4 inline-block"
              >
                Buat Akun Gratis
              </Link>
            </div>
          )}

          {user ? (
            <Link href="/dashboard" className="text-brand-700 font-medium hover:underline text-sm">
              Lihat pesanan saya
            </Link>
          ) : (
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
              Kembali ke halaman utama
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
