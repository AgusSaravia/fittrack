// theme.js
import { defaultConfig, createSystem, defineConfig } from "@chakra-ui/react";
const customConfig = defineConfig({
  colors: {
    // Define tus colores personalizados aquí (opcional)
    brand: {
      500: "#4F46E5", // Ejemplo de color principal
      600: "#4338CA",
    },
  },
  components: {
    Table: {
      parts: ["caption", "thead", "tbody", "tr", "th", "td"],
      variants: {
        // Puedes crear múltiples variantes
        randomized: {
          th: {
            color: "white",
            bg: "black", // Usa el color personalizado
            borderColor: "gray.200",
          },
          td: {
            borderColor: "gray.100",
          },
        },
        striped: {
          th: {
            color: "gray.800",
            bg: "gray.50",
          },
          tbody: {
            tr: {
              "&:nth-of-type(odd)": {
                td: {
                  bg: "gray.50",
                },
              },
            },
          },
        },
      },
      // Estilos base que se aplicarán a todas las tablas
      baseStyle: {
        caption: {
          color: "gray.600",
        },
        thead: {
          th: {
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "wider",
          },
        },
        tbody: {
          tr: {
            _hover: {
              bg: "gray.100", // Color al hacer hover
            },
          },
        },
      },
    },
  },
});

const theme = createSystem(defaultConfig, customConfig);

export default theme;
