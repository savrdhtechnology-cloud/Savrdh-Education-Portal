insert into public.platform_settings(key,value) values
('brand', '{"platformName":"SAVRDH EDUCATION","tagline":"Learn Smart. Learn Better. Grow Faster.","contactNumber":"9340590167","whatsappNumber":"919340590167","location":"Bhargava Colony, Bareli","currency":"INR"}'::jsonb),
('seo', '{"defaultTitle":"Savrdh Education","defaultDescription":"Online English and Mathematics courses with Amol Sir."}'::jsonb)
on conflict(key) do update set value=excluded.value;

insert into public.courses(slug,title,short_description,description,category,price_paise,level,language,duration_text,lesson_count,module_count,live_class_enabled,certificate_enabled,published,sort_order) values
('maths-tricks-shortcuts-basic','Maths Tricks & Shortcuts – Basic','Foundation maths with fast calculation and practical shortcuts.','Beginner-friendly maths from number system to competitive shortcuts.','Maths',29900,'Basic','Hindi + English','Self-paced',25,6,true,true,true,10),
('maths-tricks-shortcuts-advanced','Maths Tricks & Shortcuts – Advanced','Advanced arithmetic, algebra and time-saving techniques.','Advanced maths practice with problem-solving shortcuts.','Maths',49900,'Advanced','Hindi + English','Self-paced',40,6,true,true,true,20),
('competitive-maths-mastery','Competitive Maths Mastery','Exam-oriented maths with timed practice.','Competitive maths for exam preparation.','Maths',59900,'Competitive','Hindi + English','Self-paced',48,6,true,true,true,30),
('english-basic-to-advanced','English Basic to Advanced','Grammar, vocabulary, speaking and competitive English.','Structured English from fundamentals to advanced practice.','English',39900,'Basic to Advanced','Hindi + English','Self-paced',35,6,true,true,true,40),
('competitive-english','Competitive English','Error detection, cloze, vocabulary and comprehension.','Competitive English practice for common exam patterns.','English',49900,'Competitive','Hindi + English','Self-paced',40,6,true,true,true,50),
('english-grammar-mastery','English Grammar Mastery','Focused grammar rules and practice.','Tenses, voice, narration, agreement and common errors.','English',29900,'Intermediate','Hindi + English','Self-paced',30,5,true,true,true,60),
('english-maths-combo','English + Maths Combo','Combined English and Maths course bundle.','Strengthen both core subjects in one package.','Combo',69900,'Mixed','Hindi + English','Self-paced',70,12,true,true,true,70),
('complete-competitive-package','Complete Competitive Package','Maths + English competitive preparation.','A wider exam-preparation package with tests and live guidance.','Combo',99900,'Competitive','Hindi + English','Self-paced',90,12,true,true,true,80),
('premium-live-batch','Premium Live Batch','Live-first guided batch with practice and recordings.','Instructor-led live learning with recordings, quizzes and certificate.','Live Batch',149900,'All Levels','Hindi + English','Batch schedule',24,6,true,true,true,90)
on conflict(slug) do nothing;

insert into public.coupons(code,discount_type,discount_value,minimum_order_paise,per_user_limit,active) values
('WELCOME10','percent',10,0,1,true),('FIRST50','flat',5000,0,1,true)
on conflict(code) do nothing;

-- After creating the owner account through /register, promote it manually once:
-- update public.profiles set role='super_admin' where id='<AUTH_USER_UUID>';


do $$
declare c uuid; m uuid; q uuid; qq uuid;
begin
  select id into c from public.courses where slug='maths-tricks-shortcuts-basic';
  if c is not null and not exists(select 1 from public.course_modules where course_id=c) then
    insert into public.course_modules(course_id,title,position) values(c,'Module 1 – Foundation',1) returning id into m;
    insert into public.lessons(module_id,title,position,is_preview) values
      (m,'Number System',1,true),(m,'BODMAS',2,false),(m,'Fractions',3,false),(m,'Decimals',4,false),(m,'HCF & LCM',5,false),(m,'Divisibility Rules',6,false),(m,'Squares & Cubes',7,false);
    insert into public.course_modules(course_id,title,position) values(c,'Module 2 – Fast Calculation',2) returning id into m;
    insert into public.lessons(module_id,title,position) values(m,'Multiplication Tricks',1),(m,'Division Tricks',2),(m,'Percentage Tricks',3),(m,'Mental Calculation',4);
    insert into public.course_modules(course_id,title,position) values(c,'Module 3 – Arithmetic',3) returning id into m;
    insert into public.lessons(module_id,title,position) values(m,'Percentage',1),(m,'Profit & Loss',2),(m,'Ratio & Proportion',3),(m,'Average',4),(m,'Time & Work',5),(m,'Time Speed Distance',6);
  end if;
  if c is not null and not exists(select 1 from public.quizzes where course_id=c) then
    insert into public.quizzes(course_id,title,passing_percent,required_for_completion) values(c,'Foundation Practice Test',40,true) returning id into q;
    insert into public.quiz_questions(quiz_id,question,explanation,marks,position) values(q,'What is 25% of 200?','25% is one quarter, so 200 ÷ 4 = 50.',1,1) returning id into qq;
    insert into public.quiz_options(question_id,option_text,is_correct,position) values(qq,'25',false,1),(qq,'50',true,2),(qq,'75',false,3),(qq,'100',false,4);
  end if;

  select id into c from public.courses where slug='english-basic-to-advanced';
  if c is not null and not exists(select 1 from public.course_modules where course_id=c) then
    insert into public.course_modules(course_id,title,position) values(c,'Level 1 – Basic English',1) returning id into m;
    insert into public.lessons(module_id,title,position,is_preview) values(m,'Parts of Speech',1,true),(m,'Sentence Structure',2,false),(m,'Noun & Pronoun',3,false),(m,'Verb',4,false),(m,'Adjective & Adverb',5,false),(m,'Articles & Prepositions',6,false);
    insert into public.course_modules(course_id,title,position) values(c,'Level 2 – Grammar',2) returning id into m;
    insert into public.lessons(module_id,title,position) values(m,'Tenses',1),(m,'Subject Verb Agreement',2),(m,'Active Passive',3),(m,'Direct Indirect Speech',4),(m,'Common Errors',5);
    insert into public.course_modules(course_id,title,position) values(c,'Level 3 – Vocabulary',3) returning id into m;
    insert into public.lessons(module_id,title,position) values(m,'Important Words',1),(m,'Synonyms & Antonyms',2),(m,'Idioms & Phrases',3),(m,'Phrasal Verbs',4);
  end if;
end $$;
