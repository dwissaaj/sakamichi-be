module.exports = [
  {
    name: "strapi::body",
    config: {
      formLimit: "10mb", // modify form body
      jsonLimit: "10mb", // modify JSON body
      textLimit: "10mb", // modify text body
      formidable: {
        maxFileSize: 10 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },

  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'bucket-q0ddp1.s3.ap-southeast-1.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'bucket-q0ddp1.s3.ap-southeast-1.amazonaws.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  { name: 'strapi::cors'},
  {name: 'strapi::poweredBy'},
  {  name: 'strapi::logger'},
  {  name: 'strapi::query' },
  {  name: 'strapi::session'},
  {  name: 'strapi::favicon'},
  {  name: 'strapi::public'},
  {name: 'strapi::errors'},
];
