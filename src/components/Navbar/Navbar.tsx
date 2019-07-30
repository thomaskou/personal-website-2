import React from "react";
import { Link } from "react-router-dom";

interface IProps {
}

const Navbar: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/experience">Experience</Link>
                </li>
            </ul>
        </nav>
    );
};

Navbar.defaultProps = {};

export default Navbar;