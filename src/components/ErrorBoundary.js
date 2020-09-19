class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch() {
      this.setState({hasError: true});
    }
  
    render() {
      if (this.state.hasError) {
        return <div className="container"><h1>Something went wrong.</h1></div>;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;