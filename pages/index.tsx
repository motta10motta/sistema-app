import React from 'react'
import Header from '@/components/Header'
import SalesForm from '@/components/SalesForm'
import PaymentForm from '@/components/PaymentForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SalesForm />
          <PaymentForm />
        </div>
      </main>
    </div>
  )
}

