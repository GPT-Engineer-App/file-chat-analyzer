import React, { useState } from "react";
import { Box, Button, Container, Input, VStack, Textarea, useToast } from "@chakra-ui/react";
import { FaUpload, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // TODO: Upload to backend and process
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    // TODO: Implement the upload functionality
    toast({
      title: "File uploaded",
      description: "Your file has been uploaded and is being analyzed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // TODO: Send message to backend and receive response
      const newMessages = [...messages, { text: message, sender: "user" }];
      setMessages(newMessages);
      setMessage("");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Box>
          <Input type="file" accept=".txt,.pdf,.docx" onChange={handleFileChange} />
          <Button leftIcon={<FaUpload />} colorScheme="blue" onClick={handleUpload}>
            Upload
          </Button>
        </Box>
        <Box w="100%" bg="gray.100" p={4} borderRadius="md">
          {messages.map((msg, index) => (
            <Box key={index} bg={msg.sender === "user" ? "blue.100" : "green.100"} p={2} borderRadius="md" my={2}>
              {msg.text}
            </Box>
          ))}
        </Box>
        <Box w="100%">
          <Textarea placeholder="Type your message here..." value={message} onChange={handleMessageChange} />
          <Button rightIcon={<FaPaperPlane />} colorScheme="blue" onClick={handleSendMessage} isDisabled={!message.trim()}>
            Send
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
