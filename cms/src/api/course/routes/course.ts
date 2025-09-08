/**
 * course router with custom lessons route
 */
export default {
  routes: [
    // Core-like routes (copy from generated defaults if you need them)
    {
      method: 'GET',
      path: '/courses',
      handler: 'course.find',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/courses/:id',
      handler: 'course.findOne',
      config: { auth: false, policies: [] },
    },
    // … add create, update, delete if you need them

    // Custom lessons route
    {
      method: 'GET',
      path: '/courses/:id/lessons',
      handler: 'course.lessons',
      config: {
        auth: { required: true },
        policies: ['global::is-enrolled'],
      },
    },
  ],
};
