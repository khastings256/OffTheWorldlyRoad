import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "@/components/cards/ProductCard";
import { CartProvider, useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockProduct = {
  id: "product-test",
  type: "product" as const,
  name: "Test Wilderness Journal",
  price: 24.99,
  imageSrc: "https://picsum.photos/seed/test/400/400",
  description: "A test product for unit testing.",
};

function CartSpy() {
  const { items, totalItems } = useCart();
  return (
    <div>
      <div data-testid="cart-total">{totalItems}</div>
      <ul>
        {items.map((item) => (
          <li key={item.productId} data-testid={`cart-item-${item.productId}`}>
            {item.name} x{item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderWithProviders(ui: React.ReactNode) {
  return render(<CartProvider>{ui}</CartProvider>);
}

describe("ProductCard", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders product name and price", () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it("navigates to product detail page when card is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductCard product={mockProduct} />);

    const card = screen.getByTestId("product-card");
    await user.click(card);

    expect(mockPush).toHaveBeenCalledWith(`/shop/${mockProduct.id}`);
  });

  it("calls addItem when Add to Cart is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <ProductCard product={mockProduct} />
        <CartSpy />
      </>
    );

    const button = screen.getByTestId("add-to-cart");
    await user.click(button);

    expect(screen.getByTestId("cart-item-product-test")).toHaveTextContent(
      `${mockProduct.name} x1`
    );
    expect(screen.getByTestId("cart-total")).toHaveTextContent("1");
  });

  it("does not navigate when Add to Cart is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductCard product={mockProduct} />);

    const button = screen.getByTestId("add-to-cart");
    await user.click(button);

    expect(mockPush).not.toHaveBeenCalled();
  });
});
