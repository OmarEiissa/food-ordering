import { getCurrentLocale } from "@/lib/getCurrentLocale";
import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/types/product";
import getTrans from "@/lib/translation";

const Menu = async ({ items }: { items: ProductWithRelations[] }) => {
  const locale = await getCurrentLocale();
  const { noProductsFound } = await getTrans(locale);

  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">{noProductsFound}</p>
  );
};

export default Menu;
