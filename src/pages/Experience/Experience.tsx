import React, { ReactNode } from "react";
import _ from "lodash";
import { Container } from "react-bootstrap";

interface IProps {
}

interface IExperience {
    company: string;
    position: string;
    date: string;
    description?: string;
    technologies?: string[];
}

interface IExperienceList {
    [key: string]: IExperience;
}

const experience: IExperienceList = {
    prizm: {
        company: "Prizm Media Inc.",
        position: "Full-stack software developer",
        date: "Apr. 2019 - Aug. 2019",
    },
    sfu: {
        company: "Simon Fraser University CODE",
        position: "Digital media intern",
        date: "Aug. 2018",
    },
    tutor: {
        company: "STEM Tutor",
        position: "Math/physics/chemistry tutor",
        date: "Aug. 2018",
    },
};

const Experience: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <Container>
            {
                _.values(experience).map((item: IExperience, index: number): ReactNode => (
                    <div key={index}>
                        <strong className="text-uppercase">{item.company}</strong>
                        <p className="text-capitalize">{item.position}</p>
                    </div>
                ))
            }
        </Container>
    );
};

Experience.defaultProps = {};

export default Experience;