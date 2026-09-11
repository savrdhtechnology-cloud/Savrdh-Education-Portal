create extension if not exists "pgcrypto";

create type public.app_role as enum ('super_admin','admin','instructor','student');
create type public.order_status as enum ('created','payment_pending','paid','failed','refunded','cancelled');
create type public.payment_status as enum ('created','captured','failed','refunded');
create type public.enrollment_status as enum ('active','completed','revoked','refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.app_role not null default 'student',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text,
  description text,
  category text not null,
  price_paise integer not null check(price_paise>=0),
  discount_price_paise integer check(discount_price_paise>=0),
  level text default 'All Levels',
  language text default 'Hindi + English',
  duration_text text default 'Self-paced',
  thumbnail_path text,
  lesson_count integer not null default 0,
  module_count integer not null default 0,
  live_class_enabled boolean not null default false,
  certificate_enabled boolean not null default false,
  certificate_min_progress integer not null default 100 check(certificate_min_progress between 0 and 100),
  certificate_min_quiz_score integer not null default 0 check(certificate_min_quiz_score between 0 and 100),
  coupon_eligible boolean not null default true,
  published boolean not null default false,
  archived boolean not null default false,
  sort_order integer not null default 100,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index courses_category_idx on public.courses(category);
create index courses_published_idx on public.courses(published,archived);

create table public.course_instructors (course_id uuid references public.courses(id) on delete cascade,instructor_id uuid references public.profiles(id) on delete cascade,primary key(course_id,instructor_id));

create table public.course_modules (
  id uuid primary key default gen_random_uuid(),course_id uuid not null references public.courses(id) on delete cascade,title text not null,description text,position integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create index course_modules_course_idx on public.course_modules(course_id,position);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),module_id uuid not null references public.course_modules(id) on delete cascade,title text not null,lesson_type text not null default 'video',video_provider text,video_asset_id text,duration_seconds integer not null default 0,body text,position integer not null default 0,is_preview boolean not null default false,published boolean not null default true,created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create index lessons_module_idx on public.lessons(module_id,position);

create table public.lesson_resources (
  id uuid primary key default gen_random_uuid(),lesson_id uuid not null references public.lessons(id) on delete cascade,title text not null,resource_type text not null default 'pdf',storage_path text,url text,created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id),course_id uuid not null references public.courses(id),coupon_id uuid,amount_paise integer not null,currency text not null default 'INR',status public.order_status not null default 'created',receipt text not null unique,gateway_order_id text unique,created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create index orders_user_idx on public.orders(user_id,created_at desc);

create table public.payments (
  id uuid primary key default gen_random_uuid(),order_id uuid not null references public.orders(id),user_id uuid not null references public.profiles(id),course_id uuid not null references public.courses(id),gateway text not null default 'razorpay',gateway_order_id text,gateway_payment_id text unique,amount_paise integer not null,currency text not null default 'INR',status public.payment_status not null,gateway_response jsonb,verified_at timestamptz,created_at timestamptz not null default now()
);
create index payments_user_idx on public.payments(user_id,created_at desc);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id),course_id uuid not null references public.courses(id),order_id uuid references public.orders(id),status public.enrollment_status not null default 'active',progress_percent numeric(5,2) not null default 0,enrolled_at timestamptz not null default now(),completed_at timestamptz,unique(user_id,course_id)
);
create index enrollments_user_idx on public.enrollments(user_id,status);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),code text not null unique,discount_type text not null check(discount_type in ('percent','flat')),discount_value integer not null check(discount_value>=0),minimum_order_paise integer not null default 0,maximum_discount_paise integer,starts_at timestamptz,expires_at timestamptz,usage_limit integer,per_user_limit integer not null default 1,active boolean not null default true,created_at timestamptz not null default now()
);
alter table public.orders add constraint orders_coupon_fk foreign key(coupon_id) references public.coupons(id);

create table public.coupon_usage (
  id uuid primary key default gen_random_uuid(),coupon_id uuid not null references public.coupons(id),user_id uuid not null references public.profiles(id),order_id uuid not null references public.orders(id),used_at timestamptz not null default now()
);
create unique index coupon_usage_order_uidx on public.coupon_usage(order_id);
create index coupon_usage_limit_idx on public.coupon_usage(coupon_id,user_id);

create table public.live_classes (
  id uuid primary key default gen_random_uuid(),course_id uuid not null references public.courses(id) on delete cascade,title text not null,starts_at timestamptz not null,duration_minutes integer not null default 60,teacher_name text default 'Amol Sir',description text,meeting_url text,recording_url text,status text not null default 'scheduled' check(status in ('scheduled','live','completed','cancelled')),created_at timestamptz not null default now()
);
create index live_classes_course_start_idx on public.live_classes(course_id,starts_at);

