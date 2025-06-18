"use client";

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
    <button
      onClick={handleWhatsAppClick}
      className="fixed block bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
    >
      <MessageCircle className="w-6 h-6 text-white text-center place-self-center" />
    </button>
  );
}
