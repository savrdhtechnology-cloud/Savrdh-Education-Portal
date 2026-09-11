import Link from 'next/link'
import { Award, BookOpen, Radio } from 'lucide-react'
import { inr, type DemoCourse } from '@/lib/demo-data'

export function CourseCard({course}:{course:DemoCourse}){
  const price=course.discount_price_paise??course.price_paise
  return (
    <article className={`courseCard accent-${course.accent}`}>
      <div className="courseThumb">
        <span className="courseKicker">{course.category.toUpperCase()}</span>
        <strong>{course.title}</strong>
        <i aria-hidden="true"/>
      </div>
      <div className="courseBody">
        <h3>{course.title}</h3>
        <p>{course.short_description}</p>
        <div className="priceRow"><strong>{inr(price)}</strong>{course.discount_price_paise&&<del>{inr(course.price_paise)}</del>}</div>
        <Link className="btn btnGold full" href={`/course/${course.slug}`}>Enroll Now</Link>
        <div className="courseMeta"><span><BookOpen size={13}/>{course.lesson_count}+ Lessons</span>{course.live_class_enabled&&<span><Radio size={13}/>Weekly Live</span>}{course.certificate_enabled&&<span><Award size={13}/>Certificate</span>}</div>
      </div>
    </article>
  )
}
