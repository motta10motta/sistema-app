import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function PaymentForm() {
  const [saleId, setSaleId] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos al servidor
    console.log({ saleId, amount, paymentMethod })
    alert('Pago registrado')
    setSaleId('')
    setAmount('')
    setPaymentMethod('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Pago</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="saleId">ID de Venta</Label>
            <Input
              id="saleId"
              value={saleId}
              onChange={(e) => setSaleId(e.target.value)}
              placeholder="ID de la venta"
            />
          </div>
          <div>
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Monto del pago"
            />
          </div>
          <div>
            <Label htmlFor="paymentMethod">Método de Pago</Label>
            <Select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Seleccione un método</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </Select>
          </div>
          <Button type="submit">Registrar Pago</Button>
        </form>
      </CardContent>
    </Card>
  )
}

