export const globalFunctions = {
    /**
     * Проверка на существование значения
     * @param {*} value 
     * @returns 
     */
    isExistValue(value) {
        let result = false;
        if(typeof(value) != "undefined" && value !== "" && value != null){
            result = true;
        }
    
        return result;
    },

    /**
     * Получение даты в формате DD.MM.YYYY
     * @param {*} date 
     * @returns 
     */
    getDateStr(date){
        var dateObj = new Date(date),
            days = "",
            months = "",
            years = "",
            dateStr = "";

        days = dateObj.getDate();
        if(days < 10){
            days = "0" + days;
        }

        months = dateObj.getMonth() + 1;
        if(months < 10){
            months = "0" + months;
        }

        years = dateObj.getFullYear();

        dateStr = days + "." + months + "." + years;

        return dateStr;
    },

    /**
     * Копирование объекта
     * @param {*} obj 
     */
    copy(obj) {
        var that = this;

        function copyProps (clone) {
            for (let key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    clone[key] = that.copy(obj[key]);
                }
            }
        }
    
        /**
        * Создание иммутабельной копии объекта
        * @return {Object}
        */
        function cloneObj () {
            let clone = {};
            copyProps(clone);
            return clone;
        }
    
        /**
        * Создание иммутабельной копии массива
        * @return {Array}
        */
        function cloneArr () {
            return obj.map(function (item) {
                return that.copy(item);
            });
        }
    
        /**
        * Создание иммутабельной копии Map
        * @return {Map}
        */
        function cloneMap () {
            let clone = new Map();
            for (let [key, val] of obj) {
                clone.set(key, that.copy(val));
            }
            return clone;
        }
    
        /**
        * Создание иммутабельной копии Set
        * @return {Set}
        */
        function cloneSet () {
            let clone = new Set();
            for (let item of obj) {
                clone.add(that.copy(item));
            }
            return clone;
        }
    
        /**
        * Создание иммутабельной копии функции
        * @return {Function}
        */
        function cloneFunction () {
            let clone = obj.bind(this);
            copyProps(clone);
            return clone;
        } 
    
        // Получение типа объекта
        let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    
        // Возвращаем копию в зависимости от типа исходных данных
        if (type === 'object') return cloneObj();
        if (type === 'array') return cloneArr();
        if (type === 'map') return cloneMap();
        if (type === 'set') return cloneSet();
        if (type === 'function') return cloneFunction();
    
        return obj;
    }
}