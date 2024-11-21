import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Sales() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [sale, setSale] = useState({
    client: '',
    products: [{ productType: '', deposit: '', quantity: 0, unitPrice: 0 }]
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
    const response = await fetch('/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sale),
    })
    if (response.ok) {
      alert('Venta registrada con éxito')
      setSale({ client: '', products: [{ productType: '', deposit: '', quantity: 0, unitPrice: 0 }] })
    } else {
      alert('Error al registrar la venta')
    }
  }

  return (
    <div>
      <h1>Registrar Venta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={sale.client}
          onChange={(e) => setSale({ ...sale, client: e.target.value })}
          placeholder="Cliente"
          required
        />
        {sale.products.map((product, index) => (
          <div key={index}>
            <input
              type="text"
              value={product.productType}
              onChange={(e) => {
                const newProducts = [...sale.products]
                newProducts[index].productType = e.target.value
                setSale({ ...sale, products: newProducts })
              }}
              placeholder="Tipo de Producto"
              required
            />
            <input
              type="text"
              value={product.deposit}
              onChange={(e) => {
                const newProducts = [...sale.products]
                newProducts[index].deposit = e.target.value
                setSale({ ...sale, products: newProducts })
              }}
              placeholder="Depósito"
              required
            />
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => {
                const newProducts = [...sale.products]
                newProducts[index].quantity = Number(e.target.value)
                setSale({ ...sale, products: newProducts })
              }}
              placeholder="Cantidad"
              required
            />
            <input
              type="number"
              value={product.unitPrice}
              onChange={(e) => {
                const newProducts = [...sale.products]
                newProducts[index].unitPrice = Number(e.target.value)
                setSale({ ...sale, products: newProducts })
              }}
              placeholder="Precio Unitario"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => setSale({ ...sale, products: [...sale.products, { productType: '', deposit: '', quantity: 0, unitPrice: 0 }] })}>
          Agregar Producto
        </button>
        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  )
}