create table public.quizzes (
  id uuid primary key default gen_random_uuid(),course_id uuid references public.courses(id) on delete cascade,lesson_id uuid references public.lessons(id) on delete cascade,title text not null,passing_percent integer not null default 40,required_for_completion boolean not null default false,created_at timestamptz not null default now()
);
create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),quiz_id uuid not null references public.quizzes(id) on delete cascade,question text not null,explanation text,marks numeric(8,2) not null default 1,position integer not null default 0
);
create table public.quiz_options (
  id uuid primary key default gen_random_uuid(),question_id uuid not null references public.quiz_questions(id) on delete cascade,option_text text not null,is_correct boolean not null default false,position integer not null default 0
);
create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),quiz_id uuid not null references public.quizzes(id),user_id uuid not null references public.profiles(id),score numeric(8,2) not null default 0,max_score numeric(8,2) not null default 0,percent numeric(5,2) not null default 0,passed boolean not null default false,started_at timestamptz not null default now(),submitted_at timestamptz
);
create table public.quiz_answers (
  id uuid primary key default gen_random_uuid(),attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,question_id uuid not null references public.quiz_questions(id),selected_option_id uuid references public.quiz_options(id),is_correct boolean not null default false,marks_awarded numeric(8,2) not null default 0
);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id),lesson_id uuid not null references public.lessons(id) on delete cascade,completed boolean not null default false,last_position_seconds integer not null default 0,completed_at timestamptz,updated_at timestamptz not null default now(),unique(user_id,lesson_id)
);

create table public.certificates (
  id uuid primary key default gen_random_uuid(),certificate_id text not null unique,user_id uuid not null references public.profiles(id),course_id uuid not null references public.courses(id),issued_at timestamptz not null default now(),revoked boolean not null default false,metadata jsonb not null default '{}'::jsonb,unique(user_id,course_id)
);
create index certificates_verify_idx on public.certificates(certificate_id,revoked);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id),course_id uuid not null references public.courses(id),rating integer check(rating between 1 and 5),body text,status text not null default 'pending',created_at timestamptz not null default now(),unique(user_id,course_id)
);
create table public.notifications (
  id uuid primary key default gen_random_uuid(),user_id uuid not null references public.profiles(id),type text not null,title text not null,body text,data jsonb not null default '{}'::jsonb,read_at timestamptz,created_at timestamptz not null default now()
);
create table public.platform_settings (
  key text primary key,value jsonb not null default '{}'::jsonb,updated_at timestamptz not null default now()
);
create table public.audit_logs (
  id bigserial primary key,actor_id uuid references public.profiles(id),action text not null,entity_type text not null,entity_id text,metadata jsonb not null default '{}'::jsonb,created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$ begin insert into public.profiles(id,full_name,role) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),'student') on conflict(id) do nothing; return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.is_staff() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role in ('super_admin','admin','instructor')) $$;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.profiles where id=auth.uid() and role in ('super_admin','admin')) $$;

alter table public.profiles enable row level security;alter table public.courses enable row level security;alter table public.course_instructors enable row level security;alter table public.course_modules enable row level security;alter table public.lessons enable row level security;alter table public.lesson_resources enable row level security;alter table public.orders enable row level security;alter table public.payments enable row level security;alter table public.enrollments enable row level security;alter table public.coupons enable row level security;alter table public.coupon_usage enable row level security;alter table public.live_classes enable row level security;alter table public.quizzes enable row level security;alter table public.quiz_questions enable row level security;alter table public.quiz_options enable row level security;alter table public.quiz_attempts enable row level security;alter table public.quiz_answers enable row level security;alter table public.lesson_progress enable row level security;alter table public.certificates enable row level security;alter table public.reviews enable row level security;alter table public.notifications enable row level security;alter table public.platform_settings enable row level security;alter table public.audit_logs enable row level security;

