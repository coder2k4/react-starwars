import React, {Component} from 'react';

import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";

const withData = (View, getData) => {
    return class extends Component {

        state = {
            data: null,
            loading: true,
            error: false
        };

        componentDidMount() {
            this.update();
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.props.getData !== prevProps.getData)
                this.update();
        }

        update() {
            getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false,
                        error: false
                    });
                })
                .catch(() => {
                    this.state.error = true
                });
        }

        render() {
            const {data, error, loading} = this.state;

            if (loading)
                return <Spinner/>;

            if(error)
                return <ErrorIndicator/>;

            return <View {...this.props} data={data}/>;
        }
    };
};

export default withData;
