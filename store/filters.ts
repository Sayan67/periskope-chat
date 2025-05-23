import {atom} from 'jotai'



export const filtersAtom = atom<{
    state: "filter"|"search"|"",
    search: string,
    filter: string,
    sort: string,
}
>({
    state: "",
    search :'',
    filter: 'all',
    sort: 'asc',
})