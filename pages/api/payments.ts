import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { saleId, amount, paymentType, grapeType, returnQuantity, reason, notes } = req.body
      const payment = await prisma.payment.create({
        data: {
          saleId: parseInt(saleId),
          amount: parseFloat(amount),
          paymentType,
          grapeType,
          returnQuantity: returnQuantity ? parseFloat(returnQuantity) : null,
          reason,
          notes,
        },
      })
      res.status(201).json(payment)
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el pago' })
    }
  } else if (req.method === 'GET') {
    try {
      const { saleId } = req.query
      if (saleId) {
        const sale = await prisma.sale.findUnique({
          where: { id: parseInt(saleId as string) },
          include: { products: true,
            payments: true,
          },
        })
        if (sale) {
          res.status(200).json(sale)
        } else {
          res.status(404).json({ error: 'Venta no encontrada' })
        }
      } else {
        const payments = await prisma.payment.findMany()
        res.status(200).json(payments)
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pagos' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

