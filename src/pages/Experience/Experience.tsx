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
    nvidia: {
        company: "NVIDIA",
        position: "Software engineer intern",
        date: <React.Fragment>May 2021 -> <wbr/>August 2021</React.Fragment>,
        location: "Remote (Santa Clara, USA)",
        description: ["GeForce NOW Cascade development team; full-stack development."],
        technologies: ["Python", "Flask", "AWS", "TypeScript", "React", "Redux"],
    },
    fispan: {
        company: "FISPAN",
        position: "Software developer co-op",
        date: <React.Fragment>September 2020 -> <wbr/>December 2020</React.Fragment>,
        location: "Remote (Vancouver, Canada)",
        description: ["ERP development team; full-stack fintech development."],
        technologies: ["Kotlin", "Java", "Spring", "Spring Boot", "JavaScript", "React", "Redux"],
    },
    wish: {
        company: "Wish",
        position: "Software engineer intern",
        date: <React.Fragment>January 2020 -> <wbr/>April 2020</React.Fragment>,
        location: "San Francisco, USA",
        description: ["Payments team; primarily Python backend development."],
        technologies: ["Python", "MongoDB", "JavaScript", "Braintree/PayPal", "SQL", "iOS (Swift)", "Android (Java, Kotlin)", "Redux"],
    },
    prizm: {
        company: "Prizm Media Inc.",
        position: "Junior web developer",
        date: "April 2019 -> August 2019",
        location: "Vancouver, Canada",
        description: ["Full-stack web/mobile software developer."],
        technologies: ["TypeScript", "Node.js", "React (Native)", "Express", "Redux", "iOS/Android", "Sass", "LambdaTest", "CircleCI"],
    },
    sfu: {
        company: "Simon Fraser University CODE",
        position: "Digital media intern",
        date: "August 2017",
        location: "Burnaby, Canada",
        description: ["Designed/edited graphics and videos for online courses."],
        technologies: ["Photoshop", "Premiere Pro", "HTML", "CSS", "Hype 3"],
    },
    tutor: {
        company: "STEM Tutor",
        position: "Math/physics/chemistry tutor",
        date: <React.Fragment>October 2016 -> <wbr/>April 2018</React.Fragment>,
        location: "Burnaby, Canada",
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
                key={`exp-${index}`}
                
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
        <main>

            <div className="background-cntower"/>

            <Container className="position-relative">
                <h1 className="font-primary side-text-label">\\\\\\ <strong>EXPERIENCE</strong></h1>
                {values(experience).map(createExperience)}
            </Container>

        </main>
    );
};

Experience.defaultProps = {};

export default Experience;