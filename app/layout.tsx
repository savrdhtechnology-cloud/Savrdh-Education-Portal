import type { Metadata } from 'next'
import './globals.css'
import { BRAND } from '@/lib/brand'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://savrdheducation.com'),
  title: { default:`${BRAND.name} | ${BRAND.tagline}`, template:`%s | ${BRAND.name}` },
  description: BRAND.description,
  keywords:['Online English Course','English Grammar Course','Competitive English','Maths Tricks','Maths Shortcuts','Competitive Maths','Online Courses India','Savrdh Education','Amol Sir English','Amol Sir Maths'],
  openGraph:{title:BRAND.name,description:BRAND.description,type:'website'}
}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
