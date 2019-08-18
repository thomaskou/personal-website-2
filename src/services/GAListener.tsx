import {useEffect} from "react";
import ReactGA from "react-ga";
import {withRouter, RouteComponentProps} from "react-router";
import {Location, LocationListener, UnregisterCallback} from "history";

/**
 * Implementation taken from https://github.com/react-ga/react-ga/issues/122#issuecomment-521781395.
 */

interface IProps extends RouteComponentProps {
    children: any;
    trackingId: string;
}

const sendPageView: LocationListener = (location: Location): void => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
};

const GAListener: React.FC<IProps> = (props: IProps): JSX.Element => {

    const {children, trackingId, history} = props;

    useEffect((): UnregisterCallback | void => {
        if (trackingId) {
            ReactGA.initialize(trackingId);
            sendPageView(history.location, "REPLACE");
            return history.listen(sendPageView);
        }
    }, [history, trackingId]);

    return children;
};

export default withRouter(GAListener);
