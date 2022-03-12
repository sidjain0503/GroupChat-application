import { useDisclosure } from  "@chakra-ui/hooks";
import UserBadgeItem from "../useAvatar/UserBadgeItem";
import UserListItem from "../useAvatar/UserListItem";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "../ChatLoading";
// import { ChatState } from "../../Context/ChatProvider";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    FormControl,
    Input,
    Box,
  } from '@chakra-ui/react'
// import axios from "axios"
import React, { useState } from "react";

const GroupChatModal = (/*{children}*/) => { 

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    // const { user, chats, setChats } = ChatState();
    
    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
          return;
        }
    
        try {
        //   const { data } = await axios.get(`/api/user?search=${search}`, config);
        //   console.log(data);
          setLoading(true);
          const config = {
            // headers: {
            //   Authorization: `Bearer ${user.token}`,
            // },
          };
          setLoading(false);
        //   setSearchResult(data);
        } catch (error) {
            toast({
              title: "Error Occured!",
              description: "Failed to Load the Search Results",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom-left",
            });
          }
        };
        const handleSubmit = async () => {
            if (!groupChatName || !selectedUsers) {
                toast({
                    title: "Please fill all the feilds",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                  });
                  return;
                }

                try {
                    const config = {
                    //   headers: {
                    //     Authorization: `Bearer ${user.token}`,
                    //   },
                    };
                    // const { data } = await axios.post(
                    //   `/api/chat/group`,
                    //   {
                    //     name: groupChatName,
                    //     users: JSON.stringify(selectedUsers.map((u) => u._id)),
                    //   },
                    //   config
                    // );
                    // setChats([data, ...chats]);
                    onClose();
                    toast({
                      title: "New Group Chat Created!",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      position: "bottom",
                    });
                  } catch (error) {
                    toast({
                      title: "Failed to Create the Chat!",
                      description: error.response.data,
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                      position: "bottom",
                    });
                  }
                };
              
            
    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
      };
    

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
          toast({
            title: "User already added",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          return;
        }
    
        setSelectedUsers([...selectedUsers, userToAdd]);
      };


    return (
 <> 
 {/*Open Modal -- children */}
    <span onClick={onOpen}><Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button></span>

    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="35 px" fontFamily="Work sans" d="flex" justifyContent="centre">
            Create Group Chat
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input placeholder="Chat Name" mb={3} onChange={(e) => setGroupChatName(e.target.value)}/>
            </FormControl>
            <FormControl>
              <Input placeholder="Add Users eg: Nupur, Ayushi, Bhagya" mb={1} onChange={(e) => handleSearch(e.target.value)}/>
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
            {/* selected Users */}
            {selectedUsers.map((/*u*/) => (
                <UserBadgeItem
                // key={u._id}
                // user={u}
                // handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
                searchResult?.map((/*user*/) => (
                    <UserListItem
                      //key={user._id}
                      //user={user}
                      //handleFunction={() => accessChat(user._id)}
                    />
                  ))
               )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' onClick={handleSubmit}>
            Create Chat
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  </>
 );
};
export default GroupChatModal;
