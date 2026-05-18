"use client";

import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';
import '@testing-library/jest-dom';

describe('AboutPage', () => {
  it('renders without crashing', () => {
    render(<AboutPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('includes a heading for the mission section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
  });

  it('includes a heading for the team section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Meet the Team')).toBeInTheDocument();
  });

  it('includes a heading for the values section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Our Values')).toBeInTheDocument();
  });

  it('includes a heading for the story section', () => {
    render(<AboutPage />);
    expect(screen.getByText('Our Story')).toBeInTheDocument();
  });

  it('includes alt text for all images', () => {
    render(<AboutPage />);
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
    });
  });
});