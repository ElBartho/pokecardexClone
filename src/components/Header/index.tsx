import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Button,
  Menu,
  MenuItem as MUIMenuItem,
  Divider,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HomeLogo from '../../assets/img/pokecardexMiniLogo.png';
import { useState } from 'react';

type MenuItemBase = {
  name: string;
  to: string;
  toSub?: string[];
  type?: string;
  subMenu?: string[];
  anchor?: null | HTMLElement;
  handleClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  handleClose?(event: React.MouseEvent): void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

type MenuItemWithSubMenu = {
  [K in keyof MenuItemBase]: MenuItemBase[K] extends undefined
    ? K extends 'type' | 'subMenu'
      ? MenuItemBase[K]
      : undefined
    : MenuItemBase[K];
} & {
  toSub: string[];
  type: string;
  subMenu: string[];
  anchor: null | HTMLElement;
  handleClick(event: React.MouseEvent<HTMLButtonElement>): void;
  handleClose(event: React.MouseEvent): void;
};

type MenuItem = MenuItemBase | MenuItemWithSubMenu;

const Header = () => {
  const [anchorCollection, setAnchorCollection] = useState<null | HTMLElement>(
    null
  );
  const [anchorTrade, setAnchorTrade] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItem: MenuItem[] = [
    {
      name: 'Forums',
      to: '/forums',
      startIcon: <TextsmsOutlinedIcon />,
    },
    {
      name: 'Collection',
      to: '/series',
      toSub: ['/internationalsets', '/japanesesets'],
      type: 'Menu',
      subMenu: ['International card manager', 'Japanese card manager'],
      anchor: anchorCollection,
      startIcon: <LibraryBooksOutlinedIcon />,
      endIcon: <KeyboardArrowDownIcon />,
      handleClick: (event) => {
        setAnchorCollection(event.currentTarget);
      },
      handleClose: () => {
        setAnchorCollection(null);
      },
    },
    {
      name: 'Trade',
      to: '/trades',
      toSub: ['/internationalmarket', '/japanesemarket'],
      type: 'Menu',
      subMenu: ['The Marketplace', 'The Japanese Marketplace'],
      anchor: anchorTrade,
      startIcon: <CachedOutlinedIcon />,
      endIcon: <KeyboardArrowDownIcon />,
      handleClick: (event) => {
        setAnchorTrade(event.currentTarget);
      },
      handleClose: () => {
        setAnchorTrade(null);
      },
    },
    {
      name: 'Articles',
      to: '/articles',
      startIcon: <FolderOpenOutlinedIcon />,
    },
    { name: 'Login', to: '', startIcon: <LoginOutlinedIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <IconButton onClick={handleDrawerToggle} sx={{ float: 'right' }}>
          <CloseIcon />
        </IconButton>
        {menuItem.map((menu, index) => (
          <Link
            to={menu.to}
            style={{ textDecoration: 'none', color: 'inherit' }}
            key={index}
          >
            <ListItemButton>
              <ListItemIcon>{menu.startIcon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position='static'>
      <Toolbar>
        <Stack
          direction='row'
          sx={{
            width: '100%',
            gap: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to='/'>
            <img width='150px' src={HomeLogo} alt='Pokecardex Home Logo' />
          </Link>
          <Stack
            direction='row'
            sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}
            divider={<Divider orientation='vertical' flexItem />}
          >
            {menuItem.map((menu, index) => (
              <Box key={index} sx={{ display: 'flex' }}>
                {menu.type ? (
                  <>
                    <Button
                      startIcon={menu.startIcon}
                      endIcon={menu.endIcon}
                      onClick={menu.handleClick}
                      sx={{ color: '#fff', gap: 0.5 }}
                    >
                      <Typography
                        sx={{
                          color: '#fff',
                          display: 'block',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                        }}
                      >
                        {menu.name}
                      </Typography>
                    </Button>
                    <Menu
                      open={Boolean(menu.anchor)}
                      anchorEl={menu.anchor}
                      onClose={menu.handleClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    >
                      {menu.subMenu?.map((sub, index) => (
                        <Link
                          key={sub}
                          to={`${menu.to}${menu.toSub?.[index]}` || ''}
                          style={{
                            textDecoration: 'none',
                            textTransform: 'none',
                          }}
                        >
                          <MUIMenuItem key={index} onClick={menu.handleClose}>
                            {sub}
                          </MUIMenuItem>
                        </Link>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Link
                    to={menu.to}
                    style={{
                      display: 'flex',
                      textDecoration: 'none',
                      color: '#fff',
                    }}
                  >
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='center'
                      sx={{ gap: 0.5 }}
                    >
                      {menu.startIcon}
                      <Typography
                        sx={{
                          color: 'white',
                          display: 'block',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                        }}
                      >
                        {menu.name}
                      </Typography>
                    </Stack>
                  </Link>
                )}
              </Box>
            ))}
          </Stack>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
        <Drawer
          anchor='right'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
