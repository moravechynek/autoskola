import * as React from 'react';
import {Box, Toolbar, Container, Button} from '@mui/material'
import {Avatar, Grid, IconButton, Link, Menu, MenuItem, Tooltip, Typography} from "@material-ui/core";


export default function Nav() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const setAnchorElNav = React.useState(null);

    const handleOpenUserMenu = (event) => {setAnchorElUser(event.currentTarget)};
    const handleCloseNavMenu = () => {setAnchorElNav(null)};
    const handleCloseUserMenu = () => {setAnchorElUser(null)};


  return (
    <Grid style={{ backgroundColor: 'cornflowerblue' }}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href="/"
              >
                Home
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href="/test"
              >
                Test
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href="/historie"
              >
                Historie
              </Button>
          </Box>

            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Pavel Košnar" src="/static/images/avatar/2.jpg" />
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
              <MenuItem onClick={handleCloseUserMenu} component={Link} href="/profile">
                  <Typography textAlign="center" href="/profile">Profil</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button sx={{ flexGrow: 1 }} href="/account">Účet</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href="/logout">Odhlásit se</Link>
                </MenuItem>
              <MenuItem onClick={handleCloseUserMenu} href="/nefunguje">
                  <Typography textAlign="center">Nefunguje</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </Grid>
  );
}