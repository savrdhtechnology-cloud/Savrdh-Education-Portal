export type DemoCourse = {
  id: string
  slug: string
  title: string
  short_description: string
  description: string
  category: 'Maths' | 'English' | 'Combo' | 'Live Batch'
  price_paise: number
  discount_price_paise: number | null
  level: string
  language: string
  duration_text: string
  lesson_count: number
  module_count: number
  live_class_enabled: boolean
  certificate_enabled: boolean
  published: boolean
  accent: string
}

export const demoCourses: DemoCourse[] = [
  { id:'math-basic', slug:'maths-tricks-shortcuts-basic', title:'Maths Tricks & Shortcuts – Basic', short_description:'Build speed with foundational arithmetic tricks and exam-friendly methods.', description:'A beginner-friendly maths course focused on number sense, fast calculation and practical shortcuts.', category:'Maths', price_paise:29900, discount_price_paise:null, level:'Basic', language:'Hindi + English', duration_text:'Self-paced', lesson_count:25, module_count:6, live_class_enabled:true, certificate_enabled:true, published:true, accent:'blue' },
  { id:'math-advanced', slug:'maths-tricks-shortcuts-advanced', title:'Maths Tricks & Shortcuts – Advanced', short_description:'Advanced arithmetic, algebra and time-saving competitive techniques.', description:'Take calculation speed and problem-solving strategy to the next level.', category:'Maths', price_paise:49900, discount_price_paise:null, level:'Advanced', language:'Hindi + English', duration_text:'Self-paced', lesson_count:40, module_count:6, live_class_enabled:true, certificate_enabled:true, published:true, accent:'navy' },
  { id:'competitive-maths', slug:'competitive-maths-mastery', title:'Competitive Maths Mastery', short_description:'Exam-oriented maths practice with shortcuts, timed quizzes and advanced arithmetic.', description:'A complete competitive maths track with practice tests and shortcut-led solutions.', category:'Maths', price_paise:59900, discount_price_paise:null, level:'Competitive', language:'Hindi + English', duration_text:'Self-paced', lesson_count:48, module_count:6, live_class_enabled:true, certificate_enabled:true, published:true, accent:'indigo' },
  { id:'english-basic', slug:'english-basic-to-advanced', title:'English Basic to Advanced', short_description:'Grammar, vocabulary, speaking and competitive English in one structured course.', description:'Progress from parts of speech and sentence structure to advanced grammar and speaking confidence.', category:'English', price_paise:39900, discount_price_paise:null, level:'Basic to Advanced', language:'Hindi + English', duration_text:'Self-paced', lesson_count:35, module_count:6, live_class_enabled:true, certificate_enabled:true, published:true, accent:'green' },
  { id:'competitive-english', slug:'competitive-english', title:'Competitive English', short_description:'Error detection, cloze tests, vocabulary and reading comprehension for exams.', description:'Focused preparation for SSC, Banking, Railway, Defence and other competitive exams.', category:'English', price_paise:49900, discount_price_paise:null, level:'Competitive', language:'Hindi + English', duration_text:'Self-paced', lesson_count:40, module_count:6, live_class_enabled:true, certificate_enabled:true, published:true, accent:'purple' },
  { id:'grammar-mastery', slug:'english-grammar-mastery', title:'English Grammar Mastery', short_description:'Master tenses, voice, narration, agreement and common grammar errors.', description:'A focused grammar program for students who want clear rules and practical application.', category:'English', price_paise:29900, discount_price_paise:null, level:'Intermediate', language:'Hindi + English', duration_text:'Self-paced', lesson_count:30, module_count:5, live_class_enabled:true, certificate_enabled:true, published:true, accent:'teal' },
  { id:'combo', slug:'english-maths-combo', title:'English + Maths Combo', short_description:'Complete English and Maths learning at a special combo price.', description:'A combined learning path for students who want to strengthen both core subjects.', category:'Combo', price_paise:69900, discount_price_paise:null, level:'Mixed', language:'Hindi + English', duration_text:'Self-paced', lesson_count:70, module_count:12, live_class_enabled:true, certificate_enabled:true, published:true, accent:'orange' },
  { id:'competitive-package', slug:'complete-competitive-package', title:'Complete Competitive Package', short_description:'Maths + English competitive preparation with tests and weekly live guidance.', description:'A wider exam-preparation bundle that combines competitive Maths and English.', category:'Combo', price_paise:99900, discount_price_paise:null, level:'Competitive', language:'Hindi + English', duration_text:'Self-paced', lesson_count:90, module_count:12, live_class_enabled:true, certificate_enabled:true, published:true, accent:'gold' },
  { id:'live-batch', slug:'premium-live-batch', title:'Premium Live Batch', short_description:'A live-first batch with weekly classes, practice sessions and guided progress.', description:'Instructor-led learning with live sessions, recordings, quizzes and completion certificate.', category:'Live Batch', price_paise:149900, discount_price_paise:null, level:'All Levels', language:'Hindi + English', duration_text:'Batch schedule', lesson_count:24, module_count:6, live_class_enabled:true, certificate_enabled:true, published:true, accent:'red' }
]

export const mathsCurriculum = [
  { title:'Module 1 – Foundation', lessons:['Number System','BODMAS','Fractions','Decimals','HCF','LCM','Divisibility Rules','Squares','Cubes'] },
  { title:'Module 2 – Fast Calculation', lessons:['Multiplication Tricks','Division Tricks','Square Tricks','Cube Tricks','Percentage Tricks','Fraction to Percentage','Approximation','Mental Calculation'] },
  { title:'Module 3 – Arithmetic', lessons:['Percentage','Profit & Loss','Discount','Ratio & Proportion','Average','Simple Interest','Compound Interest','Time & Work','Pipes & Cistern','Time Speed Distance','Trains','Boats & Streams','Mixture & Allegation'] },
  { title:'Module 4 – Competitive Shortcuts', lessons:['Question Approach','Formula Shortcuts','Option Elimination','Approximation','Last Digit Tricks','Time-Saving Methods'] },
  { title:'Module 5 – Advanced', lessons:['Algebra','Geometry','Mensuration','Trigonometry Basics','Data Interpretation','Advanced Arithmetic'] },
  { title:'Module 6 – Exam Practice', lessons:['Topic Tests','Timed Quizzes','Previous-Year Style Questions','Shortcut-Based Solutions'] }
]

export const englishCurriculum = [
  { title:'Level 1 – Basic English', lessons:['Parts of Speech','Sentence Structure','Noun','Pronoun','Verb','Adjective','Adverb','Articles','Prepositions','Conjunctions'] },
  { title:'Level 2 – Grammar', lessons:['Tenses','Subject Verb Agreement','Active Passive','Direct Indirect Speech','Modals','Conditional Sentences','Sentence Formation','Common Errors'] },
  { title:'Level 3 – Vocabulary', lessons:['2000+ Important Words','Synonyms','Antonyms','One Word Substitution','Idioms & Phrases','Phrasal Verbs','Root Words','Confusing Words'] },
  { title:'Level 4 – Competitive English', lessons:['Error Detection','Fill in the Blanks','Cloze Test','Sentence Improvement','Para Jumbles','Reading Comprehension','Previous-Year Style Questions'] },
  { title:'Level 5 – Advanced', lessons:['Advanced Grammar','Advanced Vocabulary','Sentence Transformation','Advanced Error Detection'] },
  { title:'Level 6 – Speaking', lessons:['Daily Speaking Practice','Conversation','Pronunciation','Common Spoken English Mistakes','Confidence Building'] }
]

export function inr(paise:number){ return `₹${Math.round(paise/100).toLocaleString('en-IN')}` }
