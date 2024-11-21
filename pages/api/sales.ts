import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { client, products } = req.body
      const sale = await prisma.sale.create({
        data: {
          client,
          products: {
            create: products.map((product: any) => ({
              productType: product.productType,
              deposit: product.deposit,
              quantity: product.quantity,
              unitPrice: product.unitPrice,
              total: product.quantity * product.unitPrice,
              invoicedAmount: 0,
              remainingAmount: product.quantity * product.unitPrice,
            })),
          },
        },
        include: {
          products: true,
        },
      })
      res.status(201).json(sale)
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la venta' })
    }
  } else if (req.method === 'GET') {
    try {
      const sales = await prisma.sale.findMany({
        include: {
          products: true,
        },
      })
      res.status(200).json(sales)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las ventas' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

