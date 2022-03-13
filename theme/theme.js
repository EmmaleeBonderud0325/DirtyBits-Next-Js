import { extendTheme } from "@chakra-ui/react";
import { colors } from "constants/colors";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: colors.primary,
    },
  },
});

export default theme;
