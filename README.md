# EdTech Demo

ed-tech showcase built with Strapi and Next.js (App Router)

An ed-tech showcase built with Strapi and Next.js (App Router). This project demonstrates how to power a modern learning platform with:

Strapi as a headless CMS providing structured content (courses, lessons, instructors, reviews).

Next.js App Router with a mix of server-side rendering for fast, SEO-friendly pages and client-side hydration for live updates.

Testing at multiple levels: unit, integration, and optional end-to-end.

Performance & Accessibility as first-class concerns, with Lighthouse integrated into the workflow.


## ✅ Summary of relations
From	To	Type	Name
Course	Lesson	One-to-Many	lessons
Lesson	Course	Many-to-One	course
Course	Instructor	Many-to-One	instructor
Instructor	Course	One-to-Many	courses
Review	Course	Many-to-One	course
Course	Review	One-to-Many	reviews


