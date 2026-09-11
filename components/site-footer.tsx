import Link from 'next/link'
import { Instagram, MapPin, Phone, Send, Youtube } from 'lucide-react'
import { BRAND, callUrl, whatsappUrl } from '@/lib/brand'
import { Logo } from './logo'

export function SiteFooter(){
  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div><Logo/><p className="mutedLight">Smart online learning for English, Mathematics and competitive exam preparation.</p></div>
        <div><h4>Quick Links</h4><Link href="/">Home</Link><Link href="/courses">Courses</Link><Link href="/live-classes">Live Classes</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
        <div><h4>Popular Courses</h4><Link href="/courses/english">English Courses</Link><Link href="/courses/maths">Maths Courses</Link><Link href="/courses">Combo Courses</Link><Link href="/courses">Competitive Exams</Link></div>
        <div><h4>Support</h4><Link href="/terms">Terms & Conditions</Link><Link href="/privacy">Privacy Policy</Link><Link href="/refund-policy">Refund Policy</Link><Link href="/certificates">Certificate Verification</Link></div>
        <div><h4>Connect With Us</h4><a href={callUrl}><Phone size={14}/> +91 {BRAND.phone}</a><a href={whatsappUrl} target="_blank" rel="noreferrer"><Send size={14}/> Chat on WhatsApp</a><span><MapPin size={14}/>{BRAND.location}</span><div className="socialDots" aria-label="Social links"><span><Youtube size={15}/></span><span><Instagram size={15}/></span></div></div>
      </div>
      <div className="container copyright"><span>© {new Date().getFullYear()} Savrdh Education. All rights reserved.</span><span>Built for better learning.</span></div>
    </footer>
  )
}
