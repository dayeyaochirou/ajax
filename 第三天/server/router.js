// 1.引入内置核心模块
const querystring = require('querystring')
const urlModule = require('url')
const fs = require('fs')
const path = require('path')

// 2. 引入自定义模块
const ctrl = require('./controller')

// 3. 向外暴露数据
module.exports = function (req, res) {
  let method = req.method; // 获取请求方法
  let pathname = req.pathname
  if (method == 'GET' && pathname == '/index.html') {
    ctrl.showIndexPage(req, res);
  } else if (method == 'GET' && pathname == '/register.html') {
    ctrl.showRegisterPage(req, res)
  } else if (method == 'GET' && pathname == '/studentsJSON.html'){
    ctrl.showStudentsJSONPage(req, res)
  } else if (method == 'GET' && pathname == '/studentsXML.html') {
    ctrl.showStudentsXMLPage(req, res)
  } else if (method == 'GET' && pathname == '/submit') {
    ctrl.submitUserOfGet(req, res)
  } else if (method == 'POST' && pathname == '/submit') {
    ctrl.submitUserOfPost(req, res)
  } else if (method == 'GET' && pathname == '/validate') {
    ctrl.validateOfGet(req, res)
  } else if (method == 'POST' && pathname == '/validate') {
    ctrl.validateOfPost(req, res)
  } else if (method == 'GET' && pathname == '/getStudentsJSON') {
    ctrl.getStudentsJSONDataOfGet(req, res)
  } else if (method == 'POST' && pathname == '/getStudentsJSON') {
    ctrl.getStudentsJSONDataOfPost(req, res)
  } else if (method == 'GET' && pathname == '/getStudentsXML') {
    ctrl.getStudentsXMLDataOfGet(req, res)
  } else if (method == 'POST' && pathname == '/getStudentsXML') {
    ctrl.getStudentsXMLDataOfPost(req, res)
  } else if (method == 'GET' && pathname == '/getData') {
    ctrl.getDataOfGet(req, res)
  } else if (method == 'POST' && pathname == '/getData') {
    ctrl.getDataOfPost(req, res)
  } else if (method == 'GET' && pathname == '/getCode') {
    ctrl.getCode(req, res)
  } else if (method == 'GET' && pathname == '/getDelayCode') {
    ctrl.getDelayCode(req, res)
  } else if (method == 'GET' && pathname == '/validateName') {
    ctrl.validateName(req, res)
  } else if (method == 'POST' && pathname == '/register') {
    ctrl.registerUser(req, res)
  } else if (method == 'POST' && pathname == '/registerDelay') {
    ctrl.registerUserDelay(req, res)
  } else if (method == 'GET' && pathname.startsWith('/assets')) {
    ctrl.loadStaticResource(req, res)
  } else if (method == 'POST' && pathname == '/uploadFile') {
    ctrl.uploadFile(req,res)
  } else {
    res.end('404')
  }
}