import Donations from "./donations";
export const metadata = {
  title: "Wecare|donations",
  description:
    "This page is to add products to the database",
  alternates: {
    canonical: `https://wecare.co.za/donations/`,
  },
};

const Donations_page = () => {
  return <Donations />;
};

export default Donations_page;
