import { Brightness5 } from '@mui/icons-material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { AppContext } from './components/AppContext';
import Lidar from './components/Lidar';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mbhanuprsd.github.io/">
                Bhanu Prasad M
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function DashboardContent() {
    const { light, setLight } = React.useContext(AppContext);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <MuiAppBar position="absolute">
                <Toolbar >
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}>
                        Lidar POC
                    </Typography>
                    <IconButton color="inherit" onClick={(e) => { setLight(!light) }}>
                        <Brightness5 />
                    </IconButton>
                </Toolbar>
            </MuiAppBar>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}>
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                    {/* Lidar */}
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 480
                            }} style={{ backgroundColor: '#222' }}>
                                <Lidar
                                    path={'/pcd/vehicle.pcd'}
                                    camPosition={[0, 120, 40]}
                                    camControl={true}
                                    zoom={50} />
                            </Paper>
                        </Grid>
                        {/* Chart */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}>
                                Top View
                            </Typography>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Lidar
                                    path={'/pcd/vehicle.pcd'}
                                    camPosition={[0, 0, 40]}
                                    camControl={false}
                                    zoom={25} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}>
                                Right View
                            </Typography>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Lidar
                                    path={'/pcd/vehicle.pcd'}
                                    camPosition={[40, 40, 0]}
                                    camControl={false}
                                    zoom={25} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}>
                                Front View
                            </Typography>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Lidar
                                    path={'/pcd/vehicle.pcd'}
                                    camPosition={[0, 40, 0]}
                                    camControl={false}
                                    zoom={25} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}