import Orders from "./orders";
export const metadata = {
    title: "WeCare|Orders",
    description:
        "Our calculator will help you work out the cost of your child's pre-primary, primary, secondary and tertiary education. You will also get a comprehensive report.",
    alternates: {
        canonical: `https://wecare.co.za/orders/`,
    },
};

const OrdersPage = () => {
    return <Orders />;
};

export default OrdersPage;
