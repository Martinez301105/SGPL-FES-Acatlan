# SGPL · FES Acatlán, UNAM

Prototipo académico del Sistema de Gestión y Préstamo de Libros. Primera etapa: cinco interfaces con formularios HTML, diseño adaptable y navegación compartida. Elaborado con HTML5, CSS3 y JavaScript puro, sin frameworks, instalación de paquetes ni recursos externos.

## Archivos

```text
SGPL-FES-Acatlan/
├── index.html              # Portada con título, imagen y enlace a login.html
├── login.html              # Cuenta o trabajador y contraseña ficticios
├── catalogo.html           # Búsqueda por título, autor, ISBN y área académica
├── validar-usuario.html     # Consulta de identidad, estatus, adeudos y cupo
├── prestamo.html           # Captura del usuario, ejemplar y fechas
├── comprobante.html        # Consulta del comprobante por número e impresión
├── favicon.svg             # Icono local de biblioteca
├── css/
│   └── styles.css          # Estilos comunes, adaptación móvil e impresión
├── js/
│   └── app.js              # Datos ficticios y comportamiento de formularios
├── images/
│   └── biblioteca-fes-acatlan.png # Imagen local de la biblioteca
└── README.md
```

Los cinco archivos de pantalla contienen su propio HTML semántico y el mismo menú estático. Comparten CSS y JavaScript. Las rutas son relativas para funcionar dentro de un subdirectorio de GitHub Pages.

## Ejecutar con Live Server

1. Abre esta carpeta en Visual Studio Code.
2. Si ya tienes la extensión **Live Server**, haz clic derecho en `index.html` y elige **Open with Live Server**.
3. El navegador abrirá la portada con el título «Sistema de préstamo de materiales» y la imagen de la biblioteca. Selecciona **Ir al inicio de sesión** para entrar al prototipo. No se necesita compilar ni instalar dependencias del proyecto.

También puedes abrir `index.html` directamente en el navegador; para recorrer el préstamo y conservar su comprobante entre páginas se recomienda Live Server, porque las restricciones de almacenamiento de las direcciones `file://` dependen del navegador.

Si ya tienes Python, otra opción es ejecutar desde esta carpeta:

```sh
python -m http.server 5500 --bind 127.0.0.1
```

Abre `http://127.0.0.1:5500/`. Detén el servidor con Ctrl+C.

## Preparación para GitHub Pages

El código es estático y está preparado para GitHub Pages. Guardar los archivos en el repositorio no activa por sí solo el alojamiento web.

Para habilitar GitHub Pages después de subir el código:

1. Revisa y guarda los archivos mediante un commit y súbelos a la rama elegida del repositorio.
2. En GitHub, abre **Settings → Pages**.
3. Selecciona **Deploy from a branch**, la rama que contenga estos archivos (por ejemplo, `main`) y la carpeta **/(root)**.
4. Guarda la configuración y abre la dirección que GitHub proporcione cuando termine el despliegue.

No hay proceso de construcción ni backend. Las cinco páginas se pueden visitar directamente.

## Imagen de la portada

La portada conserva visible el título exacto **Sistema de préstamo de materiales**, sin redirección automática, e incluye el archivo local `images/biblioteca-fes-acatlan.png` con texto alternativo y enlace al inicio de sesión.

