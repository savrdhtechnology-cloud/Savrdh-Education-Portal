import { DashboardShell } from '@/components/dashboard-shell';import { requireRole } from '@/lib/auth';import { isSupabaseConfigured } from '@/lib/supabase/server';
export default async function Layout({children}:{children:React.ReactNode}){if(isSupabaseConfigured())await requireRole(['super_admin','admin','instructor']);return <DashboardShell kind="admin">{children}</DashboardShell>}
