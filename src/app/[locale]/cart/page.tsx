"use client";

import { useAppSelector } from "@/redux/hooks";
import CartItem from "./_components/CartItem";
import CheckoutForm from "./_components/CheckoutForm";
import { selectCartItems } from "@/redux/features/cart/cartSlice";

const CartPage = () => {
  const cart = useAppSelector(selectCartItems);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-primary text-center font-bold text-4xl italic mb-10">
            Cart
          </h1>

          <div
            className={`${
              cart.length > 0 && "grid"
            } grid-cols-1 lg:grid-cols-2 gap-10`}
          >
            <CartItem />
            <CheckoutForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
