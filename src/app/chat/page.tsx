"use client";

import React, { useEffect, useState, useRef } from "react";
import { EncryptionService } from "../../APIServices/ChatService/encryptionservice";
import { ChatService, Message } from "../../APIServices/ChatService/chatservice";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, LockIcon, UserPlus } from "lucide-react";

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

const Chat: React.FC<ChatProps> = ({ userId, isDoctor, otherUserId, otherUserName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [appointmentContacts, setAppointmentContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<number>(otherUserId);

  const chatServiceRef = useRef<ChatService | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchContacts = async (type: "sessions" | "appointments") => {
    try {
      const endpoint = isDoctor
        ? `/api/Chats/${type}/doctor/${userId}`
        : `/api/Chats/${type}/patient/${userId}`;

      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        const formattedContacts = data.map((contact: any) => ({
          id: isDoctor ? contact.patientId : contact.doctorId,
          name: isDoctor ? contact.patientName : contact.doctorName,
          lastActivity: type === "sessions" ? new Date(contact.lastActivity) : undefined,
          lastAppointment: type === "appointments" ? new Date(contact.lastAppointment) : undefined,
          appointmentStatus: type === "appointments" ? contact.appointmentStatus : undefined,
          unreadCount: type === "sessions" ? contact.unreadCount : undefined,
          specialization: !isDoctor ? contact.specialization : undefined,
          hasChatHistory: contact.hasChatHistory,
        }));
        type === "sessions" ? setContacts(formattedContacts) : setAppointmentContacts(formattedContacts);
      }
    } catch (error) {
      console.error(`Failed to fetch ${type} contacts:`, error);
    }
  };

  useEffect(() => {
    fetchContacts("sessions");
    fetchContacts("appointments");
  }, [userId, isDoctor]);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const encryptionService = new EncryptionService();

        const handleMessageReceived = (message: Message) => {
          setMessages((prevMessages) => {
            if (prevMessages.some((m) => m.messageId === message.messageId && message.messageId !== 0)) {
              return prevMessages;
            }
            return [...prevMessages, message];
          });
        };

        const handleConnectionEstablished = () => {
          setIsConnected(true);
          setIsLoading(false);
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
        chatServiceRef.current = chatService;

        return () => {
          chatService.stop();
        };
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setIsLoading(false);
      }
    };

    initializeChat();
    setMessages([]);
    setIsLoading(true);
    setIsConnected(false);
  }, [userId, isDoctor, selectedContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatServiceRef.current) return;

    setIsSending(true);
    const success = await chatServiceRef.current.sendMessage(newMessage);
    if (success) {
      setNewMessage("");
    }
    setIsSending(false);
  };

  const handleContactSelect = (contactId: number) => {
    setSelectedContact(contactId);
    setActiveTab("chat");
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getContactInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getActiveContactName = () => {
    const allContacts = [...contacts, ...appointmentContacts];
    const contact = allContacts.find((c) => c.id === selectedContact);
    return contact?.name || otherUserName;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[80vh] flex">
      {/* Sidebar */}
      <div className="w-1/3 border-r flex flex-col">
        <CardHeader className="p-4">
          <Tabs defaultValue="chats" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="chats">Chats</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <ScrollArea className="flex-1">
          <TabsContent value="chats" className="m-0">
            {contacts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <p>No conversations yet</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact.id)}
                  className={`p-3 flex items-center gap-3 hover:bg-muted cursor-pointer transition-colors ${
                    selectedContact === contact.id ? "bg-muted" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarFallback>{getContactInitials(contact.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{contact.name}</p>
                      {contact.lastActivity && (
                        <span className="text-xs text-muted-foreground">{formatTime(contact.lastActivity)}</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      {!isDoctor && contact.specialization && (
                        <p className="text-xs text-muted-foreground truncate">{contact.specialization}</p>
                      )}
                      {contact.unreadCount > 0 && (
                        <Badge variant="secondary" className="ml-auto">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="appointments" className="m-0">
            {appointmentContacts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <p>No appointment contacts found</p>
              </div>
            ) : (
              appointmentContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact.id)}
                  className={`p-3 flex items-center gap-3 hover:bg-muted cursor-pointer transition-colors ${
                    selectedContact === contact.id ? "bg-muted" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarFallback>{getContactInitials(contact.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{contact.name}</p>
                      {contact.lastAppointment && (
                        <span className="text-xs text-muted-foreground">{formatDate(contact.lastAppointment)}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      {!isDoctor && contact.specialization && (
                        <p className="text-xs text-muted-foreground truncate">{contact.specialization}</p>
                      )}
                      {!contact.hasChatHistory && (
                        <Badge variant="outline" className="ml-auto flex items-center gap-1">
                          <UserPlus size={12} />
                          <span className="text-xs">New</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <CardHeader className="p-4 flex flex-row items-center border-b">
          <div className="flex items-center gap-2 flex-1">
            <Avatar>
              <AvatarFallback>{getContactInitials(getActiveContactName())}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{getActiveContactName()}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <LockIcon className="h-3 w-3 mr-1" />
                <span>{isConnected ? "End-to-end encrypted" : "Connecting..."}</span>
                <span
                  className={`ml-2 w-2 h-2 rounded-full ${
                    isConnected ? "bg-green-500" : "bg-amber-500"
                  }`}
                ></span>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          {activeTab === "chat" && (
            <>
              {messages.length === 0 ? (
                <div className="my-8 mx-auto max-w-md text-center text-muted-foreground">
                  <LockIcon className="h-4 w-4 mx-auto mb-2" />
                  <p>No messages yet. Start a new conversation. All messages are end-to-end encrypted.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isOwnMessage ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.isOwnMessage ? "bg-primary text-white" : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className="text-xs opacity-70 text-right mt-1">
                          {formatTime(new Date(message.timestamp))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </ScrollArea>

        {/* Message input */}
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={!isConnected || isSending}
              className="flex-1"
            />
            <Button type="submit" disabled={!isConnected || !newMessage.trim() || isSending}>
              {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Chat;