export const BRAND = {
  name: 'SAVRDH EDUCATION',
  tagline: 'Learn Smart. Learn Better. Grow Faster.',
  description: 'Online courses in English & Mathematics with recorded learning, weekly live classes, tests and certificates.',
  educator: 'Amol Sir',
  educatorTitle: 'Head Educator',
  educatorExperience: '7+ Years of Teaching Experience',
  phone: '9340590167',
  whatsapp: '919340590167',
  location: 'Bhargava Colony, Bareli',
  supportEmail: 'support@savrdheducation.com'
} as const

export const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hello Savrdh Education, I want to know more about your courses.')}`
export const callUrl = `tel:+91${BRAND.phone}`
