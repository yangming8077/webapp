import React from 'react'
import ReactDOM from 'react-dom'
// 公共方法
import $native from 'util/native.js';
import DateFormat from './common/date-format';
import $ from 'jquery';
import API from 'api';
// 组件引用
import Modal from '../components/Base/modal/index.web.js';
import Loading from '../components/Base/Loading/index.web.jsx'
import Toast from '../components/Base/toast/index.web.jsx';
// 全局调用名称为 Common.方法名
class Common extends React.Component {
  /*************************************************************************
 * 公共背景颜色方法
 * 1.添加     Common.addBgColor(color) // 默认无参数为白色， 可设置参数颜色 例:“#f00” 
 * 2.移除     Common.removeBgColor()
**/
  //添加
  static addBgColor(color) {
    if (color) {
      $("html,body").css("background-color", color);

    } else {
      $("html,body").css("background-color", "#ffffff");
    }
  }
  //移除
  static removeBgColor() {
    $("html,body").css("background-color", "");
  }
  /*************************************************************************
  * 公共返回结果方法
  * 1.函数     Common.toast()
  * 2.类型     “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
 **/
  static returnResult(n) {
    switch (n) {
      // 成功结果
      case "00000000":
        return true;
        break;
    }
  }
  /*************************************************************************
  * 公共键盘方法
  * 1.函数     Common.toast()
  * 2.类型     “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
 **/
  static toast(type, title) {
    switch (type) {
      case "success":
        Toast.success(title);
        setTimeout(function () {
          Toast.hide();
        }, 3000)
        break;
      case "error":
        Toast.error(title);
        setTimeout(function () {
          Toast.hide();
        }, 3000)
        break;
    }
  }
  /*************************************************************************
  * 公共键盘方法
  * 1.函数     Common.showKeyBoard()
  * 2.类型     “amount”:金额键盘，“num”:纯数字键盘，“numAndChar”:数字字母组合键盘，“pwd”:密码键盘
 **/
  // 键盘
  static showKeyBoard(n) {
    if (__DEV__) {
      // 不调用
    } else {
      // native 键盘
      $native.callClientForBank(API.NATIVE_CODE_SHOWKEYBOARD, {
        type: "amount",
        cancel: "cancel",
        success: (res) => {
          this.setState({
            inputdata: res
          })
        }
      })
    }
  }
  /*************************************************************************
   * 公共校验方法
   * 1.卡号               Common.cardNumber()
   * 2.密码、短信验证码     Common.PasswordSmsNumber()
   * 3.是否为空            Common.judgeEmpty()
   * 4.特殊字符            Common.inputRegExp()
   * 5.手机号            Common.phoneNumber()
  **/
  // 卡号
  static cardNumber(n) {
    if (this.judgeEmpty(n) || n.length < 10 || n.length > 20) {
      return true
    }
  }
  // 密码、短信验证码
  static PasswordSmsNumber(n) {
    if (this.judgeEmpty(n) || n.length < 6) {
      return true
    }
  }
  // 是否为空
  static judgeEmpty(n) {
    if (n === "" || n === null || n === undefined) {
      return true;
    }
  }
  //特殊字符
  static inputRegExp(n) {
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
    if ((pattern.test(n))) {
      return true;
    }
  }
  //手机号
  static phoneNumber(n) {
    //  let pattern = new RegExp("/^1[3|4|5|7|8|9]\d{9}$/");
    if (!(/^1[3|4|5|7|8|9]\d{9}$/.test(n)) || n.length < 11) {
      return true;
    }
  }
  /*************************************************************************
   * 公共格式化方法
   * 1.卡号              Common.setAccountNum()
   * 2.手机号            Common.setPhoneNumFour()
   * 3.金额              Common.setMoneyFormat()
  **/
  // 卡号
  static setAccountNum(cardNum) {
    let cardnumnew = "";
    if (typeof cardNum !== "string") {
      cardNum = cardNum + "";
    }
    let cardnumstr = cardNum;
    let cardnumarr = cardNum.split("");
    let cardnumstr2 = cardnumarr.reverse().slice(0, 4).reverse().join("");
    cardnumnew = cardnumstr.slice(0, 4) + " **** " + cardnumstr2;
    return cardnumnew;
  }
  // 手机号
  static setPhoneNumFour(phoneNum) {
    let phoneNumnew = "";
    if (typeof phoneNum !== "string") {
      phoneNum = phoneNum + "";
    }
    let phonenumarr = phoneNum.split("");
    phoneNumnew = phonenumarr.reverse().slice(0, 4).reverse().join("");
    return phoneNumnew;
  }
  // 金额
  static setMoneyFormat(money) {
    let moneynew = "";
    if (typeof money !== "string") {
      money = money + "";
    }
    let moneyarr = money.split(".");

    let moneyarr0 = moneyarr[0].split("").reverse();
    let moneyarr0new = [];
    for (let i = 0; i < moneyarr0.length; i++) {
      let flag = i % 3;
      moneyarr0new.push(moneyarr0[i]);
      if (flag === 2) {
        moneyarr0new.push(",");
      }
    }
    let moneyarr0re = moneyarr0new.reverse();
    if (moneyarr0re[0] === ",") {
      moneyarr0re.splice(0, 1);
    }
    if (moneyarr.length === 1) {
      moneynew = moneyarr0re.join("") + ".00"
    } else {
      moneynew = moneyarr0re.join("") + "." + moneyarr[1];
    }

    return moneynew;
  }
  /*************************************************************************
     * 公共弹窗
     * 1.公共弹框（类型判断H5+APP）   Common.showAppDialogAlert()
     * 2.展现H5弹框                    Common.showDialogAlert()
     * 3.隐藏H5弹框                     Common.hideDialog()
  **/
  // 公共弹框
  static showAppDialogAlert(alertDict) {
    // $native.callClientForUI(API.NATIVE_CODE_SET_ALERT_INFO, alertDict);
    if (__DEV__) {
      // H5弹窗
      this.showDialogAlert(alertDict);
    } else {
      // native弹窗
      $native.callClientForUI(API.NATIVE_CODE_SET_ALERT_INFO, alertDict);
    }
  }
  /* 弹框组件字段说明
   {
     title: "alert标题",
     msg: "alert内容",
     cancel_text: "取消",
     cancel: this.cancel,
     success_text: "确认",
     success: this.success
   }
 */
  // 展现H5弹框
  static showDialogAlert(alertParam) {
    let content = {
      title: alertParam.title || '信息提示',
      msg: alertParam.msg
    }
    let buttonList = [];
    alertParam.cancel_text ? buttonList.push({ text: '取消', onTap: alertParam.cancel || '' }) : null;
    alertParam.success_text ? buttonList.push({ text: '确认', onTap: alertParam.success || '' }) : null;
    Modal.alert(content, buttonList);
  }
  // 隐藏H5弹框
  static hideDialog() {
    if (this.dialog) {
      document.body.removeChild(this.dialog);
      this.dialog = null;
    }
  }
  /*************************************************************************
   * 页面刷公共方法
   * 1.页面刷新 Common.bindPageRefresh.bind(this)
  **/
  // 页面刷新
  static bindPageRefresh() {
    $("input").on("blur", function () {
      setTimeout(
        function () {
          window.scrollTo(0, 0)
        }, 500);
    });
    $("textarea").on("blur", function () {
      setTimeout(
        function () {
          window.scrollTo(0, 0)
        }, 500);
    });
  }

