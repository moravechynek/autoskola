import * as React from 'react';
import {Box, Button, Container, Toolbar} from '@mui/material'
import {AppBar, Avatar, IconButton, Link, Menu, MenuItem, Tooltip, Typography} from "@material-ui/core";


export default function Nav() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const setAnchorElNav = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'white', display: 'block', ':hover': {color: 'lightslategray'}}}
                            href="/"
                        >
                            Home
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'white', display: 'block', ':hover': {color: 'lightslategray'}}}
                            href="/test"
                        >
                            Test
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2, color: 'white', display: 'block', ':hover': {color: 'lightslategray'}
                            }}
                            href="/historie"
                        >
                            Historie
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{
                                my: 2, color: 'white', display: 'block', ':hover': {color: 'lightslategray'}
                            }}
                            href="/statistiky"
                        >
                            statistiky
                        </Button>
                    </Box>

                    <Box className="">
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Pavel Košnar" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu} component={Link}
                                      href="/profil"
                                      className="link-edit"
                                      underline="none"
                                      color="textPrimary"
                            >
                                <Typography textAlign="center">Profil</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu} component={Link}
                                      href="/ucet"
                                      className="link-edit"
                                      underline="none"
                                      color="textPrimary"
                            >
                                <Typography textAlign="center">Účet</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu} component={Link}
                                      href="/odhlaseni"
                                      className="link-edit"
                                      underline="none"
                                      color="textPrimary"
                            >
                                <Typography textAlign="center">Odhlásit se</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}