
export abstract class IHash {
  abstract make(value: string): Promise<string>;
  abstract compare(value: string, hash: string): Promise<boolean>;
}