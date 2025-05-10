import type { z } from 'zod'

import type {
  CreateMovieSchema,
  CreateMovieRespobseSchema,
  ConflictMovieResponseSchema,
  GetMovieResponseUnionSchema,
  MovieNotFoundResponseSchema,
  DeleteMovieResponseSchema,
  UpdateMovieSchema,
  UpdateMovieResponseSchema
} from './schema'

// Zod key feature 2: use the schema to create a type

export type CreateMovieRequest = z.infer<typeof CreateMovieSchema>

export type CreateMovieResponse = z.infer<typeof CreateMovieRespobseSchema>

export type ConflictMovieResponse = z.infer<typeof ConflictMovieResponseSchema>

export type GetMovieResponseUnion = z.infer<typeof GetMovieResponseUnionSchema>

export type MovieNotFoundResponse = z.infer<typeof MovieNotFoundResponseSchema>

export type DeleteMovieResponse = z.infer<typeof DeleteMovieResponseSchema>

export type UpdateMovieRequest = z.infer<typeof UpdateMovieSchema>

export type UpdateMovieResponse = z.infer<typeof UpdateMovieResponseSchema>
