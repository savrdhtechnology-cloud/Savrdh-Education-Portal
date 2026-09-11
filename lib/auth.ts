import { redirect } from 'next/navigation'
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server'

export type AppRole = 'super_admin' | 'admin' | 'instructor' | 'student'

export async function currentUser() {
  if (!isSupabaseConfigured()) return null
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function requireUser() {
  const user = await currentUser()
  if (!user) redirect('/login?next=/student/dashboard')
  return user
}

export async function requireRole(allowed: AppRole[]) {
  if (!isSupabaseConfigured()) throw new Error('Supabase is not configured')
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('UNAUTHENTICATED')
  const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  const role = data?.role as AppRole | undefined
  if (!role || !allowed.includes(role)) throw new Error('FORBIDDEN')
  return { user, role }
}
