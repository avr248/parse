export const hasValue = v => v !== null && v !== undefined && v.toString().length > 0;

export const hasArray = a =>  Array.isArray(a) && a.length && a.length > 0;

export const hasObject = o => o  && typeof(o) == 'object' && Object.keys(o).length > 0;

export const isNumber = v => !isNaN(parseFloat(v)) && isFinite(v);

export const isEmail = (e) => e && (typeof(e) == 'string') && e.length > 0 && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)

export const inArray = (el, array) => array.indexOf(el) > -1 ? true : false;

export const getValue = (o, p, d=false) => !o || !p || !typeof(o) == 'object' || !typeof(p) == 'string' || !o[p] ? d : o[p]

export const getString = (str) => !str || typeof(str) !== 'string' ? '' : str;

export const getBool = b => b == '1' || b == 1 || b == true || b == 'true' ? true : b == '0' || b == 0 || b == false || b == 'false' ? false : false

export const getBasename = p => p.split('/').reverse()[0]

export const getBooleanIfValid = (v, d = null) => v === 'true' || v === 'false' ? v === 'true' : typeof v === 'boolean' ? v : d;

export const getDateIfValid = v => isNaN(Date.parse(v)) ? null : new Date(Date.parse(v));

export const getArrayIfValid = (v, d=null) => Array.isArray(v) ? v : d;

export const getNumberIfValid = v => (isNumber(v) ? parseFloat(v) : null);

export const getNumberIfPositive = v => getNumberIfValid(v) >= 0 && getNumberIfValid(v);

export const getObj = (objects_array, prop, val) => {
    if(objects_array && objects_array.length > 0){
        for(let i=0; i<objects_array.length; i++){
            if(objects_array[i].hasOwnProperty(prop) && objects_array[i][prop] == val){
                return retObj = objects_array[i];
            }
        }
    }
    return false;
}

export default {
    getValue,
	getString,
    getBasename,
	getDateIfValid,
	getArrayIfValid,
	getNumberIfValid,
	getNumberIfPositive,
	getBooleanIfValid,
    hasValue,
    hasArray,
    hasObject,
    getBool,
    inArray,
    isEmail,
    getObj
};