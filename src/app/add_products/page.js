import Products from "./add_products";
export const metadata = {
  title: "Temoserv|products",
  description:
    "This page is to add products to the database",
  alternates: {
    canonical: `https://wecare.co.za/products/`,
  },
};

const Product_page = () => {
  return <Products />;
};

export default Product_page;
