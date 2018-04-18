/**
 * Created by liwei on 2017/12/20.
 */
'use strict';

import React from 'react';
import {
    Platform,
    PixelRatio,
    Dimensions,
    NativeModules,
    Alert
} from 'react-native';

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getUTCMonth() + 1, //月份
        "d+": this.getUTCDate(), //日
        "h+": this.getUTCHours(), //小时
        "m+": this.getUTCMinutes(), //分
        "s+": this.getUTCSeconds(), //秒
        "q+": Math.floor((this.getUTCMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;
}

/* 得到日期年月日等加数字后的日期 */
Date.prototype.dateAdd = function(interval,number)
{
    var d = this;
    var k={'y':'FullYear',
        'q':'Month',
        'm':'Month',
        'w':'Date',
        'd':'Date',
        'h':'Hours',
        'n':'Minutes',
        's':'Seconds',
        'ms':'MilliSeconds'};
    var n={'q':3,
        'w':7};
    eval('d.set'+k[interval]+'(d.get'+k[interval]+'()+'+((n[interval]||1)*number)+')');
    return d;
}


/* 计算两日期相差的日期年月日等 */
Date.prototype.dateDiff = function(interval,objDate2) {
    var d=this, i={},
        t=d.getTime(), t2=objDate2.getTime();
    i['y']=objDate2.getFullYear()-d.getFullYear();
    i['q']=i['y']*4+Math.floor(objDate2.getMonth()/4)-Math.floor(d.getMonth()/4);
    i['m']=i['y']*12+objDate2.getMonth()-d.getMonth();
    i['ms']=objDate2.getTime()-d.getTime();
    i['w']=Math.floor((t2+345600000)/(604800000))-Math.floor((t+345600000)/(604800000));
    i['d']=Math.floor(t2/86400000)-Math.floor(t/86400000);
    i['h']=Math.floor(t2/3600000)-Math.floor(t/3600000);
    i['n']=Math.floor(t2/60000)-Math.floor(t/60000);
    i['s']=Math.floor(t2/1000)-Math.floor(t/1000);
    return i[interval];
}

String.prototype.gblen = function() {
    var len = 0;
    for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
}

class util {
    static _pt(px) {
        return px / 2;
        /* if (Platform.OS === 'android') {
         return px / 2;
         } else if (Platform.OS === 'ios') {
         return px/2;
         //return (px / 2) * (PixelRatio.get() / 2);
         }*/
    }

    static _isIos() {
        return Platform.OS === 'ios'
    }

    static _window() {
        return Dimensions.get('window');
    }

    static _fontSize(px) {
        return px / 2;
        /*if (Platform.OS === 'android') {
         return px / 2;
         } else if (Platform.OS === 'ios') {
         return px / 2 * (PixelRatio.getFontScale() / 2);
         }*/
    }

    static _isNotNull(val) {
        if (val == null || val == undefined) {
            return false;
        }
        if (typeof val == "string" && (val == "" || val.trim() == "")) {
            return false;
        }

        if (typeof val == "object" && val.length <= 0) {
            return false;
        }
        if(typeof val == "object") {
            return Object.keys(val).length != 0;
            // for (var key in val) {
            //     return true
            // };
            // return false;
        }
        return true;
    }

    static _isTrue(val) {
        if (val == 0 || val == '0' || val == false || val == 'false' || !this._isNotNull(val)) {
            return false;
        }else{
            return true;
        }
    }

    /**
     * 格式化时间为上午：下午
     * @param dateStr
     * @returns {string}
     * @private
     */
    static _momentTime(dateStr) {
        var hours = dateStr.getHours() - 8;
        var minutes = dateStr.getMinutes();
        var amPm = (hours >= 12) ? '下午' : '上午';
        if (hours.toString().indexOf('-') >= 0) {
            hours = Math.abs(hours);
            amPm = '下午';
        }
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return amPm + hours + ':' + minutes;
    }

    static _generaterGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static _chkFormat(str, ftype, isMust) {
        let chkChinese = function (s) {
            for (var i = 0; i < s.length; i++) {
                if (s.charCodeAt(i) > 255) return true;
            }
            return false;
        };
        var Regexs = {
            email: (/^[0-9a-z][0-9a-z\-\_\.]+@([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}$/i),//邮箱
            phone: (/^0[0-9]{2,3}[2-9][0-9]{6,7}$/),//座机手机号码
            ydphpne: (/^((13[4-9])|(15[012789])|147|182|187|188)[0-9]{8}$/),//移动手机号码
            allphpne: (/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))[0-9]{8}$/),//所有手机号码
            ltphpne: (/^((13[0-2])|(15[56])|(186)|(145))[0-9]{8}$/),//联通手机号码
            dxphpne: (/^((133)|(153)|(180)|(189))[0-9]{8}$/),//电信手机号码
            phone1: (/^0[0-9]{2,3}-{0,1}[2-9][0-9]{6,7}$/),  //区号中间的'-'座机号码
            url: (/^http:\/\/([0-9a-z][0-9a-z\-]*\.)+[a-z]{2,}(:\d+)?\/[0-9a-z%\-_\/\.]+/i),//网址
            num: (/[^0-9]/),//数字
            cnum: (/[^0-9a-zA-Z_.-]/),
            photo: (/\.jpg$|\.jpeg$|\.png$|\.gif$/i),//图片格式
            photo1: (/\.(jpe?g|gif)$/i),//图片格式
            row: (/\n/ig),
            doubelNum: (/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/)//匹配非负浮点数
        };
        var nReg = Regexs[ftype];
        if (isMust) {
            if (str == null || str == "") return true; //输入为空，认为是验证通过
        } else {
            if (str == null || str == "") return false; //输入为空，认为是验证通过
        }
        if (ftype == 'num') {
            if (!nReg.test(str) && !chkChinese(str)) {//10.23 tenfy 必须为数字且不能有中文
                return true;
            } else {
                return false;
            }
        }
        if (!nReg.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 转换时间格式
     * @param dateStr
     * @returns {*}
     * @private
     */
    static _getDateTimeFormat(str) {
        var tempDate=new Date();
        if (str == null || str == undefined) {
            return "无";
        }
        if(typeof (str)=='number'){
            tempDate = new Date(str);
        }else if(str.indexOf('T')>0){
            var tempStrs = str.split("T");
            var dateStrs = tempStrs[0].split("-");
            var year = parseInt(dateStrs[0], 10);
            var month = parseInt(dateStrs[1], 10) - 1;
            var day = parseInt(dateStrs[2], 10);
            var timeStrs = tempStrs[1].split(":");
            var hour = parseInt(timeStrs [0], 10);
            var minute = parseInt(timeStrs[1], 10) - 1;
            var second = parseInt(timeStrs[2], 10);
            tempDate = new Date(year, month, day, hour, minute, second);
        }

        var now = new Date();
        var tempTime = (now.getTime() - tempDate.getTime()) / (1000 * 60);
        var minutes = Math.floor(tempTime);  //时间差的分钟数
        var hours = Math.floor(tempTime / 60);
        var days = Math.floor(tempTime / (24 * 60));

        if (minutes <= 10) {
            return "刚刚";
        } else if (minutes <= 60) {
            return minutes + "分钟前";
        } else if (hours <= 24) {
            return hours + "小时前";
        } else if (days < 2) {
            return "昨天";
        } else if (days < 31) {
            return days + "天前";
        } else {
            return tempDate.Format('yyyy-MM-dd');
        }
    }


    //判断是否为JSON，若为JSON返回转换好的格式
    static _isJson(str){
        try{
            return JSON.parse(str);
        }catch(e) {
            return null;
        }
    }

    /**
     * 文件大小转换
     * @param input
     * @private
     */
    static _fileSizeTranslate(size){
        size = parseInt(size);
        if(size/1024 > 1024){
            if((size/1024)%1024 > 1024){
                size = (size/1024/1024/1024).toFixed(2)+'G';
            }else{
                size = (size/1024/1024).toFixed(1)+'M';
            }
        }else{
            size = (size/1024).toFixed(0)+'K';
        }
        return size;
    }

    /**
     * 判断格式是否为图片格式
     * @param suffix
     * @private
     */
    static _isImage(suffix){
        return (suffix == 'jpg' || suffix == 'jpeg'
        || suffix == 'png' || suffix == 'gif' || suffix == 'bmp');
    }

    /**
     * 根据文件获取文件媒体类型
     * @param fileName
     * @private
     */
    static _getFileMimeType (fileName){
        let suffix = fileName.split('.').pop();
        suffix = suffix.toLowerCase( );
        let mimeType;
        switch (suffix){
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'JPG':
            case 'JPEG':
            case 'PNG':
            case 'GIF':
            case 'BMP':
                mimeType = 'image/jpeg';
                break;
            case 'docx':
            case 'doc':
            case 'DOCX':
            case 'DOC':
                mimeType =  'application/msword';
                break;
            case 'xlsx':
            case 'xls':
            case 'XLSX':
            case 'XLS':
                mimeType = 'application/msexcel';
                break;
            case 'pdf':
            case 'PDF':
                mimeType = 'application/pdf';
                break;
            case 'ppt':
            case 'pptx':
            case 'PPT':
            case 'PPTX':
                mimeType =  'application/vnd.ms-powerpoint';
                break;
            case 'txt':
            case 'TXT':
                mimeType = 'text/plain';
                break;
            case 'mp4':
            case 'MP4':
                mimeType = 'audio/mp3';
                break;
            case 'mp3':
            case 'MP3':
                mimeType = 'video/mpeg';
                break;
            case 'dwg':
            case 'DWG':
                mimeType = 'application/x-dwg';
                break;

        }
        return mimeType;
    }

}

export default util;
