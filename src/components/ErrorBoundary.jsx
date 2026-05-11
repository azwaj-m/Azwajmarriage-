import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("بیماری پکڑی گئی:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 text-red-900 min-h-screen font-sans dir-rtl text-right">
          <div className="bg-white p-4 rounded-xl border-2 border-red-500 shadow-lg">
            <h1 className="text-xl font-black text-red-600 mb-2">🚨 کوڈ میں بیماری مل گئی!</h1>
            <p className="text-sm font-bold mb-4 text-gray-700">سکرین سفید ہونے کی وجہ نیچے دیا گیا ایرر ہے:</p>
            <pre className="bg-red-100 p-3 rounded-lg text-xs font-mono overflow-auto border border-red-200 text-left dir-ltr max-h-60">
              {this.state.error && this.state.error.toString()}
            </pre>
            <p className="text-xs text-gray-500 mt-4">مشورہ: اس ایرر کو کاپی کر کے مجھے بھیجیں تاکہ ہم اسے فوراً ٹھیک کر سکیں۔</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
