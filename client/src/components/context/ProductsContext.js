import { createContext } from 'react';

function noop () {};

export const ProductsContext = createContext({
    category: null,
    showCategory: noop(),
    subCategory: null,
    showSubCategory: noop(),
    products: null,
    showProducts: noop(),
    subProducts: null,
    showSubProducts: noop(),
})