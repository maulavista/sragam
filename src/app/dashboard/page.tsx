import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase-server'
import Link from 'next/link'

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

export default async function DashboardPage() {
  const supabase = createSessionClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/?auth=login')

  const { data: orders } = await supabase
    .from('orders')
    .select('id, created_at, status, nama, nama_organisasi, jenis_organisasi, order_items(jenis_seragam, jumlah)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900 text-lg tracking-tight">sragam</Link>
          <span className="text-sm text-gray-400">{user.email}</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Pesanan Saya</h1>
          <Link href="/" className="btn-primary text-sm py-2 px-4">
            + Pesanan Baru
          </Link>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 mb-4">Belum ada pesanan.</p>
            <Link href="/" className="btn-primary text-sm py-2 px-4 inline-block">
              Buat Pesanan Pertama
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const items = (order.order_items ?? []) as { jenis_seragam: string; jumlah: number }[]
              const statusKey = order.status ?? 'baru'
              const title = order.nama_organisasi || order.jenis_organisasi || order.nama
              return (
                <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">
                        {new Date(order.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </p>
                      <p className="font-semibold text-gray-900">{title}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${STATUS_COLOR[statusKey] ?? STATUS_COLOR.baru}`}>
                      {STATUS_LABEL[statusKey] ?? statusKey}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {items.map((item, i) => (
                      <span
                        key={i}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-700"
                      >
                        {item.jenis_seragam} · {item.jumlah} pcs
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
