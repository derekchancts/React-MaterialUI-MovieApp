import { Route, Switch } from "react-router-dom";
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav'
import Container from '@mui/material/Container';
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";


function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <div className='app'>
        <Container>
        <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  );
}

export default App;
