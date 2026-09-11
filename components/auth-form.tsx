'use client'
import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export function AuthForm({mode}:{mode:'login'|'register'}){
  const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const router=useRouter(); const search=useSearchParams()
  async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setLoading(true);setError('');const fd=new FormData(e.currentTarget);try{const supabase=createClient(); if(mode==='login'){const {error}=await supabase.auth.signInWithPassword({email:String(fd.get('email')),password:String(fd.get('password'))});if(error)throw error;router.push(search.get('next')||'/student/dashboard');router.refresh()}else{const {error}=await supabase.auth.signUp({email:String(fd.get('email')),password:String(fd.get('password')),options:{data:{full_name:String(fd.get('name')||'')}}});if(error)throw error;setError('Account created. If email confirmation is enabled, please confirm your email before login.')}}catch(err){setError(err instanceof Error?err.message:'Unable to continue')}finally{setLoading(false)}}
  return <form className="authCard" onSubmit={submit}><h1>{mode==='login'?'Welcome back':'Create your account'}</h1><p>{mode==='login'?'Continue your learning journey.':'Register to purchase courses and track your learning.'}</p>{mode==='register'&&<label>Full Name<input name="name" required autoComplete="name"/></label>}<label>Email<input name="email" type="email" required autoComplete="email"/></label><label>Password<input name="password" type="password" required minLength={8} autoComplete={mode==='login'?'current-password':'new-password'}/></label>{error&&<div className="notice">{error}</div>}<button className="btn btnGold full" disabled={loading}>{loading?'Please wait…':mode==='login'?'Login':'Sign Up'}</button><small>{mode==='login'?<>New here? <Link href="/register">Create account</Link></>:<>Already registered? <Link href="/login">Login</Link></>}</small></form>
}
