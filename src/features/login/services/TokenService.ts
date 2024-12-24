import { jwtDecode } from "jwt-decode";
import { TokenResult } from "../../../models/Token";

export class TokenService {
  private static instanceService: TokenService | null = null;
  private readonly LOCAL_STORAGE_JWT = "ferreteriaxyz_jwt";

  private constructor() {}

  public static get instance(): TokenService {
    if (this.instanceService == null) {
      this.instanceService = new TokenService();
    }
    return this.instanceService;
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_JWT, token);
  }

  public removeToken(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_JWT);
  }

  public getSession(): TokenResult {
    const jwtString = localStorage.getItem(this.LOCAL_STORAGE_JWT);
    if (jwtString == null) throw new Error("No hay sesion");

    const decoded = jwtDecode(jwtString);
    const decodedJson = decoded as any;
    const result: TokenResult = {
      id: decodedJson.id,
      exp: decoded.exp ?? 0,
      iat: decoded.iat ?? 0,
      nbf: decoded.nbf ?? 0,
    };
    return result;
  }
}
