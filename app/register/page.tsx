import MagicLinkForm from "@/components/auth/magicLinkForm";

export default function Register() {
  return (
    <div className="flex flex-row p-4 space-y-4 w-full">
      <div className="flex flex-col">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Comment accéder à la plateforme ?
        </h1>
        <div className="mt-3">
          <p className="text-justify lg:max-w-3xl text-muted-foreground leading-6 [&:not(:first-child)]:mt-3">
            Pour garantir la sécurité et la confidentialité, la création de
            compte est uniquement gérée par les employeurs. Vous ne pouvez pas
            vous inscrire directement ici. Si vous êtes employé et que votre
            employeur a fourni votre adresse email à notre équipe, votre compte
            a déjà été créé. Vous devez simplement suivre les étapes suivantes
            pour activer votre accès personnel.
          </p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-6">
            Étapes d'activation de votre compte
          </h2>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Entrez votre adresse email dans le champ ci-dessous.</li>
            <li>Un email contenant un lien de connexion vous sera envoyé.</li>
            <li>
              En cliquant sur ce lien, vous serez redirigé vers une page où vous
              pourrez définir votre mot de passe pour la première fois.
            </li>
          </ul>
          <p>
            Une fois votre mot de passe défini, vous pourrez vous connecter à
            l'application et accéder aux fonctionnalités de gestion
            d'émargement.
          </p>
        </div>
        <div className="mt-6">
          <MagicLinkForm />
        </div>
      </div>
    </div>
  );
}
