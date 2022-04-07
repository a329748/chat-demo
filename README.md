# chat-demo
Ejemplo de implementación del chat con RabbitMQ

## Integrantes

> 329610  Luis Fernando Félix Mata

> 329748  Julián Terán Vázquez

### Descripción
En este proyecto, se ha elaborado un ejemplo de un servicio de salas de chat utilizando RabbitMQ, un software de intermediación de mensajes de código abierto que implementa el Protocolo de Cola de Mensajes Avanzado (AMQP).

### Instrucciones

1. Crear un contenedor de docker con la imagen rabbitmq:3-management.

```docker run -dti -P --hostname=rabbit --name=rabbit -e RABBITMQ_DEFAULT_USER=jay -e RABBITMQ_DEFAULT_PASS=1234 rabbitmq:3-management```

El comando anterior levanta un contenedor con la imagen rabbitmq:3-management y pasa los parámetros ```RABBITMQ_DEFAULT_USER``` y ```RABBITMQ_DEFAULT_PASS```, utilizados para acceder a la pantalla de gestión de RabbitMQ.

2. Obtener los puertos asignados al contenedor, principalmente los correspondientes a los puertos 5672 y 15672 de nuestra instancia de RabbitMQ.
   
El puerto 5672 será el host para nuestras conexiones, mientras que el 15672 permitirá el acceso a la página de gestión.

3. Descargar el repositorio y ejecutar el comando ```npm install```.

4. Reemplazar el puerto del método ```amqp.connect()``` del archivo ```main.js``` por el puerto asignado por el contenedor de Docker al ser levantado.

5. Ejecutar el comando ```node main.js``` en el directorio en el que el repositorio haya sido descargado.

6. A continuación, se muestran los comandos disponibles para utilizar en nuestro servicio de chatrooms:

***

> /rooms ................................... Displays existing chatrooms.

> /create [name] .................... Create a new chatroom.
  
> /send [name] ....................... Send messages to an existing chatroom.
  
> /read [name] ........................ Read a chatroom's messages.
  
> /disconnect ........................... Disconnect from a chatroom.
  
> /exit .......................................... Exit chat.

***

El comando ```/rooms``` muestra las salas de chat creadas durante la sesión.

El comando ```/create [name]``` crea una nueva sala de chat en la sesión con el nombre asignado.

El comando ```/send [name]``` permite enviar mensajes a la sala de chat designada.

El comando ```/read [name]``` permite recibir mensajes de la sala de chat designada.

El comando ```/disconnect``` termina la conexión con la sala de chat activa.

El comando ```/exit``` termina la ejecución del servicio de salas de chat.
<br>
<br>
## Imágenes de demostración

![2022-04-06 21_12_53-Command Prompt - node  main js](https://user-images.githubusercontent.com/74891082/162113088-0dbfbebb-e45a-455b-a55c-cf064716923d.png)

![2022-04-06 21_13_27-Command Prompt - node  main js](https://user-images.githubusercontent.com/74891082/162113095-3fbdab19-07e6-4366-ab6b-c5e0c7f2bd3a.png)

![2022-04-06 21_14_03-RabbitMQ Management — Mozilla Firefox](https://user-images.githubusercontent.com/74891082/162113102-192afbf5-e0cb-482f-8256-039394f8b34f.png)

