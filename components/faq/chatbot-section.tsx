"use client";

import { MessageCircle, Send } from "lucide-react";
import React, { forwardRef, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SectionTitle from '@/components/ui/section-title';
import { useAnalytics } from '@/hooks/useAnalytics';
import { cn } from "@/lib/utils";

const ChatbotSection = forwardRef<HTMLElement, {}>(
  function ChatbotSection(props, ref) {
    const { trackEvent } = useAnalytics();
    
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{role: 'user' | 'bot', message: string}[]>([
      { role: 'bot', message: "Bonjour ! Je suis l'assistant virtuel d'Éducateur péi. Comment puis-je vous aider aujourd'hui ?" }
    ]);

    const handleSendMessage = () => {
      if (!chatMessage.trim()) return;
      
      trackEvent('chatbot_message_sent', { message_length: chatMessage.length, page: 'faq' });
      
      const newMessage = { role: 'user' as const, message: chatMessage };
      setChatHistory(prev => [...prev, newMessage]);
      
      // Simulation de réponse du bot (en réalité, cela ferait appel à une API)
      setTimeout(() => {
        const botResponse = getBotResponse(chatMessage);
        setChatHistory(prev => [...prev, { role: 'bot', message: botResponse }]);
      }, 1000);
      
      setChatMessage('');
    };

    const getBotResponse = (message: string): string => {
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('rdv') || lowerMessage.includes('rendez-vous')) {
        return "Pour prendre rendez-vous, vous pouvez utiliser notre système de réservation en ligne disponible 24h/24, nous appeler au 0262 XXX XXX, ou envoyer un SMS. Souhaitez-vous que je vous dirige vers la page de réservation ?";
      }
      
      if (lowerMessage.includes('tarif') || lowerMessage.includes('prix')) {
        return "Nos tarifs commencent à 15€ pour un entretien de rencontre. Nous proposons aussi des forfaits avantageux. Voulez-vous consulter notre grille tarifaire complète ?";
      }
      
      if (lowerMessage.includes('urgence') || lowerMessage.includes('urgent')) {
        return "En cas d'urgence, vous pouvez utiliser notre service d'astreinte téléphonique. Pour les urgences vitales, contactez le 15 ou le 112. Puis-je vous renseigner sur nos services d'urgence ?";
      }
      
      return "Je comprends votre question. Pour une réponse personnalisée, je vous recommande de contacter directement notre équipe ou de consulter notre FAQ détaillée. Puis-je vous orienter vers une section spécifique ?";
    };

    return (
      <section
        ref={ref}
        id="chatbot"
        className="py-16 lg:py-20 section-bg-2"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Assistant virtuel
            </SectionTitle>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto">
              Posez votre question à notre assistant IA disponible 24h/24
            </p>
          </div>

          <Card className="bg-gradient-to-br from-background to-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-primary" />
                Chat en direct
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Historique du chat */}
              <div className="h-64 overflow-y-auto space-y-3 p-4 bg-muted/20 rounded-lg">
                {chatHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      entry.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-4 py-2 rounded-lg",
                        entry.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background border'
                      )}
                    >
                      <p className="text-sm">{entry.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input pour nouveau message */}
              <div className="flex gap-2">
                <Input
                  placeholder="Tapez votre question..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                💡 L'assistant peut vous orienter, mais seul un professionnel peut vous accompagner personnellement
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
);

export default ChatbotSection;