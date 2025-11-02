import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  MoveRight,
  CreditCard,
  Lock,
  Box,
  Cloud,
  RefreshCw,
  Smartphone,
  Code,
  Database,
  Server,
  User,
  Settings,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { title: "Payment Processing", desc: "Secure payment flows powered by Stripe and tokenized session management.", icon: CreditCard },
    { title: "Secure Authentication", desc: "JWT-based user login and encrypted session handling for robust security.", icon: Lock },
    { title: "Dockerized Infrastructure", desc: "Run the complete stack in isolated containers with a single command.", icon: Box },
    { title: "AWS Deployable", desc: "Optimized for Elastic Beanstalk and ECS for production-scale deployment.", icon: Cloud },
    { title: "Automated CI/CD", desc: "GitHub Actions automates builds, testing, and deployment to AWS.", icon: RefreshCw },
    { title: "Modern Responsive UI", desc: "WCAG-compliant responsive UI built with TailwindCSS and Vite.", icon: Smartphone },
  ];

  const techStack = [
    { title: "Frontend", desc: "ReactJS, Vite, TailwindCSS", icon: Code },
    { title: "Backend", desc: "Node.js, Express.js", icon: Server },
    { title: "Infrastructure", desc: "MongoDB, Docker, AWS, Stripe", icon: Database },
  ];

  const stats = [
    { name: "Security Rating", value: "91%" },
    { name: "End-User Usability", value: "88%" },
    { name: "Service Stability", value: "90%" },
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-900/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Wallet className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">FinEase</span>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
          >
            Log in →
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative isolate pt-28 pb-20 overflow-hidden bg-white">
        {/* Background Gradient */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl opacity-20"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 aspect-[1155/678] w-[60rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-400 to-indigo-700"
            style={{
              clipPath:
                "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
            }}
          />
        </div>

        <div className="w-full max-w-none px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
              FinEase
            </h1>
            <p className="mt-4 text-xl sm:text-2xl font-semibold text-indigo-600">
              Digital Payments Platform
            </p>
            <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
              A secure and scalable digital payments platform built with a modern
              stack. Designed for enterprise-grade fintech systems with Docker,
              AWS, and CI/CD integration.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition"
              >
                Get Started
                <MoveRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md bg-white p-4 rounded-3xl shadow-2xl ring-1 ring-gray-900/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-6 w-6 text-indigo-600 bg-indigo-100 rounded-full p-1" />
                  <span className="font-semibold text-gray-900">Dashboard</span>
                </div>
                <Settings className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </div>

              {/* Balance Card */}
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 text-white shadow-lg mb-4">
                <p className="text-sm text-indigo-100">Your Balance</p>
                <p className="text-3xl font-bold mt-1">$12,480.50</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-mono text-sm text-indigo-100">**** **** **** 1234</span>
                  <div className="bg-white/20 rounded-lg px-3 py-1 text-sm font-medium">VISA</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3 text-center mb-4">
                {[{ icon: MoveRight, text: "Send" }, { icon: ArrowRight, text: "Request" }, { icon: CreditCard, text: "Pay" }].map(
                  (action, i) => (
                    <button
                      key={i}
                      className="rounded-lg bg-gray-50 hover:bg-gray-100 p-3 ring-1 ring-gray-900/5 transition"
                    >
                      <action.icon className="h-5 w-5 text-indigo-600 mx-auto" />
                      <span className="text-xs font-medium text-gray-700 mt-1 block">
                        {action.text}
                      </span>
                    </button>
                  )
                )}
              </div>

              {/* Transactions */}
              <p className="font-semibold text-gray-900 mb-2">Recent Transactions</p>
              <div className="space-y-3">
                {[
                  { name: "Starbucks", category: "Coffee", amount: "-$6.50", color: "red" },
                  { name: "Work Deposit", category: "Salary", amount: "+$2,100.00", color: "green" },
                ].map((txn) => (
                  <div
                    key={txn.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg ring-1 ring-gray-900/5"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-${txn.color}-100 text-${txn.color}-600 flex items-center justify-center font-bold text-sm`}
                      >
                        {txn.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{txn.name}</p>
                        <p className="text-xs text-gray-500">{txn.category}</p>
                      </div>
                    </div>
                    <p className={`font-medium text-${txn.color}-600`}>{txn.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 overflow-hidden blur-3xl opacity-20"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 aspect-[1155/678] w-[60rem] -translate-x-1/2 bg-gradient-to-tr from-pink-300 to-indigo-300"
            style={{
              clipPath:
                "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
            }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-indigo-600">Core Features</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need for a modern payment system
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition ring-1 ring-gray-900/5"
            >
              <f.icon className="h-10 w-10 text-indigo-600 p-2 bg-indigo-100 rounded-lg mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech + Stats */}
      <section className="bg-white py-20 px-6 md:px-12 lg:px-20 xl:px-32 text-center">
        <h2 className="text-base font-semibold text-indigo-600">Our Foundation</h2>
        <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          A Trusted & Modern Foundation
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 mb-24">
          {stats.map((s) => (
            <div key={s.name}>
              <p className="text-5xl font-bold text-indigo-600">{s.value}</p>
              <p className="text-gray-600 mt-2">{s.name}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {techStack.map((t) => (
            <div key={t.title}>
              <t.icon className="h-12 w-12 text-indigo-600 mx-auto" />
              <p className="mt-4 text-xl font-semibold text-gray-900">{t.title}</p>
              <p className="mt-2 text-gray-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-900/5 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">FinEase</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 FinEase | Built by{" "}
            <a
              href="https://github.com/sumaiyashah27"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline font-semibold"
            >
              Sumaiya Shah
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
