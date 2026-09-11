'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

declare global { interface Window { Razorpay?: new (opts:Record<string,unknown>) => { open:()=>void } } }

export function BuyButton({courseId,label='BUY NOW'}:{courseId:string;label?:string}){
 const [loading,setLoading]=useState(false); const router=useRouter()
 async function buy(){setLoading(true);try{const res=await fetch('/api/payments/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({courseId})});if(res.status===401){router.push(`/login?next=${encodeURIComponent(location.pathname)}`);return}const order=await res.json();if(!res.ok)throw new Error(order.error||'Unable to create order');await new Promise<void>((resolve,reject)=>{if(window.Razorpay)return resolve();const s=document.createElement('script');s.src='https://checkout.razorpay.com/v1/checkout.js';s.onload=()=>resolve();s.onerror=()=>reject(new Error('Payment checkout failed to load'));document.body.appendChild(s)});const RazorpayCtor=window.Razorpay;if(!RazorpayCtor)throw new Error('Payment checkout unavailable');const rz=new RazorpayCtor({key:order.keyId,amount:order.amount,currency:'INR',name:'Savrdh Education',description:order.courseTitle,order_id:order.gatewayOrderId,handler:async(resp:any)=>{const verify=await fetch('/api/payments/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({razorpay_order_id:resp.razorpay_order_id,razorpay_payment_id:resp.razorpay_payment_id,razorpay_signature:resp.razorpay_signature})});if(verify.ok){router.push('/student/courses?payment=success');router.refresh()}else alert('Payment received but verification is pending. Please contact support if access is not added shortly.')},theme:{color:'#F7C51E'}});rz.open()}catch(e){alert(e instanceof Error?e.message:'Unable to start payment')}finally{setLoading(false)}}
 return <button className="btn btnGold full" onClick={buy} disabled={loading}>{loading?'Preparing secure checkout…':label}</button>
}
