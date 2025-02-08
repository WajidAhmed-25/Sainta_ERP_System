import React from 'react';

const OtpPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 max-w-xs h-auto space-y-4">
        <div className="flex flex-col items-center justify-center relative rounded-xl p-4 bg-white [box-shadow:var(--shadow)] overflow-hidden">
          <h6 className="text-2xl font-bold">OTP Verification</h6>

          <div className="grid items-center justify-center w-full grid-flow-col grid-cols-4 my-6 justify-items-center">
            <input
              className="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
              spellCheck="false"
              autoComplete="one-time-code"
              placeholder="○"
              aria-invalid="false"
              type="tel"
              aria-disabled="false"
              inputMode="numeric"
              maxLength="1"
            />
            <input
              className="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
              spellCheck="false"
              autoComplete="one-time-code"
              placeholder="○"
              aria-invalid="false"
              type="tel"
              aria-disabled="false"
              inputMode="numeric"
              maxLength="1"
            />
            <input
              className="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
              spellCheck="false"
              autoComplete="one-time-code"
              placeholder="○"
              aria-invalid="false"
              type="tel"
              aria-disabled="false"
              inputMode="numeric"
              maxLength="1"
            />
            <input
              className="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
              spellCheck="false"
              autoComplete="one-time-code"
              placeholder="○"
              aria-invalid="false"
              type="tel"
              aria-disabled="false"
              inputMode="numeric"
              maxLength="1"
            />
          </div>

          <span className="text-zinc-500 text-[12px] text-center">
            Please enter the 4-digits one time password (OTP) that we sent to your
            registered email
          </span>

          <button
            type="button"
            className="mt-[14px] text-base text-white font-medium tracking-wider rounded-md w-full px-4 py-1 transition-colors duration-200 border border-solid border-transparent bg-black hover:bg-black/60"
          >
            Verify
          </button>
        </div>

  
      </div>
    </div>
  );
};

export default OtpPage;