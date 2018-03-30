#!/bin/bash

#@wget https://ykt-update.oss-cn-hangzhou.aliyuncs.com/other/node_modules/node_modules.zip

#zip -r node_modules.zip ./*

#react_version=$1
#eact-native_version=$2





#跳转到上级目录
cd ../../

#if [   -d "package.json" ];then
#
#echo "package.json文件存在"
##mv package.json ../../
##echo " 移动文件 package.json到上级目录"
#pwd
#
#else
#
#echo "package.json文件不存在"
#
#pwd
#
#fi

if [ ! -d "node_modules" ];then
echo "node_modules not exist"
pwd
npm init
npm install -save react@16.0.0
npm install --save react-native@0.51.0

else

echo "node_modules exist"
fi

