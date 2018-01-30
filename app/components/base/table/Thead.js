import React from 'react';
import { Component, PropTypes } from '../utils/';
import Checkbox from '../checkbox/';


let rowSpanNum = 0;
export default class Thead extends Component {
  static contextTypes = {
    component: PropTypes.any,
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  parent() {
    return this.context.component;
  }
  componentDidMount() {
    const { cloneElement } = this.props;
    if (!cloneElement) {
      this.props.setFixedWidth(
        this.getTableThwidth(this.thead, 'left'),
        this.getTableThwidth(this.thead, 'right')
      );
    }
  }
  getTableThwidth($thead, type) {
    const { columns } = this.props;
    let size = 0;
    if ($thead.children && $thead.children.length === 1) {
      const $th = $thead.children[0].children;

      for (let i = 0; i < $th.length; i += 1) {
        if (type === 'left' && columns[i] && (columns[i].key === '_select' || columns[i].fixed === 'left')) {
          size += $th[i].offsetWidth;
        }
        if (type === 'right' && columns[i].fixed === 'right') {
          size += $th[i].offsetWidth;
        }
      }
      return size;
    }
  }
  /**
   * [getRowSpan 获取行跨度数]
   * @param  {[type]} columns [某列的总数据]
   * @param  {[type]} subnum  [累计行跨度数]
   * @return {[type]}         [返回最终行跨度数]
   */
  getRowSpan(columns, subnum) {
    const num = (subnum && subnum.num) ? subnum.num : 1;
    for (let i = 0; i < columns.length; i += 1) {
      if (columns[i].children && columns[i].children.length > 0) {
        const curnum = this.getRowSpan(columns[i].children, { num: num + 1 });
        if (rowSpanNum < curnum.num) rowSpanNum = curnum.num;
      }
    }
    return { num, rowSpanNum };
  }
  /**
   * [getColSpan 获取列跨度数]
   * @param  {[type]} columns [某列的总数]
   * @param  {Number} num     [累计列跨度数]
   * @return {[type]}         [返回最终列的跨度数]
   */
  getColSpan(columns, num = 0) {
    for (let i = 0; i < columns.length; i += 1) {
      num += 1;
      if (columns[i].children && columns[i].children.length > 0) {
        num -= 1;
        num = this.getColSpan(columns[i].children, num);
      }
    }
    return num;
  }
  /**
   * 过滤，保留固定的单元格
   * @param  {[type]} columns  [所有单元格总数据]
   * @param  {String} ty       [左边|右边固定的单元]
   * @param  {[type]} childArr [子对象中的数据]
   * @return {[type]}          [description]
   */
  renderColumnsFixed(columns, ty = 'left') {
    const { ischecked } = this.parent().state;
    const arr = [];
    for (let i = 0; i < columns.length; i += 1) {
      if (ty === 'left' && ((ischecked && i === 0) || columns[i].fixed === 'left')) {
        arr.push(columns[i]);
      }
      if (ty === 'right' && columns[i] && columns[i].fixed === 'right') {
        arr.push(columns[i]);
      }
    }
    return arr;
  }
  // /**
  //  * 获取被禁用的勾选数量
  //  */
  // getCheckedDisableCount() {
  //   const {} = this.parent()
  // }
  /**
   * [renderHead 返回tr节点]
   * @param  {[bool]}   indeterminate [是否全选状态]
   * @param  {[Array]}  columns [列的总数据]
   * @param  {[Number]} spanNum [行跨度数]
   * @param  {[Node]}   headelm [返回累计tr标签]
   * @return {[Node]}           [返回最终累计tr总标签]
   */
  renderHead(indeterminate, columns, spanNum, childrens = [], level = 0, headelm = []) {
    const subitem = [];
    const { cloneElement } = this.props;
    const { ischecked, headIndeterminate, headchecked, rowsChecked, rowsDisabled, rowCheckedDisable, data } = this.parent().state;
    if (cloneElement) {
      columns = this.renderColumnsFixed(columns, cloneElement);
    }
    for (let i = 0; i < columns.length; i += 1) {
      if (columns[i]) {
        const attr = {};
        if (columns[i].children && columns[i].children.length > 0) {
          attr.colSpan = this.getColSpan(columns[i].children);
          childrens = childrens.concat(columns[i].children);
        } else {
          attr.rowSpan = spanNum;
        }
        if (ischecked && i === 0) attr.className = '_select';

        subitem.push(
          <th key={i} {...attr}>
            {
              ischecked && i === 0 && columns[i].key === '_select'
                ? (
                  <div
                    className="w-table-selection"
                    onClick={(e) => {
                      const props = {};
                      const disabledKeys = Object.keys(rowsDisabled);
                      const checkedKeys = Object.keys(rowsChecked);
                      const checkedDisableKeys = Object.keys(rowCheckedDisable);
                      if (checkedKeys.length === data.length || (checkedKeys.length - checkedDisableKeys.length) === (data.length - disabledKeys.length)) {
                        props.headIndeterminate = false;
                        props.headchecked = false;
                        this.props.selectedAll(e, false);
                      } else {
                        if ((disabledKeys.length - checkedDisableKeys.length) === 0) {
                          props.headIndeterminate = false;
                          props.headchecked = true;
                        } else {
                          props.headIndeterminate = true;
                          props.headchecked = false;
                        }
                        this.props.selectedAll(e, true);
                      }
                      this.parent().setState({ ...props });
                    }}
                  >
                    <Checkbox indeterminate={headIndeterminate} checked={headchecked} />
                  </div>
                )
                : columns[i].title
            }
          </th>
        );
      }
    }
    headelm.push(<tr key={`level${level}`}>{subitem}</tr>);
    if (childrens.length > 0) {
      this.renderHead(indeterminate, childrens, spanNum - 1, [], level + 1, headelm);
    }
    return headelm;
  }
  render() {
    const { indeterminate, columns } = this.props;
    // 计算层级
    const rowLevel = this.getRowSpan(columns);
    return (
      <thead ref={(node) => { this.thead = node; }}>
        {this.renderHead.bind(this)(indeterminate, columns, rowLevel.rowSpanNum)}
      </thead>
    );
  }
}

Thead.defaultProps = {
  columns: [],
};
Thead.propTypes = {
  columns: PropTypes.array,
};
