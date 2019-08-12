import React, { ReactNode } from "react";
import values from "lodash/values";
import { Container } from "react-bootstrap";
import ListCard from "../../components/ListCard/ListCard";

interface IProps {
}

interface IProject {
    title: string;
    subtitle?: string;
    date: string;
    technologies?: string[];
    description?: string[];
}

interface IProjectList {
    [key: string]: IProject;
}

const projects: IProjectList = {
    gameboy: {
        title: "kfGB",
        date: "Coming soon",
        technologies: ["Java"],
        description: ["A low-level emulator for the Nintendo Gameboy."],
    },
    audioLights: {
        title: "Audio Lights",
        date: "November 2018",
        technologies: ["Python", "Raspberry Pi", "MQTT"],
        description: ["Visualizes microphone/music data live on an LED matrix."],
    },
    markov: {
        title: "Sentence Predictor",
        date: "November 2018",
        technologies: ["Java"],
        description: ["Builds sentences using Markov chain information from file input."],
    },
    vgms: {
        title: "Instrumental Music Production",
        date: "Ongoing",
        technologies: ["FL Studio", "YouTube", "MAMPlayer"],
        description: ["Producing and uploading arrangements and visualizations of instrumental songs."],
    },
};

const Projects: React.FC<IProps> = (props: IProps): JSX.Element => {

    function createProjects(item: IProject, index: number): ReactNode {
        return (
            <ListCard
                title={item.title}
                subtitle={item.subtitle}
                grayText={item.date}
                boxList={item.technologies}
                description={item.description}

                keyPrefix="exp"
                index={index}
            />
        );
    }

    return (
        <React.Fragment>

            <div className="background-leds-vertical"/>

            <Container className="position-relative">
                <h1 className="font-primary font-weight-bold side-text-label">PROJECTS</h1>
                {values(projects).map(createProjects)}
            </Container>

        </React.Fragment>
    );
};

Projects.defaultProps = {};

export default Projects;