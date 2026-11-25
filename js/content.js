/*
 * TEXTOS DE TARJETAS Y VENTANAS
 * -----------------------------
 * Aquí se editan los textos de Sobre mí (ventana), Docencia, Investigación y Aficiones.
 * No hace falta tocar main.js para cambiar contenido.
 *
 * Estructura de cada tarjeta:
 *   id       identificador único (sin espacios)
 *   kicker   etiqueta pequeña sobre el título
 *   title    título de la tarjeta
 *   summary  texto visible en la página (1–3 frases)
 *   button   texto del botón que abre la ventana (específico, no «Ver más»)
 *   dialog   { title, intro, sections: [{ heading, text, items: [] }], outro }
 *            Todos los campos de dialog salvo title son opcionales.
 */
window.SITE_CONTENT = {
  /* Ventana de la sección «Sobre mí» */
  about: {
    id: "forma-de-trabajar",
    button: "Ver mi forma de trabajar",
    dialog: {
      title: "Mi forma de trabajar",
      intro:
        "Tanto si preparo una práctica como si abordo una pregunta de investigación, sigo un ciclo parecido. No es un método rígido, pero me ayuda a no engañarme con resultados que solo funcionan en mi equipo.",
      sections: [
        {
          heading: "1. Programar pronto",
          text:
            "Entiendo mejor un problema cuando intento resolverlo con algo que se pueda ejecutar. Escribir código temprano saca a la luz dudas que en una pizarra pasan desapercibidas."
        },
        {
          heading: "2. Prototipar de extremo a extremo",
          text:
            "Prefiero una versión pequeña que funcione completa —de la entrada de datos al resultado— antes que una pieza perfecta aislada. Después mejoro por partes."
        },
        {
          heading: "3. Probar con datos",
          text:
            "Decido antes de mirar los resultados cómo voy a evaluar y qué contaría como fallo. Comparo con una referencia sencilla y repito las pruebas cuando cambian las condiciones."
        },
        {
          heading: "4. Documentar",
          text:
            "Apunto decisiones, configuraciones y resultados para que otra persona —o yo mismo dentro de unos meses— pueda repetir el trabajo y llegar a lo mismo. Sin eso no hay reproducibilidad."
        }
      ],
      outro:
        "Es el mismo enfoque que intento transmitir en clase: un proyecto se defiende mejor cuando se puede enseñar funcionando y explicar cómo se ha comprobado."
    }
  },

  /* Sección «Docencia» */
  teaching: [
    {
      id: "programacion-sistemas",
      kicker: "Docencia",
      title: "Programación y sistemas",
      summary:
        "Doy clase de programación y mi experiencia docente incluye programación orientada a objetos, sistemas operativos, redes e IoT. Intento que se entienda qué ocurre por debajo del código que se escribe.",
      button: "Ver cómo se relacionan estas materias",
      dialog: {
        title: "Programación, sistemas, redes e IoT",
        intro:
          "Son asignaturas distintas, pero las veo como capas de una misma pregunta: qué pasa desde que escribimos una línea de código hasta que algo ocurre en el mundo real.",
        sections: [
          {
            heading: "Programación y orientación a objetos",
            text:
              "La base: resolver problemas con código claro, organizar un programa en piezas con responsabilidades bien definidas y escribir algo que otra persona pueda leer y mantener."
          },
          {
            heading: "Sistemas operativos",
            text:
              "Lo que sucede cuando ese programa se ejecuta: procesos, memoria, concurrencia y acceso a recursos compartidos."
          },
          {
            heading: "Redes",
            text:
              "Cómo se comunican los programas entre máquinas y por qué esa comunicación falla, se retrasa o hay que protegerla."
          },
          {
            heading: "IoT: donde se juntan las tres",
            text:
              "Un dispositivo IoT es un programa que corre con recursos limitados, se comunica por red y lee el entorno a través de sensores. Es un buen lugar para ver todo lo anterior funcionando a la vez."
          }
        ]
      }
    },
    {
      id: "desarrollo-proyectos",
      kicker: "Docencia",
      title: "Desarrollo de proyectos",
      summary:
        "Imparto materias de desarrollo de proyectos y superviso y evalúo proyectos académicos. Ayudo a acotar la idea, sigo el avance y valoro el resultado, con especial atención a que cada decisión esté justificada.",
      button: "Ver el camino de la idea al prototipo",
      dialog: {
        title: "De la idea a un prototipo defendible",
        intro:
          "Mi papel no es dar la solución, sino ayudar a que el estudiante llegue a un prototipo que pueda justificar y defender ante un tribunal o un cliente.",
        sections: [
          {
            heading: "1. Acotar el problema",
            text:
              "Pasar de «quiero hacer una app de…» a un problema concreto: para quién, qué tiene que resolver y cómo sabremos si lo consigue."
          },
          {
            heading: "2. Identificar el riesgo principal",
            text:
              "Localizar la parte más incierta —técnica, de datos o de alcance— y abordarla primero, en lugar de dejarla para el final."
          },
          {
            heading: "3. Prototipar pronto",
            text:
              "Construir una primera versión que funcione aunque sea tosca. Enseñarla temprano evita semanas de trabajo en una dirección equivocada."
          },
          {
            heading: "4. Validar",
            text:
              "Probar el prototipo con datos o usuarios y medir lo que se dijo que se iba a medir, también cuando el resultado no es el esperado."
          },
          {
            heading: "5. Documentar y defender",
            text:
              "Explicar qué se hizo, qué alternativas se descartaron y por qué, y cuáles son las limitaciones. Un buen proyecto se sostiene en sus argumentos, no solo en la demo."
          }
        ],
        outro:
          "Al evaluar miro el resultado, pero también el proceso: cómo se tomaron las decisiones y si el estudiante es capaz de explicarlas."
      }
    }
  ],

  /* Sección «Investigación y tecnología»
     badge: "Investigación" para experiencia investigadora,
            "En exploración" para intereses que estoy explorando. */
  research: [
    {
      id: "ia-explicabilidad",
      kicker: "Aprendizaje automático",
      badge: "Investigación",
      title: "IA aplicada y explicabilidad",
      summary:
        "Aplico aprendizaje automático a problemas con datos reales. Me importa tanto que el modelo acierte como poder explicar por qué decide lo que decide.",
      button: "Ver preguntas sobre IA y explicabilidad",
      dialog: {
        title: "IA aplicada y explicabilidad",
        intro:
          "Un modelo con buenas métricas no es suficiente si nadie puede entender ni comprobar sus resultados. Estas son algunas de las preguntas que guían este trabajo:",
        sections: [
          {
            heading: "Preguntas de trabajo",
            items: [
              "¿Qué variables pesan de verdad en una predicción y cuáles solo aportan ruido?",
              "¿Coincide la explicación del modelo con lo que sabe alguien experto en el dominio?",
              "¿Cómo comparar modelos de forma justa: mismos datos, mismas particiones y métricas adecuadas al problema?"
            ]
          },
          {
            heading: "Validación y reproducibilidad",
            text:
              "Diseño los experimentos antes de lanzarlos, uso referencias sencillas como punto de comparación y documento el proceso para que los resultados se puedan repetir. La escritura académica es el último paso: contar con precisión qué se hizo y hasta dónde llegan las conclusiones."
          }
        ]
      }
    },
    {
      id: "transporte-inteligente",
      kicker: "Movilidad",
      badge: "Investigación",
      title: "Transporte inteligente",
      summary:
        "Trabajo con datos de vehículos y sensores para estudiar cómo puede aplicarse la inteligencia artificial a la movilidad.",
      button: "Ver líneas de investigación en movilidad",
      dialog: {
        title: "Transporte inteligente",
        intro:
          "Los datos de un vehículo cuentan mucho sobre cómo se conduce y en qué condiciones, pero llegan con ruido, huecos y desajustes entre fuentes. Buena parte del trabajo está en tratarlos bien antes de modelar.",
        sections: [
          {
            heading: "Temas",
            items: [
              "Datos de vehículos y señales de sensores como base para modelos de IA.",
              "Detección de patrones y situaciones relevantes a partir de esos datos.",
              "Calidad de los datos: sincronización entre sensores, valores perdidos y ruido."
            ]
          },
          {
            heading: "Preguntas de trabajo",
            items: [
              "¿Qué se puede inferir de forma fiable a partir de los datos de un vehículo?",
              "¿Se mantiene el rendimiento de un modelo cuando cambian las condiciones de los datos?"
            ]
          },
          {
            heading: "Rigor experimental",
            text:
              "Documentar el preprocesado y separar bien los datos de entrenamiento y de prueba es lo que permite que un resultado en movilidad sea comparable y repetible."
          }
        ]
      }
    },
    {
      id: "iot-robotica",
      kicker: "Sistemas físicos",
      badge: "Investigación",
      title: "IoT, robótica y sistemas embebidos",
      summary:
        "Me interesa el punto en el que el software tiene que leer sensores, mover un robot o funcionar en un dispositivo con pocos recursos.",
      button: "Ver temas de IoT, robótica y embebidos",
      dialog: {
        title: "IoT, robótica y sistemas embebidos",
        intro:
          "Cuando el software se conecta con el mundo físico aparecen limitaciones que no existen en un portátil: tiempo real, consumo, memoria y sensores que fallan.",
        sections: [
          {
            heading: "En mi experiencia investigadora",
            items: [
              "Integración de sensores y adquisición de datos.",
              "Aplicación de la IA a la robótica."
            ]
          },
          {
            heading: "Lo que estoy explorando",
            items: [
              "Sistemas embebidos: qué parte del procesamiento puede hacerse en el propio dispositivo.",
              "Visión por computador como forma de percibir el entorno."
            ]
          },
          {
            heading: "Preguntas de trabajo",
            items: [
              "¿Qué se procesa en el dispositivo y qué se envía a otro sistema?",
              "¿Cuánto se puede simplificar un modelo para que quepa en un hardware limitado sin perder lo importante?"
            ]
          }
        ]
      }
    },
    {
      id: "agentes-datos",
      kicker: "Tecnología",
      badge: "En exploración",
      title: "Agentes de IA y datos",
      summary:
        "Estoy explorando agentes de IA, modelos de lenguaje que se ejecutan en local y plataformas de datos. Es terreno de exploración, no una línea de investigación consolidada.",
      button: "Ver qué estoy explorando con agentes y LLM locales",
      dialog: {
        title: "Agentes de IA y datos",
        intro:
          "Es la parte más experimental de lo que hago: pruebo, comparo y saco conclusiones propias antes de llevar nada a clase o a un proyecto.",
        sections: [
          {
            heading: "Modelos de lenguaje locales",
            text:
              "Qué tareas resuelven bien sin depender de servicios externos y qué implica eso en coste, privacidad y control sobre los datos."
          },
          {
            heading: "Agentes de IA",
            text:
              "Cuándo aporta valor un agente que encadena pasos y herramientas, y cuándo basta con un script bien hecho."
          },
          {
            heading: "Plataformas de datos",
            text:
              "Cómo encajan estas herramientas con arquitecturas Big Data, que es mi especialidad de base."
          },
          {
            heading: "Cómo lo evalúo",
            text:
              "Con tareas concretas y criterios que pueda repetir, para que la comparación no dependa de una impresión puntual."
          }
        ]
      }
    }
  ],

  /* Sección «Aficiones» */
  hobbies: [
    {
      id: "japon-viajes",
      kicker: "Viajar",
      title: "Japón y viajes",
      summary:
        "Japón me atrae mucho, sobre todo su cultura popular. En general, me gusta viajar y conocer lugares nuevos.",
      button: "Leer sobre Japón y viajes",
      dialog: {
        title: "Japón y viajes",
        sections: [
          {
            text:
              "Japón ocupa un lugar especial entre mis intereses: buena parte del manga, el anime y los videojuegos que me gustan sale de allí, y su cultura popular me resulta fascinante."
          },
          {
            text:
              "Más allá de Japón, me gusta viajar: llegar a un sitio que no conozco, recorrerlo y volver con la cámara llena."
          }
        ]
      }
    },
    {
      id: "fotografia",
      kicker: "Mirar",
      title: "Fotografía",
      summary:
        "Me interesan las cámaras y fotografiar lo que encuentro cuando viajo.",
      button: "Leer sobre fotografía",
      dialog: {
        title: "Fotografía",
        sections: [
          {
            text:
              "Me gusta tanto la parte técnica —cómo funcionan las cámaras y qué cambia de una a otra— como salir a hacer fotos."
          },
          {
            text:
              "Los viajes son la mejor excusa: calles, paisajes y detalles que de otro modo pasarían de largo."
          }
        ]
      }
    },
    {
      id: "motos-restauracion",
      kicker: "Reparar",
      title: "Motos y restauración",
      summary:
        "Me gustan las motos y recuperar vehículos: desmontar, entender cada pieza y volver a ponerlos en marcha.",
      button: "Leer sobre motos y restauración",
      dialog: {
        title: "Motos y restauración",
        sections: [
          {
            text:
              "Las motos me gustan por sí mismas. La restauración es otra cosa: un trabajo lento de diagnosticar, buscar piezas, desmontar y volver a montar."
          },
          {
            text:
              "Disfruto ese proceso tanto como el resultado, y tiene algo que la pantalla no da: se trabaja con las manos."
          }
        ]
      }
    },
    {
      id: "aire-libre-cocina",
      kicker: "Salir",
      title: "Aire libre y cocina",
      summary:
        "Me gusta salir al aire libre, y casi siempre llevo la cámara conmigo. En casa, disfruto cocinando.",
      button: "Leer sobre aire libre y cocina",
      dialog: {
        title: "Aire libre y cocina",
        sections: [
          {
            text:
              "Salir al aire libre es una de mis formas favoritas de desconectar de la pantalla, y encaja de forma natural con la fotografía: paisajes, luz y rincones que solo se encuentran caminando."
          },
          {
            text:
              "Al volver, la cocina: me gusta preparar mis propias comidas y probar recetas nuevas."
          }
        ]
      }
    },
    {
      id: "videojuegos-rol-mesa",
      kicker: "Jugar",
      title: "Videojuegos, rol y mesa",
      summary:
        "Videojuegos, partidas de rol y juegos de mesa: aficiones que disfruto tanto en solitario como en grupo.",
      button: "Leer sobre videojuegos, rol y mesa",
      dialog: {
        title: "Videojuegos, rol y mesa",
        sections: [
          {
            text:
              "Algunos juegos se disfrutan a solas y otros piden gente alrededor de una mesa. Me gustan las dos cosas."
          },
          {
            text:
              "El rol y los juegos de mesa tienen además algo que valoro mucho: son una excusa estupenda para reunirse."
          }
        ]
      }
    },
    {
      id: "manga-anime-mundos",
      kicker: "Leer y ver",
      title: "Manga, anime y otros mundos",
      summary:
        "Manga, anime, libros, series y cómics. Marvel y la ciencia ficción tienen un sitio especial, igual que los parques temáticos.",
      button: "Leer sobre manga, anime y otros mundos",
      dialog: {
        title: "Manga, anime y otros mundos",
        sections: [
          {
            text:
              "Me gustan las historias en casi cualquier formato: manga, anime, libros, series y cómics."
          },
          {
            text:
              "Marvel y la ciencia ficción son de mis favoritos, y los parques temáticos son la forma de meterse un rato dentro de esos mundos."
          }
        ]
      }
    }
  ]
};
