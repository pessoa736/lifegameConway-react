import { Provider } from "lgc/components/ui/provider";
import {system} from "lgc/theme";

export default function RootLayout(props: { children: React.ReactNode }) {
  const children = props?.children 
  return (
    <html suppressHydrationWarning>
      <body >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
