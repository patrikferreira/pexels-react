"use client";
import Button from "./Button";

export default function GetKey() {
  function sendKey() {
    alert("ok");
  }
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <h2>Enter with your pexels key</h2>
          <a
            href="https://www.pexels.com/pt-br/api/key/"
            target="_blank"
            className="text-sm"
          >
            Create a key
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="OtOinFOgc7RMjAdFSRH"
            className="p-3 rounded-lg outline-none bg-firstColor shadow-customShadow text-sm"
          />
          <Button
            action={sendKey}
            className="w-full text-md text-foreground bg-accentColor hover:brightness-95 transition-all duration-200 rounded-lg py-3 px-4"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
