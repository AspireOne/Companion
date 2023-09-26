import Image from "next/image";
import React from "react";
import Page from "~/components/Page";

export default function LandingPage() {
  // Todo: meta description.
  return (
    <Page
      metaTitle={"Companion"}
      unprotected
      header={{ enabled: false }}
      showMobileNav={false}
    >
      <div className="z-10">
        <Image
          src="/assets/default_landing.png"
          width={1920}
          height={1080}
          className="w-full absolute top-0 z-[0] left-0 h-3/6 opacity-20 object-cover"
          alt="Landing page image"
        />
        <div
          className={
            "absolute left-0 right-0 top-0 z-[0] h-3/6 bg-gradient-to-b to-black from-transparent"
          }
        />
      </div>

      <div className="mt-20 z-20 absolute top-0 w-4/6 mx-auto text-center">
        <div>
          <h1 className="text-4xl font-bold">
            Come chat with your favourite characters
          </h1>

          <ul className="mt-5">
            <li>
              😇 <b>Real feeling</b> - Characters have emotions and will respond
              acordingly to what you say
            </li>
            <li>
              📚 <b>Diversity</b> - Go on adventure, roleplay or simply chat
              with characters
            </li>
            <li>
              🧠 <b>Memory</b> - Characters remember you and will not forget
              things you tell them
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-left">Characters</h3>

          
        </div>
      </div>
    </Page>
  );
}
