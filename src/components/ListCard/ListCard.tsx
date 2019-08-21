import React, { ReactNode } from "react";
import "./ListCard.scss";

interface IProps {
    title?: string;
    subtitle?: string;
    grayText?: string | ReactNode;
    boxList?: string[];
    description?: string[];
    image?: string;
    video?: string;
    link?: string;

    keyPrefix?: string;
    index: number;
}

const ListCard: React.FC<IProps> = (props: IProps): JSX.Element => {

    const {title, subtitle, grayText, boxList, description, image, video, link, keyPrefix, index} = props;

    function createBoxListItem(index: number): (boxItem: string, boxIndex: number) => ReactNode {
        return (boxItem: string, boxIndex: number): ReactNode => {
            return <React.Fragment key={`${keyPrefix}-${index}-box-${boxIndex}`}>
                <span className={
                    "text-muted font-size-065 font-size-sm-075 " +
                    "boxed-black px-1 py-05 m-1 "
                }>
                    {boxItem}
                </span>
            </React.Fragment>;
        };
    }

    function createDescriptionItem(index: number): (desc: string, descIndex: number) => ReactNode {
        return (desc: string, descIndex: number): ReactNode => (
            <li key={`${keyPrefix}-${index}-desc-${descIndex}`}>{desc}</li>
        );
    }

    const cardClasses: string =
        "font-primary " +                       // Font
        "my-3 my-md-4 my-lg-5 " +               // Responsive margin
        "boxed-black p-4 p-sm-45 " +            // Border and padding
        "bg-color-white shadow-black-diag";     // Background and shadow

    const imageClasses: string =
        "list-card-image-container position-relative " +
        "overflow-hidden centered background-contained w-100 " +
        "height-10em height-sm-15em height-md-17-5em height-lg-20em height-xl-25em " +
        "mb-3 mb-lg-4";
    
    const imageNode: ReactNode = image ? <figure className={imageClasses} style={{backgroundImage: `url(${image})`}}/> : <React.Fragment/>;
    const videoNode: ReactNode = video ? <figure className={imageClasses}><video loop muted autoPlay><source src={video} type="video/mp4"/></video></figure> : <React.Fragment/>;
    const imgOrVideoNode: ReactNode = image ? imageNode : (video ? videoNode : <React.Fragment/>);
    const titleNode: ReactNode = title ? <strong className="text-uppercase font-size-125">{title}</strong> : <React.Fragment/>;

    return (
        <div className={cardClasses}>

            {link
                ? <a href={link} target="_blank" rel="noopener noreferrer">{imgOrVideoNode}</a>
                : imgOrVideoNode
            }
            {link
                ? <a href={link} target="_blank" rel="noopener noreferrer" className="text-black">{titleNode}</a>
                : titleNode
            }
            {subtitle && <p className="text-capitalize my-1">{subtitle}</p>}
            {grayText && <p className="text-uppercase text-muted text-nowrap font-size-09">{grayText}</p>}

            {boxList && boxList.length > 0 &&
                <div
                    className="my-2 aligned-row flex-wrap"
                    style={{marginLeft: "-0.25rem", marginRight: "-0.25rem"}}
                >
                    {boxList.map(createBoxListItem(index))}
                </div>
            }

            {description && <React.Fragment>
                <div className="my-3"/>
                <ul className="mx-4">
                    {description.map(createDescriptionItem(index))}
                </ul>
            </React.Fragment>}

        </div>
    );
};

ListCard.defaultProps = {
    keyPrefix: "listCard",
};

export default ListCard;