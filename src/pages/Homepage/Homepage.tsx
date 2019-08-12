import React from "react";

interface IProps {
}

const Homepage: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <React.Fragment>
            <div className="background-rails"/>
        </React.Fragment>
    );
};

export default Homepage;