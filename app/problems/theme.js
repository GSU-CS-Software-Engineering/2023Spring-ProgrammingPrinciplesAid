import { extendTheme, theme } from "@chakra-ui/react";

const colors = {
  "main-bg": "#132257",

  "white-text": "#E8E8EA",
  "subtle-text": "#9B9B9B",

  "column-bg": "#16181D",
  "column-header-bg": "#1A1D23",

  "card-bg": "#242731",
  "card-border": "#2D313E"
};

const fonts = {
  heading: "Poppins",
  body: "Poppins",
};

const container1 = {
  "background-color": "gray",
  "width":"15%",
  "height":"78%",
  "margin":"0 auto",
  "position":"fixed",
  "bottom": "0",
  "background-size":"5px solid black",
  "z-index":"1000"
};


export default extendTheme({
  ...theme,
  colors,
  fonts,
  container1
});
