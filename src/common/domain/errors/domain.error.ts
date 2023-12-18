export class DomainError extends Error {
  constructor(
    readonly code: string,
    readonly description: string,
    readonly statusCode: number,
    readonly errors: any
  ) {
    super(`[${statusCode}] ${code} - ${description}`);
    this.name = 'DomainError';
  }
}