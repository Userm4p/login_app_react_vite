# Login App React + Vite

Una aplicación de login moderna construida con React, TypeScript y Vite, que incluye autenticación, gestión de perfiles de usuario y una interfaz responsive.

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router DOM** - Enrutamiento de la aplicación

### Librerías de Testing
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes React
- **ts-jest** - Preset de Jest para TypeScript

### Herramientas de Desarrollo
- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **SWC** - Compilador rápido de JavaScript/TypeScript

## 📁 Estructura del Proyecto

```
src/
├── common/                 # Código compartido
│   ├── api/              # Cliente API y servicios
│   ├── components/       # Componentes reutilizables
│   ├── config/          # Configuraciones
│   ├── context/         # Contextos de React
│   ├── helpers/         # Funciones auxiliares
│   ├── router/          # Configuración de rutas
│   └── types/           # Tipos TypeScript
├── views/                # Páginas de la aplicación
│   ├── Login/           # Vista de login
│   └── UserProfile/     # Vista de perfil de usuario
├── assets/              # Recursos estáticos
├── resources/           # Recursos de internacionalización
└── __mocks__/          # Mocks para testing
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- **Node.js** versión 18 o superior
- **npm** o **yarn** como gestor de paquetes

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd login_app_react_vite
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   VITE_API_URL=http://localhost:3000/api
   ```

## 🚀 Comandos Disponibles

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

### Testing
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con coverage
npm test -- --coverage

# Ejecutar tests en modo watch
npm test -- --watch
```

### Calidad de Código
```bash
# Linting del código
npm run lint

# Formatear código con Prettier
npm run format
```

## 🧪 Testing

El proyecto utiliza Jest como framework de testing principal con las siguientes características:

- **Configuración de Jest** en `jest.config.ts`
- **Entorno jsdom** para simular el DOM del navegador
- **Mocks automáticos** para módulos externos
- **Coverage de código** configurado

### Ejecutar Tests Específicos
```bash
# Test de un archivo específico
npm test -- src/views/Login/useLogin.test.tsx

# Test de una carpeta específica
npm test -- src/views/Login/

# Test con filtro por nombre
npm test -- --testNamePattern="maneja errores 401"
```

## 🔧 Configuración

### TypeScript
- **tsconfig.json** - Configuración principal
- **tsconfig.app.json** - Configuración para la aplicación
- **tsconfig.jest.json** - Configuración para Jest

### Vite
- **vite.config.ts** - Configuración de Vite con plugin React SWC

### ESLint
- **eslint.config.js** - Configuración de ESLint con reglas TypeScript

## 🌐 Características de la Aplicación

- **Autenticación de usuarios** con manejo de tokens
- **Gestión de perfiles** con edición de información
- **Subida de fotos** de perfil
- **Rutas protegidas** para usuarios autenticados
- **Internacionalización** con i18next
- **Diseño responsive** con Tailwind CSS
- **Manejo de errores** centralizado
- **Interceptores de API** para manejo automático de errores 401

## 📱 Componentes Principales

- **Layout** - Estructura principal de la aplicación
- **Header** - Navegación y información del usuario
- **Login** - Formulario de autenticación
- **UserProfile** - Gestión del perfil del usuario
- **Modales** - Para edición de información y subida de fotos

## 🔒 Seguridad

- **Tokens de autenticación** almacenados en localStorage
- **Interceptores de API** para renovación automática de tokens
- **Rutas protegidas** que requieren autenticación
- **Manejo de errores 401** con logout automático

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

El comando generará una carpeta `dist/` con los archivos optimizados para producción.

### Servidor de Vista Previa
```bash
npm run preview
```

Permite probar la build de producción localmente antes del despliegue.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.
