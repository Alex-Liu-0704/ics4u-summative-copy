import { FaRegHeart } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "@/components";
import { ICON_SIZE } from "@/core";
import { useFirebaseContext } from "@/hooks";

export const CartView = () => {
  const { cart, toggleCart, emptyCart, toggleFavorite } = useFirebaseContext();
  const items = Array.from(cart.values());
  let subtotal = 0;

  for (const item of items) {
    subtotal += Number(item.secondaryText?.replace("$", "") ?? 0);
  }

  const taxes = Number((subtotal * 0.13).toFixed(2));
  const total = Number((subtotal + taxes).toFixed(2));

  return (
    <section className="mx-auto max-w-7xl space-y-8 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Cart</h1>
        {items.length > 0 && (
          <Button onClick={emptyCart} variant="red">
            Empty Cart
          </Button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="mt-10 text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-300 text-sm">
              <tr>
                <th className="p-3 text-lg">Items</th>
                <th className="p-3 text-lg">Type</th>
                <th className="p-3 text-lg">Price</th>
                <th className="p-3 text-right text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr className="border-gray-800 border-t" key={item.id}>
                  <td className="flex items-center gap-3 p-3">
                    <img className="w-20 rounded object-cover" src={item.imageUrl} />
                    <p>{item.primaryText}</p>
                  </td>
                  <td className="p-3 text-gray-400 capitalize">{item.media === "tv" ? "TV Show" : "Movie"}</td>
                  <td className="p-3 text-gray-300">{item.secondaryText}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-4">
                      <button
                        className="text-gray-300 transition hover:text-blue-400"
                        onClick={() => {
                          toggleFavorite(item);
                        }}
                      >
                        <FaRegHeart size={ICON_SIZE} />
                      </button>
                      <button className="text-gray-300 transition hover:text-blue-400" onClick={() => toggleCart(item)}>
                        <FaRegTrashCan size={ICON_SIZE} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="border-gray-700 border-t">
                <td className="p-3 text-center font-semibold text-gray-300 text-lg" colSpan={2}>
                  Subtotal
                </td>
                <td className="p-3 font-semibold text-lg text-white">${subtotal.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr className="border-gray-700 border-t">
                <td className="p-3 text-center font-semibold text-gray-300 text-lg" colSpan={2}>
                  Taxes
                </td>
                <td className="p-3 font-semibold text-lg text-white">${taxes.toFixed(2)}</td>
                <td></td>
              </tr>
              <tr className="border-gray-700 border-t bg-gray-800">
                <td className="p-3 text-center font-bold text-lg text-white" colSpan={2}>
                  Total
                </td>
                <td className="p-3 font-bold text-blue-400 text-lg">${total.toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
