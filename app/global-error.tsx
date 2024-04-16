"use client"; // Error components must be Client Components

import { useEffect, useRef } from "react";

/**
 * エラー（throwなど）が発生した場合に表示されるコンポーネント。rootのlayout.tsxやtemplate.tsxで起きたエラーでも表示される
 *  → このバグで今は上手く動かない（ https://github.com/vercel/next.js/issues/50723 ）
 *
 * @param param0
 * @returns
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const inputEl = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    // /* Open the modal using ID.showModal() method */
    inputEl.current?.showModal();
    // Log the error to an error reporting service
    console.error(error);
  }, [error, inputEl]);
  return (
    <html>
      <body>
        <dialog className="modal" ref={inputEl}>
          <form className="modal-box" method="dialog">
            <h3 className="text-lg font-bold">System Error!</h3>
            <p className="py-4">{error.message}</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => reset()}>
                Try Again
              </button>
            </div>
          </form>
        </dialog>
      </body>
    </html>
  );
}
