import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type Product = {
  productType: string
  quantity: number
  unitPrice: number
}

export default function SalesForm() {
  const [client, setClient] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [currentProduct, setCurrentProduct] = useState<Product>({
    productType: '',
    quantity: 0,
    unitPrice: 0
  })

  const handleAddProduct = () => {
    if (currentProduct.productType && currentProduct.quantity > 0 && currentProduct.unitPrice > 0) {
      setProducts([...products, currentProduct])
      setCurrentProduct({ productType: '', quantity: 0, unitPrice: 0 })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos al servidor
    console.log({ client, products })
    alert('Venta registrada')
    setClient('')
    setProducts([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Venta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="client">Cliente</Label>
            <Input
              id="client"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Nombre del cliente"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productType">Tipo de Producto</Label>
            <Select
              id="productType"
              value={currentProduct.productType}
              onChange={(e) => setCurrentProduct({ ...currentProduct, productType: e.target.value })}
            >
              <option value="">Seleccione un producto</option>
              <option value="Uva">Uva</option>
              <option value="Vino">Vino</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              id="quantity"
              type="number"
              value={currentProduct.quantity}
              onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="unitPrice">Precio Unitario</Label>
            <Input
              id="unitPrice"
              type="number"
              value={currentProduct.unitPrice}
              onChange={(e) => setCurrentProduct({ ...currentProduct, unitPrice: Number(e.target.value) })}
            />
          </div>
          <Button type="button" onClick={handleAddProduct}>Agregar Producto</Button>
          
          {products.length > 0 && (
            <div>
              <h3 className="font-bold mt-4 mb-2">Productos Agregados:</h3>
              <ul>
                {products.map((product, index) => (
                  <li key={index}>
                    {product.productType} - Cantidad: {product.quantity}, Precio: ${product.unitPrice}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <Button type="submit">Registrar Venta</Button>
        </form>
      </CardContent>
    </Card>
  )
}
