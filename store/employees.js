import {globalFunctions} from "../functions/globalFunctions.js";
import {tableFunctions} from "../functions/tableFunctions.js";

export const state = () => ({
    titles: [],
    list: [],
    tableList: [],
    filteredList: [],
    sortedList: [],
    isFilterEnable: false,
    fioFilterStr: "",
    birthdateFilter: "",
    fioSort: {
        asc: 0,
        desc: 0
    },
    birthdateSort: {
        asc: 0,
        desc: 0
    },
    currentEmployee: {
        id: "1",
        surname: "Максимов",
        name: "Леонид",
        gender: "Мужской",
        email: "test@asd.ru",
        phone: "+79052314522",
        img: {
            path: "default-photo.png",
            isDefault: true
        }
    },
    isShowPreloader: false,
    isShowPopup: false,
    isShowPopupImg: false,
});
  
export const mutations = {
    add (state, person) {
        person["id"] = state.list.length + 1;

        state.list.push(person);

        this.commit("employees/getFilteredList");
    },
    getTableList(state){
        let list = globalFunctions.copy(state.sortedList),
            listLen = list.length,
            tableList = [];

        for(let i = 0; i < listLen; i++){
            let person = list[i],
                rebuildPerson = {},
                rebuildPersonArr = [],
                fieldsForCheck = ["fio", "birthdate", "gender", "phone", "email"], 
                fieldsForCheckLen = fieldsForCheck.length,
                replaceValues = {
                    "gender": {
                        "male": "Мужской",
                        "female": "Женский",
                    }
                };

            for(let j = 0; j < fieldsForCheckLen; j++){
                let field = fieldsForCheck[j];

                // Задаём начальное свойство пустым
                rebuildPerson = {};
                rebuildPerson["name"] = "";
                rebuildPerson["key"] = field;

                if(field == "fio"){
                    rebuildPerson["id"] = person["id"];
                }

                // Пересобираем значение свойств
                if(globalFunctions.isExistValue(replaceValues[field])){
                    person[field] = replaceValues[field][person[field]];
                }

                // Если дата рождения, преобразуем её
                if(field == "birthdate" && globalFunctions.isExistValue(person[field])){
                    person[field] = globalFunctions.getDateStr(person[field]);
                }

                // Задаём свойство, если оно существует
                if(globalFunctions.isExistValue(person[field])){
                    rebuildPerson["name"] = person[field];
                }

                rebuildPersonArr.push(rebuildPerson);
            }

            tableList.push(rebuildPersonArr);
        }

        state.tableList = tableList;
    },
    getFilteredList(state){
        let filteredList = globalFunctions.copy(state.list);

        // Делаем фильтрацию данных
        if(state.isFilterEnable){
            let fioFilterStr = state.fioFilterStr;
            if(globalFunctions.isExistValue(fioFilterStr)){
                filteredList = filteredList.filter(function(item){
                    return item["fio"].toLowerCase().includes(fioFilterStr.toLowerCase());
                });
            }
    
            let birthdateFilter = state.birthdateFilter;
            if(globalFunctions.isExistValue(birthdateFilter)){
                birthdateFilter = globalFunctions.getDateStr(birthdateFilter);
                filteredList = filteredList.filter(function(item){
                    var birthdate = globalFunctions.getDateStr(item["birthdate"]);
                    return birthdate == birthdateFilter;
                });
            }
        }
        
        state.filteredList = filteredList;

        this.commit("employees/getSortedList");
    },
    getSortedList(state){
        let sortedList = globalFunctions.copy(state.filteredList);

        if(state.fioSort.asc == 1){
            sortedList.sort(function(a, b){
                let aTextArr = a.fio.split(""),
					aTextArrLen = aTextArr.length,
					bTextArr = b.fio.split(""),
					bTextArrLen = bTextArr.length;

				for(let i = 0; i < aTextArrLen; i++){
					aTextArr[i] = aTextArr[i].charCodeAt(0);
				}
				for(let i = 0; i < bTextArrLen; i++){
					bTextArr[i] = bTextArr[i].charCodeAt(0);
				}

				for(let i = 0; i < aTextArrLen; i++){
					if(aTextArr[i] > bTextArr[i]){
						return 1;
					}
					else if(bTextArr[i] > aTextArr[i]){
						return -1;
					}
				}

				return 0;
            });
        }
        else if(state.fioSort.desc == 1){
            sortedList.sort(function(a, b){
                let aTextArr = a.fio.split(""),
					aTextArrLen = aTextArr.length,
					bTextArr = b.fio.split(""),
					bTextArrLen = bTextArr.length;

				for(let i = 0; i < aTextArrLen; i++){
					aTextArr[i] = aTextArr[i].charCodeAt(0);
				}
				for(let i = 0; i < bTextArrLen; i++){
					bTextArr[i] = bTextArr[i].charCodeAt(0);
				}

				for(let i = 0; i < aTextArrLen; i++){
					if(aTextArr[i] < bTextArr[i]){
						return 1;
					}
					else if(bTextArr[i] < aTextArr[i]){
						return -1;
					}
				}

				return 0;
            });
        }
        else if(state.birthdateSort.asc == 1){
            sortedList.sort(function(a, b){
                let aTime = new Date(a.birthdate).getTime(),
                    bTime = new Date(b.birthdate).getTime()
                
                return aTime - bTime;
            });
        }
        else if(state.birthdateSort.desc == 1){
            sortedList.sort(function(a, b){
                let aTime = new Date(a.birthdate).getTime(),
                    bTime = new Date(b.birthdate).getTime()
                
                return bTime - aTime;
            });
        }

        state.sortedList = sortedList;

        this.commit("employees/getTableList");
    },
    enableFiltering(state){
        state.isFilterEnable = true;
    },
    setFioFilterStr(state, str){
        state.fioFilterStr = str;
    },
    setBirthdateFilter(state, str){
        state.birthdateFilter = str;
    },
    setSortParam(state, sortObj){
        // Чистим текущие поля
        let sortKeys = ["fioSort", "birthdateSort"],
            sortKeysLen = sortKeys.length,
            key = sortObj["key"],
            sortType = sortObj["sortType"];

        for(let i = 0; i < sortKeysLen; i++){
            state[sortKeys[i]].asc = 0;
            state[sortKeys[i]].desc = 0;
        }    

        // Ставим выбранный параметр
        state[key][sortType] = 1;

        // Ставим значения заголовков в таблице
        let titles = tableFunctions.getTitles(state.fioSort, state.birthdateSort);
        this.commit("employees/setTitles", titles);

        // Делаем сортировку по выбранному параметру
        this.commit("employees/getSortedList");
    },
    setCurrentEmployee(state, id){
        let list = globalFunctions.copy(state.list),
            listLen = list.length,
            currentEmployee = "",
            fieldsForFill = ["id", "surname", "name", "gender", "phone", "email", "img"], 
            fieldsForFillLen = fieldsForFill.length,
            replaceValues = {
                "gender": {
                    "male": "Мужской",
                    "female": "Женский",
                }
            };

        for(let i = 0; i < listLen; i++){
            if(list[i].id == id){
                currentEmployee = list[i];
                break;
            }
        }

        for(let i = 0; i < fieldsForFillLen; i++){
            let field = fieldsForFill[i];

            if(field == "img"){
                state.currentEmployee[field].path = currentEmployee[field];
                state.currentEmployee[field].isDefault = false;
            }
            else {
                // Пересобираем значение свойств
                if(globalFunctions.isExistValue(replaceValues[field])){
                    currentEmployee[field] = replaceValues[field][currentEmployee[field]];
                }

                state.currentEmployee[field] = currentEmployee[field];
            }
        }
    },
    setTitles(state, titles){
        state.titles = titles;
    },
    showPopup(state){
        state.isShowPopup = true;
    },
    hidePopup(state){
        state.isShowPopup = false;
    },
    showPopupImg(state){
        state.isShowPopupImg = true;
    },
    hidePopupImg(state){
        state.isShowPopupImg = false;
    },
    showPreloader(state){
        state.isShowPreloader = true;
    },
    hidePreloader(state){
        state.isShowPreloader = false;
    }
}