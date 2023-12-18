
import { IHash } from "@/modules/users/application/interfaces/hash.interface";

export class Argon2Hash extends IHash {

  private static instance: Argon2Hash;

  public static getInstance(): Argon2Hash {
    if(!Argon2Hash.instance) {
      Argon2Hash.instance = new Argon2Hash();
    }

    return Argon2Hash.instance;
  }

  async make(value: string): Promise<string> {
    return Bun.password.hash(value, 'argon2id');
  }
  
  async compare(value: string, hash: string): Promise<boolean> {
    return Bun.password.verify(value, hash);
  }
}