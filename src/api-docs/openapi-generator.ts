// this file register the schemas and generate the openapi.json file (OpenAPI document)
// it's the logic responsible for creating the OpenAPI structure
// based on the Zod schemas defined in the app
import {
  OpenAPIRegistry,
  OpenApiGeneratorV31
} from '@asteasolutions/zod-to-openapi'

import {
  CreateMovieSchema,
  CreateMovieRespobseSchema,
  ConflictMovieResponseSchema,
  GetMovieResponseUnionSchema,
  MovieNotFoundResponseSchema,
  DeleteMovieResponseSchema,
  UpdateMovieSchema,
  UpdateMovieResponseSchema
} from '../@types/schema'

import type { ParameterObject } from 'openapi3-ts/oas31'

// after define the schemas (part#1),
// this is part#2: register the schemas with the OpenAPI registry
const registry = new OpenAPIRegistry()
registry.register('CreateMovieRequest', CreateMovieSchema)
registry.register('CreateMovieResponse', CreateMovieRespobseSchema)
registry.register('ConflictMovieResponse', ConflictMovieResponseSchema)
registry.register('GetMovieResponse', GetMovieResponseUnionSchema)
registry.register('MovieNotFoundResponse', MovieNotFoundResponseSchema)
registry.register('DeleteMovieResponse', DeleteMovieResponseSchema)
registry.register('UpdateMovieRequest', UpdateMovieSchema)
registry.register('UpdateMovieResponse', UpdateMovieResponseSchema)

// constants to avoid repetition
const MOVID_ID_PARAM: ParameterObject = {
  name: 'id',
  in: 'path',
  required: true,
  description: 'The ID of the movie',
  schema: {
    type: 'string'
  }
}

const MOVIE_NAME_PARAM: ParameterObject = {
  name: 'name',
  in: 'query',
  required: false,
  description: 'The name of the movie',
  schema: {
    type: 'string'
  }
}

// register the paths with the OpenAPI generator
registry.registerPath({
  method: 'get',
  path: '/',
  summary: 'Health check',
  responses: {
    200: {
      description: 'Server is running.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Server is running'
              }
            }
          }
        }
      }
    }
  }
})

// register path for getting all movies or filtering by name via query parameter
registry.registerPath({
  method: 'get',
  path: '/movies',
  summary: 'Get all movies or filter by name',
  parameters: [MOVIE_NAME_PARAM],
  responses: {
    200: {
      description:
        'List of movies or a specific movie if the "name" query parameter is provided',
      content: {
        'application/json': {
          schema: GetMovieResponseUnionSchema
        }
      }
    },
    404: {
      description:
        'Movie not found if the name is provided and does not match any movie',
      content: {
        'application/json': {
          schema: MovieNotFoundResponseSchema
        }
      }
    }
  }
})

// register path for getting a movie by ID
registry.registerPath({
  method: 'get',
  path: '/movies/{id}',
  summary: 'Get a movie by ID',
  description: 'Retriece a single movie by its ID',
  parameters: [MOVID_ID_PARAM],
  responses: {
    200: {
      description: 'Movie found',
      content: {
        'application/json': {
          schema: GetMovieResponseUnionSchema
        }
      }
    },
    404: {
      description: 'Movie not found',
      content: {
        'application/json': {
          schema: MovieNotFoundResponseSchema
        }
      }
    }
  }
})

// register path for adding a movie
registry.registerPath({
  method: 'post',
  path: '/movies',
  summary: 'Create a new movie',
  description: 'Create a new movie in the system',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateMovieSchema
        }
      }
    }
  },
  responses: {
    201: {
      description: 'Movie created successfully',
      content: {
        'application/json': {
          schema: CreateMovieRespobseSchema
        }
      }
    },
    400: {
      description: 'Invalid request body or valiation error'
    },
    409: {
      description: 'Movie already exists',
      content: {
        'application/json': {
          schema: ConflictMovieResponseSchema
        }
      }
    },
    500: {
      description: 'Unexpected error occurred'
    }
  }
})

// register path for deleting a movie
registry.registerPath({
  method: 'delete',
  path: '/movies/{id}',
  summary: 'Delete a movie by ID',
  description: 'Delete a movie from the system by its ID',
  parameters: [MOVID_ID_PARAM],
  responses: {
    200: {
      description: 'Movie {id} has been deleted successfully',
      content: {
        'application/json': {
          schema: DeleteMovieResponseSchema
        }
      }
    },
    404: {
      description: 'Movie not found',
      content: {
        'application/json': {
          schema: MovieNotFoundResponseSchema
        }
      }
    },
    500: {
      description: 'Unexpected error occurred'
    }
  }
})

// register path for updating a movie
registry.registerPath({
  method: 'put',
  path: '/movies/{id}',
  summary: 'Update a movie by ID',
  description: 'Update a movie in the system by its ID',
  parameters: [MOVID_ID_PARAM],
  request: {
    body: {
      content: {
        'application/json': {
          schema: UpdateMovieSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Movie updated successfully',
      content: {
        'application/json': {
          schema: UpdateMovieResponseSchema
        }
      }
    },
    404: {
      description: 'Movie not found',
      content: {
        'application/json': {
          schema: MovieNotFoundResponseSchema
        }
      }
    },
    500: {
      description: 'Unexpected error occurred'
    }
  }
})

// Part#3: generate the OpenAPI document
const generator = new OpenApiGeneratorV31(registry.definitions)

export const openApiDoc = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    title: 'Movie API',
    version: '0.0.1',
    description: 'API for managing movies'
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Local development server'
    },
    {
      url: 'https://movie-api.example.com',
      description: 'Production server'
    }
  ]
})
