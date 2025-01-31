"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Languages } from "@/constants/enums";
import { useParams } from "next/navigation";
import { Translations } from "@/types/translations";

const AlertBtn = ({
  translations,
  onClick,
  disabled,
  type,
  BtnContent,
  variant,
}: {
  translations: Translations;
  onClick: () => void;
  disabled: boolean;
  type?: "button" | "submit";
  BtnContent?: string | React.ReactNode;
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost";
}) => {
  const { locale } = useParams();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} disabled={disabled} type={type}>
          {BtnContent ? BtnContent : <Trash2 />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle
            className={
              locale === Languages.ARABIC ? "!text-right" : "!text-left"
            }
          >
            {translations.areYouSure}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={
              locale === Languages.ARABIC ? "!text-right" : "!text-left"
            }
          >
            {translations.cantBeReversed}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={locale === Languages.ARABIC ? "!ml-2" : ""}
          >
            {translations.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            className={locale === Languages.ARABIC ? "!ml-0" : ""}
            onClick={onClick}
          >
            {translations.delete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertBtn;
