import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddEmployee from "./components/AddEmployee";
import UserList from "./components/UserList";

export default function AppRoutes() {
    const loginRoutes = (
        <Route path="add">
        <Route index element={<AddEmployee/>} />
      </Route>
    );
    return (
        <Routes>


            <Route path="*" element={<UserList />} />

            <Route path="/" element={<UserList />} />

            {loginRoutes}
            <Route path="/add" element={<Navigate to={"/add"} />} />
        </Routes>
      );


}