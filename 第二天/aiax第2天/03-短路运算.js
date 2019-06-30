/**
 * 短路运算  &&   ||
 * 1. 当运算的两边有一边不是boolean类型的时候,则会进入短路运算
 * 2. &&  找假(转换成boolean类型为false的那个值) 
 *    1.先看第一个操作数,如果第一个操作数转换成boolean类型为true的话,则直接返回第二个操作数,不管第二个数是什么   
 *    2.先看第一个操作数,如果第一个操作数转换成boolean类型为false的话,则直接返回第一个操作数,第二个操作数不管 
 *    比如:  100 && "abc"
 * 
 * 3. ||   找真 (找转换成boolean类型为true的那个数)
 *    1. 先看第1个操作数,如果第1个操作数转换成boolean类型为true的话,则直接返回第1个操作数,则第2个数不管
 *    2. 先看第1个操作数,如果第1个操作数转换成boolean类型为false的话,则直接返回第2个操作数
 *    
 */

 function getSum(a,b){
   a = a || 0
   b = b || 0
   return a + b  // undefined NaN  有/没有
 }

 var result = getSum(10)
 console.log(result);