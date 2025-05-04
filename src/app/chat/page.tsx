"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { EncryptionService } from "../../APIServices/ChatService/encryptionservice";
import { ChatService, Message } from "../../APIServices/ChatService/chatservice";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, Lock, UserPlus, AlertCircle, RefreshCw } from "lucide-react";
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
  lastActivity?: Date;
  lastAppointment?: Date;
  appointmentStatus?: string;
  hasChatHistory: boolean;
  specialization?: string;
  unreadCount?: number;
}

let tempMessageIdCounter = -1;

const Chat: React.FC<ChatProps> = ({ userId, isDoctor, otherUserId, otherUserName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connectionState, setConnectionState] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [appointmentContacts, setAppointmentContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<number>(otherUserId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedMessages, setFailedMessages] = useState<Set<number>>(new Set());

  const chatServiceRef = useRef<ChatService | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const shouldScrollToBottomRef = useRef<boolean>(true);
  const API_BASE = process.env.NEXT_PUBLIC_API_Base_URL;
  userId = parseInt(Cookies.get("PersonID") || "0", 10);
  isDoctor = Cookies.get("role") === "Doctor" ? true : false;
  const { toast } = useToast();

  const fetchContacts = useCallback(async (type: "sessions" | "appointments") => {
    try {
      setErrorMessage(null);
      const endpoint = isDoctor
        ? `${API_BASE}/Chats/${type}/doctor/${userId}`
        : `${API_BASE}/Chats/${type}/patient/${userId}`;

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} contacts: ${response.status}`);
      }

      const data = await response.json();
      const formattedContacts = data.map((contact: any) => ({
        id: isDoctor ? contact.patientId : contact.doctorId,
        name: isDoctor ? contact.patientName : contact.doctorName,
        lastActivity: type === "sessions" && contact.lastActivity ? new Date(contact.lastActivity) : undefined,
        lastAppointment: type === "appointments" && contact.lastAppointment ? new Date(contact.lastAppointment) : undefined,
        appointmentStatus: type === "appointments" ? contact.appointmentStatus : undefined,
        unreadCount: type === "sessions" ? contact.unreadCount : undefined,
        specialization: !isDoctor ? contact.specialization : undefined,
        hasChatHistory: Boolean(contact.hasChatHistory),
      }));

      if (type === "sessions") {
        setContacts(formattedContacts);
        console.log("Fetched session contacts:", formattedContacts);
      } else {
        setAppointmentContacts(formattedContacts);
        console.log("Fetched appointment contacts:", formattedContacts);
      }
    } catch (error) {
      console.error(`Failed to fetch ${type} contacts:`, error);
      setErrorMessage(`Unable to load contacts. Please try again.`);
      toast({
        variant: "destructive",
        title: "Error loading contacts",
        description: `Failed to fetch ${type} contacts. Please refresh.`,
      });
    }
  }, [API_BASE, userId, isDoctor, toast]);

  useEffect(() => {
    fetchContacts("sessions");
    fetchContacts("appointments");
  }, [fetchContacts]);

  useEffect(() => {
    let isMounted = true;
    setConnectionState("connecting");
    setMessages([]);
    setFailedMessages(new Set());
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
          if (!isMounted) return;
          setConnectionState("connected");
        };

        const chatService = new ChatService(
          encryptionService,
          userId,
          isDoctor,
          selectedContact,
          handleMessageReceived,
          handleConnectionEstablished
        );

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

  useEffect(() => {
    if (shouldScrollToBottomRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatServiceRef.current || connectionState !== "connected") return;

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

    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    try {
      const success = await chatServiceRef.current.sendMessage(messageContent);

      if (!success) {
        setFailedMessages((prev) => new Set(prev).add(tempMessageId));
        toast({
          variant: "destructive",
          title: "Message not sent",
          description: "Failed to send message. Tap to retry.",
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRetryMessage(tempMessageId, messageContent)}
            >
              <RefreshCw className="h-4 w-4 mr-1" /> Retry
            </Button>
          ),
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setFailedMessages((prev) => new Set(prev).add(tempMessageId));
    } finally {
      setIsSending(false);
    }
  };

  const handleRetryMessage = async (messageId: number, content: string) => {
    if (!chatServiceRef.current || connectionState !== "connected") {
      toast({
        variant: "destructive",
        title: "Not connected",
        description: "Please wait until connection is established.",
      });
      return;
    }

    try {
      const success = await chatServiceRef.current.sendMessage(content);

      if (success) {
        setFailedMessages((prev) => {
          const newSet = new Set(prev);
          newSet.delete(messageId);
          return newSet;
        });
      } else {
        toast({
          variant: "destructive",
          title: "Retry failed",
          description: "Could not send message. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error retrying message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[80vh] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r flex flex-col">
        <CardHeader className="p-4">
          <Tabs defaultValue="chats" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            <TabsContent value="chats" className="m-0">
              <ScrollArea className="h-[calc(80vh-120px)]">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`p-3 flex items-center gap-3 hover:bg-muted cursor-pointer transition-colors ${
                      selectedContact === contact.id ? "bg-muted" : ""
                    }`}
                  >
                    <Avatar>
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{contact.name}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
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
                      onClick={() => setSelectedContact(contact.id)}
                      className={`p-3 flex items-center gap-3 hover:bg-muted cursor-pointer transition-colors ${
                        selectedContact === contact.id ? "bg-muted" : ""
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
          <h3 className="font-medium">{otherUserName}</h3>
        </CardHeader>

        <ScrollArea className="flex-1 p-4" ref={messageContainerRef}>
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
            <Button type="submit" disabled={!newMessage.trim() || isSending}>
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Chat;