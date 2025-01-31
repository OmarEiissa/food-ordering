"use client";

import { Button } from "@/components/ui/button";
import { deliveryFee, getSubtotal } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatters";
import {
  removeItemFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const CartItem = () => {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const subtotal = getSubtotal(cart);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      {cart && cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mt-6">
                <div className="flex flex-col sm:flex-row gap-2 justify-between">
                  <div className="flex-1 flex max-sm:flex-row-reverse items-center gap-2">
                    <div className="relative size-24">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="object-cover"
                          fill
                        />
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>

                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col justify-between">
                          <span>Size:</span>
                          <div className="flex gap-2">
                            {item.size && (
                              <span className="text-sm text-black">
                                <span className="text-accent">
                                  {item.size.name}
                                </span>
                              </span>
                            )}
                            <span className="text-sm text-black">
                              X{item.quantity}
                            </span>
                          </div>
                        </div>

                        {item.extras && item.extras.length > 0 && (
                          <div className="flex flex-col justify-between">
                            <span>Extras:</span>
                            <ul>
                              {item.extras.map((extra) => (
                                <li key={extra.id}>
                                  <span className="text-sm text-accent">
                                    {extra.name} {formatCurrency(extra.price)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-end">
                    <strong className="text-black text-center">
                      {formatCurrency(item.basePrice)}
                    </strong>
                    <Button
                      onClick={() =>
                        dispatch(removeItemFromCart({ id: item.id }))
                      }
                      variant="destructive"
                      className="border"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col justify-end items-end pt-6">
            <span className="text-accent font-medium w-full flex justify-between">
              Subtotal:
              <strong className="text-black">{formatCurrency(subtotal)}</strong>
            </span>
            <span className="text-accent font-medium w-full flex justify-between">
              Delivery:
              <strong className="text-black">
                {formatCurrency(deliveryFee)}
              </strong>
            </span>
            <span className="text-accent font-medium w-full flex justify-between">
              Total:
              <strong className="text-black">
                {formatCurrency(subtotal + deliveryFee)}
              </strong>
            </span>
          </div>
        </>
      ) : (
        <p className="text-accent text-center">
          There are no items in your cart. Add some
        </p>
      )}
    </div>
  );
};

export default CartItem;