  /*************************************************************************
   * session 公共方法
   * 1.添加 Common.addSessionData(key, dataStr)
   * 2.接收 Common.getSessionData(key)
   * 3.清除 Common.removeSessionData(n)
   * 4.清除并返回值 Common.removeSessionDataReturn(key)
  **/
  // 添加
  static addSessionData(key, dataStr) {
    if (typeof dataStr !== "object") {
      sessionStorage.setItem(key, dataStr);
    }
  }
  // 接收
  static getSessionData(key) {
    return sessionStorage.getItem(key);
  }
  // 清除
  static removeSessionData(n) {
    sessionStorage.removeItem(n);
  }
  // 清除并返回
  static removeSessionDataReturn(key) {
    return sessionStorage.removeItem(key);
  }
  /*************************************************************************
     * Loading 公共方法
     * 1.打开     Common.showLoading()
     * 2.关闭     Common.hideLoading()
    **/
  // 打开
  static showLoading() {
    if (this.loading == null) {
      this.loading = document.createElement('div');
      document.body.appendChild(this.loading);
      ReactDOM.render(
        <Loading />,
        this.loading
      )
    }
  }
  // 关闭
  static hideLoading() {
    if (this.loading) {
      document.body.removeChild(this.loading);
      this.loading = null;
    }
  }

  // 获取当前日期（上送需要的格式）
  static getCurrentDate(formatStr) {
    let currentDate = DateFormat.date(new Date().getTime(), formatStr);
    return currentDate;
  }

    // 获取格式化日期（上送需要的格式）
    static getDateFormat(date,formatStr) {
        let currentDate = DateFormat.date(date, formatStr);
        return currentDate;
    }

}
export default Common