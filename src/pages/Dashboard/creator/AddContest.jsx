import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TYPES = ["Image Design", "Article Writing", "Business Ideas", "Gaming Review", "Movie Review"];

const inputClass = "w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-[#534AB7] transition-colors";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";
const errorClass = "text-xs text-red-500 mt-1";

const AddContest = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: addContest, isPending } = useMutation({
    mutationFn: (data) => axiosSecure.post("/contests", data),
    onSuccess: () => {
      toast.success("Contest submitted for review!");
      reset();
      navigate("/dashboard/my-contests");
    },
    onError: () => toast.error("Failed to create contest"),
  });

  const onSubmit = (data) => {
    addContest({
      ...data,
      prizeMoney: Number(data.prizeMoney),
      entryFee: Number(data.entryFee),
      deadline: data.deadline.toISOString(),
    });
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Add New Contest
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Fill in the details — your contest will be reviewed by admin before going live.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5"
      >
        <div>
          <label className={labelClass}>Contest Name</label>
          <input
            {...register("contestName", { required: "Contest name is required" })}
            placeholder="e.g. Brand Identity Challenge"
            className={inputClass}
          />
          {errors.contestName && <p className={errorClass}>{errors.contestName.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Contest Type</label>
          <select
            {...register("type", { required: "Please select a type" })}
            className={inputClass}
          >
            <option value="">Select a type...</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.type && <p className={errorClass}>{errors.type.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input
            {...register("image")}
            placeholder="https://example.com/image.jpg"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows={4}
            placeholder="Describe what this contest is about..."
            className={`${inputClass} resize-none`}
          />
          {errors.description && <p className={errorClass}>{errors.description.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Task Instructions</label>
          <textarea
            {...register("taskDetails", { required: "Task instructions are required" })}
            rows={4}
            placeholder="What should participants submit? How should they do it?"
            className={`${inputClass} resize-none`}
          />
          {errors.taskDetails && <p className={errorClass}>{errors.taskDetails.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Prize Money ($)</label>
            <input
              type="number"
              {...register("prizeMoney", {
                required: "Required",
                min: { value: 1, message: "Must be at least $1" },
              })}
              placeholder="500"
              className={inputClass}
            />
            {errors.prizeMoney && <p className={errorClass}>{errors.prizeMoney.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Entry Fee ($)</label>
            <input
              type="number"
              {...register("entryFee", {
                required: "Required",
                min: { value: 1, message: "Must be at least $1" },
              })}
              placeholder="10"
              className={inputClass}
            />
            {errors.entryFee && <p className={errorClass}>{errors.entryFee.message}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Deadline</label>
          <Controller
            name="deadline"
            control={control}
            rules={{ required: "Deadline is required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                minDate={new Date()}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select deadline..."
                className={inputClass}
                wrapperClassName="w-full"
              />
            )}
          />
          {errors.deadline && <p className={errorClass}>{errors.deadline.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 rounded-xl text-sm font-semibold bg-[#534AB7] hover:bg-[#3C3489] text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <><Loader2 size={16} className="animate-spin" /> Submitting...</>
          ) : (
            "Submit for Review"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddContest;