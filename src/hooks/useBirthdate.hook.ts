import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export function useBirthdate(bday: string | undefined) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [birthdate, setBirthdate] = React.useState(bday ?? "2000-06-12"); // TODO: Harcoding here

  function handleBirthdateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newBday = event.target.value;
    setBirthdate(newBday);
  }

  const newParams = new URLSearchParams(Array.from(searchParams.entries()));
}
