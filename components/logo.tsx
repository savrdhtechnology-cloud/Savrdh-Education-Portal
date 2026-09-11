import Link from 'next/link'

export function Logo(){
  return (
    <Link href="/" className="logo" aria-label="Savrdh Education home">
      <span className="logoMark" aria-hidden="true">
        <svg viewBox="0 0 64 58" focusable="false">
          <path d="M6 24.5c8.8 0 16.5 2.5 23 7.6v18.4c-6.8-4.8-14.5-7.2-23-7.2V24.5Z" fill="#fff"/>
          <path d="M58 24.5c-8.8 0-16.5 2.5-23 7.6v18.4c6.8-4.8 14.5-7.2 23-7.2V24.5Z" fill="#f8c61f"/>
          <path d="M6 24.5c8.8 0 16.5 2.5 23 7.6M58 24.5c-8.8 0-16.5 2.5-23 7.6M32 31.7v18.8" stroke="#f8c61f" strokeWidth="2.3" strokeLinecap="round"/>
          <path d="M15 14 32 6l17 8-17 8-17-8Z" fill="#fff" stroke="#f8c61f" strokeWidth="1.7" strokeLinejoin="round"/>
          <path d="M23 18.2v7.4c0 3.2 4.1 5.9 9 5.9s9-2.7 9-5.9v-7.4" fill="#fff" stroke="#f8c61f" strokeWidth="1.7" strokeLinejoin="round"/>
          <path d="M49 14v10" stroke="#f8c61f" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="49" cy="27" r="2" fill="#f8c61f"/>
        </svg>
      </span>
      <span className="logoType">
        <b>SAVRDH</b>
        <strong>EDUCATION</strong>
        <small>Learn Smart. Learn Better. Grow Faster.</small>
      </span>
    </Link>
  )
}
