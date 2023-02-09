import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

import Settings from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IoMenu } from "react-icons/io5";

import {
  deepOrange,
  deepPurple,
  red,
  blue,
  pink,
  indigo,
  green,
  yellow,
} from "@mui/material/colors";
import "../index.css";
const NavBarItem = ({ title, classProps }) => {
  return (
    <Link to={title}>
      <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
    </Link>
  );
};
var arr = [
  deepOrange[500],
  deepPurple[500],
  red[500],
  blue[500],
  pink[500],
  green[500],
  yellow[500],
  indigo[500],
];

function Color(arr) {
  const color = arr[Math.floor(Math.random() * arr.length)];
  return color;
}
const avatarColor = Color(arr);

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isActive, setIsActive] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    // console.log("Clear");
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const [icon, setIcon] = useState(null);
  const host = window.location.host;
  const url = `http://${host}`;
  //const url = `http://localhost:5001`;
  useEffect(() => {
    // console.log("GET_token:", localStorage.getItem("token"));
    axios
      // .post(
      // "https://optionweb.herokuapp.com/loginState", {
      .post(`${url}/loginState`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setIcon(response.data.username[0]);
        // console.log(response.data);
      });
  }, []);

  //   // <div
  //   //   className="text-white list-none z-50 w-full"
  //   //   style={{
  //   //     position: "absolute",
  //   //     padding: "60px",
  //   //   }}
  //   // >
  //   //   <div
  //   //     className="header-inner  "
  //   //     style={{
  //   //       display: "flex",
  //   //       alignItems: "center",
  //   //       justifyContent: "space-between",
  //   //     }}
  //   //   >
  //   //     <div
  //   //       className="logo"
  //   //       style={{ fontWeight: "900", letterSpacing: "2px", color: "#fff" }}
  //   //     >
  //   //       CON.3.0
  //   //     </div>

  //   //   </div>
  //   // </div>
  //   <div className="divide-y  divide-slate-400/25  ">
  //     <nav
  //       className="w-full min-h-40 flex md:justify-center justify-between items-center p-4 sticky top-0 z-50  bg-[#131415] "
  //       // style={{ zIndex: "1" }}
  //     >
  //       <div className="md:flex-[1.0] flex-initial justify-center items-center text-white text-2xl  font-black">
  //         <Link to="/">
  //           CON.3.0
  //           {/* <img src={logo} alt="logo" className="w-48 cursor-pointer " /> */}
  //         </Link>
  //       </div>

  //       <ul className="md:flex hiddent list-none flex-row justify-between items-center flex-initial font-semibold ">
  //         {/* {["Market", "Contact", "Tutorials", "Wallets"].map((item, index) => (
  //         <NavBarItem key={item + index} title={item} />
  //       ))} */}
  //         <Link to="/">
  //           <li className="mx-4   w-24  text-center cursor-pointer navtitle">
  //             Home
  //           </li>
  //         </Link>

  //         <Link to="/Basic">
  //           <li className="mx-4   w-24  text-center cursor-pointer    navtitle">
  //             Indicator
  //           </li>
  //         </Link>

  //         <Link to="/FairPrice">
  //           <li className="mx-4 cursor-pointer text-center   w-24 navtitle">
  //             Fair Price
  //           </li>
  //         </Link>
  //         <Link to="/ARB">
  //           <li className="mx-4 cursor-pointer  text-center  w-24 navtitle">
  //             Arbitrage
  //           </li>
  //         </Link>

  //         <Link to="/DOC">
  //           <li className="mx-4 cursor-pointer  text-center  w-24  navtitle">
  //             Docs
  //           </li>
  //         </Link>
  //         {icon ? (
  //           // <Avatar sx={{ bgcolor: deepOrange[500] }}>{icon}</Avatar>
  //           <>
  //             <Tooltip title="Account settings">
  //               <IconButton
  //                 onClick={handleClick}
  //                 size="small"
  //                 sx={{ ml: 2 }}
  //                 aria-controls={open ? "account-menu" : undefined}
  //                 aria-haspopup="true"
  //                 aria-expanded={open ? "true" : undefined}
  //               >
  //                 <Avatar sx={{ bgcolor: avatarColor }}>{icon}</Avatar>
  //               </IconButton>
  //             </Tooltip>
  //             <Menu
  //               anchorEl={anchorEl}
  //               id="account-menu"
  //               open={open}
  //               onClose={handleClose}
  //               onClick={handleClose}
  //               PaperProps={{
  //                 elevation: 0,
  //                 sx: {
  //                   overflow: "visible",
  //                   filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  //                   mt: 1.5,
  //                   "& .MuiAvatar-root": {
  //                     width: 32,
  //                     height: 32,
  //                     ml: -0.5,
  //                     mr: 1,
  //                   },
  //                   "&:before": {
  //                     content: '""',
  //                     display: "block",
  //                     position: "absolute",
  //                     top: 0,
  //                     right: 14,
  //                     width: 10,
  //                     height: 10,
  //                     bgcolor: "background.paper",
  //                     transform: "translateY(-50%) rotate(45deg)",
  //                     zIndex: 0,
  //                   },
  //                 },
  //               }}
  //               transformOrigin={{ horizontal: "right", vertical: "top" }}
  //               anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
  //             >
  //               <MenuItem>
  //                 <Avatar /> Profile
  //               </MenuItem>
  //               <MenuItem>
  //                 <Avatar /> My account
  //               </MenuItem>
  //               <Divider />

  //               <MenuItem>
  //                 <ListItemIcon>
  //                   <Settings fontSize="small" />
  //                 </ListItemIcon>
  //                 Settings
  //               </MenuItem>

  //               <MenuItem onClick={handleLogOut}>
  //                 <ListItemIcon>
  //                   <Logout fontSize="small" />
  //                 </ListItemIcon>
  //                 Logout
  //               </MenuItem>
  //             </Menu>
  //           </>
  //         ) : (
  //           <Link to="/Login">
  //             <li className="mx-4 cursor-pointer text-center text-white  w-32 text-xl bg-[#F7BA33] font-semibold rounded-lg ">
  //               {/* <p className="mt-5">Login</p> */}
  //               Login
  //             </li>
  //           </Link>
  //         )}
  //       </ul>
  //     </nav>
  //     <div></div>
  //   </div>
  // );
  return (
    <div className="flex  w-screen  flex-col  items-center justify-center bg-primary relative pb-20">
      <nav className=" w-full   px-6 fixed z-50  inset-x-0 top-2 flex justify-center items-center  ">
        <div className="w-full   bg-navBar p-4 rounded-2xl flex   items-center ">
          <div className="xs:mr-auto md:hidden xl:hidden text-navBar">--</div>
          <div>
            <Link to="/">
              <p className="text-3xl mt-1  xs:mx-auto text-slate-200 font-medium ml-20 xs:ml-0  cursor-pointer duration-100 ease-in-out ">
                CON.3.0
              </p>
            </Link>
          </div>

          <div className="xs:hidden flex justify-end gap-6  mr-20 flex-1">
            <Link to="/">
              <p
                className={`text-xl text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out mx-5 py-${
                  icon ? 3 : 1
                } `}
              >
                Home
              </p>
            </Link>
            {/* <Link to="/Basic">
              {" "}
              <p
                className={`text-xl text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out mx-5 py-${
                  icon ? 3 : 1
                } `}
              >
                Indicator
              </p>
            </Link> */}
            <Link to="/FairPrice">
              {" "}
              <p
                className={`text-xl text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out mx-5 py-${
                  icon ? 3 : 1
                } `}
              >
                Fair Price
              </p>
            </Link>
            <Link to="/ARB">
              {" "}
              <p
                className={`text-xl text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out mx-5 py-${
                  icon ? 3 : 1
                } `}
              >
                Arbitrage
              </p>
            </Link>
            <Link to="/DOC">
              {" "}
              <p
                className={`text-xl text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out mx-5 py-${
                  icon ? 3 : 1
                } `}
              >
                Docs
              </p>
            </Link>
            {icon ? (
              // <Avatar sx={{ bgcolor: deepOrange[500] }}>{icon}</Avatar>
              <div className=" font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out mx-5 ">
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ bgcolor: avatarColor }}>{icon}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Link to="/myacount">
                    <MenuItem>
                      <Avatar /> My account
                    </MenuItem>
                  </Link>
                  <Divider />

                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>

                  <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link to="/Login">
                <li className="  text-xl   text-white font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out border border-textBase px-2  py-1 rounded-xl hover:border-gray-100 bg-[#2bc48a] ">
                  {/* <p className="mt-5">Login</p> */}
                  Login
                </li>
              </Link>
            )}
          </div>

          <div
            className="block xl:hidden md:hidden ml-auto cursor-pointer "
            onClick={() => setIsActive(!isActive)}
          >
            <IoMenu className="text-2xl text-textBase" />
          </div>

          {isActive && (
            <div className="p-4 w-275 bg-navBar rounded-lg fixed top-24 right-16 flex flex-col items-center justify-evenly gap-6">
              <Link to="/">
                <p
                  className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
                  onClick={() => setIsActive(false)}
                >
                  Home
                </p>
              </Link>
              {/* <Link to="/Basic">
                {" "}
                <p
                  className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
                  onClick={() => setIsActive(false)}
                >
                  Indicator
                </p>
              </Link> */}
              <Link to="/FairPrice">
                {" "}
                <p
                  className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
                  onClick={() => setIsActive(false)}
                >
                  Fair Price
                </p>
              </Link>
              <Link to="/ARB">
                {" "}
                <p
                  className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
                  onClick={() => setIsActive(false)}
                >
                  Arbitrage
                </p>
              </Link>
              <Link to="/DOC">
                {" "}
                <p
                  className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
                  onClick={() => setIsActive(false)}
                >
                  Docs
                </p>
              </Link>
              {icon ? (
                // <Avatar sx={{ bgcolor: deepOrange[500] }}>{icon}</Avatar>
                <div className=" font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out mx-5">
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ bgcolor: avatarColor }}>{icon}</Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Link to="/myacount">
                      <MenuItem>
                        <Avatar /> My account
                      </MenuItem>
                    </Link>
                    <Divider />

                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>

                    <MenuItem onClick={handleLogOut}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Link to="/Login">
                  <li
                    className="  text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out border border-textBase px-2  py-1 rounded-xl hover:border-gray-100"
                    onClick={() => setIsActive(false)}
                  >
                    {/* <p className="mt-5">Login</p> */}
                    Login
                  </li>
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
