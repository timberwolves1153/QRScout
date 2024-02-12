import { useContext } from "preact/hooks";
import wolfLogo from "../assets/wolf_2024 logo.svg";
import pupLogo from "../assets/pup_2024 logo.svg";
import teamContext from '../components/Team';

export function Logo() {
  const team = useContext(teamContext);
  return (
    <img src={team == '1153' ? wolfLogo : pupLogo} style="display: block" />
    
  );
}
