"use client";

import React, { useEffect, useState, useRef } from "react";
import { EncryptionService } from "../../APIServices/ChatService/encryptionservice";
import { ChatService, Message } from "../../APIServices/ChatService/chatservice";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import Cookies from "js-cookie";

interface ChatProps {
  userId: number;
  isDoctor: boolean;
  otherUserId: number;
  otherUserName: string;
}

interface Contact {
  id: number;
  name: string;
  lastAppointment?: Date;
  appointmentStatus?: string;
  hasChatHistory: boolean;
}

let tempMessageIdCounter = -1;

const Chat: React.FC<ChatProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connectionState, setConnectionState] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [isSending, setIsSending] = useState(false);
  const [appointmentContacts, setAppointmentContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const chatServiceRef = useRef<ChatService | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_Base_URL;
  const userId = parseInt(Cookies.get("PersonID") || "0", 10);
  const isDoctor = Cookies.get("role") === "Doctor";
  const { toast } = useToast();
  
  // Fetch appointment contacts
  useEffect(() => {
    const fetchAppointmentContacts = async () => {
      try {
        const endpoint = isDoctor
          ? `${API_BASE}/Chats/appointments/doctor/${userId}`
          : `${API_BASE}/Chats/appointments/patient/${userId}`;

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch appointment contacts: ${response.status}`);
        }

        const data = await response.json();
        const formattedContacts = data.map((contact: any) => ({
          id: isDoctor ? contact.patientId : contact.doctorId,
          name: isDoctor ? contact.patientName : contact.doctorName,
          lastAppointment: contact.lastAppointment ? new Date(contact.lastAppointment) : undefined,
          appointmentStatus: contact.appointmentStatus,
          hasChatHistory: Boolean(contact.hasChatHistory),
        }));

        setAppointmentContacts(formattedContacts);
      } catch (error) {
        console.error("Failed to fetch appointment contacts:", error);
        setErrorMessage("Unable to load contacts. Please try again.");
        toast({
          variant: "destructive",
          title: "Error loading contacts",
          description: "Failed to fetch appointment contacts. Please refresh.",
        });
      }
    };

    fetchAppointmentContacts();
  }, [API_BASE, userId, isDoctor, toast]);

  // Initialize chat service
  useEffect(() => {
    let isMounted = true;
    setConnectionState("connecting");
    setMessages([]);
    setErrorMessage(null);

    const initializeChat = async () => {
      try {
        if (chatServiceRef.current) {
          await chatServiceRef.current.stop();
          chatServiceRef.current = null;
        }

        const encryptionService = new EncryptionService();

        const handleMessageReceived = (message: Message) => {
          if (!isMounted) return;

          setMessages((prevMessages) => {
            const pendingMessageIndex = prevMessages.findIndex(
              (m) =>
                m.messageId < 0 &&
                m.isOwnMessage &&
                message.isOwnMessage &&
                m.content === message.content
            );

            if (pendingMessageIndex >= 0) {
              const newMessages = [...prevMessages];
              newMessages[pendingMessageIndex] = {
                ...message,
                timestamp: message.timestamp || new Date(),
              };
              return newMessages;
            }

            if (message.messageId > 0 && prevMessages.some((m) => m.messageId === message.messageId)) {
              return prevMessages;
            }

            const newMessage = {
              ...message,
              timestamp: message.timestamp || new Date(),
            };

            return [...prevMessages, newMessage];
          });
        };

        const handleConnectionEstablished = () => {
          setConnectionState("connected");
        };

        const chatService = new ChatService(
          encryptionService,
          userId,
          isDoctor,
          selectedContact?.id || 0,
          handleMessageReceived,
          handleConnectionEstablished
        );
        console.log(chatService);

        await chatService.start();

        if (isMounted) {
          chatServiceRef.current = chatService;
        } else {
          await chatService.stop();
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to initialize chat:", error);
          setConnectionState("disconnected");
          setErrorMessage("Failed to connect. Please try again.");
          toast({
            variant: "destructive",
            title: "Connection Error",
            description: "Failed to establish secure connection. Click to retry.",
            action: (
              <Button onClick={initializeChat} variant="outline">
                Retry
              </Button>
            ),
          });
        }
      }
    };

    initializeChat();

    return () => {
      isMounted = false;
      if (chatServiceRef.current) {
        chatServiceRef.current.stop().catch((e) => console.error("Error stopping chat service:", e));
      }
    };
  }, [userId, isDoctor, selectedContact, toast]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Attempting to send message:", newMessage);

    if (!newMessage.trim()) {
      console.error("Message is empty. Cannot send.");
      return;
    }

    if (!chatServiceRef.current) {
      console.error("ChatService is not initialized.");
      return;
    }

    if (connectionState !== "connected") {
      console.error("Connection is not established. Current state:", connectionState);
      return;
    }

    const messageContent = newMessage.trim();
    setNewMessage("");
    setIsSending(true);

    const tempMessageId = tempMessageIdCounter--;
    const tempMessage: Message = {
      senderId: userId,
      isSenderDoctor: isDoctor,
      content: messageContent,
      messageId: tempMessageId,
      isOwnMessage: true,
      timestamp: new Date(),
    };

    console.log("Adding temporary message to UI:", tempMessage);
    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    try {
      console.log("Sending message via ChatService:", messageContent);
      const success = await chatServiceRef.current.sendMessage(messageContent);

      if (!success) {
        console.error("Message failed to send.");
        toast({
          variant: "destructive",
          title: "Message not sent",
          description: "Failed to send message. Tap to retry.",
        });
      } else {
        console.log("Message sent successfully.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[80vh] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r flex flex-col">
        <CardHeader className="p-4">
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid grid-cols-1 w-full">
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            <TabsContent value="appointments" className="m-0">
              <ScrollArea className="h-[calc(80vh-120px)]">
                {appointmentContacts.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No appointment contacts found</p>
                  </div>
                ) : (
                  appointmentContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-3 flex items-center gap-3 hover:bg-muted cursor-pointer transition-colors ${
                        selectedContact?.id === contact.id ? "bg-muted" : ""
                      }`}
                    >
                      <Avatar>
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-medium truncate">{contact.name}</p>
                          {contact.appointmentStatus && (
                            <Badge variant="secondary" className="ml-auto">
                              {contact.appointmentStatus}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <CardHeader className="p-4 flex flex-row items-center border-b">
          <h3 className="font-medium">{selectedContact?.name || "Select a contact"}</h3>
        </CardHeader>

        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div key={message.messageId} className="flex">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-muted">
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={isSending}
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim() || isSending || connectionState !== "connected"}>
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Chat;