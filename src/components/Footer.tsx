const WA_TEAM = process.env.NEXT_PUBLIC_WHATSAPP_TEAM

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5L21.96 12H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zm9.78 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
              </svg>
            </div>
            <span className="text-white font-bold">sragam</span>
          </div>

          <a
            href={`https://wa.me/${WA_TEAM}?text=Halo%2C+saya+tertarik+bergabung+sebagai+supplier+di+Sragam.`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Mau bergabung sebagai supplier? <span className="underline underline-offset-2">Hubungi kami</span>
          </a>

          <p className="text-xs">&copy; {new Date().getFullYear()} Sragam</p>
        </div>
      </div>
    </footer>
  )
}
