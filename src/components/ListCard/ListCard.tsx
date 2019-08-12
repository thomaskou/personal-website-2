import React, { ReactNode } from "react";

interface IProps {
    title?: string;
    subtitle?: string;
    grayText?: string;
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

                {boxIndex > 0 && <span className="h-spacing-xs"/>}

                <span
                    key={`${keyPrefix}-${index}-box-${boxIndex}`}
                    className="text-muted font-size-075 boxed-padding-xs"
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

    return (
        <div
            key={`${keyPrefix}-${index}`}
            className="font-primary v-margin-lg boxed-padding-md bg-color-white shadow-black-diag"
        >

            {title && <strong className="text-uppercase font-size-125">{title}</strong>}
            {subtitle && <p className="text-capitalize v-margin-xs">{subtitle}</p>}
            {grayText && <p className="text-uppercase text-muted font-size-09">{grayText}</p>}

            {boxList && boxList.length > 0 &&
                <div className="v-margin-sm aligned-row flex-wrap">
                    {boxList.map(createBoxListItem(index))}
                </div>
            }

            {description && <React.Fragment>
                <div className="v-spacing-sm"/>
                <ul className="h-margin-md">
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