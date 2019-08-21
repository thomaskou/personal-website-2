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
    video?: string;
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
        video: "/images/project-thumbnails/led-bars.mp4",
        link: "https://github.com/thomaskou/RGB-Matrix-Audio-Visualizer",
    },
    gameboy: {
        title: "kfGB",
        date: "Coming soon",
        technologies: ["Java"],
        description: ["A low-level emulator for the Nintendo Gameboy."],
        thumbnail: "/images/project-thumbnails/wip.jpg",
        // link: "https://github.com/thomaskou/kfgb",
    },
    forum: {
        title: "Web Forum API",
        date: "January 2019",
        technologies: ["JavaScript", "Node.js", "Express", "MySQL"],
        description: ["A web forum API/server. Create accounts, submit posts, view in chronological order."],
        link: "https://github.com/thomaskou/tk-forum",
    },
    markov: {
        title: "Sentence Predictor",
        date: "November 2018",
        technologies: ["Java"],
        description: ["Builds sentences using Markov chain information from file input."],
        link: "https://github.com/thomaskou/markovprediction",
    },
    chip8: {
        title: "CHIP-8 Emulator",
        date: "January 2018",
        technologies: ["Java"],
        description: ["An interpreter/emulator for the CHIP-8 language/system."],
        link: "https://github.com/thomaskou/CHIP-8-Java",
    },
    slideDuels: {
        title: "Slide Duels",
        date: "June 2017",
        technologies: ["Java", "Phidget", "Greenfoot"],
        video: "/images/project-thumbnails/slide-duels.mp4",
        description: ["A rapid-fire collection of 1v1 minigames controlled by Phidget sliders."],
    },
    reversi: {
        title: "Java Reversi",
        date: "October 2016",
        technologies: ["Java", "Swing"],
        video: "/images/project-thumbnails/reversi.mp4",
        description: ["The Reversi board game recreated in Java; supports 2P or 1P against a CPU."],
    },
    solaire: {
        title: "Solaire",
        date: "June 2016",
        technologies: ["GameMaker Studio"],
        video: "/images/project-thumbnails/solaire.mp4",
        description: ['A sprawling, "Metroidvania"-inspired open-world platformer fangame.'],
    },
    vgms: {
        title: "Instrumental Music Production",
        date: "Ongoing",
        technologies: ["FL Studio", "YouTube", "MAMPlayer"],
        description: ["Producing and uploading arrangements and visualizations of instrumental songs."],
        video: "/images/project-thumbnails/mamplayer.mp4",
        link: "https://www.youtube.com/channel/UC5oszzMqSIO1NQOn30A4Tkg/videos",
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
                video={item.video}
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