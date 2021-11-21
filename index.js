export const getDateIfValid = value => {
	const date = Date.parse(value);
	return isNaN(date) ? null : new Date(date);
};
export const getArrayIfValid = (value, def=null) => {
	return Array.isArray(value) ? value : def;
};
export const getArrayOfObjectID = value => {
	if (Array.isArray(value) && value.length > 0) {
		return value.map(id => getObjectIDIfValid(id)).filter(id => !!id);
	} else {
		return [];
	}
};
export const isNumber = value => !isNaN(parseFloat(value)) && isFinite(value);

export const getNumberIfValid = value => (isNumber(value) ? parseFloat(value) : null);

export const getNumberIfPositive = value => {
	const n = getNumberIfValid(value);
	return n && n >= 0 ? n : null;
};
export const getBooleanIfValid = (value, defaultValue = null) => {
	if (value === 'true' || value === 'false') {
		return value === 'true';
	} else {
		return typeof value === 'boolean' ? value : defaultValue;
	}
};

export const getBrowser = browser => {
	return browser
		? {
				ip: getString(browser.ip),
				user_agent: getString(browser.user_agent)
		  }
		: {
				ip: '',
				user_agent: ''
		  };
};
export const getCustomerAddress = address => {
	let coordinates = {
		latitude: '',
		longitude: ''
	};

	if (address && address.coordinates) {
		coordinates.latitude = address.coordinates.latitude;
		coordinates.longitude = address.coordinates.longitude;
	}
    try {
        const mongodb = require('mongodb');
        return mongodb && address
            ? {
                    id: new mongodb.ObjectID(),
                    full_name: getString(address.full_name),
                    address1: getString(address.address1),
                    address2: getString(address.address2),
                    city: getString(address.city),
                    country: getString(address.country).toUpperCase(),
                    postal_code: getString(address.postal_code),
                    state: getString(address.state),
                    phone: getString(address.phone),
                    company: getString(address.company),
                    tax_number: getString(address.tax_number),
                    coordinates: coordinates,
                    details: address.details,
                    default_billing: false,
                    default_shipping: false
            }
            : {};
    } catch (error) {
        console.log(error)
    }
    
};

export const basename = function(path) {
   return path.split('/').reverse()[0];
};
export const hasValue = function(val) {
    return val !== null && val !== undefined && val.toString().length > 0;
}
export const hasArray = function(array) {
    return Array.isArray(array) && array.length && array.length > 0;
}
export const hasObject = function(object) {
    return object !== null && object !== undefined && typeof(object) == 'object' && Object.keys(object).length > 0;
}
export const forVal = function(obj, props=[], def=false) {
     let loopObj = obj;
     let respString;
    for(let i=0; i<props.length;i++){
        respString = getValue(loopObj, props[i]);
        if((typeof(respString) != 'object')&&(i<props.length)){
            return false;
        }
        else if((typeof(respString) == 'string')&&(i==props.length)){
            return respString;
        }
        loopObj = respString;
    }
}
export const getValue = function(obj, prop, def=false) {
    let ret_val = false;
    if(obj){
        if(typeof(obj) == 'object'){
            if(obj.hasOwnProperty(prop)){
                if(obj[prop] != null && obj[prop] != ''){
                    return obj[prop];
                }
            }
        }
    }
    return ret_val;
}
export const getString = function(obj, prop) {
    let retStr = '';
    if(obj){
        if(typeof(obj) == 'object'){
            if(obj.hasOwnProperty(prop)){
                if(typeof(obj[prop]) == 'string'){
                    return obj[prop];
                }
            }
        }
    }
    return retStr;
}
export const getBool = function(bool) {
    if(bool){
        if(bool == '1' || bool == 1 || bool == true || bool == 'true'){
            return true
        }
        else if(bool == '0' || bool == 0 || bool == false || bool == 'false'){
            return false
        }
    }
    return false
}
export const getNum = function(num, def=0) {
    if(bool){
        if(typeof(num) == 'number'){
            return parseInt(num);
        }
    }
    return def
}
export const getObj = function(objects_array, prop, val) {
    let retObj;
    if(objects_array){
        if(objects_array.length > 0){
            for(const i=0; i<objects_array.length; i++){
                if(objects_array[i].hasOwnProperty(prop)){
                    if(objects_array[i][prop] == val){
                        retObj = objects_array[i];
                    }
                }
            }
        }
    }
    return retObj;
}
export const updateObject = function(objects_array, prop, val, data) {
    if(objects_array){
        if(objects_array.length > 0){
            for(const i=0; i<objects_array.length; i++){
                if(objects_array[i].hasOwnProperty(prop)){
                    if(objects_array[i][prop] == val){
                        for(const k in data){
                            objects_array[i][k] = data[k];
                        }
                    }
                }
            }
        }
    }
    return objects_array;
}
export const removeObjectByPropVal = function(objects_array, val, prop) {
    let retObj;
    if(objects_array.length > 0){
        for(let i=0; i<objects_array.length; i++){
            if(objects_array[i].hasOwnProperty(prop)){
                if(objects_array[i][prop] == val){
                    objects_array.splice(i, 1);
                    return objects_array;
                }
            }
        }
    }
}
export const respWidth = function(width) {
    return ((window.innerWidth / 100) * width)+'px'
}
export const respHeight = function(height) {
    return ((window.innerHeight / 100) * height)+'px'
}
export const outerWidth = function(width) {
    return ((window.outerWidth / 100) * width)+'px'
}
export const outerHeight = function(height) {
    return ((window.outerHeight / 100) * height)+'px'
}
export const getObjectByPropName = function(obj, prop) {
    return false;
}
export const inArray = function(el, array) {
    return array.indexOf(el) > -1 ? true : false;
}
export const delFromArray = function(el, array) {
    let elIndex = array.indexOf(el);
    if(elIndex > -1){
        array.splice(elIndex, 1)
    }
    else{
        return false;
    }
}
!function() {
    function _dynamicSortMultiple(attr) {
        let props = arguments;
        return function (obj1, obj2) {
            let i = 0, result = 0, numberOfProperties = props.length;
            while(result === 0 && i < numberOfProperties) {
                result = _dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        }
    }
    function _dynamicSort(property) {
        let sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    Array.prototype.sortBy = function() {
        return this.sort(_dynamicSort.apply(null, arguments));
    }
}();
Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}
export const trim = function (str) {
    if(str && typeof(str) == 'string')
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
const calc = {
    '*': function(a, b) { return a * b },
    '/': function(a, b) { return a / b },
    '+': function(a, b) { return a + b },
    '-': function(a, b) { return a - b },
    '=': function(a, b) { return },
};
export const cl = function(msg) {
    console.log('msg', msg)
}
const getObjectIDIfValid = value => {
    try {
        const mongodb = require('mongodb');
	    return mongodb && mongodb.ObjectID.isValid(value) ? new ObjectID(value) : null;
    } catch (error) {
        console.log(error)
    }
};
const getOrderAddress = address => {
	let coordinates = {
		latitude: '',
		longitude: ''
	};

	if (address && address.coordinates) {
		coordinates.latitude = address.coordinates.latitude;
		coordinates.longitude = address.coordinates.longitude;
	}

	const emptyAddress = {
		full_name: '',
		address1: '',
		address2: '',
		city: '',
		country: '',
		postal_code: '',
		state: '',
		phone: '',
		company: '',
		tax_number: '',
		coordinates: coordinates,
		details: null
	};

	return address
		? Object.assign(
				{},
				{
					full_name: getString(address.full_name),
					address1: getString(address.address1),
					address2: getString(address.address2),
					city: getString(address.city),
					country: getString(address.country).toUpperCase(),
					postal_code: getString(address.postal_code),
					state: getString(address.state),
					phone: getString(address.phone),
					company: getString(address.company),
					tax_number: getString(address.tax_number),
					coordinates: coordinates,
					details: address.details
				},
				address
		  )
		: emptyAddress;
};
export default {
    basename,
	getString,
	getObjectIDIfValid,
	getDateIfValid,
	getArrayIfValid,
	getArrayOfObjectID,
	getNumberIfValid,
	getNumberIfPositive,
	getBooleanIfValid,
	getBrowser,
	getCustomerAddress,
	getOrderAddress,
    hasValue,
    hasArray,
    hasObject,
    forVal,
    getBool,
    getNum,
    getObj,
    updateObject,
    removeObjectByPropVal,
    respWidth,
    respHeight,
    outerWidth,
    outerHeight,
    getObjectByPropName,
    inArray,
    delFromArray,
    trim,
    calc,
    cl
};
