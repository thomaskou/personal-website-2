import React, { ReactNode } from "react";

interface IProps {
    title?: string;
    subtitle?: string;
    grayText?: string | ReactNode;
    boxList?: string[];
    description?: string[];

    keyPrefix?: string;
    index: number;
}

const ListCard: React.FC<IProps> = (props: IProps): JSX.Element => {

    const {title, subtitle, grayText, boxList, description, keyPrefix, index} = props;

    function createBoxListItem(index: number): (boxItem: string, boxIndex: number) => ReactNode {
        return (boxItem: string, boxIndex: number): ReactNode => {
            return <React.Fragment>

                {boxIndex > 0 && <span className="mx-1"/>}

                <span
                    key={`${keyPrefix}-${index}-box-${boxIndex}`}
                    className="text-muted font-size-065 font-size-sm-075 boxed-black p-1 my-1"
                >
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
        "boxed-black p-45 " +                   // Border and padding
        "bg-color-white shadow-black-diag";     // Background and shadow

    return (
        <div
            key={`${keyPrefix}-${index}`}
            className={cardClasses}
        >

            {title && <strong className="text-uppercase font-size-125">{title}</strong>}
            {subtitle && <p className="text-capitalize my-1">{subtitle}</p>}
            {grayText && <p className="text-uppercase text-muted text-nowrap font-size-09">{grayText}</p>}

            {boxList && boxList.length > 0 &&
                <div className="my-2 aligned-row flex-wrap">
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