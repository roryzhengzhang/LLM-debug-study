import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import SignIn from "./components/Login";
import TaskDescription from "./components/TaskDescription";
import TaskBoard from "./components/TaskBoard";
import GTPage from "./components/GTPage";
import DebugTaskPage from "./components/DebugTaskPage";
import DialogAnnotationPage from "./components/DialogAnnotationPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <SignIn />,
    },
    {
        path: "/description",
        element: <TaskDescription />
    },
    {
        path: "/dashboard",
        element: <TaskBoard />
    },
    {
        path: "/gt",
        element: <GTPage />
    },
    {
        path: "/task",
        element: <DebugTaskPage />
    },
    {
        path: "/annotation",
        element: <DialogAnnotationPage />
    }
]);

export default router;