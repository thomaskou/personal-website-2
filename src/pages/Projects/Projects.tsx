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
    thumbnail?: string;
    link?: string;
}

interface IProjectList {
    [key: string]: IProject;
}

const projects: IProjectList = {
    website: {
        title: "React-Snake / Personal Website v2",
        date: "August 2019",
        technologies: ["TypeScript", "Node.js", "React", "Redux", "AWS Amplify", "Firebase", "Sass", "Bootstrap", "REST"],
        description: ["A really cool website with an unnecessarily elaborate easter egg."],
        thumbnail: "/images/project-thumbnails/personal-website-v2.jpg",
        link: "https://github.com/thomaskou/personal-website-2",
    },
    audioLights: {
        title: "Audio Lights",
        date: "November 2018",
        technologies: ["Python", "Raspberry Pi", "MQTT"],
        description: ["Visualizes microphone/music data live on an LED matrix."],
        thumbnail: "/images/project-thumbnails/led-bars.gif",
        link: "https://github.com/thomaskou/RGB-Matrix-Audio-Visualizer",
    },
    // markov: {
    //     title: "Sentence Predictor",
    //     date: "November 2018",
    //     technologies: ["Java"],
    //     description: ["Builds sentences using Markov chain information from file input."],
    // },
    vgms: {
        title: "Instrumental Music Production",
        date: "Ongoing",
        technologies: ["FL Studio", "YouTube", "MAMPlayer"],
        description: ["Producing and uploading arrangements and visualizations of instrumental songs."],
        thumbnail: "/images/project-thumbnails/mamplayer.gif",
        link: "https://www.youtube.com/channel/UC5oszzMqSIO1NQOn30A4Tkg/videos",
    },
    gameboy: {
        title: "kfGB",
        date: "Coming soon",
        technologies: ["Java"],
        description: ["A low-level emulator for the Nintendo Gameboy."],
        thumbnail: "/images/project-thumbnails/wip.jpg",
        // link: "https://github.com/thomaskou/kfgb",
    },
};

const Projects: React.FC<IProps> = (props: IProps): JSX.Element => {

    function createProjects(item: IProject, index: number): ReactNode {
        return (
            <ListCard
                key={`proj-${index}`}

                title={item.title}
                subtitle={item.subtitle}
                grayText={item.date}
                boxList={item.technologies}
                description={item.description}
                image={item.thumbnail}
                link={item.link}

                keyPrefix="proj"
                index={index}
            />
        );
    }

    return (
        <main>

            <div className="background-leds-vertical"/>

            <Container className="position-relative">
                <h1 className="font-primary side-text-label">\\\\\\ <strong>PROJECTS</strong></h1>
                {values(projects).map(createProjects)}
            </Container>

        </main>
    );
};

Projects.defaultProps = {};

export default Projects;