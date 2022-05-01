type Fn=(str:string,x:string,y?:string,z?:string)=>object;

interface BtnList{
  name:string,
  light:boolean,
  fn?:Fn
}

const operatorList=["+","-","×","÷","%"];

const getBracketNum=(x:string)=>{
  let leftArr=x.match(/\(/g);
  let rightArr=x.match(/\)/g);
  let leftNum=leftArr?leftArr.length:0;
  let rightNum=rightArr?rightArr.length:0;
  return {leftNum,rightNum}
}

//数字键 和 .  修改第二行
/**
 * 
 * @param x 第一行字符串
 * @param y 第二行字符串
 * @param z 输入的字符
 * @returns 
 */
const numFun2=(str:string,x:string,y:string,z:string)=>{
  let res={val1:x,val2:'',val3:str}
  if(z==='.'){
    if(x[x.length-1]==='='){
      res.val1='';
      res.val2=0+z;
    }else if(y===''||y==='0'){
      res.val2=0+z;
    }else if(y.indexOf('.')>-1){
      res.val2=y;
    }else{
      res.val2=y+z;
    }
    return res;
  }
  if(y==='0'){
    res.val2=z;
    return res;
  }
  if(x[x.length-1]==='='){
    res.val1='';
    res.val2=z;
    res.val3='';
    return res;
  }
  res.val2=y.length>10||(y.length==10&&y.indexOf('.')==-1)?y:y+z;
  return res;
}

//退格键 修改第二行
/**
 * 
 * @param x 第一行字符串
 * @param y 第二行字符串
 * @returns 
 */
const backSpace:Fn=(str,x,y)=>{
  let res={val1:x,val2:y,val3:str};
  res.val2=y&&x[x.length-1]!='='?y.substr(0,y.length-1):y;
  return res;
}

// + - x / %  修改第一行
/**
 * 
 * @param x 第一行字符串
 * @param y 第二行字符串
 * @param z 输入的运算符
 * @returns 
 */
const operatorFn1=(str:string,x:string,y:string,z:string)=>{
  let res={val1:'',val2:'',val3:str};

  if(x===''&&y===''){
    res.val1 = "";
    return res;
  }
  if(y===''){
    if(operatorList.includes(x[x.length-1])){
      res.val1 = x.substr(0,x.length-1)+z;
      res.val3 = str.substr(0,str.length-1)+z;
    }else if(x[x.length-1]==='('){
      res.val1 = x;
    }else{
      res.val1 = x+z;
      res.val3 += z;
    }
    return res;
  }
  if(x[x.length-1]==='='){
    res.val1 = y+z;
    res.val3 = y+z;
    return res;
  }

  res.val1 = x+String(Number(y))+z;
  res.val3 += String(Number(y))+z;
  return res;
}

const factorialize=(num:number)=> {
  if(num<0||!/^\d+$/.test(String(num))){
    return ;
  }
  let result = 1;
  for (let i = 1; i <= num; i++) {
      result *= i;
  }
  return result;
}

// = 两行都要修改
const equalFn1=(str:string,x:string,y:string)=>{
  let res={val1:x,val2:y,val3:str}
  if(x===''&&y===''){
    return res;
  }

  if(x===''){
    res.val1=Number(y)+'=';
    res.val2=String(Number(y));
    res.val3=String(Number(y));
    return res;
  }

  if(x[x.length-1]==='='){
    res.val1=y+'=';
    res.val3=y;
    return res;
  }

  str+=y;
  res.val1+=y;

  //最后一位是 +-x/%.
  if([...operatorList,'.'].includes(str[str.length-1])){
    str=str.substr(0,str.length-1);
    res.val1=res.val1.substr(0,res.val1.length-1);
    res.val2=String(Number(y));
  }

  //最后一位是 (
  if(str[str.length-1]==='('){
    str=str.substr(0,str.length-2);
    res.val1=res.val1.substr(0,res.val1.length-2);
  }

  let {leftNum,rightNum}=getBracketNum(x);
  if(leftNum>rightNum){
    str+=(')').repeat(leftNum-rightNum);
    res.val1+=(')').repeat(leftNum-rightNum);
  }

  try {
    let evalRes= eval(str.replace('×','*').replace('÷','\/'));
    if(String(evalRes)==='NaN'||String(evalRes)==='Infinity'){
      res.val2='格式错误！';
      res.val3='';      
    }else{
      res.val2=parseFloat(evalRes.toFixed(12))+'';
      res.val3=res.val2;      
    }  
  } catch (error) {
    res.val2='格式错误！';
    res.val3='';     
  }
  //判断除数不能为0
  // if(x[x.length-1]==='÷'&&y==='0'){
  // if(eval(str.replace('×','*').replace('÷','\/'))){
  //   res.val2='格式错误！';
  //   res.val3='';
  // }else{
  //   res.val2=parseFloat(eval(str.replace('×','*').replace('÷','\/')).toFixed(12))+'';
  //   res.val3=res.val2;
  // }
  res.val1+='=';
  return res;
  
}

