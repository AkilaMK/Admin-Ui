import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logoutUser } from "../reducers/authSlice";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const DesktopMenuItems = ({ user, handleLogout }) => {
    const menuItems = user
        ? ["Contact", "About"]
        : ["Contact", "About", "Log In", "Register"];

    // Initialize anchorEl to null
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const settings = ["Profile", "Log Out"];

    // Use useEffect to reset anchorEl when user changes
    React.useEffect(() => {
        setAnchorEl(null);
    }, [user]);

    return (
        <Box>
            {menuItems.map((text) => (
                <Button
                    key={text}
                    color="inherit"
                    component={Link}
                    to={`/${text.toLowerCase().replace(" ", "")}`}
                >
                    {text}
                </Button>
            ))}
            {user && (
                <>
                    <Button
                        key={user?.name}
                        color="inherit"
                        sx={{ textDecoration: "none", color: "white" }}
                        onClick={handleClick}
                    >
                        {user.name}
                    </Button>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting}
                                onClick={
                                    setting === "Profile"
                                        ? () => {
                                            handleClose();
                                            window.location.href =
                                                "/profile";
                                        }
                                        : handleLogout
                                }
                            >
                                <Typography textAlign="center">
                                    {setting}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </Box>
    );
};


const MobileMenuItems = ({ user, toggleDrawer, handleLogout }) => {
    const menuItems = user
        ? ["Contact", "About"]
        : ["Contact", "About", "Log In", "Register"];

    return (
        <List>
            {menuItems.map((text) => (
                <ListItem
                    button
                    key={text}
                    component={Link}
                    to={`/${text.toLowerCase().replace(" ", "")}`}
                    onClick={toggleDrawer(false)}
                >
                    <Typography>{text}</Typography>
                </ListItem>
            ))}
            {user && (
                <>
                    <ListItem
                        button
                        component={Link}
                        to="/profile"
                        onClick={toggleDrawer(false)}
                    >
                        <Typography>{user.name}</Typography>
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                        <Typography>Log Out</Typography>
                    </ListItem>
                </>
            )}
        </List>
    );
};

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const user = useSelector(getUser);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const toggleDrawer = (isOpen) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(isOpen);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
                >
                    Home
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            <MobileMenuItems
                                user={user}
                                toggleDrawer={toggleDrawer}
                                handleLogout={handleLogout}
                            />
                        </Drawer>
                    </>
                ) : (
                    <DesktopMenuItems user={user} handleLogout={handleLogout} />
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

