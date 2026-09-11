import Image from 'next/image'
import Link from 'next/link'
import { Award, BookOpenCheck, CheckCircle2, GraduationCap, IndianRupee, Laptop, MessageCircle, PlayCircle, Radio, ShieldCheck, Star, Users, Video } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CourseCard } from '@/components/course-card'
import { getCourses } from '@/lib/data'
import { BRAND, callUrl, whatsappUrl } from '@/lib/brand'

const stats=[
  {icon:Users,value:'5,000+',label:'Happy Students'},
  {icon:PlayCircle,value:'50+',label:'Video Lessons'},
  {icon:GraduationCap,value:'20+',label:'Courses'},
  {icon:Star,value:'4.8/5',label:'Student Rating'}
]

const reasons=[
  {icon:GraduationCap,title:'Expert Guidance',text:'Learn with Amol Sir and a structured mentor-led approach.'},
  {icon:BookOpenCheck,title:'Structured Courses',text:'Basic to advanced learning paths with clear modules and lessons.'},
  {icon:Video,title:'Weekly Live Classes',text:'Interactive doubt sessions and guided practice with recordings.'},
  {icon:IndianRupee,title:'Affordable Fees',text:'Course-wise pricing designed to keep quality learning accessible.'},
  {icon:Award,title:'Certificates',text:'Completion certificates with verification support on eligible courses.'},
  {icon:Laptop,title:'Learn Anytime',text:'Study smoothly on mobile, tablet or laptop at your own pace.'}
]

const reviews=[
  {name:'Rohit Sharma',role:'SSC Aspirant',text:'Amol Sir ke tricks se meri Maths ki speed improve hui. Concepts clear aur practice useful hai.'},
  {name:'Priya Verma',role:'Banking Aspirant',text:'English course me grammar ka flow bahut clear hai. Live classes se revision easy ho jata hai.'},
  {name:'Aman Khan',role:'Railway Aspirant',text:'Maths aur English ek hi platform par structured milna useful hai. Learning experience simple hai.'}
]

export default async function Home(){
  const courses=(await getCourses()).slice(0,5)
  return <>
    <SiteHeader/>

    <section className="hero">
      <div className="heroGlow heroGlowOne"/><div className="heroGlow heroGlowTwo"/>
      <div className="container heroGrid">
        <div className="heroCopy">
          <div className="eyebrow">Learn English & Mathematics</div>
          <h1>Build Your Future<br/>With <span>Savrdh Education</span></h1>
          <p>Online Courses <b>•</b> Live Classes <b>•</b> Expert Guidance <b>•</b> Certification<br className="desktopOnly"/> for school, competitive exams and personal growth.</p>
          <div className="heroCtas"><Link className="btn btnGold btnLarge" href="/courses">Explore Courses →</Link><Link className="btn btnGhost btnLarge" href="/amol-sir"><PlayCircle size={18}/> Learn with Amol Sir</Link></div>
          <div className="featureInline heroFeatures"><span><ShieldCheck/>Quality Content</span><span><Radio/>Weekly Live Classes</span><span><IndianRupee/>Affordable Fees</span><span><Award/>Certificates</span></div>
          <div className="heroSignature">“Learn Today <b>Lead Tomorrow</b>”</div>
        </div>

        <div className="heroVisual" aria-label="Amol Sir, Head Educator">
          <div className="heroYellowShape" aria-hidden="true"/>
          <div className="heroPersonWrap"><Image src="/images/amol-sir.webp" alt="Amol Sir - Head Educator, Savrdh Education" fill priority sizes="(max-width: 720px) 92vw, 44vw" className="heroPerson"/></div>
          <div className="educatorBadge"><span className="badgeTop">AMOL SIR</span><b>Head Educator</b><small>7+ Years of Experience</small><hr/><ul><li><CheckCircle2/>2000+ Powerful Vocabulary</li><li><CheckCircle2/>120+ Grammar Rules</li><li><CheckCircle2/>Maths Shortcuts & Tricks</li><li><CheckCircle2/>Competitive Exam Focus</li><li><CheckCircle2/>Daily Practice & Tests</li></ul></div>
          <div className="heroTag">Master <span>•</span> Learn <span>•</span> Succeed</div>
        </div>
      </div>
    </section>

    <section className="statsBand"><div className="container statsGrid">{stats.map(({icon:Icon,value,label})=><div className="statCard" key={label}><Icon/><div><strong>{value}</strong><span>{label}</span></div></div>)}</div></section>

    <section className="section coursesSection"><div className="container">
      <div className="sectionHead"><div><h2>Popular Courses</h2><p>Choose from our most in-demand courses and start learning today.</p></div><Link className="sectionLink" href="/courses">View All Courses →</Link></div>
      <div className="courseGrid premiumCourseGrid">{courses.map(c=><CourseCard key={c.id} course={c}/>)}</div>
    </div></section>

    <section className="section whySection"><div className="container">
      <div className="sectionHead"><div><h2>Why Choose <span className="blueText">Savrdh Education?</span></h2><p>A focused learning system built around clarity, practice and consistent guidance.</p></div></div>
      <div className="reasonGrid">{reasons.map(({icon:Icon,title,text})=><article className="reasonCard" key={title}><span className="reasonIcon"><Icon/></span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section className="mentor section"><div className="container mentorGrid">
      <div className="mentorPhoto"><Image src="/images/amol-sir.webp" alt="Amol Sir - Savrdh Education mentor" fill sizes="(max-width:720px) 78vw, 300px"/></div>
      <div className="mentorCopy"><span className="eyebrow">MEET YOUR MENTOR</span><h2>AMOL SIR</h2><div className="mentorRole">Head Educator, Savrdh Education</div><p>With 7+ years of teaching experience, Amol Sir helps students build confidence in English and Mathematics through practical tricks, structured practice and exam-focused guidance.</p><div className="featureInline mentorFeatures"><span><CheckCircle2/>7+ Years Experience</span><span><CheckCircle2/>English & Maths Expert</span><span><CheckCircle2/>Student Focused</span><span><CheckCircle2/>Result Oriented</span></div><Link className="btn btnGold" href="/amol-sir">Know More About Amol Sir →</Link></div>
      <div className="quoteBox"><span className="quoteMark">“</span><p>My goal is to make every student confident in English and Maths and help them achieve their dreams.</p><strong>— Amol Sir</strong></div>
    </div></section>

    <section className="section reviewSection"><div className="container">
      <div className="sectionHead"><div><h2>What Our Students Say</h2><p>Feedback from learners preparing for exams and improving core skills.</p></div><Link className="sectionLink" href="/courses">Explore Courses →</Link></div>
      <div className="reviewGrid">{reviews.map(r=><article className="reviewCard" key={r.name}><div className="reviewTop"><div className="avatar">{r.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div><strong>{r.name}</strong><span>{r.role}</span></div></div><div className="stars">★★★★★</div><p>“{r.text}”</p></article>)}</div>
    </div></section>

    <section className="ctaStrip"><div className="container ctaRow"><div><h2>Start Your Learning Journey Today!</h2><p>Join students learning English, Mathematics and competitive exam skills with Savrdh Education.</p></div><div className="ctaButtons"><Link className="btn btnGold" href="/courses">Browse Courses →</Link><a className="btn btnWhatsApp" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Chat on WhatsApp</a><a className="ctaPhone" href={callUrl}><b>☎ {BRAND.phone}</b><small>{BRAND.location}</small></a></div></div></section>

    <SiteFooter/>
  </>
}