create policy "profile self read" on public.profiles for select using(id=auth.uid() or public.is_staff());
create policy "profile self update" on public.profiles for update using(id=auth.uid() or public.is_admin()) with check(id=auth.uid() or public.is_admin());
create policy "public published courses" on public.courses for select using((published=true and archived=false) or public.is_staff());
create policy "staff courses write" on public.courses for all using(public.is_staff()) with check(public.is_staff());
create policy "public published modules" on public.course_modules for select using(exists(select 1 from public.courses c where c.id=course_id and c.published=true) or public.is_staff());
create policy "staff modules write" on public.course_modules for all using(public.is_staff()) with check(public.is_staff());
create policy "published lessons read" on public.lessons for select using(is_preview=true or public.is_staff() or exists(select 1 from public.course_modules m join public.enrollments e on e.course_id=m.course_id where m.id=module_id and e.user_id=auth.uid() and e.status='active'));
create policy "staff lessons write" on public.lessons for all using(public.is_staff()) with check(public.is_staff());
create policy "resources enrolled" on public.lesson_resources for select using(public.is_staff() or exists(select 1 from public.lessons l join public.course_modules m on m.id=l.module_id join public.enrollments e on e.course_id=m.course_id where l.id=lesson_id and e.user_id=auth.uid() and e.status='active'));
create policy "staff resources write" on public.lesson_resources for all using(public.is_staff()) with check(public.is_staff());
create policy "own orders" on public.orders for select using(user_id=auth.uid() or public.is_staff());
create policy "own payments" on public.payments for select using(user_id=auth.uid() or public.is_staff());
create policy "own enrollments" on public.enrollments for select using(user_id=auth.uid() or public.is_staff());
create policy "staff coupons" on public.coupons for all using(public.is_staff()) with check(public.is_staff());
create policy "active coupon read" on public.coupons for select using(active=true or public.is_staff());
create policy "own coupon usage" on public.coupon_usage for select using(user_id=auth.uid() or public.is_staff());
create policy "live class enrolled" on public.live_classes for select using(public.is_staff() or exists(select 1 from public.enrollments e where e.course_id=course_id and e.user_id=auth.uid() and e.status='active'));
create policy "staff live class write" on public.live_classes for all using(public.is_staff()) with check(public.is_staff());
create policy "quiz enrolled" on public.quizzes for select using(public.is_staff() or exists(select 1 from public.enrollments e where e.course_id=course_id and e.user_id=auth.uid() and e.status='active'));
create policy "staff quiz write" on public.quizzes for all using(public.is_staff()) with check(public.is_staff());
create policy "question enrolled" on public.quiz_questions for select using(public.is_staff() or exists(select 1 from public.quizzes q join public.enrollments e on e.course_id=q.course_id where q.id=quiz_id and e.user_id=auth.uid() and e.status='active'));
create policy "staff question write" on public.quiz_questions for all using(public.is_staff()) with check(public.is_staff());
create policy "option read enrolled" on public.quiz_options for select using(public.is_staff() or exists(select 1 from public.quiz_questions qq join public.quizzes q on q.id=qq.quiz_id join public.enrollments e on e.course_id=q.course_id where qq.id=question_id and e.user_id=auth.uid() and e.status='active'));
create policy "staff option write" on public.quiz_options for all using(public.is_staff()) with check(public.is_staff());
create policy "own attempts" on public.quiz_attempts for all using(user_id=auth.uid() or public.is_staff()) with check(user_id=auth.uid() or public.is_staff());
create policy "own answers" on public.quiz_answers for select using(public.is_staff() or exists(select 1 from public.quiz_attempts a where a.id=attempt_id and a.user_id=auth.uid()));
create policy "own lesson progress" on public.lesson_progress for all using(user_id=auth.uid() or public.is_staff()) with check(user_id=auth.uid() or public.is_staff());
create policy "certificate public verify" on public.certificates for select using(revoked=false or user_id=auth.uid() or public.is_staff());
create policy "staff certificate write" on public.certificates for all using(public.is_staff()) with check(public.is_staff());
create policy "reviews public approved" on public.reviews for select using(status='approved' or user_id=auth.uid() or public.is_staff());
create policy "reviews own create" on public.reviews for insert with check(user_id=auth.uid());
create policy "notifications own" on public.notifications for select using(user_id=auth.uid() or public.is_staff());
create policy "settings public read" on public.platform_settings for select using(true);
create policy "settings admin write" on public.platform_settings for all using(public.is_admin()) with check(public.is_admin());
create policy "audit staff read" on public.audit_logs for select using(public.is_admin());

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('course-assets','course-assets',false,52428800,array['image/jpeg','image/png','image/webp','application/pdf']) on conflict(id) do nothing;
create policy "staff upload course assets" on storage.objects for insert to authenticated with check(bucket_id='course-assets' and public.is_staff());
create policy "staff manage course assets" on storage.objects for all to authenticated using(bucket_id='course-assets' and public.is_staff()) with check(bucket_id='course-assets' and public.is_staff());
