import BaseError from './baseError';

export class BadRequestError extends BaseError {}

export class DatabaseError extends BaseError {}

export class ForbiddenError extends BaseError {}

export class RowNotFoundError extends BaseError {}

export class TokenError extends BaseError {}

export class ValidationError extends BaseError {}
