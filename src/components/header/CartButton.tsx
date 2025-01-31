"use client";

import { Routes } from "@/constants/enums";
import Link from "../link";
import { ShoppingCart } from "lucide-react";
import { getCartQuantity } from "@/lib/cart";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useParams } from "next/navigation";

const CartButton = () => {
  const cart = useAppSelector(selectCartItems);
  const cartQuantity = getCartQuantity(cart);
  const { locale } = useParams();

  return (
    <Link href={`/${locale}/${Routes.CART}`} className="block relative group">
      <span className="absolute -top-4 start-4 size-5 text-sm bg-primary rounded-full text-white text-center">
        {cartQuantity}
      </span>
      <ShoppingCart
        className={`text-accent group-hover:text-primary duration-200 transition-colors !size-6`}
      />
    </Link>
  );
};

export default CartButton;
