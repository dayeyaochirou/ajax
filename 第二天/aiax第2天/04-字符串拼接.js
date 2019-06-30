/**
 * 浏览器中有两大引擎 
 *    一个是渲染引擎  主要用来渲染html+css
 *    一个是解析引擎  主要是用来解析js代码  谷歌浏览器里面的解析引擎是V8引擎,是各大浏览器中最快的解析JS的引擎
 */
// var name = 'tom'
// var age = 18
// var sex = '男'
// // console.log("大家好,我的名字是"+name+",今年"+age+"岁了,是个"+sex+"生");
// console.log("大家好,我的名字是"+name+",今年45岁了,是个男生");
// console.log("大家好,我的名字是"+name+",今年"+age+"岁了,是个"+sex+"生");
var obj = {
  "name":"rose",
  "age":19,
  "sex":"女"
}
// console.log("大家好,我的名字是渣渣辉,今年45岁了,是个男生");
// console.log("大家好,我的名字是"+obj.name+",今年"+obj.age+"岁了,是个"+obj.sex+"生");
console.log(`大家好,我的名字是${obj.name},今年${obj.age}岁了,是个${obj.sex}生`);