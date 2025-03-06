"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { saveGitHubCode } from "@/app/service/auth-service";
import GitHubAccessButton from "@/app/components/GitHubAccessButton";
import Swal from "sweetalert2";
export default function GithubAccessCallback() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  const { isLoading, error, user, token, githubToken } = useSelector(
    (state: RootState) => state.auth,
  );

  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;

    if (code && user && token) {
      hasExecuted.current = true;

      (async () => {
        const resultAction = await dispatch(
          saveGitHubCode({ code, id: user.id, token }),
        );

        if (resultAction.meta.requestStatus === "fulfilled") {
          Swal.fire({
            icon: "success",
            title: "GitHub Access Saved!",
            text: "Your GitHub access token was stored successfully.",
            buttonsStyling: false,
            confirmButtonText: "Go to Dashboard",
            customClass: {
              confirmButton:
                "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 " +
                "rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
            },
          }).then(() => {
            router.push("/dashboard");
          });
        }
      })();
    }
  }, [code, user, token, dispatch, router]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">GitHub Access Callback</h1>
      <p>Code: {code || "No code found"}</p>

      {isLoading && <p>Saving your GitHub code...</p>}

      {!isLoading && error && (
        <div className="text-red-600">
          <p>Error: {error}</p>
          <p className="mt-2">
            <GitHubAccessButton />
          </p>
        </div>
      )}

      {!isLoading && !error && (!user || !code) && (
        <div>
          <p>Something went wrong or you’re not logged in.</p>
          <GitHubAccessButton />
        </div>
      )}
    </div>
  );
}
