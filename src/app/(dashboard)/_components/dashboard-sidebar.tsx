"use client";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  Mail,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import logo from "../../../../public/assets/images/dash_logo.png"
import LogoutModal from "@/components/modals/logout-modal";
import { useState } from "react";
import { toast } from "sonner";

const items = [
  {
    title: "Dashboard Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Category Management",
    url: "/category-management",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Users",
    url: "/manage-users",
    icon: LayoutDashboard,
  },
  {
    title: "Payments & Transactions ",
    url: "/payment-and-transactions",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Plan",
    url: "/manage-plan",
    icon: LayoutDashboard,
  },
  {
    title: "Contact Management",
    url: "/contact-management",
    icon: Mail,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },

];

export function DashboardSidebar() {
  const pathName = usePathname();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)


  const handLogout = async () => {
    try {
      toast.success("Logout successful!")
      await signOut({ callbackUrl: "/login" })
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Logout failed. Please try again.")
    }
  }

  return (
    <div>
      <Sidebar className="border-none w-[320px]">
      <SidebarContent className="bg-gradient-to-b from-[#3B82F6] to-[#1E3A8A] scrollbar-hide">
        <SidebarGroup className="p-0">
          <div className="flex flex-col justify-between min-h-screen pb-5">
            <div>
              <SidebarGroupLabel className="mt-5 mb-5 h-[80px] flex justify-center">
                <Link href={`/`}>
                  <Image
                    src={logo}
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="h-[119px] w-[200px] object-cover"
                  />
                </Link>
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-4 pt-3">
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive =
                      item.url === "/"
                        ? pathName === "/"
                        : pathName === item.url ||
                          pathName.startsWith(`${item.url}/`);

                    return (
                      <SidebarMenuItem key={item.title}  className=" pb-2">
                        <SidebarMenuButton
                          className={`h-[48px] rounded-[8px] bg-transparent hover:bg-primary hover:text-white border border-white text-base font-medium leading-normal text-white  transition-all duration-300 ${
                            isActive &&
                            "bg-primary"
                          }`}
                          asChild
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>

            <div>
              <SidebarFooter className="border-t border-gray-300">
                <button onClick={() => setLogoutModalOpen(true)} className="font-medium text-red-500 flex items-center gap-2 pl-2 mt-5">
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </SidebarFooter>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>

    {/* logout modal  */}
    <div>
      {logoutModalOpen && (
        <LogoutModal
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handLogout}
        />
      )}
    </div>
    </div>
  );
}
