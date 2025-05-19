import Products from "./products";
export const metadata = {
  title: "WeCare|Products",
  description:
    "Our calculator will help you work out the cost of your child's pre-primary, primary, secondary and tertiary education. You will also get a comprehensive report.",
  alternates: {
    canonical: `https://wecare.co.za/products/`,
  },
};

const ProductPage = () => {
  return <Products />;
};

export default ProductPage;
