"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "@/constants/enums";
import { Translations } from "@/types/translations";
import { Category } from "@prisma/client";
import { useParams } from "next/navigation";

const SelectCategory = ({
  categories,
  categoryId,
  setCategoryId,
  translations,
}: {
  categories: Category[];
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  translations: Translations;
}) => {
  const currentItem = categories.find((item) => item.id === categoryId);
  const { locale } = useParams();

  return (
    <>
      <Label htmlFor="categoryId" className="capitalize text-black block mb-3">
        {translations.category}
      </Label>

      <Select
        name="categoryId"
        onValueChange={(value) => setCategoryId(value)}
        defaultValue={categoryId}
      >
        <SelectTrigger
          id="categoryId"
          className={`w-48 h-10 bg-gray-100 border-none mb-4 focus:ring-0 ${
            locale === Languages.ENGLISH ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <SelectValue>{currentItem?.name}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-transparent border-none z-50 bg-gray-100">
          <SelectGroup className="bg-background text-accent z-50">
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="hover:!bg-primary hover:!text-white !text-accent !bg-transparent"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectCategory;
