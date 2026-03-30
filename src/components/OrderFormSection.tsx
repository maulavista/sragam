import OrderForm from './OrderForm'

export default function OrderFormSection() {
  return (
    <section id="form-section" className="py-16 lg:py-20 bg-sky-50">
      <div className="section-container">
        <div className="max-w-lg mx-auto">

          <div className="text-center mb-8">
            <p className="text-brand-700 font-semibold text-sm uppercase tracking-wide mb-3">
              Mulai Sekarang
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Ceritakan Kebutuhan Anda
            </h2>
            <p className="text-gray-500">
              Isi seadanya yang sudah Anda tahu. Tidak perlu lengkap.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <OrderForm />
          </div>

        </div>
      </div>
    </section>
  )
}
