import Link from 'next/link'
import { Search } from 'lucide-react'
import { Logo } from './logo'

export function SiteHeader(){
  return (
    <header className="siteHeader">
      <div className="container navWrap">
        <Logo/>
        <nav className="desktopNav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/live-classes">Live Classes</Link>
          <Link href="/about">About</Link>
          <Link href="/certificates">Certificates</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="navTools">
          <Link className="navSearch" href="/courses" aria-label="Search courses"><span>Search courses...</span><Search size={17}/></Link>
          <div className="navActions"><Link className="btn btnGhost" href="/login">Login</Link><Link className="btn btnGold" href="/register">Sign Up</Link></div>
        </div>
      </div>
    </header>
  )
}
