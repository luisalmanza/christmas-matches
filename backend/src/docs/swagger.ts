import swaggerJsdoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: "Christmas Matches API documentation",
        version: "1.0.1"
    },
    servers: [
        {
            url: "http://localhost:3001/api"
        }
    ],
    components: {
        schemas: {
            player: {
                type: "object",
                required: ["name", "mediaId"],
                properties: {
                    name: {
                        type: "string"
                    },
                    nickname: {
                        type: "string"
                    },
                    mediaId: {
                        type: "string"
                    }
                }
            },
            storage: {
                type: "object",
                properties: {
                    url: {
                        type: "string"
                    },
                    filename: {
                        type: "string"
                    }
                }
            }
        }
    }
};

const options: OAS3Options = {
    swaggerDefinition,
    apis: [`${__dirname}/../routes/*.ts`]
};

const openApiConfiguration = swaggerJsdoc(options);

export default openApiConfiguration;