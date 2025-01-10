// project import

// types
import { NavItemType } from "@/components/types/menu";
import { bookingsNav, roomsNav, usersNav } from "./main";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [bookingsNav, roomsNav, usersNav],
};

export default menuItems;
