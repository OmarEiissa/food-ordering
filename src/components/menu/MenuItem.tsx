import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCartBtn from "./AddToCartBtn";
import { ProductWithRelations } from "@/types/product";

const MenuItem = ({ item }: { item: ProductWithRelations }) => {
  return (
    <li className="p-6 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all duration-200">
      <div className="relative size-48 mx-auto">
        <Image src={item.image} alt={item.name} className="object-cover" fill />
      </div>
      <div className="flex items-center flex-col lg:flex-row justify-between mb-4">
        <h4 className="text-base md:text-lg font-semibold mt-2 lg:my-3">{item.name}</h4>
        <strong className="text-accent">
          {formatCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>
      <AddToCartBtn item={item} />
    </li>
  );
};

export default MenuItem;
