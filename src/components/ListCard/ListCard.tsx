import React, { ReactNode } from "react";

interface IProps {
    title?: string;
    subtitle?: string;
    grayText?: string | ReactNode;
    boxList?: string[];
    description?: string[];
    image?: string;

    keyPrefix?: string;
    index: number;
}

const ListCard: React.FC<IProps> = (props: IProps): JSX.Element => {

    const {title, subtitle, grayText, boxList, description, image, keyPrefix, index} = props;

    function createBoxListItem(index: number): (boxItem: string, boxIndex: number) => ReactNode {
        return (boxItem: string, boxIndex: number): ReactNode => {
            return <React.Fragment key={`${keyPrefix}-${index}-box-${boxIndex}`}>
                <span className={
                    "text-muted font-size-065 font-size-sm-075 " +
                    "boxed-black p-1 m-1 "
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
        "overflow-hidden centered background-contained w-100 " +
        "height-10em height-sm-15em height-md-17-5em height-lg-20em height-xl-25em " +
        "mb-3 mb-lg-4";

    return (
        <div className={cardClasses}>

            {image && <figure className={imageClasses} style={{backgroundImage: `url(${image})`}}/>}
            {title && <strong className="text-uppercase font-size-125">{title}</strong>}
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