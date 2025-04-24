import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Added for navigation

const EmploymentForm = () => {
  const [isFresher, setIsFresher] = useState("yes");
  const navigate = useNavigate(); // Initialize navigate hook

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employers: [{ name: "", position: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "employers",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Navigate to personality test page after form submission
    navigate('/psychotest');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-zinc-900 text-white p-8 rounded-2xl shadow-2xl ring-2 ring-green-500 ring-offset-4 ring-offset-black space-y-6 transition-all duration-300 animate-aura-glow"
      >
        <h2 className="text-3xl font-bold text-green-500 text-center">
          Employment Details
        </h2>

        
        <div>
          <label className="block text-sm font-medium mb-1">
            Are you a fresher?
          </label>
          <select
            {...register("isFresher")}
            value={isFresher}
            onChange={(e) => setIsFresher(e.target.value)}
            className="mt-1 block w-full bg-zinc-800 text-white rounded-md border-none p-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Fresher input */}
        {isFresher === "yes" ? (
          <div>
            <label className="block text-sm font-medium mb-1">Your Skills</label>
            <input
              {...register("skills", {
                required: "Skills are required for freshers",
              })}
              type="text"
              placeholder="e.g. JavaScript, React"
              className="w-full p-2 bg-zinc-800 text-white rounded-md border-none focus:ring-2 focus:ring-green-500"
            />
            {errors.skills && (
              <p className="text-red-400 text-sm mt-1">{errors.skills.message}</p>
            )}
          </div>
        ) : (
          <>
            {/* Employment inputs */}
            {fields.map((field, index) => (
              <div key={field.id} className="border border-zinc-700 p-4 rounded-md bg-zinc-800">
                <label className="block text-sm font-medium">
                  Employer {index + 1}
                </label>
                <input
                  {...register(`employers.${index}.name`, {
                    required: "Company name is required",
                  })}
                  type="text"
                  placeholder="Company Name"
                  className="mt-1 w-full p-2 bg-zinc-900 text-white rounded-md border-none focus:ring-2 focus:ring-green-500"
                />
                {errors.employers?.[index]?.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.employers[index].name.message}
                  </p>
                )}

                <input
                  {...register(`employers.${index}.position`, {
                    required: "Position is required",
                  })}
                  type="text"
                  placeholder="Position Held"
                  className="mt-3 w-full p-2 bg-zinc-900 text-white rounded-md border-none focus:ring-2 focus:ring-green-500"
                />
                {errors.employers?.[index]?.position && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.employers[index].position.message}
                  </p>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ name: "", position: "" })}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
            >
              Add Another Employer
            </button>

            {/* Job Proof Upload */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Upload Proof of Employment
              </label>
              <input
                {...register("jobProof")}
                type="file"
                className="block w-full text-sm text-white bg-zinc-800 rounded-md border-none p-2 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700"
              />
            </div>
          </>
        )}

        {/* CV Upload for everyone */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Your CV</label>
          <input
            {...register("cv")}
            type="file"
            className="block w-full text-sm text-white bg-zinc-800 rounded-md border-none p-2 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold text-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmploymentForm;