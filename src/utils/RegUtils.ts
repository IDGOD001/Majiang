  /**
	* 正则公用方法汇总
	* RegUtils.checkEmail()
    */

module RegUtils
{
	  // export var aCity ={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
		//   21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
		//   33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
		//   42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
		//   51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
		//   63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
	  // };

	  // export function isCardID(sId)
	  // {
		//   var iSum=0;
      //
		//   var info="";
      //
		//   if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
      //
		//   sId=sId.replace(/x$/i,"a");
      //
		//   if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";
      //
		//   var sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
      //
		//   var d=new Date(sBirthday.replace(/-/g,"/")) ;
      //
		//   if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";
      //
		//   for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
      //
		//   if(iSum%11!=1) return "你输入的身份证号非法";
      //
		//   //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
		//   return true;
	  // }

	/* 
	用途：检查输入的Email信箱格式是否正确 
	输入：strEmail：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function checkEmail(strEmail):boolean
	{
	    //var emailReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/;

	    var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

	    if ( emailReg.test(strEmail) )
		{
	        return true;
	    }
	    else
		{
	        EffectUtils.showTips("您输入的Email地址格式不正确！");
	        return false;
	    }
	}
	 
	/*
	用途：校验ip地址的格式 
	输入：strIP：ip地址 
	返回：如果通过验证返回true,否则返回false； 
	*/
	export function isIP(strIP):boolean 
	{
	    if (isNull(strIP))
		{
	        return false;
	    }

	    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式

	    if (re.test(strIP))
		{
            if (Number(RegExp.$1) < 256 && Number(RegExp.$2) < 256 && Number(RegExp.$3) < 256 && Number(RegExp.$4) < 256)
			{
	            return true;
	        }
	    }
	    return false;
	}
	 
	/* 
	用途：检查输入手机号码是否正确 
	输入：strMobile：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function checkMobile( strMobile ):boolean
	{
	    var regu:string = "/^1[3|4|5|7|8][0-9]\d{4,8}$/";

	    var re = new RegExp(regu);

	    if(re.test(strMobile))
		{
	        return true;
	    }
	    else
		{
	        return false;
	    }
	}
	 
	/* 
	用途：检查输入的电话号码格式是否正确 
	输入：strPhone：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function checkPhone( strPhone ):boolean 
	{
	    var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;

	    var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;

        var prompt = "您输入的电话号码不正确!";

        if (strPhone.length > 9)
		{
	        if ( phoneRegWithArea.test(strPhone) )
			{
	            return true;
	        }
	        else
			{
	            EffectUtils.showTips( prompt );
	            return false;
	        }
	    }
	    else
		{
	        if ( phoneRegNoArea.test( strPhone ) )
			{
	            return true;
	        }
	        else
			{
				EffectUtils.showTips( prompt );
	            return false;
	        }
	    }
	}
	 
	/* 
	用途：检查输入字符串是否为空或者全部都是空格 
	输入：str 
	返回：如果全是空返回true,否则返回false 
	*/
	export function isNull( str ):boolean
	{
	    if ( str == "" )
		{
	        return true;
	    }

	    var regu = "^[ ]+$";

	    var re = new RegExp(regu);

	    return re.test(str);
	}
	 
	/* 
	用途：检查输入对象的值是否符合整数格式 
	输入：str 输入的字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function isInteger( str ):boolean
	{
	    var regu = /^[-]{0,1}[0-9]{1,}$/;

	    return regu.test(str);
	}
	 
	/* 
	用途：检查输入字符串是否符合正整数格式 
	输入：s：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function isNumber( s ):boolean
	{
	    var regu = "^[0-9]+$";

	    var re = new RegExp(regu);

	    if(s.search(re) != - 1)
		{
	        return true;
	    }
	    else
		{
	        return false;
	    }
	}
	 
	/* 
	用途：检查输入字符串是否符合金额格式,格式定义为带小数的正数，小数点后最多三位 
	输入：s：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function isMoney( s ):boolean
	{
	    var regu = "^[0-9]+[\.][0-9]{0,3}$";

	    var re = new RegExp(regu);

	    if(re.test(s))
		{
	        return true;
	    }
	    else
		{
	        return false;
	    }
	}
	 
	/*
	function:cTrim(sInputString,iType) 
	description:字符串去空格的函数 
	parameters:iType：1=去掉字符串左边的空格;2=去掉字符串左边的空格;0=去掉字符串左边和右边的空格 
	return value:去掉空格的字符串 
	*/
	export function cTrim(sInputString, iType):string
	{
	    var sTmpStr = ' ';

	    var i = - 1;

	    if (iType == 0 || iType == 1) 
	    {
	        while (sTmpStr == ' ')
			{
	            ++i;
	            sTmpStr = sInputString.substr(i, 1);
	        }

	        sInputString = sInputString.substring(i);
	    }

	    if (iType == 0 || iType == 2)
	    {
	        sTmpStr = ' ';

	        i = sInputString.length;

	        while (sTmpStr == ' ')
			{
	            --i;

	            sTmpStr = sInputString.substr(i, 1);
	        }

	        sInputString = sInputString.substring(0, i + 1);
	    }

	    return sInputString;    
	}
}