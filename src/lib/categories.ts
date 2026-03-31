export type Category = {
  slug: string
  name: string
  description: string
  keywords: string[]
}

export const CATEGORIES: Category[] = [
  {
    slug: 'kaos-t-shirt',
    name: 'Kaos / T-Shirt',
    description: 'Pesan kaos polos, raglan, atau berkerah untuk tim dan event Anda. Kami hubungkan ke supplier terpercaya dengan penawaran siap dibandingkan.',
    keywords: ['kaos custom', 'kaos seragam', 'kaos tim', 'kaos event', 'vendor kaos'],
  },
  {
    slug: 'polo-shirt',
    name: 'Polo Shirt',
    description: 'Vendor polo shirt custom lacoste, pique, dan waffle untuk seragam kantor dan komunitas. Dapatkan beberapa penawaran sekaligus.',
    keywords: ['polo shirt custom', 'polo shirt seragam kantor', 'vendor polo shirt'],
  },
  {
    slug: 'kemeja-kantor',
    name: 'Kemeja Kantor',
    description: 'Pesan kemeja seragam kantor drill, twill, dan oxford. Satu form, beberapa penawaran dari supplier berpengalaman.',
    keywords: ['kemeja seragam kantor', 'kemeja custom', 'vendor kemeja', 'kemeja drill'],
  },
  {
    slug: 'jaket-hoodie',
    name: 'Jaket & Hoodie',
    description: 'Vendor jaket bomber, parasut, dan hoodie fleece untuk komunitas dan perusahaan. Bandingkan penawaran tanpa bolak-balik chat.',
    keywords: ['jaket custom', 'hoodie custom', 'jaket seragam', 'vendor jaket'],
  },
  {
    slug: 'rompi',
    name: 'Rompi',
    description: 'Seragam rompi karyawan, lapangan, dan banyak saku. Hubungkan ke supplier rompi terpercaya dengan cepat.',
    keywords: ['rompi seragam', 'rompi karyawan', 'vendor rompi', 'rompi custom'],
  },
  {
    slug: 'jersey-kaos-tim',
    name: 'Jersey & Kaos Tim',
    description: 'Pesan jersey futsal, kaos tim olahraga, dan training. Supplier jersey custom dengan harga kompetitif.',
    keywords: ['jersey futsal custom', 'kaos tim olahraga', 'vendor jersey', 'jersey custom'],
  },
  {
    slug: 'blazer-jas',
    name: 'Blazer & Jas',
    description: 'Vendor blazer kantor dan jas formal untuk seragam resepsionis dan staf profesional. Penawaran lengkap dan siap dibandingkan.',
    keywords: ['blazer seragam kantor', 'jas custom', 'vendor blazer', 'seragam resepsionis'],
  },
  {
    slug: 'wearpack',
    name: 'Wearpack / Coverall',
    description: 'Seragam wearpack proyek, lapangan, dan industri. Dapatkan penawaran dari supplier wearpack berpengalaman.',
    keywords: ['wearpack custom', 'seragam proyek', 'coverall industri', 'vendor wearpack'],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug)
}
