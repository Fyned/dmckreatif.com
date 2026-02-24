import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { RefreshCcw, Home, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console in development
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleGoHome = () => {
    window.location.href = "/en";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-neo-bg flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-neo-white border-4 border-neo-black shadow-hard-lg p-8 text-center">
            <div className="w-16 h-16 bg-neo-red/10 border-2 border-neo-black mx-auto mb-6 flex items-center justify-center">
              <AlertTriangle size={32} className="text-neo-red" />
            </div>

            <h1 className="font-space font-bold text-2xl uppercase mb-2">
              Something went wrong
            </h1>
            <p className="font-mono text-sm text-neo-black/60 mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <pre className="text-left bg-neo-bg border-2 border-neo-black p-4 mb-6 font-mono text-xs overflow-auto max-h-40">
                {this.state.error.message}
              </pre>
            )}

            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neo-lime border-2 border-neo-black shadow-hard font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
              >
                <RefreshCcw size={16} />
                Try Again
              </button>
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 px-6 py-3 bg-neo-white border-2 border-neo-black shadow-hard font-space font-bold text-sm uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all"
              >
                <Home size={16} />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
