import {Box} from '@chakra-ui/layout';
import SideDrawer from '../Components/miscellaneous/SideDrawer.js';
import MyChats from '../Components/MyChats.js';
import ChatBox from '../Components/ChatBox.js';
const ChatPage = () =>{
    return <div style={{width:"100%" }}>
        <SideDrawer/>
        <Box
        d="flex"
        justifyContent='space-between'
        w='100%'
        h='91.5vh'
        p='10px'
        bg="steelblue">
        <MyChats/>
        <ChatBox/>
        </Box>

    </div>
};

export default ChatPage;