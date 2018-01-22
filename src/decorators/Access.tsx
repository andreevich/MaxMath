import * as React from 'react';

export const Access = (params: any) => (Component: any): any => {
    return class extends React.Component<any, any> {
        timer: any = null;

        constructor() {
            super();
            this.state = {
                isLoading: true
            };
        }

        componentDidMount() {
            console.log(this.props);
            this.timer = setTimeout(() => {
                this.setState({isLoading: false});
            }, 10000);
        }

        componentWillUnmount() {
            clearTimeout(this.timer);
        }

        render() {
            let newProps = {access: params};
            return <Component  {...this.props} {...newProps}/>;
        }
    };
};