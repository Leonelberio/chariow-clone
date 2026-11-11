export const chariowDesignSystem = {
  colorScheme: "light" as const,
  colors: {
    primary: "#FFCC00",
    secondary: "#94A0AF",
    accent: "#FFCC00",
    background: "#F5F6F6",
    textPrimary: "#3A3C3F",
    link: "#FFCC00",
  },
  typography: {
    fontFamilies: {
      primary: "Poppins",
      heading: "Euclid Circular B",
    },
    fontSizes: {
      h1: "16px",
      h2: "16px",
      body: "16px",
    },
  },
  spacing: {
    baseUnit: 4,
    borderRadius: "12px",
  },
  components: {
    buttonPrimary: {
      background: "#FFCC00",
      textColor: "#414349",
      borderRadius: "16px",
    },
    buttonSecondary: {
      background: "#F5F6F6",
      textColor: "#000000",
      borderRadius: "12px",
    },
  },
  images: {
    logo: "https://chariow.com/assets/logo.svg",
    favicon: "https://chariow.com/favicon.ico",
    ogImage: "https://www.chariow.com/assets/images/chariow-preview.jpg",
    logoAlt: "Chariow",
  },
  brandName:
    "Chariow • La plateforme N°1 pour vendre vos produits digitaux.",
} as const;
