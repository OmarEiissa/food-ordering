"use client";

import { useEffect, useState } from "react";
import { deleteUser } from "../_actions/user";
import { toast } from "@/hooks/use-toast";
import { Session } from "next-auth";
import AlertBtn from "@/components/alertBtn/AlertBtn";
import { Translations } from "@/types/translations";

const DeleteUserButton = ({
  translations,
  userId,
  initialSession,
}: {
  translations: Translations;
  userId: string;
  initialSession: Session | null;
}) => {
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
      setState((prev) => ({ ...prev, pending: true }));

      if (initialSession?.user.id === id) {
        setState((prev) => ({
          ...prev,
          status: 400,
          message: "You cannot delete yourself",
        }));
        return;
      }

      const res = await deleteUser(id);

      setState((prev) => ({
        ...prev,
        status: res.status,
        message: res.message,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
    }
  };

  useEffect(() => {
    if (state.message && state.status && !state.pending) {
      toast({
        title: state.message,
        className: state.status === 200 ? "text-green-400" : "text-destructive",
      });
    }
  }, [state.message, state.status, state.pending]);

  return (
    <AlertBtn
      translations={translations}
      onClick={() => handleDelete(userId)}
      disabled={initialSession?.user.id === userId || state.pending}
      type="button"
      variant="destructive"
    />
  );
};

export default DeleteUserButton;
