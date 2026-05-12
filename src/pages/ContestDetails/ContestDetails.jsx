import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  Trophy,
  Clock,
  CalendarX,
  ArrowLeft,
  X,
} from "lucide-react";

//Mock Data
const MOCK_CONTESTS = [
  {
    _id: "1",
    contestName: "Brand Identity Challenge",
    type: "Image Design",
    description:
      "Redesign a fictional startup's full visual identity. This includes a logo, color palette, typography choices, and a one-page brand guideline document. Your submission should feel cohesive, modern, and memorable.",
    taskDetails:
      "Submit a link to your design files (Figma, Adobe XD, or PDF). Make sure your submission includes: (1) Logo in light and dark variants, (2) Color palette with hex codes, (3) Typography choices with rationale, (4) One sample mockup applying the brand.",
    prizeMoney: 500,
    entryFee: 10,
    deadline: "2026-06-15T23:59:00",
    participantsCount: 248,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    winner: null,
  },
  {
    _id: "2",
    contestName: "Tech Future Essay Contest",
    type: "Article Writing",
    description:
      "Write a compelling, well-researched article on AI's impact on society in 2030 and beyond. We're looking for original perspectives, backed by facts, written in an engaging and accessible style.",
    taskDetails:
      "Submit a link to your article (Google Docs, Medium, or any public URL). Article must be between 800–1500 words. Include at least 3 cited sources. No plagiarism — submissions are checked.",
    prizeMoney: 300,
    entryFee: 5,
    deadline: "2026-06-20T23:59:00",
    participantsCount: 183,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    winner: null,
  },
  {
    _id: "3",
    contestName: "Startup Pitch Competition",
    type: "Business Ideas",
    description:
      "Got a business idea you believe in? Present it here. We're looking for innovative, feasible, and scalable ideas across any industry. The best pitch wins seed funding and mentorship from industry experts.",
    taskDetails:
      "Submit a link to your pitch deck (Google Slides, Canva, or PDF). Your deck should cover: Problem, Solution, Target Market, Business Model, and Go-to-Market Strategy. Max 10 slides.",
    prizeMoney: 1000,
    entryFee: 15,
    deadline: "2026-06-25T23:59:00",
    participantsCount: 120,
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    winner: null,
  },
  {
    _id: "4",
    contestName: "Gaming Review Cup",
    type: "Gaming Review",
    description:
      "Write the best review for any game released in the past year. We judge on depth of analysis, writing style, originality, and usefulness to other gamers.",
    taskDetails:
      "Submit a public link to your review (blog, Medium, or Google Docs). Review must be at least 600 words. Include screenshots or media if possible. Specify the platform you played on.",
    prizeMoney: 200,
    entryFee: 5,
    deadline: "2026-05-10T23:59:00",
    participantsCount: 95,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    winner: {
      name: "Alex R.",
      photo: "https://i.pravatar.cc/100?img=11",
    },
  },
  {
    _id: "5",
    contestName: "Logo Design Sprint",
    type: "Image Design",
    description:
      "Create a memorable, clean logo for a fictional eco-friendly brand called 'Verdant'. The brand sells sustainable home products and targets young urban professionals.",
    taskDetails:
      "Submit a Figma or PDF link with your logo in full color, monochrome, and reversed (white on dark) versions. Include a short note (max 100 words) explaining your design decisions.",
    prizeMoney: 400,
    entryFee: 10,
    deadline: "2026-06-10T23:59:00",
    participantsCount: 210,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    winner: null,
  },
  {
    _id: "6",
    contestName: "Movie Critique Challenge",
    type: "Movie Review",
    description:
      "Craft an insightful critique of any classic film (pre-2000). We're judging on originality of perspective, depth of cinematic analysis, and quality of writing.",
    taskDetails:
      "Submit a public link to your critique. Must be 500–1000 words. Focus on cinematography, narrative structure, or thematic depth — not just a plot summary.",
    prizeMoney: 150,
    entryFee: 5,
    deadline: "2026-06-18T23:59:00",
    participantsCount: 67,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    winner: null,
  },
  {
    _id: "7",
    contestName: "Social Media Strategy",
    type: "Business Ideas",
    description:
      "Develop a complete 30-day social media growth strategy for a small business of your choice. Include platform selection, content calendar, and growth KPIs.",
    taskDetails:
      "Submit a Google Docs or Notion link with your strategy document. Must include: platform rationale, 30-day content calendar, sample post ideas, and success metrics.",
    prizeMoney: 600,
    entryFee: 12,
    deadline: "2026-07-01T23:59:00",
    participantsCount: 88,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    winner: null,
  },
  {
    _id: "8",
    contestName: "Indie Game Review Fest",
    type: "Gaming Review",
    description:
      "Shine a spotlight on an underrated indie game with a detailed and passionate review. Help other gamers discover hidden gems.",
    taskDetails:
      "Submit a public link to your review. The game must have fewer than 500,000 Steam reviews (or equivalent). Review must be at least 500 words. Bonus points for video content.",
    prizeMoney: 250,
    entryFee: 5,
    deadline: "2026-06-22T23:59:00",
    participantsCount: 112,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    winner: null,
  },
];

