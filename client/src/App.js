import Layout from './Components/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './Pages/Explore';
import Connect from './Pages/Connect';
import Events from './Pages/Events';
import Learn from './Pages/Learn';
import Sky from './Pages/Sky';
const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/event" element={<Events />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/sky" element={<Sky />} />
        </Routes>
      </Router>
      {/* <Layout /> */}
    </ThemeProvider>
  );
}

export default App;
