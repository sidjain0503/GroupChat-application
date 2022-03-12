import { Box } from '@chakra-ui/layout'
import React from 'react'
import { CloseIcon } from "@chakra-ui/icons";
// import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = (user, handleFunction, /*admin*/) => {
  return (
    <div>
       <Box
       px={2}
       py={1}
       borderRadius="lg"
       m={1}
       mb={2}
       variant="solid"
       fontSize={12}
       backgroundColor="purple"
       color="white"
    //    colorScheme="purple"
       cursor="pointer"
       onClick={handleFunction}
       >
         {/* {user.name}
         {admin === user._id && <span> (Admin)</span>} */}
         {"Nupur"}
       <CloseIcon pl={1} />
       </Box>
    </div>
  );
};

export default UserBadgeItem