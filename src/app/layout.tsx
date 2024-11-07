import RoochDappProvider from "./rooch-dapp-provider";
import { createTheme, MantineProvider } from "@mantine/core";
import "@fontsource/ibm-plex-sans/200.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@mantine/core/styles.css";

type Props = {
  children: React.ReactNode;
};

const theme = createTheme({
  fontFamily: "IBM Plex Sans, sans-serif",
  colors: {
    growBTC: [
      "#fff6e1",
      "#ffebcb",
      "#ffd69a",
      "#ffbf64",
      "#ffab37",
      "#ff9f1b",
      "#ff9909",
      "#e38400",
      "#cb7500",
      "#b06400",
    ],
  },
  primaryColor: "growBTC",
  primaryShade: 6,
});

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <title>Grow Bitcoin</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
      <link rel="shortcut icon" href="/favicon.svg" />
      <body>
        <MantineProvider theme={theme}>
          <RoochDappProvider>{children}</RoochDappProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
