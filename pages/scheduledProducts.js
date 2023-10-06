import Layout from '../components/layout'
import ProductItems from '../components/Products/ProductItems'
import { useState, useEffect } from 'react'
import ProductItemsSkeleton from '../components/Products/ProductItemsSkeleton'
import ProductHeader from '../components/Products/ProductHeader'
import AddProduct from '../components/ScheduledProduct/AddProduct'
import UpdateSchedule from '../components/ScheduledProduct/UpdateSchedule'

function ScheduledProducts() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [originalProducts, setOriginalProducts] = useState([])
  const [profiles, setProfiles] = useState([])
  const [originalProfiles, setOriginalProfiles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/getProducts?location=rec_ckfvcovuh5vee35u25vg`);
        const { data } = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/getProducts?location=rec_ckfvcmde81akoi4ra9ag`);
        const { data } = await res.json();
        setOriginalProducts(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/configProfiles/getProfiles?location=rec_ckfvcovuh5vee35u25vg`);
        const { data } = await res.json();
        setProfiles(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/configProfiles/getProfiles?location=rec_ckfvcmde81akoi4ra9ag`);
        const { data } = await res.json();
        setOriginalProfiles(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <header className="mt-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Products</h1>
        <div className="flex items-center space-x-2">
          <AddProduct />
          <UpdateSchedule products={products} location='rec_ckfvcovuh5vee35u25vg' originalProducts={originalProducts} profiles={profiles} originalProfiles={originalProfiles }/>
        </div>
      </header>
      <ProductHeader />
      {loading ? (
        <ProductItemsSkeleton />
      ) : (
        <>
          <ProductItems products={products} />
        </>
      )}
    </div>
  )
}

export default ScheduledProducts

ScheduledProducts.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'Scheduled Products' }}>{page}</Layout>
}
