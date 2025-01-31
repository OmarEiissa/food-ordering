"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import { Category, Extra, Size } from "@prisma/client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import ItemOptions, { ItemOptionsKeys } from "./ItemOptions";
import Link from "@/components/link";
import { useParams } from "next/navigation";
import { ValidationErrors } from "@/validations/auth";
import { addProduct, deleteProduct, updateProduct } from "../_actions/product";
import Loader from "@/components/ui/loader";
import { toast } from "@/hooks/use-toast";
import { ProductWithRelations } from "@/types/product";
import AlertBtn from "@/components/alertBtn/AlertBtn";

const Form = ({
  translations,
  categories,
  product,
}: {
  translations: Translations;
  categories: Category[];
  product?: ProductWithRelations;
}) => {
  const [selectedImage, setSelectedImage] = useState(
    product ? product.image : ""
  );
  const [categoryId, setCategoryId] = useState(
    product ? product.categoryId : categories[0].id
  );
  const [sizes, setSizes] = useState<Partial<Size>[]>(
    product ? product.sizes : []
  );
  const [extras, setExtras] = useState<Partial<Extra>[]>(
    product ? product.extras : []
  );

  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    translations,
  });

  const formData = new FormData();

  Object.entries(product ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData: null,
  };

  const [state, action, pending] = useActionState(
    product
      ? updateProduct.bind(null, {
          productId: product.id,
          options: { sizes, extras },
        })
      : addProduct.bind(null, { categoryId, options: { sizes, extras } }),
    initialState
  );

  useEffect(() => {
    if (state.message && state.status && !pending) {
      toast({
        title: state.message,
        className:
          state.status === 201 || state.status === 200
            ? "text-green-400"
            : "text-destructive",
      });
    }
  }, [state.message, state.status, pending]);

  return (
    <form action={action} className="flex flex-col md:flex-row gap-10">
      <div>
        <UploadImage // todo: delete image before add new
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        {state?.error?.image && (
          <p className="text-sm text-destructive text-center mt-4 font-medium">
            {state.error.image}
          </p>
        )}
      </div>

      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state.formData?.get(field.name) ?? formData.get(field.name);

          return (
            <div key={field.name} className="mb-3">
              <FormFields
                {...field}
                error={state.error}
                defaultValue={fieldValue as string}
              />
            </div>
          );
        })}

        <SelectCategory
          categoryId={categoryId}
          categories={categories}
          setCategoryId={setCategoryId}
          translations={translations}
        />

        <div className="flex flex-col lg:flex-row items-start lg:gap-4">
          <AddSize
            translations={translations}
            sizes={sizes}
            setSizes={setSizes}
          />

          <AddExtras
            translations={translations}
            extras={extras}
            setExtras={setExtras}
          />
        </div>

        <FormActions
          translations={translations}
          pending={pending}
          product={product}
        />
      </div>
    </form>
  );
};

export default Form;

const UploadImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  return (
    <div className="group mx-auto md:mx-0 relative size-[200px] overflow-hidden rounded-full">
      {selectedImage && (
        <Image
          src={selectedImage}
          alt={"Add Product Image"}
          width={200}
          height={200}
          className="object-cover rounded-full"
        />
      )}

      <div
        className={`${
          selectedImage
            ? "group-hover:opacity-[1] opacity-0 transition-opacity duration-200"
            : ""
        } absolute top-0 left-0 size-full bg-gray-50/40`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
          name="image"
          aria-label="Image upload"
        />
        <label
          htmlFor="image-upload"
          className="border rounded-full size-[200px] element-center cursor-pointer"
        >
          <Camera className="!size-8 text-accent" />
        </label>
      </div>
    </div>
  );
};

const FormActions = ({
  translations,
  pending,
  product,
}: {
  translations: Translations;
  pending: boolean;
  product?: ProductWithRelations;
}) => {
  const { locale } = useParams();
  const [state, setState] = useState<{
    pending: boolean;
    status: null | number;
    message: string;
  }>({
    pending: false,
    status: null,
    message: "",
  });
  const handleDelete = async (id: string) => {
    try {
      setState((prev) => {
        return { ...prev, pending: true };
      });

      const res = await deleteProduct(id);

      setState((prev) => {
        return { ...prev, status: res.status, message: res.message };
      });

      if (res.status === 200) {
        toast({
          title: res.message,
          className: "text-green-400",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error deleting product",
        className: "text-destructive",
      });
    } finally {
      setState((prev) => {
        return { ...prev, pending: false };
      });
    }
  };

  return (
    <>
      <div
        className={`${product ? "grid grid-cols-2" : "flex flex-col"} gap-4`}
      >
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? (
            <Loader />
          ) : product ? (
            translations.save
          ) : (
            translations.create
          )}
        </Button>

        {product && (
          <AlertBtn
            translations={translations}
            onClick={() => handleDelete(product.id)}
            disabled={state.pending}
            type="button"
            BtnContent={state.pending ? <Loader /> : translations.delete}
            variant="outline"
          />
        )}
      </div>

      <Link
        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`}
        className={`w-full mt-4 ${buttonVariants({ variant: "outline" })}`}
      >
        {translations.cancel}
      </Link>
    </>
  );
};

const AddSize = ({
  sizes,
  setSizes,
  translations,
}: {
  sizes: Partial<Size>[];
  setSizes: React.Dispatch<React.SetStateAction<Partial<Size>[]>>;
  translations: Translations;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-gray-100 rounded-md px-4 w-full mb-4"
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-black text-base font-medium hover:no-underline">
          {translations.sizes}
        </AccordionTrigger>
        <AccordionContent>
          <ItemOptions
            state={sizes}
            setState={setSizes}
            translations={translations}
            optionKey={ItemOptionsKeys.SIZES}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const AddExtras = ({
  extras,
  setExtras,
  translations,
}: {
  extras: Partial<Extra>[];
  setExtras: React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
  translations: Translations;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-gray-100 rounded-md px-4 w-full mb-4"
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-black text-base font-medium hover:no-underline">
          {translations.extrasIngredients}
        </AccordionTrigger>
        <AccordionContent>
          <ItemOptions
            state={extras}
            setState={setExtras}
            translations={translations}
            optionKey={ItemOptionsKeys.EXTRAS}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
