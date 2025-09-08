/**
 * course controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::course.course', ({ strapi }) => ({
  async lessons(ctx) {
    const { id } = ctx.params;

    const lessons = await strapi.db.query('api::lesson.lesson').findMany({
      where: { course: id },
    });

    ctx.body = lessons;
  },
}));
