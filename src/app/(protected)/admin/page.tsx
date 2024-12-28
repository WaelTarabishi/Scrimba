import { Package, Plus, ShoppingCart, Wallet } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { AdminBalance } from "../../../../actions/user/get-admin-balance";
import Balance from "./_component/balance";

const AdminCard = ({
  title,
  icon,
  link,
  color,
}: {
  title: string;
  link: string;
  color: string;
  icon: ReactElement;
}) => (
  <Link
    href={link}
    className={`bg-${color}-500   hover:bg-${color}-600 text-white rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg`}>
    {icon}
    <h2 className="mt-4 text-xl font-semibold">{title}</h2>
  </Link>
);

const AdminPage = async () => {
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminCard
          title="Add Product"
          icon={<Plus size={48} />}
          link="/admin/add-products"
          color="blue"
        />
        <AdminCard
          title="View Orders"
          icon={<ShoppingCart size={48} />}
          link="/admin/orders"
          color="green"
        />
        <AdminCard
          title="View Products"
          icon={<Package size={48} />}
          link="/admin/view-products"
          color="red"
        />
        <div className="bg-yellow-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-lg">
          <Wallet size={48} />
          <h2 className="mt-4 text-xl font-semibold">Balance</h2>
          <p className="text-2xl font-bold mt-2">
            <Balance />
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
