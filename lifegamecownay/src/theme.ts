import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"


const config = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  cssVarsPrefix: "ck",
  globalCss: {
    "html, body": {
      margin: 0,
      p: 0,
      bg: "{colors.brand.braco}",
    },
  
    "h1, h2, h3, h4, h5, h6, p, a, ul, li": {
      fontWeight: 600,
    }
  
  },
  theme: {
    tokens: {
      colors: {
        brand:{
          branco:    { value: "#ffffee" },
          preto:     { value: "#000011" }

        },
        pri:{
          DEFAULT : { value: "{colors.brand.preto}" }
        },
        sec:{
          DEFAULT : { value: "{colors.brand.branco}" }
        }
      },
      fonts: {
        body: { value: "Quicksand, system-ui, sans-serif" },
      },
    },
    breakpoints: {
      sm: '320px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
  },
})

export const system = createSystem(defaultConfig, config)