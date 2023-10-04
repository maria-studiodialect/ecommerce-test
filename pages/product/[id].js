import React from 'react'
import Layout from '../../components/layout'
import ProductLayout from '../../components/Product/ProductLayout'
import DeleteProduct from '../../components/Product/DeleteProduct'
import UpdateProduct from '../../components/Product/UpdateProduct'
import { getXataClient } from "../../utils/xata";

const xata = getXataClient();
function Product({ product }) {
  return (
    <div>
      <header className="my-3 flex flex-col items-center justify-between rounded-md md:flex-row">
        <h1 className="mb-3 truncate text-xl font-bold text-gray-700">
          <span className="mr-2 text-sm font-medium text-gray-500">
            Product:{' '}
          </span>
          {product?.name}
        </h1>
        <div className="flex items-center space-x-2">
          <UpdateProduct product={product} />
          <DeleteProduct />
        </div>
      </header>
      {product ? (
        <ProductLayout product={product} />
      ) : (
        <div className="w-full text-center text-2xl font-bold text-gray-300">
          No details
        </div>
      )}
    </div>
  )
}

export default Product

Product.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'Products' }}>{page}</Layout>
}

// fetching data from xata in server for generating static pages
export async function getStaticProps({ params }) {
  // getting filtered data from Xat
  const data = await xata.db.products
    .filter({
      id: params.id,
    })
    .getFirst();
  return {
    props: { product: data },
  };
}
// pre-rendering all the static paths
export async function getStaticPaths() {
  const products = await xata.db.products.getAll();
  return {
    paths: products.map((item) => ({
      params: { id: item.id },
    })),
    // whether to run fallback incase if user requested a page other than what is passed inside the paths
    fallback: true,
  };
}
