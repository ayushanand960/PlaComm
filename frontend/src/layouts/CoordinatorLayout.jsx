// import Navbar from "../components/Navbar";
// import {Outlet} from "react-router-dom"
// export default function CoordinatorLayout() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow p-6">
//         <Outlet /> {/* page content here */}
//       </main>
//     </div>
//   );
// }


import Navbar from "../components/PlacementCoordinator/Navbar";
import { Outlet } from "react-router-dom";
import TopNavbar from "../components/PlacementCoordinator/TopNavbar";
import {Box}  from "@mui/material"



export default function CoordinatorLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh",  
   width: "100vw",overflow: "hidden" }}>
      <TopNavbar />

      <Navbar />

     
        <Box 
        component="main" 
        sx={{ flexGrow: 1, p: 3 , width: "100%", maxWidth: "100vw",
        bgcolor: "white", color: "black"}}
      
      // overflowX: "hidden", // prevent accidental scroll
       >
       {/* Dashboard content here */}
       <Outlet/>
      </Box>
    </Box>
       

      
  );
}

