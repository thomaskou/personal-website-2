import React, { ReactNode } from "react";
import values from "lodash/values";
import { Container } from "react-bootstrap";
import ListCard from "../../components/ListCard/ListCard";

interface IProps {
}

interface IExperience {
    company: string;
    position: string;
    date: string | ReactNode;
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
        technologies: ["TypeScript", "Node.js", "React (Native)", "Redux", "iOS/Android", "Sass", "Bootstrap", "LambdaTest", "CircleCI", "REST", "SOAP"],
    },
    sfu: {
        company: "Simon Fraser University CODE",
        position: "Digital media intern",
        date: "August 2017",
        location: "Burnaby, BC",
        description: ["Designed/edited graphics and videos for online courses."],
        technologies: ["Photoshop", "Premiere Pro", "HTML", "CSS", "Hype 3"],
    },
    tutor: {
        company: "STEM Tutor",
        position: "Math/physics/chemistry tutor",
        date: <React.Fragment>October 2016 -> <wbr/>April 2018</React.Fragment>,
        location: "Burnaby, BC",
        description: ["Tutored elementary and high school students."],
    },
};

const Experience: React.FC<IProps> = (props: IProps): JSX.Element => {

    function createExperience(item: IExperience, index: number): ReactNode {

        const appendLocation: ReactNode = (
            <React.Fragment>
                <wbr/>| <wbr/>{item.location}
            </React.Fragment>
        );

        return (
            <ListCard
                title={item.company}
                subtitle={item.position}
                grayText={
                    item.location
                        ? <React.Fragment>{item.date} {appendLocation}</React.Fragment>
                        : item.date
                }
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
                <h1 className="font-primary side-text-label">\\\\\\ <strong>EXPERIENCE</strong></h1>
                {values(experience).map(createExperience)}
            </Container>

        </React.Fragment>
    );
};

Experience.defaultProps = {};

export default Experience;