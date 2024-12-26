# Sistema de punto de venta de Ferreteria XYZ

## Iniciar proyecto

En el directorio del proyecto, ejecuta el siguiente comando:

### `npm start`

El proyecto se ejecuta en el puerto 3000.\
Abre [http://localhost:3000](http://localhost:3000) para visualizarlo en tu navegador.

# Ferreteria XYZ

La aplicacion consiste en un sistema de punto de venta que permite gestinar usuarios, clientes, productos y realizar pedidos.

A continuacion se enlistan las funcionalidades del sistema.

## Inicio de sesion

En la primer pantalla aparecera un formulario con los campos de "Usuario" y "Password" los cuales deben ser llenados adecuadamente. Al finalizar se debe hacer click en el boton "Ingresar" para acceder al sistema.

## Panel

En esta pagina se podra visualizar una barra de navegacion con las siguientes opciones: usuario, producto, pedido y facturar.

Para acceder a cada seccion se debe hacer click en el nombre correspondiente.

## Usuario

En esta seccion nos encontramos con opciones para gestionar usuarios en el sistema. El menu de navegacion cuenta con las siguientes secciones: crear nuevo usuario, modificar usuario, eliminar usuario y regresar a inicio.

Para acceder a su respectiva pagina es necesario hacer click en el nombre correspondiente.

### Crear nuevo usuario

Esta pagina muestra un formulario para crear un nuevo usuario con los siguientes campos: 

* Nombre, nombre del usuario ,de tipo texto
* Apellido paterno, apellido paterno del usuario,de tipo texto
* Apellido materno, apellido materno del usuario, de tipo texto
* Usuario, nombre de usuario para ingresar al sistema,de tipo texto
* Password, contrasena del usuario para ingresar al sistema, de tipo texto
* Hora entrada, hora de entrada laboral del usuario ,de tipo tiempo
* Hora salida, hora de salida laboral del usuario,de tipo tiempo


## Factura

Esta seccion trata sobre las facturas de los pedidos correspondientes a un cliente.

### Imprimir factura

Muestra una tabla con las siguientes columnas:
* (#) representa el numero de la fila 
* Numero de documento, representa el folio del documento 
* Unidades, representa la cantidad total de productos del pedido 
* Fecha, representa la fecha de facturacion
* ---, muestra el boton de imprimir la factura en formato pdf







