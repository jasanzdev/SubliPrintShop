import { WhatsAppFloat } from "@/shared/components/whatsapp-float";
import "./css/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background antialiased text-foreground font-nacelle">
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
