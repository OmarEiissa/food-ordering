"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Languages } from "@/constants/enums";
import { Translations } from "@/types/translations";
import { ValidationErrors } from "@/validations/auth";
import { Category } from "@prisma/client";
import { Edit } from "lucide-react";
import { useParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { updateCategory } from "../_actions/category";
import Loader from "@/components/ui/loader";
import { toast } from "@/hooks/use-toast";

type InitialStateType = {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
};

const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
};

const EditCategory = ({
  translations,
  category,
}: {
  translations: Translations;
  category: Category;
}) => {
  const { locale } = useParams();
  const [state, action, pending] = useActionState(
    updateCategory.bind(null, category.id),
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.message,
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
    }
  }, [state.message, state.status]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
            className={
              locale === Languages.ARABIC ? "!text-right" : "!text-left"
            }
          >
            {translations.admin.categories.form.editName}
          </DialogTitle>
        </DialogHeader>
        <form action={action} className="pt-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="category-name">
              {translations.admin.categories.form.name.label}
            </Label>
            <div className="flex-1 relative">
              <Input
                type="text"
                id="category-name"
                name="categoryName"
                defaultValue={category.name}
                placeholder={
                  translations.admin.categories.form.name.placeholder
                }
              />
              {state.error?.categoryName && (
                <p className="text-sm text-destructive absolute top-12">
                  {state.error?.categoryName}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-10">
            <Button type="submit" disabled={pending}>
              {pending ? (
                <Loader />
              ) : (
                translations.admin.categories.form.editName
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
