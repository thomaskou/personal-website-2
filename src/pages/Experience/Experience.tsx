import React, { ReactNode } from "react";
import values from "lodash/values";
import { Container } from "react-bootstrap";
import ListCard from "../../components/ListCard/ListCard";

interface IProps {
}

interface IExperience {
    company: string;
    position: string;
    date: string;
    location?: string;
    description?: string[];
    technologies?: string[];
}

interface IExperienceList {
    [key: string]: IExperience;
}

const experience: IExperienceList = {
    prizm: {
        company: "Prizm Media Inc.",
        position: "Junior web developer",
        date: "April 2019 -> August 2019",
        location: "Vancouver, BC",
        description: ["Full-stack web/mobile software developer."],
        technologies: ["TypeScript", "Node.js", "React (Native)", "Redux", "iOS/Android", "REST", "SOAP", "Sass", "Bootstrap", "LambdaTest"],
    },
    sfu: {
        company: "Simon Fraser University CODE",
        position: "Digital media intern",
        date: "August 2018",
        location: "Burnaby, BC",
        description: ["Designed/edited graphics and videos for online courses."],
        technologies: ["Photoshop", "Premiere Pro", "HTML", "CSS", "Hype 3"],
    },
    tutor: {
        company: "STEM Tutor",
        position: "Math/physics/chemistry tutor",
        date: "August 2018",
        location: "Burnaby, BC",
        description: ["Tutored elementary and high school students."],
    },
};

const Experience: React.FC<IProps> = (props: IProps): JSX.Element => {

    function createExperience(item: IExperience, index: number): ReactNode {
        return (
            <ListCard
                title={item.company}
                subtitle={item.position}
                grayText={item.date + (item.location && ` | ${item.location}`)}
                boxList={item.technologies}
                description={item.description}

                keyPrefix="exp"
                index={index}
            />
        );
    }

    return (
        <React.Fragment>

            <div className="background-cntower"/>

            <Container className="position-relative">
                <h1 className="font-primary font-weight-bold side-text-label">EXPERIENCE</h1>
                {values(experience).map(createExperience)}
            </Container>

        </React.Fragment>
    );
};

Experience.defaultProps = {};

export default Experience;