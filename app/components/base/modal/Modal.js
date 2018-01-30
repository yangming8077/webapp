import React from 'react';
import { Component, PropTypes } from '../utils/';
import Transition from '../transition';
import Button from '../button';
import Icon from '../icon';

const ButtonGroup = Button.Group;

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }
  componentWillMount() {
    if (this.props.visible) {
      this.isMount = true;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      document.body.style.overflow = nextProps.visible ? 'hidden' : 'inherit';
      if (nextProps.visible) {
        this.isMount = true;
      }
      this.setState({
        visible: nextProps.visible,
      });
    }
  }
  onExited(props) {
    const { onCancel, onExited } = this.props;
    this.isMount = false;
    // 动画事件不同步，带来的闪烁问题
    const timer = setTimeout(() => {
      if (!this.isMount) {
        onExited(props);
      }
      clearTimeout(timer);
    }, 100);
    if (!this.isMount) {
      onCancel();
    }
  }
  onCancel = (ismask) => {
    // 禁止遮罩层关闭
    if (ismask === 'mask' && !this.props.maskClosable) return;
    this.setState({ visible: false });
  }
  handleOk = (e) => {
    const { onOk } = this.props;
    onOk && onOk(e);
  }
  render() {
    const { prefixCls, className, title, footer, horizontal, styleMask, children, confirmLoading, onCancel, cancelText, okText, width, onEntered, ...other } = this.props;
    const { visible } = this.state;
    let defaultFooter = !footer ? (
      <ButtonGroup>
        <Button key="cancel" size="small" onClick={this.onCancel}>
          {cancelText || '取消'}
        </Button>
        <Button key="confirm" size="small" loading={confirmLoading} onClick={this.handleOk}>
          {okText || '确定'}
        </Button>
      </ButtonGroup>
    ) : footer;
    const cls = this.classNames(prefixCls, {
      [`${prefixCls}-wrap`]: this.isMount,
      [`${prefixCls}-horizontal-left`]: horizontal === 'left' && this.isMount,
      [`${prefixCls}-horizontal-right`]: horizontal === 'right' && this.isMount,
      [className]: className,
    });

    let AnimateType = '';
    switch (horizontal) {
      case 'left': AnimateType = 'fadeIn left'; break;
      case 'right': AnimateType = 'fadeIn right'; break;
      default: AnimateType = 'fadeIn down'; break;
    }
    defaultFooter = (footer === null ? null : <div className={`${prefixCls}-footer`}>{defaultFooter}</div>);
    return (
      <div className={cls}>
        <Transition in={visible} sequence="fadeIn">
          <div className={`${prefixCls}-mask`} style={styleMask} onClick={() => this.onCancel('mask')} />
        </Transition>
        <Transition onExited={this.onExited.bind(this)} onEntered={onEntered} in={visible} sequence={AnimateType}>
          <div className={`${prefixCls}-content`} style={{ width, ...other.style }}>
            <div className={`${prefixCls}-header`}>
              <div className={`${prefixCls}-title`}>{title}</div>
              <a onClick={() => this.onCancel()} className={`${prefixCls}-close-icon`}><Icon type="close" /></a>
            </div>
            <div className={`${prefixCls}-body`}>{children}</div>
            {defaultFooter}
          </div>
        </Transition>
      </div>
    );
  }
}

Modal.defaultProps = {
  prefixCls: 'w-modal',
  width: 520,
  visible: false,
  maskClosable: true,
  confirmLoading: false,
  onCancel: v => v,
  onExited: v => v,
  onEntered: v => v,
};
Modal.propTypes = {
  visible: PropTypes.bool,
  horizontal: PropTypes.oneOf(['left', 'right']),
  maskClosable: PropTypes.bool,
  styleMask: PropTypes.object,
  style: PropTypes.object,
  confirmLoading: PropTypes.bool,
  title: PropTypes.node,
  footer: PropTypes.node,
  onCancel: PropTypes.func,
  onExited: PropTypes.func,
  onEntered: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]),
};