// C 全部清除
const clearAll=()=>{
  return {val1:'',val2:'',val3:''}
}

// CE 清除第二行
const clearSec:Fn=(str,x,y)=>{
  if(x[x.length-1]==='='){
    return {val1:x,val2:y,val3:str};
  }  
  return {val1:x,val2:'',val3:str};
}

// x² 两行都要修改
const sqr=(str:string,x:string,y:string)=>{
  let res={val1:'',val2:'',val3:str};
  if(y===''){
    return res;
  }
  res.val1=x===''||x[x.length-1]==='='?('sqr('+y+')='):(x+'sqr('+y+')');
  res.val2=x===''||x[x.length-1]==='='?(parseFloat(eval(y+'*'+y).toFixed(12))+''):'';
  res.val3+=y+'*'+y;
  return res;    
}

// 1/x 两行都要修改
const reciprocal=(str:string,x:string,y:string)=>{
  let res={val1:'',val2:'',val3:str};
  if(y===''){
    return res;
  }
  res.val1=x===''||x[x.length-1]==='='?('1/('+y+')='):(x+'1/('+y+')');
  res.val2=x===''||x[x.length-1]==='='?(parseFloat(eval('1/'+y).toFixed(12))+''):'';
  res.val3+='1/'+y;
  if(y==='0'){
    res.val2='格式错误！';
    res.val3='';
  }
  return res;    
}

// √ 两行都要修改
const sqrt=(str:string,x:string,y:string)=>{
  let res={val1:'',val2:'',val3:str};
  if(y===''){
    return res;
  }
  res.val1=x===''||x[x.length-1]==='='?('√('+y+')='):(x+'√('+y+')');
  res.val2=x===''||x[x.length-1]==='='?(parseFloat(eval('Math.sqrt('+y+')').toFixed(12))+''):'';
  res.val3+='Math.sqrt('+y+')';
  if(Number(y)<0){
    res.val2='格式错误！';
    res.val3='';
  }  
  return res;    
}

// n! 两行都要修改
const fact=(str:string,x:string,y:string)=>{
  let res={val1:'',val2:'',val3:str};
  if(y===''){
    return res;
  }
  res.val1=x===''||x[x.length-1]==='='?('fact('+y+')='):(x+'fact('+y+')');
  let factVal=eval('factorialize('+y+')');
  if(factVal){
    res.val2=x===''||x[x.length-1]==='='?(parseFloat(factVal.toFixed(12))+''):'';
    res.val3+=factorialize(Number(y));
  }else{
    res.val2='格式错误！';
    res.val3='';
  }
  return res;    
}


// |x| 两行都要修改
const abs=(str:string,x:string,y:string)=>{
  let res={val1:'',val2:'',val3:str};
  if(y===''){
    return res;
  }
  res.val1=x===''||x[x.length-1]==='='?('abs('+y+')='):(x+'abs('+y+')');
  res.val2=x===''||x[x.length-1]==='='?(parseFloat(eval('Math.abs('+y+')').toFixed(12))+''):'';
  res.val3+='Math.abs('+y+')';
  return res;    
}

