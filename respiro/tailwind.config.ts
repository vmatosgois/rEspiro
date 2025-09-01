// src/tailwind.config.ts

import type { Config } from 'tailwindcss'

// Importa o plugin de animação diretamente
import animatePlugin from 'tailwindcss-animate'

const config = {
  darkMode: 'class',
  content: [
    // Caminho corrigido e simplificado para projetos com a pasta 'src'
    './src/**/*.{ts,tsx}', 
  ],
  theme: {
    // A seção 'container' permanece a mesma
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // A seção 'extend' agora contém apenas o que não é cor
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // Plugins são importados e adicionados diretamente
  plugins: [animatePlugin],
} satisfies Config

export default config