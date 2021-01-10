import React from "react";
import { Link } from "react-router-dom";
import values from "lodash/values";
import "./Navbar.scss";

interface IProps {
}

interface INavbarLink {
    text: string;
    route: string;
}

interface INavbarLinkList {
    [key: string]: INavbarLink;
}

const navLinks: INavbarLinkList = {
    home: {
        text: "Home",
        route: "/",
    },
    experience: {
        text: "Experience",
        route: "/experience",
    },
    // projects: {
    //     text: "Projects",
    //     route: "/projects",
    // },
    about: {
        text: "About",
        route: "/about",
    },
};

const Navbar: React.FC<IProps> = (props: IProps): JSX.Element => {

    const navbarClasses: string =
        "navbar spaced-column flex-md-row " +
        "py-3 px-sm-4 ";
    
    const logoClasses: string =
        "font-title text-uppercase font-size-175 " +
        "bg-color-white py-1 px-2 ";

    const linkContainerClasses: string =
        "centered-row flex-wrap mw-100 " +
        "font-decorative text-lowercase font-size-1 font-size-sm-125 " +
        "mt-1 mt-md-0 ";

    return (
        <nav className={navbarClasses}>

            <h3 className={logoClasses}>Thomas Kou</h3>

            <div className={linkContainerClasses}>
                {values(navLinks).map((item: INavbarLink, index: number): JSX.Element => (
                    <Link
                        key={"navbar-link-" + index}
                        to={item.route}
                        className={
                            "text-white boxed-white bg-color-black py-1 px-2 " +
                            ((index > 0) ? "ml-0 ml-md-3 ml-lg-4" : "")
                        }
                    >
                        {item.text}
                    </Link>
                ))}
            </div>

        </nav>
    );
};

Navbar.defaultProps = {};

export default Navbar;