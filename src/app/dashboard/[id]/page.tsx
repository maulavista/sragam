import type { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase-server'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

export const metadata: Metadata = {
  title: 'Detail Pesanan',
  robots: { index: false, follow: false },
}

const STEPS = ['baru', 'diproses', 'penawaran_dikirim', 'selesai'] as const
const STEP_LABELS = ['Diterima', 'Diproses', 'Penawaran Dikirim', 'Selesai']

const STATUS_LABEL: Record<string, string> = {
  baru: 'Baru',
  diproses: 'Diproses',
  penawaran_dikirim: 'Penawaran Dikirim',
  selesai: 'Selesai',
}

function formatRupiah(value: string | null | undefined): string | null {
  if (!value) return null
  const num = parseInt(value.replace(/\D/g, ''), 10)
  if (isNaN(num)) return value
  return 'Rp ' + num.toLocaleString('id-ID')
}

type NextStepConfig = {
  message: string
  cta?: { label: string; href: string }
}

function getNextStep(status: string, userWhatsapp: string): NextStepConfig {
  switch (status) {
    case 'baru':
      return { message: 'Pesanan kamu sudah kami terima. Kami biasanya merespons dalam 1×24 jam kerja.' }
    case 'diproses':
      return { message: 'Tim kami sedang menyiapkan penawaran harga terbaik untukmu.' }
    case 'penawaran_dikirim':
      return {
        message: 'Penawaran sudah dikirim ke WhatsApp kamu. Cek sekarang dan balas untuk lanjutkan.',
        cta: {
          label: 'Buka WhatsApp',
          href: `https://wa.me/${userWhatsapp}`,
        },
      }
    case 'selesai':
      return { message: 'Pesanan ini telah selesai. Terima kasih sudah memesan!' }
    default:
      return { message: '' }
  }
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/?auth=login')

  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!order) notFound()

  const items = (order.order_items ?? []) as {
    id: string
    jenis_seragam: string
    jumlah: number
    bahan: string | null
    metode_logo: string | null
    ukuran: Record<string, number> | null
  }[]

  const statusKey = order.status ?? 'baru'
  const stepIndex = STEPS.indexOf(statusKey as typeof STEPS[number])
  const nextStep = getNextStep(statusKey, order.whatsapp)
  const teamWa = process.env.NEXT_PUBLIC_WHATSAPP_TEAM

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/"><img src="/logo.svg" alt="Sragam" width={120} height={32} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Semua Pesanan
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">
                {new Date(order.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                })}
              </p>
              <h1 className="text-xl font-bold text-gray-900">
                {order.nama_organisasi || order.jenis_organisasi || order.nama}
              </h1>
              {order.jenis_organisasi && order.nama_organisasi && (
                <p className="text-sm text-gray-500 mt-0.5">{order.jenis_organisasi}</p>
              )}
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${
              statusKey === 'baru' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              statusKey === 'diproses' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
              statusKey === 'penawaran_dikirim' ? 'bg-green-50 text-green-700 border-green-200' :
              'bg-gray-50 text-gray-500 border-gray-200'
            }`}>
              {STATUS_LABEL[statusKey] ?? statusKey}
            </span>
          </div>

          {/* Progress stepper */}
          <div className="flex items-center gap-0 mt-2 mb-5">
            {STEPS.map((step, i) => {
              const done = i <= stepIndex
              const active = i === stepIndex
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                      done
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-200 text-gray-300'
                    }`}>
                      {i < stepIndex ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                    <span className={`text-xs mt-1 whitespace-nowrap ${active ? 'text-blue-600 font-semibold' : done ? 'text-gray-600' : 'text-gray-300'}`}>
                      {STEP_LABELS[i]}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-1 mb-4 ${i < stepIndex ? 'bg-blue-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Next step callout */}
          {nextStep.message && (
            <div className={`rounded-lg px-4 py-3 text-sm ${
              statusKey === 'penawaran_dikirim'
                ? 'bg-green-50 border border-green-200'
                : 'bg-blue-50 border border-blue-100'
            }`}>
              <p className={statusKey === 'penawaran_dikirim' ? 'text-green-800' : 'text-blue-800'}>
                {nextStep.message}
              </p>
              {nextStep.cta && (
                <a
                  href={nextStep.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors px-4 py-1.5 rounded-lg"
                >
                  {nextStep.cta.label} →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Produk</h2>
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={item.id ?? i} className={i > 0 ? 'pt-4 border-t border-gray-100' : ''}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-semibold text-gray-900">{item.jenis_seragam}</p>
                  <p className="text-sm text-gray-600 font-medium">{item.jumlah} pcs</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
                  {item.bahan && <span>Bahan: {item.bahan}</span>}
                  {item.metode_logo && <span>Logo: {item.metode_logo}</span>}
                </div>
                {item.ukuran && Object.keys(item.ukuran).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(item.ukuran).map(([size, qty]) => (
                      <span key={size} className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1 text-xs text-gray-700">
                        {size}: {qty}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        {(order.kota || order.anggaran || order.deadline || order.catatan) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Detail</h2>
            <dl className="space-y-3 text-sm">
              {order.kota && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Kota</dt>
                  <dd className="text-gray-900 font-medium">{order.kota}</dd>
                </div>
              )}
              {order.anggaran && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Anggaran</dt>
                  <dd className="text-gray-900 font-medium">{formatRupiah(order.anggaran)}</dd>
                </div>
              )}
              {order.deadline && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Deadline</dt>
                  <dd className="text-gray-900 font-medium">
                    {new Date(order.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </dd>
                </div>
              )}
              {order.catatan && (
                <div className="flex flex-col gap-1">
                  <dt className="text-gray-500">Catatan</dt>
                  <dd className="text-gray-900">{order.catatan}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {/* User contact info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Data Kamu</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Nama</dt>
              <dd className="text-gray-900 font-medium">{order.nama}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">WhatsApp</dt>
              <dd className="text-gray-900 font-medium">{order.whatsapp}</dd>
            </div>
          </dl>
        </div>

        {/* Help */}
        {teamWa && (
          <div className="text-center py-2">
            <p className="text-sm text-gray-400">
              Ada pertanyaan?{' '}
              <a
                href={`https://wa.me/${teamWa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Hubungi tim sragam →
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
