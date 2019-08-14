import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Experience from "./pages/Experience/Experience";
import Projects from "./pages/Projects/Projects";
import NotFound from "./pages/NotFound/NotFound";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./services/redux";

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
                    <Route component={NotFound}/>
                </Switch>

            </BrowserRouter>
        </PersistGate>
    );
};

export default App;