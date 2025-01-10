// third-party
import { FormattedMessage } from "react-intl";

// assets
import ChromeOutlined from "@ant-design/icons/ChromeOutlined";

// type
import { NavItemType } from "@/types/menu";

// icons
const icons = { ChromeOutlined };

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

export const usersNav: NavItemType = {
  id: "users",
  title: <FormattedMessage id="users" />,
  type: "group",
  url: "/users",
  icon: icons.ChromeOutlined,
};

export const roomsNav: NavItemType = {
  id: "rooms",
  title: <FormattedMessage id="rooms" />,
  type: "group",
  url: "/rooms",
  icon: icons.ChromeOutlined,
};

export const bookingsNav: NavItemType = {
  id: "bookings",
  title: <FormattedMessage id="bookings" />,
  type: "group",
  url: "/bookings",
  icon: icons.ChromeOutlined,
};
