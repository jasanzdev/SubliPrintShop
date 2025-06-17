"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+59892560132";
    const message =
      "¡Hola! Me interesa conocer más sobre sus servicios de personalización.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
      size="sm"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  );
}
