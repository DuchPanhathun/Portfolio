import React, { useState, useEffect } from "react";
import "../../public/css/nav.css";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';
import 'bootstrap-icons/font/bootstrap-icons.css';
import List_img from "../img/list.svg";
import Home from "../img/home-icon-silhouette.svg";
import Experience from "../img/user.svg";
import Achieviment from "../img/medal.svg";
import Contact from "../img/contact-us.svg"

const Nav = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    const [open, setOpen] = React.useState(false);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollPos > currentScrollPos;

        setPrevScrollPos(currentScrollPos);
        setVisible(visible);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List style={{marginTop: "30%"}}>
                <a href="#" style={{display: "flex", textDecoration: "none", gap: "10px", margin: "40px 25px", alignItems: "center", justifyContent: "end"}}>                   
                    <p style={{fontSize: "30px", color: "white"}}>Home</p>
                    <img src={Home} alt="" style={{width: "30px", height: "30px", color: "white"}}/>
                </a>
                <a href="#section3" style={{display: "flex", textDecoration: "none", gap: "10px", margin: "40px 25px", alignItems: "center", justifyContent: "end"}}>                 
                    <p style={{fontSize: "30px", color: "white"}}>Experience</p>
                    <img src={Experience} alt="" style={{width: "30px", height: "30px", color: "white"}}/>
                </a>
                <a href="#section3" style={{display: "flex", textDecoration: "none", gap: "10px", margin: "40px 25px", alignItems: "center", justifyContent: "end"}}>              
                    <p style={{fontSize: "30px", color: "white"}}>Achieviment</p>
                    <img src={Achieviment} alt="" style={{width: "30px", height: "30px", color: "white"}}/>
                </a>
                <a href="#section3" style={{display: "flex", textDecoration: "none", gap: "10px", margin: "40px 25px", alignItems: "center", justifyContent: "end"}}>
                    <p style={{fontSize: "30px", color: "white"}}>Contact</p>
                    <img src={Contact} alt="" style={{width: "30px", height: "30px", color: "white"}}/>
                </a>
            </List>
        </Box>
    );
    

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="left-side">
                    <a href="#" className="btn-shine">
                        Thun.
                    </a>
                </div>
                <div className="right-side">  
                    <div className="for-screen-1100">
                        <Button onClick={toggleDrawer(true)}>
                            <img src={List_img} alt="" style={{height: "35px", width: "35px"}}/>
                        </Button>
                        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    </div>   
                    <a href="#" className="nav-item">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Home
                    </a>
                    <a href="#section3" className="nav-item">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Experience
                    </a>
                    <a href="#section2" className="nav-item">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Achievement
                    </a>
                    <a href="#section4" className="nav-item">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Nav;