const useCountdown = (deadline) => {
  const calc = () => {
    const diff = new Date(deadline) - new Date();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calc);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return timeLeft;
};

const typeConfig = {
  "Image Design":    { badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
  "Article Writing": { badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  "Business Ideas":  { badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  "Gaming Review":   { badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  "Movie Review":    { badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
};

const pad = (n) => String(n).padStart(2, "0");

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const contest = MOCK_CONTESTS.find((c) => c._id === id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskLink, setTaskLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const timeLeft = useCountdown(contest?.deadline);
  const isEnded = !timeLeft;

  if (!contest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
          Contest not found
        </h2>
        <button
          onClick={() => navigate("/all-contests")}
          className="mt-4 text-sm text-[#534AB7] hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Back to all contests
        </button>
      </div>
    );
  }

  const badgeClass =
    typeConfig[contest.type]?.badge ||
    "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";

  //mock register handler (replace with payment redirect later)
  const handleRegister = () => {
    setIsRegistered(true);
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    if (!taskLink.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setIsModalOpen(false);
    setTaskLink("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-[#534AB7] transition-colors mb-6"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 mb-8">
          {contest.image ? (
            <img
              src={contest.image}
              alt={contest.contestName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🏆
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: main info ── */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeClass} mb-3 inline-block`}>
                {contest.type}
              </span>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {contest.contestName}
              </h1>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                About this contest
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {contest.description}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                📋 Task instructions
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {contest.taskDetails}
              </p>
            </div>

            {contest.winner && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-5 flex items-center gap-4">
                <img
                  src={contest.winner.photo}
                  alt={contest.winner.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
                />
                <div>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-0.5">
                    🏆 Winner declared
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {contest.winner.name}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/*Right: sidebar*/}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Trophy size={13} /> Prize money
                </span>
                <span className="text-sm font-bold text-[#534AB7]">
                  ${contest.prizeMoney}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Entry fee
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  ${contest.entryFee}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Users size={13} /> Participants
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {contest.participantsCount}
                </span>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                {isEnded ? (
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-4">
                    <CalendarX size={15} />
                    <span className="text-sm font-medium">Contest Ended</span>
                  </div>
                ) : (
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2">
                      <Clock size={12} /> Ends in
                    </p>
                    <div className="grid grid-cols-4 gap-1 text-center">
                      {[
                        { val: timeLeft.days, label: "Days" },
                        { val: timeLeft.hours, label: "Hrs" },
                        { val: timeLeft.minutes, label: "Min" },
                        { val: timeLeft.seconds, label: "Sec" },
                      ].map(({ val, label }) => (
                        <div
                          key={label}
                          className="bg-slate-50 dark:bg-slate-700 rounded-lg py-2"
                        >
                          <div className="text-base font-bold text-slate-900 dark:text-white">
                            {pad(val)}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500">
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!isRegistered ? (
                  <button
                    onClick={handleRegister}
                    disabled={isEnded}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-colors
                      bg-[#534AB7] hover:bg-[#3C3489] text-white
                      disabled:bg-slate-200 disabled:dark:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
                  >
                    {isEnded ? "Registration Closed" : `Register · $${contest.entryFee}`}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="w-full py-2 rounded-xl text-sm font-medium text-center bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-700/50">
                      ✓ Registered
                    </div>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      disabled={isEnded || submitted}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold transition-colors
                        bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white
                        disabled:bg-slate-200 disabled:dark:bg-slate-700/50 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                      {submitted ? "✓ Task Submitted" : "Submit Task"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4">
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">
                Submission deadline
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                {new Date(contest.deadline).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X size={18} />
            </button>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Submit your task
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Paste a link to your submission (Figma, Google Docs, GitHub, etc.)
            </p>

            <form onSubmit={handleSubmitTask} className="space-y-4">
              <textarea
                value={taskLink}
                onChange={(e) => setTaskLink(e.target.value)}
                rows={4}
                placeholder="https://your-submission-link.com"
                className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-[#534AB7] resize-none transition-colors"
              />
              <button
                type="submit"
                disabled={!taskLink.trim() || isSubmitting}
                className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#534AB7] hover:bg-[#3C3489] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestDetails;