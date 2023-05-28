module.exports = [
  {
    name: "strapi::body",
    config: {
      formLimit: "25mb", // modify form body
      jsonLimit: "25mb", // modify JSON body
      textLimit: "25mb", // modify text body
      formidable: {
        maxFileSize: 25 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },

  },
  {name: 'strapi::security',
    config :{
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 'res.cloudinary.com'],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'res.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    }},
  { name: 'strapi::cors'},
  {name: 'strapi::poweredBy'},
  {  name: 'strapi::logger'},
  {  name: 'strapi::query' },
  {  name: 'strapi::session'},
  {  name: 'strapi::favicon'},
  {  name: 'strapi::public'},
  {name: 'strapi::errors'},
];
