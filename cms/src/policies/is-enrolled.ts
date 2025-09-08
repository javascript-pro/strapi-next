// cms/src/policies/is-enrolled.ts
export default async (ctx, next) => {
  const user = ctx.state.user; // populated by JWT/Auth middleware
  const courseId = ctx.params.id;

  if (!user) {
    return ctx.unauthorized('You must be logged in');
  }

  // Query the enrollment relation (adjust collection name if different)
  const enrollment = await strapi.db.query('api::enrollment.enrollment').findOne({
    where: { user: user.id, course: courseId },
  });

  if (!enrollment) {
    return ctx.forbidden('You are not enrolled in this course');
  }

  // Allow request to continue to controller
  return next();
};
