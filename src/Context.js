import React, { } from 'react';

let {Provider , Consumer} = React.createContext()


class ContextProvider extends React.Component {
    state = {
        emails:[],
        currentEmail: null ,
        error: null ,
        loading:false 

    }
    componentDidMount() {
        this.setState({  loading: true})
        fetch('').then(emails => {
            this.setState({emails , loading:false})
        })
    }

    handelSelect = (email)=> {
        this.setState({currentEmail: email})
    }
    // component did mount => fetch emails 
    // function select email => email and set it to current 
    // pass the state and function to propvider 
    render() { 
        return ( <Provider value={this.state}>
                {this.props.children}

        </Provider> );
    }
}
 
export {ContextProvider , Consumer as ContextConsumer };
