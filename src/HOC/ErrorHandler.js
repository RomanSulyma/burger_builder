import React, {Component} from 'react';
import classes from './ErrorHandler.module.css';

const errorHandler = (WrappedComponent, axios) => {
    return class EH extends Component {
        state = {
            error: null
        };

        componentDidMount() {
            // Set axios interceptors
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.responseInterceptor = axios.interceptors.response.use(
                res => res,
                error => {
                    this.setState({error});
                }
            );
        }

        componentWillUnmount() {
            // Remove handlers, so Garbage Collector will get rid of if WrappedComponent will be removed
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render() {

            let renderSection;

            if(this.state.error) {
                renderSection = (
                    <div className={classes.ErrorHandler}>
                        <p>Cannot connect to server :(</p>
                    </div>);
            } else {
                renderSection = <WrappedComponent {...this.props} />
            }
            return renderSection;
        }
    };
};

export default errorHandler;