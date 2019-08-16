import React from "react";
import Snake from "../../components/Snake/Snake";

interface IProps {
}

const Homepage: React.FC<IProps> = (props: IProps): JSX.Element => {

    return (
        <main className="d-flex">
            <div className="background-rails"/>
            <Snake/>
        </main>
    );
};

export default Homepage;
