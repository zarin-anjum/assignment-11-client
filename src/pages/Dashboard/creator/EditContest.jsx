import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Loader2 } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TYPES = ["Image Design", "Article Writing", "Business Ideas", "Gaming Review", "Movie Review"];

const inputClass = "w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-[#534AB7] transition-colors";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";
const errorClass = "text-xs text-red-500 mt-1";

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

  const { data: contest, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: () => axiosSecure.get(`/contests/${id}`).then((r) => r.data),
  });

  useEffect(() => {
    if (contest) {
      reset({
        contestName: contest.contestName,
        type: contest.type,
        image: contest.image,
        description: contest.description,
        taskDetails: contest.taskDetails,
        prizeMoney: contest.prizeMoney,
        entryFee: contest.entryFee,
        deadline: new Date(contest.deadline),
      });
    }
  }, [contest, reset]);

  const { mutate: updateContest, isPending } = useMutation({
    mutationFn: (data) => axiosSecure.put(`/contests/${id}`, data),
    onSuccess: () => {
      toast.success("Contest updated!");
      navigate("/dashboard/my-contests");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to update"),
  });

  const onSubmit = (data) => {
    updateContest({
      ...data,
      prizeMoney: Number(data.prizeMoney),
      entryFee: Number(data.entryFee),
      deadline: data.deadline.toISOString(),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={28} className="animate-spin text-[#534AB7]" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Edit Contest</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Update your contest details — only available before admin approval.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5"
      >
        <div>
          <label className={labelClass}>Contest Name</label>
          <input {...register("contestName", { required: "Required" })} className={inputClass} />
          {errors.contestName && <p className={errorClass}>{errors.contestName.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Contest Type</label>
          <select {...register("type", { required: "Required" })} className={inputClass}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.type && <p className={errorClass}>{errors.type.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input {...register("image")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            {...register("description", { required: "Required" })}
            rows={4}
            className={`${inputClass} resize-none`}
          />
          {errors.description && <p className={errorClass}>{errors.description.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Task Instructions</label>
          <textarea
            {...register("taskDetails", { required: "Required" })}
            rows={4}
            className={`${inputClass} resize-none`}
          />
          {errors.taskDetails && <p className={errorClass}>{errors.taskDetails.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Prize Money ($)</label>
            <input type="number" {...register("prizeMoney", { required: "Required" })} className={inputClass} />
            {errors.prizeMoney && <p className={errorClass}>{errors.prizeMoney.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Entry Fee ($)</label>
            <input type="number" {...register("entryFee", { required: "Required" })} className={inputClass} />
            {errors.entryFee && <p className={errorClass}>{errors.entryFee.message}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Deadline</label>
          <Controller
            name="deadline"
            control={control}
            rules={{ required: "Required" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
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
          className="w-full py-3 rounded-xl text-sm font-semibold bg-[#534AB7] hover:bg-[#3C3489] text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isPending ? <><Loader2 size={16} className="animate-spin" /> Updating...</> : "Update Contest"}
        </button>
      </form>
    </div>
  );
};

export default EditContest;