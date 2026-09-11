# SAVRDH EDUCATION

Production-oriented LMS + course selling platform for English, Mathematics and future multi-course expansion.

## Stack

- Next.js App Router + TypeScript
- Supabase Auth, PostgreSQL, Row Level Security and Storage
- Razorpay order/payment/webhook architecture
- Server-side role enforcement for Super Admin, Admin, Instructor and Student
- Database-driven courses, prices, modules, lessons, live classes, coupons and certificates

## Local setup

1. Copy `.env.example` to `.env.local` and add your Supabase + Razorpay values.
2. Run `supabase/migrations/0001_init.sql` in a dedicated Supabase project.
3. Run `supabase/seed.sql` for initial Savrdh Education demo courses.
4. Create the environment variables in Vercel.
5. `npm install && npm run dev`.

The public website renders demo course data when Supabase is not configured. Authentication, checkout, protected learning, admin CRUD and payment enrollment require Supabase/Razorpay environment variables.

## Payment safety

Course enrollment is never granted from a browser-only success callback. `/api/payments/verify` validates Razorpay HMAC and `/api/payments/webhook` validates webhook signatures before writing successful payments/enrollments.

## Branding

Primary brand: SAVRDH EDUCATION  
Tagline: Learn Smart. Learn Better. Grow Faster.  
Academic Head: Amol Sir — Head Educator — 7+ Years Experience  
Contact: 9340590167, Bhargava Colony, Bareli
