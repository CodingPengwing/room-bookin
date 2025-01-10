// project import
import samplePage from "./sample-page";
import other from "./other";
import pages from "./pages";

// types
import { NavItemType } from "@/components/types/menu";
import { bookingsNav, roomsNav, usersNav } from "./main";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [bookingsNav, roomsNav, usersNav, pages, other],
};

export default menuItems;
