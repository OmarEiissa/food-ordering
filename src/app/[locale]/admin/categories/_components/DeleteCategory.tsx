"use client";

import { useEffect, useState } from "react";
import { deleteCategory } from "../_actions/category";
import { toast } from "@/hooks/use-toast";
import { Translations } from "@/types/translations";
import AlertBtn from "@/components/alertBtn/AlertBtn";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

const DeleteCategory = ({
  translations,
  id,
}: {
  translations: Translations;
  id: string;
}) => {
  const [state, setState] = useState<StateType>({
    isLoading: false,
    message: "",
    status: null,
  });

  const handleDelete = async () => {
    try {
      setState((prev) => {
        return { ...prev, isLoading: true };
      });

      const res = await deleteCategory(id);

      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.message,
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
    }
  }, [state.message, state.status]);

  return (
    <AlertBtn
      translations={translations}
      onClick={handleDelete}
      disabled={state.isLoading}
      type="button"
      variant="destructive"
    />
  );
};

export default DeleteCategory;
