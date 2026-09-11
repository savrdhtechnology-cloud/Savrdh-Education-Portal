import { Suspense } from 'react';import { SiteHeader } from '@/components/site-header';import { AuthForm } from '@/components/auth-form';
export const metadata={title:'Login'}
export default function Page(){return <><SiteHeader/><div className="authPage"><Suspense><AuthForm mode="login"/></Suspense></div></>}
