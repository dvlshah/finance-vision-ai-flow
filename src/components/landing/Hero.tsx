
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text font-clash-display">
              Clarity and Control
            </span>{" "}
            for Your Finances
          </h1>
        </main>
        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Harness the power of AI to understand your spending, track your budgets, and achieve your financial goals with confidence.
        </p>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3" asChild>
            <Link to="/">Get Started Free</Link>
          </Button>
        </div>
      </div>
      <div className="z-10">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop"
          alt="A modern workspace with a laptop showing code"
          className="rounded-lg shadow-2xl -rotate-3 hover:rotate-0 transition-transform"
        />
      </div>
    </section>
  );
};
export default Hero;
