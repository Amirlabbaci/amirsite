import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const RoutLayout = () => {
    return ( 
        <Box>
            <Outlet />
        </Box>
     );
}
 
export default RoutLayout;