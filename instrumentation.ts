export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const { dailyScheduler } = await import("./lib/scheduler");
      console.log("[Instrumentation] Background Daily Job Scheduler initialized on server startup.");
    } catch (e) {
      console.error("[Instrumentation] Failed to load scheduler:", e);
    }
  }
}
