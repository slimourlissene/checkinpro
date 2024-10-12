import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  return (
    <div>
      <h1>Se connecter</h1>
      <p>Connectez-vous pour accéder à vos émargements.</p>
    </div>
  );
}

function LoginForm() {
  return (
    <div>
      <div></div>
    </div>
  );
}
