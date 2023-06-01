import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/TopBar";
import { Routes, Route, Outlet } from "react-router-dom";
import DashBoard from "./scenes/dashboard/DashBoard";
import SideBar from "./scenes/global/SideBar";
import Login from "./scenes/login/Login";
import LoginSucces from "./components/LoginSucces";
import NotLogin from "./components/NotLogin";
import Form from "./scenes/form/Form";
import axios from "axios";
import Contacts from "./scenes/contacts/Contacts";
import ManagerTeam from "./scenes/team/ManagerTeam";
import Kanban from "./scenes/kanban/Kanban";
import CardKanban from "./components/CardKanban/CardKanban";
import VideoPlayer from "./components/ThuatToan/VideoPlayer";
// import CheckboxInput from "./components/Input";

function Layout() {
    return (
        <div className="app">
            <SideBar />
            <main className="content">
                <TopBar />

                <Outlet></Outlet>
            </main>
        </div>
    );
}

function App() {
    // const Kanban = lazy(() => import("./scenes/kanban/Kanban"));
    const dispatch = useDispatch();

    const [theme, colorMode] = useMode();

    return (
        <>
            <VideoPlayer />
        </>
        // <ColorModeContext.Provider value={colorMode}>
        //     <ThemeProvider theme={theme}>
        //         <CssBaseline>
        //             <Suspense fallback={<h1>Loading . . .</h1>}>
        //                 <Routes>
        //                     <Route element={<LoginSucces />}>
        //                         <Route path="/" element={<Layout></Layout>}>
        //                             <Route
        //                                 path="/dashboard"
        //                                 element={<DashBoard />}
        //                             />
        //                             <Route path="/form" element={<Form />} />
        //                             <Route
        //                                 path="/contacts"
        //                                 element={<Contacts />}
        //                             />
        //                             <Route path="/" element={<ManagerTeam />} />
        //                             <Route
        //                                 path="/kanban"
        //                                 element={<Kanban />}
        //                             />
        //                         </Route>
        //                     </Route>
        //                 </Routes>
        //             </Suspense>
        //         </CssBaseline>
        //     </ThemeProvider>
        // </ColorModeContext.Provider>
    );
}

export default App;
