/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  /* important: "#root", ใช้injectFirstแทนแล้ว*/
  /*ใส่ css variable ในส่วนfontsizeเพิ่ม*/
  theme: {
    extend: {
      colors: {
        primaryGray1: "#3A3B46",
        primaryGray2: "#5B5D6F",
        primaryGray3: "#7B7E8F",
        primaryGray4: "#AEB1C3",
        primaryGray5: "#DCDFED",
        primaryGray6: "#F6F6F9",
        primaryOrange1: "#E44A0C",
        primaryOrange2: "#FF7037",
        primaryOrange3: "#FF986F",
        primaryOrange4: "#FFB899",
        primaryOrange5: "#FFD5C2",
        primaryOrange6: "#FFF1EC",
        secondaryYellow1: "#FFCA62",
        secondaryYellow2: "#FFF5EC",
        secondaryBlue1: "#76D0FC",
        secondaryBlue2: "#ECFBFF",
        secondaryGreen1: "#1CCD83",
        secondaryGreen2: "#E7FDF4",
        secondaryPink1: "#FABAC0",
        secondaryPink2: "#FFF0F1",
        secondaryEtc1: "#000000",
        secondaryEtc2: "#F6F6F9",
        secondaryEtc3: "#EA1010",
      },
    },
  },
  plugins: [],
};
