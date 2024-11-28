import React, { useContext, useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Chip,
  Button,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  CalendarIcon,
  GiftIcon,
  ArchiveBoxIcon,
  ClipboardDocumentCheckIcon,
  MegaphoneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";

const Sidebar = () => {
  const { ticket } = useContext(AppContext);
  const [isCollapsed, setIsCollapsed] = useState(false); // Controls sidebar visibility

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Card
        className={`h-full flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-[4rem]" : "w-[16rem]"
        } bg-white shadow-lg fixed`}
      >
        {/* Header with Toggle Button */}
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <img src="/img/sklogo.png" alt="Logo" className="h-auto w-44" />
          )}
          <Button
            onClick={toggleSidebar}
            variant="text"
            className="p-1 rounded-full"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-6 h-6" />
            ) : (
              <ChevronLeftIcon className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Menu List */}
        <List className="flex-grow">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="w-6 h-6" />
            </ListItemPrefix>
            {!isCollapsed && <Link to="/admin/dashboard/analytics">Analytics</Link>}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="w-6 h-6" />
            </ListItemPrefix>
            {!isCollapsed && <Link to="/admin/dashboard/user-tables">Youth Profiles</Link>}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <MegaphoneIcon className="w-6 h-6" />
            </ListItemPrefix>
            {!isCollapsed && <Link to="/admin/dashboard/announcement">Announcement</Link>}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <CalendarIcon className="w-6 h-6" />
            </ListItemPrefix>
            {!isCollapsed && <Link to="/admin/dashboard/calendars">Calendar</Link>}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <GiftIcon className="w-6 h-6" />
            </ListItemPrefix>
            {!isCollapsed && <Link to="/admin/dashboard/avail-rewards">Rewards</Link>}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ClipboardDocumentCheckIcon className="w-6 h-6" />
            </ListItemPrefix>
            {!isCollapsed && <Link to="/admin/dashboard/task">Task Management</Link>}
          </ListItem>

          <hr className="my-2 border-blue-gray-50" />

          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="w-6 h-6" />
            </ListItemPrefix>
            {!isCollapsed && <Link to="/admin/dashboard/inbox">Ticket Inbox</Link>}
            <Chip
              value={ticket?.length}
              size="sm"
              variant="ghost"
              color="red"
              className="ml-auto rounded-full"
            />
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ArchiveBoxIcon className="w-6 h-6" />
            </ListItemPrefix>
            {!isCollapsed && <Link to="/admin/dashboard/archived">Archived Youth</Link>}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="w-6 h-6" />
            </ListItemPrefix>
            {!isCollapsed && <Link to="/admin/dashboard/settings">Settings</Link>}
          </ListItem>
        </List>

        {/* Footer */}
        {/* <div className="p-4">
          {!isCollapsed && (
            <Button variant="gradient" className="w-full">
              Logout
            </Button>
          )}
        </div> */}
      </Card>

      {/* Main Content Area */}
      <div
        className={`flex-grow transition-all duration-300 ${
          isCollapsed ? "ml-[4rem]" : "ml-[16rem]"
        }`}
      >
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
