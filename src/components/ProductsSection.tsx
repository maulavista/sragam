import Image from 'next/image'

const products = [
  {
    name: 'Kaos / T-Shirt',
    desc: 'Kaos polos, raglan, berkerah',
    photo: '/products/t-shirt.png',
  },
  {
    name: 'Polo Shirt',
    desc: 'Polo pique, lacoste, lengan pendek',
    photo: '/products/polo.png',
  },
  {
    name: 'Kemeja',
    desc: 'Kemeja lengan panjang dan pendek',
    photo: '/products/oxford.png',
  },
  {
    name: 'Jaket & Hoodie',
    desc: 'Jaket bomber, parasut, hoodie',
    photo: '/products/jacket.png',
  },
  {
    name: 'Rompi',
    desc: 'Rompi karyawan, lapangan, banyak saku',
    photo: '/products/vest.png',
  },
  {
    name: 'Celana & Rok',
    desc: 'Celana panjang, pendek, rok seragam',
    photo: '/products/celana.png',
  },
  {
    name: 'Topi',
    desc: 'Topi bordir, snapback, promosi',
    photo: '/products/hat.png',
  },
  {
    name: 'Jersey & Kaos Tim',
    desc: 'Jersey futsal, kaos tim, training',
    photo: '/products/jersey.png',
  },
  {
    name: 'Blazer & Jas',
    desc: 'Blazer kantor, jas formal, seragam resepsionis',
    photo: '/products/blazer.png',
  },
  {
    name: 'Wearpack',
    desc: 'Seragam proyek, lapangan, industri',
    photo: '/products/wearpack.png',
  },
]

export default function ProductsSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-10">
          <p className="text-brand-700 font-semibold text-sm uppercase tracking-wide mb-3">
            Produk
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Apa Saja yang Bisa Kami Bantu?
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Dari kaos sederhana hingga seragam industri. Satu permintaan, beberapa penawaran yang siap dibandingkan.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((p) => (
            <div
              key={p.name}
              className="group rounded-xl overflow-hidden border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Tidak ada di daftar? Pilih &ldquo;Lainnya&rdquo; di form dan jelaskan di catatan.
        </p>
      </div>
    </section>
  )
}
