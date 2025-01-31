import { Category } from "@prisma/client";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const CategoryItem = async ({ category }: { category: Category }) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  return (
    <li className="bg-gray-300 p-4 rounded-md flex justify-between">
      <h3 className="text-black font-medium text-lg flex-1 flex flex-row lg:flex-col max-lg:gap-2 max-lg:items-center">
        <span>{category.name}</span>
        {/* // TODO: add products count */}
        {/* <span className="text-sm text-accent block">10 products</span> */}
      </h3>
      <div className="flex items-center gap-2">
        <EditCategory translations={translations} category={category} />
        <DeleteCategory translations={translations} id={category.id} />
      </div>
    </li>
  );
};

export default CategoryItem;
