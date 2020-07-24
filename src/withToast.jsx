import React from 'react';
import Toast from './Toast.jsx';

export default function withToast(OriginalComponent) {
  return class ToastWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toastVisable: false, toastMessage: '', toastType: 'success',
      };
      this.showSuccess = this.showSuccess.bind(this);
      this.showError = this.showError.bind(this);
      this.dismissToast = this.dismissToast.bind(this);
    }

    showSuccess(message) {
      this.setState({ toastVisable: true, toastMessage: message, toastType: 'success' });
    }

    showError(message) {
      this.setState({ toastVisable: true, toastMessage: message, toastType: 'danger' });
    }

    dismissToast() {
      this.setState({ toastVisable: false });
    }

    render() {
      const { toastType, toastVisable, toastMessage } = this.state;
      return (
        <React.Fragment>
          <OriginalComponent
            showError={this.showError}
            showSuccess={this.showSuccess}
            dismissToast={this.dismissToast}
            {...this.props}
          />
          <Toast
            bsStyle={toastType}
            showing={toastVisable}
            onDismiss={this.dismissToast}
          >
            {toastMessage}
          </Toast>
        </React.Fragment>
      );
    }
  };
}
