import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Payments() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [payment, setPayment] = useState({
    saleId: '',
    amount: '',
    paymentType: '',
    grapeType: '',
    returnQuantity: '',
    reason: '',
    notes: ''
  })

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    router.push("/")
    return <p>Access Denied</p>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    })
    if (response.ok) {
      alert('Pago registrado con éxito')
      setPayment({
        saleId: '',
        amount: '',
        paymentType: '',
        grapeType: '',
        returnQuantity: '',
        reason: '',
        notes: ''
      })
    } else {
      alert('Error al registrar el pago')
    }
  }

  return (
    <div>
      <h1>Registrar Pago</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={payment.saleId}
          onChange={(e) => setPayment({ ...payment, saleId: e.target.value })}
          placeholder="ID de Venta"
          required
        />
        <input
          type="number"
          value={payment.amount}
          onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
          placeholder="Monto"
          required
        />
        <select
          value={payment.paymentType}
          onChange={(e) => setPayment({ ...payment, paymentType: e.target.value })}
          required
        >
          <option value="">Tipo de Pago</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Cheque">Cheque</option>
        </select>
        <input
          type="text"
          value={payment.grapeType}
          onChange={(e) => setPayment({ ...payment, grapeType: e.target.value })}
          placeholder="Tipo de Uva (opcional)"
        />
        <input
          type="number"
          value={payment.returnQuantity}
          onChange={(e) => setPayment({ ...payment, returnQuantity: e.target.value })}
          placeholder="Cantidad Devuelta (opcional)"
        />
        <input
          type="text"
          value={payment.reason}
          onChange={(e) => setPayment({ ...payment, reason: e.target.value })}
          placeholder="Motivo (opcional)"
        />
        <textarea
          value={payment.notes}
          onChange={(e) => setPayment({ ...payment, notes: e.target.value })}
          placeholder="Notas (opcional)"
        />
        <button type="submit">Registrar Pago</button>
      </form>
    </div>
  )
}