La fotografía corresponde al Centro de Información y Documentación de la FES Acatlán y se obtuvo de su [ficha en el Directorio del Sistema Bibliotecario de la UNAM](https://directoriosibi.dgb.unam.mx/info/4). [Archivo de origen](https://directoriosibi.dgb.unam.mx/storage/fotos/bib4.png), consultado el 26 de octubre de 2026. Crédito institucional: Dirección General de Bibliotecas y Servicios Digitales de Información, UNAM. Derechos de la imagen reservados a sus titulares; no se declara una licencia libre para la fotografía.

La imagen se sirve desde el proyecto; no requiere conectarse a la fuente externa para cargar la portada.

## Recorrido de demostración

1. **Acceso:** escribe cualquier número de cuenta o trabajador y una contraseña ficticia. Los campos deben estar completos. Al enviar, se abre el catálogo. No se autentica, no se envía la contraseña y no se guarda.
2. **Catálogo:** prueba `software`, `Sommerville`, `9786073206037` o el área `Ingeniería`. Los filtros se combinan, ignoran mayúsculas y acentos en título/autor y admiten ISBN con guiones. **Limpiar** restaura los seis libros. **Usar en préstamo** precarga el identificador del ejemplar; su disponibilidad es ilustrativa.
3. **Validación:** consulta `321000123` (Mariana López García, estatus válido) o `TRAB-042` (Daniel Rivera Torres, estatus suspendido y adeudo ficticio). Otros identificadores muestran un mensaje de usuario no encontrado. Esta consulta no autoriza ni bloquea operaciones.
4. **Préstamo:** utiliza **Cargar datos de ejemplo** o captura un usuario, un ejemplar, la fecha de solicitud y la fecha límite de devolución. El bibliotecario es opcional. **Generar comprobante de ejemplo** conserva únicamente la última captura en `sessionStorage` y abre su comprobante.
5. **Comprobante:** consulta `DEMO-2026-001` o el folio generado en la pestaña actual. Un número inexistente muestra un mensaje y oculta el comprobante anterior. **Imprimir comprobante** abre el diálogo de impresión, desde donde el navegador puede guardar un PDF.

El almacenamiento es temporal, pertenece al navegador y puede desaparecer al cerrar la pestaña. No es una base de datos ni un registro institucional. El comprobante fijo siempre está disponible aunque no exista una captura anterior. Los números generados identifican ejemplos locales y no garantizan unicidad institucional.

## Relación con el documento de referencia

Referencia consultada: `SGPL_Entrega_Definitiva.pdf`, de 24 de octubre de 2026. Se utilizó en modo de lectura y no se incorporó ni modificó en el repositorio.

- La secuencia de pantallas toma como guía la validación del usuario, el registro del préstamo y la generación del comprobante (nivel 1 y descomposiciones del nivel 2).
- Se conservan los conceptos `id_usuario`, `id_ejemplar`, `id_bibliotecario`, `fecha_solicitud`, `fecha_entrega` y `numero_prestamo`. **Fecha de entrega** significa fecha límite de devolución.
- La consulta muestra `perfil_usuario`, `estatus_usuario`, `correo_electronico`, `adeudo_pendiente`, `monto_multa`, `prestamos_activos`, `limite_libros_permitidos` y `prestamos_disponibles`.
- El comprobante incluye número de préstamo, usuario, ejemplar y devolución; además ilustra fecha/hora de confirmación y código de verificación. Solicitud y confirmación se muestran por separado. La hora de confirmación usa Ciudad de México.
- No se equiparan `id_ejemplar` y `rfid_tag`, ni `numero_prestamo` e `id_transaccion`. No se simula lectura RFID.
- El acceso y los filtros bibliográficos responden al alcance solicitado para esta etapa. Las fichas y ubicaciones del catálogo son ilustrativas; no son un inventario validado.
- Los límites, importes, estados y plazos de los ejemplos **no representan reglas institucionales confirmadas**. El anexo A deja estas definiciones pendientes de validación. La moneda del ejemplo no presupone MXN.
- La obligatoriedad de fechas en el formulario es una decisión de la interfaz de demostración para producir una vista completa; no redefine los flujos documentales.
- No se modificaron los DFD ni el Diccionario de Datos.

## Alcance y accesibilidad

- Validación HTML nativa de campos obligatorios, fechas y longitudes. Los campos de texto se recortan antes de comprobar su validez.
- Menú consistente, página actual identificada, enlace para saltar al contenido, etiquetas explícitas, navegación con teclado, foco visible y mensajes anunciados mediante regiones de estado.
- Menú desplegable en móvil; Escape lo cierra. Diseños para escritorio, tableta y teléfono; hoja de impresión específica.
- Los formularios de consulta y el catálogo requieren JavaScript. Sin JavaScript, se mantiene la navegación entre páginas y se muestra un aviso.
- No hay autenticación real, base de datos, API, envío de correo, políticas complejas de préstamo ni un mecanismo real de verificación de comprobantes.
- Todos los usuarios, saldos, existencias y operaciones son ficticios. No introduzcas datos ni credenciales reales.

## Comprobación manual

- Abrir `index.html`, verificar el título exacto «Sistema de préstamo de materiales» y la carga de la imagen local de la biblioteca; después seguir el enlace a `login.html`.
- Recorrer los cinco enlaces del menú desde cada pantalla.
- Intentar enviar vacíos los formularios de acceso, usuario, préstamo y comprobante.
- Probar búsquedas con coincidencias, sin coincidencias, por área y con ISBN con guiones.
- Consultar los dos usuarios de ejemplo y un identificador inexistente.
- Generar un préstamo y comprobar que usuario, ejemplar y fechas coincidan en el comprobante.
- Consultar un folio inexistente, recuperar el fijo y abrir la vista de impresión.
- Revisar el menú móvil, el orden de tabulación y la presentación en diferentes anchos.

## Verificación realizada en esta entrega

- Se comprobó la sintaxis de JavaScript con `node --check`, el cierre de etiquetas HTML, los identificadores únicos, las etiquetas de campos, el menú común y la existencia de todos los archivos referenciados.
- Se recorrieron en navegador el acceso, los filtros combinados del catálogo, ambos expedientes ficticios, los casos sin resultados, la captura del préstamo y la consulta de su comprobante.
- Se verificaron las cinco pantallas a 320, 390, 768 y 1366 píxeles de ancho, sin desbordamiento horizontal, y el menú desplegable móvil.
- Durante el recorrido no se detectaron errores de JavaScript en la consola. La hoja de estilos cargó en todas las pantallas.
- La compatibilidad estática con GitHub Pages se preparó mediante rutas relativas. La configuración del alojamiento en GitHub Pages es independiente del push del código.
