import { Suspense } from 'react';import { SiteHeader } from '@/components/site-header';import { AuthForm } from '@/components/auth-form';
export const metadata={title:'Register'}
export default function Page(){return <><SiteHeader/><div className="authPage"><Suspense><AuthForm mode="register"/></Suspense></div></>}
