export class IAuthLogin {
  email: string;
  password: string;
}

export class PayloadToken {
  role: string;
  sub: string;
}

export class IUserAuth extends PayloadToken {
  iat: number;
  exp: number;
}
