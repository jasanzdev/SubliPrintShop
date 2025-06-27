import helmet from 'helmet';

export const helmetMiddleware = helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      imgSrc: [
        `'self'`,
        'data:',
        'apollo-server-landing-page.cdn.apollographql.com',
      ],
      scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      manifestSrc: [
        `'self'`,
        'apollo-server-landing-page.cdn.apollographql.com',
      ],
      frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
    },
  },
});
