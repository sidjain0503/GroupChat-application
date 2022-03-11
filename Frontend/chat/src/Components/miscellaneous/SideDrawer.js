import React, {useState} from 'react';
import { Box, Text } from '@chakra-ui/layout';
import {Menu, MenuButton, MenuDivider, MenuItem, MenuList} from '@chakra-ui/menu';
import {Tooltip} from '@chakra-ui/tooltip';
import { Button } from '@chakra-ui/button';
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons';
import {Avatar} from '@chakra-ui/avatar';
import ProfileModal from './ProfileModal';
import { Input } from "@chakra-ui/input";
import { useDisclosure } from "@chakra-ui/hooks";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useToast } from '@chakra-ui/react';
import ChatLoading from '../ChatLoading';
import UserListItem from "../useAvatar/UserListItem";

const SideDrawer = () =>{
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const handleSearch = async() =>{ 
        if(!search){
            toast({
                    title: "Please Enter Something in Search",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "top-left",
                });
                return;
        }
        try {
            setLoading(true);
      
            const config = {
            //   headers: {
            //     Authorization: 
            //     `Bearer ${user.token}`
            //     ,
            //   },
            };
      
            //const { data } = await axios.get(`/api/user?search=${search}`, config);
      
            //setLoading(false);
            // setSearchResult(data);
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
      
    return (
    <>
        <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg='white'
        w='100%'
        p="5px 10px 5px 10px"
        borderWidth="5px">
            <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
                <Button variant="ghost" onClick={onOpen}>
                <i class="fas fa-search"></i>
                <Text d={{base:"none",md:"flex"}} px="4">
                    Search User
                </Text>
                    </Button>
                    </Tooltip>
                    <div>
                        <Menu>
                            <MenuButton p={1}>
                              <BellIcon fontSize="2xl" m={1} />  
                            </MenuButton>
                        </Menu>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                                <Avatar size='sm' cursor="pointer" name='AT'/>
                            </MenuButton>
                            <MenuList>
                            <ProfileModal>
                                <MenuItem>My Profile</MenuItem>{" "}
                                
                                </ProfileModal>
                                <MenuDivider/>
                                <MenuItem>LogOut</MenuItem>
                            </MenuList>
                        </Menu> 
                        </div>
        </Box>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
        <DrawerBody>
            <Box d="flex" pb={2}>
                <Input placeholder='Search by name or email' mr={2} value={search}
                onChange={(e) => setSearch(e.target.value)}/>
                <Button
                onClick={handleSearch}
                >Go</Button> 
                </Box>
               {loading ? (
                   <ChatLoading/>
               ):(
                searchResult?.map((/*user*/) => (
                    <UserListItem
                      //key={user._id}
                      //user={user}
                      //handleFunction={() => accessChat(user._id)}
                    />
                  ))
               )}
            
        </DrawerBody>
        </DrawerContent>
        
        </Drawer>
                        
                    
       

    </>
    );
};

export default SideDrawer;