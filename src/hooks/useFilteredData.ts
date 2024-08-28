import { useState } from "react";


export const useFilteredData = (data:any, initialSearch:string = '') =>{
    const [search, setSearch] = useState(initialSearch);
    const filteredData = data.filter((item:any) =>
        Object.values(item).some(value => {

            if (value == null) return false;
            return value.toString()
                .replace(/Á|á/g, 'A')
                .replace(/É|é/g, 'E')
                .replace(/Í|í/g, 'I')
                .replace(/Ó|ó/g, 'O')
                .replace(/Ú|ú/g, 'U')
                .replace(/Ñ|ñ/g, 'N').toLowerCase().includes(search.toLowerCase())
        }

        )
    );

    return { search, setSearch, filteredData };
}