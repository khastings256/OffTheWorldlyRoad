import React from "react";

export const useSession = jest.fn(() => ({ data: null, status: "unauthenticated" }));
export const signIn = jest.fn();
export const signOut = jest.fn();
export const SessionProvider = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);
export const getSession = jest.fn(() => Promise.resolve(null));
export const getCsrfToken = jest.fn(() => Promise.resolve(""));
export const getProviders = jest.fn(() => Promise.resolve(null));
