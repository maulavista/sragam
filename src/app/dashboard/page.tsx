import { redirect } from 'next/navigation'
import { createSessionClient } from '@/lib/supabase-server'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

function formatRupiah(value: string | null | undefined): string | null {
  if (!value) return null
  const num = parseInt(value.replace(/\D/g, ''), 10)
  if (isNaN(num)) return value
  return 'Rp ' + num.toLocaleString('id-ID')
}

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
    .select('id, created_at, status, nama, nama_organisasi, jenis_organisasi, kota, anggaran, order_items(jenis_seragam, jumlah)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const activeCount = orders?.filter(o => o.status !== 'selesai').length ?? 0

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
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pesanan Saya</h1>
            {activeCount > 0 && (
              <p className="text-sm text-gray-400 mt-0.5">{activeCount} pesanan aktif</p>
            )}
          </div>
          <Link href="/" className="btn-primary text-sm py-2 px-4 flex-shrink-0">
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
          <div className="space-y-3">
            {orders.map((order) => {
              const items = (order.order_items ?? []) as { jenis_seragam: string; jumlah: number }[]
              const statusKey = order.status ?? 'baru'
              const title = order.nama_organisasi || order.jenis_organisasi || order.nama
              const totalPcs = items.reduce((sum, i) => sum + i.jumlah, 0)
              return (
                <Link
                  key={order.id}
                  href={`/dashboard/${order.id}`}
                  className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">
                        {new Date(order.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </p>
                      <p className="font-semibold text-gray-900">{title}</p>
                      {(order.kota || order.anggaran) && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {[order.kota, formatRupiah(order.anggaran)].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${STATUS_COLOR[statusKey] ?? STATUS_COLOR.baru}`}>
                      {STATUS_LABEL[statusKey] ?? statusKey}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {items.map((item, i) => (
                      <span
                        key={i}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-xs text-gray-700"
                      >
                        {item.jenis_seragam} · {item.jumlah} pcs
                      </span>
                    ))}
                    {items.length > 1 && (
                      <span className="text-xs text-gray-400">{totalPcs} pcs total</span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
