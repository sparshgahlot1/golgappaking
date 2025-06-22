import React from "react";

const FranchiseForm = () => (
  <div className="flex justify-center items-center">
    <form
      className="
        w-full max-w-md
        bg-white/10 backdrop-blur
        rounded-2xl shadow-2xl
        p-8 space-y-6
        border-2 border-yellow-400
      "
    >
      <h2 className="text-2xl font-bold text-red-500 text-center mb-4 drop-shadow">
        Franchise Enquiry
      </h2>
      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-3 bg-white/20 border border-red-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        className="w-full px-4 py-3 bg-white/20 border border-red-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full px-4 py-3 bg-white/20 border border-red-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
      />
      <input
        type="text"
        placeholder="City"
        className="w-full px-4 py-3 bg-white/20 border border-red-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
      />
      <input
        type="text"
        placeholder="PIN Code"
        className="w-full px-4 py-3 bg-white/20 border border-red-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-yellow-400 hover:bg-yellow-500 text-red-700 font-bold py-3 mt-2 transition text-base shadow-lg border-2 border-red-400"
      >
        Submit
      </button>
    </form>
  </div>
);

export default FranchiseForm;
