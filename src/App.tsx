import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./services/redux";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Experience from "./pages/Experience/Experience";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About/About";
// import Test from "./pages/Test/Test";
import NotFound from "./pages/NotFound/NotFound";

interface IProps {
}

const App: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>

                <Navbar/>

                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/experience" component={Experience}/>
                    <Route exact path="/projects" component={Projects}/>
                    <Route exact path="/about" component={About}/>
                    {/* <Route exact path="/test" component={Test}/> */}
                    <Route component={NotFound}/>
                </Switch>

            </BrowserRouter>
        </PersistGate>
    );
};

export default App;