import React from "react";

interface ErrorBoundryProps {
  children?: any;
  fallback?: any;
}

class ErrorBoundry extends React.Component<ErrorBoundryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
