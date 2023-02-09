module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  mode: "jit",
  theme: {
    screens: {
      xs: { min: "280px", max: "500px" },

      md: { min: "501px", max: "1440px" },

      xl: { min: "1441px" },
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      // margin: {
      //   320: "320px",
      // },
      // width: {
      //   190: "190px",
      //   275: "275px",
      //   300: "300px",
      //   340: "340px",
      //   350: "350px",
      //   656: "656px",
      //   880: "880px",
      //   508: "508px",
      // },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        xxs: "0.2rem",
      },
      height: {
        80: "80px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      colors: {
        navBar: "#1d1e25",
        primary: "#121316",
        textBase: "#8f9091",
        primary2: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
    },
  },
  plugins: [],
};
