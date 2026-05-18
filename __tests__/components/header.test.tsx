import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/layout/header';
import { useCart } from '@/lib/cart';

// Mock the cart hook
jest.mock('@/lib/cart', () => ({
  useCart: jest.fn(),
}));

// Mock the LoginDropdown to avoid auth complexity
jest.mock('@/components/layout/login-dropdown', () => ({
  LoginDropdown: () => <div>LoginDropdown Mock</div>,
}));

// Mock next/link to avoid Next.js routing in tests
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href }, children);
});

describe('Header Component', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({ totalItems: 0 });
  });

  it('renders the logo and brand name', () => {
    render(<Header />);
    expect(screen.getByAltText('Off The Worldly Road')).toBeInTheDocument();
    expect(screen.getByText('OTWR')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    const links = ['Home', 'Gallery', 'Blog', 'Shop', 'About'];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('updates active state on navigation click', () => {
    render(<Header />);
    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);
    expect(aboutLink).toHaveClass('text-primary');
  });

  it('shows cart item count when items are present', () => {
    (useCart as jest.Mock).mockReturnValue({ totalItems: 3 });
    render(<Header />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not show cart count when empty', () => {
    render(<Header />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    render(<Header />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);
    // MobileNav is mocked, so we can't assert visibility here
    // This test verifies the click handler is called
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });
});