"use client";
import AdminSidebar from "@/components/shared/sidebars/AdminSidebar";
import { useEffect } from "react";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
 
    return (
        <div className="flex w-full">
            <AdminSidebar />
            {children}
        </div>
    )
}

export default Layout