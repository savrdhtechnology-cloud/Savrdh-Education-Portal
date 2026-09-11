import crypto from 'node:crypto'

export function verifyRazorpayPayment(orderId:string, paymentId:string, signature:string) {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) return false
  const expected = crypto.createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

export function verifyRazorpayWebhook(rawBody:string, signature:string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) return false
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  if (expected.length !== signature.length) return false
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

export async function createRazorpayOrder(amount:number, receipt:string, notes:Record<string,string>) {
  const key = process.env.RAZORPAY_KEY_ID
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!key || !secret) throw new Error('Razorpay is not configured')
  const auth = Buffer.from(`${key}:${secret}`).toString('base64')
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', Authorization:`Basic ${auth}` },
    body: JSON.stringify({ amount, currency:'INR', receipt, notes })
  })
  if (!res.ok) throw new Error(`Razorpay order creation failed: ${res.status}`)
  return res.json()
}
