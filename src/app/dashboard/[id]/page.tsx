import { redirect, notFound } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase-server'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

const STATUS_LABEL: Record<string, string> = {
  baru: 'Baru',
  diproses: 'Diproses',
  penawaran_dikirim: 'Penawaran Dikirim',
  selesai: 'Selesai',
}

const STATUS_COLOR: Record<string, string> = {
  baru: 'bg-blue-50 text-blue-700 border-blue-200',
  diproses: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  penawaran_dikirim: 'bg-green-50 text-green-700 border-green-200',
  selesai: 'bg-gray-50 text-gray-500 border-gray-200',
}

const STATUS_DESCRIPTION: Record<string, string> = {
  baru: 'Pesanan Anda telah diterima. Tim kami sedang meninjau permintaan Anda.',
  diproses: 'Pesanan Anda sedang diproses. Kami akan segera menghubungi Anda.',
  penawaran_dikirim: 'Penawaran harga telah dikirimkan. Silakan cek WhatsApp Anda.',
  selesai: 'Pesanan selesai.',
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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900 text-lg tracking-tight">sragam</Link>
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
          <div className="flex items-start justify-between gap-4 mb-2">
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
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${STATUS_COLOR[statusKey] ?? STATUS_COLOR.baru}`}>
              {STATUS_LABEL[statusKey] ?? statusKey}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100">
            {STATUS_DESCRIPTION[statusKey] ?? ''}
          </p>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Produk</h2>
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={item.id ?? i} className={i > 0 ? 'pt-4 border-t border-gray-100' : ''}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{item.jenis_seragam}</p>
                  <p className="text-sm text-gray-600 font-medium">{item.jumlah} pcs</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                  {item.bahan && <span>Bahan: {item.bahan}</span>}
                  {item.metode_logo && <span>Logo: {item.metode_logo}</span>}
                </div>
                {item.ukuran && Object.keys(item.ukuran).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
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
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Detail</h2>
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
                <dd className="text-gray-900 font-medium">{order.anggaran}</dd>
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

        {/* Contact */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Kontak</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Nama</dt>
              <dd className="text-gray-900 font-medium">{order.nama}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">WhatsApp</dt>
              <dd>
                <a
                  href={`https://wa.me/${order.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium hover:underline"
                >
                  {order.whatsapp}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
