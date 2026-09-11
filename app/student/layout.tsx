import { DashboardShell } from '@/components/dashboard-shell';import { isSupabaseConfigured } from '@/lib/supabase/server';import { requireUser } from '@/lib/auth';
export default async function Layout({children}:{children:React.ReactNode}){if(isSupabaseConfigured())await requireUser();return <DashboardShell kind="student">{children}</DashboardShell>}
