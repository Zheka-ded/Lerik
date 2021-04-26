import { createContext } from 'react';

export const ProductsContext = createContext({
    products: null,
    selectProducts: null,
    setSelectProducts: null,
    selectedCategoryName: null,
    setSelectedCategoryName: null,
})