import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage/Homepage";
import Experience from "./pages/Experience/Experience";
import Projects from "./pages/Projects/Projects";

interface IProps {
}

const App: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <BrowserRouter>

            <Navbar/>

            <main>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/experience" component={Experience}/>
                    <Route exact path="/projects" component={Projects}/>
                </Switch>
            </main>

        </BrowserRouter>
    );
};

export default App;