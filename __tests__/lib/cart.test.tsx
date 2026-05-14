import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCart, CartProvider } from "@/lib/cart";

function TestComponent() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <div>
      <div data-testid="total-items">{totalItems}</div>
      <div data-testid="total-price">{totalPrice.toFixed(2)}</div>
      <div data-testid="item-count">{items.length}</div>
      <button
        data-testid="add-new"
        onClick={() =>
          addItem({ productId: "prod-1", name: "Test Product", price: 10 })
        }
      >
        Add New
      </button>
      <button
        data-testid="add-existing"
        onClick={() =>
          addItem({ productId: "prod-1", name: "Test Product", price: 10 })
        }
      >
        Add Existing
      </button>
      <button
        data-testid="add-second"
        onClick={() =>
          addItem({ productId: "prod-2", name: "Second Product", price: 25 })
        }
      >
        Add Second
      </button>
      <button
        data-testid="remove"
        onClick={() => removeItem("prod-1")}
      >
        Remove
      </button>
      <button
        data-testid="update"
        onClick={() => updateQuantity("prod-1", 5)}
      >
        Update Quantity
      </button>
      <button
        data-testid="update-zero"
        onClick={() => updateQuantity("prod-1", 0)}
      >
        Update Zero
      </button>
      <button data-testid="clear" onClick={clearCart}>
        Clear
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.productId} data-testid={`item-${item.productId}`}>
            {item.name} x{item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );
}

describe("CartContext", () => {
  const user = userEvent.setup();

  it("addItem adds a new item", async () => {
    renderWithProvider();
    await user.click(screen.getByTestId("add-new"));
    expect(screen.getByTestId("item-prod-1")).toHaveTextContent(
      "Test Product x1"
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("1");
    expect(screen.getByTestId("total-price")).toHaveTextContent("10.00");
  });

  it("addItem increments an existing item", async () => {
    renderWithProvider();
    await user.click(screen.getByTestId("add-new"));
    await user.click(screen.getByTestId("add-existing"));
    expect(screen.getByTestId("item-prod-1")).toHaveTextContent(
      "Test Product x2"
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent("20.00");
  });

  it("removeItem removes an item", async () => {
    renderWithProvider();
    await user.click(screen.getByTestId("add-new"));
    await user.click(screen.getByTestId("add-second"));
    expect(screen.getByTestId("item-count")).toHaveTextContent("2");

    await user.click(screen.getByTestId("remove"));
    expect(screen.queryByTestId("item-prod-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("item-count")).toHaveTextContent("1");
    expect(screen.getByTestId("total-items")).toHaveTextContent("1");
    expect(screen.getByTestId("total-price")).toHaveTextContent("25.00");
  });

  it("updateQuantity changes quantity", async () => {
    renderWithProvider();
    await user.click(screen.getByTestId("add-new"));
    await user.click(screen.getByTestId("update"));
    expect(screen.getByTestId("item-prod-1")).toHaveTextContent(
      "Test Product x5"
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("5");
    expect(screen.getByTestId("total-price")).toHaveTextContent("50.00");
  });

  it("updateQuantity to 0 removes item", async () => {
    renderWithProvider();
    await user.click(screen.getByTestId("add-new"));
    expect(screen.getByTestId("item-prod-1")).toBeInTheDocument();

    await user.click(screen.getByTestId("update-zero"));
    expect(screen.queryByTestId("item-prod-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
  });

  it("clearCart empties the cart", async () => {
    renderWithProvider();
    await user.click(screen.getByTestId("add-new"));
    await user.click(screen.getByTestId("add-second"));
    expect(screen.getByTestId("item-count")).toHaveTextContent("2");

    await user.click(screen.getByTestId("clear"));
    expect(screen.getByTestId("item-count")).toHaveTextContent("0");
    expect(screen.getByTestId("total-items")).toHaveTextContent("0");
    expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
  });

  it("totalItems and totalPrice compute correctly with multiple items", async () => {
    renderWithProvider();
    await user.click(screen.getByTestId("add-new"));
    await user.click(screen.getByTestId("add-existing"));
    await user.click(screen.getByTestId("add-second"));
    await user.click(screen.getByTestId("add-second"));

    // prod-1: 2 x $10 = $20
    // prod-2: 2 x $25 = $50
    // totalItems = 4, totalPrice = $70.00
    expect(screen.getByTestId("total-items")).toHaveTextContent("4");
    expect(screen.getByTestId("total-price")).toHaveTextContent("70.00");
  });
});
