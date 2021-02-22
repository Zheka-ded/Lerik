import './ProductsNav.scss';

export default function ProductsNav (props) {

    const { products } = props;

    console.log(products)

    return (
        <div className="ProductsNav">

            {products !== null && products.map(elem => (
                <div key={elem._id} ><h2>{elem.title}</h2></div>
            ))}

        </div>
    )
}