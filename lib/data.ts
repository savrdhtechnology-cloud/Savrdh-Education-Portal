import { demoCourses, type DemoCourse } from '@/lib/demo-data'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'

export async function getCourses(category?: string): Promise<DemoCourse[]> {
  if (!isSupabaseConfigured()) return category ? demoCourses.filter(c => c.category.toLowerCase() === category.toLowerCase()) : demoCourses
  try {
    const supabase = await createClient()
    let query = supabase.from('courses').select('*').eq('published', true).order('sort_order')
    if (category) query = query.ilike('category', category)
    const { data, error } = await query
    if (error || !data?.length) return category ? demoCourses.filter(c => c.category.toLowerCase() === category.toLowerCase()) : demoCourses
    return data as DemoCourse[]
  } catch { return category ? demoCourses.filter(c => c.category.toLowerCase() === category.toLowerCase()) : demoCourses }
}

export async function getCourseBySlug(slug:string): Promise<DemoCourse | null> {
  if (!isSupabaseConfigured()) return demoCourses.find(c => c.slug === slug) ?? null
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('courses').select('*').eq('slug', slug).eq('published', true).maybeSingle()
    return (data as DemoCourse | null) ?? demoCourses.find(c => c.slug === slug) ?? null
  } catch { return demoCourses.find(c => c.slug === slug) ?? null }
}
