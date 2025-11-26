import React from 'react';
import { RiMenu2Line } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../Client/redux/Slices/AuthSlice"; // غير المسار حسب عندك
import { useNavigate } from "react-router-dom";

export default function Header() {

 const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

   const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // يوديه صفحة اللوجين
  };
    return (
        <header className='w-full h-[50px] bg-white shadow-md flex items-center justify-between ]  fixed  top-0 left-0 z-10'>
            <div className='part1'>
                <button className='!w-[40px] !h-[40px] !min-w-[40px] border-none  !ml-52'><RiMenu2Line className='!text-[25px]' />
                </button>
            </div>
            <div className='part2  flex items-center  !mr-7 justify-center gap-3'>
                <div className='Notices-wrapper position-relative  '>

                    <button className='Notices-button ' >
                        <span className='count  '> 1</span>
                        <FaRegBell className='!text-[25px]' />

                    </button>
                </div>
                <div>
      <Tooltip title="Admin settings">
        <IconButton onClick={handleClick} size="small">
          <Avatar>{user?.name?.[0] || "A"}</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="admin-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>
          {user?.name || "Admin"}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  




            </div>
        </header>
    )
}