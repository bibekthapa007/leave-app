const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '', // by default: '1.0.0'
    title: 'Vyaguta OKR', // by default: 'REST API'
    description: '', // by default: ''
  },
  host: '', // by default: 'localhost:3000'
  basePath: '', // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: '', // Tag name
      description: '', // Tag description
    },
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
  components: {}, // by default: empty object (OpenAPI 3.x)
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/route.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc);
