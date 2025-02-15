# Controle Financeiro




## Descripción del Proyecto
"Controle Financeiro" es una aplicación móvil desarrollada en React Native que permite a los usuarios gestionar sus gastos e ingresos de manera eficiente. La aplicación ofrece una interfaz intuitiva y funcionalidades avanzadas para ayudar a los usuarios a tomar decisiones financieras informadas.

## Tecnologías Utilizadas
- **React Native:** Framework principal para el desarrollo de aplicaciones móviles.
- **Firebase:** Para la autenticación de usuarios y almacenamiento en la nube.
- **Cloudinary:** Para la gestión y almacenamiento de imágenes.
- **Redux:** Para la gestión del estado de la aplicación.
- **Axios:** Para realizar solicitudes HTTP.

## Estructura del Proyecto

### Modularización
La aplicación está estructurada en módulos, cada uno responsable de una funcionalidad específica. Esto facilita el mantenimiento y la escalabilidad del código. La estructura básica es la siguiente:

/src
/components          # Componentes reutilizables
/screens             # Pantallas de la aplicación
/redux              # Estado global y acciones
/services           # Servicios de API y lógica de negocio
/assets             # Imágenes y otros recursos


### Componentes Reutilizables
Se han creado varios componentes reutilizables para optimizar el desarrollo y la consistencia de la interfaz. Algunos ejemplos incluyen:

- **Button:** Componente de botón personalizable.
- **InputField:** Campo de entrada con validaciones.
- **Header:** Encabezado común para todas las pantallas.

## Datos Almacenados
Los datos se almacenan en Firebase Firestore, lo que permite una sincronización en tiempo real y un acceso rápido. Los tipos de datos incluyen:

- **Transacciones:** Registros de ingresos y gastos.
- **Usuarios:** Información de autenticación y perfil.
- **Categorías:** Clasificación de gastos e ingresos.

## Integración con Firebase
La aplicación utiliza Firebase para:

- **Autenticación:** Registro y inicio de sesión de usuarios.
- **Base de Datos:** Almacenamiento de datos de transacciones y usuarios.

## Integración con Cloudinary
Cloudinary se utiliza para almacenar y gestionar imágenes de perfil y otros recursos visuales de manera eficiente. Esto permite una carga rápida y una gestión sencilla de los activos multimedia.

## Instalación
Para instalar y ejecutar la aplicación localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/controle-financeiro.git
   cd controle-financeiro
2 .npm install

3.npm start
