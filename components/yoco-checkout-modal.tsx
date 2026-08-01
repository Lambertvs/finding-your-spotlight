"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { XIcon, DownloadIcon, CheckCircle2Icon, CreditCardIcon, AlertCircleIcon, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    YocoSDK?: any;
  }
}

type BookItem = {
  id: string;
  title: string;
  priceZar: number;
  coverImage: string;
};

export function YocoCheckoutModal({
  book,
  isOpen,
  onClose,
}: {
  book: BookItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState<{
    orderNumber: string;
    downloadUrl: string;
    ebookTitle: string;
  } | null>(null);

  useEffect(() => {
    // Load Yoco SDK Script if not present
    if (!document.getElementById("yoco-sdk")) {
      const script = document.createElement("script");
      script.id = "yoco-sdk";
      script.src = "https://js.yoco.com/sdk/v1/yoco-sdk-web.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!isOpen || !book) return null;

  const handlePayWithYoco = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) {
      setErrorMsg("Please provide your full name and email address.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    const publicKey =
      process.env.NEXT_PUBLIC_YOCO_PUBLIC_KEY || "pk_test_e0507e9dxWk6rVJ598c46fe9af99";

    // Helper to ensure Yoco SDK is loaded
    const getSdk = async () => {
      if (window.YocoSDK) return window.YocoSDK;
      return new Promise<any>((resolve) => {
        let script = document.getElementById("yoco-sdk") as HTMLScriptElement;
        if (!script) {
          script = document.createElement("script");
          script.id = "yoco-sdk";
          script.src = "https://js.yoco.com/sdk/v1/yoco-sdk-web.js";
          document.body.appendChild(script);
        }
        script.onload = () => resolve(window.YocoSDK);
        script.onerror = () => resolve(null);
        setTimeout(() => resolve(window.YocoSDK || null), 2500);
      });
    };

    try {
      const YocoSDK = await getSdk();

      if (!YocoSDK) {
        throw new Error("Yoco Payment SDK is taking longer to load. Please try again.");
      }

      const yoco = new YocoSDK({
        publicKey,
      });

      yoco.showPopup({
        amountInCents: Math.round(book.priceZar * 100),
        currency: "ZAR",
        name: book.title,
        description: `Digital eBook: ${book.title}`,
        callback: async (result: any) => {
          if (result.error) {
            setErrorMsg(result.error.message || "Yoco card payment was declined.");
            setLoading(false);
          } else {
            // Send payment token to backend charge route
            try {
              const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  token: result.id,
                  amountInCents: Math.round(book.priceZar * 100),
                  ebookId: book.id,
                  buyerEmail,
                  buyerName,
                }),
              });

              const data = await res.json();

              if (!res.ok || data.error) {
                throw new Error(data.error || "Payment authorization failed.");
              }

              setSuccessData({
                orderNumber: data.orderNumber,
                downloadUrl: data.downloadUrl,
                ebookTitle: data.ebookTitle,
              });
            } catch (err: any) {
              setErrorMsg(err.message || "Failed to process payment.");
            } finally {
              setLoading(false);
            }
          }
        },
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Unable to open Yoco Payment popup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-700/60 bg-zinc-900 text-zinc-100 p-6 shadow-2xl relative space-y-5 font-sans">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Purchase Success Screen */}
        {successData ? (
          <div className="text-center space-y-5 py-4 font-sans">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2Icon className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white font-sans">Payment Successful!</h2>
              <p className="text-xs text-zinc-400 font-sans">
                Order #{successData.orderNumber} • Receipt sent to <span className="text-white font-medium">{buyerEmail}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left space-y-2 font-sans">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Purchased eBook:</span>
                <span className="font-semibold text-amber-400">{successData.ebookTitle}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Amount Paid:</span>
                <span className="font-semibold text-amber-400 font-sans">R {book.priceZar.toFixed(2)} ZAR</span>
              </div>
            </div>

            <a
              href={successData.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 font-sans"
            >
              <DownloadIcon className="w-4 h-4" /> Download PDF eBook Now
            </a>

            <p className="text-[11px] text-zinc-500 font-sans">
              Note: Download link is valid for 24 hours. A copy has also been sent to your email.
            </p>
          </div>
        ) : (
          /* Checkout Input Form */
          <div className="space-y-5 font-sans">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="w-12 h-14 relative rounded overflow-hidden border border-zinc-700 shrink-0 bg-zinc-950">
                <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[11px] font-sans uppercase tracking-wider text-amber-400 font-semibold block">
                  Secure Checkout
                </span>
                <h2 className="text-lg font-bold text-white line-clamp-1 font-sans">{book.title}</h2>
                <span className="text-sm font-semibold text-amber-400 font-sans">
                  R {book.priceZar.toFixed(2)} ZAR
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium flex items-center gap-2 font-sans">
                <AlertCircleIcon className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handlePayWithYoco} className="space-y-4 font-sans">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block font-sans">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#09090b",
                    WebkitTextFillColor: "#ffffff",
                    WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
                  }}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300 block font-sans">Email Address (For PDF Delivery)</label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#09090b",
                    WebkitTextFillColor: "#ffffff",
                    WebkitBoxShadow: "0 0 0px 1000px #09090b inset",
                  }}
                  className="w-full bg-zinc-950 border border-zinc-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-sans transition-colors"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 text-sm gap-2 mt-2 shadow-lg shadow-amber-500/10 font-sans"
              >
                {loading ? (
                  "Processing Payment..."
                ) : (
                  <>
                    <CreditCardIcon className="w-4 h-4" /> Pay R {book.priceZar.toFixed(2)} with Yoco
                  </>
                )}
              </Button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-2 border-t border-zinc-800/80 font-sans">
              <LockIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secured by 256-bit SSL & Yoco Payments (PCI-DSS Level 1)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
