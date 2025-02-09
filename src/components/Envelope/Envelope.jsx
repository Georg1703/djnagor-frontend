import { useState } from "react";
import Typewriter from "typewriter-effect";
import axios from "axios";
import "./Envelope.css";

export default function Envelope() {
  const [guests, setGuests] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFlapClick = () => {
    const urlPath = window.location.pathname;
    const uuid = urlPath.split("/").pop();

    axios
      .get(import.meta.env.VITE_ADMIN_API_URL + "api/invitations/" + uuid)
      .then((response) => parseGuest(response.data))
      .catch((error) => console.error(error));
  };

  const parseGuest = function (invitationData) {
    if (!invitationData) return;

    let guests = invitationData[0].guest_1_name || "";
    if (invitationData[0].guest_2_name) {
      guests += ` & ${invitationData[0].guest_2_name}`;
    }

    setGuests(guests);
    setIsOpen(true);
  };

  const handleLetterClick = () => {
    setIsOpen(false);
  };
  return (
    <div
      id="wrapper"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div
        className={`envelope ${
          isOpen ? "open" : ""
        } relative w-72 h-44 bg-blue-300 rounded-md shadow-md`}
      >
        <div
          className="flap front absolute top-0 left-0 right-0 h-12 bg-blue-400"
          onClick={handleFlapClick}
        />
        <div
          className="flap top absolute top-0 left-0 right-0 h-12 bg-blue-500"
          onClick={handleFlapClick}
        />
        <div
          className="letter absolute top-6 left-4 right-4 h-32 bg-white shadow-md rounded-md"
          onClick={handleLetterClick}
        >
          <div className="text">
            {isOpen ? (
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .pauseFor(4000)
                    .typeString(
                      `Dragii noștri, ${guests} Cu emoție și bucurie în suflete, vă
                        invităm să fiți alături de noi în cea mai specială zi a vieții
                        noastre! Noi, Gheorghe și Eliza, ne unim destinele și dorim să
                        împărtășim acest moment unic alături de familie și prieteni dragi.
                        Vă așteptăm cu drag în data de 10.06.2025`
                    )
                    .pauseFor(1500)
                    .deleteChars(10)
                    .typeString(
                      `<strong>16.06.2025</strong> la Costești. </br></br></br> <span style="float: left;">
                        Cu drag,  Gheorghe şi Eliza.</span>`
                    )
                    .start();
                }}
                options={{
                  autoStart: true,
                  delay: 50,
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
