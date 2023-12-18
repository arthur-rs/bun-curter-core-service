import { randomUUID } from "crypto";

export type UserProps = {
  name: string;
  email: string;
  emailVerifiedAt?: Date;
  mobilePhone?: string;
  mobilePhoneVerifiedAt?: Date;
  password: string;
  claims?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
} 

export type UserDTO = Omit<UserProps, 'createdAt' | 'updatedAt'> & {
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  constructor(
    readonly id: string = randomUUID(),
    readonly props: UserProps
  ) {}

  public static create(dto: UserDTO, id?: string): User {
    return new User(id, {
      ...dto,
      createdAt: dto.createdAt || new Date(),
      updatedAt: dto.updatedAt || new Date()
    });
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get emailVerifiedAt(): Date | undefined {
    return this.props.emailVerifiedAt;
  }

  public get mobilePhone(): string | undefined {
    return this.props.mobilePhone;
  }

  public get mobilePhoneVerifiedAt(): Date | undefined {
    return this.props.mobilePhoneVerifiedAt;
  }

  public get password(): string {
    return this.props.password;
  }

  public get claims(): Record<string, any> | undefined {
    return this.props.claims;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  public update(props: UserDTO): User {
    return User.create({
      ...this.props,
      ...props,
      updatedAt: new Date()
    }, this.id);
  }

  public verifyEmail(): User {
    return User.create({
      ...this.props,
      emailVerifiedAt: new Date()
    }, this.id);
  }

  public verifyMobilePhone(): User {
    return User.create({
      ...this.props,
      mobilePhoneVerifiedAt: new Date()
    }, this.id);
  }

  public delete(): User {
    return User.create({
      ...this.props,
      deletedAt: new Date()
    }, this.id);
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      email_verified_at: this.emailVerifiedAt,
      mobile_phone: this.mobilePhone,
      mobile_phone_verified_at: this.mobilePhoneVerifiedAt,
      password: this.password,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      deleted_at: this.deletedAt
    }
  }
}