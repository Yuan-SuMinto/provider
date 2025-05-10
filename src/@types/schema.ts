// zod key feature 1: define the schema with zod (and expand it with zod-to-poenapi)

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const CreateMovieSchema = z
  .object({
    id: z
      .number()
      .int()
      .optional()
      .openapi({ example: 1, description: 'Movie ID' }),
    name: z
      .string()
      .min(1)
      .openapi({ example: 'Interstellar', description: 'Movie name' }),
    year: z
      .number()
      .int()
      .min(1900)
      .max(2025)
      .openapi({ example: 2014, description: 'Movie year' }),
    rating: z
      .number()
      .min(0)
      .max(10)
      .openapi({ example: 9.6, description: 'Movie rating' })
  })
  .openapi('CreateMovieRequest')

export const CreateMovieRespobseSchema = z
  .object({
    status: z
      .number()
      .int()
      .openapi({ example: 200, description: 'Response status code' }),
    data: z.object({
      id: z.number().int().openapi({ example: 1, description: 'Movie ID' }),
      name: z
        .string()
        .openapi({ example: 'Interstellar', description: 'Movie name' }),
      year: z
        .number()
        .int()
        .openapi({ example: 2014, description: 'Movie year' }),
      rating: z.number().openapi({ example: 9.6, description: 'Movie rating' })
    }),
    error: z
      .string()
      .optional()
      .openapi({ description: 'Error message, if any' })
  })
  .openapi('CreateMovieResponse')

export const ConflictMovieResponseSchema = z.object({
  status: z
    .number()
    .int()
    .openapi({ example: 409, description: 'Conflict status code' }),
  error: z.string().openapi({
    example: 'Movie already exists',
    description: 'Error message'
  })
})

const movieObj = {
  id: z.number().openapi({ example: 1, description: 'Movie ID' }),
  name: z
    .string()
    .openapi({ example: 'Interstellar', description: 'Movie name' }),
  year: z.number().openapi({ example: 2014, description: 'Movie year' }),
  rating: z.number().openapi({ example: 9.6, description: 'Movie rating' })
}

export const GetMovieResponseUnionSchema = z
  .object({
    status: z
      .number()
      .int()
      .openapi({ example: 200, description: 'Response status code' }),
    data: z.union([
      z
        .object(movieObj)
        .nullable()
        .openapi({
          example: { id: 1, name: 'Interstellar', year: 2014, rating: 9.6 },
          description: 'Movie details or null if not found'
        }),
      z.array(z.object(movieObj)).openapi({
        example: [],
        description: 'List of movies or an empty array if no movies exist'
      })
    ]),
    error: z.string().nullable().optional().openapi({
      example: null,
      description: 'Error message if an error occured, otherwise null'
    })
  })
  .openapi('GetMovieResponse')

export const MovieNotFoundResponseSchema = z.object({
  status: z
    .number()
    .int()
    .openapi({ example: 404, description: 'Response status code' }),
  error: z.string().openapi({
    example: 'Movie not found',
    description: 'Error message'
  })
})

export const DeleteMovieResponseSchema = z.object({
  status: z
    .number()
    .int()
    .openapi({ example: 200, description: 'Response status code' }),
  message: z.string().openapi({
    example: 'Movie {id} has been deleted',
    description: 'Success message for the deleted movie'
  })
})

export const UpdateMovieSchema = z
  .object({
    id: z.number().optional().openapi({ example: 1, description: 'Movie ID' }),
    name: z
      .string()
      .min(1)
      .optional()
      .openapi({ example: 'Interstellar', description: 'Movie name' }),
    year: z
      .number()
      .int()
      .min(1900)
      .max(2025)
      .optional()
      .openapi({ example: 2014, description: 'Movie year' }),
    rating: z
      .number()
      .optional()
      .openapi({ example: 9.6, description: 'Movie rating' })
  })
  .openapi('UpdateMovieRequest')

export const UpdateMovieResponseSchema = z
  .object({
    status: z
      .number()
      .int()
      .openapi({ example: 200, description: 'Response status code' }),
    data: z
      .object({
        id: z.number().openapi({ example: 1, description: 'Movie ID' }),
        name: z
          .string()
          .openapi({ example: 'Interstellar', description: 'Movie name' }),
        year: z.number().openapi({ example: 2014, description: 'Movie year' }),
        rating: z
          .number()
          .openapi({ example: 9.6, description: 'Movie rating' })
      })
      .openapi('Update movie data'),
    error: z.string().nullable().optional().openapi({
      example: null,
      description: 'Error message if an error occured, otherwise null'
    })
  })
  .openapi('UpdateMovieResponse')
