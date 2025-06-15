import { Provider } from "lgc/components/ui/provider";

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
