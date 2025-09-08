# EdTech Demo

ed-tech showcase built with Strapi and Next.js (App Router)

An ed-tech showcase built with Strapi and Next.js (App Router). This project demonstrates how to power a modern learning platform with:

- **Strapi** as a headless CMS providing structured content (courses, lessons, instructors, reviews).
- **Next.js App Router** with a mix of server-side rendering for fast, SEO-friendly pages and client-side hydration for live updates.
- **Testing** at multiple levels: unit, integration and a11y.
- **Performance & Accessibility** as first-class concerns, with Lighthouse integrated into the workflow.

---

## Pair programming
- **Build/extend a small feature** in Next.js (App Router) with a simple Strapi data source.  
- We’ll focus on reasoning, trade-offs, and collaboration rather than “speed typing.”

## Refactor & tests
- Add basic tests, talk through a11y/perf considerations, light code review.

## Q&A
- Your questions about the stack, team and role.  

## Wrap-up
- Next steps.

---

## Next.js

### Data fetching in Server/Client components
https://nextjs.org/docs/app/getting-started/fetching-data

### Route Handlers (API in app/)
https://nextjs.org/docs/app/getting-started/route-handlers-and-middleware

- Route Handlers act as our **API boundary** in Next.js.  
- Benefits: hide Strapi details, secure tokens, normalize responses, add caching.  
- Example:
  ```ts
  import { NextResponse } from 'next/server';

  export async function GET() {
    const res = await fetch(`${process.env.STRAPI_URL}/api/courses?populate=*`);
    const data = await res.json();

    return NextResponse.json(data);
  }
  ```

### Testing guide (Jest/Vitest/Cypress/Playwright)
https://nextjs.org/docs/app/guides/testing

- **Unit/Integration tests**: handled with Jest + React Testing Library.  
- **E2E tests**: not yet implemented, but Playwright or Cypress would be the next step.  
- **A11y/Perf**: Lighthouse/axe-core can be added in CI/CD.

---

## Strapi (v5)

### Lifecycle hooks (models) – reference
https://docs.strapi.io/cms/backend-customization/models

- Functions that run **before/after model events** (create, update, delete, find).  
- Useful for enforcing **business rules** or automating data.  
- Example:
  ```ts
  export default {
    async beforeCreate(event) {
      const { data } = event.params;
      if (!data.slug && data.title) {
        data.slug = data.title.toLowerCase().replace(/\s+/g, '-');
      }
    },
  };
  ```

### Lifecycle hooks – v4→v5 change (Document Service trigger model)
https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes/lifecycle-hooks-document-service

- v4: lifecycle hooks tied to **entity service**.  
- v5: lifecycle hooks tied to the new **document service**.  
- Hooks now receive richer event context (`action`, `model`, `params`, `result`, `state`).  
- Migration means updating hook signatures.

### Policies (route-level guards)
https://docs.strapi.io/cms/backend-customization/policies

- **Policies** = route-level middleware.  
- Decide whether a request can reach the controller.  
- Example (only enrolled students can view lessons):
  ```ts
  export default async (ctx, next) => {
    const user = ctx.state.user;
    const courseId = ctx.params.id;

    if (!user) return ctx.unauthorized('Login required');

    const enrollment = await strapi.db.query('api::enrollment.enrollment').findOne({
      where: { user: user.id, course: courseId },
    });

    if (!enrollment) return ctx.forbidden('Not enrolled in this course');

    return next();
  };
  ```

### Policies – cookbook examples
https://docs.strapi.io/cms/backend-customization/examples/policies

---

## 📑 Cheat Sheet: Roles vs Policies vs Lifecycle Hooks

| Feature              | Managed In  | Purpose                                  | Example (Ed-tech) |
|----------------------|-------------|------------------------------------------|-------------------|
| **Roles & Permissions** | Admin UI   | Coarse-grained access control            | “Authenticated users can read Courses.” |
| **Policies**         | Code        | Route-level guards (who can access what) | “Only enrolled students can fetch lessons.” |
| **Lifecycle Hooks**  | Code        | Model-level business logic (data rules)  | “Auto-generate slug before saving a Course.” |
