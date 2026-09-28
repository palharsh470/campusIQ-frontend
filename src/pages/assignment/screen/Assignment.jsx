import React from "react";
import { ClockIcon, SparkleIcon } from "@phosphor-icons/react";

function Assignment() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="max-w-md text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/80">
                    <SparkleIcon className="h-9 w-9 text-indigo-400" />
                </div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
                    <ClockIcon className="h-3.5 w-3.5" />
                    Coming Soon
                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-white">
                    Assignments
                </h1>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                    We're working on something useful for you. The
                    assignments feature is currently under development
                    and will be available soon.
                </p>

                <p className="mt-6 text-xs text-zinc-600">
                    Stay tuned for updates.
                </p>
            </div>
        </div>
    );
}

export default Assignment;
