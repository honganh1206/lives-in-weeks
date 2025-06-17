import React from "react";
import styles from "./instructions.module.css";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
const Instructions = ({
  birthDate,
  handleBirthDateChange,
  accentColor,
  handleAccentColorChange,
}: {
  birthDate: string;

  handleBirthDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accentColor: string;
  handleAccentColorChange: (newAccentColor: string) => void;
}) => {
  const [bday, setBday] = React.useState(birthDate);
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <>
      <p className={styles.subtitle}>
        <sup>*</sup>
        <em>
          Inspired by Tim Urban&apos;s{" "}
          <a
            href="https://waitbutwhy.com/2014/05/life-weeks.html"
            target="_blank"
          >
            Your Life in Weeks
          </a>{" "}
          and Buster Benson&apos;s{" "}
          <a href="https://busterbenson.com/life-in-weeks" target="_blank">
            Life in Weeks
          </a>
          .
        </em>
      </p>

      <menu className={styles.controls}>
        <label>
          <VisuallyHidden.Root>Select your birthdate</VisuallyHidden.Root>
          <input
            type="date"
            value={bday}
            onChange={(e) => setBday(e.target.value)}
            onBlur={handleBirthDateChange}
          />
        </label>

        <label>
          <VisuallyHidden.Root>Select an color</VisuallyHidden.Root>
          <input
            type="color"
            className={styles.colorPicker}
            value={accentColor}
            onChange={(e) => handleAccentColorChange(e.target.value)}
          />
        </label>

        <button
          className={styles.button}
          onClick={() => setShowInstructions(!showInstructions)}
        >
          {showInstructions ? "Hide" : "Show"} instructions
        </button>

        <button
          className={styles.button}
          onClick={() => window.location.assign("/")}
        >
          Reset
        </button>
      </menu>

      {showInstructions && (
        <>
          <ol className={styles.instructions}>
            <li className={styles.step}>
              Select your birthdate. Once you click or tab outside of the date
              picker, the grid of weeks will update.
            </li>
            <li className={styles.step}>Select an accent color (optional).</li>
            <li className={styles.step}>
              Each box is a week of your life, grouped by decade. Hover over any
              week to see its dates.
            </li>
            <li className={styles.step}>
              Click on any decade title (e.g. &quot;Early years&quot;) to edit
              its label. The heading atop this page is editable, too.
            </li>
          </ol>
          <p className={styles.note}>
            <em>
              Everything you write is saved in the URL. So if you accidentally
              click the reset button or close the browser tab, you can hit the
              back button or visit history to restore your progress.
            </em>
          </p>
        </>
      )}
    </>
  );
};

export default Instructions
