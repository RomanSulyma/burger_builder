import React, {Component} from 'react';
import classes from './ErrorHandler.module.css';
import axiosInstance from "../Axios/axiosConfig";

const errorHandler = (WrappedComponent) => {
    return class EH extends Component {
        state = {
            error: null
        };

        componentDidMount() {
            // Set axios interceptors
            this.requestInterceptor = axiosInstance.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.responseInterceptor = axiosInstance.interceptors.response.use(
                res => res,
                error => {


                    if (error.response != null && error.response.status != null) {
                        return error.response;
                    }

                    this.setState({error});
                }
            );
        }

        componentWillUnmount() {
            // Remove handlers, so Garbage Collector will get rid of if WrappedComponent will be removed
            axiosInstance.interceptors.request.eject(this.requestInterceptor);
            axiosInstance.interceptors.response.eject(this.responseInterceptor);
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