import React from 'react';
import { connect } from 'react-redux';
import { actions as toastActions } from '/reducers/toast';
import { classes } from '/common/util';
import styles from './stylesheet.scss';

@connect(
  ({ toast }) => ({
    toast,
  }), {
    ...toastActions
  }
)
class ToastContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const newToasts = nextProps.toast.toasts.filter(toast => !this.props.toast.toasts.includes(toast));
    newToasts.forEach(toast => {
      window.setTimeout(() => this.props.hideToast(toast.id), 3000);
    });
  }

  render() {
    const { className } = this.props;
    const { toasts } = this.props.toast;

    return (
      <div className={classes(styles.toast_container, className)}>
        {
          toasts.map(toast => (
            <div className={classes(styles.toast, styles[toast.type])} key={toast.id}>
              {toast.message}
            </div>
          ))
        }
      </div>
    );
  }
}

export default ToastContainer;
