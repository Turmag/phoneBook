export const tableFunctions = {
    getTitles: function(fioSort, birthdateSort) {
        let titles = {
            fio: {
              name: "ФИО", 
              key: "fioSort",
              sort: 1,
              sortAsc: fioSort.asc,
              sortDesc: fioSort.desc,
            },
            birthdate: {
              name: "Дата рождения", 
              key: "birthdateSort",
              sort: 1,
              sortAsc: birthdateSort.asc,
              sortDesc: birthdateSort.desc,
            },
            gender: {
              name: "Пол", 
            },
            phone: {
              name: "Телефон"
            },
            email: {
              name: "Email"
            }
        };

        return titles;
    }
};