// log 两行都要修改
const log=(str:string,x:string,y:string)=>{
  let res={val1:'',val2:'',val3:str};
  if(y===''){
    return res;
  }
  res.val1=x===''||x[x.length-1]==='='?('log('+y+')='):(x+'log('+y+')');
  if(Number(y)<=0){
    res.val2='格式错误！';
    res.val3='';
  }else{
    res.val2=x===''||x[x.length-1]==='='?(parseFloat(eval('Math.log10('+y+')').toFixed(12))+''):'';
    res.val3+='Math.log10('+y+')';
  }
  return res;    
}
// ln 两行都要修改
const ln=(str:string,x:string,y:string)=>{
  let res={val1:'',val2:'',val3:str};
  if(y===''){
    return res;
  }
  res.val1=x===''||x[x.length-1]==='='?('ln('+y+')='):(x+'ln('+y+')');
  if(Number(y)<=0){
    res.val2='格式错误！';
    res.val3='';
  }else{
    res.val2=x===''||x[x.length-1]==='='?(parseFloat(eval('Math.log('+y+')').toFixed(12))+''):'';
    res.val3+='Math.log('+y+')';
  }
  return res;    
}

// +/- 修改第二行
const negative=(str:string,x:string,y:string)=>{
  let res={val1:x,val2:'',val3:str};
  res.val2=String(Number(y)*(-1));
  return res;    
}

// ( 修改第一行
const leftBrackets=(str:string,x:string,y:string)=>{
  let res={val1:x,val2:y,val3:str};
  if(x[x.length-1]==='='){
    res.val1='(';
    res.val2='';
    res.val3='(';
    return res;
  }
  if(y){
    return res;
  }
  res.val1+='(';
  res.val3+='(';
  return res;
}

// ) 修改第一行
const rightBrackets=(str:string,x:string,y:string)=>{
  let res={val1:x,val2:y,val3:str};
  let {leftNum,rightNum}=getBracketNum(x);
  if(leftNum<=rightNum||([...operatorList,'('].includes(x[x.length-1])&&y==='')){
    return res;
  }
  res.val1+=String(Number(y))+')';
  res.val3+=String(Number(y))+')';
  res.val2='';
  return res;
}



const list:BtnList[]=[  //name:按钮名称  light:是否高亮  fn1:操作第一行数据的方法  fn2:操作第二行数据的方法
  {name:"x²",light:false,fn:sqr as Fn},
  {name:"1/x",light:false,fn:reciprocal as Fn},
  {name:"CE",light:false,fn:clearSec},
  {name:"C",light:false,fn:clearAll},
  {name:"←",light:false,fn:backSpace},
  {name:"√",light:false,fn:sqrt as Fn},
  {name:"(",light:false,fn:leftBrackets as Fn},
  {name:")",light:false,fn:rightBrackets as Fn},
  {name:"n!",light:false,fn:fact as Fn},
  {name:"÷",light:false,fn:operatorFn1 as Fn},
  {name:"%",light:false,fn:operatorFn1 as Fn},
  {name:"7",light:true,fn:numFun2 as Fn},
  {name:"8",light:true,fn:numFun2 as Fn},
  {name:"9",light:true,fn:numFun2 as Fn},
  {name:"×",light:false,fn:operatorFn1 as Fn},
  {name:"|x|",light:false,fn:abs as Fn},
  {name:"4",light:true,fn:numFun2 as Fn},
  {name:"5",light:true,fn:numFun2 as Fn},
  {name:"6",light:true,fn:numFun2 as Fn},
  {name:"-",light:false,fn:operatorFn1 as Fn},
  {name:"log",light:false,fn:log as Fn},
  {name:"1",light:true,fn:numFun2 as Fn},
  {name:"2",light:true,fn:numFun2 as Fn},
  {name:"3",light:true,fn:numFun2 as Fn},
  {name:"+",light:false,fn:operatorFn1 as Fn},
  {name:"ln",light:false,fn:ln as Fn},
  {name:"+/-",light:true,fn:negative as Fn},
  {name:"0",light:true,fn:numFun2 as Fn},
  {name:".",light:true,fn:numFun2 as Fn},
  {name:"=",light:false,fn:equalFn1 as Fn},
]



export  {list,operatorList}