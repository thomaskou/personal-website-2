import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Experience from "./pages/Experience/Experience";

interface IProps {
}

const App: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <BrowserRouter>

            <Navbar/>

            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/experience" component={Experience}/>
            </Switch>

        </BrowserRouter>
    );
};

export default App;