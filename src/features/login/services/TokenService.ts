export class TokenService{
    private static instanceService: TokenService | null = null;

    private constructor(){}

    public static get instance(): TokenService{
        if(this.instanceService ==  null){
            this.instanceService = new TokenService();
        }
        return this.instanceService;
    }

    public saveToken(token:string): void{
        localStorage.setItem("ferreteriaxyz", token);
    }

    public removeToken():void{
        localStorage.removeItem("ferreteriaxyz");
    }
}