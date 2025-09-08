// cms/src/policies/is-enrolled.ts
export default async (ctx, next) => {
  const user = ctx.state.user;
  const courseId = ctx.params.id;

  if (!user) {
    return ctx.unauthorized('You must be logged in');
  }

  const enrollment = await strapi.db.query('api::enrollment.enrollment').findOne({
    where: { user: user.id, course: courseId },
  });

  if (!enrollment) {
    return ctx.forbidden('You are not enrolled in this course');
  }

  return next();
};
