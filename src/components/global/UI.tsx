"use client";

import React from "react";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Card Component
// ─────────────────────────────────────────────────────────────────────────────
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  className?: string;
}

export function Card({ children, hoverEffect = true, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-surface p-6 md:p-8 rounded-[2rem] border border-primary/5 shadow-sm transition-all duration-300 ${
        hoverEffect ? "hover:shadow-xl hover:-translate-y-1" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Button Component
// ─────────────────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  loading?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle =
    "px-6 py-3.5 font-bold rounded-full text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed text-sm active:scale-97";

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-light shadow-lg shadow-brand/10",
    secondary: "bg-secondary text-primary hover:bg-secondary-light shadow-lg shadow-secondary/10",
    outline: "bg-transparent border border-primary/25 text-primary hover:bg-primary/5",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/10",
  };

  return (
    <button
      disabled={loading || disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Modal Component
// ─────────────────────────────────────────────────────────────────────────────
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
          />

          {/* Modal Card content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3 }}
            className="relative bg-surface w-full max-w-lg p-8 rounded-[2.5rem] border border-primary/5 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-full transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Title */}
            <h3 className="text-2xl font-serif text-primary mb-6 pr-6">{title}</h3>

            {/* Body */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Ensure useEffect import is mockable/clean
import { useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Input Field Component
// ─────────────────────────────────────────────────────────────────────────────
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export function InputField({ label, error, className = "", id, ...props }: InputFieldProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      <label htmlFor={inputId} className="block text-sm font-semibold text-primary">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-4 py-3 border rounded-xl bg-surface text-primary outline-none transition-colors text-sm ${
          error ? "border-red-500 focus:border-red-500" : "border-primary/15 focus:border-secondary"
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Alert Block Component
// ─────────────────────────────────────────────────────────────────────────────
interface AlertBlockProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  className?: string;
}

export function AlertBlock({ message, type = "error", className = "" }: AlertBlockProps) {
  if (!message) return null;

  const styles = {
    success: "bg-green-500/10 text-green-700 border-green-500/20",
    error: "bg-red-500/10 text-red-700 border-red-500/20",
    warning: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
    info: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  };

  const icons = {
    success: <CheckCircle2 size={18} className="shrink-0" />,
    error: <AlertCircle size={18} className="shrink-0" />,
    warning: <AlertCircle size={18} className="shrink-0" />,
    info: <AlertCircle size={18} className="shrink-0" />,
  };

  return (
    <div className={`p-4 rounded-xl border text-sm flex items-center gap-3 font-semibold ${styles[type]} ${className}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
}
