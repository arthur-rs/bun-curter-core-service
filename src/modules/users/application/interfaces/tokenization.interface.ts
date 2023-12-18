export type GenerateTokenDTO = {
  name: string;
  userId: string;
  claims?: Record<string, any>;
}

export abstract class ITokenization {
  abstract generateToken(dto: GenerateTokenDTO): Promise<string>;
  abstract verifyToken(token: string): Promise<string>;
}