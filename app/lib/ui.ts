import { createSystem } from "frog/ui";

export const {
  Box,
  Columns,
  Column,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Rows,
  Row,
  Spacer,
  Text,
  VStack,
  vars,
} = createSystem({
  colors: {
    white: "white",
    bgDark: "#1e1d1f",
    gray: "#a7a7a8",
    black: "black",
    bg: "#e8ed87",
    backg: "linear-gradient(to bottom, #000000, #202020)",
    yellow: "#ffe600",
    blue: "#0070f3",
    red: "#ff0000",
    orange: "#ffaa00",
  },
  fonts: {
    default: [
      {
        name: "Open Sans",
        source: "google",
        weight: 400,
      },
      {
        name: "Open Sans",
        source: "google",
        weight: 600,
      },
    ],

    borlow: [
      {
        name: "Barlow Condensed",
        source: "google",
      },
    ],

    press: [
      {
        name: "Press Start 2P",
        source: "google",
      },
    ],

    VT323: [
      {
        name: "VT323",
        source: "google",
      },
    ],

    bungee: [
      {
        name: "Bungee",
        source: "google",
      },
    ],
  },
});
