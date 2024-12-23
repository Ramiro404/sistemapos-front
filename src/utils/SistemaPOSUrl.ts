export class Endpoint{
    public static readonly CLIENTE = process.env.REACT_APP_BASE_URL + "/Cliente";
    public static readonly PRODUCTO = process.env.REACT_APP_BASE_URL + "/Producto";
    public static readonly PEDIDO = process.env.REACT_APP_BASE_URL + "/Pedido";
    public static readonly FACTURA = process.env.REACT_APP_BASE_URL + "/Factura";
    public static readonly INICIO_SESION = process.env.REACT_APP_BASE_URL + "/InicioSesion";
    
    private constructor(){}
}