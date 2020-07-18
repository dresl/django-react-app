import React from 'react'

class Component extends React.Component {
    /*
    componentIsMounted = false
    
    setState(...args) {
        if (this.componentIsMounted)
            super.setState(...args)
        else
            console.log("State change on unmounted component", ...args)
    }

    componentDidMount(...args) {
        this.componentIsMounted = true
        if (typeof super.componentDidMount === "function")
            super.componentDidMount(...args)
    }

    componentWillUnmount(...args) {
        this.componentIsMounted = false
        super.componentWillUnmount(...args)
    }*/
    componentWillUnmount(...args) {
        this.setState = (_,__) => console.log
        if (typeof super.componentWillUnmount === "function")
            super.componentWillUnmount(...args)
    }
}

export default Component
